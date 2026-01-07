
import { GoogleGenAI, Type } from "@google/genai";
import { UseCase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generatePersuasiveCopy(domain: string, lang: 'en' | 'cn'): Promise<{ pitch: string; useCases: UseCase[] }> {
  const languageName = lang === 'en' ? 'English' : 'Simplified Chinese';
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional, high-end sales pitch for the domain name "${domain}" in ${languageName}. 
      Also provide 4 potential business use cases in ${languageName}. 
      The tone should be sophisticated, trustworthy, and tech-forward.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pitch: { type: Type.STRING },
            useCases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  icon: { type: Type.STRING, description: "A simple keyword representing an icon (e.g., 'cpu', 'globe', 'link')" }
                },
                required: ["title", "description", "icon"]
              }
            }
          },
          required: ["pitch", "useCases"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback translations
    if (lang === 'cn') {
      return {
        pitch: "e-conn.com 代表了“电子”与“连接”的终极交汇点。它是数字时代的多功能、高影响力资产。",
        useCases: [
          { title: "物联网方案", description: "物联网架构的理想中心枢纽。", icon: "cpu" },
          { title: "电子商务", description: "全球电子商务连接的极佳品牌。", icon: "shopping-bag" },
          { title: "网络硬件", description: "直指交换机、路由器和连接技术市场。", icon: "server" },
          { title: "企业软件", description: "通过无缝电子系统连接企业。", icon: "briefcase" }
        ]
      };
    }
    return {
      pitch: "e-conn.com represents the ultimate intersection of 'Electronic' and 'Connectivity'. A versatile, high-impact asset for the digital age.",
      useCases: [
        { title: "IoT Solutions", description: "The perfect hub for internet-of-things architecture.", icon: "cpu" },
        { title: "E-Commerce", description: "A memorable brand for global electronic commerce connectivity.", icon: "shopping-bag" },
        { title: "Network Hardware", description: "Direct positioning for switches, routers, and connectivity tech.", icon: "server" },
        { title: "Enterprise Software", description: "Connecting businesses through seamless electronic systems.", icon: "briefcase" }
      ]
    };
  }
}
