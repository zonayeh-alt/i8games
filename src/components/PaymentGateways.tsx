import React, { useState } from "react";
import { CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2, QrCode } from "lucide-react";
import { CountryCode, CountryConfig } from "../types";

const SEA_COUNTRIES: Record<CountryCode, CountryConfig> = {
  TH: {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    currency: "THB",
    localBankNames: ["Kasikornbank (K-Bank)", "Siam Commercial Bank (SCB)", "TrueMoney wallet", "PromptPay Dynamic QR"],
    gatewayLogo: "PromptPay Paygate",
  },
  VN: {
    code: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    currency: "VND",
    localBankNames: ["Vietcombank", "Techcombank", "Momo Wallet", "ZaloPay Pay QR"],
    gatewayLogo: "VietQR Gateway",
  },
  ID: {
    code: "ID",
    name: "Indonesia",
    flag: "🇮🇩",
    currency: "IDR",
    localBankNames: ["Bank Central Asia (BCA)", "Bank Mandiri", "GoPay wallet", "OVO Pay Gate"],
    gatewayLogo: "QRIS Instant",
  },
  MY: {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    currency: "MYR",
    localBankNames: ["Maybank2u", "CIMB Clicks", "Touch 'n Go eWallet", "DuitNow Paygate"],
    gatewayLogo: "DuitNow Hub",
  },
  PH: {
    code: "PH",
    name: "Philippines",
    flag: "🇵🇭",
    currency: "PHP",
    localBankNames: ["GCash wallet", "PayMaya", "BDO Unibank", "InstaPay Gate"],
    gatewayLogo: "InstaPay Hub",
  },
  SG: {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    currency: "SGD",
    localBankNames: ["DBS PayLah!", "OCBC Pay Anyone", "UOB Mighty", "PayNow Instant"],
    gatewayLogo: "PayNow QR Hub",
  },
};

interface PaymentGatewaysProps {
  onAddCredits: (amount: number) => void;
  onTriggerNotification: (msg: string, type: "success" | "error" | "info") => void;
}

