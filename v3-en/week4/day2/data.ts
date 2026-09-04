import type { DayContent } from '../../../types';

export const v3enw4d2Data: DayContent = {
  day: 2,
  title: 'Summon Clone Skills: Goal / Plan / Task / State / Done',
  shards: 30,
  steps: [
    {
      type: 'theory',
      content:
        'Stateful Task Scroll\n\nUse a five-part structure today: Goal, Plan, Task, State, Done. The core model stays the same: Goal -> Plan -> Tool -> Act -> Check -> Update or Stop.',
    },
    {
      type: 'video',
      url: '',
      content: 'Video: concept walkthrough and safe-operation demo',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Six-Slot Task Scroll\nWrite down: final deliverable, target audience, scope and format, allowed sources, forbidden actions, and stop condition. Example: create a five-book sci-fi list for a grade-7 reading club, include verifiable library sources, draft only.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Break Big Work into Small Steps\n"Run a reading event" can be decomposed into: confirm theme -> check approved sources -> choose books -> validate age suitability and citations -> create draft. Each step should produce a checkable output.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Stop Conditions Are Brakes\nGood examples: stop after three reliable sources, retry at most two times, stop after draft and wait for approval. Before contacting others, publishing, or processing personal data, stop first.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Privacy Boundaries in Tasks\nDo not include sensitive data such as addresses, phone numbers, or account credentials. Never let an agent auto-pay, auto-send, auto-delete, or auto-publish; those are human decisions.',
    },
    {
      type: 'quiz',
      question: '1. Which task scroll gives an agent the clearest execution path?',
      options: [
        'Make a list for grade 7 and let the agent decide the details.',
        'Find five sci-fi books; source links can be added later.',
        'Draft a five-book sci-fi list for grade 7, each with a library or publisher source, output draft only.',
        'Collect as many sci-fi books as possible and send to club members directly.',
      ],
      correct: 2,
    },
    {
      type: 'quiz',
      question: '2. "Confirm theme, then check catalog, then validate age fit" mainly belongs to which stage?',
      options: [
        'Plan: arranging checkable steps',
        'Act: directly generating the final product',
        'Tool: granting broader permissions',
        'Stop: refusing all tasks',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '3. For a public club poster, which stop condition is safest?',
      options: [
        'After exploring three design styles, auto-publish the style predicted to win votes.',
        'Stop at a reviewable draft and wait for owner approval before publish.',
        'Keep revising until the agent believes there are no flaws, then auto-upload.',
        'Collect more preferences and let the agent choose audience and schedule.',
      ],
      correct: 1,
    },
    {
      type: 'quiz',
      question: '4. Which decomposition best helps you catch errors early?',
      options: [
        'List candidates -> generate full list -> let readers find problems.',
        'Search, write, and publish at the same time.',
        'Sort search results and estimate age fit from short summaries.',
        'Define audience -> check approved catalogs -> validate source and age fit -> draft.',
      ],
      correct: 3,
    },
    {
      type: 'quiz',
      question: '5. The agent fails twice to find reliable publisher info for one title. What should happen?',
      options: [
        'Fill the gap with data from a similar book.',
        'Mark the missing evidence, stop, and ask a human for new sources or replacement.',
        'Expand search to private accounts and personal chats.',
        'Keep retrying until the answer looks believable.',
      ],
      correct: 1,
    },
    {
      type: 'quiz',
      question: '6. Which input is not appropriate for a teen-safe task scroll?',
      options: [
        'Target grade and expected length',
        'Approved library catalogs',
        'Participants home addresses and contact details',
        'Rule to stop after draft for review',
      ],
      correct: 2,
    },
    {
      type: 'fill',
      question: '7. The slot that defines what final artifact to submit is ___.',
      parts: ['Fill:', '___', '.'],
      options: ['deliverable definition', 'tool checklist', 'retry record'],
      correct: 'deliverable definition',
    },
    {
      type: 'fill',
      question: '8. Turning a broad mission into checkable mini-steps is task ___.',
      parts: ['Fill:', '___', '.'],
      options: ['decomposition', 'authorization', 'archiving'],
      correct: 'decomposition',
    },
    {
      type: 'fill',
      question: '9. "Report after two failed lookups" is a ___ condition.',
      parts: ['Fill:', '___', '.'],
      options: ['stop', 'trigger', 'publish'],
      correct: 'stop',
    },
    {
      type: 'quiz',
      question: '10. A task says "auto-send after draft." What is the key fix?',
      options: [
        'Change to: stop at draft and let a human decide whether to send.',
        'Keep auto-send but delay by ten minutes.',
        'Let the agent judge safety by itself.',
      ],
      correct: 0,
    },
    {
      type: 'practice',
      task: '11. Fix this task scroll: rewrite "find some good books and send them" so it includes audience, quantity, allowed sources, output format, acceptance checks, and stop condition.',
      rubric:
        'Answer should clearly include audience, quantity, allowed sources, draft format, checkable criteria, and a stop-before-send rule. No auto-send and no fabricated source data.',
      placeholder: 'For...; quantity...; use only...; output...; checks...; when done...',
      minLength: 55,
      referenceAnswer:
        'For a grade-7 reading club, pick five sci-fi books from the school library catalog. Include author, summary, and source for each. Output a reviewable table. Check quantity, source validity, and age fit. Stop at draft and do not send.',
    },
    {
      type: 'match',
      question: '12. Match each task-scroll field to its function:',
      pairs: [
        {
          left: '"Grade 7, five books, 150 words"',
          right: 'Sets audience, scope, and format limits',
        },
        {
          left: '"Use school library catalog only"',
          right: 'Limits allowed sources',
        },
        {
          left: '"Each book must include a source"',
          right: 'Defines a checkable quality standard',
        },
        {
          left: '"Stop after draft and wait for review"',
          right: 'Creates a stop and confirmation gate',
        },
      ],
    },
    {
      type: 'match',
      question: '13. Match each symptom to the better decomposition fix:',
      pairs: [
        {
          left: 'Search starts before the theme is decided',
          right: 'Confirm theme and audience first',
        },
        {
          left: 'Many candidates but incomplete citations',
          right: 'Add a dedicated citation-check step',
        },
        {
          left: 'Writing is polished but not age-appropriate',
          right: 'Add explicit age-suitability checks',
        },
        {
          left: 'Evidence is missing but output continues',
          right: 'Set a stop condition for evidence gaps',
        },
      ],
    },
    {
      type: 'match',
      question: '14. Match each request to the safer response:',
      pairs: [
        {
          left: '"Send the draft to everyone now"',
          right: 'Stop at draft and let the owner decide',
        },
        {
          left: '"Store student phone numbers for convenience"',
          right: 'Reject unrelated personal-data collection',
        },
        {
          left: '"If source is missing, still fill all five books"',
          right: 'Mark gaps or replace candidates',
        },
        {
          left: '"Keep trying until success"',
          right: 'Retry within limit, then stop',
        },
      ],
    },
    {
      type: 'match',
      question: '15. Match each loop stage to the guiding question:',
      pairs: [
        {
          left: 'Goal',
          right: 'Who is this for, and what is the deliverable?',
        },
        {
          left: 'Plan',
          right: 'What order should steps follow?',
        },
        {
          left: 'Tool',
          right: 'Which sources and functions are allowed?',
        },
        {
          left: 'Check',
          right: 'Does output pass acceptance criteria?',
        },
      ],
    },
    {
      type: 'theory',
      content:
        'Wrap-up\nKeep this loop in mind: Goal -> Plan -> Tool -> Act -> Check -> Update or Stop. Payment, sending, deletion, and publishing always require human confirmation.',
    },
  ],
};
