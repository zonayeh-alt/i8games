import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  Send, 
  Volume2, 
  VolumeX, 
  Zap, 
  Tv, 
  Sparkles, 
  Check, 
  Info, 
  HelpCircle,
  Clock,
  Dices,
  Flame,
  Award,
  ChevronRight
} from "lucide-react";

interface Cheerleader {
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  country: string;
  countryFlag: string;
  specialty: string;
  voiceName: string;
  personality: string;
  tagline: string;
  systemInstruction: string;
  traits: { label: string; score: number }[];
  accentColor: string;
}

const CHEERLEADERS: Cheerleader[] = [
  {
    id: "linn",
    name: "Linn (琳)",
    avatar: "👩‍🦰",
    avatarBg: "from-amber-500 to-rose-500",
    country: "Thailand",
    countryFlag: "🇹🇭",
    specialty: "Slots & Gacor Booster",
    voiceName: "Kore",
    personality: "Hyper-enthusiastic, counts multipliers, likes gold themes, adds Thai greetings (Ka/Krab, Sawatdee).",
    tagline: "Let's spin to the high-multipliers together! 98.6% luck incoming!",
    systemInstruction: "You are Linn, an energetic, bubble-filled Virtual AI casino cheerleader from Thailand, custom designed by Future Global. You support the player in Slots Gacor and interactive online slots. Speak in supportive, energetic tones, weave in Thai hospitality terms like 'Sawatdee ka', 'Su su!' (keep fighting) and count gold multiplier increments. Keep comments under 3 sentences and extremely high energy.",
    traits: [
      { label: "Cheering Energy", score: 98 },
      { label: "Cooperative Level", score: 92 },
      { label: "Luck Multiplier", score: 88 }
    ],
    accentColor: "border-amber-500 text-amber-400 bg-amber-950/20"
  },
  {
    id: "mai",
    name: "Mai (枚)",
    avatar: "👩",
    avatarBg: "from-cyan-500 to-blue-600",
    country: "Vietnam",
    countryFlag: "🇻🇳",
    specialty: "Live Dealer Baccarat Co-Host",
    voiceName: "Puck",
    personality: "Graceful, analytical, monitors player-vs-banker road trends, adds Vietnamese terms (Xin chào, Em chào anh).",
    tagline: "Big Road shows the Dragon trend! Trust your dealer and place your bet.",
    systemInstruction: "You are Mai, a graceful, sharp Vietnamese Virtual AI Live Casino Streamer and Co-host, custom engineered by Future Global. You specilaize in Baccarat mathematical trends and Banker/Player strategies. You speak in reassuring, elegant, and intelligent tones. Weave in Vietnamese words like 'Xin chào', Em chào, and 'Cố lên' (fighting!). Keep answers concise, helping the analytical high-roller trust the game matrices.",
    traits: [
      { label: "Trend Analysis", score: 95 },
      { label: "Calm Focus", score: 90 },
      { label: "Baccarat Mastery", score: 96 }
    ],
    accentColor: "border-cyan-500 text-cyan-400 bg-cyan-950/20"
  },
  {
    id: "siti",
    name: "Siti (西蒂)",
    avatar: "👩‍🦳",
    avatarBg: "from-emerald-500 to-teal-600",
    country: "Indonesia",
    countryFlag: "🇮🇩",
    specialty: "eSports Analyst & Broadcaster",
    voiceName: "Zephyr",
    personality: "Passionate about Esports (MPL, Mobile Legends), speaks in Indonesian gaming slangs (Mantap, Ayo, Gacor).",
    tagline: "Indonesian tournament hype is real! Let's lock in our esports slips!",
    systemInstruction: "You are Siti, a bubbly, sports and esports loving Indonesian Virtual AI livestream hostess, custom crafted by Future Global. You cheer for high-odds sports Slips and Mobile Legends tournaments. You are loud, exciting, using Indonesian hype words like 'Mantap!', 'Gacor!', 'Ayo main!'. Keep your responses short, funny, with high gaming team loyalty.",
    traits: [
      { label: "Tournament Hype", score: 99 },
      { label: "Esports Logic", score: 87 },
      { label: "Dynamic Speech", score: 93 }
    ],
    accentColor: "border-emerald-500 text-emerald-400 bg-emerald-950/20"
  },
  {
    id: "alisa",
    name: "Alisa (艾莉莎)",
    avatar: "👱‍♀️",
    avatarBg: "from-fuchsia-500 to-purple-600",
    country: "Taiwan",
    countryFlag: "🇹🇼",
    specialty: "Interactive Vocalist Cheerleader",
    voiceName: "Charon",
    personality: "Sweet, sings cheerful luck lines, encourages smart bankroll management, adds traditional Taiwanese warmth.",
    tagline: "每天都要好運氣！讓我唱歌為你的高額返水加油吧！",
    systemInstruction: "You are Alisa, a sweet-voiced Taiwanese Virtual AI Cheerleader and hostess from Future Global. You sing short, rhythmic cheering songs, welcome players with sweet traditional terms (哈囉，加油唷，心想事成！), and friendly advise them to keep stable high rolls for cash rebates. Keep comments sweet, concise, helpful, and pleasant.",
    traits: [
      { label: "Vocal Melody", score: 97 },
      { label: "Sweetness Scale", score: 99 },
      { label: "Bankroll Safety Advice", score: 94 }
    ],
    accentColor: "border-fuchsia-500 text-fuchsia-400 bg-fuchsia-950/20"
  }
];

interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  audioUrl?: string; // Cache generated audio
  voiceSynthesized?: boolean;
}

export default function AiCheerleaderDesk() {
  const [selectedCheerleader, setSelectedCheerleader] = useState<Cheerleader>(CHEERLEADERS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Sawatdee ka! 🇹🇭 I am Linn, your personal AI Cheerleader! I'm synchronized with the Future Global Technology slots lobby matrices. Spin the reels, and I'll cheer you on to Golden Crowns in real time! Ask me anything, or simulate game scores below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [synthQueue, setSynthQueue] = useState<string[]>([]);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSelectCheerleader = (c: Cheerleader) => {
    setSelectedCheerleader(c);
    setMessages([
      {
        id: `welcome-${c.id}`,
        role: "assistant",
        content: `*Welcome stream initiated* ${c.countryFlag} Active stream hijacked by **${c.name}**! Topic: ${c.specialty}. "${c.tagline}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText ? customText.trim() : inputVal.trim();
    if (!textToSend) return;

    if (!customText) {
      setInputVal("");
    }

    // Append user message
    const userMsgId = `user-${Date.now()}`;
    const newMsgs: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: "user",
        content: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(newMsgs);
    setIsTyping(true);

    try {
      // Call secure server chat endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterId: selectedCheerleader.id,
          messages: newMsgs.filter(m => m.role !== "system").map(m => ({
            role: m.role,
            content: m.content
          })),
          systemInstruction: selectedCheerleader.systemInstruction,
          safetyLevel: "standard",
          temperature: 0.85
        })
      });

      const data = await response.json();
      const botText = data.text || "Hello! Let's win together!";

      // Create assistant message
      const botMsgId = `bot-${Date.now()}`;
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: "assistant",
          content: botText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Automatically synthesize TTS if not muted
      if (!isMuted) {
        synthesizeSpeech(botMsgId, botText);
      }

    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content: `*Connection static* Let's cheer again! ${selectedCheerleader.name} smiles and claps! ✨`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const synthesizeSpeech = async (msgId: string, text: string) => {
    // Check if we already synthesized this
    const idx = messages.findIndex(m => m.id === msgId);
    if (idx !== -1 && messages[idx].audioUrl) {
      playAudioBinary(messages[idx].audioUrl!, msgId);
      return;
    }

    setPlayingAudioId(msgId);
    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          voiceName: selectedCheerleader.voiceName
        })
      });

      const data = await response.json();
      if (data.success && data.base64Audio) {
        const audioUri = `data:${data.mimeType || "audio/wav"};base64,${data.base64Audio}`;
        
        // Cache audio on message
        setMessages((prev) => 
          prev.map((m) => m.id === msgId ? { ...m, audioUrl: audioUri, voiceSynthesized: true } : m)
        );

        playAudioBinary(audioUri, msgId);
      } else {
        setPlayingAudioId(null);
      }
    } catch (err) {
      console.error("TTS failed", err);
      setPlayingAudioId(null);
    }
  };

  const playAudioBinary = (audioUri: string, msgId: string) => {
    setPlayingAudioId(msgId);
    const audio = new Audio(audioUri);
    audio.onended = () => setPlayingAudioId(null);
    audio.onerror = () => setPlayingAudioId(null);
    audio.play().catch(e => {
      console.warn("Audio playing requires interaction first", e);
      setPlayingAudioId(null);
    });
  };

  // Instant trigger events for simulation
  const handleGameEventTrigger = (eventLabel: string, scenarioDesc: string) => {
    handleSendMessage(`[Trigger In-Game Event]: ${scenarioDesc}. React in-character right now with congratulations!`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in text-left text-slate-100" id="ai-cheerleader-central-desk">
      
      {/* 1. SELECTIVE CHEERLEADER ROSTER (Left Column) */}
      <div className="space-y-6">
        <div className="p-5 bg-slate-900 border border-slate-805 rounded-3xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider font-display flex items-center gap-1.5">
              <Award className="w-5 h-5 text-yellow-500 animate-pulse" />
              <span>Future Global AI Avatar Roster</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Select an AI Cheerleader to broadcast live support in Southeast Asian dialects.
            </p>
          </div>

          <div className="space-y-3">
            {CHEERLEADERS.map((c) => {
              const isSelected = selectedCheerleader.id === c.id;
              return (
                <div 
                  key={c.id}
                  onClick={() => handleSelectCheerleader(c)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isSelected 
                      ? "bg-slate-950 border-yellow-500/40 shadow-xl" 
                      : "bg-slate-900/40 border-slate-850 hover:bg-slate-950/60 hover:border-slate-750"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.avatarBg} text-lg flex items-center justify-center shrink-0`}>
                      {c.avatar}
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-extrabold text-white group-hover:text-yellow-400 duration-100">{c.name}</h4>
                        <span className="text-xs">{c.countryFlag}</span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase">{c.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected ? (
                      <span className="w-4 h-4 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center text-[10px] font-bold border border-yellow-500/20">
                        ✓
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-650 group-hover:translate-x-0.5 duration-150 transition-transform" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Trait Analysis of the selected Cheerleader */}
        <div className="p-5 bg-slate-900 border border-slate-805 rounded-3xl space-y-4">
          <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
            Avatar Model Specifications
          </h4>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 space-y-3.5 text-xs font-mono">
            <div className="flex justify-between font-mono text-[10.5px]">
              <span className="text-slate-500">Gemini Model</span>
              <span className="text-indigo-400 font-bold">gemini-3.5-flash</span>
            </div>
            <div className="flex justify-between font-mono text-[10.5px]">
              <span className="text-slate-500">TTS Engine</span>
              <span className="text-emerald-400">gemini-3.1-flash-tts</span>
            </div>
            
            <div className="border-t border-slate-850 pt-3 space-y-3">
              {selectedCheerleader.traits.map((tr, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400 font-sans">{tr.label}</span>
                    <span className="text-white font-bold">{tr.score}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1">
                    <div 
                      className="bg-yellow-500 h-full rounded-full"
                      style={{ width: `${tr.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE BROADCAST DECK (Right Columns - span 2) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-805 rounded-3xl overflow-hidden flex flex-col h-[650px] shadow-2xl">
          
          {/* Header Stream indicators */}
          <div className="bg-slate-950 p-4 border-b border-slate-855 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-[10px] bg-red-950 text-red-500 font-mono font-bold px-2 py-0.5 rounded border border-red-900/60 uppercase">
                LIVE BROADCAST
              </span>
              <span className="text-xs text-slate-300 font-extrabold max-w-[120px] md:max-w-none truncate">
                {selectedCheerleader.name}'s Gaming Room
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                  isMuted 
                    ? "bg-red-950/40 border-red-900 text-red-400" 
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                }`}
                title={isMuted ? "Unmute Voice synthesize" : "Mute Voice synthesize"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <span className="text-[10px] text-slate-500 font-mono">LATENCY: 12ms</span>
            </div>
          </div>

          {/* Interactive Streams Arena Panel splitting screen into layout */}
          <div className="flex-1 bg-gradient-to-b from-slate-955 to-slate-950 p-4 overflow-y-auto flex flex-col justify-between space-y-4 scroll-smooth">
            
            {/* The Live Video HUD Display */}
            <div className="bg-slate-900 rounded-2xl border border-slate-850 p-4 flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/[0.02] rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3.5 text-center md:text-left">
                <span className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedCheerleader.avatarBg} text-3xl flex items-center justify-center border border-slate-755 shadow-lg`}>
                  {selectedCheerleader.avatar}
                </span>
                <div className="space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-1.5">
                    <h4 className="text-sm font-black text-white">{selectedCheerleader.name}</h4>
                    <span className="text-xs">{selectedCheerleader.countryFlag}</span>
                  </div>
                  <p className="text-xs text-slate-400 italic">"{selectedCheerleader.tagline}"</p>
                </div>
              </div>

              {/* Status boxes */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono shrink-0 w-full md:w-auto">
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 uppercase block text-[8px]">Broadcasting Role</span>
                  <span className="text-yellow-400 font-bold">{selectedCheerleader.specialty}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                  <span className="text-slate-500 uppercase block text-[8px]">Active Voice ID</span>
                  <span className="text-emerald-400 font-bold">{selectedCheerleader.voiceName} TTS</span>
                </div>
              </div>
            </div>

            {/* Chat list stack */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[340px] pr-1.5 dynamic-chat-scroll text-xs">
              {messages.map((m) => {
                const isUser = m.role === "user";
                const isSystem = m.role === "system";
                
                if (isSystem) {
                  return (
                    <div key={m.id} className="text-center py-1 font-mono text-[10px] text-slate-500">
                      {m.content}
                    </div>
                  );
                }

                return (
                  <div 
                    key={m.id} 
                    className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {!isUser && (
                      <span className={`h-8 h-8 w-8 rounded-lg bg-gradient-to-br ${selectedCheerleader.avatarBg} text-sm flex items-center justify-center shrink-0`}>
                        {selectedCheerleader.avatar}
                      </span>
                    )}
                    <div className="space-y-0.5 max-w-[80%]">
                      <div className={`flex items-center gap-1.5 text-[10px] text-slate-550 ${isUser ? "justify-end" : "justify-start"}`}>
                        <span className="font-bold text-slate-400">{isUser ? "You" : selectedCheerleader.name}</span>
                        <span>•</span>
                        <span>{m.timestamp}</span>
                      </div>
                      <div className={`p-3 rounded-2xl leading-normal border text-xs text-left ${
                        isUser 
                          ? "bg-yellow-500 text-slate-950 border-yellow-400/20 font-sans font-medium rounded-tr-none" 
                          : "bg-slate-900 text-slate-200 border-slate-810 rounded-tl-none whitespace-pre-wrap"
                      }`}>
                        {m.content}
                      </div>

                      {/* TTS voice trigger button in assistant bubble */}
                      {!isUser && (
                        <div className="flex items-center gap-2 pt-1 font-mono text-[9px]">
                          <button
                            onClick={() => synthesizeSpeech(m.id, m.content)}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-800 bg-slate-900/60 hover:border-slate-650 text-slate-400 hover:text-white cursor-pointer ${
                              playingAudioId === m.id ? "border-emerald-600 text-emerald-400 hover:text-emerald-300" : ""
                            }`}
                          >
                            <Volume2 className={`w-3 h-3 ${playingAudioId === m.id ? "animate-bounce" : ""}`} />
                            <span>{playingAudioId === m.id ? "Speaking..." : m.audioUrl ? "Voice Play" : "Synth Voice"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start gap-2.5">
                  <span className={`h-8 w-8 rounded-lg bg-gradient-to-br ${selectedCheerleader.avatarBg} text-sm flex items-center justify-center shrink-0`}>
                    {selectedCheerleader.avatar}
                  </span>
                  <div className="bg-slate-900 p-3 rounded-2xl rounded-tl-none border border-slate-810 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="pt-2 border-t border-slate-850/60 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={`Ask ${selectedCheerleader.name} about slots stats, baccarat rules, or say hi...`}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 rounded-xl duration-150 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* 3. SIMULATOR GAME EVENT ROAD BLOCK TRIGGER COCKPIT */}
        <div className="p-5 bg-slate-900 border border-slate-805 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-yellow-500" />
              <span>Simulate Real-Time In-Game Events</span>
            </h4>
            <span className="text-[10px] text-slate-550 font-mono">TEST INTERACTION</span>
          </div>

          <p className="text-xs text-slate-400 leading-normal font-sans">
            Click any action below to trigger instant in-game updates in the lobby. The Virtual AI Cheerleader will intercept the database log and shout out custom celebratory responses!
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleGameEventTrigger("Slot Big Win", "The player just spun Golden Slots and triggered a magnificent 100x BIG WIN! Gold crowns are cascading down!")}
              className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-yellow-500/20 rounded-xl text-left space-y-1 group transition-all cursor-pointer"
            >
              <span className="text-[14px] block group-hover:scale-110 duration-150 transition-transform">🎰</span>
              <h5 className="text-[10.5px] font-bold text-slate-200 uppercase">Slot 100x Win</h5>
              <p className="text-[9px] text-slate-500 leading-tight">Trigger Slot Big Win</p>
            </button>

            <button
              onClick={() => handleGameEventTrigger("Baccarat banker win", "The user placed 1,000 credits on Banker, the dealers hand drew a third card to get 9 points! Banker wins the round! The user doubles their money!")}
              className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-blue-500/20 rounded-xl text-left space-y-1 group transition-all cursor-pointer"
            >
              <span className="text-[14px] block group-hover:scale-110 duration-150 transition-transform">🃏</span>
              <h5 className="text-[10.5px] font-bold text-slate-200 uppercase">Baccarat Banker</h5>
              <p className="text-[9px] text-slate-500 leading-tight">Predict natural 9 score</p>
            </button>

            <button
              onClick={() => handleGameEventTrigger("Esports MPL Win", "The player won an Esports bet slip for the Indonesian MPL Grand Finals, selecting eVos Esports which defeated RRQ on a clean squad swipe!")}
              className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-emerald-500/20 rounded-xl text-left space-y-1 group transition-all cursor-pointer"
            >
              <span className="text-[14px] block group-hover:scale-110 duration-150 transition-transform">🏆</span>
              <h5 className="text-[10.5px] font-bold text-slate-200 uppercase">MPL Bet Won</h5>
              <p className="text-[9px] text-slate-500 leading-tight">Celebrate esports triumph</p>
            </button>

            <button
              onClick={() => handleGameEventTrigger("Kraken Captured", "The player captured the legendary Giant Kraken golden boss in Siam Fishing Hunter with a 500x weapon blast!")}
              className="p-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 hover:border-cyan-500/20 rounded-xl text-left space-y-1 group transition-all cursor-pointer"
            >
              <span className="text-[14px] block group-hover:scale-110 duration-150 transition-transform">🐠</span>
              <h5 className="text-[10.5px] font-bold text-slate-200 uppercase">Kraken Captured</h5>
              <p className="text-[9px] text-slate-500 leading-tight">Golden Fishing boss captured</p>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
