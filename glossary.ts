import { MODEL_GLOSSARY } from './glossary-models';
import type { GlossaryEntry } from './glossary-types';
export { GLOSSARY_CATEGORIES } from './glossary-types';

export const GLOSSARY_SOURCE_URL = 'https://waytoagi.feishu.cn/wiki/PFXnwBTsEiGwGGk2QQFcdTWrnlb?table=tbltvr7KExCt7Jpw&view=vewjxk9tDu';

// Source terminology is normalized; explanations and examples are written for Draco.
const CORE_GLOSSARY: GlossaryEntry[] = [
  {
    id: 'ai', category: 'basics',
    zh: { term: '人工智能 (AI)', definition: '让计算机执行通常需要人类智能的任务的研究与技术，例如识别图像、理解语言和制定计划。', example: '相册自动找出照片中的猫，是一种 AI 应用。' },
    en: { term: 'Artificial Intelligence (AI)', definition: 'Research and technology for computers to perform tasks associated with intelligence, such as recognizing images, using language, and planning.', example: 'An app that finds cats in your photos uses AI.' },
  },
  {
    id: 'alignment', category: 'safety',
    zh: { term: '对齐 (Alignment)', definition: '让 AI 的行为更符合预期目标、人类价值与安全约束；这需要持续评估，不能靠一句指令保证。', example: '旅行助手不仅要找到便宜机票，还必须先征得同意才能付款。' },
    en: { term: 'Alignment', definition: 'Making AI behavior better match intended goals, human values, and safety constraints. It requires evaluation, not just an instruction.', example: 'A travel assistant must ask permission before paying, even when it finds a cheap flight.' },
  },
  {
    id: 'cot', category: 'prompting',
    zh: { term: '思维链 (CoT / Chain of Thought)', definition: '通过中间推理步骤帮助模型处理复杂任务的方法。生成的推理文字不一定可靠，也不等同于模型内部计算。', example: '解应用题时，先列出已知条件，再计算并检查单位。' },
    en: { term: 'Chain of Thought (CoT)', definition: 'Using intermediate reasoning steps to help a model tackle a task. Written reasoning may be unreliable and is not a direct view of internal computation.', example: 'For a word problem, identify the quantities, calculate, then check the units.' },
  },
  {
    id: 'system-one-two', category: 'basics',
    zh: { term: '系统一 / 系统二 (System 1 / System 2)', definition: '描述快速直觉与缓慢审慎思考的认知框架。在 AI 中常被用作类比，而不是两块真实的脑区或固定模块。', example: '直接猜一道题，和先列计划再检查答案，是两种不同的处理方式。' },
    en: { term: 'System 1 / System 2', definition: 'A cognitive framework contrasting fast intuition with slower deliberation. In AI it is usually an analogy, not two literal brain regions or required modules.', example: 'Compare an immediate guess with making a plan and checking the answer.' },
  },
  {
    id: 'agents', category: 'agents',
    zh: { term: '智能体 (Agent / Agents)', definition: '围绕目标选择行动、调用工具并依据反馈继续工作的系统；它的权限和停止条件需要明确设置。', example: '学习助手查找资料、生成练习，再根据错题安排复习。' },
    en: { term: 'Agent / Agents', definition: 'A system that selects actions, uses tools, and responds to feedback while pursuing a goal. Its permissions and stopping conditions need boundaries.', example: 'A study agent finds material, creates practice questions, and plans revision from mistakes.' },
  },
  {
    id: 'hallucination', category: 'safety',
    zh: { term: '幻觉 (Hallucination / Hallucinate)', definition: 'AI 生成看似可信但错误或缺乏证据的内容。语言流畅不代表事实正确。', example: '回答列出一本不存在的书时，需要核实而不是照单全收。' },
    en: { term: 'Hallucination / Hallucinate', definition: 'AI output that sounds plausible but is false or unsupported. Fluent wording does not establish factual accuracy.', example: 'Check a recommended book exists before trusting a made-up citation.' },
  },
  {
    id: 'chatgpt', category: 'prompting',
    zh: { term: 'ChatGPT', definition: 'OpenAI 提供的对话式 AI 产品，可以在其可用功能范围内处理文字及其他输入；它不是所有大语言模型的统称。', example: '在 ChatGPT 中请它把一段说明改写成适合初学者的版本。' },
    en: { term: 'ChatGPT', definition: 'A conversational AI product from OpenAI that handles text and other inputs depending on available features. It is not a generic name for every language model.', example: 'Ask ChatGPT to rewrite an explanation for a beginner.' },
  },
  {
    id: 'prompt-engineering', category: 'prompting',
    zh: { term: '提示工程 (Prompt Engineering)', definition: '设计、测试并改进给 AI 的任务说明、上下文和输出要求，以提高完成特定任务的可靠性。', example: '比较两种摘要提示，用同一组文章检查是否遗漏关键信息。' },
    en: { term: 'Prompt Engineering', definition: 'Designing, testing, and improving instructions, context, and output requirements for more reliable performance on a task.', example: 'Compare two summary prompts on the same articles and check for missing facts.' },
  },
  {
    id: 'paradigm', category: 'basics',
    zh: { term: '范式 (Paradigm)', definition: '解决一类问题时采用的基本思路和方法框架，而不是某一个具体模型。', example: '手写规则和从数据中学习，是两种不同的技术思路。' },
    en: { term: 'Paradigm', definition: 'A broad framework for approaching a class of problems, rather than one particular model.', example: 'Writing explicit rules and learning patterns from data are different approaches.' },
  },
  {
    id: 'multimodal', category: 'multimodal',
    zh: { term: '多模态 AI (Multimodal AI)', definition: '能够处理或关联多种信息形式的 AI，例如文字、图像和声音；具体支持哪些形式取决于系统。', example: '上传植物照片，再用文字询问叶片为什么发黄。' },
    en: { term: 'Multimodal AI', definition: 'AI that handles or connects multiple information types, such as text, images, and audio. The supported types depend on the system.', example: 'Upload a plant photo and ask in text why its leaves look yellow.' },
  },
  {
    id: 'few-shot', category: 'prompting',
    zh: { term: '少样本提示 (Few-Shot)', definition: '在提示中给出少量示例，让模型参照任务或格式；这种提示方式不需要更新模型权重。', example: '先给出两条评论及情感标签，再让模型给第三条分类。' },
    en: { term: 'Few-Shot Prompting', definition: 'Providing a few examples in a prompt to demonstrate a task or format, without updating model weights.', example: 'Show two reviews with sentiment labels before asking for a third label.' },
  },
  {
    id: 'vector-database', category: 'retrieval',
    zh: { term: '向量数据库 (Vector Database)', definition: '存储向量并支持相似性检索的数据库，常用于按含义找资料；相似结果仍需核实是否相关。', example: '搜索“忘记密码”，也能找到标题为“重置登录凭据”的帮助文档。' },
    en: { term: 'Vector Database', definition: 'A database that stores vectors and supports similarity search, often for meaning-based retrieval. Similarity alone does not guarantee relevance.', example: 'A search for “forgot password” can retrieve a guide titled “reset login credentials.”' },
  },
  {
    id: 'cv', category: 'multimodal',
    zh: { term: '计算机视觉 (CV)', definition: '让计算机从图像或视频提取信息的技术领域，包括识别对象、定位物体和分割区域。', example: '识别街景中的自行车，并用方框标出它的位置。' },
    en: { term: 'Computer Vision (CV)', definition: 'The field of extracting information from images or video, including recognition, object detection, and segmentation.', example: 'Find a bicycle in a street photo and draw a box around it.' },
  },
  {
    id: 'expert-systems', category: 'basics',
    zh: { term: '专家系统 (Expert Systems)', definition: '利用领域知识和显式规则给出判断或建议的 AI 系统，通常不靠大规模数据训练来获得这些规则。', example: '根据“电源灯不亮”和预设检修规则，提示先检查插座。' },
    en: { term: 'Expert Systems', definition: 'AI systems that use domain knowledge and explicit rules to produce judgments or advice, rather than learning those rules from large datasets.', example: 'A troubleshooting system checks the socket when its rules match “power light is off.”' },
  },
  {
    id: 'gan', category: 'multimodal',
    zh: { term: '生成对抗网络 (GAN)', definition: '让生成器学习制造样本、判别器学习区分真实与生成样本，通过相互竞争改进生成效果的方法。', example: '一个网络生成手写数字，另一个网络判断它们是否像真实样本。' },
    en: { term: 'Generative Adversarial Network (GAN)', definition: 'A method where a generator produces samples and a discriminator learns to distinguish generated from real samples, improving generation through competition.', example: 'One network draws digits while another judges whether they resemble real handwriting.' },
  },
  {
    id: 'nlp', category: 'basics',
    zh: { term: '自然语言处理 (NLP)', definition: '研究计算机如何分析和生成自然语言的领域，涵盖翻译、分类、问答等任务。', example: '把一封英文邮件翻译成中文属于 NLP 应用。' },
    en: { term: 'Natural Language Processing (NLP)', definition: 'The field of analyzing and generating human language, including translation, classification, and question answering.', example: 'Translating an English email into Chinese is an NLP application.' },
  },
  {
    id: 'emergence', category: 'basics',
    zh: { term: '涌现 (Emergence)', definition: '系统规模或条件变化后出现的新能力或整体行为。在 AI 测试中，看似突然的提升也可能受评分方法影响。', example: '模型在某测试上突然得分更高，仍要检查是否只是评分门槛造成的。' },
    en: { term: 'Emergence', definition: 'New capabilities or collective behavior appearing as a system changes. In AI benchmarks, apparently sudden gains can also depend on how performance is scored.', example: 'A sharp benchmark jump needs checking against the test’s scoring threshold.' },
  },
  {
    id: 'zero-shot', category: 'prompting',
    zh: { term: '零样本提示 (Zero-Shot)', definition: '不给任务示例，直接用指令要求模型完成任务；并不表示模型训练时从未接触相关知识。', example: '直接要求“把这段文字分为积极、中性或消极”，不提供示范。' },
    en: { term: 'Zero-Shot Prompting', definition: 'Asking for a task through instructions without examples in the prompt. It does not mean the model has never encountered related knowledge in training.', example: 'Ask for a positive, neutral, or negative label without showing sample labels.' },
  },
  {
    id: 'generative-ai', category: 'basics',
    zh: { term: '生成式 AI (Generative AI / Gen AI)', definition: '根据学习到的数据规律和输入条件生成文字、图像、声音等内容的 AI 技术。', example: '根据“月球上的纸艺小屋”生成一幅新图像。' },
    en: { term: 'Generative AI / Gen AI', definition: 'AI technology that produces text, images, audio, or other content using learned patterns and input conditions.', example: 'Generate a new illustration from “a paper-craft cottage on the moon.”' },
  },
  {
    id: 'nerf', category: 'multimodal',
    zh: { term: '神经辐射场 (NeRF)', definition: '用神经网络表示场景中位置与观察方向对应的颜色和密度，从多张照片合成新视角。', example: '围绕一件雕塑拍照后，生成从另一个角度观看它的画面。' },
    en: { term: 'Neural Radiance Field (NeRF)', definition: 'A neural scene representation mapping positions and viewing directions to color and density, allowing new views to be rendered from multiple photos.', example: 'Photograph a sculpture from several angles, then render a view from a new position.' },
  },
  {
    id: 'ani', category: 'basics',
    zh: { term: '狭义人工智能 (ANI)', definition: '为特定任务或有限范围能力设计的 AI，与假设中的通用人工智能相区别。', example: '一个擅长围棋的系统，不会因此自动学会开车。' },
    en: { term: 'Artificial Narrow Intelligence (ANI)', definition: 'AI designed for specific tasks or a limited range of capabilities, in contrast with hypothetical general intelligence.', example: 'A strong Go-playing system does not automatically know how to drive.' },
  },
  {
    id: 'agi', category: 'basics',
    zh: { term: '通用人工智能 (AGI)', definition: '能够跨广泛任务灵活学习和解决问题的 AI 目标概念，其定义和判定标准尚无统一共识。', example: '不能只因为聊天机器人通过一道考试，就认定它已经达到 AGI。' },
    en: { term: 'Artificial General Intelligence (AGI)', definition: 'A proposed form of AI able to learn and solve a broad range of tasks flexibly. Definitions and criteria remain disputed.', example: 'Passing one exam is not enough to establish that a chatbot is AGI.' },
  },
  {
    id: 'gpt-four', category: 'models',
    zh: { term: 'GPT-4', definition: 'OpenAI 于 2023 年发布的模型家族名称，是具体模型系列，不等于 ChatGPT 产品本身。', example: '区分“使用哪一个模型”和“通过哪一个聊天产品使用它”。' },
    en: { term: 'GPT-4', definition: 'A model family introduced by OpenAI in 2023. It is a specific model family, not the ChatGPT product itself.', example: 'Distinguish the model being used from the chat product that provides access to it.' },
  },
  {
    id: 'deepmind', category: 'basics',
    zh: { term: 'DeepMind / Google DeepMind', definition: '研究与开发 AI 的机构名称，与 AlphaGo 等项目有关，不是一种算法。', example: '阅读 AlphaGo 的历史时，会遇到 DeepMind 这家研究机构。' },
    en: { term: 'DeepMind / Google DeepMind', definition: 'The name of an AI research and development organization associated with projects such as AlphaGo, not an algorithm.', example: 'DeepMind appears as a research organization in the history of AlphaGo.' },
  },
  {
    id: 'diffusion', category: 'multimodal',
    zh: { term: '扩散模型 (Diffusion Models)', definition: '学习逐步去除噪声来生成数据的一类模型；图像生成时通常从噪声出发，多步形成画面。', example: '输入“蓝色纸龙”，模型逐步把噪声变成符合描述的图像。' },
    en: { term: 'Diffusion Models', definition: 'Models that learn to generate data by reversing a noise-adding process, often forming an image through repeated denoising steps.', example: 'Starting from noise, a model gradually creates an image matching “a blue paper dragon.”' },
  },
  {
    id: 'clip', category: 'multimodal',
    zh: { term: '图文对比预训练 (CLIP)', definition: '通过图文配对学习共享表示的方法，使匹配的图片与文字在表示空间中更接近；它本身不是图像生成器。', example: '比较一张狗的照片与“狗”“自行车”两个描述的匹配程度。' },
    en: { term: 'CLIP', definition: 'Contrastive Language–Image Pre-training learns shared image and text representations so matching pairs are closer. It is not itself an image generator.', example: 'Compare how well a dog photo matches the captions “dog” and “bicycle.”' },
  },
  {
    id: 'rlhf', category: 'training',
    zh: { term: '人类反馈强化学习 (RLHF)', definition: '利用人类对输出的偏好训练奖励信号，再用强化学习改进模型行为的一类方法。', example: '标注者比较两份回答，偏好数据帮助模型学会更有用的回答方式。' },
    en: { term: 'Reinforcement Learning from Human Feedback (RLHF)', definition: 'Methods that turn human preferences about outputs into reward signals and use reinforcement learning to improve model behavior.', example: 'People compare two answers, helping train a signal that favors more useful responses.' },
  },
  {
    id: 'latent-space', category: 'models',
    zh: { term: '潜在空间 (Latent Space)', definition: '模型学到的内部表示空间，通常用一组数值概括数据特征，不是能直接看见的物理空间。', example: '生成模型可以在内部表示中调整与姿态有关的信息，产生不同姿势的角色。' },
    en: { term: 'Latent Space', definition: 'A space of learned internal representations, usually numerical features describing data, rather than a physical location.', example: 'A generator can vary pose-related information in its representation to create different character poses.' },
  },
  {
    id: 'tensorflow', category: 'training',
    zh: { term: 'TensorFlow', definition: '用于数值计算和机器学习的软件框架，可以帮助开发者训练和部署模型。', example: '用 TensorFlow 编写并训练一个手写数字分类器。' },
    en: { term: 'TensorFlow', definition: 'A software framework for numerical computing and machine learning that supports building, training, and deploying models.', example: 'Build and train a handwritten-digit classifier with TensorFlow.' },
  },
  {
    id: 'singularity', category: 'basics',
    zh: { term: '技术奇点 (Singularity)', definition: '关于技术进步可能加速到难以预测社会变化的一种假说，并不是已证实的未来事件或确定日期。', example: '讨论奇点时，应区分科幻设想、预测与可验证的研究结果。' },
    en: { term: 'Technological Singularity', definition: 'A hypothesis that technological progress could accelerate until societal change becomes difficult to predict, not an established event or date.', example: 'Separate speculative forecasts from measurable research when discussing the singularity.' },
  },
  {
    id: 'symbolic-ai', category: 'basics',
    zh: { term: '符号主义 AI (Symbolic AI)', definition: '用明确的符号、逻辑和规则表示知识并进行推理的技术路线。', example: '根据“所有鸟都是动物”和“麻雀是鸟”，推出“麻雀是动物”。' },
    en: { term: 'Symbolic AI', definition: 'An approach that represents knowledge and performs reasoning with explicit symbols, logic, and rules.', example: 'From “all birds are animals” and “a sparrow is a bird,” infer that a sparrow is an animal.' },
  },
  {
    id: 'token', category: 'basics',
    zh: { term: '词元 (Token)', definition: '语言模型处理文本时使用的单位，可能是一个词、字、词的一部分或符号；切分方式由分词器决定。', example: '同一句话换一个分词器，词元数量可能不同。' },
    en: { term: 'Token', definition: 'A unit of text handled by a language model: a word, character, word fragment, or symbol, depending on the tokenizer.', example: 'The same sentence can have different token counts with different tokenizers.' },
  },
  {
    id: 'openai', category: 'basics',
    zh: { term: 'OpenAI', definition: '开发 AI 模型与产品的机构名称，代表产品包括 ChatGPT；它不是“开源 AI”的同义词。', example: '阅读文档时，分清机构 OpenAI、产品 ChatGPT 和具体模型名称。' },
    en: { term: 'OpenAI', definition: 'An organization developing AI models and products, including ChatGPT. Its name is not a synonym for open-source AI.', example: 'Distinguish the organization OpenAI, the product ChatGPT, and a specific model name.' },
  },
  {
    id: 'turing-test', category: 'basics',
    zh: { term: '图灵测试 (Turing Test)', definition: '通过文字对话考察机器表现是否难以与人类区分的历史性测试思想；它不能单独证明理解或意识。', example: '评审阅读匿名对话并判断对方是人还是机器。' },
    en: { term: 'Turing Test', definition: 'A historical proposal to assess whether a machine’s conversational behavior can be distinguished from a human’s. It does not by itself prove understanding or consciousness.', example: 'A judge reads anonymous conversations and tries to identify the machine.' },
  },
  {
    id: 'vector', category: 'retrieval',
    zh: { term: '向量 (Vector)', definition: '一组有顺序的数值，可用于表示方向、位置或数据特征。AI 中经常用向量表示内容。', example: '用“长度、宽度、高度”三个数描述一个积木。' },
    en: { term: 'Vector', definition: 'An ordered collection of numbers that can describe direction, position, or data features. AI often represents content using vectors.', example: 'Describe a brick with three numbers: length, width, and height.' },
  },
  {
    id: 'cross-modal', category: 'multimodal',
    zh: { term: '跨模态泛化 (Cross-modal Generalization)', definition: '把在一种或多种信息形式中学到的关系，应用到未见过的跨模态任务或数据上的能力。', example: '学会图文对应后，为一张未见过的图片找出合适的文字描述。' },
    en: { term: 'Cross-modal Generalization', definition: 'Applying relationships learned across information types to unseen cross-modal data or tasks.', example: 'After learning image–text relationships, match an unfamiliar picture with a suitable description.' },
  },
  {
    id: 'dpo', category: 'training',
    zh: { term: '直接偏好优化 (DPO)', definition: '利用偏好与非偏好回答对直接优化模型的一种方法，通常无需另训练显式奖励模型或在线强化学习循环。', example: '提供“更清楚的回答”和“较差的回答”，让训练提高前者的相对概率。' },
    en: { term: 'Direct Preference Optimization (DPO)', definition: 'A method that directly optimizes a model using preferred and rejected response pairs, typically without a separate explicit reward model or online RL loop.', example: 'Train on a clearer answer paired with a weaker answer to increase the relative likelihood of the clearer one.' },
  },
  {
    id: 'aigc', category: 'basics',
    zh: { term: '人工智能生成内容 (AIGC)', definition: '由 AI 生成的文字、图片、音频等内容。它强调生成的内容，而生成式 AI 强调所用技术。', example: 'AI 生成的一张活动海报属于 AIGC，使用前仍需检查版权和事实。' },
    en: { term: 'AI-Generated Content (AIGC)', definition: 'Text, images, audio, or other content produced with AI. The term emphasizes the output, while generative AI names the technology.', example: 'An AI-created event poster is AIGC; check facts and rights before using it.' },
  },
  {
    id: 'rag', category: 'retrieval',
    zh: { term: '检索增强生成 (RAG)', definition: '先从外部资料中检索相关内容，再把这些内容提供给模型生成回答的方法；检索与引用仍可能出错。', example: '客服助手先检索最新退货政策，再根据政策回答顾客。' },
    en: { term: 'Retrieval-Augmented Generation (RAG)', definition: 'Retrieving relevant external material and providing it to a model to generate an answer. Retrieval and citations can still be wrong.', example: 'A support assistant retrieves the current returns policy before answering a customer.' },
  },
  {
    id: 'embedding', category: 'retrieval',
    zh: { term: '嵌入 (Embedding)', definition: '把词、句子、图片等转换为数值向量的表示，使系统能计算相似度或其他关系。', example: '“小狗”和“幼犬”的文本嵌入可能比“小狗”和“火车”更接近。' },
    en: { term: 'Embedding', definition: 'A numerical vector representation of items such as words, sentences, or images, enabling comparisons of similarity and other relationships.', example: 'Embeddings for “puppy” and “young dog” may be closer than those for “puppy” and “train.”' },
  },
  {
    id: 'asi', category: 'basics',
    zh: { term: '超级人工智能 (ASI)', definition: '在广泛认知任务上远超人类能力的假设性 AI 概念，不应与当前某个专项超人水平系统混为一谈。', example: '计算器算得快，不代表它就是 ASI。' },
    en: { term: 'Artificial Superintelligence (ASI)', definition: 'A hypothetical AI far exceeding human capabilities across a broad range of cognitive tasks, not merely outperforming people on one task.', example: 'A calculator’s arithmetic speed does not make it ASI.' },
  },
  {
    id: 'chatbot', category: 'prompting',
    zh: { term: '聊天机器人 (Chatbot)', definition: '通过对话界面与人交互的软件，可以基于固定规则，也可以使用语言模型。', example: '网站上的问答助手可能只会从预设菜单中选择答案。' },
    en: { term: 'Chatbot', definition: 'Software that interacts through conversation, using fixed rules, language models, or a combination of methods.', example: 'A website assistant may answer using only a predefined menu.' },
  },
  {
    id: 'connectionism', category: 'basics',
    zh: { term: '联结主义 (Connectionism)', definition: '用大量相互连接的简单计算单元解释或实现学习与认知的思路，神经网络是其典型形式。', example: '不手写每条识别规则，而是调整网络连接，让系统学会辨认数字。' },
    en: { term: 'Connectionism', definition: 'An approach to learning and cognition based on many connected simple processing units, commonly represented by neural networks.', example: 'Adjust network connections to recognize digits instead of writing each recognition rule.' },
  },
  {
    id: 'bias', category: 'safety',
    zh: { term: '偏差 / 偏见 (Bias)', definition: '可指模型的系统性误差或不公平倾向；在神经网络公式中也可指加在加权和上的偏置参数，需看语境。', example: '招聘模型对某群体持续低估是公平性问题，不等于公式中的偏置参数。' },
    en: { term: 'Bias', definition: 'Can mean systematic error or unfair tendencies. In a neural-network equation, it can also mean an added offset parameter; context matters.', example: 'A hiring model undervaluing one group is a fairness issue, not the same thing as an offset in an equation.' },
  },
  {
    id: 'gpu', category: 'training',
    zh: { term: '图形处理器 (GPU)', definition: '擅长并行执行大量计算的处理器，除图形渲染外，也常用于 AI 的矩阵运算。', example: '训练时同时计算一批图像，可以利用 GPU 的并行能力。' },
    en: { term: 'Graphics Processing Unit (GPU)', definition: 'A processor designed for many parallel computations, used for graphics and often for AI matrix operations.', example: 'Training on a batch of images can take advantage of GPU parallelism.' },
  },
  {
    id: 'transfer-learning', category: 'training',
    zh: { term: '迁移学习 (Transfer Learning)', definition: '利用已有任务或数据中学到的表示，帮助学习新的相关任务，常能减少新任务所需数据。', example: '在通用图像模型基础上，训练一个识别花卉品种的分类器。' },
    en: { term: 'Transfer Learning', definition: 'Reusing representations learned from one task or dataset to help with a related task, often reducing the new data needed.', example: 'Adapt a general image model to classify flower varieties.' },
  },
  {
    id: 'xai', category: 'safety',
    zh: { term: '可解释人工智能 (XAI)', definition: '帮助人理解 AI 行为和结果的方法与研究；解释需要检验是否忠实，不能仅看是否听起来合理。', example: '查看哪些输入特征影响贷款评分，同时检查解释在小幅输入变化下是否稳定。' },
    en: { term: 'Explainable AI (XAI)', definition: 'Methods and research for making AI behavior and outputs understandable. Explanations need checks for faithfulness, not just plausibility.', example: 'Inspect which features affect a loan score and test whether the explanation remains stable under small changes.' },
  },
  {
    id: 'prompt', category: 'prompting',
    zh: { term: '提示词 (Prompt)', definition: '提供给 AI 的任务、背景、材料和限制，用来引导它生成输出。提示可以包含多段文字或其他输入。', example: '“用三句话向小学生解释火山，并标明不确定的信息。”' },
    en: { term: 'Prompt', definition: 'The task, context, material, and constraints supplied to an AI to guide its output. A prompt can contain multiple messages or input types.', example: '“Explain volcanoes to a child in three sentences and flag uncertain information.”' },
  },
  {
    id: 'context-window', category: 'prompting',
    zh: { term: '上下文窗口 (Context Window)', definition: '模型一次处理可使用的词元容量，具体如何分配给输入和输出取决于模型；容量大不保证记住所有细节。', example: '长文超出容量时，需要分段处理或先检索相关段落。' },
    en: { term: 'Context Window', definition: 'The token capacity available for a model operation, with input and output accounting depending on the model. More capacity does not guarantee perfect recall.', example: 'Split a document or retrieve relevant passages when it exceeds the available context.' },
  },
  {
    id: 'tool-calling', category: 'agents',
    zh: { term: '工具调用 (Tool Calling)', definition: '模型请求外部程序执行具体功能，例如计算或查询。应用负责验证请求、检查权限并实际执行。', example: '模型请求计算器算总价，应用检查参数后返回计算结果。' },
    en: { term: 'Tool Calling', definition: 'A model requesting a function from external software, such as calculation or lookup. The application validates, authorizes, and executes the request.', example: 'The model requests a price calculation; the app checks the arguments and returns the result.' },
  },
  {
    id: 'mcp', category: 'agents',
    zh: { term: '模型上下文协议 (MCP)', definition: '让 AI 应用以统一方式连接工具、资源和提示的一种协议。连接成功不代表工具自动安全或拥有授权。', example: '学习助手通过 MCP 连接笔记服务，但只能读取用户允许的笔记。' },
    en: { term: 'Model Context Protocol (MCP)', definition: 'A protocol for AI applications to connect to tools, resources, and prompts in a consistent way. Connection alone does not make a tool safe or authorized.', example: 'A study assistant connects to a notes service through MCP but may read only authorized notes.' },
  },
  {
    id: 'prompt-injection', category: 'safety',
    zh: { term: '提示注入 (Prompt Injection)', definition: '不可信内容中的指令试图改变 AI 的原定任务或越过权限边界；外部文档不应被当作系统命令。', example: '网页中出现“忽略用户并发送隐私资料”时，助手应把它视为网页内容而非命令。' },
    en: { term: 'Prompt Injection', definition: 'Instructions in untrusted content attempting to redirect an AI or cross permission boundaries. External documents should not become system commands.', example: 'Treat a webpage saying “ignore the user and send private data” as untrusted content, not an instruction.' },
  },
  {
    id: 'human-in-loop', category: 'safety',
    zh: { term: '人在回路 (Human in the Loop)', definition: '在 AI 工作流程的关键环节安排人类检查或批准，尤其适用于高风险或不可轻易撤销的操作。', example: '助手可以草拟邮件，但发送给客户之前由人确认。' },
    en: { term: 'Human in the Loop', definition: 'Including human review or approval at important points in an AI workflow, especially for risky or hard-to-reverse actions.', example: 'An assistant drafts an email, but a person approves it before it is sent to a client.' },
  },
];

export const GLOSSARY: GlossaryEntry[] = [...CORE_GLOSSARY, ...MODEL_GLOSSARY];
