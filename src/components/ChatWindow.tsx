import React, { useState, useRef, useEffect } from "react";
import { ChatMessage, Scenario, Character } from "../types";
import { Send, Volume2, Mic, MicOff, RefreshCw, Compass, AlertCircle, Play, Square, Sparkles } from "lucide-react";

interface ChatWindowProps {
  messages: ChatMessage[];
  scenarios: Scenario[];
  activeScenarioId: string;
  activeCharacter: Character;
  isSending: boolean;
  onSendMessage: (text: string) => void;
  onSelectScenario: (scenarioId: string) => void;
  onRegenerateResponse: () => void;
  logs: (msg: string, type: "info" | "api" | "error" | "voice") => void;
}

export default function ChatWindow({
  messages,
  scenarios,
  activeScenarioId,
  activeCharacter,
  isSending,
  onSendMessage,
  onSelectScenario,
  onRegenerateResponse,
  logs,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [activeAudioPlaying, setActiveAudioPlaying] = useState<string | null>(null); // messageId having active sound
  const [ttsLoadingId, setTtsLoadingId] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const getSuggestedPrompts = (charId: string, scenarioId: string): string[] => {
    switch (charId) {
      case "kaelen":
        if (scenarioId === "sci-fi") {
          return [
            "Establish warp telemetry towards the singularity.",
            "Initiate auxiliary thermal scan for spatial rifts.",
            "Explain the historical status of the Equinox ship."
          ];
        }
        return [
          "Describe your celestial astrolabe calibration.",
          "What warp speed threshold is stable?",
          "Are we tracked by security sensors?"
        ];
      case "vespera":
        if (scenarioId === "cyberpunk") {
          return [
            "We need to bypass the local security firewall.",
            "Can you access the encrypted subnet-9 data?",
            "What cybernetic cyberware are you using?"
          ];
        }
        return [
          "Explain your credentials for deep-net access.",
          "Generate a synthetic hacker decryption routine.",
          "Scan the local corporations for alerts."
        ];
      case "torin":
        if (scenarioId === "fantasy") {
          return [
            "Form our combat obsidian phalanx shield!",
            "Sound the alarms on the sentinel parapet.",
            "Ready the broadsword for defensive war stance."
          ];
        }
        return [
          "What is your sacred vow as standard-bearer?",
          "Describe the historic siege of Obsidian walls.",
          "Check the fortress ammo and logistics status."
        ];
      case "aria":
        if (scenarioId === "planar") {
          return [
            "Weave the soft Leyline incantation spell.",
            "Can you calm down the restless starlight moths?",
            "Where does this shimmering blue gateway lead?"
          ];
        }
        return [
          "Explain how you emerged from the starlight well.",
          "Inspect the active planar mana levels.",
          "Sing a song of origin lore in this forest."
        ];
      default:
        return ["State your status report.", "Who are you?", "Initiate primary contact."];
    }
  };

  // Keep chat scrolled automatically
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // Setup Web SpeechRecognition for real Speech-to-Text conversion
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";

      rec.onstart = () => {
        setIsRecording(true);
        logs("Speech recognition engine started.", "info");
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? prev + " " + transcript : transcript));
        logs(`Speech-to-Text transcribed: "${transcript}"`, "info");
      };

      rec.onerror = (err: any) => {
        console.error("Speech Recognition error:", err);
        logs(`STT Error / Silenced: ${err.error}`, "error");
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleMicToggle = () => {
    if (!recognitionRef.current) {
      logs("Speech Recognition is not supported in this browser environment.", "error");
      alert("Browser Speech API is not supported in your current browser. Please type manually!");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err: any) {
        logs(`Mic start error: ${err.message}`, "error");
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    onSendMessage(inputText.trim());
    setInputText("");
  };

  // Speaks aloud assistant text via Gemini TTS engine
  const handleSpeakText = async (messageId: string, textToSpeak: string) => {
    // If already playing this audio, pause it
    if (activeAudioPlaying === messageId) {
      if (audioRef.current) {
        audioRef.current.pause();
        setActiveAudioPlaying(null);
      }
      return;
    }

    setTtsLoadingId(messageId);
    logs(`Requesting multimodal Speech voice from Gemini for reply...`, "voice");

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToSpeak,
          voiceName: activeCharacter.voiceName,
        }),
      });

      const data = await response.json();
      if (data.success && data.base64Audio) {
        // Convert base64 sound to dynamic blob binary for playing
        const binary = atob(data.base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || "audio/wav" });
        const voiceUrl = URL.createObjectURL(blob);

        if (audioRef.current) {
          audioRef.current.pause();
        }

        const audio = new Audio(voiceUrl);
        audioRef.current = audio;

        audio.onplay = () => {
          setActiveAudioPlaying(messageId);
          setTtsLoadingId(null);
        };

        audio.onended = () => {
          setActiveAudioPlaying(null);
        };

        audio.onerror = (e) => {
          logs(`Audio payload playback failed.`, "error");
          setActiveAudioPlaying(null);
          setTtsLoadingId(null);
        };

        await audio.play();
        logs("Gemini voice synthesized successfully.", "voice");
      } else {
        logs(`TTS unavailable: ${data.message || data.error}`, "error");
        setTtsLoadingId(null);
        alert(data.message || data.error || "Requires configured Vertex/Gemini API keys to run text-to-speech rendering.");
      }
    } catch (err: any) {
      console.error(err);
      logs(`TTS transmission breakdown: ${err.message}`, "error");
      setTtsLoadingId(null);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full" id="chat-window-console">
      {/* Narrative Scenario Selector Rail */}
      <div className="bg-slate-950 border-b border-slate-850 px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Campaign Scenario</span>
        </div>
        <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc.id)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all shrink-0 ${
                activeScenarioId === sc.id
                  ? "bg-indigo-600/15 border-indigo-500 text-indigo-200"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Lore Context Banner */}
      <div className="bg-indigo-950/20 border-b border-indigo-900/30 px-5 py-3 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <div className="text-[11px] font-mono text-indigo-300 font-semibold uppercase tracking-wider">
            {activeScenario.title} Narrative Setup
          </div>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            {activeScenario.description}
          </p>
          <p className="text-[10px] text-slate-500 font-sans italic mt-1 bg-slate-950/20 px-2 py-1 rounded inline-block">
            {activeScenario.loreContext}
          </p>
        </div>
      </div>

      {/* Dialogue Thread */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-950/40 border border-indigo-900/60 flex items-center justify-center">
              <Compass className="w-6 h-6 text-indigo-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-sans font-semibold text-slate-200">Initiate Dialogue Console</p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Send Kaelen, Vespera, Torin, or Aria your first message inside the campaign to kickstart the generative conversation.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : ""}`}
              >
                {/* Character Icon Avatar fallback */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-mono font-bold ${
                    isUser
                      ? "bg-slate-850 border border-slate-700 text-slate-300"
                      : "bg-indigo-950 border border-indigo-800 text-indigo-300"
                  }`}
                >
                  {isUser ? "U" : activeCharacter.name.charAt(0)}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1">
                  <div
                    className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isUser
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-slate-950/80 border border-slate-800 text-slate-100 rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Message Metadata Bar */}
                  <div
                    className={`flex items-center gap-2 justify-start px-1 text-[9px] font-mono text-slate-500 ${
                      isUser ? "justify-end" : ""
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <>
                        <span>•</span>
                        <span className="text-indigo-400">{msg.latencyMs ? `${msg.latencyMs}ms` : ""}</span>
                        {msg.simulated && (
                          <>
                            <span>•</span>
                            <span className="text-amber-500 uppercase font-semibold">Offline Fallback</span>
                          </>
                        )}
                        <span>•</span>
                        <button
                          onClick={() => handleSpeakText(msg.id, msg.content)}
                          disabled={ttsLoadingId !== null && ttsLoadingId !== msg.id}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-400 font-semibold focus:outline-hidden transition-all disabled:opacity-40"
                          title="Generate/Stop TTS Speech"
                        >
                          {ttsLoadingId === msg.id ? (
                            <span className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
                              Generating Vocal...
                            </span>
                          ) : activeAudioPlaying === msg.id ? (
                            <span className="flex items-center gap-1.5 text-indigo-300">
                              <span className="flex gap-0.5 items-center">
                                <span className="h-2 w-0.5 bg-indigo-400 animate-bounce" style={{ animationDelay: "0.1s" }} />
                                <span className="h-3.5 w-0.5 bg-indigo-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
                                <span className="h-2 w-0.5 bg-indigo-400 animate-bounce" style={{ animationDelay: "0.5s" }} />
                              </span>
                              [Stop Voice]
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-slate-500 hover:text-indigo-400">
                              <Volume2 className="w-3 h-3" /> Play Speech
                            </span>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {isSending && (
          <div className="flex gap-2 mr-auto max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800 text-[10px] text-slate-500 animate-pulse">
              AI
            </div>
            <div className="bg-slate-950 border border-slate-850 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center gap-2">
              <span className="text-[10px] font-mono animate-pulse">Orchestrating Vertex AI Dialogue...</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Campaign Feedback warning if offline mode is dominant */}
      {messages.length > 0 && messages[messages.length - 1]?.simulated && (
        <div className="bg-amber-950/20 border-t border-b border-amber-900/30 px-5 py-2.5 flex items-center gap-2 text-[11px] text-amber-500">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Currently in Simulated Engine. Vertex AI calls are emulated. Connect keys in Settings to unlock real dialogue / speech.</span>
        </div>
      )}

      {/* Input Action Panel */}
      <div className="bg-slate-950 border-t border-slate-850 p-4 space-y-3">
        {/* Suggestion Starter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 custom-scrollbar shrink-0 select-none">
          <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase tracking-wider shrink-0 mr-1">Suggestions:</span>
          {getSuggestedPrompts(activeCharacter.id, activeScenarioId).map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isSending}
              onClick={() => {
                setInputText(promptText);
              }}
              className="text-[10.5px] font-sans px-3 py-1 bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-slate-850 text-slate-350 hover:text-white rounded-full transition-all shrink-0 cursor-pointer duration-150 font-medium italic"
            >
              "{promptText}"
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-2 items-center">
          {/* Refresh/Regenerate last response */}
          <button
            type="button"
            onClick={onRegenerateResponse}
            disabled={messages.length < 2 || isSending}
            className="p-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl hover:text-white hover:border-slate-700 disabled:opacity-40 select-none cursor-pointer"
            title="Optimise Response / Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Micro Recording Button for Speech-to-Text */}
          <button
            type="button"
            onClick={handleMicToggle}
            className={`p-3 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${
              isRecording
                ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
            title={isRecording ? "Stop Recording" : "Dictate Prompt (STT)"}
          >
            {isRecording ? <MicOff className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Prompt Message bar */}
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isSending}
            placeholder={
              isRecording
                ? "Listening... Speak now..."
                : `Command ${activeCharacter.name}...`
            }
            className="flex-1 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl border border-slate-800 focus:outline-hidden focus:border-indigo-500 placeholder-slate-600 disabled:opacity-60 font-sans"
          />

          {/* Send submission */}
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
