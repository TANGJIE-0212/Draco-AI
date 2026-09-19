import type { DayContent, LessonStep } from './types';
import { q, m, p, type Both } from './course-fix-builders';
import { SCHEMA_LESSON } from './course-fixes-schema';
import { SAFETY_QUESTIONS, SAFETY_PRACTICES, SAFETY_THEORY, SAFETY_LABS } from './course-fixes-safety';
import { PROMPT_QUESTIONS, PROMPT_PRACTICES, PROMPT_THEORY, PROMPT_LABS } from './course-fixes-prompts';
import { MEDIA_QUESTIONS, MEDIA_THEORY, MEDIA_LABS } from './course-fixes-media';
import { CONTEXT_LESSON } from './course-fixes-context';
import { FOUNDATION_QUESTIONS, FOUNDATION_THEORY, FOUNDATION_PRACTICES, FOUNDATION_LABS } from './course-fixes-foundations';
import { LEARNING_QUESTIONS, LEARNING_THEORY } from './course-fixes-learning';
import { RETAINED_EXPLANATIONS } from './course-fixes-explanations';
import { RETAINED_DISTRACTORS } from './course-fixes-distractors';

// Reviewed bilingual corrections. Assessment numbers exclude theory/video/labs.
// Keeping the two languages together prevents old English lessons surviving a CN edit.

