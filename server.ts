import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Helper to check for a valid Gemini API Key
const getApiKeyString = (): string | undefined => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY" || key.trim() === "") {
    return undefined;
  }
  return key;
};

// Lazy initialization of GoogleGenAI
let aiInstance: GoogleGenAI | null = null;
const getGeminiClient = (): GoogleGenAI => {
  const apiKey = getApiKeyString();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured or is a placeholder.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
};

// Simulated/Fallback responses for offline or unconfigured states to ensure pristine UX
const getSimulatedResponse = (
  characterId: string,
  userMessage: string,
  scenarioId: string
): { text: string; audioBase64?: string; durationMs: number } => {
  const msgLower = userMessage.toLowerCase();
  let text = "";

  switch (characterId) {
    case "linn":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "Sawatdee ka! Welcome to our high-RTP gold slot machine! I am Linn, your personal Thai cheerleader. Let's spin the golden reels together and land some massive multipliers!";
      } else if (msgLower.includes("event") || msgLower.includes("win") || msgLower.includes("slot")) {
        text = "*Waves gold pom-poms with excitement* Omg, su su! A magnificent gold crown spin landed! Congratulations on triggering the high multipliers! Let's supercharge our streak, ka!";
      } else {
        text = "*Giggles and claps* What a brilliant spin strategy! The i8s.games GKE engine reports perfect high-probability pathways ahead. Ready for the next spin, ka?";
      }
      break;

    case "mai":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "Xin chào! I am Mai, your Vietnamese Live Baccarat co-host. Looking at the dynamic Big Road trend tracker, Banker appears highly favorable today. Let's analyze the deck together.";
      } else if (msgLower.includes("event") || msgLower.includes("win") || msgLower.includes("baccarat")) {
        text = "Em chào anh! What a flawless bet! Banker wins the round with a natural 9 score! Placing bets with balanced commission logic truly shows your master strategic mind. Well played!";
      } else {
        text = "*Nods gracefully, reviewing the card stats* Fascinating cards sequence. Let's stay composed and distribute our risk ratios correctly on the local checkout escrow.";
      }
      break;

    case "siti":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "Ayo! Mantap! Siti on stream! Welcome to our Southeast Asian Esports Arena. If you select Mobile Legends MPL rosters, I'll analyze team stats and match odds in real-time.";
      } else if (msgLower.includes("event") || msgLower.includes("win") || msgLower.includes("esports")) {
        text = "*Jumps up and cheers* Goal!!! Ayo, our selected team sweeps the finals! Our Sabah odds were optimized perfectly. Your ticket is fully green, boss!";
      } else {
        text = "*Gives a thumbs up* That is a high-risk high-reward strategy, but that's exactly what makes esports Gacor! Let's lock in the next live bet slip.";
      }
      break;

    case "alisa":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "哈囉！我是 Alisa！很高興在未來全球科技（Future Global）精心開發的線上娛樂城遇見你！今天讓我唱歌為你的高額返水加油，祝你心想事成、喜從天降唷！";
      } else if (msgLower.includes("event") || msgLower.includes("win") || msgLower.includes("boss") || msgLower.includes("kraken")) {
        text = "*甜美唱歌歡呼* 恭喜你成功捕獲黃金巨妖！500倍超級武器火力全開，真是不虛此行！讓我們繼續加油，多拿 1.2% 的日常返水唷！";
      } else {
        text = "*甜笑拍手* 對於您的投注心法，Alisa 覺得非常實用唷！只要秉持健康的資產管理，每一份日常返水和 VIP 特權都是您的最大支持！加油唷！";
      }
      break;

    default:
      text = "Hello! I am a general gaming AI agent at i8s.games. We are currently evaluating Gaming AI models.";
  }

  return { text, durationMs: 400 };
};

// Check API configuration status
app.get("/api/config", (req, res) => {
  const hasKey = !!getApiKeyString();
  res.json({
    hasKey,
    info: "i8s.games AI Platform Orchestration Hub Active",
    models: ["gemini-3.5-flash", "gemini-3.1-pro-preview", "gemini-3.1-flash-tts-preview", "gemini-2.5-flash-image"],
  });
});

