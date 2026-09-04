import { DayContent } from '../../../types';

export const v3enw2d4Data: DayContent = {
  day: 4,
  title: 'Dragon Spell: Zero/One/Few-shot and Boundary Examples',
  shards: 1,
  steps: [
    {
      type: 'theory',
      content: 'Today\'s key is setting boundaries with examples. Zero-shot, one-shot, and few-shot are not just about quantity. Use positive examples, counterexamples, and boundary cases to show what to do and what not to do.'
    },
    {
      type: 'video',
      url: '',
      content: 'Video coming next: upgrade "help me do research" into a spell with plan, evidence, and checkpoints.'
    },
    {
      type: 'theory',
      content: 'A minimal strong sample set: one standard positive example, one common-error counterexample, and one boundary case with ambiguity, missing info, or conflicting inputs. This is usually stronger than ten near-duplicate positives.'
    },
    {
      type: 'theory',
      content: 'Counterexamples should state exactly why they fail, such as guessing as fact or overstepping authority. Boundary cases should cover limits like strict length caps, missing evidence, or term ambiguity.'
    },
    {
      type: 'quiz',
      question: '1. When designing checkable steps for a campus plant survey, what is the biggest value?',
      options: ['It makes the report longer', 'It lets AI write final conclusions without checking sources', 'It allows people to verify whether plan, evidence, and conclusions align'],
      correct: 2
    },
    {
      type: 'fill',
      question: '2. For a complex task like "survey campus plants," you can first ask AI to list 3-5 ___ steps.',
      parts: ['You can first ask for a 3-5 step', '___', '.'],
      options: ['plan', 'conclusion', 'format'],
      correct: 'plan'
    },
    {
      type: 'match',
      question: '3. Match each research workflow item:',
      pairs: [
        { left: 'Define the question scope first', right: 'Prevents the research from drifting' },
        { left: 'List source locations', right: 'Makes evidence traceable' },
        { left: 'Produce outputs step by step', right: 'Supports item-by-item checking' },
        { left: 'Mark uncertainties clearly', right: 'Avoids treating guesses as facts' }
      ]
    },
    {
      type: 'quiz',
      question: '4. While planning a used-item exchange event, which requirement is useful and appropriate?',
      options: ['Give a shareable three-step plan with one reason for each step', 'Expose all hidden internal thinking', 'Provide only the final answer with no rationale'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '5. AI says a tree is likely camphor but gives only the name. What should be added to make it verifiable?',
      options: ['Leaf features, observation records, and reference locations', 'More descriptive praise about how pretty the tree is', 'A stronger, more confident title'],
      correct: 0
    },
    {
      type: 'match',
      question: '6. Order the campus plant survey process:',
      pairs: [
        { left: 'Step 1', right: 'Define observation locations and the question' },
        { left: 'Step 2', right: 'Record visible traits and dates' },
        { left: 'Step 3', right: 'Do preliminary classification using references' },
        { left: 'Step 4', right: 'Check missing information and write conclusions' }
      ]
    },
    {
      type: 'quiz',
      question: '7. If observation data is insufficient to name a plant, AI should:',
      options: ['Choose the closest picture and decide immediately', 'Mark uncertainty and explain what extra data is needed', 'Delete all observation records and keep only a conclusion'],
      correct: 1
    },
    {
      type: 'fill',
      question: '8. If each step answers "what evidence was used" and "what result was produced," it becomes easier to ___.',
      parts: ['Then it becomes easier to', '___', '.'],
      options: ['review', 'compare', 'summarize'],
      correct: 'review'
    },
    {
      type: 'match',
      question: '9. Match each symptom to an improvement:',
      pairs: [
        { left: 'Conclusion feels like a guess', right: 'Require explicit supporting evidence' },
        { left: 'Task is too large to start', right: 'Break it into small steps first' },
        { left: 'Missing requirements found only at the end', right: 'Add a final checklist checkpoint' },
        { left: 'Highly confident output with incomplete data', right: 'Mark uncertainty explicitly' }
      ]
    },
    {
      type: 'quiz',
      question: '10. For a club swap-event plan, which step is most checkable?',
      options: ['Think of a plan everyone will probably like', 'Ask everyone to trust the organizer for details', 'List venue, time, materials, and owner with item-by-item confirmation'],
      correct: 2
    },
    {
      type: 'quiz',
      question: '11. After a survey plan is drafted, how do you detect if "cite a source for each plant" was missed?',
      options: ['Compare final output against original requirements item by item', 'Check only if the writing sounds smooth', 'Check which paragraph is longest'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '12. Which is the best evidence basis for a campus plant-survey conclusion?',
      options: ['Dated observation notes plus checkable plant references', 'Classmates\' guesses without source records', 'Traits added later just to complete a table'],
      correct: 0
    },
    {
      type: 'quiz',
      question: '13. Which line best belongs in a campus plant-research spell?',
      options: ['Give conclusions first, no need to show sources', 'After each key judgment, add one sentence of evidence; if data is insufficient, state that clearly', 'List only your most confident conclusions and hide uncertainty'],
      correct: 1
    },
    {
      type: 'fill',
      question: '14. "Check once after each completed step" is setting a ___.',
      parts: ['This is setting a', '___', '.'],
      options: ['checkpoint', 'format', 'background detail'],
      correct: 'checkpoint'
    },
    {
      type: 'match',
      question: '15. Match the planning-spell components:',
      pairs: [
        { left: 'What to do first', right: 'Step' },
        { left: 'Why to do it this way', right: 'Evidence basis' },
        { left: 'Whether constraints are met', right: 'Check' },
        { left: 'What remains uncertain', right: 'Uncertainty note' }
      ]
    },
    {
      type: 'theory',
      content: 'Dragon Ability Card: checkable plan.\n\nYour new component set is plan -> steps -> evidence -> checks -> uncertainty notes. Ask for verifiable intermediate outputs, not hidden reasoning traces. You are the final reviewer.'
    }
  ]
};