export const QUESTION_FIXES: Record<string, Record<number, Both>> = {
 ...SAFETY_QUESTIONS,
 ...PROMPT_QUESTIONS,
 ...MEDIA_QUESTIONS,
 ...FOUNDATION_QUESTIONS,
 ...LEARNING_QUESTIONS,
 '1-1': {
  2:q(['达特茅斯会议的重要性主要体现在哪里？','What made the Dartmouth workshop an important milestone?'],[
   ['把人工智能作为共同研究议题，推动一个研究领域形成','It brought researchers together around AI as a shared research field'],
   ['首次用大规模数据训练了深度神经网络','It first trained a deep neural network on a large dataset'],
   ['建立了后来大语言模型采用的注意力架构','It established the attention architecture used by later language models']],['这是研究领域形成的节点，不是深度学习或 Transformer 的发明。','It marks the formation of a field, not the invention of deep learning or Transformers.']),
  4:q(['一项 AI 技术承诺很高，实际效果却长期达不到预期。这如何导致 AI 寒冬？','How can inflated promises and disappointing results contribute to an AI winter?'],[
   ['投入与信任下降，研究发展放缓','Investment and trust decline, slowing research'],['研究立即转向更大规模的实际应用','Research immediately expands into larger deployments'],['已有系统的计算规则因此发生改变','The computational rules of existing systems change']],['寒冬描述资金和关注下降，不是程序本身突然停止运算。','An AI winter describes declining funding and attention, not a change in how programs compute.']),
  6:q(['AlexNet 从大量图像中学习多层特征，主要推动了哪条技术路线？','AlexNet learned multiple layers of features from many images. Which approach did it help advance?'],[
   ['深度学习','Deep learning'],['由专家逐条编写规则的专家系统','Expert systems with hand-written rules'],['主要依赖人工设计搜索规则的棋类程序','Game programs mainly using hand-designed search rules']],['多层神经网络从数据中学习特征，是深度学习的关键特点。','Learning features from data through multiple neural-network layers is characteristic of deep learning.']),
  9:m(['将这四个历史节点与各自的主要贡献配对。','Match these milestones to their distinct contributions.'],[
   [['图灵测试','Turing Test'],['用对话表现讨论机器智能','A conversational test of machine intelligence']],
   [['达特茅斯会议','Dartmouth workshop'],['推动人工智能研究领域形成','Helped establish AI as a research field']],
   [['Transformer','Transformer'],['以注意力机制为核心的模型架构','A model architecture centered on attention']],
   [['ChatGPT','ChatGPT'],['把对话式生成 AI 带给广大用户','Brought conversational generative AI to a broad audience']]]),
 10:q(['数据增加、算力提升和算法进步如何共同推动 AI？','How do data, computing power, and algorithms work together to advance AI?'],[
  ['更多数据提供训练材料，算力支持计算，算法提高学习效果','Data supplies examples, computing enables training, and algorithms improve learning'],
  ['算力提高后就不再需要训练数据','More computing removes the need for training data'],
  ['只要增加数据，就不必考虑算法和计算成本','More data makes algorithm design and computation cost irrelevant']],['三者共同作用，不能用一个因素完全替代另外两个。','These factors work together; one cannot fully replace the others.']),
 12:q(['ChatGPT 广泛使用说明了什么，而不能单凭它说明什么？','What does widespread use of ChatGPT demonstrate?'],[
  ['自然语言交互降低了使用门槛，但不证明回答总是正确','Natural-language interaction makes AI more accessible, but does not prove every answer correct'],
  ['只要能流畅对话，就已经证明机器拥有意识','Fluent conversation establishes that a machine is conscious'],
  ['生成式 AI 从此可以取代所有专门任务模型','Generative AI can now replace every specialized model']],['普及、流畅和可靠是不同维度，需要分别判断。','Accessibility, fluency, and reliability are different qualities.']),
 13:q(['与深蓝相比，AlphaGo 更突出地结合了什么？','Compared with Deep Blue, what did AlphaGo more prominently combine?'],[
  ['神经网络学习与搜索','Neural-network learning and search'],['只按专家预先写好的围棋规则查表','Only lookups based on expert-written Go rules'],['完全取消搜索，只依靠固定棋谱','No search, relying only on a fixed collection of games']],['AlphaGo 并没有取消搜索，而是把学习到的策略和价值估计与搜索结合。','AlphaGo combined learned policy and value estimates with search rather than eliminating search.']),
 },
 '1-2': {
 3:q(['同一句话在两个 Tokenizer 中得到不同 Token 数，最合理的解释是什么？','Why can two tokenizers produce different token counts for the same sentence?'],[
  ['词表或切分规则不同','Their vocabularies or segmentation rules differ'],['Token 少的模型一定更理解这句话','The model with fewer tokens necessarily understands it better'],['其中一个必定删掉了一部分原文','One must have deleted part of the original text']],['切分不同不等于理解能力不同，也不意味着删掉原文。','Different segmentation does not itself establish better understanding or deletion.']),
 5:q(['为什么不把所有训练文本都做成独立的完整词条？','Why not give every complete training text its own vocabulary entry?'],[
  ['词表会很大，且新组合仍需要较小片段表达','The vocabulary would be huge, and new combinations still need smaller pieces'],['完整词条一定比小片段更容易核实事实','Whole entries necessarily make fact-checking easier'],['词表扩大后上下文窗口会自动扩大','A larger vocabulary automatically expands the context window']],['词表容量与序列长度要权衡；词表不是事实核验器，也不决定窗口自动扩容。','Vocabulary size and sequence length trade off; vocabulary does not verify facts or automatically enlarge a context window.']),
 6:m(['下面给出某个教学 Tokenizer 的实际切分。按结果配对，不推测其他模型。','Match the observed outputs of this toy tokenizer, not guesses about other models.'],[
  [['cat → [cat]','cat → [cat]'],['这个样例使用 1 个完整词 Token','This example uses one whole-word token']],
  [['unbelievable → [un, believ, able]','unbelievable → [un, believ, able]'],['这个样例使用 3 个子词 Token','This example uses three subword tokens']],
  [['2026 → [20, 26]','2026 → [20, 26]'],['这个数字样例拆成 2 块','This number is split into two pieces']],
  [['a+b → [a, +, b]','a+b → [a, +, b]'],['这里的加号也单独占 1 个 Token','The plus sign occupies a separate token here']]]),
 7:q(['unbelievable 被切为 un / believ / able。哪条结论有这个观察的支持？','A tokenizer splits unbelievable into un / believ / able. What does this observation support?'],[
  ['它能用子词片段表示这个词','It can represent this word using subword pieces'],['它会把每个英文词都切成三块','It splits every English word into three pieces'],['这个模型的真实含义表示只有三个数字','The model has only three numbers for representing meaning']],['一个样例说明可以使用子词，不足以推断所有词的切法或向量维数。','One example shows subword use, not a universal split count or embedding dimension.']),
 8:q(['只按空格切分，会遗漏哪种重要情况？','What important case does splitting only on spaces miss?'],[
  ['中文常无词间空格，词内和代码符号也可能需要分块','Chinese often lacks word spaces, and word parts or code symbols may need separate pieces'],['所有英文空格都应该变成整句的语义向量','Every English space should become the semantic vector for a whole sentence'],['空格数量足以推算任何模型的 Token 数','Counting spaces is enough to calculate tokens for any model']],['空格并不是适用于所有语言和内容的统一分词边界。','Spaces are not a universal segmentation boundary for every language and content type.']),
 10:q(['只剩 800 Token 容量，输入却还要增加 1500 Token。应该怎样处理？','Only 800 tokens remain, but you need to add 1,500 tokens of material. What should you do?'],[
  ['提取必要资料或分批处理，并为输出预留空间','Select relevant material or split the task, reserving room for the answer'],['提高温度，使模型用更少 Token 接收同样输入','Raise temperature so the same input occupies fewer tokens'],['直接塞入全部资料，假定系统会自动保留最关键的段落','Insert everything and assume the system will automatically retain the most important passages']],['温度不改变输入容量；超出预算不能保证保留关键证据，应主动管理输入和输出预算。','Temperature does not change input capacity. Exceeding the budget does not guarantee preservation of key evidence; manage the input and output budget.']),
 11:q(['要减少输入量，又保留可核验的答案，应该优先删什么？','What should you remove first to reduce input while keeping the answer verifiable?'],[
  ['重复或无关的段落','Duplicate or irrelevant passages'],['全部来源日期和出处','All source dates and references'],['题目指定的限制条件','The constraints specified in the task']],['必要证据、日期和限制应保留，重复信息通常更适合先删。','Preserve necessary evidence, dates, and constraints; remove duplication first.']),
 12:q(['相同文本分别使用 120 和 160 Token。接下来怎样比较两个模型的能力？','The same text takes 120 and 160 tokens. How should you compare model capability next?'],[
  ['在相同任务上比较准确性等结果','Compare outcomes such as accuracy on the same tasks'],['直接把 120 Token 的模型判为更强','Declare the 120-token model better'],['直接把 160 Token 的模型判为理解更细','Declare the 160-token model more precise']],['Token 数反映切分，能力需要任务测试。','Token count measures segmentation; capability requires task-based evaluation.']),
 14:q(['比较两个 Tokenizer 的占用情况，哪种实验更公平？','Which experiment fairly compares token usage between tokenizers?'],[
  ['用相同的中英、数字和代码样本记录切分及数量','Use the same language, number, and code samples and record the splits and counts'],['给一个短通知，给另一个长论文，只比较总数','Give one a short notice and the other a long paper, then compare counts'],['让每个模型自己挑最省 Token 的样本','Let each choose whichever sample uses the fewest tokens']],['同一批输入能减少样本差异造成的干扰。','Using the same inputs reduces confounding from different samples.']),
 15:p(['简化 BPE：四条片段“人工智能、人工审核、智能助手、智能设备”各出现一次，从单字开始，不跨片段。统计最高频相邻字对，按最高频优先做两轮合并，写出每轮选择和总 Token 数。','Toy BPE: the five words cat, cat, cat, dog, dog each occur once in this list. Start from individual letters and never merge across word boundaries. Count neighboring pairs, do two highest-frequency-first rounds, and state the total token count after each. Ties are allowed.'],
 ['给出智能 3 次、人工 2 次；先合并智能再合并人工；总数从 16 到 13 再到 11。','Count c+a and a+t three times each, d+o and o+g twice each; handle the first-round tie and recalculate counts; show 15 → 12 → 9 tokens.'],
 ['初始共有 16 个字块。智+能出现 3 次，人+工出现 2 次。第 1 轮合并智能，减少 3 块，共 13 块；更新频次后第 2 轮合并人工，减少 2 块，共 11 块。不能跨片段合并。','Initially there are 15 letter tokens. c+a and a+t tie at 3; d+o and o+g occur twice. Choose c+a first: each cat becomes [ca,t], giving 12 tokens. Now ca+t occurs 3 times; merging it gives 9 tokens. Starting with a+t and then c+at is equally valid.']),
 },
};

