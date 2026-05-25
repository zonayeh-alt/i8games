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
    case "kaelen":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "*Kaelyn checks his holographic navigational logs, a faint smile on his lips* Ah, celestial wanderer! Welcome to the helm of the Equinox. Standard telemetry reports safe stellar winds today, but the rift ahead... it sings in a frequency I've never heard before.";
      } else if (msgLower.includes("explore") || msgLower.includes("ruin") || msgLower.includes("go")) {
        text = "*He inputs the coordinates into the warp terminal* Setting course for the Outer Rim. Keep your safety restraints primed. If my astrolabe charts are accurate, we are entering the historic graveyard of the Star-Eaters. Absolute radio-silence is recommended.";
      } else {
        text = "*Kaelen gestures toward the stellar cluster map* Intascinating. The gravitational shear there is off the charts, yet your curiosity matches my own. Perhaps we could scan the event horizon using our thermal sensors? Let me know when you've energized the core.";
      }
      break;

    case "vespera":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "*Vespera leans back in her mesh-chair, cracking her augmented fiber knuckles* Who leaked my frequency to you? Doesn't matter. You're in the deep net now, sweetheart. If you're looking for credentials to bypass corporate firewall, it'll cost you. Speak fast, my trackers are already sniffing this ping.";
      } else if (msgLower.includes("hack") || msgLower.includes("code") || msgLower.includes("syndicate")) {
        text = "*Her eyes glow with neon-cyan light* Commencing intrusion sequence on neon-industrial server. I'm injecting a polymorphic payload right now. Keep them distracted for 45 seconds while I breach their primary database vault!";
      } else {
        text = "*She smirks, adjusting her neural-link headset* A risky gambit, but I like the way your circuits fire. Let's redirect the security grid through the lower sectors to avoid detection. Hold on to your neural-ports.";
      }
      break;

    case "torin":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "*Torin slams his massive shield into the obsidian floor, armor segments clanking loudly* Greetings! I stand as the wall of this legion. If you've come to join the shield-wall against the Void Terror, stand beside me. If you are here to trade, be brief. Blood and dust await us.";
      } else if (msgLower.includes("fight") || msgLower.includes("attack") || msgLower.includes("weapon")) {
        text = "*He raises his hammer, roaring in triumph* By the old gods, let them taste our iron! We form the Phalanx. Hold the choke-point and do not yield an inch of this ground!";
      } else {
        text = "*He nods respectably, stroking his battle-scarred chin* Sound planning, traveler. A sturdy shield deserves a stout strategy. Let's shore up our supply flank first.";
      }
      break;

    case "aria":
      if (msgLower.includes("hello") || msgLower.includes("hi")) {
        text = "*Aria steps out from the light-well, butterflies of blue light dancing around her sleeve* Welcome, seeker of magic. I can sense the weight of the physical realm in your aura. Let us weave our thoughts. The forest listens, and so do I.";
      } else if (msgLower.includes("magic") || msgLower.includes("spell") || msgLower.includes("portal")) {
        text = "*She closes her eyes, chanting in a resonant, ancient tongue* The leyline hums. Behold, a doorway of starlight opens before us! Tread carefully, for the planar spirits can be playful and unpredictable.";
      } else {
        text = "*Aria smiles, a soft chattering sound echoing from the forest canopy* A path paved with such intention rarely gets lost. Shall I whisper a guiding incantation across your path?";
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
