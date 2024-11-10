import { GenerativeAiService } from './generative-ai.service';

export class AiGameService {
  generativeAiService: GenerativeAiService;

  constructor() {
    this.generativeAiService = new GenerativeAiService();
  }

  async recommandWeaponPlacement(battleStatus: { mapGrid: number[][], enemies: string, weapons: string }): Promise<string> {
    // const genModel = this.generativeAiService.getGenModel('gemini-pro');
    const genModel = this.generativeAiService.getGenModel('gemini-1.5-pro');
    this.generativeAiService.resetConfig();

    const promptText = [
      '根據以下遊戲狀態：',
      `- 地圖格點=${JSON.stringify(battleStatus.mapGrid)}`,
      `- 敵人位置=${battleStatus.enemies}(只能走在值為5的位置)`,
      `- 武器種類=${battleStatus.weapons}(只能放在值為8的位置)`,
      '建議數個最佳武器放置位置與其原本格點值，達到最大化防禦效益，並提供判斷依據。'
    ].join('\n');
    console.log(promptText);

    const result = await genModel?.generateContent(promptText);
    const response = await result?.response;
    let responseText = '';

    if (!response) {
      responseText = 'No response.';
    } else {
      if (response.promptFeedback?.blockReason) {
        console.error(`Not available. ${response.promptFeedback?.blockReason} reason.`);
      } else {
        responseText = response.text();
      }
    }

    return responseText.trim();
  }
}