// Endpoint 1: Character Conversational Chat via Gaming AI Models
app.post("/api/chat", async (req, res) => {
  const {
characterId, 
    messages, 
    systemInstruction, 
    scenarioText, 
    temperature, 
    safetyLevel 
  } = req.body;

  const apiKey = getApiKeyString();
  const startTime = Date.now();

  try {
    if (!apiKey) {
      // Simulate response offline if no key exists
      const lastMessage = messages?.[messages.length - 1]?.content || "Hello";
      const sim = getSimulatedResponse(characterId, lastMessage, "");
      return res.json({
        success: true,
        text: sim.text,
        simulated: true,
        latencyMs: Date.now() - startTime,
        modelUsed: "Simulation Mode (No Gemini API Key)"
      });
    }

    const ai = getGeminiClient();

    // Map safety values
    const tempValue = typeof temperature === "number" ? temperature : 0.7;

    // Combine system prompt and active scenario
    const fullSystemInstruction = `${systemInstruction}\n\n[Active Narrative Scenario Context]:\n${scenarioText || ""}\n\nRule: Keep responses in-character, interactive, concise (maximum 3 sentences or 80 words), and end with an engaging action or dialogue prompt to invite user interaction!`;

    // Map message history into parts
    const chatContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    // Choose model based on query and performance (Gemini 2.5/3.5-flash)
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction: fullSystemInstruction,
        temperature: tempValue,
        topP: 0.95,
      },
    });

    const outputText = response.text || "";

    res.json({
      success: true,
      text: outputText,
      simulated: false,
      latencyMs: Date.now() - startTime,
      modelUsed: "gemini-3.5-flash"
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Graceful fallback to maintain continuous UX
    const lastMsg = messages?.[messages.length - 1]?.content || "Hello";
    const sim = getSimulatedResponse(characterId, lastMsg, "");
    res.json({
      success: true,
      text: `[Gemini Service offline: ${error.message} - Falling back to local engine]\n\n${sim.text}`,
      simulated: true,
      latencyMs: Date.now() - startTime,
      modelUsed: "gemini-3.5-flash (Errored, Simulation Fallback)"
    });
  }
});

// Endpoint 2: Character Text-to-Speech Voice Generation (Gemini multimodal TTS)
app.post("/api/tts", async (req, res) => {
  const { text, voiceName } = req.body;
  const apiKey = getApiKeyString();

  if (!text) {
    return res.status(400).json({ error: "Text is empty." });
  }

  try {
    if (!apiKey) {
      // Return unconfigured indicator
      return res.json({
        success: false,
        simulated: true,
        message: "TTS requires actual Gemini API Credentials to produce synthetic voice."
      });
    }

    const ai = getGeminiClient();
    const cleanText = text.replace(/[*_#]/g, "").trim(); // Strip markdown decorators

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `Say this clearly with natural pacing: ${cleanText}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || "Zephyr" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      res.json({
        success: true,
        base64Audio,
        mimeType: "audio/wav",
        simulated: false
      });
    } else {
      res.json({
        success: false,
        error: "No audio data was generated by the TTS model.",
        simulated: true
      });
    }

  } catch (error: any) {
    console.error("Gemini TTS Error:", error);
    res.json({
      success: false,
      error: error.message,
      simulated: true
    });
  }
});

// Endpoint 3: Character / Environment Image Avatar Generation
app.post("/api/generate-avatar", async (req, res) => {
  const { prompt } = req.body;
  const apiKey = getApiKeyString();

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required to generate an image." });
  }

  try {
    if (!apiKey) {
      return res.json({
        success: false,
        simulated: true,
        message: "Image generation requires actual enterprise integration / Gemini credentials."
      });
    }

    const ai = getGeminiClient();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            text: `${prompt}. Digital high-fantasy RPG game art, detailed character portrait, Unreal Engine 5 render, cinematic masterwork, stylized concept art.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    let base64Image: string | null = null;
    if (response?.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          base64Image = part.inlineData.data;
          break;
        }
      }
    }

    if (base64Image) {
      res.json({
        success: true,
        imageUrl: `data:image/png;base64,${base64Image}`,
        simulated: false
      });
    } else {
      res.json({
        success: false,
        error: "No base64 image data extracted from model response.",
        simulated: true
      });
    }

  } catch (error: any) {
    console.error("Gemini Image Generation Error:", error);
    res.json({
      success: false,
      error: error.message,
      simulated: true
    });
  }
});

// Vite entry point / production static files loading
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[i8s.games Server] Running on http://localhost:${PORT} under NODE_ENV=${process.env.NODE_ENV}`);
  });
}

startServer();
