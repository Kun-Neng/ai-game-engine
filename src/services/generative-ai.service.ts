import { GenerativeModel, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

export interface settingConfigs {
  temperature: number;
  top_k: number;
  top_p: number;
  maxOutputTokens: number;
}

export class GenerativeAiService {
  private genAI: GoogleGenerativeAI;

  private genConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
      }
    ],
    temperature: 0.2,
    top_k: 10,
    top_p: 1
  };

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.API_KEY!);
  }

  getGenModel(model: string): GenerativeModel {
    return this.genAI?.getGenerativeModel({
      model,
      ...this.genConfig
    });
  }

  setConfig(configs: settingConfigs) {
    this.genConfig = {
      ...this.genConfig,
      ...configs,
    };
  }

  resetConfig() {
    this.genConfig = {...this.genConfig };
  }
}
