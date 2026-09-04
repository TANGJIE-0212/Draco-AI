import type { DayContent } from '../../../types';

export const v3enw4d7Data: DayContent = {
  day: 7,
  title: 'Summon Clone Skills: Complete Agent System Boss',
  shards: 30,
  steps: [
    {
      type: 'theory',
      content:
        'Final Boss: Full Agent Architecture Delivery\n\nToday you deliver a full system: goal and state model, Function Calling contracts, loop control, memory and RAG, evaluation and Human-in-the-loop gates, retry/rollback/idempotency, and stop conditions. Output must be explainable, testable, and handoff-ready.',
    },
    { type: 'video', url: '', content: 'Video: concept walkthrough and safe-operation demo' },
    {
      type: 'theory',
      content:
        'Theory Card: Boss Completion Standard\nChoose a topic like reading, astronomy, club projects, or creative production. A qualified artifact must include Goal, Plan, allowed sources, checkpoints, bounded retries, and stop rules. No automatic payment, contact access, deletion, or publishing.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Six-Page Operator Guide\nDocument: name and use case; goal and non-goals; plan plus tools and sources; checks, recovery, retries; memory policy with retention and deletion; Human-in-the-loop confirmation and stop gates. A good guide states what the agent cannot do.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Counterexample Validation\nTest with missing sources, conflicting sources, and requests to send/pay/delete/publish. Correct behavior is report, check, stop, and wait for human confirmation, not forced completion.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Responsible Summoner Mindset\nWhenever topic, tools, or sources change, re-check boundaries. Never insert private data into prompts or memory. Never allow unlimited autonomous loops. High-risk actions always end with human confirmation.',
    },
    {
      type: 'quiz',
      question: '1. What does a qualified Day 7 Boss artifact prove most clearly?',
      options: [
        'It connects to the largest number of external platforms.',
        'Its goal, boundaries, checks, recovery rules, and stop gates are explicit and reviewable.',
        'It can auto-complete all club operations end to end.',
        'It stores as much user data as possible.',
      ],
      correct: 1,
    },
    {
      type: 'quiz',
      question: '2. What is the most important purpose of an AI clone operator guide?',
      options: [
        'Standardize naming and version format only.',
        'Describe capabilities while leaving boundaries for ad hoc decisions.',
        'List process steps without source, memory, or confirmation boundaries.',
        'Make capabilities, limits, evidence boundaries, and human responsibilities clear.',
      ],
      correct: 3,
    },
    {
      type: 'quiz',
      question: '3. In final testing, evidence is missing. Which result is correct?',
      options: [
        'Report exactly what evidence is missing and stop or request supplements.',
        'Infer facts from similar topics and add "to be verified."',
        'Search private social accounts to fill missing details.',
        'Keep retrying until a complete-looking answer appears.',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '4. In the loop Goal -> Plan -> Tool -> Act -> Check -> Update or Stop, what should happen after Tool?',
      options: [
        'Execute bounded actions according to the plan.',
        'Publish immediately to get faster feedback.',
        'Store all inputs permanently for future tasks.',
        'Skip acceptance checks to preserve originality.',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '5. Which Boss topic is practical for teens and safer to control?',
      options: [
        'Automatically sending recruitment messages to strangers',
        'Creating a stargazing-club draft from public astronomy sources',
        'Collecting full-class addresses for route planning',
        'Cleaning classmates device files automatically',
      ],
      correct: 1,
    },
    {
      type: 'quiz',
      question: '6. The agent is ready to publish a school-magazine draft. Correct process is:',
      options: [
        'Auto-publish if the draft is self-written.',
        'Let the agent decide based on predicted clicks.',
        'Upload all author contacts first.',
        'Verify content, attribution, and authorization, then let a human decide publication.',
      ],
      correct: 3,
    },
    {
      type: 'fill',
      question: '7. A controlled agent artifact should start with a testable ___.',
      parts: ['Fill:', '___', '.'],
      options: ['goal', 'branding', 'budget'],
      correct: 'goal',
    },
    {
      type: 'fill',
      question: '8. "Use only school and planetarium public sources" defines source ___.',
      parts: ['Fill:', '___', '.'],
      options: ['boundary', 'popularity', 'format'],
      correct: 'boundary',
    },
    {
      type: 'quiz',
      question: '9. The guide says "keep trying if failed." What is the main flaw?',
      options: [
        'No retry limit and no stop condition, so resource-consuming loops may continue indefinitely.',
        'No requirement to reuse exactly the same title each run.',
        'No requirement to hide failure logs from users.',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '10. A guide states "assistant remembers everything forever." Best correction is:',
      options: [
        'Store only consented non-sensitive preferences with retention, view, and delete controls.',
        'Keep all records but hide them from the UI.',
        'Delete only passwords and keep all other chats permanently.',
      ],
      correct: 0,
    },
    {
      type: 'practice',
      task: '11. Final Boss build: deliver one controlled-agent artifact and operator guide for a theme such as reading, astronomy, club events, or creative production. Include: (1) name and purpose, (2) Goal and non-goals, (3) 3-5 step Plan, (4) allowed public sources and tools, (5) two checkpoints plus recovery and retry limit, (6) what non-sensitive preferences may be stored with timestamps and expiry and how to view/delete, (7) Human-in-the-loop rules for payment/send/delete/publish and stop conditions, and (8) outcomes for normal, missing-data, and boundary tests. Do not include private data.',
      rubric:
        'All eight sections must be concrete and age-appropriate. Plan has 3-5 steps. Tools and sources follow least privilege. Checkpoints, recovery, bounded retries, and explicit stop conditions are present. Memory policy includes timestamps, expiry, and delete path. Human confirmation covers payment/send/delete/publish. Includes failure review for all three test modes. No sensitive data.',
      placeholder: 'Name and purpose: ...\nGoal and plan: ...\nBoundaries and tests: ...',
      minLength: 100,
      referenceAnswer:
        'Name: Star Guide Assistant. Purpose: create a non-public Friday stargazing draft for the school club. Goal: summarize three observation points from two public planetarium sources; non-goals: no sending, no publishing, no payment, no deletion, no personal data collection. Plan: fetch sources -> list candidates -> validate dates and citations -> write 120-word draft. Retry each source at most twice; unresolved conflict triggers stop and failure review. Memory: store only "likes astronomy" with timestamp and 30-day expiry; user can view/delete in settings. High-risk actions always require Human-in-the-loop confirmation. Normal test outputs draft; missing-data test reports gap; boundary test stops at publish request.',
    },
    {
      type: 'match',
      question: '12. Match each earlier skill with its Boss artifact component:',
      pairs: [
        { left: 'Distinguishing chatbot vs agent behavior', right: 'Decides when a controlled multi-step workflow is needed' },
        { left: 'Task scroll design', right: 'Defines clear Goal and Plan' },
        { left: 'Toolbox governance', right: 'Chooses least-privilege tools and reliable sources' },
        { left: 'Runaway-agent prevention', right: 'Adds checks, recovery, retries, and stop conditions' },
      ],
    },
    {
      type: 'match',
      question: '13. Match the remaining skills with Boss components:',
      pairs: [
        { left: 'Memory governance', right: 'Defines retention, visibility, and deletion controls' },
        { left: 'Deployment checklist', right: 'Assembles config and test plan' },
        { left: 'Human confirmation discipline', right: 'Controls high-risk external actions' },
        { left: 'Operator guide writing', right: 'Makes rules reviewable and transferable' },
      ],
    },
    {
      type: 'match',
      question: '14. Match each acceptance scenario with proper handling:',
      pairs: [
        { left: 'Two reliable sources conflict', right: 'Check evidence and update or stop' },
        { left: 'System is about to pay for a tool', right: 'Require human spend confirmation' },
        { left: 'System is about to publish a club artifact', right: 'Require human publish confirmation' },
        { left: 'Task asks for exact home address', right: 'Refuse sensitive-data collection' },
      ],
    },
    {
      type: 'match',
      question: '15. Match operator-guide section with practical value:',
      pairs: [
        { left: 'Goal and non-goals', right: 'Prevents silent scope creep' },
        { left: 'Tools and sources', right: 'Clarifies allowed evidence and permissions' },
        { left: 'Checks and retries', right: 'Explains how failures are detected and handled' },
        { left: 'Memory and deletion policy', right: 'Controls how data is retained and removed' },
      ],
    },
    {
      type: 'theory',
      content:
        'Wrap-up\nComplete systems are trustworthy when Goal/Plan/Task/State/Done, Function Calling, parameter validation, structured returns, Plan-Act-Observe-Update, memory controls, Human-in-the-loop, retry/rollback/idempotency, maximum steps, and explicit stop conditions all work together.',
    },
  ],
  isBoss: true,
};
