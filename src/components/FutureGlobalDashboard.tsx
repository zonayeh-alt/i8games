import React, { useState, useEffect } from "react";
import { 
  Server, 
  Cpu, 
  Layers, 
  Network, 
  Activity, 
  Database, 
  Zap, 
  Cloud, 
  MapPin, 
  TrendingUp, 
  RefreshCw, 
  CheckCircle,
  AlertOctagon
} from "lucide-react";

export default function FutureGlobalDashboard() {
  const [activeTraffic, setActiveTraffic] = useState(34200);
  const [gkePods, setGkePods] = useState(4);
  const [scaleMode, setScaleMode] = useState<"IDLE" | "AUTO_SCALE" | "STORM">("IDLE");
  const [cpuUtilization, setCpuUtilization] = useState(48);
  const [databaseLagMs, setDatabaseLagMs] = useState(12);
  const [isSyncing, setIsSyncing] = useState(false);

  // Auto-scenarios based on ScaleMode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (scaleMode === "STORM") {
      interval = setInterval(() => {
        setActiveTraffic((t) => Math.min(120000, t + Math.floor(Math.random() * 8000) + 2000));
        setGkePods((p) => Math.min(16, p + (Math.random() > 0.5 ? 1 : 0)));
        setCpuUtilization((c) => Math.min(94, Math.max(78, c + Math.floor(Math.random() * 4) - 2)));
        setDatabaseLagMs((l) => Math.min(32, Math.max(18, l + (Math.random() > 0.6 ? 1 : -1))));
      }, 1000);
    } else if (scaleMode === "AUTO_SCALE") {
      interval = setInterval(() => {
        setActiveTraffic((t) => Math.floor(t * 0.95 + Math.random() * 1000));
        setGkePods((p) => Math.max(6, p - (Math.random() > 0.7 ? 1 : 0)));
        setCpuUtilization((c) => Math.max(50, c - 2));
        setDatabaseLagMs((l) => Math.max(8, l - 1));
      }, 1500);
    } else {
      interval = setInterval(() => {
        setActiveTraffic((t) => Math.max(25000, Math.min(35000, t + Math.floor(Math.random() * 600) - 300)));
        setGkePods(4);
        setCpuUtilization((c) => Math.max(35, Math.min(55, c + Math.floor(Math.random() * 4) - 2)));
        setDatabaseLagMs((l) => Math.max(5, Math.min(15, l + (Math.random() > 0.5 ? 1 : -1))));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [scaleMode]);

  const triggerGkeStorm = () => {
    setScaleMode("STORM");
    setCpuUtilization(82);
    setDatabaseLagMs(24);
  };

  const handleCoolDown = () => {
    setScaleMode("AUTO_SCALE");
  };

  const handleReset = () => {
    setScaleMode("IDLE");
    setActiveTraffic(34200);
  };

  const syncDatabases = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setDatabaseLagMs(4);
    }, 1800);
  };

  // Node locations info
  const regions = [
    { country: "新加坡 SG Core", ip: "10.142.0.12", role: "Primary DB Master", ping: "4ms", load: "34%" },
    { country: "泰國 TH Edge", ip: "35.240.165.8", role: "GKE Ingress Hub", ping: "15ms", load: "54%" },
    { country: "越南 VN Edge", ip: "34.124.95.101", role: "GKE Ingress Hub", ping: "22ms", load: "61%" },
    { country: "印尼 ID Edge", ip: "34.87.112.44", role: "CDN Cache Node", ping: "28ms", load: "47%" },
    { country: "台灣 TW Node", ip: "104.199.192.5", role: "GenAI Avatar Host", ping: "12ms", load: "18%" }
  ];

  return (
    <div className="bg-slate-900 border border-slate-805 rounded-3xl p-6 lg:p-8 space-y-8 animate-fade-in text-left text-slate-100" id="future-global-infra-dashboard">
      
      {/* Upper Brand & Workload Intro */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-800 pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-950 px-2 py-0.5 rounded border border-emerald-900">
              Future Global Tech Core
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white font-display uppercase tracking-tight">
            未來全球科技 INFRASTRUCTURE & WORKLOAD CENTER
          </h2>
          <p className="text-xs text-slate-400">
            Real-time monitoring of our Google Cloud Platform (GCP) custom GKE cluster deployments and globally replicated low-latency microservice databases.
          </p>
        </div>

        <div className="flex gap-2">
          <span className="text-[10px] bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-slate-400 font-mono font-bold">
            EST. ARR: <span className="text-yellow-400">$3,300,000 USD</span>
          </span>
          <span className="text-[10px] bg-indigo-955 border border-indigo-900 px-3 py-1.5 rounded-lg text-indigo-300 font-mono font-bold">
            REPLICA NODE COUNT: <span className="text-white">5 GLOBAL</span>
          </span>
        </div>
      </div>

      {/* Grid of Simulated Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Dynamic traffic */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/[0.01] rounded-full blur-xl" />
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black">ACTIVE PLAYER STREAMS</span>
              <div className="text-2xl font-extrabold text-white font-mono tracking-tight">
                {activeTraffic.toLocaleString()} <span className="text-xs text-slate-500 font-sans font-normal">req/s</span>
              </div>
            </div>
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="mt-3 text-[10px] text-slate-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>High Load Multi-Tenant Routing</span>
          </div>
        </div>

        {/* GKE Containers status */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black">GKE ACTIVE POD REPLICAS</span>
              <div className="text-2xl font-extrabold text-yellow-500 font-mono tracking-tight">
                {gkePods} / 16 <span className="text-xs text-slate-500 font-sans font-normal">Active</span>
              </div>
            </div>
            <Server className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-yellow-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(gkePods / 16) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-mono">
              <span>MIN: 4 PODS</span>
              <span>MAX: 16 (HPA STORM)</span>
            </div>
          </div>
        </div>

        {/* Distributed CPU utilization */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black">CLUSTER CORES CPU</span>
              <div className="text-2xl font-extrabold text-orange-400 font-mono tracking-tight">
                {cpuUtilization}%
              </div>
            </div>
            <Cpu className="w-5 h-5 text-orange-400" />
          </div>
          <div className="mt-3">
            <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${cpuUtilization}%` }}
              />
            </div>
            <span className="text-[9px] text-slate-500 mt-1 block font-mono">
              GCP Compute Engine E2-Standard Cores
            </span>
          </div>
        </div>

        {/* Global Database Replication Sync */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-slate-500 uppercase font-black">DB REPLICA SYNC DELAY</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono tracking-tight">
                {databaseLagMs}ms
              </div>
            </div>
            <Database className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="mt-3 text-[10px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cockroach Sharded DB</span>
            </span>
            <button 
              onClick={syncDatabases}
              disabled={isSyncing}
              className="px-2 py-0.5 bg-slate-905 hover:bg-slate-850 border border-slate-800 text-[8px] uppercase tracking-wider font-bold rounded text-slate-300 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-2.5 h-2.5 ${isSyncing ? "animate-spin" : ""}`} />
              Sync
            </button>
          </div>
        </div>

      </div>

      {/* Main interactive infrastructure grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Interactive GKE scaling cockpit */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-850 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Cloud className="w-4 h-4 text-indigo-400 animate-bounce" />
                <span>GKE Scaling Interactive Console</span>
              </h3>
              <span className="text-[9px] bg-indigo-950 text-indigo-300 font-mono px-2 py-0.3 rounded border border-indigo-900 font-bold">
                TESTBED ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              To handle millions of bets simultaneously during SEA regional peak hours (Slots jackpot drops or Sports finals), GKE utilizes an Horizontal Pod Autoscaler (HPA) to scale nodes in seconds. Experience it below:
            </p>

            <div className="bg-slate-900 rounded-xl p-3 border border-slate-850 space-y-2.5 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Autoscaling Regime</span>
                <span className={`font-semibold ${
                  scaleMode === "STORM" ? "text-red-400 animate-pulse" : scaleMode === "AUTO_SCALE" ? "text-yellow-400" : "text-emerald-400"
                }`}>
                  {scaleMode === "STORM" ? "⚠️ TRAFFIC STORM SIM" : scaleMode === "AUTO_SCALE" ? "🔄 COOL DOWN TRANSITION" : "🟢 IDLE BALANCED LOAD"}
                </span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-500">Active GKE Host Clusters</span>
                <span>gke-asia-east-cluster-01</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-slate-500">Auto-Scaling Latency Penalty</span>
                <span className="text-emerald-400 font-bold">0.82ms (Optimized)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3">
            <button
              onClick={triggerGkeStorm}
              className={`py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                scaleMode === "STORM" 
                  ? "bg-red-950 border-red-500 text-red-300 animate-pulse font-extrabold"
                  : "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-400"
              }`}
            >
              🚀 Simulate Storm
            </button>
            <button
              onClick={handleCoolDown}
              className={`py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                scaleMode === "AUTO_SCALE" 
                  ? "bg-yellow-950 border-yellow-500 text-yellow-300 font-extrabold"
                  : "bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
              }`}
            >
              🔄 Cold Scale
            </button>
            <button
              onClick={handleReset}
              className="py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 cursor-pointer"
            >
              Reset Lobby
            </button>
          </div>
        </div>

        {/* Middle: Cloud Multi-Region Replication Shard Table */}
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl p-5 border border-slate-850 space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Network className="w-4 h-4 text-emerald-400" />
            <span>Active Cloud Database Replica Shards</span>
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-850">
            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="bg-slate-900 text-slate-500 text-[9px] font-mono uppercase tracking-widest border-b border-slate-850">
                  <th className="p-2.5">Region Location</th>
                  <th className="p-2.5">Internal IP</th>
                  <th className="p-2.5 font-bold">Node Role</th>
                  <th className="p-2.5">DB Latency</th>
                  <th className="p-2.5">Cores Load</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-[11px] font-mono">
                {regions.map((reg, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="p-2.5 font-sans font-semibold text-slate-200 flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                      {reg.country}
                    </td>
                    <td className="p-2.5 text-slate-400">{reg.ip}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.2 rounded text-[9px] ${
                        idx === 0 
                          ? "bg-indigo-950 border border-indigo-900 text-indigo-400 font-bold" 
                          : "bg-slate-900 border border-slate-800 text-slate-400"
                      }`}>
                        {reg.role}
                      </span>
                    </td>
                    <td className="p-2.5 text-emerald-400 font-bold">{idx === 0 ? "1ms" : reg.ping}</td>
                    <td className="p-2.5 text-right pr-6">{reg.load}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* GCP Technical Workflow Blueprint Section */}
      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 space-y-4">
        <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
          <span>Google Cloud Core Architectures • 2026 i-Gaming Platform Solution</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-850 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900 font-mono flex items-center justify-center text-xs shrink-0 font-bold">1</span>
            <div className="space-y-1">
              <h5 className="font-extrabold text-xs text-slate-200 uppercase">GKE Container Ingress</h5>
              <p className="text-[11px] text-slate-400 leading-normal font-sans">
                Lobby microservices run in isolated, dynamically-scaled Kubernetes pods. Cloud Load Balancer distributes user HTTP sessions to nearest edge ingresses with zero-interruption deployments.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-850 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-900 font-mono flex items-center justify-center text-xs shrink-0 font-bold">2</span>
            <div className="space-y-1">
              <h5 className="font-extrabold text-xs text-slate-200 uppercase">Global Spanner Ledger</h5>
              <p className="text-[11px] text-slate-400 leading-normal font-sans">
                All slot turnovers, balance deductions and checkout payments occur on a distributed ACID-compliant Google Spanner database, completely preventing overlapping spin calculations.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-850 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-yellow-950 text-yellow-400 border border-yellow-900 font-mono flex items-center justify-center text-xs shrink-0 font-bold">3</span>
            <div className="space-y-1">
              <h5 className="font-extrabold text-xs text-slate-200 uppercase">Interactive GenAI Stream</h5>
              <p className="text-[11px] text-slate-400 leading-normal font-sans">
                Dynamic game logs (Slot wins, sports predictions, baccarat trends) are securely formatted on our backend, feeding Gemini prompts to generate conversational, vocalized commentary.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
