import type { DayContent } from '../../../types';

export const v3enw4d3Data: DayContent = {
  day: 3,
  title: 'Summon Clone Skills: Function Calling and Tool Schema',
  shards: 30,
  steps: [
    {
      type: 'theory',
      content:
        'Function Calling and Tool Contracts\n\nToday focuses on Function Calling, Tool Schema, parameter validation, structured returns, and handling permission failures. Tool calls are not guesses; they must follow contracts.',
    },
    { type: 'video', url: '', content: 'Video: concept walkthrough and safe-operation demo' },
    {
      type: 'theory',
      content:
        'Theory Card: Schema First\nBefore calling a tool, check required fields, value types, and allowed enum values. If parameters are missing or invalid, return a recoverable error instead of guessing.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Reliable Sources\nPrioritize traceable public sources from libraries, museums, schools, and research institutions. Random reposts, unsourced short-video comments, and private screenshots are not reliable evidence.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Least Privilege\nRead-only beats edit access; one folder beats full-device scope; temporary beats permanent. Having view access does not mean you can copy or publish content.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Small Pilot Before Full Run\nTest on a small public sample first: are citations correct, are permission requests relevant, and does the agent stop at safety gates? Pass the pilot before full output.',
    },
    {
      type: 'quiz',
      question: '1. Which tool set best follows least privilege for writing a campus plant card?',
      options: [
        'Enable edit and delete permissions first for convenience.',
        'Allow contacts, exact location, and payment tools.',
        'Open all websites to avoid missing information.',
        'Use approved plant references, public institution pages, and text editing only.',
      ],
      correct: 3,
    },
    {
      type: 'quiz',
      question: '2. For a meteor-shower reminder, which source should be prioritized?',
      options: [
        'Highly shared social posts',
        'A personal blog with no cited source',
        'A dated public page from an astronomy institution',
        'Unsourced short-video commentary',
      ],
      correct: 2,
    },
    {
      type: 'quiz',
      question: '3. "Read event folder only; no edits" demonstrates what principle?',
      options: [
        'Least privilege with task-limited read scope',
        'Temporary full authorization',
        'Permanent memory retention',
        'Automatic execution optimization',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '4. While organizing a book list, the agent requests contact access. Best response?',
      options: [
        'Allow read-only contacts just in case.',
        'Reject because contacts are unrelated to this task.',
        'Allow access but ask not to save names.',
        'Grant full-device access instead.',
      ],
      correct: 1,
    },
    {
      type: 'quiz',
      question: '5. Before generating a final club artifact, what pilot test is most valuable?',
      options: [
        'Run on full data immediately for realism.',
        'Remove all limits to test maximum capability.',
        'Use a small public sample to test citations, tool parameters, and stop behavior.',
        'Publish once first to test reach.',
      ],
      correct: 2,
    },
    {
      type: 'quiz',
      question: '6. If the agent can view teacher-provided material, can it publish it automatically?',
      options: [
        'Yes, view permission also means publish permission.',
        'No, publication still needs explicit authorization and human confirmation.',
        'Yes, as long as the teacher is credited.',
        'Yes, if the source came from school.',
      ],
      correct: 1,
    },
    {
      type: 'fill',
      question: '7. Enabling only capabilities required by the current task is the ___ principle.',
      parts: ['Fill:', '___', '.'],
      options: ['minimization', 'generalization', 'automation'],
      correct: 'minimization',
    },
    {
      type: 'fill',
      question: '8. Access mode that allows viewing but no edits is ___ permission.',
      parts: ['Fill:', '___', '.'],
      options: ['read-only', 'collaborative edit', 'public share'],
      correct: 'read-only',
    },
    {
      type: 'fill',
      question: '9. Sources with traceable authors or institutions are ___ sources.',
      parts: ['Fill:', '___', '.'],
      options: ['reliable', 'popular', 'personal'],
      correct: 'reliable',
    },
    {
      type: 'quiz',
      question: '10. For one plant card, the agent asks to read your entire photo album. Best response?',
      options: [
        'Reject full-album access; provide selected photos or public references only.',
        'Grant temporary full album access and clean up later.',
        'Allow access but ask the agent to ignore private photos.',
      ],
      correct: 0,
    },
    {
      type: 'practice',
      task: '11. Minimal toolkit challenge: for a campus plant profile card, list up to 3 required tools or sources and 3 permissions that should stay disabled, each with one reason.',
      rubric:
        'Required items should directly support evidence-based drafting. Disabled permissions should include unrelated high-risk access such as contacts, payment, broad storage, or auto-publish.',
      placeholder: 'Required: ...\nDisabled: ...\nReason: ...',
      minLength: 50,
      referenceAnswer:
        'Required: school plant records, public botanic garden pages, and a text editor. Disabled: contacts, exact location, and payment. Reason: these permissions are unrelated to drafting and increase privacy or misuse risk.',
    },
    {
      type: 'match',
      question: '12. Match each task with a suitable minimal tool set:',
      pairs: [
        { left: 'Turn a library catalog into a draft reading list', right: 'Catalog data plus text editor' },
        { left: 'Track anonymous signup count trends', right: 'Anonymous table plus spreadsheet tools' },
        { left: 'Write a campus plant profile card', right: 'Public nature sources plus text editor' },
        { left: 'Prepare a stargazing reminder', right: 'Astronomy institution sources plus draft tool' },
      ],
    },
    {
      type: 'match',
      question: '13. Match each source situation with proper handling:',
      pairs: [
        { left: 'Public library catalog', right: 'Use it and preserve citations' },
        { left: 'Teacher-provided activity material', right: 'Use only for the agreed purpose' },
        { left: 'Private chat screenshot', right: 'Do not upload or use as evidence' },
        { left: 'Unsourced forwarded message', right: 'Verify with independent reliable sources' },
      ],
    },
    {
      type: 'match',
      question: '14. Match each permission pattern with risk control value:',
      pairs: [
        { left: 'Limit to one read-only folder', right: 'Prevents accidental edits elsewhere' },
        { left: 'Revoke access after the event', right: 'Avoids long-term permission retention' },
        { left: 'Do not connect contacts', right: 'Avoids unrelated personal-data access' },
        { left: 'Disable payment tools', right: 'Avoids unconfirmed spending' },
      ],
    },
    {
      type: 'match',
      question: '15. Match each check finding with the correction action:',
      pairs: [
        { left: 'Citation link points to an unrelated page', right: 'Replace or remove that evidence' },
        { left: 'Source requires private account login', right: 'Stop and do not bypass access limits' },
        { left: 'Tool requests edit access to source files', right: 'Switch to read-only or manual handling' },
        { left: 'Evidence is sufficient for draft', right: 'Stop and hand over for review' },
      ],
    },
    {
      type: 'theory',
      content:
        'Wrap-up\nFunction Calling is reliable only when Tool Schema is explicit, parameter validation is strict, permissions follow least privilege, and structured returns are checked before update or stop.',
    },
  ],
};