Object.assign(QUESTION_FIXES, {
 '1-3': {
  6:q(['二维星图为什么只能帮助理解，不能当作模型内部的完整地图？','Why is a 2D semantic map only a teaching aid?'],[['真实向量通常有更多维度，投到二维会丢失信息','Real vectors usually have many more dimensions; a 2D view loses information'],['图上距离最近的词一定共用同一个 Token ID','The nearest words must share a token ID'],['只要坐标画得精细，就能还原模型的全部关系','Precisely drawn coordinates recover every relation inside a model']],['简化图只展示部分关系，不应据此推断模型的全部结构。','A simplified diagram shows only some relationships, not the entire internal representation.']),
  9:q(['语义检索找到一篇与问题很相似、但写于五年前的政策文章。下一步最合理的是？','Semantic search finds a highly similar policy article written five years ago. What next?'],[['核查来源和有效日期，再判断是否适用','Check its source and effective date before using it'],['只用相似度最高的段落，不必检查日期','Use the highest-similarity passage without checking its date'],['把所有高分段落当成当前有效政策合并','Combine all high-scoring passages as current policy']],['相似度衡量相关性，不替你核实事实、来源或时效。','Similarity measures relevance, not truth, authority, or freshness.']),
 11:q(['“苹果很甜”与“苹果发布手机”，为什么同一个词需要结合周围文字理解？','Why does bank need context in “deposit at the bank” and “walk along the river bank”?'],[['周围文字提供了区分含义的线索','Nearby words provide clues to distinguish its senses'],['必须给每次出现的词随机换一个编号','Every occurrence must receive a random new ID'],['把向量长度加倍就一定能区分意思','Doubling the vector length guarantees disambiguation']],['静态词向量提供起点，上下文加工帮助确定此处含义。','A static embedding provides a starting point; contextual processing helps distinguish the sense here.']),
 12:q(['搜索“雨天在屋里怎么玩”，找到“室内桌游”活动页，为什么可能相关？','Why might “indoor board games” be relevant to a search for “things to do inside when it rains”?'],[['用词不同，但活动含义与需求相近','The wording differs, but the meaning matches the need'],['没有重复关键词的页面总比重复关键词的页面更可靠','Pages without the same words are always more reliable'],['向量搜索会先核实活动确实正在举办','Vector search first verifies that the event is currently running']],['语义相近可以跨越字面差异，但活动是否真实仍需核查。','Semantic relevance can cross wording differences; factual details still need checking.']),
 13:q(['文档 A 相似度更高但没有来源，文档 B 稍低且有当前官方依据。应该怎样选择？','Document A scores higher but has no source; B scores slightly lower and cites current official evidence. What should you do?'],[['阅读两者并核验依据，不只按分数决定','Read and verify the evidence rather than relying on scores alone'],['永远选 A，相似度已包含真实性','Always choose A because similarity includes truthfulness'],['永远选 B，任何官方文字都必定回答了问题','Always choose B because any official text necessarily answers the question']],['相关与可靠需要一起检查，不能仅靠一个标签替代阅读。','Check both relevance and reliability; neither a score nor a label replaces reading.']),
 14:m(['根据句子判断同一个词在不同语境中的含义。','Identify the senses of ambiguous words in context.'],[
 [['把文件放到云端','Save the files in the cloud'],['网络存储','Online storage']],
 [['天空飘来一朵云','A cloud crosses the sky'],['天气现象','A weather phenomenon']],
 [['苹果很好吃','Deposit money at the bank'],['水果','A financial institution']],
 [['苹果发布手机','The boat reaches the river bank'],['科技公司','Land beside a river']]]),
 },
 '1-4': {
 3:q(['“小刚要演讲，小明把书递给他。”哪条信息最能帮助确定“他”的指代？','“Sam will give a talk. Alex hands him a book.” What best helps identify him?'],[['小刚正在准备演讲，递书是在提供材料','Sam is preparing a talk and the book provides material'],['“他”在句子里占一个字的位置','Him occupies one position in the sentence'],['两个名字都与人有关，所以无需看上下文','Both names refer to people, so context is unnecessary']],['指代判断需要上下文提供的关系，不能只看编号或单词类别。','Reference resolution depends on contextual relationships, not just IDs or word categories.']),
 6:q(['Q/K/V 教学比喻中，Value 更接近什么？','In the Q/K/V analogy, what is a Value?'],[['候选位置可提供、随后按权重汇总的信息','Information from a candidate position that is combined using weights'],['专门用来检查资料许可的标签','A tag used only to check source permissions'],['保证句子事实正确的分数','A score guaranteeing factual correctness']],['Key 用于与 Query 比较；Value 是随后汇总的信息，不是验真分数。','Keys are compared with the Query; Values carry the information to combine, not truth scores.']),
 7:q(['以下哪组数可以作为三个位置归一化后的注意力权重？','Which set can represent normalized attention weights over three positions?'],[['0.6、0.3、0.1','0.6, 0.3, 0.1'],['0.6、0.4、0.2','0.6, 0.4, 0.2'],['0.8、0.3、−0.1','0.8, 0.3, −0.1']],['本例归一化权重非负且合计为 1；这并不表示事实正确率。','These normalized weights are nonnegative and sum to one; they are not factual accuracy rates.']),
 8:q(['“他”可能指小明，也可能指小刚，已有文字不足以判断。应该怎样处理？','A pronoun could refer to either Alex or Sam and the text is insufficient. What should you do?'],[['承认歧义，补充明确的信息再判断','Acknowledge ambiguity and seek clarifying information'],['总是指向距离最近的名字','Always choose the nearest name'],['选择编号更小的名字作为答案','Choose the name with the smaller token ID']],['注意力可以利用已有线索，但不能把缺失信息变成确定事实。','Attention uses available clues; missing information cannot be turned into certainty.']),
 10:q(['“这本书很轻”和“这次处罚很轻”中，“轻”的表示为什么可能不同？','Why can light have different representations in “a light bag” and “light punishment”?'],[['周围词说明了重量和程度的不同含义','Surrounding words distinguish weight from severity'],['字典中必须是完全不同的字符','They must be different characters in the dictionary'],['只因第二句话比第一句话更长','Only because the second sentence is longer']],['上下文改变此处含义，并不要求字符本身改变。','Context changes the sense in use without changing the word itself.']),
 11:q(['某位置注意力权重很高，能直接说明被关注句子真实可靠吗？','Does a high attention weight prove the attended statement is true?'],[['不能，关注程度不等于证据真实性','No; attention is not evidence of truth'],['能，高权重就是事实可信度','Yes; attention weights are factual confidence scores'],['只要权重超过一半就能保证','Yes, whenever the weight exceeds one half']],['模型在利用哪些信息，与这些信息是否真实是两个问题。','Which information is used and whether it is true are different questions.']),
 14:q(['把原句“他要演讲”改为“小刚要演讲”，这次修改主要解决了什么？','Changing “he will give a talk” to “Sam will give a talk” primarily resolves what?'],[['指代不明确','Ambiguous reference'],['上下文窗口容量不足','Insufficient context capacity'],['分词器词表没有所有完整句子','The lack of every full sentence in the vocabulary']],['直接点明对象提供了消歧信息，不是在扩大窗口或词表。','Naming the person supplies disambiguating information; it does not enlarge the context window or vocabulary.']),
 },
 '1-5': {
 2:q(['Softmax 如何把下一词候选的分数用于选择？','How does Softmax make next-token scores usable for selection?'],[['换算成非负且合计为 1 的分布','It converts them into a nonnegative distribution summing to one'],['把每个候选都换成相同概率','It gives every candidate the same probability'],['删除全部不符合事实的候选','It removes every factually incorrect candidate']],['Softmax 归一化分数，不负责事实核验，也不必产生均匀分布。','Softmax normalizes scores; it neither verifies facts nor necessarily produces a uniform distribution.']),
 5:q(['候选 A、B、C 原来分别为 60%、30%、10%。只提高正温度，不截取候选，哪种变化方向合理？','Candidates A, B, and C start at 60%, 30%, and 10%. If only positive temperature is increased, without filtering candidates, which trend is reasonable?'],[['三者概率更接近，但仍然 A > B > C','Their probabilities become closer, while A > B > C remains'],['A 的优势扩大，B 和 C 更少被选中','A gains a stronger advantage and B and C become less likely'],['顺序倒转为 C > B > A','Their order reverses to C > B > A']],['提高正温度会让这个分布更平缓，但不会倒转候选的概率排序；它增加低概率候选的机会，不是专门挑最低分。','Increasing positive temperature flattens this distribution without reversing its ranking. Lower-probability candidates gain a chance; the lowest score does not become the preferred choice.']),
 10:q(['候选 A=60%、B=30%、C=10%。贪心选择与按这个分布采样有什么区别？','For A=60%, B=30%, C=10%, how do greedy choice and sampling differ?'],[['贪心选 A；采样也可能选 B 或 C','Greedy chooses A; sampling can also choose B or C'],['两者每次都必须选 A','Both must choose A every time'],['采样必须优先选择最低概率的 C','Sampling must prefer the least likely candidate C']],['采样按概率抽取，不等于只选最大值或只选罕见值。','Sampling follows the distribution, not just its largest or smallest value.']),
 11:q(['两次生成不同答案，是否说明模型参数在这两次对话间重新训练了？','Do two different generated answers prove the model was retrained between replies?'],[['不说明；相同参数也可能因采样产生不同结果','No; sampling can produce different outputs with the same parameters'],['说明；每次选不同词都必须更新权重','Yes; every different token choice requires a weight update'],['只要文字更长就一定进行过训练','Yes, if the second answer is longer']],['一次生成中的候选选择，与训练时更新参数不是同一过程。','Choosing candidates during generation is different from updating parameters during training.']),
 13:q(['一个更长、更生动的续写与一个较短的续写，怎样比较事实可靠性？','How should you compare the factual reliability of a vivid long continuation and a shorter one?'],[['逐条核查内容和来源，不能只看长度与风格','Check claims and sources rather than length or style'],['更长的答案一定包含更多已核实证据','The longer answer necessarily contains more verified evidence'],['更短的答案一定没有遗漏条件','The shorter answer necessarily omits no conditions']],['表达风格不能替代事实检查。','Writing style does not replace verification.']),
 14:q(['保持提示词和模型不变，观察温度效果，哪种方法更合理？','With the prompt and model fixed, how should you examine the effect of temperature?'],[['每个温度多生成几次，比较结果变化并记录条件','Generate several outputs at each temperature and compare them while recording conditions'],['只各生成一次，就把全部差别归因于温度','Generate once at each setting and attribute every difference to temperature'],['同时更换提示词和模型来放大差异','Change the prompt and model too, to increase the difference']],['随机生成需要多次观察；固定其他条件才便于比较。','Random generation calls for repeated observations with other conditions held fixed.']),
 },
 '1-7': {
 7:q(['英文句子 “I deposited money at the bank” 被译成“我把钱存到河岸”。首先检查什么？','“I deposited money at the bank” is interpreted as leaving money by a river. What should you check first?'],[['是否利用存钱这个语境区分 bank 的含义','Whether the deposit context was used to disambiguate bank'],['是否把输出最大长度设置得足够高','Whether the output length limit is high enough'],['是否应该提高温度增加翻译变化','Whether temperature should be raised for more variation']],['bank 有银行和河岸等含义，存钱提供了金融语境。中文“银行”本身没有河岸义。','Bank is ambiguous, but depositing money supplies a financial context.']),
 },
});

