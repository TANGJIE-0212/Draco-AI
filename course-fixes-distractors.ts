import type {Bilingual} from './course-fix-builders';
// Plausible nearby misconceptions for retained introductory questions.
export const RETAINED_DISTRACTORS:Record<string,Record<number,Bilingual[]>>={
 '1-1':{
  1:[['机器在标准算术题上是否比人类更快','Whether a machine outperforms humans in arithmetic speed'],['机器能否准确复述自己接受训练的全部资料','Whether a machine can reproduce all of its training material']],
  3:[['主要用带标签样本自动学习决策边界','Primarily learn decision boundaries automatically from labeled examples'],['主要通过预测下一词元生成判断','Primarily generate judgments by predicting the next token']],
 },
 '1-2':{
  1:[['Token始终等于自然语言中一个完整词','A token always equals one complete natural-language word'],['Token是表示整句话含义的连续向量','A token is a continuous vector representing an entire sentence']],
  2:[['根据当前语境给每个词分配注意力权重','Assign attention weights to words from the current context'],['为下一词元产生归一化后的概率','Produce normalized probabilities for the next token']],
 },
 '1-3':{
  1:[['能，训练会按语义顺序重新排列所有词表编号','Yes; training sorts all vocabulary IDs by meaning'],['能，只要两个Token出现次数相同','Yes, if the two tokens appear equally often']],
  2:[['经过归一化的下一词元概率分布','A normalized next-token probability distribution'],['当前输入中各位置的注意力权重','Attention weights over positions in the current input']],
  5:[['维度增加会自动让每一维对应一个明确概念','Additional dimensions automatically make every dimension an explicit concept'],['只要维度更高，检索出的每条事实就更准确','Higher dimensions alone make every retrieved fact more accurate']],
  7:[['长度不同就会让余弦相似度接近零','Different lengths force cosine similarity near zero'],['较长向量会自动得到更低的余弦相似度','The longer vector automatically yields lower cosine similarity']],
 },
 '1-4':{
  1:[['静态向量已经把当前所有句子的词义分别存好了','A static vector already stores the distinct sense of every current sentence'],['静态向量只能记录词频，不能参与语义计算','Static vectors record frequency only and cannot support semantic computation']],
  2:[['只按Token编号差距分配固定权重','Assign fixed weights based only on token-ID distance'],['把每个位置的信息始终平均相加','Always combine every position with equal weight']],
  5:[['把注意力权重转换回词表中的文字','Convert attention weights back into vocabulary text'],['直接选择下一步要输出的Token编号','Directly select the next token ID to emit']],
 12:[['每个头都重复完全相同的信息处理','Every head repeats exactly the same processing'],['每个头都等同于一个已验证的事实来源','Each head is equivalent to a verified factual source']],
 },
 '1-5':{
  1:[['已归一化且总和为1的候选概率','Normalized candidate probabilities summing to one'],['输入词元在词表中的原始编号','Input-token vocabulary IDs']],
  4:[['较低分候选概率上升，分布更分散','Lower-ranked candidates gain probability, flattening the distribution'],['候选数量被固定为温度数值','The candidate count is fixed to the temperature value']],
  7:[['按当前概率分布抽样，允许低概率候选','Sample from the distribution, allowing lower-probability candidates'],['每一步选择概率最高的三个词并同时输出','Emit the three highest-probability tokens together each step']],
 },
 '1-7':{
  1:[['先对文字直接做Softmax，再映射成词元','Apply Softmax directly to text before mapping tokens'],['先按回答的采样温度改变训练词表','Change the training vocabulary using response temperature first']],
  2:[['把相邻编号直接当作语义相似度','Interpret adjacent IDs directly as semantic similarity'],['把Token ID当作已经归一化的输出概率','Treat token IDs as already normalized output probabilities']],
  3:[['只根据词表编号固定选择前一个Token','Select the preceding token using vocabulary IDs alone'],['把每个上下文位置都当作同等可信的事实','Treat all context positions as equally trustworthy facts']],
  8:[['同一词表中的Token编号必然互相覆盖','Token IDs in one vocabulary necessarily overwrite each other'],['提高温度会自动恢复已经丢失的输入','Increasing temperature automatically restores lost input']],
 11:[['能，重复结果相当于两个独立事实来源','Yes; repeated outputs count as independent factual sources'],['能，只要两次使用相同模型和低温','Yes, if both use the same model and low temperature']],
 13:[['文本→Token→Attention→Embedding→Sampling→Logits','Text → Token → Attention → Embedding → Sampling → Logits'],['文本→Embedding→Tokenizer→Softmax→Attention→Sampling','Text → Embedding → Tokenizer → Softmax → Attention → Sampling']],
 14:[['重复生成多次后只保留措辞最肯定的答案','Generate repeatedly and retain the most confident wording'],['降低温度并把答案写长，但不核对来源','Lower temperature and lengthen the answer without checking sources']],
 },
 '2-1':{
 13:[['只补充热情语气，不交代主题和听众','Add a warm tone without specifying topic or audience'],['只要求内容丰富，把时长和结构留给模型决定','Ask for rich content while leaving duration and structure to the model']],
 },
 '2-6':{
  7:[['编号列表本身会阻止模型理解指令','Numbered lists themselves prevent instruction understanding'],['只要新规则都合理，就必然能判断每条的独立作用','If each rule is reasonable, its independent effect is automatically identifiable']],
 },
 '2-7':{
  1:[['把今天某题的最终答案作为所有对话默认答案','Use today’s final answer as the default in every conversation'],['每轮按照学生最新请求重写所有帮助边界','Rewrite all assistance boundaries from the latest student request each turn']],
  4:[['直接给完整可提交答案，再附一句学习建议','Provide a submission-ready answer followed by a study suggestion'],['只拒绝任何帮助，不了解学生的卡点','Refuse all help without asking about the sticking point']],
 12:[['只代答最难的两题，其他让学生自己做','Answer only the hardest two questions on the learner’s behalf'],['换个表述给出当前题目的完整答案','Rephrase the complete answer to the active question']],
 },
};