export default function PaymentGateways({ onAddCredits, onTriggerNotification }: PaymentGatewaysProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("TH");
  const [depositAmount, setDepositAmount] = useState<number>(3000);
  const [activeTab, setActiveTab] = useState<"DEPOSIT" | "WITHDRAW">("DEPOSIT");
  const [showMockPromoOffer, setShowMockPromoOffer] = useState(true);
  const [generatedQR, setGeneratedQR] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const country = SEA_COUNTRIES[selectedCountry];

  const handleCreateGatewayPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) {
      onTriggerNotification("Please input a valid amount!", "error");
      return;
    }

    setIsProcessing(true);
    setGeneratedQR(null);

    setTimeout(() => {
      setIsProcessing(false);
      // Generate mock QR relative to currency
      const randomValue = Math.floor(Math.random() * 850000 + 100000);
      setGeneratedQR(`MOCK_PAYMENT_QR_${country.currency}_${randomValue}`);
      onTriggerNotification(`Gateway generated successfully for ${country.name}!`, "success");
    }, 1200);
  };

  const handleConfirmMockPaid = () => {
    // Top up 1 USDT equals roughly 40 credits
    const creditedTokens = Math.floor(depositAmount / 10);
    onAddCredits(creditedTokens);
    setGeneratedQR(null);
    onTriggerNotification(`🚀 Deposit confirmed! +${creditedTokens} credits added to your wallet.`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" id="payments-gateway-container">
      
      {/* Country selection & parameters */}
      <div className="bg-slate-900 border border-slate-805 rounded-3xl p-6 space-y-5">
        <h3 className="text-sm font-black text-white uppercase tracking-wider font-display border-b border-slate-850 pb-3">
          1. SELECT YOUR LOCAL CHANNELS
        </h3>
        
        <div className="space-y-1.5">
          <label className="text-[10px] text-slate-500 font-mono font-bold uppercase">COUNTRY REGION</label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(SEA_COUNTRIES) as CountryCode[]).map((code) => {
              const item = SEA_COUNTRIES[code];
              return (
                <button
                  key={code}
                  onClick={() => {
                    setSelectedCountry(code);
                    setGeneratedQR(null);
                  }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                    selectedCountry === code 
                      ? "bg-slate-950 border-yellow-500/30 text-white font-semibold" 
                      : "bg-slate-950/45 border-slate-850 text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.flag}</span>
                  <div className="leading-tight">
                    <p className="text-xs">{item.name}</p>
                    <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">{item.currency}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Local supported payment operators lists */}
        <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl space-y-2.5">
          <p className="text-[10px] text-slate-500 font-mono font-bold uppercase">
            SECURE SUPPORTED BANKS & WALLETS
          </p>
          <ul className="space-y-2 text-xs text-slate-350 font-sans">
            {country.localBankNames.map((bank, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{bank}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main interactive form */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-805 rounded-3xl p-6 flex flex-col justify-between h-fit min-h-[380px] relative">
        <div className="space-y-4">
          
          {/* Action toggle tabs */}
          <div className="flex border-b border-slate-850 gap-4">
            <button
              onClick={() => {
                setActiveTab("DEPOSIT");
                setGeneratedQR(null);
              }}
              className={`pb-3 text-xs font-extrabold uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === "DEPOSIT" ? "border-yellow-500 text-yellow-500" : "border-transparent text-slate-500"
              }`}
            >
              Instant Cash-In
            </button>
            <button
              onClick={() => {
                setActiveTab("WITHDRAW");
                setGeneratedQR(null);
              }}
              className={`pb-3 text-xs font-extrabold uppercase tracking-widest border-b-2 transition-colors ${
                activeTab === "WITHDRAW" ? "border-yellow-500 text-yellow-500" : "border-transparent text-slate-500"
              }`}
            >
              Secure Out
            </button>
          </div>

          {activeTab === "DEPOSIT" ? (
            <div className="space-y-4">
              <form onSubmit={handleCreateGatewayPayment} className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono font-bold uppercase">
                    <span>CASH DEPOSIT AMOUNT ({country.currency})</span>
                    <span>10 {country.currency} = 1 CR</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-950 border border-slate-850 text-white font-mono font-bold text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-500">
                      {country.currency}
                    </span>
                  </div>
                </div>

                {/* Grid of quick preset deposits */}
                <div className="grid grid-cols-4 gap-1.5">
                  {[1000, 3000, 10000, 50000].map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      onClick={() => setDepositAmount(preset)}
                      className="px-2.5 py-1.5 bg-slate-950 border border-slate-850/60 rounded-lg text-[10.5px] font-mono text-slate-350 hover:text-white"
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-widest duration-150 transition-all cursor-pointer shadow-md"
                >
                  {isProcessing ? "INITIALIZING SECURE LINK..." : `GENERATE ${country.gatewayLogo.toUpperCase()} NOW`}
                </button>
              </form>

              {/* Secure QR Code Visual block generator */}
              {generatedQR && (
                <div className="bg-slate-950 border border-yellow-500/30 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-4.5 h-4.5 text-yellow-500" />
                    <span className="text-[10px] text-yellow-500 font-mono font-bold uppercase tracking-widest">
                      {country.gatewayLogo} SCAN PAYMENT
                    </span>
                  </div>

                  {/* Mock QR graphic canvas */}
                  <div className="w-44 h-44 bg-white p-3 rounded-xl flex flex-col justify-between relative shadow">
                    {/* Tiny corner lines */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-slate-900" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-slate-900" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-slate-900" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-slate-900" />

                    <div className="flex-1 flex flex-col items-center justify-center p-2">
                      <div className="grid grid-cols-4 gap-2 w-full h-full opacity-80">
                        {/* Simulated QR code blocks */}
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-300 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-300 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-300 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-300 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                        <div className="bg-slate-300 rounded-sm" />
                        <div className="bg-slate-900 rounded-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-white uppercase">{country.name} Regional PromptQR</p>
                    <p className="text-[10px] text-slate-500">Scan using any Thai/VN/ID mobile banking application.</p>
                  </div>

                  <button
                    onClick={handleConfirmMockPaid}
                    className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-lg uppercase transition-colors"
                  >
                    CONFIRM PAYMENT RECEIVED
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2 text-xs text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <p className="leading-relaxed">
                  To proceed with a **secure automated payout**, please establish your payment routing details in the partnership sandbox.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 bg-slate-900/50 rounded border border-slate-800">
                    <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">MINIMUM WITHDRAWAL</p>
                    <p className="text-xs text-white font-mono font-bold">500 {country.currency}</p>
                  </div>
                  <div className="p-2.5 bg-slate-900/50 rounded border border-slate-800">
                    <p className="text-[9px] font-mono text-slate-500 font-bold uppercase">AVERAGE PAYOUT SPEED</p>
                    <p className="text-xs text-emerald-400 font-mono font-bold">&lt; 3 MINUTES</p>
                  </div>
                </div>
              </div>

              {/* Withdrawal placeholder form parameters */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-500 font-mono font-bold uppercase">WITHDRAWAL ROUTING TARGET</label>
                  <select className="w-full bg-slate-950 border border-slate-850 text-slate-300 text-xs px-3 py-2.5 rounded-xl">
                    {country.localBankNames.slice(0, 3).map((bank, i) => (
                      <option key={i}>{bank}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-500 font-mono font-bold uppercase">ACCOUNT NUMBER</label>
                  <input
                    type="text"
                    defaultValue="098-XXX-4592"
                    className="w-full bg-slate-950 border border-slate-850 text-slate-300 font-mono text-xs px-3.5 py-2.5 rounded-xl"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onTriggerNotification("Withdrawal requested successfully!", "success")}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-amber-500 border border-amber-900/40 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  REQUEST DISBURSEMENT
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Brand guarantee banner */}
        <div className="pt-4 mt-6 border-t border-slate-850 text-[10px] text-slate-500 leading-relaxed font-mono flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted with bank-grade SSL / PCI DSS certified gateway networks.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