const PRACTICE_FIXES: Record<string, Both> = {
 '1-7': p(['用文字补完流程：输入→Tokenizer→Embedding→Attention→Logits→Softmax→Sampling→下一 Token。再分别检查三份记录：A，输入只写“它为什么发亮”，回答当作灯泡；B，回答“月球自己发光”，并引用检索不到的书；C，计算记录把 378×492 输入成 378+492。每份写出能观察到的问题、下一步检查和一种改法，不必画图。','Complete this written flow: input → tokenizer → embedding → attention → logits → Softmax → sampling → next token. Then inspect three records: A, the input only says “Why does it shine?” and the answer assumes a light bulb; B, the answer says the Moon emits its own light and cites a book you cannot locate; C, a calculation of 378×492 was entered as 378+492. For each, state the observable issue, next check, and one improvement. No drawing is needed.'],['流程六环节顺序正确；三份记录各有问题、检查和改法；区分可观察证据与对模型内部原因的猜测。','Keep the six stages in order. For all three records, give an issue, check, and improvement. Distinguish observable evidence from hypotheses about internal model causes.'],['流程按题中顺序，Sampling 后的新 Token 加回输入并循环；温度采样在 Softmax 前调整 Logits。A：指代不清，先问“它”是谁，再明确写月球。B：说法与引文均待核验，查天文机构资料；月球主要反射太阳光，找不到的引文不能作为依据。C：日志显示运算符输入错误，改用乘法复算，378×492=185976。这些记录不能单独证明某个注意力头或采样步骤是唯一根因。','Follow the supplied order, append the sampled token, and repeat; temperature sampling adjusts logits before Softmax. A: the referent is unclear—ask what “it” means, then name the Moon. B: verify the claim and citation with an astronomy source; the Moon primarily reflects sunlight, and an unlocated citation is not evidence. C: the log shows the wrong operator; recompute the multiplication: 378×492=185976. These observations do not identify one attention head or sampling step as the sole cause.']),
 '1-1': p(['从图灵测试、达特茅斯会议、深蓝、AlphaGo、Transformer、ChatGPT 中选择至少三个节点，按时间顺序说明各自发生了什么、为什么重要。','Choose at least three milestones from the Turing Test, Dartmouth workshop, Deep Blue, AlphaGo, Transformer, and ChatGPT. Put them in time order and explain each contribution.'],['至少三个节点；时间顺序正确；事件和意义分别说明。','At least three milestones, chronological order, and an explanation of each event and its significance.'],['1950：图灵提出通过对话讨论机器智能。1997：深蓝展示了强大搜索和人工知识的棋类能力。2017：Transformer 提供了以注意力为核心的架构，成为许多语言模型的基础。','1950: Turing proposed a conversational approach to discussing machine intelligence. 1997: Deep Blue demonstrated powerful search and expert knowledge in chess. 2017: Transformer introduced an attention-centered architecture that became foundational to many language models.']),
 '1-3': p(['给猫、狗、汽车、自行车安排二维坐标，用文字写出四个位置及理由。再为“苹果”写两个不同含义的句子，解释为什么需要上下文。','Assign 2D coordinates to cat, dog, car, and bicycle. Write all four positions and your reasoning. Then use bank in two different senses and explain why context is needed.'],['给出四个坐标和分组理由；两个句子中同一词的意思不同；说明二维图只是示意。','Give four coordinates with grouping reasons, two different senses of the same word, and acknowledge that the 2D map is illustrative.'],['猫(1,1)、狗(2,1)、汽车(8,8)、自行车(9,8)。动物放近，交通工具放近；坐标仅为二维示意，不是模型真实向量。“苹果很甜”指水果，“苹果发布手机”指公司，需要周围词来确定含义。','Cat (1,1), dog (2,1), car (8,8), bicycle (9,8). Group animals and vehicles. These are illustrative coordinates, not actual model vectors. “Deposit money at the bank” refers to finance; “sit on the river bank” refers to land beside water. Context disambiguates the word.']),
 '1-4': p(['“小明把书递给小刚，因为他明天要演讲。”先说明“他”是否能唯一确定。把“他”想找的信息写成 Query，列出两个候选 Key 和相关 Value。再补一句明确上下文，比较变化。','“Alex handed Sam the book because he will give a talk tomorrow.” Is he uniquely identified? Describe the Query, two candidate Keys and their Values, then add a sentence that resolves the ambiguity.'],['承认原句有歧义；给两个候选及信息；补充明确条件后再判断。','Identify the ambiguity, give two candidates and their information, and only resolve it after adding a clear condition.'],['Query：谁明天演讲？Key 可以对应小明、小刚；Value 是上下文中两人的相关信息。原句不足以唯一消歧。补充“小刚准备演讲，小明在帮忙找材料”后，更有理由把“他”关联到小刚。这只是理解 Q/K/V 的示意，并非读出模型真实权重。','Query: who is giving the talk? Candidate Keys correspond to Alex and Sam; Values carry their contextual information. The original is ambiguous. Add “Sam is preparing a talk; Alex is helping find material.” Sam is now better supported. This is a Q/K/V teaching analogy, not a measurement of real model weights.']),
 '3-3': p(['用你可用的生图工具，为“校园节水”创作一张插画。先固定主题、模型和尺寸，仅改变一个工具支持的参数，保存两次结果。上传一张对比图或结果截图，写下改变了什么、观察到什么。','Use an image-generation tool available to you to create a school water-conservation illustration. Keep the prompt, model, and dimensions fixed; vary one supported parameter. Save both results. Upload a comparison image or screenshot and describe the change and observation.'],['记录工具、提示词、唯一改动；比较两次结果；上传作品或对比截图。不要输入他人隐私或使用未经许可的素材。','Record the tool, prompt, and one changed setting; compare both outputs and upload the work or a comparison screenshot. Use material you have permission to use and avoid private information.'],['示例记录格式：工具及模型：…；提示词：校园水龙头旁，学生提醒节约用水，插画风；固定条件：尺寸、提示词、模型；改动：Seed A→B（工具支持时）；观察：记录实际构图和细节变化，不能提前保证结果只改细节。若没有 Seed，可仅改变提示词中的一种颜色要求。','Example record: tool/model: …; prompt: an illustrated student encouraging water conservation beside a school tap. Fix dimensions, prompt, and model. Change Seed A→B if available. Record the actual composition and detail changes; do not assume only details will change. If Seed is unavailable, vary just one color instruction instead.'],true),
 '3-4': p(['继续使用昨天的节水插画，在支持编辑图片的工具中只修改一个区域，例如把水龙头旁的杯子换成水壶。列出必须保持的角色、背景和画面风格，保存修改前后版本，上传对比图或结果截图。','Continue with your water-conservation illustration. In a tool that supports image editing, change one region, such as replacing a cup beside the tap with a bottle. List the character, background, and style features to preserve. Save both versions and upload a comparison or result screenshot.'],['明确修改区域和保留项；记录工具实际支持的编辑方式；检查未要求修改的区域；上传结果。','Specify the edited region and preserved features, record the supported editing method, inspect unintended changes, and upload the result.'],['修改区：杯子周围；保留：学生脸、衣服颜色、水龙头位置和插画风；操作：若工具支持蒙版，就只框住杯子；否则用参考图编辑并核对整幅图。比较前后是否改变其他区域，记录实际问题，再尝试缩小范围或写清保留项。','Edit region: around the cup. Preserve the face, clothing color, tap location, and illustration style. Use a local mask if supported; otherwise reference-based editing and inspect the entire output. Record any unintended changes, then try a smaller region or clearer preservation instructions.'],true),
 '3-5': p(['把节水插画发展成一个约 5 秒的短镜头：起始学生走近水龙头，中间伸手，结尾关紧水龙头。用可用的视频生成工具或剪辑工具完成，保持角色与场景一致，上传视频或包含三个时间点的截图，并记录一处连续性检查。','Turn the illustration into an approximately five-second shot: the student approaches the tap, reaches for it, and turns it off. Use a video-generation or editing tool, preserving character and scene consistency. Upload the video or screenshots of three moments and record one continuity check.'],['写清起始、中间、结束动作；检查人物、位置和动作衔接；上传视频或三帧记录。','Describe the beginning, middle, and end; inspect identity, position, and motion continuity; upload the video or a three-frame record.'],['起始：学生在水龙头左边；中间：同一只手接近开关；结束：手转紧开关，水停止。检查衣服颜色、手和开关的位置有没有突然变化。把实际发现的问题记下，必要时缩短动作或重新生成该段。','Beginning: the student stands left of the tap. Middle: the same hand reaches for the handle. End: the hand turns it off and the water stops. Check clothing, hand position, and handle position for sudden changes. Record actual problems and simplify or regenerate the shot if needed.'],true),
 '3-6': p(['为节水作品写一句旁白，例如“离开前拧紧水龙头，让每一滴水都有用”。在配音工具中生成语音，或录制自己的朗读。先听原音，再检查自动字幕；分清发音问题和转写问题。上传音频、视频或配音结果截图，并写下检查记录。','Write a narration line for your water-conservation project, such as “Turn off the tap before leaving—make every drop count.” Generate speech in a tool or record your own voice. Listen to the original first, then compare automatic captions. Upload audio, video, or a result screenshot and write your checks.'],['旁白与主题相关；实际听原音；区分发音与字幕错误；上传结果并记录修改。使用配乐前检查对应使用许可。','Keep the narration relevant, listen to the original, distinguish speech and caption errors, and upload the result with a correction record. Check any music license for your intended use.'],['先对照脚本听音：若音频说对但字幕错，只修字幕；若音频真的读错，再改读音或文本并重生成。若用于 5 秒镜头而旁白太长，删去重复句再试读，不强行加速到难以听清。记录真实试读时长和修改结果。','Listen against the script: if speech is correct and captions are wrong, fix captions. If speech is wrong, adjust pronunciation or text and regenerate. If narration is too long for a five-second shot, remove repetition and test again rather than making it unintelligibly fast. Record actual duration and changes.'],true),
 '3-7': p(['完成一个 15–30 秒的“校园节水”短片，可组合前几天的作品并使用外部剪辑工具。包含清楚的核心信息、连续画面和可听清的旁白。保存至少两次有理由的修改记录。上传成片或能展示成片结果的截图，并写出素材许可和最后检查结果。','Complete a 15–30-second school water-conservation film using earlier work and an external editor. Include one clear message, continuous visuals, and intelligible narration. Record at least two reasoned revisions. Upload the film or screenshots showing the finished result, with the material permissions and final checks.'],['核心信息明确；画面、旁白、字幕协调；至少两次修改及理由；素材许可适用于本次用途；上传作品记录。','One clear message; coherent visuals, narration, and captions; at least two reasoned revisions; permissions covering this use; uploaded work record.'],['记录模板：核心信息：…；实际时长：…；画面/旁白检查：…；修改 1：问题→动作→复查；修改 2：问题→动作→复查；素材来源、许可范围及署名：…；文件：…。例如可以记录修复手部跳动和缩短过长旁白，但应填写自己作品里实际发生的情况。','Record template: message: …; actual duration: …; visual/audio checks: …; revision 1: problem → action → recheck; revision 2: problem → action → recheck; material sources, license scope, and attribution: …; file: …. Fixing a jumping hand or shortening narration are examples—record what actually happened in your own project.'],true),
};

