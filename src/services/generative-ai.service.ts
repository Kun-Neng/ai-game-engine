import { GenerativeModel, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

interface Schema {
  description: string;
  type: SchemaType;
  items: {
    type: SchemaType;
    properties: {
      [key: string]: {
        type: SchemaType;
        description: string;
        nullable: boolean;
      }
    },
    required: string[];
  }
}

type ResponseConfigs = {
  generationConfig: {
    responseMimeType: string;
    responseSchema: Schema;
  }
};

type GenAIConfigs = {
  temperature: number;
  top_k: number;
  top_p: number;
  maxOutputTokens: number;
}

export class GenerativeAiService {
  private genAI: GoogleGenerativeAI;

  private config = {
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
    this.addSchema();
  }

  getGenModel(model: string): GenerativeModel {
    return this.genAI?.getGenerativeModel({
      model,
      ...this.config
    });
  }

  setConfig(configs: GenAIConfigs | ResponseConfigs) {
    this.config = {
      ...this.config,
      ...configs,
    };
  }

  getConfig() {
    return this.config;
  }

  resetConfig() {
    this.config = { ...this.config };
  }

  addSchema() {
    const schema = {
      description: '建議數個最佳武器放置位置與其原本格點值，達到最大化防禦效益，並提供判斷依據',
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          position: {
            type: SchemaType.ARRAY,
            description: '放置位置 [x, y]',
            items: {
              type: SchemaType.INTEGER
            },
            minItems: 2,
            maxItems: 2,
            nullable: false
          },
          description: {
            type: SchemaType.STRING,
            description: '判斷依據',
            nullable: false
          }
        },
        required: ['position', 'description']
      }
    };

    this.setConfig({
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: schema
      }
    });
  }
}
