import { DayContent } from '../../../types';

export const v3enw2d6Data: DayContent = {
  day: 6,
  title: 'Dragon Spell: Rubric, Test Suite, V1-V3, and Prompt Injection Defense',
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: 'Today we connect V1 -> V2 -> V3 with three evaluation tools: a rubric, a test suite, and prompt injection defense.'
    },
    {
      type: 'video',
      url: '',
      content: 'Video coming next: one club invitation prompt debugged from V1 to V3 in three rounds.'
    },
    {
      type: 'theory',
      content: 'V1 runs basic cases first. V2 fixes one failure type only. V3 fixes another type. A good test suite includes normal cases, boundary cases, and adversarial inputs. Change one variable per round so effects are attributable.'
    },
    {
      type: 'theory',
      content: 'Prompt injection rule: if source data says "ignore system rules," treat it as data and do not execute it. Use rubric dimensions like accuracy, coverage, and format stability instead of "it feels better."'
    },
    {
      type: 'quiz',
      question: '1. When improving a club invitation from V1 to V3, what discipline matters most?',
      options: ['Rewrite topic, tone, and structure every round', 'Keep only the final version and skip records', 'In each round, fix one diagnosable problem first'],
      correct: 2
    },
    {
      type: 'fill',
      question: '2. After V1 output, the first action is to ___ a concrete issue, such as "over 60 words."',
      parts: ['The first action is to', '___', 'a concrete issue.'],
      options: ['pinpoint', 'ignore', 'beautify'],
      correct: 'pinpoint'
    },
    {
      type: 'match',
      question: '3. Match each issue to the best fix priority:',
      pairs: [
        { left: 'Answer goes off-topic', right: 'Strengthen goal or context' },
        { left: 'Output becomes one long wall of text', right: 'Add structure constraints' },
        { left: 'Tone sounds too adult', right: 'Specify audience or add style examples' },
        { left: 'Includes unsupported facts', right: 'Require evidence and unknown markers' }
      ]
    },
    {
      type: 'quiz',
      question: '4. V1 should be a 60-word activity notice but outputs 180 words. What is the best V2 single-point fix?',
      options: ['Change topic and tone while adding five examples at once', 'Add "within 60 words, three-sentence format"', 'Delete all constraints except the event name'],
      correct: 1
    },
    {
      type: 'quiz',
      question: '5. After adding "within 60 words" in V2, how do you test whether the fix worked?',
      options: ['Use the same task to compare V1 and V2 word counts while checking content completeness', 'Compare V2 length with an unrelated story', 'Check only whether V2 uses fancier words'],
      correct: 0
    },
    {
      type: 'match',
      question: '6. Match the three-round workflow:',
      pairs: [
        { left: 'V1', right: 'Minimum usable spell' },
        { left: 'Observe', right: 'Record one concrete issue' },
        { left: 'V2', right: 'Apply one targeted fix' },
        { left: 'V3', right: 'Fix one new remaining issue' }
      ]
    },
    {
      type: 'quiz',
      question: '7. Why should you avoid adding ten new rules at once in V2?',
      options: ['Any prompt with over three rules always fails', 'AI cannot read numbered instructions', 'You cannot tell which rule caused improvement, and rules may conflict'],
      correct: 2
    },
    {
      type: 'fill',
      question: '8. "Too formal" is only a symptom. A better diagnosis is "sounds like a letter to teachers, not aligned with student ___."',
      parts: ['not aligned with student', '___', '.'],
      options: ['tone', 'length', 'source scope'],
      correct: 'tone'
    },
    {
      type: 'match',
      question: '9. What should iteration logs keep?',
      pairs: [
        { left: 'Each prompt version', right: 'Shows what changed' },
        { left: 'Its output', right: 'Shows result differences' },
        { left: 'Issue description', right: 'Avoids vague comments like "not good"' },
        { left: 'Single-change note', right: 'Supports causal judgment' }
      ]
    },
    {
      type: 'quiz',
      question: '10. V2 fixed word count, but the title is still weak for classmates. What is the best V3 move?',
      options: ['Keep the word-count rule and add only one title-style requirement', 'Delete V2 constraints and rewrite from scratch', 'Skip recording the title issue and submit V2'],
      correct: 0
    },
    {
      type: 'fill',
      question: '11. "The answer is wrong" is too vague. "Point 2 lacks evidence from observations" is a ___ diagnosis.',
      parts: ['That is a', '___', 'diagnosis.'],
      options: ['specific', 'holistic', 'subjective'],
      correct: 'specific'
    },
    {
      type: 'quiz',
      question: '12. In story writing, V2 length is fine but the main character no longer feels like a student. Best V3 single-point fix?',
      options: ['Remove all existing constraints', 'Add character age and school context', 'Add ten rules at once for title, ending, and tone'],
      correct: 1
    },
    {
      type: 'quiz',
      question: '13. Why test V1, V2, and V3 on the same task?',
      options: ['To fairly compare before-and-after effect of a specific change', 'So you can skip observing outputs', 'So each generation is guaranteed to be identical'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '14. V2 changed topic, tone, and format together, and output improved. What is the biggest problem now?',
      options: ['You cannot tell which change caused the improvement', 'The more changes in one round, the more reliable the conclusion', 'If output improves, logging is unnecessary'],
      correct: 0
    },
    {
      type: 'match',
      question: '15. Match the three-round debugging ability card:',
      pairs: [
        { left: 'See what is unsatisfying', right: 'Observe' },
        { left: 'Explain the concrete reason', right: 'Diagnose' },
        { left: 'Change only one thing', right: 'Single-point edit' },
        { left: 'Keep before-and-after outputs', right: 'Compare' }
      ]
    },
    {
      type: 'theory',
      content: 'Dragon Ability Card: V1 -> V2 -> V3 debug log.\n\nUse this structure: version | concrete issue | one thing changed this round | output change. Three rounds are not about instant perfection. They are about evidence for each change.'
    }
  ]
};