const LAB_FIXES: Record<string, Both> = {
 ...SAFETY_LABS,
 ...PROMPT_LABS,
 ...MEDIA_LABS,
 ...FOUNDATION_LABS,
 '1-1':[{type:'interactive',interactiveKind:'timeline',interactiveTitle:'AI 时间线：探索能力变化'},{type:'interactive',interactiveKind:'timeline',interactiveTitle:'AI timeline: explore changes in capability'}],
 '1-3':[{type:'interactive',interactiveKind:'embedding',interactiveTitle:'语义星图：相关不等于事实相同'},{type:'interactive',interactiveKind:'embedding',interactiveTitle:'Semantic map: related does not mean factually identical'}],
 '1-4':[{type:'interactive',interactiveKind:'attention',interactiveTitle:'注意力：用上下文澄清指代'},{type:'interactive',interactiveKind:'attention',interactiveTitle:'Attention: clarify a reference with context'}],
 '1-5':[{type:'interactive',interactiveKind:'temperature',interactiveTitle:'温度：观察候选分布'},{type:'interactive',interactiveKind:'temperature',interactiveTitle:'Temperature: explore the candidate distribution'}],
 '1-6':[{type:'interactive',interactiveKind:'evidence',interactiveTitle:'证据工具台：任务与核验方式'},{type:'interactive',interactiveKind:'evidence',interactiveTitle:'Evidence workbench: tasks and verification'}],
 '1-7':[{type:'interactive',interactiveKind:'pipeline',interactiveTitle:'把文字生成流程串起来'},{type:'interactive',interactiveKind:'pipeline',interactiveTitle:'Connect the text-generation pipeline'}],
 '1-2': [
  {type:'interactive',interactiveKind:'bpe',interactiveTitle:'BPE 积木工厂：亲手合并高频片段'},
  {type:'interactive',interactiveKind:'bpe',interactiveTitle:'BPE block factory: merge frequent pairs'},
 ],
 '3-2': [0,1].map(lang=>({type:'interactive',interactiveKind:'diagnose',interactiveTitle:lang?'Visual detective':'视觉故障侦探',interactiveInstruction:lang?'These are image-reading reports. Select the three errors; one report describes an appropriate response to uncertainty.':'以下是读图后的记录。选出三项识别错误，另有一项是面对不确定时的合理处理。',interactiveItems:[
  {label:lang?'The image shows 1000; the answer reads 100.':'图上写 1000，回答读成 100。',detail:lang?'The visible text was read incorrectly: an OCR error.':'图片文字读错，属于 OCR 错误。',correct:true},
  {label:lang?'A cup is left of a bottle; the answer puts it on the right.':'杯子在瓶子左边，回答说在右边。',detail:lang?'The spatial relationship is reversed.':'左右关系判断反了，属于空间关系错误。',correct:true},
  {label:lang?'The chart says thousands; the answer treats the values as units.':'图表单位是千，回答把数值当作个。',detail:lang?'The chart unit was missed.':'遗漏单位，属于图表解释错误。',correct:true},
  {label:lang?'The small label is unreadable; the answer asks for a clearer crop.':'小标签看不清，回答请你提供更清晰的裁图。',detail:lang?'Stating uncertainty and requesting evidence is appropriate.':'承认不确定并索要清晰证据，是合理做法。',correct:false},
 ]})) as Both,
 '4-1': [0,1].map(lang=>({type:'interactive',interactiveKind:'compare',interactiveTitle:lang?'Choose a suitable approach':'选择合适的实现方式',interactiveInstruction:lang?'Every day at 18:00, read the same three public price pages and prepare a table. Do not send it. Which approach best fits this fixed task?':'每天 18:00 读取固定三家公开价格页，整理一张表，不发送。哪种方案最适合这个固定任务？',interactiveItems:[
  {label:lang?'Chat: manually paste all three pages and request a table every day.':'Chat：每天手动粘贴三页资料，请它制表。',detail:lang?'It can prepare the table, but still needs manual initiation every day.':'可以制表，但每天还需要人手动发起，不符合定时自动运行的要求。',correct:false},
  {label:lang?'Workflow: schedule the fixed sources, validate data, then prepare a draft table.':'Workflow：定时读取固定来源，检查数据，生成表格草稿。',detail:lang?'A fixed, repeatable sequence fits this task; stop and report missing data.':'固定、可重复的步骤符合任务；来源缺失时停止并提示。',correct:true},
  {label:lang?'Agent: freely choose additional sources and publish the table to a group.':'Agent：自行寻找更多来源，并把表格发到群里。',detail:lang?'It expands both the sources and the permission to send beyond the task.':'扩展了来源与发送权限，超过题目边界。',correct:false},
 ]})) as Both,
};

