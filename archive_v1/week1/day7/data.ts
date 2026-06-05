import { DayContent } from '../../types';

export const day7Data: DayContent = {
  day: 7,
  title: "抉择时刻：模型选型与第一周 Boss Battle",
  shards: 1,
  steps: [
    // --- 模块一：开源 vs 闭源 ---
    { 
      type: 'theory', 
      content: "🏰 **第一章：围墙花园 vs 荒野求生**\n\nAI 模型分为两派：\n1. **闭源 (Closed)**: GPT-4, Claude, Gemini。你通过 API 访问，按 Token 付费。优点是强、稳、不用维护；缺点是贵、数据隐私风险。\n2. **开源 (Open)**: Llama 3, Mistral, Qwen。你下载权重文件 (`.safetensors`)，跑在自己的 GPU 上。优点是私有、可定制、无 API 费；缺点是部署难、吃硬件。" 
    },
    {
      type: 'match',
      question: "【选型顾问】请为以下客户推荐方案",
      pairs: [
        { left: "瑞士银行：数据绝对不能出内网", right: "本地部署开源模型 (Self-hosted)" },
        { left: "独立开发者：快速验证创意，没钱买显卡", right: "云端 API 按量付费（如 OpenAI / Anthropic）" },
        { left: "科研人员：需要研究模型底层架构", right: "下载开源模型权重自行研究" },
        { left: "企业客服：需要极高的稳定性且不想招运维", right: "签带 SLA 保障的企业级闭源 API 合约" }
      ]
    },
    {
      type: 'quiz',
      question: "【误区】开源模型意味着完全免费吗？",
      options: ["是的，一分钱不花", "不是，虽然软件免费，但你需要支付昂贵的 GPU 推理成本（电费/算力租用）", "只有非商业用途才免费，商用需要购买授权"],
      correct: 1
    },

    // --- 模块二：大象与蚂蚁 (参数量) ---
    { 
      type: 'theory', 
      content: "⚖️ **第二章：参数量 (Parameters)**\n\n模型名字后面的 `7B`, `70B` 代表参数数量（Billion/十亿）。\n\n- **70B+**: 聪明，逻辑强，但这只大象跑得慢，显存需求巨大。\n- **7B/8B**: 反应快，能在普通显卡甚至手机上跑，适合简单任务（分类、摘要）。\n\n**量化 (Quantization)**: 就像把高清图压缩成 JPG。把 16-bit 的参数压缩成 4-bit (`q4_k_m`)，可以在损失极小精度的情况下，大幅降低显存需求。" 
    },
    {
      type: 'quiz',
      question: "【应用】如果你的任务是“从一段文本中提取人名”，你会选择？",
      options: ["GPT-4 (最强模型)", "Llama-8B (小模型)", "训练一个新的大模型"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "【硬件】你想在自己的 24G 显存的显卡上跑一个 70B 的模型（通常需要 140G 显存），唯一可行的方法是？",
      options: ["超频显卡", "使用极高程度的量化 (Quantization) 或 内存卸载 (Offloading)", "将模型按层拆分，分别存到多张 24G 显卡上同时推理"],
      correct: 1
    },

    // --- 模块三：Week 1 Boss Battle (综合复习) ---
    { 
      type: 'theory', 
      content: "⚔️ **最终章：第一周 BOSS BATTLE**\n\n准备好了吗？我们将把 Token, Embedding, Attention, Temperature, Prompt 全部串联起来。" 
    },
    
    // Level 1: 原理
    {
      type: 'quiz',
      question: "1. 【原理】AI 本质上是在计算什么？ P(wt | w0...wt-1)",
      options: ["计算这句话的情感得分", "给定前面的词，计算下一个词出现的条件概率", "计算这句话的真理性"],
      correct: 1
    },
    {
      type: 'fill',
      question: "2. 【核心】Transformer 区别于 RNN 的最大优势是它可以 ___ (Parallel) 计算，并且捕捉长距离依赖。",
      parts: ["Transformer 可以", "___", "处理整个序列。"],
      options: ["并行 (Parallel)", "串行", "随机"],
      correct: "并行 (Parallel)"
    },

    // Level 2: 向量与搜索
    {
      type: 'quiz',
      question: "3. 【Embedding】为什么 '国王 - 男人 + 女人' 能算出 '女王'？",
      options: ["因为这些词的汉字笔画数相近，模型把它们归到了同一类", "因为在 Embedding 空间中，语义特征被编码成了向量方向，可以进行代数运算", "因为模型在训练数据中见过太多皇室故事，强行记住了这条规律"],
      correct: 1
    },
    {
      type: 'match',
      question: "4. 【技术栈连线】",
      pairs: [
        { left: "把字切成数", right: "Tokenizer" },
        { left: "把数变成坐标", right: "Embedding" },
        { left: "存储海量坐标", right: "Vector DB" },
        { left: "计算关注点", right: "Attention Mechanism" }
      ]
    },

    // Level 3: 记忆与窗口
    {
      type: 'quiz',
      question: "5. 【Context】当 Output Token 达到上限时，通常会发生什么？",
      options: ["AI 会自动压缩并总结之前的对话，无缝续写", "句子会突然中断 (Truncated)", "模型会删掉前面的对话腾出空间"],
      correct: 1
    },
    {
      type: 'quiz',
      question: "6. 【RAG】为什么有了 RAG 还需要 Prompt Engineering？",
      options: ["不需要了", "RAG 只是找资料，怎么利用这些资料生成好的回答，依然取决于 Prompt 的质量", "因为 RAG 很慢"],
      correct: 1
    },

    // Level 4: 控制与交互
    {
      type: 'quiz',
      question: "7. 【Temperature】你在做一个自动写代码的插件，为了保证代码能运行（不瞎编函数名），Temperature 应设为？",
      options: ["0.0 (Greedy)", "0.9 (Creative)", "2.0 (Chaos)"],
      correct: 0
    },
    {
      type: 'quiz',
      question: "8. 【Prompt】Let's think step by step 是为了激活模型的什么能力？",
      options: ["Chain of Thought (CoT)", "RAG", "Multimodal"],
      correct: 0
    },
    {
      type: 'fill',
      question: "9. 【Prompt】Few-Shot 是指在 Prompt 中提供",
      parts: ["Few-Shot 是指提供", "___", "让模型模仿。"],
      options: ["示例 (Examples)", "指令", "金钱"],
      correct: "示例 (Examples)"
    },
    
    // Level 5: 综合应用 (Scenario)
    {
      type: 'quiz',
      question: “10. 【终极应用】你要开发一个”法律文书助手”。\n要求：严谨、引用法条准确、不编造内容。\n最佳技术栈组合是？”,
      options: [“Temp=1.0 + 纯 Prompt（让 AI 自由发挥）”, “Temp=0.1 + RAG（挂载法条库）+ System Role（'你是资深律师'）”, “Temp=0.5 + 不给任何约束（模型自己判断）”],
      correct: 1
    },
    {
      type: 'match',
      isBoss: true,
      question: "🏆 **通关认证：从原理到产品**",
      pairs: [
        { left: "算力层", right: "GPU / TPU" },
        { left: "模型层", right: "Transformer / Weights" },
        { left: "记忆层", right: "Vector DB / Context" },
        { left: "应用层", right: "Prompt / Agent" }
      ]
    },
    {
      type: 'theory',
      content: “🎉 **Week 1 完美通关！**\n\n你已经完成了从 AI 萌新到”原理懂王”的蜕变。\n你不仅知道怎么用，还知道**为什么**要这么用。\n\n**下周预告**：我们将离开纯理论，开始学习**Prompt Engineering（提示工程）**——如何把指令说清楚，用例子教 AI，让它按你想要的格式输出！”
    }
  ]
};