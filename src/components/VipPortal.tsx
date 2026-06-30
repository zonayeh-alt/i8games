import React, { useState } from "react";
import { Award, Gift, Gem, ShieldCheck, HeartHandshake, UserCheck, Flame } from "lucide-react";

interface VipPortalProps {
  balance: number;
  onUpdateBalance: (amount: number) => void;
  onTriggerNotification: (msg: string, type: "success" | "error" | "info") => void;
}

export default function VipPortal({ balance, onUpdateBalance, onTriggerNotification }: VipPortalProps) {
  const [dailyClaimed, setDailyClaimed] = useState(false);
  const [accumulatedBets, setAccumulatedBets] = useState(24500); // simulated lifetime turnover

  const currentTier = accumulatedBets >= 100000 
    ? { name: "Royal i8", code: "ROYAL", nextLevel: "MAX", req: 100000, perk: "0.8% Unlimited Rebate + Personal Concierge Manager" }
    : accumulatedBets >= 50000 
      ? { name: "Diamond", code: "DIAMOND", nextLevel: "Royal i8", req: 100000, perk: "0.6% Unlimited Rebate + Birthday Gift 2,000 USDT" }
      : accumulatedBets >= 20000 
        ? { name: "Platinum", code: "PLATINUM", nextLevel: "Diamond", req: 50000, perk: "0.5% Cash Rebate + Personal Priority Queue Support" }
        : { name: "Gold Scholar", code: "GOLD", nextLevel: "Platinum", req: 20000, perk: "0.4% Daily Cash Rebate" };

  const vipTiers = [
    { title: "Bronze Tier", turn: "0 USDT", rebate: "0.2%", gift: "10 USDT" },
    { title: "Silver Elite", turn: "5,000 USDT", rebate: "0.3%", gift: "50 USDT" },
    { title: "Gold Scholar", turn: "20,000 USDT", rebate: "0.4%", gift: "200 USDT" },
    { title: "Platinum Club", turn: "50,000 USDT", rebate: "0.5%", gift: "1,000 USDT" },
    { title: "Royal VIP", turn: "100,000 USDT+", rebate: "0.8%", gift: "5,000 USDT" },
  ];

  const handleClaimDaily = () => {
    if (dailyClaimed) {
      onTriggerNotification("You have already claimed today's login reward! Return tomorrow.", "info");
      return;
    }

    const reward = 50; // 50 credits reward
    setDailyClaimed(true);
    onUpdateBalance(reward);
    onTriggerNotification(`🎁 VIP check-in complete! Claimed daily incentive: +${reward} credits!`, "success");
  };

  const incrementBetsSimulate = () => {
    setAccumulatedBets((b) => b + 5000);
    onTriggerNotification("TURNOVER INCREMENTED! Simulated +5,000 USDT turnover.", "success");
  };

  const progressPercent = Math.min(100, (accumulatedBets / currentTier.req) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" id="vip-club-portal-main">
      {/* Level Card Indicator */}
      <div className="bg-gradient-to-br from-yellow-905 via-slate-900 to-slate-950 border border-yellow-500/20 rounded-3xl p-6 flex flex-col justify-between h-[340px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/[0.03] rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] bg-yellow-950 text-yellow-400 font-mono font-bold px-2 py-0.5 rounded border border-yellow-900/60 uppercase">
              VIP MEMBER CARD
            </span>
            <Gem className="w-5 h-5 text-yellow-550 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black text-white uppercase tracking-wider font-display">
              {currentTier.name}
            </h4>
            <p className="text-[10.5px] text-slate-500 font-mono">LIFETIME TURNOVERS: ${accumulatedBets.toLocaleString()} USDT</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>LEVEL PROGRESS</span>
              <span>{progressPercent.toFixed(0)}% TO {currentTier.nextLevel.toUpperCase()}</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-850">
              <div 
                style={{ width: `${progressPercent}%` }}
                className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3.5">
          <div className="bg-slate-955 border border-slate-850 p-3 rounded-xl">
            <div className="text-[9px] text-slate-400 font-mono uppercase font-bold">Current Privilege tier Perks</div>
            <p className="text-xs text-white leading-normal mt-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-550" />
              <span>{currentTier.perk}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleClaimDaily}
              className={`py-2 px-3 text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                dailyClaimed 
                  ? "bg-slate-950 border border-slate-855 text-slate-500 cursor-not-allowed" 
                  : "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black shadow-md shadow-yellow-500/10"
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{dailyClaimed ? "CLAIMED" : "CLAIM REWARD"}</span>
            </button>
            
            <button
              onClick={incrementBetsSimulate}
              className="py-2 px-3 text-[10px] bg-slate-950 hover:bg-slate-850 border border-slate-850 text-slate-350 hover:text-white rounded-lg uppercase tracking-wider font-semibold font-mono"
            >
              SIMULATE TURN
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Perks and Benefits */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-805 rounded-3xl p-6 space-y-5">
        <h3 className="text-sm font-black text-white uppercase tracking-wider font-display border-b border-slate-850 pb-3 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span>EXCLUSIVE VIP CLUB ACCRUAL LEVEL TIERS</span>
        </h3>

        <div className="bg-slate-950 border border-slate-855 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead>
              <tr className="border-b border-slate-855 bg-slate-900/50 text-slate-400 font-mono text-[9px] tracking-wider uppercase">
                <th className="p-3">Rank Designation</th>
                <th className="p-3">Requirement (Turnover)</th>
                <th className="p-3">Daily Rebate Bonus</th>
                <th className="p-3">Promo Upgrade Gift</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850 text-slate-300">
              {vipTiers.map((tier, idx) => (
                <tr 
                  key={idx} 
                  className={`hover:bg-slate-900/40 ${
                    currentTier.name.includes(tier.title.split(" ")[0]) ? "bg-yellow-500/5 font-semibold text-yellow-400" : ""
                  }`}
                >
                  <td className="p-3 text-slate-100 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                    {tier.title}
                  </td>
                  <td className="p-3 font-mono">{tier.turn}</td>
                  <td className="p-3 text-emerald-400 font-mono font-bold">{tier.rebate}</td>
                  <td className="p-3 font-mono">{tier.gift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Benefits Cards Footer breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-200 uppercase">Personal VIP Care Concierge</h5>
              <p className="text-[11px] text-slate-500 leading-normal mt-1">
                Highest ranked tier holders receive direct Telegram / Line communication VIP hostesses addressing deposit speeds and tailored cashback programs.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-yellow-550 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-200 uppercase">Express Fast payout approval</h5>
              <p className="text-[11px] text-slate-500 leading-normal mt-1">
                Withdrawals for VIP level members are flagged with maximum priority, delivering automated funds settlement inside 60 seconds on major currencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