export function applyCourseFixes(source: Record<number, DayContent[]>, language: 'zh' | 'en'): Record<number, DayContent[]> {
 const lang = language === 'en' ? 1 : 0;
 return Object.fromEntries(Object.entries(source).map(([week, days]) => [week, days.map(day => {
  const key = `${week}-${day.day}`; let assessment = 0, theory = 0;
  const reviewedSteps = key === '2-3' ? SCHEMA_LESSON.map(pair => pair[lang]) : key === '2-2' ? CONTEXT_LESSON.map(pair => pair[lang]) : day.steps;
  const steps = reviewedSteps.map(original => {
   const isQuestion = ['quiz','fill','match','practice'].includes(original.type);
   if (isQuestion) assessment++;
   let step: LessonStep = isQuestion && QUESTION_FIXES[key]?.[assessment] ? { ...QUESTION_FIXES[key][assessment][lang] } : { ...original };
   if (step.type === 'practice' && PRACTICE_FIXES[key]) step = {...PRACTICE_FIXES[key][lang]};
   if (step.type === 'practice' && SAFETY_PRACTICES[key]) step = {...SAFETY_PRACTICES[key][lang]};
   if (step.type === 'practice' && PROMPT_PRACTICES[key]) step = {...PROMPT_PRACTICES[key][lang]};
   if (step.type === 'practice' && FOUNDATION_PRACTICES[key]) step = {...FOUNDATION_PRACTICES[key][lang]};
   if (step.type === 'theory' && (SAFETY_THEORY[key] || PROMPT_THEORY[key] || MEDIA_THEORY[key] || FOUNDATION_THEORY[key] || LEARNING_THEORY[key])) {
    const cards = SAFETY_THEORY[key] || PROMPT_THEORY[key] || MEDIA_THEORY[key] || FOUNDATION_THEORY[key] || LEARNING_THEORY[key];
    step.content = cards[Math.min(theory++, cards.length - 1)][lang];
   }
   if (step.type === 'interactive' && LAB_FIXES[key]) step = {...LAB_FIXES[key][lang]};
   if (step.type === 'interactive' && key === '3-4') step.interactiveItems = step.interactiveItems?.map(item => item.correct === false ? {
    label: lang ? 'The reference image is attached and every editing version is logged.' : '绑定参考图后，仍为每次修改记录版本日志。',
    detail: lang ? 'This is a sound way to compare changes and track unintended drift.' : '这是合理做法，有助于比较改动并定位意外变化。', correct:false,
   } : item);
   if (step.type === 'interactive' && key === '3-7') {
    const items = [...(step.interactiveItems || [])];
    if (items.length && items.every(item => item.correct)) items[items.length - 1] = { label: lang ? 'A deliberate fade closes the film; the message and captions remain clear.' : '短片结尾按设计淡出，核心信息与字幕仍然清楚。', detail: lang ? 'An intentional, readable transition is not automatically a defect.' : '有意设计且不影响理解的转场，不应自动当作故障。', correct:false };
    step.interactiveItems = items;
   }
   if (step.type === 'interactive' && key === '4-7') step.interactiveInstruction = lang ? 'Inspect these test records. Select the problems that should be fixed before release; leave valid controls unselected.' : '检查这些测试记录，选出发布前需要修复的问题，不要选正常的防护措施。';
   if (step.type === 'interactive' && key === '3-1') step.interactiveInstruction = lang ? 'Tap the stages in dependency order. This is a simplified image-encoder model; patch size is usually fixed by the architecture.' : '按依赖顺序点击步骤。这是简化图像编码模型；真实模型的 Patch 大小通常由架构固定。';
   if (step.options?.length && (step.type === 'quiz' || step.type === 'fill')) {
    if (!step.explanation && RETAINED_EXPLANATIONS[key]?.[assessment]) step.explanation = RETAINED_EXPLANATIONS[key][assessment][lang];
    const correct = typeof step.correct === 'number' ? step.options[step.correct] : step.correct;
    let seed = 2166136261;
    for (const c of `${key}:${assessment}`) seed = Math.imul(seed ^ c.charCodeAt(0), 16777619);
    const options = RETAINED_DISTRACTORS[key]?.[assessment]
      ? [correct as string, ...RETAINED_DISTRACTORS[key][assessment].map(option=>option[lang])]
      : [...step.options];
    for (let i = options.length - 1; i > 0; i--) {
     seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
     const j = (seed >>> 0) % (i + 1); [options[i],options[j]] = [options[j],options[i]];
    }
    step = {...step, options, correct: typeof step.correct === 'number' ? options.indexOf(correct as string) : correct};
   }
   if (key === '2-1' && step.type === 'theory' && /^(例如：|Example:)/.test(step.content || '')) {
    step.content += lang ? '\n\nBefore drafting, check that activity details, time, and sign-up information have actually been provided. Ask for missing facts rather than inventing them.' : '\n\n起草前先检查活动资料、时间和报名方式是否已经提供；缺失时先询问，不自行补造事实。';
   }
   // Keep the complete prompt once, in the interactive sentence. Older lessons
   // repeated a near-identical sentence above the blank (and sometimes lost context).
   if (step.type === 'fill' && step.question?.includes('___')) {
    step.parts = step.question.split(/(_{3,})/).filter(Boolean).map(part => /^_{3,}$/.test(part) ? '___' : part);
    step.question = lang ? 'Choose the term that completes the sentence.' : '选择合适的词语，补全句子。';
   }
   return step;
  });
  return {...day,steps};
 })]));
}
