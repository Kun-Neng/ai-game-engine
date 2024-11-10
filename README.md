# AI Game Engine
Build by Node.js with Google Generative AI for gameplay recommendation

## Class Diagram
```mermaid
classDiagram
  class AiGameService {
    generativeAiService : GenerativeAiService
    recommandWeaponPlacement(battleStatus) string
  }

  class GenerativeAiService {
    -genAI : GoogleGenerativeAI
    -genConfig : RequestOptions
    getGenModel(model: string) GenerativeModel
    setConfig(configs: settingConfigs) void
    resetConfig() void
  }

  AiGameService *-- GenerativeAiService
```

## Flow Chart
```mermaid
flowchart LR
  A -- POST /recommendation --> B
  B --> C
  C -- await generateContent --> GoogleGenerativeAI
  GoogleGenerativeAI -- get result --> C
  C --> B
  B -- response result --> A

subgraph Frontend
  A[SketchService]
end

subgraph Backend
  B[AiGameService]
  C[GenerativeAiService]
end
```

## References
* [Gemini API quickstart](https://ai.google.dev/gemini-api/docs/quickstart?lang=node)
