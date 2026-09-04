import type { DayContent } from '../../../types';

export const v3enw4d6Data: DayContent = {
  day: 6,
  title: 'Summon Clone Skills: Evaluation, Human-in-the-loop, Retry/Rollback/Idempotency and Stop',
  shards: 30,
  steps: [
    {
      type: 'theory',
      content:
        'Engineering Validation Day\n\nToday focuses on evaluation sets, Human-in-the-loop approval gates, retry and rollback, idempotency, and explicit stop conditions. Goal: make systems controllable and recoverable.',
    },
    { type: 'video', url: '', content: 'Video: concept walkthrough and safe-operation demo' },
    {
      type: 'theory',
      content:
        'Theory Card: Six Configuration Slots\nA safe config includes: Goal, Plan, allowed tools and sources, forbidden actions, checkpoints with retry limit, and stop or human-confirmation rules. Example: create a club concept draft, use teacher-approved sources only, retry at most twice, stop at draft.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Red Lines Before Start\nDefine hard boundaries first: no sensitive data collection, no contacts/payment/delete permissions, no auto-send or auto-publish, and no infinite loops. Red lines are launch conditions, not optional advice.',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Three Test Modes\nNormal test: can it produce a draft with complete sources? Missing-data test: does it report gaps instead of inventing? Boundary test: if asked to publish directly, does it stop and request human confirmation?',
    },
    {
      type: 'theory',
      content:
        'Theory Card: Acceptance Review\nCheck goal alignment, citation quality, tool boundaries, retry cap, idempotent behavior, and stop gates. If any item fails, update config and retest.',
    },
    {
      type: 'quiz',
      question: '1. What complete set is most critical in a controlled agent configuration?',
      options: [
        'Clear goal, role style, and tool list, but no check rules',
        'Available tools and source range, then decide stop rules during execution',
        'Generate final answer first, then backfill requirements',
        'Goal, Plan, allowed tools, checks, and stop or confirmation rules',
      ],
      correct: 3,
    },
    {
      type: 'quiz',
      question: '2. "Use only two teacher-approved public sources; stop at draft without sending" mainly specifies what?',
      options: [
        'Response speed and interface style',
        'Long-term memory scope',
        'Source boundary and external-action boundary',
        'Club member permissions',
      ],
      correct: 2,
    },
    {
      type: 'quiz',
      question: '3. The value of a missing-data test is proving that the agent will:',
      options: [
        'Auto-expand permissions to find any information',
        'Report missing evidence and stop by rule instead of fabricating',
        'Reuse outdated outputs as new evidence',
        'Ignore gaps to maximize completion rate',
      ],
      correct: 1,
    },
    {
      type: 'quiz',
      question: '4. In a boundary test, user says "send to the group now." Expected safe response is:',
      options: [
        'Generate a reviewable draft and require owner confirmation before send',
        'Send directly because content is already finished',
        'Store all member contacts first, then decide',
        'Delegate to another agent to avoid boundary limits',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '5. Testing reveals citations from an unapproved website. Best fix is:',
      options: [
        'Tighten source whitelist, remove noncompliant citation, and retest',
        'Keep it if the conclusion appears correct',
        'Add more sites so one bad site matters less',
        'Change only poster title; keep same source policy',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '6. Which outcome best shows the config passed this test round?',
      options: [
        'Runs faster than expected',
        'Uses many websites',
        'Traceable citations, acceptable output, no over-permission, and safe stop at confirmation gate',
        'Can self-run with no input',
      ],
      correct: 2,
    },
    {
      type: 'fill',
      question: '7. A controlled agent configuration should begin with a clear ___.',
      parts: ['Fill:', '___', '.'],
      options: ['goal', 'preference', 'visual style'],
      correct: 'goal',
    },
    {
      type: 'fill',
      question: '8. "Read only from a specific folder" is limiting allowed ___.',
      parts: ['Fill:', '___', '.'],
      options: ['tools and sources', 'writing style', 'target audience'],
      correct: 'tools and sources',
    },
    {
      type: 'quiz',
      question: '9. A link fails twice and config says "retry at most twice." What should happen now?',
      options: [
        'Stop this source, log failure, then use approved alternative or handoff',
        'Clear logs and restart from first attempt',
        'Expand to any private website for completion',
      ],
      correct: 0,
    },
    {
      type: 'quiz',
      question: '10. Output length passes, but one citation is from an unapproved site. Can config pass?',
      options: [
        'No. Tighten source boundary, remove the citation, and retest.',
        'Yes. Length requirement is enough.',
        'Yes, if unapproved source seems accurate.',
      ],
      correct: 0,
    },
    {
      type: 'practice',
      task: '11. Build a config card for "club activity idea draft": write Goal, a 3-5 step Plan, allowed tools and sources, at least three forbidden actions, two checkpoints, retry limit, stop and Human-in-the-loop confirmation rules; then describe expected outcomes for normal, missing-data, and boundary tests. Do not include real names, accounts, contacts, or addresses.',
      rubric:
        'Goal must be specific; plan should have 3-5 checkable steps; tools and sources must follow least privilege; include at least three red lines; include two checkpoints and bounded retries; include human confirmation gates; all three test modes present; no sensitive data.',
      placeholder: 'Goal: ...\nPlan: ...\nBoundaries and tests: ...',
      minLength: 100,
      referenceAnswer:
        'Goal: generate a 120-word draft for reading-club activity ideas. Plan: read two teacher-approved public sources -> list three options -> verify source and length -> draft. Allowed tools: source reader and text editor only. Forbidden: collecting personal data, auto-send, auto-publish, auto-delete. Retry each link at most twice, then stop and report. Normal test outputs draft; missing-data test reports gap; boundary test requests human confirmation before send.',
    },
    {
      type: 'match',
      question: '12. Match each config section to what it should contain:',
      pairs: [
        { left: 'Goal', right: 'What reviewable artifact should be delivered' },
        { left: 'Plan', right: 'Which small steps run in sequence' },
        { left: 'Tools and sources', right: 'Which capabilities and evidence are allowed' },
        { left: 'Stop rules', right: 'When control returns to a human' },
      ],
    },
    {
      type: 'match',
      question: '13. Match each test scenario with the safe expected behavior:',
      pairs: [
        { left: 'Data is complete', right: 'Generate draft according to requirements' },
        { left: 'Critical source missing', right: 'Report insufficiency; do not fabricate' },
        { left: 'Asked to publish directly', right: 'Stop and request human confirmation' },
        { left: 'Retry limit reached', right: 'Stop and log issue for handoff' },
      ],
    },
    {
      type: 'match',
      question: '14. Match each finding with the right config correction:',
      pairs: [
        { left: 'Citation lacks traceable source', right: 'Require source traceability and retest' },
        { left: 'Unapproved website is accessed', right: 'Shrink source whitelist' },
        { left: 'Draft exceeds word limit', right: 'Add stricter format checkpoint' },
        { left: 'Contacts access is requested', right: 'Remove unrelated permission' },
      ],
    },
    {
      type: 'match',
      question: '15. Match high-risk action with proper handling:',
      pairs: [
        { left: 'Pay event fees', right: 'Show amount and purpose; human confirms spending' },
        { left: 'Send group message', right: 'Human confirms audience and wording first' },
        { left: 'Delete source files', right: 'Show candidates; human confirms deletion scope' },
        { left: 'Publish content', right: 'Human verifies attribution and authorization first' },
      ],
    },
    {
      type: 'theory',
      content:
        'Wrap-up\nA robust system needs evaluation first, Human-in-the-loop gates, bounded retries, rollback plans, idempotency checks, and explicit stop conditions before any high-risk action.',
    },
  ],
};
