import React, { useState, useEffect } from "react";
import { PRESET_CHARACTERS, SCENARIOS } from "./data";
import { OrchestrationSettings, ChatMessage, LogEntry } from "./types";
import CharacterSheet from "./components/CharacterSheet";
import ChatWindow from "./components/ChatWindow";
import OrchestrationPanel from "./components/OrchestrationPanel";
import CorporatePortal from "./components/CorporatePortal";
import { Gamepad2, Settings, MessageSquare, Flame, Sparkles, Cpu, Layers, Star, Briefcase } from "lucide-react";

// ES module imports for default character avatars
import keplerImg from "./assets/images/i8_games_kepler_1779356801323.png";
import syndicateImg from "./assets/images/i8_games_syndicate_1779356820789.png";
import aegisImg from "./assets/images/i8_games_aegis_1779356837462.png";
import ariaImg from "./assets/images/i8_games_aria_1779359254346.png";

export default function App() {
  const [activeCharacterId, setActiveCharacterId] = useState("kaelen");
  const [activeTab, setActiveTab] = useState<"playground" | "portal">("portal");
  const [characterAvatars, setCharacterAvatars] = useState<Record<string, string>>({
    kaelen: keplerImg,
    vespera: syndicateImg,
    torin: aegisImg,
    aria: ariaImg,
  });
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({});
  const [settings, setSettings] = useState<OrchestrationSettings>({
    temperature: 0.7,
    safetyLevel: "medium",
    showPromptEditor: false,
    activeScenarioId: "rift",
    autoSpeak: false,
    systemPromptOverride: ""
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const activeCharacter = PRESET_CHARACTERS.find((c) => c.id === activeCharacterId) || PRESET_CHARACTERS[0];
  const activeChat = chats[activeCharacter.id] || [];

  // Helper to add custom orchestration logs
  const addLog = (message: string, type: "info" | "api" | "error" | "voice" = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { timestamp, type, message }]);
  };

  const getLocalClientMock = (charId: string, lastMsg: string): string => {
    const textLower = lastMsg.toLowerCase();
    switch (charId) {
      case "kaelen":
        if (textLower.includes("hello") || textLower.includes("hi")) {
          return "*Kaelen checks his optical charts* Ah, fellow stellar voyager! Welcome aboard the campaign vessel Equinox. I am tracking a hyper-dimensional gravitational tear ahead. Are you prepared to adjust the warp telemetry?";
        }
        return "*Kaelen calibrates his brass astrolabe* Fascinating inquiry. The gravitational shear in this quadrant matches no recorded records. Shall I activate the auxiliary thermal sensors to scan the rift?";
      case "vespera":
        if (textLower.includes("hello") || textLower.includes("hi")) {
          return "*Vespera looks up from her glowing terminal* Hello? State your business before security tracers latch onto your neural signal. Credentials for the deep-net aren't freely handed out here.";
        }
        return "*Vespera taps into her modified sensory array* Let's redirect the corporate grid security around the main server block. Commencing sandbox infiltration payload. Hold onto your neural link port!";
      case "torin":
        if (textLower.includes("hello") || textLower.includes("hi")) {
          return "*Torin slams his runic sword down with thunderous honor* Hail! I stand as the primary shield-wall of this campaign. If your heart is true and your blade is steel, stand beside me. What is your strategy?";
        }
        return "*Torin sounds the alarms on the stone tower parapet* Resolute plans! Form the defensive phalanx, and let the siege invaders test the endurance of obsidian walls!";
      case "aria":
        if (textLower.includes("hello") || textLower.includes("hi")) {
          return "*Aria steps out of a blue light-well, celestial moths dancing about* Welcome to the realm of high-lore, voyager. I hear a melodic song in the planar currents today. What seeking heart brings you?";
        }
        return "*Aria weaves a soft glowing pattern in the air* The leylines shift in response to your courage. Speak the ancient spell words, and a gateway of pure starlight will guide our steps.";
      default:
        return "System active. Dialogue computed via local offline sandbox processor.";
    }
  };

  // Check key status on startup
  useEffect(() => {
    addLog("Initializing i8s.games AI Platform Orchestrator...");
    fetch("/api/config")
      .then((res) => {
        if (!res.ok) throw new Error("Status API returned HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        setHasGeminiKey(data.hasKey);
        addLog(`Verified Vertex AI Configuration. Status key configured: ${data.hasKey}`, "info");
        if (!data.hasKey) {
          addLog("No valid GEMINI_API_KEY detected in secrets. Entering offline high-fidelity simulator mode.", "error");
        } else {
          addLog("Gemini 3.5-Flash and 3.1-TTS models are online and ready.", "info");
        }
      })
      .catch((err) => {
        console.error("Config check failed:", err);
        addLog("Detected static deployment model (e.g. GitHub Pages). Successfully switched to client-side emulation engine.", "info");
        setHasGeminiKey(false);
      });
  }, []);

  // Update System Prompt Override when character swaps unless already customized
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      systemPromptOverride: ""
    }));
  }, [activeCharacterId]);

  const handleSendMessage = async (text: string) => {
    if (isSending) return;

    // 1. Append user message to active character's chat history
    const userMsgId = Date.now().toString();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedHistory = [...activeChat, newUserMsg];
    setChats((prev) => ({
      ...prev,
      [activeCharacter.id]: updatedHistory
    }));

    setIsSending(true);
    addLog(`Pipeline trigger: ${activeCharacter.name} -> User: "${text}"`, "api");

    // 2. Transmit to server API proxy
    try {
      const activeScenario = SCENARIOS.find((s) => s.id === settings.activeScenarioId) || SCENARIOS[0];
      const activePrompt = settings.systemPromptOverride || activeCharacter.systemPromptTemplate;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: activeCharacter.id,
          messages: updatedHistory,
          systemInstruction: activePrompt,
          scenarioText: `Context: ${activeScenario.title}. Setup details: ${activeScenario.loreContext}`,
          temperature: settings.temperature,
          safetyLevel: settings.safetyLevel
        }),
      });

      if (!response.ok) {
        throw new Error("API server responded with code " + response.status);
      }

      const data = await response.json();
      if (data.success && data.text) {
        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          latencyMs: data.latencyMs,
          simulated: data.simulated
        };

        const finalHistory = [...updatedHistory, assistantMsg];
        setChats((prev) => ({
          ...prev,
          [activeCharacter.id]: finalHistory
        }));

        addLog(`Inference return: latency=${data.latencyMs}ms, modelSrc=${data.modelUsed}`, "api");

        // 3. Trigger automatic speech synthesizer if setting is enabled
        if (settings.autoSpeak && !data.simulated) {
          addLog("Auto-Speech voice generation triggered.", "voice");
          await playAudioDialogue(assistantMsg.id, data.text);
        }
      } else {
        addLog("Inference anomaly detected: returned invalid content structure.", "error");
      }
    } catch (err: any) {
      console.warn("Express endpoint failed, triggering high-fidelity client mock fallback:", err.message);
      
      const mockReply = getLocalClientMock(activeCharacter.id, text);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `[Static Sandbox Fallback]\n\n${mockReply}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        latencyMs: 12,
        simulated: true
      };

      setChats((prev) => ({
        ...prev,
        [activeCharacter.id]: [...updatedHistory, assistantMsg]
      }));

      addLog(`API route unavailable on Static Web Host. Dynamic client dialog fallback generated successfully.`, "info");
    } finally {
      setIsSending(false);
    }
  };

  // Speaks response programmatically for Auto Speak
  const playAudioDialogue = async (msgId: string, txt: string) => {
    try {
      const cleanTxt = txt.replace(/[*_#]/g, "");
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanTxt, voiceName: activeCharacter.voiceName }),
      });
      const data = await res.json();
      if (data.success && data.base64Audio) {
        const binary = atob(data.base64Audio);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play().catch(() => {});
        addLog(`Speech synthesis playing audio stream successfully.`, "voice");
      } else {
        addLog(`Auto TTS warning: ${data.message || data.error || "unavailable"}`, "error");
      }
    } catch (err: any) {
      addLog(`Audio stream play error: ${err.message}`, "error");
    }
  };

  const handleRegenerateResponse = async () => {
    if (activeChat.length < 2 || isSending) return;
    
    addLog(`Initiating response optimization loop for ${activeCharacter.name}...`, "api");
    
    // Remove the last assistant message
    const cleanHistory = [...activeChat];
    if (cleanHistory[cleanHistory.length - 1].role === "assistant") {
      cleanHistory.pop();
    }

    setChats((prev) => ({
      ...prev,
      [activeCharacter.id]: cleanHistory
    }));

    setIsSending(true);

    try {
      const activeScenario = SCENARIOS.find((s) => s.id === settings.activeScenarioId) || SCENARIOS[0];
      const activePrompt = settings.systemPromptOverride || activeCharacter.systemPromptTemplate;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: activeCharacter.id,
          messages: cleanHistory,
          systemInstruction: activePrompt,
          scenarioText: `Context: ${activeScenario.title}. Setup details: ${activeScenario.loreContext}`,
          temperature: settings.temperature,
          safetyLevel: settings.safetyLevel
        }),
      });

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();
      if (data.success && data.text) {
        const assistantMsg: ChatMessage = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          latencyMs: data.latencyMs,
          simulated: data.simulated
        };

        setChats((prev) => ({
          ...prev,
          [activeCharacter.id]: [...cleanHistory, assistantMsg]
        }));
        addLog(`Regeneration complete. Latency=${data.latencyMs}ms.`, "api");
      }
    } catch (e: any) {
      console.warn("Regenerate endpoint failed, using client-side mock:", e.message);
      
      const lastUserMsg = cleanHistory.filter((m) => m.role === "user").pop()?.content || "Hello";
      const mockReply = getLocalClientMock(activeCharacter.id, lastUserMsg);
      const assistantMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: `[Static Sandbox Fallback - Optimized]\n\n${mockReply}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        latencyMs: 9,
        simulated: true
      };

      setChats((prev) => ({
        ...prev,
        [activeCharacter.id]: [...cleanHistory, assistantMsg]
      }));

      addLog(`API route unavailable during regeneration. Loaded localized client-side fallback successfully.`, "info");
    } finally {
      setIsSending(false);
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    setSettings((prev) => ({ ...prev, activeScenarioId: scenarioId }));
    const chosen = SCENARIOS.find((s) => s.id === scenarioId);
    if (chosen) {
      addLog(`Campaign shifted: "${chosen.title}" designated as active lore canvas.`, "info");
      
      // Inject narrative marker in dialogue log to enrich immersiveness
      const campaignMarker: ChatMessage = {
        id: "sys-" + Date.now(),
        role: "assistant",
        content: `*Lore Shift: You have entered "${chosen.title}"*\n\n"${chosen.description}"\n\nHow do you wish to proceed?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        latencyMs: 10,
        simulated: true
      };

      setChats((prev) => ({
        ...prev,
        [activeCharacter.id]: [...(prev[activeCharacter.id] || []), campaignMarker]
      }));
    }
  };

  const handleAvatarGenerated = (url: string) => {
    setCharacterAvatars((prev) => ({
      ...prev,
      [activeCharacter.id]: url
    }));
  };

  const renderCharacterBadgeColor = (charId: string) => {
    switch (charId) {
      case "kaelen": return "border-blue-500/30 hover:border-blue-500/70";
      case "vespera": return "border-cyan-500/30 hover:border-cyan-500/70";
      case "torin": return "border-amber-500/30 hover:border-amber-500/70";
      case "aria": return "border-emerald-500/30 hover:border-emerald-500/70";
      default: return "border-slate-800 hover:border-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="i8-root-container">
      {/* Immersive Platform Header Banner */}
      <header className="border-b border-slate-900 bg-slate-950 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2.5">
            <Gamepad2 className="w-6 h-6 text-indigo-500" />
            <h1 className="text-2xl font-black italic tracking-wide text-white font-sans lowercase">
              i8s<span className="text-indigo-500">.games</span>
            </h1>
            <span className="text-[10px] bg-indigo-950 text-indigo-400 font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-indigo-900/60">
              proprietary engine alpha-v3
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-sans tracking-wide">
            Enterprise Character Platform: Original IP Creation, Voice Synthesizers & Vertex AI Orchestrator
          </p>
        </div>

        {/* Corporate/Playground Tab Switcher */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl shrink-0 shadow-lg select-none">
          <button
            onClick={() => {
              setActiveTab("portal");
              addLog("Switched view to i8s.games Strategic Transition Portal.", "info");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "portal"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Strategic Roadmap
          </button>
          <button
            onClick={() => {
              setActiveTab("playground");
              addLog("Initialized live interactive Multi-Agent simulation.", "info");
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold font-sans flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "playground"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> Interactive Sandbox
          </button>
        </div>

        {/* Corporate brief explaining transitioning */}
        <div className="max-w-xs hidden lg:block text-slate-400 rounded-lg p-3 bg-slate-900/50 border border-slate-800/80 text-[10px] leading-normal font-sans">
          <div className="font-semibold text-slate-350 flex items-center gap-1 mb-0.5 text-[11px] uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Core Flagship Product Roadmap</span>
          </div>
          Flagship generative entertainment platform powered by custom low-latency Vertex AI inference models.
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-6 space-y-6 max-w-[1700px] w-full mx-auto flex flex-col">
        {activeTab === "portal" ? (
          /* Corporate Roadmap Portal with rich descriptions and images */
          <CorporatePortal 
            onSelectCharacter={(charId) => {
              setActiveCharacterId(charId);
              addLog(`Aligned sandbox node to Character node: "${charId}"`);
            }}
            onSelectTab={setActiveTab}
          />
        ) : (
          /* Interactive Demo Multi-agent Sandbox Playground */
          <div className="space-y-6 flex flex-col flex-1 animate-fade-in">
            {/* Horizontal Character Catalogue Selectors */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                <Star className="w-4 h-4 text-indigo-400" />
                <span>Select Active Character Persona Engine</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                {PRESET_CHARACTERS.map((char) => {
                  const isActive = char.id === activeCharacterId;
                  const hasCustomAvatar = characterAvatars[char.id];
                  return (
                    <button
                      key={char.id}
                      onClick={() => {
                        setActiveCharacterId(char.id);
                        addLog(`Connected focus channel to Character node: "${char.name}"`);
                      }}
                      className={`text-left p-4 rounded-xl border bg-slate-900/80 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-32 select-none ${
                        isActive
                          ? "ring-2 ring-indigo-500 border-transparent bg-indigo-950/20"
                          : renderCharacterBadgeColor(char.id)
                      }`}
                    >
                      {/* Floating badge for active */}
                      {isActive && (
                        <span className="absolute top-3 right-3 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                      )}

                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                          {char.gameName}
                        </div>
                        <h3 className="text-sm font-sans font-extrabold tracking-tight text-white mt-1">
                          {char.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3.5 mt-3">
                        {hasCustomAvatar ? (
                          <img
                            src={hasCustomAvatar}
                            className="w-10 h-10 rounded-full border border-indigo-500 object-cover"
                            alt={char.name}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-950 text-slate-400 border border-slate-800 flex items-center justify-center font-bold text-xs">
                            {char.name.charAt(0)}
                          </div>
                        )}
                        <div className="space-y-0.5">
                          <p className="text-[11px] text-slate-400 leading-none">{char.title}</p>
                          <span className="text-[9px] font-mono text-indigo-400">Vocal: {char.voiceName}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3-Column Bento Playground Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 flex-1 min-h-[600px]">
              {/* Col 1 (Static sheets / avatars) - span 4 */}
              <div className="xl:col-span-4 h-full">
                <CharacterSheet
                  character={{
                    ...activeCharacter,
                    avatarUrl: characterAvatars[activeCharacter.id]
                  }}
                  onAvatarGenerated={handleAvatarGenerated}
                  logs={addLog}
                />
              </div>

              {/* Col 2 (Interactive dialog logs) - span 5 */}
              <div className="xl:col-span-5 h-full">
                <ChatWindow
                  messages={activeChat}
                  scenarios={SCENARIOS}
                  activeScenarioId={settings.activeScenarioId}
                  activeCharacter={activeCharacter}
                  isSending={isSending}
                  onSendMessage={handleSendMessage}
                  onSelectScenario={handleSelectScenario}
                  onRegenerateResponse={handleRegenerateResponse}
                  logs={addLog}
                />
              </div>

              {/* Col 3 (Developer Orchestrator dashboard) - span 3 */}
              <div className="xl:col-span-3 h-full">
                <OrchestrationPanel
                  settings={settings}
                  activeCharacter={activeCharacter}
                  scenarios={SCENARIOS}
                  logs={logs}
                  hasGeminiKey={hasGeminiKey}
                  onSettingsChange={(updated) => setSettings((prev) => ({ ...prev, ...updated }))}
                  onClearLogs={() => setLogs([])}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Humble page footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-600 font-mono gap-3">
        <span>© 2026 i8s.games Ltd. All rights intellectual property reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-400 transition-colors">Vertex AI Portal</a>
          <span>•</span>
          <a href="#" className="hover:text-indigo-400 transition-colors">Imagen-2.5-Image Studio</a>
          <span>•</span>
          <a href="#" className="hover:text-indigo-400 transition-colors">Safety Regulations</a>
        </div>
      </footer>
    </div>
  );
}
