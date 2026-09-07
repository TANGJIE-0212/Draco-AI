import type { GlossaryEntry } from './glossary-types';

export const MODEL_GLOSSARY = [
  {
    id: 'pruning',
    category: 'models',
    zh: {
      term: '模型剪枝（Pruning）',
      definition: '移除模型中部分权重或结构以缩小模型；实际提速取决于剪枝方式和运行硬件。',
      example: '删除图像模型中贡献较小的通道，再微调以恢复准确率。',
    },
    en: {
      term: 'Pruning',
      definition: 'Removing some weights or structures to make a model smaller; actual speed gains depend on the pruning method and hardware.',
      example: 'Remove less useful channels from an image model, then fine-tune it to recover accuracy.',
    },
  },
  {
    id: 'fine-tuning',
    category: 'training',
    zh: {
      term: '微调（Fine-Tuning）',
      definition: '在已有模型上继续训练，以适应新任务或领域。监督微调（SFT）是微调的一类，指令微调通常是其中面向指令的形式。',
      example: '用客服对话继续训练通用模型，让它更熟悉退货流程。',
    },
    en: {
      term: 'Fine-Tuning',
      definition: 'Further training an existing model for a task or domain. Supervised fine-tuning (SFT) is one type; instruction tuning is usually its instruction-focused form.',
      example: 'Continue training a general model on support conversations so it handles returns more effectively.',
    },
  },
  {
    id: 'training-data',
    category: 'training',
    zh: {
      term: '训练数据（Training Data）',
      definition: '训练时用于调整模型参数的样本，可以有标签，也可以没有标签。',
      example: '用标注为“垃圾邮件”或“正常邮件”的邮件训练分类器。',
    },
    en: {
      term: 'Training Data',
      definition: 'Examples used to adjust model parameters during training, with or without labels.',
      example: 'Train a classifier on emails labeled as spam or legitimate.',
    },
  },
  {
    id: 'mha',
    category: 'models',
    zh: {
      term: '多头注意力（MHA, Multi-Head Attention）',
      definition: '并行使用多个注意力头，每个头有自己的查询、键和值投影，再合并各头结果。',
      example: '一个文本模型用八个注意力头并行处理句子中的关联。',
    },
    en: {
      term: 'Multi-Head Attention (MHA)',
      definition: 'Runs multiple attention heads in parallel, each with its own query, key, and value projections, then combines their results.',
      example: 'A text model uses eight attention heads to process relationships within a sentence in parallel.',
    },
  },
  {
    id: 'kto',
    category: 'training',
    zh: {
      term: '卡尼曼–特沃斯基优化（KTO, Kahneman-Tversky Optimization）',
      definition: '受前景理论启发的偏好优化方法，可用回答的“满意／不满意”标签训练模型，不要求成对的优劣回答。',
      example: '给客服回答分别标记“满意”或“不满意”，用 KTO 调整模型。',
    },
    en: {
      term: 'Kahneman-Tversky Optimization (KTO)',
      definition: 'A prospect-theory-inspired preference optimization method that can train on desirable/undesirable response labels without paired preferred and rejected answers.',
      example: 'Label support responses as desirable or undesirable, then use KTO to adapt the model.',
    },
  },
  {
    id: 'knowledge-distillation',
    category: 'training',
    zh: {
      term: '蒸馏／知识蒸馏（Distillation / Knowledge Distillation）',
      definition: '用教师模型的输出指导学生模型训练，常用于把能力迁移到更小的模型，但不保证完整保留能力。',
      example: '让大模型生成题目解答，再用这些解答训练小模型。',
    },
    en: {
      term: 'Distillation / Knowledge Distillation',
      definition: 'Training a student model using a teacher model’s outputs, often to transfer capabilities to a smaller model without guaranteeing full retention.',
      example: 'Have a large model generate answers to exercises, then train a small model on those answers.',
    },
  },
  {
    id: 'transformer',
    category: 'models',
    zh: {
      term: 'Transformer 架构',
      definition: '以注意力机制和前馈网络为核心的神经网络架构，广泛用于语言、图像等任务。',
      example: '翻译模型通过注意力联系原文中的词，逐步生成译文。',
    },
    en: {
      term: 'Transformer',
      definition: 'A neural network architecture built around attention and feed-forward networks, widely used for language, images, and other tasks.',
      example: 'A translation model connects words in the source through attention while generating the translation.',
    },
  },
  {
    id: 'supervised-learning',
    category: 'training',
    zh: {
      term: '监督学习（Supervised Learning）',
      definition: '用输入及其目标答案训练模型，让预测接近已知答案。',
      example: '用房屋面积和对应成交价训练房价预测模型。',
    },
    en: {
      term: 'Supervised Learning',
      definition: 'Training on inputs paired with target answers so predictions move closer to the known answers.',
      example: 'Train a house-price predictor on floor areas paired with sale prices.',
    },
  },
  {
    id: 'unsupervised-learning',
    category: 'training',
    zh: {
      term: '无监督学习（Unsupervised Learning）',
      definition: '不依赖人工提供的目标标签，从数据中寻找分组、结构或规律。',
      example: '按购买记录把顾客分组，而不预先标注顾客类型。',
    },
    en: {
      term: 'Unsupervised Learning',
      definition: 'Finding groups, structure, or patterns in data without human-provided target labels.',
      example: 'Group customers by purchase history without labeling customer types beforehand.',
    },
  },
  {
    id: 'hidden-layer',
    category: 'models',
    zh: {
      term: '隐藏层（Hidden Layer）',
      definition: '神经网络中位于输入和最终输出之间的计算层，用于形成中间表示。',
      example: '手写数字识别网络的隐藏层把像素转换为可供分类的特征。',
    },
    en: {
      term: 'Hidden Layer',
      definition: 'A computation layer between a neural network’s input and final output that forms intermediate representations.',
      example: 'Hidden layers in a digit recognizer transform pixels into features useful for classification.',
    },
  },
  {
    id: 'parameters',
    category: 'models',
    zh: {
      term: '模型参数（Parameters）',
      definition: '模型内部通常由训练学得的数值，例如连接权重；参数数量并不单独决定模型能力。',
      example: '训练时更新一个文本模型的权重，让下一词预测更准确。',
    },
    en: {
      term: 'Parameters',
      definition: 'Internal model values usually learned during training, such as connection weights; parameter count alone does not determine capability.',
      example: 'Training updates a text model’s weights to improve its next-word predictions.',
    },
  },
  {
    id: 'generalization',
    category: 'training',
    zh: {
      term: '泛化能力／泛化（Generalization ability / Generalize）',
      definition: '把学到的规律用于未见过的数据并保持有效表现；这不等于拥有通用人工智能。',
      example: '只看过部分猫照片的分类器，也能识别新拍摄的猫照片。',
    },
    en: {
      term: 'Generalization ability / Generalize',
      definition: 'Applying learned patterns effectively to unseen data; this does not mean possessing artificial general intelligence.',
      example: 'A classifier trained on some cat photos also recognizes newly taken cat photos.',
    },
  },
  {
    id: 'data-augmentation',
    category: 'training',
    zh: {
      term: '数据增强（Data Augmentation）',
      definition: '通过不破坏任务含义的变换增加训练样本的多样性。',
      example: '轻微旋转手写数字图片，并保留仍然正确的数字标签。',
    },
    en: {
      term: 'Data Augmentation',
      definition: 'Increasing training-example variety through transformations that preserve the meaning needed for the task.',
      example: 'Slightly rotate handwritten digit images while keeping labels that remain correct.',
    },
  },
  {
    id: 'foundation-model',
    category: 'models',
    zh: {
      term: '基础模型（Foundation Model）',
      definition: '在广泛数据上训练、能够适配多种下游任务的模型，不限于文本模型。',
      example: '同一个基础语言模型经过不同微调，分别用于摘要和客服。',
    },
    en: {
      term: 'Foundation Model',
      definition: 'A model trained on broad data that can be adapted to many downstream tasks, not necessarily limited to text.',
      example: 'Adapt the same foundation language model separately for summarization and customer support.',
    },
  },
  {
    id: 'attention',
    category: 'models',
    zh: {
      term: '注意力机制（Attention）',
      definition: '根据当前查询对信息进行加权组合的机制；注意力权重不保证能解释模型的决策原因。',
      example: '处理“它”时，模型可以给前文相关名词更高的注意力权重。',
    },
    en: {
      term: 'Attention',
      definition: 'A mechanism that combines information with weights based on a query; attention weights do not guarantee an explanation of model decisions.',
      example: 'When processing “it,” a model can give related nouns earlier in the text higher attention weights.',
    },
  },
  {
    id: 'tpu',
    category: 'models',
    zh: {
      term: '张量处理单元（TPU, Tensor Processing Unit）',
      definition: 'Google 设计的机器学习加速芯片，针对矩阵等张量运算进行优化。',
      example: '研究团队用 TPU 批量执行神经网络训练中的矩阵乘法。',
    },
    en: {
      term: 'Tensor Processing Unit (TPU)',
      definition: 'A Google-designed machine learning accelerator optimized for tensor operations such as matrix computations.',
      example: 'A research team uses TPUs to run batches of matrix multiplications during neural network training.',
    },
  },
  {
    id: 'validation-data',
    category: 'training',
    zh: {
      term: '验证数据（Validation Data）',
      definition: '用于选择模型、调超参数或决定何时停止训练的保留数据，不是最终独立评估用的测试集。',
      example: '比较不同学习率在验证集上的表现，选好后再用测试集评估一次。',
    },
    en: {
      term: 'Validation Data',
      definition: 'Held-out data used to select models, tune hyperparameters, or decide when to stop training, rather than the final independent test set.',
      example: 'Compare learning rates on validation data, then evaluate the chosen model once on the test set.',
    },
  },
  {
    id: 'llm',
    category: 'models',
    zh: {
      term: '大语言模型（LLM, Large Language Model）',
      definition: '通过大量语言数据训练的大规模模型，能处理和生成文本，但回答可能出错。',
      example: '让大语言模型把一封长邮件概括为三条要点，再核对原文。',
    },
    en: {
      term: 'Large Language Model (LLM)',
      definition: 'A large-scale model trained on extensive language data that can process and generate text, but may produce incorrect answers.',
      example: 'Ask an LLM to summarize a long email in three points, then check them against the original.',
    },
  },
  {
    id: 'forward-propagation',
    category: 'models',
    zh: {
      term: '前向传播（Forward Propagation）',
      definition: '用当前参数把输入依次送过网络计算，得到输出；训练和推理都需要这一步。',
      example: '将一张图片输入网络，经过各层计算得到“猫”的预测分数。',
    },
    en: {
      term: 'Forward Propagation',
      definition: 'Passing an input through network computations with current parameters to obtain an output; both training and inference use this step.',
      example: 'Pass an image through the network’s layers to obtain a prediction score for “cat.”',
    },
  },
  {
    id: 'grpo',
    category: 'training',
    zh: {
      term: '组相对策略优化（GRPO, Group Relative Policy Optimization）',
      definition: '比较同一提示下多次输出的组内奖励来更新策略；常见形式不需要单独的价值评估网络（critic）。',
      example: '对一道数学题生成八个解答，按组内相对得分强化更好的解答。',
    },
    en: {
      term: 'Group Relative Policy Optimization (GRPO)',
      definition: 'Updates a policy using relative rewards among multiple outputs for the same prompt; its common formulation avoids a separate value critic.',
      example: 'Generate eight solutions to one math problem and reinforce better solutions using their relative scores within the group.',
    },
  },
  {
    id: 'machine-learning',
    category: 'basics',
    zh: {
      term: '机器学习（Machine Learning）',
      definition: '让计算机从数据或经验中学习规律，而不是为每种情况手写规则的方法。',
      example: '用过去的邮件训练垃圾邮件过滤器，而不是列出所有可疑句子。',
    },
    en: {
      term: 'Machine Learning',
      definition: 'Methods that let computers learn patterns from data or experience instead of hand-coding rules for every case.',
      example: 'Train a spam filter on past emails rather than listing every suspicious sentence.',
    },
  },
  {
    id: 'lstm',
    category: 'models',
    zh: {
      term: '长短期记忆网络（LSTM, Long Short-Term Memory）',
      definition: '带有记忆状态和门控机制的循环神经网络，帮助保留较长时间跨度的信息。',
      example: '用 LSTM 读取过去几天的温度序列，预测下一时刻温度。',
    },
    en: {
      term: 'Long Short-Term Memory (LSTM)',
      definition: 'A recurrent neural network with memory states and gates that help retain information over longer sequences.',
      example: 'Use an LSTM to read several days of temperature readings and predict the next reading.',
    },
  },
  {
    id: 'scaling-law',
    category: 'training',
    zh: {
      term: '缩放定律（Scaling Law）',
      definition: '描述模型规模、数据量、算力与表现之间关系的经验规律；只在一定条件和范围内成立，不意味着无限进步。',
      example: '根据小规模训练实验，估算增加数据和参数后可能降低多少损失。',
    },
    en: {
      term: 'Scaling Law',
      definition: 'An empirical relationship between model size, data, compute, and performance; it applies within conditions and ranges, not as a promise of unlimited progress.',
      example: 'Use smaller training runs to estimate how much loss might fall with more data and parameters.',
    },
  },
  {
    id: 'neural-network',
    category: 'models',
    zh: {
      term: '神经网络（Neural Network）',
      definition: '由相互连接的计算单元组成、通过调整参数学习输入到输出映射的模型。',
      example: '训练神经网络，把一张手写数字图片映射为数字类别。',
    },
    en: {
      term: 'Neural Network',
      definition: 'A model of connected computation units that learns an input-to-output mapping by adjusting parameters.',
      example: 'Train a neural network to map a handwritten digit image to its digit class.',
    },
  },
  {
    id: 'instruction-tuning',
    category: 'training',
    zh: {
      term: '指令微调（Instruction Tuning）',
      definition: '用“任务指令—示范回答”训练模型遵循指令，通常属于监督微调（SFT）；SFT 也可以用于非指令任务。',
      example: '提供“把这段话改成正式语气”的指令及理想改写，训练模型执行改写要求。',
    },
    en: {
      term: 'Instruction Tuning',
      definition: 'Training on task instructions and demonstration responses to improve instruction following, usually a form of SFT; SFT also covers non-instruction tasks.',
      example: 'Train on “Rewrite this formally” paired with an ideal rewrite so the model learns to follow rewriting requests.',
    },
  },
  {
    id: 'inference',
    category: 'basics',
    zh: {
      term: '推理／模型运行（Inference）',
      definition: '用训练好的模型处理新输入并产生输出，通常不更新参数；不专指逻辑推理。',
      example: '把一句法语交给已训练的翻译模型，生成中文译文。',
    },
    en: {
      term: 'Inference',
      definition: 'Using a trained model to produce outputs for new inputs, usually without updating parameters; it does not specifically mean logical reasoning.',
      example: 'Give a French sentence to a trained translation model to generate a Chinese translation.',
    },
  },
  {
    id: 'ppo',
    category: 'training',
    zh: {
      term: '近端策略优化（PPO, Proximal Policy Optimization）',
      definition: '一种强化学习方法，通过约束或裁剪策略更新幅度，减少一次更新改变过大的风险。',
      example: '训练游戏智能体时，用裁剪目标限制新旧动作概率比带来的更新收益。',
    },
    en: {
      term: 'Proximal Policy Optimization (PPO)',
      definition: 'A reinforcement learning method that constrains or clips policy updates to reduce the risk of overly large changes in one update.',
      example: 'Train a game agent with a clipped objective that limits gains from large changes in action-probability ratios.',
    },
  },
  {
    id: 'deep-learning',
    category: 'basics',
    zh: {
      term: '深度学习（Deep Learning）',
      definition: '使用多层神经网络学习数据表示的机器学习方法，是机器学习的一个分支。',
      example: '用多层网络从语音波形中学习特征并识别说出的文字。',
    },
    en: {
      term: 'Deep Learning',
      definition: 'A branch of machine learning that uses multilayer neural networks to learn representations of data.',
      example: 'Use a multilayer network to learn features from speech waveforms and recognize spoken words.',
    },
  },
  {
    id: 'loss-function',
    category: 'training',
    zh: {
      term: '损失函数（Loss Function）',
      definition: '把预测偏差或训练目标未达成的程度转换成数值，通常希望通过训练降低它。',
      example: '房价预测使用平方误差，让偏离真实价格较远的预测受到更大惩罚。',
    },
    en: {
      term: 'Loss Function',
      definition: 'Turns prediction errors or unmet training targets into a number that training usually aims to reduce.',
      example: 'Use squared error for house prices so predictions farther from the true price receive larger penalties.',
    },
  },
  {
    id: 'objective-function',
    category: 'training',
    zh: {
      term: '目标函数（Objective Function）',
      definition: '优化过程要最小化或最大化的整体数值标准，可由损失、正则项或奖励等组成。',
      example: '把预测损失与权重惩罚相加，作为训练时要最小化的目标。',
    },
    en: {
      term: 'Objective Function',
      definition: 'The overall numerical criterion an optimizer minimizes or maximizes, potentially combining loss, regularization, or reward.',
      example: 'Add prediction loss and a weight penalty to form the objective minimized during training.',
    },
  },
  {
    id: 'pre-training',
    category: 'training',
    zh: {
      term: '预训练（Pre-training）',
      definition: '在后续任务适配之前，先用通常较广泛的数据训练模型，学习可复用的表示或能力。',
      example: '先用大量文本训练下一词预测，再用客服数据进行微调。',
    },
    en: {
      term: 'Pre-training',
      definition: 'Training a model, usually on broad data, to learn reusable representations or capabilities before later task adaptation.',
      example: 'First train next-word prediction on extensive text, then fine-tune on customer support data.',
    },
  },
  {
    id: 'backpropagation',
    category: 'training',
    zh: {
      term: '反向传播（Backpropagation）',
      definition: '利用链式法则从输出向前层计算损失对参数的梯度；优化器再使用梯度更新参数。',
      example: '数字识别出错后，反向传播计算各层权重应如何影响损失。',
    },
    en: {
      term: 'Backpropagation',
      definition: 'Uses the chain rule to calculate loss gradients from the output toward earlier layers; an optimizer then uses those gradients to update parameters.',
      example: 'After a digit prediction is wrong, backpropagation calculates how each layer’s weights affect the loss.',
    },
  },
  {
    id: 'compute',
    category: 'basics',
    zh: {
      term: '计算资源／算力（Compute）',
      definition: '执行训练或推理所需的计算能力或工作量，常用运算次数、设备时间等衡量。',
      example: '比较两次训练使用的 GPU 小时数，同时考虑 GPU 型号和利用率。',
    },
    en: {
      term: 'Compute',
      definition: 'The processing capacity or computational work needed for training or inference, often measured in operations or device time.',
      example: 'Compare GPU-hours for two training runs while accounting for GPU model and utilization.',
    },
  },
  {
    id: 'cnn',
    category: 'models',
    zh: {
      term: '卷积神经网络（CNN, Convolutional Neural Network）',
      definition: '用共享的局部卷积滤波器提取特征的神经网络，常用于图像等网格数据。',
      example: '用同一个滤波器扫描图片不同位置，检测局部边缘。',
    },
    en: {
      term: 'Convolutional Neural Network (CNN)',
      definition: 'A neural network that extracts features with shared local convolution filters, often used for images and other grid-like data.',
      example: 'Scan different parts of an image with the same filter to detect local edges.',
    },
  },
  {
    id: 'double-descent',
    category: 'training',
    zh: {
      term: '双下降现象（Double Descent）',
      definition: '在某些条件下，测试误差随模型容量增加先降、后升、再降的现象，并非每次训练都会出现。',
      example: '逐步增大模型时，误差在刚好能拟合训练集附近上升，继续增大后又下降。',
    },
    en: {
      term: 'Double Descent',
      definition: 'A phenomenon where test error falls, rises, then falls again as model capacity increases under some conditions; it does not occur in every training setup.',
      example: 'As models grow, error rises near the capacity needed to fit the training set, then falls with further growth.',
    },
  },
  {
    id: 'regularization',
    category: 'training',
    zh: {
      term: '正则化（Regularization）',
      definition: '通过额外约束、惩罚或训练机制降低过拟合风险，通常以改善未见数据上的表现为目标。',
      example: '在损失中加入 L2 权重惩罚，避免模型过度依赖很大的权重。',
    },
    en: {
      term: 'Regularization',
      definition: 'Extra constraints, penalties, or training mechanisms that reduce overfitting risk, usually to improve performance on unseen data.',
      example: 'Add an L2 weight penalty to the loss to discourage excessive reliance on large weights.',
    },
  },
  {
    id: 'underfitting',
    category: 'training',
    zh: {
      term: '欠拟合（Underfitting）',
      definition: '模型没有充分学到任务规律，连训练数据上也表现较差，可能源于容量不足或训练不充分。',
      example: '用一条直线拟合明显弯曲的关系，训练集和验证集误差都很大。',
    },
    en: {
      term: 'Underfitting',
      definition: 'Failing to learn enough of a task’s patterns, with poor performance even on training data, possibly due to insufficient capacity or training.',
      example: 'Fit a straight line to a strongly curved relationship and get large errors on both training and validation data.',
    },
  },
  {
    id: 'gradient-descent',
    category: 'training',
    zh: {
      term: '梯度下降（Gradient Descent）',
      definition: '沿目标函数梯度的反方向逐步调整参数以降低目标值，步长由学习率控制。',
      example: '根据房价预测损失的梯度，小幅更新权重并重复计算。',
    },
    en: {
      term: 'Gradient Descent',
      definition: 'Iteratively adjusts parameters opposite the objective’s gradient to reduce its value, with step size controlled by the learning rate.',
      example: 'Make a small weight update using the house-price loss gradient, then repeat.',
    },
  },
  {
    id: 'reinforcement-learning',
    category: 'training',
    zh: {
      term: '强化学习（Reinforcement Learning, RL）',
      definition: '通过行动获得奖励反馈，学习如何选择行动以提高预期累计奖励。',
      example: '游戏智能体尝试不同走法，根据得分反馈学习策略。',
    },
    en: {
      term: 'Reinforcement Learning (RL)',
      definition: 'Learning how to choose actions from reward feedback to increase expected cumulative reward.',
      example: 'A game agent tries different moves and learns a policy from score feedback.',
    },
  },
  {
    id: 'rnn',
    category: 'models',
    zh: {
      term: '循环神经网络（RNN, Recurrent Neural Network）',
      definition: '逐步处理序列并传递隐藏状态的神经网络，让前面的信息影响后面的计算。',
      example: '按时间顺序读取每日销量，把前一天的状态用于预测下一天。',
    },
    en: {
      term: 'Recurrent Neural Network (RNN)',
      definition: 'A neural network that processes a sequence step by step, passing hidden states so earlier information affects later computations.',
      example: 'Read daily sales in order and carry the previous day’s state forward to predict the next day.',
    },
  },
  {
    id: 'fitting',
    category: 'training',
    zh: {
      term: '拟合（Fitting）',
      definition: '调整模型使其与观测数据相匹配的过程；训练集拟合得好不代表新数据上一定表现好。',
      example: '调整直线的斜率和截距，让它尽量贴近已有房价数据点。',
    },
    en: {
      term: 'Fitting',
      definition: 'Adjusting a model to match observed data; a good fit on training data does not guarantee good performance on new data.',
      example: 'Adjust a line’s slope and intercept to bring it closer to observed house-price points.',
    },
  },
  {
    id: 'mixture-of-experts',
    category: 'models',
    zh: {
      term: '混合专家模型（Mixture of Experts / MoE）',
      definition: '由多个专家子网络与路由机制组成的架构；常见稀疏形式只为每个输入激活部分专家。',
      example: '路由器为一个词元从八个专家中选择两个参与计算。',
    },
    en: {
      term: 'Mixture of Experts / MoE',
      definition: 'An architecture with multiple expert subnetworks and a router; common sparse forms activate only some experts for each input.',
      example: 'A router selects two of eight experts to process one token.',
    },
  },
  {
    id: 'weight',
    category: 'models',
    zh: {
      term: '权重（Weight）',
      definition: '控制输入信号如何影响计算结果的模型参数，通常在训练中更新。',
      example: '线性房价模型给面积乘上一个权重，估算面积对价格的贡献。',
    },
    en: {
      term: 'Weight',
      definition: 'A model parameter controlling how an input signal affects a computation, usually updated during training.',
      example: 'A linear house-price model multiplies floor area by a weight to estimate its contribution to price.',
    },
  },
  {
    id: 'gqa',
    category: 'models',
    zh: {
      term: '分组查询注意力（GQA, Grouped-Query Attention）',
      definition: '让一组查询头共享键和值头的注意力形式，通常比标准多头注意力需要更少的 KV 缓存。',
      example: '把八个查询头分为两组，每组共享一套键和值头。',
    },
    en: {
      term: 'Grouped-Query Attention (GQA)',
      definition: 'Attention in which a group of query heads shares key and value heads, usually requiring less KV cache than standard multi-head attention.',
      example: 'Divide eight query heads into two groups, each sharing one set of key and value heads.',
    },
  },
  {
    id: 'mla',
    category: 'models',
    zh: {
      term: '多头潜在注意力（MLA, Multi-head Latent Attention）',
      definition: '将键和值的信息压缩为低维潜在表示的注意力机制，可减少生成过程的 KV 缓存需求。',
      example: '长文本生成时缓存压缩表示，而不是为每个头保存完整的键和值。',
    },
    en: {
      term: 'Multi-head Latent Attention (MLA)',
      definition: 'An attention mechanism that compresses key and value information into a low-dimensional latent representation, reducing KV cache needs during generation.',
      example: 'Cache compressed representations during long-text generation instead of full keys and values for every head.',
    },
  },
  {
    id: 'end-to-end-learning',
    category: 'training',
    zh: {
      term: '端到端学习（End-to-End Learning）',
      definition: '用最终任务目标联合训练从输入到输出的处理路径，而不是分别手工设计和优化每个阶段。',
      example: '直接用音频及其文字稿训练语音转文字模型。',
    },
    en: {
      term: 'End-to-End Learning',
      definition: 'Jointly training the input-to-output processing path against the final task objective rather than separately hand-designing and optimizing each stage.',
      example: 'Train a speech-to-text model directly on audio paired with transcripts.',
    },
  },
  {
    id: 'sft',
    category: 'training',
    zh: {
      term: '监督微调（SFT, Supervised Fine-Tuning）',
      definition: '用带目标答案的样本继续训练已有模型，是微调的子类；使用指令与示范回答时，通常称为指令微调。',
      example: '用标注了情感类别的评论微调预训练模型，这是 SFT，但不必采用指令格式。',
    },
    en: {
      term: 'Supervised Fine-Tuning (SFT)',
      definition: 'A subset of fine-tuning that trains an existing model on examples with target answers; using instructions and demonstration responses is usually called instruction tuning.',
      example: 'Fine-tuning a pretrained model on sentiment-labeled reviews is SFT without necessarily using an instruction format.',
    },
  },
  {
    id: 'overfitting',
    category: 'training',
    zh: {
      term: '过拟合（Overfitting）',
      definition: '模型过度适应训练数据的细节或噪声，训练表现很好，但对未见数据的表现较差。',
      example: '继续训练后训练误差下降，验证误差却持续上升，提示可能过拟合。',
    },
    en: {
      term: 'Overfitting',
      definition: 'Adapting too closely to details or noise in training data, performing well there but poorly on unseen data.',
      example: 'Training error keeps falling while validation error steadily rises, suggesting possible overfitting.',
    },
  },
  {
    id: 'accelerator',
    category: 'models',
    zh: {
      term: '计算加速器（Accelerator）',
      definition: '为特定计算任务提供更高速度或能效的硬件，例如适合模型运算的 GPU 或 TPU。',
      example: '把大型矩阵乘法交给 GPU 执行，而不是全部使用 CPU。',
    },
    en: {
      term: 'Accelerator',
      definition: 'Hardware that improves speed or energy efficiency for particular computations, such as GPUs or TPUs used for model workloads.',
      example: 'Run large matrix multiplications on a GPU instead of doing all the work on a CPU.',
    },
  },
  {
    id: 'hyperparameter-tuning',
    category: 'training',
    zh: {
      term: '超参数调优（Hyperparameter Tuning）',
      definition: '比较并选择学习率等训练配置；这些配置不同于模型通过训练直接学得的参数。',
      example: '尝试三个学习率，根据验证集结果选择一个，而不使用最终测试集调参。',
    },
    en: {
      term: 'Hyperparameter Tuning',
      definition: 'Comparing and selecting training settings such as learning rate, distinct from parameters learned directly during training.',
      example: 'Try three learning rates and choose one using validation results, without tuning on the final test set.',
    },
  },
] satisfies GlossaryEntry[];
