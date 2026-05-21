import React, { useState } from "react";
import { Character } from "../types";
import { Shield, Sparkles, Sword, Zap, Brain, Wand2, Volume2, HelpCircle } from "lucide-react";

interface CharacterSheetProps {
  character: Character;
  onAvatarGenerated: (newUrl: string) => void;
  logs: (msg: string, type: "info" | "api" | "error" | "voice") => void;
}

export default function CharacterSheet({ character, onAvatarGenerated, logs }: CharacterSheetProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [customStyle, setCustomStyle] = useState("");
  const [errorText, setErrorText] = useState("");

  const getFallbackIcon = (charId: string) => {
    switch (charId) {
      case "kaelen":
        return <Brain className="w-12 h-12 text-blue-400" />;
      case "vespera":
        return <Zap className="w-12 h-12 text-cyan-400" />;
      case "torin":
        return <Shield className="w-12 h-12 text-amber-500" />;
      case "aria":
        return <Wand2 className="w-12 h-12 text-emerald-400" />;
      default:
        return <Sparkles className="w-12 h-12 text-purple-400" />;
    }
  };

  const handleGenerateAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setErrorText("");
    const basePrompt = customStyle.trim() || `Close-up portrait of ${character.name}, ${character.title} from ${character.gameName}`;
    
    logs(`Requesting Imagen/Gemini 2.5 avatar generation for prompt: "${basePrompt}"`, "api");

    try {
      const response = await fetch("/api/generate-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: basePrompt }),
      });

      const data = await response.json();
      if (data.success && data.imageUrl) {
        onAvatarGenerated(data.imageUrl);
        logs(`Successfully computed avatar image via gemini-2.5-flash-image`, "info");
        setCustomStyle("");
      } else {
        const errorMsg = data.message || data.error || "No credentials found in system secrets.";
        setErrorText(errorMsg);
        logs(`Avatar generation warning: ${errorMsg}`, "error");
      }
    } catch (err: any) {
      console.error(err);
      setErrorText("Failed to establish server contact.");
      logs(`Avatar generation network failure: ${err.message}`, "error");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full" id="character-sheet-card">
      {/* Character Splash Header */}
      <div className="relative h-48 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 border-b border-slate-800">
        {character.avatarUrl ? (
          <img
            src={character.avatarUrl}
            alt={character.name}
            className="w-24 h-24 rounded-full border-2 border-indigo-500 shadow-lg object-cover bg-slate-950"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-24 h-24 rounded-full border-2 border-slate-700 shadow-lg bg-slate-950 flex items-center justify-center transition-all duration-300">
            {getFallbackIcon(character.id)}
          </div>
        )}
        
        <div className="text-center mt-3">
          <h2 className="text-xl font-sans font-bold tracking-tight text-white mb-0.5">{character.name}</h2>
          <p className="text-xs text-indigo-400 font-mono uppercase tracking-wider">{character.title}</p>
        </div>

        <div className="absolute top-3 right-3 bg-slate-950/75 border border-slate-800 text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1.5">
          <Volume2 className="w-3 h-3 text-indigo-400" />
          {character.voiceName} API
        </div>
      </div>

      {/* Main Stats and bio */}
      <div className="p-6 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
        {/* Core Description */}
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Origin Game IP</div>
          <div className="text-sm font-medium text-slate-300 font-sans">{character.gameName}</div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1 bg-slate-950/40 p-3 border border-slate-800/50 rounded-lg italic">
            "{character.bio}"
          </p>
        </div>

        {/* Dynamic Attributes Grid */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Character Engine Attributes (Vertex AI)</div>
          
          <div className="grid grid-cols-1 gap-2.5">
            {/* WISDOM */}
            <div className="bg-slate-950/60 p-3 border border-slate-800/80 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-blue-450" />
                  <span className="text-xs font-mono text-slate-350">WIS (Wisdom & Lore)</span>
                </div>
                <span className="text-xs font-bold font-mono text-blue-400">{character.stats.wisdom}/100</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-blue-500 h-1.5 rounded-full duration-500 transition-all" style={{ width: `${character.stats.wisdom}%` }} />
              </div>
            </div>

            {/* INTELLECT */}
            <div className="bg-slate-950/60 p-3 border border-slate-800/80 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-mono text-slate-350">INT (Intellect & Cypher)</span>
                </div>
                <span className="text-xs font-bold font-mono text-purple-400">{character.stats.intellect}/100</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-purple-500 h-1.5 rounded-full duration-500 transition-all" style={{ width: `${character.stats.intellect}%` }} />
              </div>
            </div>

            {/* COMBAT */}
            <div className="bg-slate-950/60 p-3 border border-slate-800/80 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sword className="w-3.5 h-3.5 text-rose-500" />
                  <span className="text-xs font-mono text-slate-350">ATK (Combat Mastery)</span>
                </div>
                <span className="text-xs font-bold font-mono text-rose-500">{character.stats.combat}/100</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-500 h-1.5 rounded-full duration-500 transition-all" style={{ width: `${character.stats.combat}%` }} />
              </div>
            </div>

            {/* STEALTH */}
            <div className="bg-slate-950/60 p-3 border border-slate-800/80 rounded-lg space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-mono text-slate-350">STL (Stealth & Agility)</span>
                </div>
                <span className="text-xs font-bold font-mono text-emerald-400">{character.stats.stealth}/100</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full duration-500 transition-all" style={{ width: `${character.stats.stealth}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Personality Tags */}
        <div className="space-y-2">
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Personality Directives</div>
          <div className="flex flex-wrap gap-1.5">
            {character.personalityTraits.map((t, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-1 bg-indigo-950/30 border border-indigo-900/40 text-indigo-300 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Aegis Portrait Forge Component */}
        <div className="border border-slate-850 bg-slate-950/80 rounded-xl p-4.5 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
              <h3 className="text-xs font-sans font-semibold text-white tracking-wide">AI Avatar Portrait Forge</h3>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-indigo-400">
              Gemini 2.5 Image
            </span>
          </div>

          <p className="text-[11px] text-slate-400 leading-normal">
            Generate custom clothing, equipment, or style variations. Input design instructions below to render dynamic art.
          </p>

          <form onSubmit={handleGenerateAvatar} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Vintage line-art comic, cyberpunk neon visor, oil painting style..."
                value={customStyle}
                onChange={(e) => setCustomStyle(e.target.value)}
                disabled={isGenerating}
                className="w-full text-xs bg-slate-900 text-white rounded-lg pl-3 pr-8 py-2 border border-slate-800 focus:outline-hidden focus:border-indigo-500 placeholder-slate-600 disabled:opacity-50 font-sans font-medium"
              />
              <button
                type="submit"
                disabled={isGenerating}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 disabled:opacity-50 cursor-pointer"
                title="Forge Avatar"
              >
                <Wand2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick-Forge Premium Style Presets */}
            <div className="space-y-1">
              <div className="text-[9px] uppercase font-mono tracking-wider text-slate-500">Quick-Forge Premium Presets:</div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "⚡ Cyberpunk", prompt: `Close-up cyberpunk portrait of ${character.name}, glowing neon implants, high-tech cypher interface, premium concept art` },
                  { label: "🎨 Oil Masterpiece", prompt: `Fine oil painting portrait of ${character.name}, moody dark fantasy ambient light, rich volumetric strokes, highly detailed artstation style` },
                  { label: "✏️ Retro Anime", prompt: `90s retro anime hand-drawn cell sketch of ${character.name}, vintage manga cell shading, classic detailed ink outline` },
                  { label: "🎮 Unreal 5 Render", prompt: `Cinematic 3D render of ${character.name}, epic volumetric fog background, modern Unreal Engine 5 model detail` }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isGenerating}
                    onClick={() => {
                      setCustomStyle(preset.prompt);
                      // Trigger synthetic action by constructing event
                      setTimeout(() => {
                        const basePrompt = preset.prompt;
                        setIsGenerating(true);
                        setErrorText("");
                        logs(`Triggered Quick-Preset: Requesting Imagen avatar portrait forge for style "${preset.label}"`, "api");
                        fetch("/api/generate-avatar", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ prompt: basePrompt }),
                        })
                        .then((res) => res.json())
                        .then((data) => {
                          if (data.success && data.imageUrl) {
                            onAvatarGenerated(data.imageUrl);
                            logs(`Computed dynamic preset avatar via gemini-2.5-flash-image`, "info");
                            setCustomStyle("");
                          } else {
                            const errorMsg = data.message || data.error || "No dynamic key found in system secrets.";
                            setErrorText(errorMsg);
                            logs(`Preset generation warn: ${errorMsg}`, "error");
                          }
                        })
                        .catch((err) => {
                          setErrorText("Failed to establish server connection.");
                          logs(`Preset generation network error: ${err.message}`, "error");
                        })
                        .finally(() => {
                          setIsGenerating(false);
                        });
                      }, 50);
                    }}
                    className="text-[9px] font-mono px-2 py-1 bg-slate-900 border border-slate-800 hover:border-indigo-500 text-slate-350 hover:text-white rounded duration-150 transition-colors cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {isGenerating && (
              <div className="flex items-center gap-2 text-[10px] text-indigo-300 font-mono animate-pulse pt-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                Orchestrating Gemini Art Engine... (10-15s)
              </div>
            )}

            {errorText && (
              <div className="text-[10px] bg-red-950/50 hover:bg-red-950/70 border border-red-900/60 rounded px-2.5 py-2 text-red-200 leading-normal transition-colors">
                <div className="font-semibold text-red-400 mb-0.5">Key Required:</div>
                {errorText === "GEMINI_API_KEY is not configured or is a placeholder." ? (
                  <span>
                    No API Key is configured. Paste your Gemini API key inside the <strong>Settings &gt; Secrets</strong> modal on the platform to activate dynamic image generation. Running on local mock assets.
                  </span>
                ) : (
                  <span>{errorText}</span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
