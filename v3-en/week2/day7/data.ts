import { DayContent } from '../../../types';

export const v3enw2d7Data: DayContent = {
  day: 7,
  title: 'Dragon Spell Boss: Seven-part Prompt System',
  shards: 1,
  isBoss: true,
  steps: [
    {
      type: 'theory',
      content: 'Final move: assemble a seven-part Prompt System with System, User, Context, Examples, Constraints, Evaluation, and Stop Conditions. The goal is reusable, testable, and regression-friendly prompts.'
    },
    {
      type: 'video',
      url: '',
      content: 'Video coming next: assemble this week\'s components into a bounded personalized learning companion.'
    },
    {
      type: 'theory',
      content: 'Module roles: System holds long-term safety rules; User holds this-turn task; Context holds reference data; Examples holds a few high-quality demos; Constraints holds hard boundaries; Evaluation holds rubric and test suite; Stop Conditions define when to stop and ask for help.'
    },
    {
      type: 'theory',
      content: 'Critical boundaries: do not ghostwrite homework, quizzes, or competitions; do not fabricate sources; do not spread personal data; and mark uncertain knowledge as needing verification. A good companion asks "How far have you tried?" and offers hints or parallel practice instead of submitting finished work.'
    },
    {
      type: 'quiz',
      question: '1. When writing a System Prompt for a personalized learning companion, what belongs in long-term rules?',
      options: ['A full answer to one homework question', 'The learner\'s real legal name', 'The AI\'s identity, boundaries, and help style'],
      correct: 2
    },
    {
      type: 'fill',
      question: '2. A responsible learning companion should learn the student\'s grade, interests, and ___ first, not ask for private data.',
      parts: ['It should also learn the student\'s', '___', '.'],
      options: ['goal', 'homework page count', 'response format'],
      correct: 'goal'
    },
    {
      type: 'match',
      question: '3. Match each companion section:',
      pairs: [
        { left: '## Identity', right: 'State it is a patient learning companion' },
        { left: '## Learn About the Student', right: 'Grade level, interests, current goal' },
        { left: '## Help Style', right: 'Ask first, then provide layered hints' },
        { left: '## Boundaries', right: 'No ghostwriting for homework or quizzes' }
      ]
    },
    {
      type: 'quiz',
      question: '4. A student says "just finish this homework for me." What is the best response?',
      options: ['Ask what they have tried so far, then offer hints or a parallel example', 'Directly submit a complete answer ready to turn in', 'Require personal profile data before helping'],
      correct: 0
    },
    {
      type: 'fill',
      question: '5. A learning companion must not complete submit-ready homework for students. This is a ___.',
      parts: ['This is a', '___', '.'],
      options: ['boundary', 'context', 'heading'],
      correct: 'boundary'
    },
    {
      type: 'match',
      question: '6. Match learner needs with companion behavior:',
      pairs: [
        { left: 'Cannot understand a concept', right: 'Explain with age-appropriate analogy' },
        { left: 'Stuck in the middle of a question', right: 'Give the next hint, not the full answer' },
        { left: 'Preparing a class presentation', right: 'Help draft the outline, let student fill details' },
        { left: 'Uncertain source quality', right: 'Recommend source verification' }
      ]
    },
    {
      type: 'quiz',
      question: '7. Why include "do not fabricate sources" in companion rules?',
      options: ['To ban all examples', 'To force the companion to answer only "I don\'t know"', 'To prevent guesses from being treated as reliable knowledge'],
      correct: 2
    },
    {
      type: 'quiz',
      question: '8. A student is stuck on one exercise. Which reply best supports real learning?',
      options: ['Ask what they have tried, give one next-step hint, then wait for their attempt', 'Provide a complete answer and ask them to copy it', 'Switch to an easier question and skip the original one'],
      correct: 0
    },
    {
      type: 'match',
      question: '9. How should personalization info be used?',
      pairs: [
        { left: 'Likes astronomy', right: 'Use sky-related analogies when useful' },
        { left: 'Grade 7', right: 'Control terminology difficulty' },
        { left: 'Goal is class presentation', right: 'Support speech-outline building' },
        { left: 'Information student does not want to share', right: 'Do not press, store, or spread it' }
      ]
    },
    {
      type: 'quiz',
      question: '10. Which help-style rule best builds self-learning ability?',
      options: ['Always give the standard answer first, then explain', 'Ask for known conditions and prior attempts first, then give one next-step hint', 'Immediately replace difficult questions with easier ones'],
      correct: 1
    },
    {
      type: 'fill',
      question: '11. For complex questions, the companion can loop as: problem -> hint -> student attempt -> ___.',
      parts: ['After the student attempt, provide', '___', '.'],
      options: ['feedback', 'final answer', 'new assignment'],
      correct: 'feedback'
    },
    {
      type: 'quiz',
      question: '12. During a live quiz, what is the best behavior for the companion?',
      options: ['Refuse direct answering and teach a general method or offer post-quiz parallel practice', 'Answer only the two hardest items', 'Ask student to upload classmates\' answers as reference'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '13. What can you define in the companion\'s response format?',
      options: ['Must use advanced terminology to sound professional', 'Start with one encouragement sentence, then provide at most three hints', 'Never ask what the student already tried'],
      correct: 1
    },
    {
      type: 'quiz',
      question: '14. How should the rule "do not complete submit-ready homework" be written for reliability?',
      options: ['State it explicitly as a long-term boundary and explain hint-based alternatives', 'Mention it casually at the end of one example', 'Decide case by case only when students request answers'],
      correct: 0
    },
    {
      type: 'match',
      question: '15. Boss ability card: four companion commitments:',
      pairs: [
        { left: 'Personalized support', right: 'Adjust by grade, interests, and goals' },
        { left: 'Guide before giving help', right: 'Hints first, no direct submission-ready answers' },
        { left: 'Honest and reliable', right: 'State uncertainty and suggest verification' },
        { left: 'Strong boundaries', right: 'No ghostwriting, no privacy overreach' }
      ]
    },
    {
      type: 'theory',
      content: 'Dragon Ability Card: Personalized Learning Companion System Prompt.\n\nYour final package should include clear identity, learner understanding, layered support, stable response format, and firm boundaries. The best companion does not fly for you. It helps you grow your own wings.'
    }
  ]
};
