import React from "react";
import { OrchestrationSettings, Character, Scenario, LogEntry } from "../types";
import { Sliders, ShieldCheck, Cpu, Play, Terminal, HelpCircle, FileText, Settings, WifiOff } from "lucide-react";

interface OrchestrationPanelProps {
  settings: OrchestrationSettings;
  activeCharacter: Character;
  scenarios: Scenario[];
  logs: LogEntry[];
  hasGeminiKey: boolean;
  onSettingsChange: (updated: Partial<OrchestrationSettings>) => void;
  onClearLogs: () => void;
}

export default function OrchestrationPanel({
  settings,
  activeCharacter,
  scenarios,
  logs,
  hasGeminiKey,
  onSettingsChange,
  onClearLogs,
}: OrchestrationPanelProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-full" id="orchestration-panel-card">
      {/* Dev Header */}
      <div className="border-b border-slate-800 bg-slate-950 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h2 className="text-sm font-sans font-bold uppercase tracking-wider text-white">i8 GenAI Orchestrator</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">
            Vertex AI Core
          </span>
          {hasGeminiKey ? (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/35 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE (Gemini API)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              SIMULATED MODE
            </span>
          )}
        </div>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        {/* API Credentials Info Badge if missing */}
        {!hasGeminiKey && (
          <div className="bg-slate-950/90 border border-amber-500/20 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-sans font-semibold">
              <WifiOff className="w-4 h-4" />
              <span>Vertex AI / Google Cloud Integration Info</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              This application is fully loaded for live AI generation. To activate live server calls to <strong>gemini-3.5-flash</strong>, <strong>gemini-3.1-flash-tts</strong>, and <strong>gemini-2.5-flash-image</strong>, please configure your <code>GEMINI_API_KEY</code> inside the <strong>Settings &gt; Secrets</strong> pane in your AI Studio dashboard.
            </p>
          </div>
        )}

        {/* Model & Temperature Control Box */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-slate-500">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Hyper-Parameters Tuning</span>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-4">
            {/* Model Node Mapping */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Dialogue Agent LLM Node</label>
              <select
                disabled
                className="w-full text-xs bg-slate-900 border border-slate-800 text-slate-300 font-mono rounded-lg px-2.5 py-2 focus:outline-hidden cursor-not-allowed"
              >
                <option>gemini-3.5-flash (Low-Latency Conversational)</option>
                <option>gemini-3.1-pro-preview (Paid Reasoning Agent)</option>
              </select>
              <p className="text-[10px] text-slate-500 italic mt-0.5">
                Automatically selected for optimized low-latency gameplay dialogue.
              </p>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium font-sans">Inference Temperature (Randomness)</span>
                <span className="font-mono text-indigo-400 font-semibold">{settings.temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.5"
                step="0.05"
                value={settings.temperature}
                onChange={(e) => onSettingsChange({ temperature: parseFloat(e.target.value) })}
                className="w-full accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>0.1 (Precise Core)</span>
                <span>0.7 (Standard RPG)</span>
                <span>1.5 (High Chaos)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voice Option */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span>Voice Sound (Gemini TTS)</span>
          </div>
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-slate-200 font-medium font-sans">Auto-Speech Voice Synth</div>
                <p className="text-[10px] text-slate-500 leading-normal font-sans">
                  Automatically generate high-fidelity TTS audio for character replies.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoSpeak}
                  onChange={(e) => onSettingsChange({ autoSpeak: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Prompt Template Editor - Massive Prompt Engineering capability representation */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Persona Template & System Prompts</span>
          </div>
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium font-sans">Dynamic Prompt Engineering Override</span>
              <button
                onClick={() => {
                  if (settings.systemPromptOverride) {
                    onSettingsChange({ systemPromptOverride: "" });
                  } else {
                    onSettingsChange({ systemPromptOverride: activeCharacter.systemPromptTemplate });
                  }
                }}
                className="text-[10px] px-2 py-1 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-950/30 text-indigo-400 font-mono rounded-md transition-all"
              >
                {settings.systemPromptOverride ? "Revert Custom Prompt" : "Lock / Customize System Prompt"}
              </button>
            </div>

            {settings.systemPromptOverride ? (
              <textarea
                value={settings.systemPromptOverride}
                onChange={(e) => onSettingsChange({ systemPromptOverride: e.target.value })}
                rows={5}
                className="w-full bg-slate-900 border border-slate-800 font-mono text-[11px] text-emerald-400 p-2.5 rounded-lg focus:outline-hidden focus:border-emerald-500 resize-y"
              />
            ) : (
              <div className="text-[11px] font-mono text-slate-500 bg-slate-900/60 p-3 rounded-lg border border-slate-850 select-none">
                {activeCharacter.systemPromptTemplate}
              </div>
            )}
            <p className="text-[9px] text-slate-500 font-sans leading-relaxed">
              Inject custom characters attributes, slang, system variables, safety filters or instructions live. The core LLM state resets and compiles this instantly upon submission.
            </p>
          </div>
        </div>

        {/* Live Diagnostics Trace */}
        <div className="space-y-3">
          <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>GenAI Telemetry & Diagnostics</span>
            </div>
            <button
              onClick={onClearLogs}
              className="text-[9px] text-slate-500 hover:text-slate-300 font-mono uppercase"
            >
              Flush Stream Logs
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-850 px-3 py-2.5 rounded-lg h-52 font-mono scrollbar-thin text-[10px] overflow-y-auto space-y-1.5 flex flex-col-reverse custom-scrollbar">
            {logs.length === 0 ? (
              <div className="text-slate-600 italic text-center py-4">No active trace streams. Engage chat to fetch telemetry.</div>
            ) : (
              // Display logs in reversed order so new logs appear at the bottom
              [...logs].reverse().map((log, index) => {
                let colorClass = "text-slate-400";
                if (log.type === "api") colorClass = "text-yellow-400";
                if (log.type === "error") colorClass = "text-red-400";
                if (log.type === "voice") colorClass = "text-blue-400";
                if (log.type === "info") colorClass = "text-emerald-400";

                return (
                  <div key={index} className="leading-relaxed border-b border-slate-900/40 pb-1">
                    <span className="text-slate-600 mr-2">[{log.timestamp}]</span>
                    <span className={`${colorClass} font-semibold uppercase mr-1.5`}>{log.type}</span>
                    <span className="text-slate-300">{log.message}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
