import { DayContent } from '../../../types';

export const v3enw2d5Data: DayContent = {
  day: 5,
  title: 'Dragon Spell: External Planning vs Reasoning Models and Intermediate Outputs',
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: 'Today\'s principle is the scratch-paper rule. For complex tasks, standard models often need explicit external planning, while reasoning models do more planning internally. In both cases, ask for verifiable intermediate outputs, not just a final conclusion.'
    },
    {
      type: 'video',
      url: '',
      content: 'Video coming next: control one science-club script using four output knobs.'
    },
    {
      type: 'theory',
      content: 'Useful intermediate outputs include a fact-extraction table, a contradiction checklist, and a step-by-step review sheet. These let you verify progress instead of trusting "I already thought it through."'
    },
    {
      type: 'theory',
      content: 'Boundary reminder: do not ask for hidden chain-of-thought. Ask only for shareable, auditable intermediate evidence and a final artifact.'
    },
    {
      type: 'quiz',
      question: '1. "Explain terms to a Grade 5 student" mainly controls what?',
      options: ['That sources must come only from Grade 5 textbooks', 'Vocabulary difficulty and audience fit', 'That each paragraph must contain five sentences'],
      correct: 1
    },
    {
      type: 'fill',
      question: '2. For a one-minute speech script, "must be under 120 words" controls output ___.',
      parts: ['This controls output', '___', '.'],
      options: ['length', 'context', 'role'],
      correct: 'length'
    },
    {
      type: 'match',
      question: '3. Match each control with an example:',
      pairs: [
        { left: 'Length', right: '80-100 words' },
        { left: 'Structure', right: 'Title plus 3 bullet points' },
        { left: 'Audience', right: 'For new students in their first week' },
        { left: 'Forbidden action', right: 'Do not reveal the story ending' }
      ]
    },
    {
      type: 'quiz',
      question: '4. Which recruiting-copy requirement is easiest to verify after generation?',
      options: ['Make it sound high-level', 'Use nicer words', 'Give 3 suggestions, each within 20 words'],
      correct: 2
    },
    {
      type: 'quiz',
      question: '5. A teacher wants to scan claim and evidence quickly. Which output request is best?',
      options: ['First give one claim sentence, then list two evidence points with sources', 'Write one free-flowing long paragraph with no order constraints', 'Give only two evidence points and let readers infer the claim'],
      correct: 0
    },
    {
      type: 'match',
      question: '6. Match scenario to a suitable constraint:',
      pairs: [
        { left: 'One-minute classroom share', right: 'Within 90 words, three-part structure' },
        { left: 'Science explainer for younger students', right: 'Fewer technical terms and one daily-life analogy' },
        { left: 'Story relay opening', right: 'Do not write the final ending for others' },
        { left: 'Research summary', right: 'Do not present guesses as facts' }
      ]
    },
    {
      type: 'quiz',
      question: '7. Why add explicit forbidden actions to a book-review helper prompt?',
      options: ['To specify content or behaviors you do not want', 'To force longer titles', 'To replace goal, audience, and output format'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '8. A family notice should avoid internet slang. Which constraint is clearest?',
      options: ['Use clear, formal but natural language; avoid internet slang and abbreviations', 'Make it sound advanced so everyone likes it', 'Be as fun as possible and use any trendy expression'],
      correct: 0
    },
    {
      type: 'match',
      question: '9. Rewrite vague requests into checkable ones:',
      pairs: [
        { left: 'Make it shorter', right: 'Keep it within 4 sentences' },
        { left: 'Make it easier to understand', right: 'Explain for Grade 6 and define terms' },
        { left: 'Make it organized', right: 'Use problem -> method -> reminder order' },
        { left: 'Do not invent facts', right: 'Mark unknown details as "to verify"' }
      ]
    },
    {
      type: 'quiz',
      question: '10. For club-poster title generation, which constraint is directly usable?',
      options: ['Make titles somewhat attractive', 'Generate 5 titles, each under 12 words, and avoid exaggerated promises', 'Longer titles always explain events better'],
      correct: 1
    },
    {
      type: 'fill',
      question: '11. Adapting vocabulary for different age groups is mainly controlling the ___.',
      parts: ['This mainly controls the', '___', '.'],
      options: ['audience', 'structure', 'source scope'],
      correct: 'audience'
    },
    {
      type: 'quiz',
      question: '12. To quickly compare two extracurricular activities in class, which output format is best?',
      options: ['A table with similarities and differences', 'One long unbroken paragraph', 'Only activity names with no comparison dimensions'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '13. Why is JSON not the core format for every task in this lesson?',
      options: ['JSON can store only English, not Chinese', 'JSON automatically checks factual correctness', 'JSON is machine-friendly, but everyday communication often needs lists, paragraphs, or tables'],
      correct: 2
    },
    {
      type: 'fill',
      question: '14. "Do not spoil the ending" helps protect the story\'s ___.',
      parts: ['It helps protect the story\'s', '___', '.'],
      options: ['reading experience', 'narrative person', 'paragraph structure'],
      correct: 'reading experience'
    },
    {
      type: 'match',
      question: '15. Match each output-control check item:',
      pairs: [
        { left: 'How much content', right: 'Length' },
        { left: 'How to arrange it', right: 'Structure' },
        { left: 'Who it is for', right: 'Audience' },
        { left: 'What must not happen', right: 'Forbidden actions' }
      ]
    },
    {
      type: 'theory',
      content: 'Dragon Ability Card: the four output knobs.\n\nBefore sending your spell, tune four knobs: length, structure, audience, and forbidden actions. JSON Schema is still useful for app-building tasks, but first make human-readable output right.'
    }
  ]
};
