import { DayContent } from '../../../types';

export const v3enw2d1Data: DayContent = {
  day: 1,
  title: 'Dragon Spell: Goals, Boundaries, and Success/Failure Criteria',
  shards: 1,
  steps: [
    { type: 'theory', content: 'Today\'s first Dragon Spell move: be precise before you ask.\n\nAI cannot read the picture in your head. The clearer your task is, the closer the output gets to what you really need. We will use four elements to turn vague requests into executable learning spells.' },
    { type: 'video', url: '', content: 'Video coming next: transform one blurry question into a full spell with all four elements.' },
    { type: 'theory', content: 'The four elements plus acceptance checks: Goal (what to complete), Context (audience, known facts, limits), Requirements (quality and boundaries), and Output Format (length, structure, tone). Then add two lines: success criteria (observable conditions that must be met) and failure criteria (what makes it unacceptable).' },
    { type: 'theory', content: 'Example:\nGoal: help me prepare an astronomy club intro. Context: I am a Grade 7 member speaking to new students. Requirements: friendly and accurate, no exaggerated claims. Output format: under 90 words, one hook sentence at the start, one call to action at the end.\nSuccess criteria: includes activity highlights, time, and sign-up method. Failure criteria: fabricated information, word limit exceeded, or missing sign-up method.\n\nThis is far more usable than \"Write a promo for our club.\"' },
    { type: 'quiz', question: '1. Which sentence is closest to a complete four-element Dragon Spell?', options: ['Write a recruiting intro for the robotics club, mention weekly activities, use an enthusiastic tone, and keep it under 80 words.', 'Write an 80-word recruiting intro for the robotics club aimed at Grade 7 newcomers; keep the tone warm but not exaggerated; output in three lines: highlights, activities, invitation.', 'I am in the robotics club and want to attract new students; please make it persuasive and not exaggerated.'], correct: 1 },
    { type: 'quiz', question: '2. \"I will present this at next week\'s class meeting, and the audience has never learned programming\" mainly adds what?', options: ['Task goal: complete a class-meeting presentation', 'Context: presentation scenario and audience background knowledge', 'Output format: split the content into three points'], correct: 1 },
    { type: 'fill', question: '3. For a classroom slide on trash sorting, \"Use 3 bullet points, each under 25 words\" defines ___.', parts: ['That sentence defines the', '___', '.'], options: ['output format', 'context', 'task scope'], correct: 'output format' },
    { type: 'match', question: '4. Match each spell fragment to its element:', pairs: [
      { left: 'Explain why volcanoes erupt', right: 'Goal' },
      { left: 'For middle school students interested in geography', right: 'Context' },
      { left: 'Do not fabricate data; explain terms in plain language', right: 'Requirements' },
      { left: 'Output in three parts: conclusion, reasons, follow-up question', right: 'Output format' }
    ] },
    { type: 'quiz', question: '5. You want to turn a reading note into a class presentation outline. Which context detail matters most for comprehension?', options: ['Audience grade level and whether they have read the book', 'Limit to 300 words without describing the audience', 'Use a casual tone without stating what to cover'], correct: 0 },
    { type: 'fill', question: '6. \"Do not invent content I did not read\" is a ___ rule.', parts: ['This is an executable', '___', '.'], options: ['requirement', 'context', 'output format'], correct: 'requirement' },
    { type: 'match', question: '7. Match the best addition for \"research an animal\":', pairs: [
      { left: 'Goal', right: 'Compare how two animals adapt to their environments' },
      { left: 'Context', right: 'Sources come from textbook notes and a natural history museum notebook' },
      { left: 'Requirements', right: 'Separate facts from guesses' },
      { left: 'Output format', right: 'Use a table of similarities and differences' }
    ] },
    { type: 'quiz', question: '8. Why is \"make it interesting\" not reliable enough?', options: ['It restricts the writing to only one event', 'It does not state who the audience is', 'People interpret it differently, so there is no checkable standard'], correct: 2 },
    { type: 'fill', question: '9. If classmates will read the output aloud, your context should state their ___.', parts: ['State the audience\'s', '___', 'and prior knowledge.'], options: ['age or comprehension level', 'interest area', 'deadline'], correct: 'age or comprehension level' },
    { type: 'match', question: '10. How can these vague phrases become checkable?', pairs: [
      { left: 'Make it clearer', right: 'Give one conclusion sentence first, then 2 examples' },
      { left: 'Make it shorter', right: 'Keep it within 120 words' },
      { left: 'Make it fit me', right: 'Target new members who just joined the club' },
      { left: 'Do not make things up', right: 'Mark uncertain parts as \"needs verification\"' }
    ] },
    { type: 'quiz', question: '11. For the same request \"help me think of a story,\" which option is the most executable goal?', options: ['Write an opening about friendship.', 'I will join a campus story relay and want a sci-fi opening.', 'Write a 150-word first-person sci-fi opening set on campus.'], correct: 2 },
    { type: 'fill', question: '12. Stating \"what I need to accomplish\" first means writing the ___.', parts: ['Stating what to accomplish first means writing the', '___', '.'], options: ['goal', 'context', 'output format'], correct: 'goal' },
    { type: 'quiz', question: '13. To upgrade \"make an introduction\" into a ready-to-use class-meeting task, what best reduces AI guessing?', options: ['Add topic, audience, time limit, and outline structure', 'Repeat \"please do this carefully\" three times', 'Replace \"introduction\" with \"very good introduction\"'], correct: 0 },
    { type: 'quiz', question: '14. In a team of three, each person introduces one part. Which requirement is easiest to divide and review?', options: ['Give 3 non-overlapping angles; each angle includes a title and two key points', 'Give some interesting angles and let AI decide how many', 'Write one full long article first, then let teammates split it'], correct: 0 },
    { type: 'match', question: '15. Check four elements for a Dragon Ability Card:', pairs: [
      { left: 'What am I trying to do?', right: 'Goal' },
      { left: 'What does AI need to know first?', right: 'Context' },
      { left: 'Which criteria cannot be violated?', right: 'Requirements' },
      { left: 'What should the answer look like?', right: 'Output format' }
    ] },
    { type: 'theory', content: 'Dragon Ability Card: Four-element spell check.\n\nBefore each prompt, ask: Is the goal clear? Is context enough? Are requirements checkable? Is the output format directly usable? This card is the foundation for every spell this week.' }
  ]
};
