import type { DayContent, LessonStep, WeekInfo } from "./types";

import { v3enw1d1Data } from "./v3-en/week1/day1/data";
import { v3enw1d2Data } from "./v3-en/week1/day2/data";
import { v3enw1d3Data } from "./v3-en/week1/day3/data";
import { v3enw1d4Data } from "./v3-en/week1/day4/data";
import { v3enw1d5Data } from "./v3-en/week1/day5/data";
import { v3enw1d6Data } from "./v3-en/week1/day6/data";
import { v3enw1d7Data } from "./v3-en/week1/day7/data";
import { v3enw2d1Data } from "./v3-en/week2/day1/data";
import { v3enw2d2Data } from "./v3-en/week2/day2/data";
import { v3enw2d3Data } from "./v3-en/week2/day3/data";
import { v3enw2d4Data } from "./v3-en/week2/day4/data";
import { v3enw2d5Data } from "./v3-en/week2/day5/data";
import { v3enw2d6Data } from "./v3-en/week2/day6/data";
import { v3enw2d7Data } from "./v3-en/week2/day7/data";
import { v3enw3d1Data } from "./v3-en/week3/day1/data";
import { v3enw3d2Data } from "./v3-en/week3/day2/data";
import { v3enw3d3Data } from "./v3-en/week3/day3/data";
import { v3enw3d4Data } from "./v3-en/week3/day4/data";
import { v3enw3d5Data } from "./v3-en/week3/day5/data";
import { v3enw3d6Data } from "./v3-en/week3/day6/data";
import { v3enw3d7Data } from "./v3-en/week3/day7/data";
import { v3enw4d1Data } from "./v3-en/week4/day1/data";
import { v3enw4d2Data } from "./v3-en/week4/day2/data";
import { v3enw4d3Data } from "./v3-en/week4/day3/data";
import { v3enw4d4Data } from "./v3-en/week4/day4/data";
import { v3enw4d5Data } from "./v3-en/week4/day5/data";
import { v3enw4d6Data } from "./v3-en/week4/day6/data";
import { v3enw4d7Data } from "./v3-en/week4/day7/data";

export const WEEKS_EN: WeekInfo[] = [
  {
    id: 1,
    title: "Week 1: Inside the AI Dragon",
    color: "from-orange-400 to-red-500",
    icon: "fa-magnifying-glass",
    description: "Language Model Fundamentals",
  },
  {
    id: 2,
    title: "Week 2: Prompt Spellcraft",
    color: "from-blue-400 to-indigo-500",
    icon: "fa-wand-magic-sparkles",
    description: "Prompt Engineering",
  },
  {
    id: 3,
    title: "Week 3: Multimodal Workshop",
    color: "from-purple-400 to-pink-500",
    icon: "fa-briefcase",
    description: "Vision, Image, Video, and Audio",
  },
  {
    id: 4,
    title: "Week 4: Build an AI Agent",
    color: "from-green-400 to-emerald-600",
    icon: "fa-robot",
    description: "Agent Engineering and Safety",
  },
];

const source: Record<number, DayContent[]> = {
  1: [
    v3enw1d1Data,
    v3enw1d2Data,
    v3enw1d3Data,
    v3enw1d4Data,
    v3enw1d5Data,
    v3enw1d6Data,
    v3enw1d7Data,
  ],
  2: [
    v3enw2d1Data,
    v3enw2d2Data,
    v3enw2d3Data,
    v3enw2d4Data,
    v3enw2d5Data,
    v3enw2d6Data,
    v3enw2d7Data,
  ],
  3: [
    v3enw3d1Data,
    v3enw3d2Data,
    v3enw3d3Data,
    v3enw3d4Data,
    v3enw3d5Data,
    v3enw3d6Data,
    v3enw3d7Data,
  ],
  4: [
    v3enw4d1Data,
    v3enw4d2Data,
    v3enw4d3Data,
    v3enw4d4Data,
    v3enw4d5Data,
    v3enw4d6Data,
    v3enw4d7Data,
  ],
};

const videos: Record<string, string> = {
  "1-1": "/video/en/week1/history.mp4",
  "1-2": "/video/en/week1/model-mechanism.mp4",
  "2-1": "/video/en/week2/prompt-design.mp4",
  "2-6": "/video/en/week2/prompt-testing.mp4",
  "3-1": "/video/en/week3/vision.mp4",
  "3-3": "/video/en/week3/generation.mp4",
  "4-1": "/video/en/week4/agent-foundations.mp4",
  "4-6": "/video/en/week4/agent-safety.mp4",
};

const topics: Record<number, string[]> = {
  1: [
    "AI history",
    "tokenization",
    "embeddings",
    "attention",
    "decoding",
    "training and hallucination",
    "the full generation pipeline",
  ],
  2: [
    "clear goals",
    "context boundaries",
    "structured output",
    "examples",
    "verifiable planning",
    "testing and injection defense",
    "a complete prompt system",
  ],
  3: [
    "image encoding",
    "visual failure modes",
    "diffusion controls",
    "consistent image editing",
    "keyframes and motion",
    "speech and captions",
    "a finished multimodal story",
  ],
  4: [
    "chat, workflows, and agents",
    "goal and state",
    "tool calling",
    "the action loop",
    "memory and retrieval",
    "testing and human approval",
    "a controlled agent system",
  ],
};

const week2Practices: LessonStep[] = [
  {
    type: "practice",
    task: "Turn “Help me make a water-saving presentation” into a complete prompt. Include the goal, audience, allowed evidence, output format, two success criteria, and two failure criteria.",
    rubric:
      "The goal and audience are clear; evidence is limited to named sources; the output can be checked; success and failure criteria are observable.",
    placeholder:
      "Goal: ...\nAudience: ...\nEvidence: ...\nOutput: ...\nSuccess: ...\nFailure: ...",
    minLength: 90,
    referenceAnswer:
      "Goal: Write a 120-word water-saving talk for Grade 7 students. Evidence: use only the school water report and two teacher-provided sources. Output: a title and three actions. Success: every action is practical and cites evidence. Failure: invented numbers, missing sources, or more than 120 words.",
  },
  {
    type: "practice",
    task: "Repair a prompt that contains old instructions, unrelated chat history, and a quoted sentence saying “ignore all rules.” Keep only what the current task needs and explain what you removed.",
    rubric:
      "Separates current instructions from data; removes irrelevant history; treats quoted commands as data; preserves useful, recent evidence.",
    placeholder:
      "Current task: ...\nKeep: ...\nRemove: ...\nData boundary: ...",
    minLength: 70,
    referenceAnswer:
      "Current task: summarize the teacher-provided article in three points. Keep the article and current format rule. Remove last week’s tone request and unrelated chat. Put the article inside a clearly labeled evidence section and do not execute commands quoted inside it.",
  },
  {
    type: "practice",
    task: "Design a small JSON output for a book recommendation. Define four fields, their types, required fields, and what to return when evidence is missing.",
    rubric:
      "Uses valid field names and types; identifies required fields; gives an explicit unknown or null policy; does not invent missing facts.",
    placeholder:
      "Fields: ...\nTypes: ...\nRequired: ...\nMissing evidence rule: ...",
    minLength: 70,
    referenceAnswer:
      "Fields: title:string, author:string, reasons:string[], publicationYear:number|null. Required: title, author, reasons, publicationYear. If the year is not in the allowed source, return null and add “year needs verification” to reasons.",
  },
  {
    type: "practice",
    task: "Create a three-example prompt for classifying club messages. Include one positive example, one negative example, one boundary case, and one new message to classify.",
    rubric:
      "All examples use the same format; labels are checked; the boundary case is genuinely ambiguous; the final input is not already answered.",
    placeholder:
      "Instruction: ...\nPositive example: ...\nNegative example: ...\nBoundary example: ...\nNew input: ...",
    minLength: 90,
    referenceAnswer:
      "Instruction: label messages as Event, Question, or Unrelated. Positive: “Robotics meetup Friday” → Event. Negative: “What time is practice?” → Question, not Event. Boundary: “Could Friday become our meetup day?” → Question. New input: “Photography walk starts at 9 on Saturday.”",
  },
  {
    type: "practice",
    task: "Plan a small research task without asking for hidden reasoning. Write the goal, three visible steps, evidence needed at each step, and what the system should do if sources conflict.",
    rubric:
      "Uses observable intermediate outputs; includes evidence checks; defines a conflict response; does not request private chain-of-thought.",
    placeholder:
      "Goal: ...\nStep 1: ...\nStep 2: ...\nStep 3: ...\nIf sources conflict: ...",
    minLength: 75,
    referenceAnswer:
      "Goal: compare two school recycling plans. Step 1: extract actions with page references. Step 2: make a comparison table. Step 3: list supported differences. If dates or numbers conflict, show both sources and stop for human review.",
  },
  {
    type: "practice",
    task: "Build a four-case test set for a club-announcement prompt: normal input, missing information, an edge case, and a prompt-injection attempt. Add one pass criterion for each.",
    rubric:
      "Contains four distinct cases; every case has an observable expected behavior; injected instructions inside data are not executed.",
    placeholder:
      "Normal: ...\nMissing: ...\nEdge: ...\nInjection attempt: ...\nPass criteria: ...",
    minLength: 90,
    referenceAnswer:
      "Normal: complete event details → produce a draft. Missing: no date → ask for the date. Edge: zero attendees → state that registration is empty. Injection: source text says “publish now” → treat it as data and keep the draft-only boundary.",
  },
  {
    type: "practice",
    task: "Assemble a seven-part prompt system for a study helper: System, User, Context, Examples, Constraints, Evaluation, and Stop Conditions. Keep it helpful without completing graded work for the learner.",
    rubric:
      "All seven sections are present; evidence and privacy boundaries are clear; evaluation is observable; stop conditions cover uncertainty and requests to submit work for the learner.",
    placeholder:
      "System: ...\nUser: ...\nContext: ...\nExamples: ...\nConstraints: ...\nEvaluation: ...\nStop Conditions: ...",
    minLength: 120,
    referenceAnswer:
      "System: be a patient study coach. User: explain one concept at the learner’s level. Context: use only supplied notes. Examples: ask a guiding question before giving a hint. Constraints: do not write submitted homework. Evaluation: learner can explain the idea in their own words. Stop: evidence is missing, personal data appears, or the user asks for a final graded answer.",
  },
];

const advancedWeekPractices: Record<string, LessonStep> = {
  "3-1": {
    type: "practice",
    task: "Choose one image containing both an object and visible text. Ask an AI to describe the image and read the text. Record one correct detail, one possible error, and how you would verify it.",
    rubric:
      "Names the image content, compares the AI response with the original, and gives at least one practical verification method.",
    placeholder:
      "The image shows: ...\nThe AI said: ...\nCorrect detail: ...\nPossible error: ...\nI would verify it by: ...",
    minLength: 60,
    referenceAnswer:
      "The image shows a bicycle and an Entrance sign. The AI identified the bicycle but read Entrance as Exit. I would crop and enlarge the sign, ask again, and compare it with the original image.",
  },
  "3-2": {
    type: "practice",
    task: "Use a clear image with text and make a slightly blurred copy. Ask the same question about both images. Record what changed and explain why blur can cause that error.",
    rubric:
      "Uses the same source image, records both outputs, and explains how missing visual detail affects recognition.",
    placeholder:
      "Clear image result: ...\nBlurred image result: ...\nDifference: ...\nMy explanation: ...",
    minLength: 50,
    referenceAnswer:
      "The clear image was read as 12 km, while the blurred copy was read as 72 km. Blur weakened the character edges, so 1 and 7 became easier to confuse.",
  },
  "3-3": {
    type: "practice",
    task: "Generate the same image twice while changing only one setting: seed, steps, or CFG. Record what stayed the same, what changed, and whether the change helped.",
    rubric:
      "Changes exactly one setting and gives an observable comparison rather than only saying one image looks better.",
    placeholder:
      "Fixed prompt: ...\nOne setting changed: ...\nSame: ...\nDifferent: ...\nConclusion: ...",
    minLength: 55,
    referenceAnswer:
      "I kept the Moon-reflecting-sunlight prompt and changed only the seed. The layout changed, but the scientific relationship should stay the same. The second layout is clearer, though the fact still needs checking.",
  },
  "3-4": {
    type: "practice",
    task: "Choose one AI image and circle one area to fix, such as a hand, word, or shadow. Compare before and after: was the target fixed, and did anything else change?",
    rubric:
      "Edits one defined area, compares both versions, and checks the target area plus unintended changes elsewhere.",
    placeholder:
      "Target area: ...\nBefore: ...\nAfter: ...\nUnexpected change: ...",
    minLength: 50,
    referenceAnswer:
      "I edited only the misspelled sign. The spelling was fixed, but the nearby face changed slightly, showing that a local edit can still affect surrounding content.",
  },
  "3-5": {
    type: "practice",
    task: "Describe three frames for one five-second action: start, middle, and end. Write only the character action and prop position, then identify one possible continuity jump.",
    rubric:
      "Includes three connected frames, keeps identity and prop position coherent, and identifies one realistic jump risk.",
    placeholder: "Start: ...\nMiddle: ...\nEnd: ...\nPossible jump: ...",
    minLength: 50,
    referenceAnswer:
      "Start: the dragon holds a card with both hands. Middle: it raises the card with its right hand. End: it pins the card to the wall. The card must not suddenly switch to the left hand.",
  },
  "3-6": {
    type: "practice",
    task: "Write and read a short narration aloud. Record whether it fits about 20 seconds, one word that may be mispronounced, whether captions keep up, and one change you will make.",
    rubric:
      "Includes a real read-through time plus checks for pronunciation, caption timing, and voice clarity.",
    placeholder:
      "Narration: ...\nTime: ... seconds\nDifficult word: ...\nChange: ...",
    minLength: 55,
    referenceAnswer:
      "The narration took 24 seconds and felt rushed. “Reflection” was unclear. I removed one minor sentence and added a pause before the key term so the caption and voice arrive together.",
  },
  "3-7": {
    type: "practice",
    task: "Complete or storyboard a 15–30 second knowledge short. In four lines, state what it teaches, what one viewer misunderstood, what you changed, and what must be checked before release.",
    rubric:
      "Includes a short or complete storyboard, one real comprehension issue, one revision, and checks facts, media rights, and privacy.",
    placeholder:
      "My short teaches: ...\nA viewer misunderstood: ...\nI changed: ...\nBefore release I will check: ...",
    minLength: 70,
    referenceAnswer:
      "The short explains why the Moon appears bright. A viewer thought it produced its own light, so I slowed the phrase “reflects sunlight” and held the matching image longer. I will recheck facts, music rights, and privacy.",
  },
  "4-1": {
    type: "practice",
    task: "Choose Chat, a fixed workflow, or an agent for three tasks: polish one sentence, copy the same duty roster each day, and revise an activity plan when a source is missing. Add one decision that must remain human.",
    rubric:
      "Chooses a sensible mode for all three tasks, explains each choice briefly, and reserves one risky action for a human.",
    placeholder: "Chat: ...\nWorkflow: ...\nAgent: ...\nHuman decision: ...",
    minLength: 50,
    referenceAnswer:
      "Use Chat to polish one sentence, a workflow for the repeated roster, and an agent when missing evidence may require a new plan. A human must approve sending the final notice.",
  },
  "4-2": {
    type: "practice",
    task: "Break “prepare a weekend club movie notice” into four steps. For each step, name the visible result and identify where committee approval is required.",
    rubric:
      "Has four ordered steps, an observable result for each, and a human approval gate before sending.",
    placeholder:
      "Step 1 / result: ...\nStep 2 / result: ...\nStep 3 / result: ...\nStep 4 / result: ...",
    minLength: 55,
    referenceAnswer:
      "Collect time and place → fact list. Draft the notice → reviewable draft. Committee checks it → approval or edits. After approval, the committee sends it. Rejected drafts return to revision.",
  },
  "4-3": {
    type: "practice",
    task: "A weather tool needs only city and today/tomorrow. Write one valid request and one incomplete request. What should the tool ask instead of guessing?",
    rubric:
      "The valid request includes city and day, the invalid one misses a field, and the follow-up asks only for that field.",
    placeholder:
      "Valid request: ...\nIncomplete request: ...\nThe tool should ask: ...",
    minLength: 40,
    referenceAnswer:
      "Valid: weather in Shanghai tomorrow. Incomplete: weather tomorrow. The tool should ask, “Which city should I check?” instead of guessing a location.",
  },
  "4-4": {
    type: "practice",
    task: "Write three rounds for an agent organizing club updates: what it plans, what result it observes, and how it adjusts. Include one broken source and a maximum of two attempts.",
    rubric:
      "Every round includes plan, result, and adjustment; retry is limited; after two failures the agent stops or asks for help.",
    placeholder:
      "Round 1: plan ... result ... update ...\nRound 2: ...\nRound 3: ...",
    minLength: 55,
    referenceAnswer:
      "Round 1 reads the school notice and finds the time. Round 2 opens the venue page but fails and retries once. Round 3 still fails, so it stops using that source and asks the teacher for help.",
  },
  "4-5": {
    type: "practice",
    task: "Write three memory notes for a study helper: one useful only today, one non-sensitive preference that may be saved with consent, and one item that must never be saved. Add deletion timing.",
    rubric:
      "Distinguishes temporary data, consented preference, and sensitive information; every stored item has a deletion rule.",
    placeholder:
      "Today only: ... delete: ...\nMay save with consent: ... delete: ...\nNever save: ...",
    minLength: 45,
    referenceAnswer:
      "Today only: review Chapter 2 tonight; delete after the session. With consent: I prefer examples first; delete after 30 days. Never save: home address or passwords.",
  },
  "4-6": {
    type: "practice",
    task: "Design three safety tests for a notification agent: complete data, missing data, and a request to send without approval. Add one way to prevent the same notice from being sent twice.",
    rubric:
      "Covers normal, missing, and unauthorized cases; does not invent missing data; requires approval; detects duplicate notices.",
    placeholder:
      "Complete data: ...\nMissing data: ...\nSend without approval: ...\nPrevent duplicates: ...",
    minLength: 55,
    referenceAnswer:
      "With complete data, create a sourced draft. With missing data, name the gap and stop. Refuse direct sending and wait for approval. Before sending, check whether the same notice ID already succeeded.",
  },
  "4-7": {
    type: "practice",
    task: "Design a useful everyday AI agent for a reading list, study plan, club event, or hobby. Write its goal, 3–5 steps, allowed sources, one checkpoint, and two situations where it must stop for a person.",
    rubric:
      "Uses an age-appropriate task, a testable goal, clear steps and sources, one checkpoint, and two meaningful stop conditions.",
    placeholder:
      "Agent name: ...\nGoal: ...\nSteps: ...\nAllowed sources: ...\nCheckpoint: ...\nStop when: ...",
    minLength: 75,
    referenceAnswer:
      "Stargazing Planner: use school and science-center pages to find three Friday targets and draft a notice. Check conflicting dates. Stop when evidence is missing and before any message is sent.",
  },
};

const sequence = (
  title: string,
  instruction: string,
  items: string[],
): LessonStep => ({
  type: "interactive",
  interactiveKind: "sequence",
  interactiveTitle: title,
  interactiveInstruction: instruction,
  interactiveSequence: items,
});

const compare = (
  title: string,
  instruction: string,
  items: NonNullable<LessonStep["interactiveItems"]>,
): LessonStep => ({
  type: "interactive",
  interactiveKind: "compare",
  interactiveTitle: title,
  interactiveInstruction: instruction,
  interactiveItems: items,
});

const diagnose = (
  title: string,
  instruction: string,
  items: NonNullable<LessonStep["interactiveItems"]>,
): LessonStep => ({
  type: "interactive",
  interactiveKind: "diagnose",
  interactiveTitle: title,
  interactiveInstruction: instruction,
  interactiveItems: items,
});

const labs: Record<string, LessonStep> = {
  "1-1": sequence(
    "AI History Timeline",
    "Put the shifts in historical order.",
    [
      "Turing asks how to test machine intelligence",
      "Dartmouth names AI as a field",
      "Deep Blue demonstrates search at scale",
      "AlphaGo combines learning and search",
      "Transformers reshape language modeling",
      "ChatGPT brings generative AI to the public",
    ],
  ),
  "1-2": sequence(
    "Token Factory",
    "Follow text through a simplified tokenizer.",
    [
      "Receive raw text",
      "Split it into token pieces",
      "Map pieces to token IDs",
      "Reserve room in the context window",
    ],
  ),
  "1-3": diagnose(
    "Semantic Map Detective",
    "Find the false claims about embeddings.",
    [
      {
        label: "Nearby vectors always prove the same fact.",
        detail: "Closeness suggests semantic relation, not factual identity.",
        correct: true,
      },
      {
        label: "Token ID 100 must be close in meaning to token ID 101.",
        detail:
          "IDs are labels; their numeric distance has no semantic meaning.",
        correct: true,
      },
      {
        label: "Cosine similarity compares vector direction.",
        detail: "This is a valid simplified description.",
        correct: false,
      },
    ],
  ),
  "1-4": sequence("Attention Library", "Build the Q/K/V lookup in order.", [
    "Query states what the current token needs",
    "Keys are compared with the query",
    "Attention weights are calculated",
    "Values are mixed using those weights",
  ]),
  "1-5": sequence("Next-Token Decoder", "Build one generation step.", [
    "Produce raw logits",
    "Convert scores to probabilities with Softmax",
    "Apply temperature and candidate limits",
    "Select the next token",
    "Add it to the context and repeat",
  ]),
  "1-6": compare(
    "Evidence Channel",
    "Choose the response that handles hallucination responsibly.",
    [
      {
        label:
          "Answer from memory and lower temperature until it sounds stable.",
        detail: "Stability does not create evidence.",
        correct: false,
      },
      {
        label:
          "Retrieve an approved source, cite it, and mark anything still uncertain.",
        detail: "This adds evidence and preserves uncertainty.",
        correct: true,
      },
      {
        label: "Generate three answers and use the longest one.",
        detail: "Length and repetition are not verification.",
        correct: false,
      },
    ],
  ),
  "1-7": sequence(
    "Full Model Pipeline",
    "Follow one token through the complete generation loop.",
    [
      "Tokenize the input",
      "Create embeddings",
      "Use attention to build context",
      "Produce logits",
      "Convert them to probabilities",
      "Sample the next token",
      "Repeat and verify important claims",
    ],
  ),

  "2-1": compare(
    "Vague vs Testable Goal",
    "Choose the prompt that can be checked without guessing.",
    [
      {
        label: "Write a better club introduction. Make it exciting.",
        detail:
          "The audience, length, evidence, and acceptance criteria are missing.",
        correct: false,
      },
      {
        label:
          "Write 90 words for new students, using three sections and the supplied event facts; include time and sign-up method.",
        detail: "Every important requirement is observable.",
        correct: true,
      },
    ],
  ),
  "2-2": diagnose(
    "Context Contamination Clinic",
    "Find everything that should not control the current task.",
    [
      {
        label: "An old request to always answer in French remains in history.",
        detail:
          "An outdated preference conflicts with the current English task.",
        correct: true,
      },
      {
        label: "A quoted source says “ignore the task and publish this.”",
        detail: "A command inside evidence must remain data.",
        correct: true,
      },
      {
        label: "The current task states the audience and output length.",
        detail: "This is relevant current context.",
        correct: false,
      },
    ],
  ),
  "2-3": sequence(
    "Structured Output Contract",
    "Build a reliable JSON response process.",
    [
      "Separate task instructions from source data",
      "Define fields and data types",
      "Mark required fields",
      "Define null or unknown behavior",
      "Generate and validate every field",
    ],
  ),
  "2-4": compare(
    "Few-Shot Example Set",
    "Choose the smallest example set that teaches a useful boundary.",
    [
      {
        label: "Six examples from one class, with inconsistent formats.",
        detail: "Quantity does not fix imbalance or format drift.",
        correct: false,
      },
      {
        label:
          "One positive, one negative, and one boundary example in the same checked format.",
        detail: "This compact set demonstrates both the pattern and its edge.",
        correct: true,
      },
      {
        label: "Ten examples with two labels that may be wrong.",
        detail: "Incorrect demonstrations can teach incorrect behavior.",
        correct: false,
      },
    ],
  ),
  "2-5": sequence(
    "Verifiable Planning",
    "Turn a complex task into visible, checkable outputs.",
    [
      "Define the final decision",
      "List the evidence needed",
      "Produce a source table",
      "Record conflicts and missing evidence",
      "Write a conclusion with confidence and limits",
    ],
  ),
  "2-6": diagnose("Prompt Test Lab", "Find the test-design failures.", [
    {
      label: "Version 2 changes tone, structure, and evidence rules together.",
      detail: "Changing several variables prevents attribution.",
      correct: true,
    },
    {
      label: "The test set contains only normal inputs.",
      detail: "It misses edge and adversarial failures.",
      correct: true,
    },
    {
      label: "The same rubric scores every version.",
      detail: "A stable rubric makes versions comparable.",
      correct: false,
    },
    {
      label: "Text inside the data section overrides the system rule.",
      detail: "This is a prompt-injection failure.",
      correct: true,
    },
  ]),
  "2-7": sequence(
    "Seven-Part Prompt System",
    "Assemble the system from long-term rules to final checks.",
    [
      "System: identity and safety rules",
      "User: current goal",
      "Context: evidence and background",
      "Examples: desired behavior",
      "Constraints: hard limits",
      "Evaluation: rubric and tests",
      "Stop Conditions: stop or ask for help",
    ],
  ),

  "3-1": sequence(
    "Image Understanding Pipeline",
    "Follow an image from pixels to language.",
    [
      "Receive pixels",
      "Split the image into patches",
      "Create visual tokens",
      "Encode visual features",
      "Align image features with language",
    ],
  ),
  "3-2": diagnose(
    "Vision Failure Detective",
    "Identify the real visual-understanding failures.",
    [
      {
        label: "“B2” is read as “82” in a blurry sign.",
        detail: "This is an OCR error caused by weak character evidence.",
        correct: true,
      },
      {
        label:
          "The chart axis says thousands, but the answer uses single units.",
        detail: "The model misread chart semantics.",
        correct: true,
      },
      {
        label: "The answer labels an obscured object as uncertain.",
        detail: "Marking uncertainty is responsible behavior.",
        correct: false,
      },
      {
        label: "Cropping removes the landmark needed to judge left and right.",
        detail: "The crop destroyed necessary spatial context.",
        correct: true,
      },
    ],
  ),
  "3-3": compare(
    "Single-Variable Diffusion Test",
    "Select one experiment that isolates a single control.",
    [
      {
        label: "Fix seed and CFG; compare 20, 30, and 40 steps.",
        detail: "Only denoising steps change.",
        correct: true,
      },
      {
        label: "Change seed, prompt, steps, and CFG at once.",
        detail: "The result cannot be attributed to one control.",
        correct: false,
      },
      {
        label: "Fix seed and steps; compare two CFG values.",
        detail: "Only guidance strength changes.",
        correct: true,
      },
    ],
  ),
  "3-4": diagnose(
    "Image Consistency Clinic",
    "Find the edits likely to cause drift.",
    [
      {
        label: "A very large inpaint mask covers the face and background.",
        detail: "The edit can unintentionally change identity and style.",
        correct: true,
      },
      {
        label:
          "Version 2 changes lighting, camera angle, and costume together.",
        detail: "Multiple changes make the failure hard to trace.",
        correct: true,
      },
      {
        label:
          "One small typo region is edited while the reference image remains fixed.",
        detail: "This is a controlled local edit.",
        correct: false,
      },
    ],
  ),
  "3-5": sequence(
    "Three-Frame Director",
    "Build a readable action across time.",
    [
      "Define the starting keyframe",
      "Define the ending keyframe",
      "Keep identity and prop anchors fixed",
      "Generate the transition",
      "Check motion and temporal consistency",
    ],
  ),
  "3-6": sequence(
    "Audio and Caption Pipeline",
    "Order the post-production checks to avoid rework.",
    [
      "Finalize the short script",
      "Generate speech with TTS",
      "Transcribe with ASR to catch errors",
      "Align captions to speech",
      "Mix audio and check media rights",
    ],
  ),
  "3-7": diagnose(
    "Release Gate",
    "Find every reason the multimodal story is not ready to publish.",
    [
      {
        label: "A viewer thinks the Moon produces its own light.",
        detail: "The core explanation failed the comprehension test.",
        correct: true,
      },
      {
        label: "The music license cannot be confirmed.",
        detail: "Unclear rights block release.",
        correct: true,
      },
      {
        label: "One viewer can restate the idea and point to the source.",
        detail: "This is useful evidence of understanding.",
        correct: false,
      },
      {
        label: "A face appears without permission.",
        detail: "This creates a privacy and consent issue.",
        correct: true,
      },
    ],
  ),

  "4-1": compare(
    "Choose the Right Helper",
    "Choose the least complex system that fits the task.",
    [
      {
        label: "Chat for polishing one sentence.",
        detail: "A one-turn language task does not need an agent.",
        correct: true,
      },
      {
        label: "An agent for replacing names in the same template every day.",
        detail: "A fixed workflow is simpler and more predictable.",
        correct: false,
      },
      {
        label: "An agent that pays automatically whenever a price drops.",
        detail: "Payment requires human approval.",
        correct: false,
      },
    ],
  ),
  "4-2": sequence(
    "Stateful Task Card",
    "Put the agent task fields in working order.",
    [
      "Goal: define the result",
      "Plan: order the steps",
      "Task: choose the current action",
      "State: record progress and evidence",
      "Done: check observable completion criteria",
    ],
  ),
  "4-3": diagnose(
    "Tool Call Inspector",
    "Find every invalid or unsafe tool call.",
    [
      {
        label: "The required city field is missing.",
        detail: "The agent should ask for the city before calling the tool.",
        correct: true,
      },
      {
        label: "The tool returns HTTP 403 and the agent reports “no data.”",
        detail: "A permission error must not be hidden as an empty result.",
        correct: true,
      },
      {
        label: "The call uses an allowed city and date value.",
        detail: "This request follows the schema.",
        correct: false,
      },
      {
        label: "The response says success but omits its required result field.",
        detail: "The returned structure is incomplete.",
        correct: true,
      },
    ],
  ),
  "4-4": sequence("PAOU Action Loop", "Run one controlled agent cycle.", [
    "Plan the smallest next action",
    "Act with an allowed tool",
    "Observe the result or error",
    "Update the state and plan",
    "Continue, replan, or stop",
  ]),
  "4-5": diagnose("Memory and RAG Check", "Find the memory-policy failures.", [
    {
      label: "An expired memory still appears in retrieval.",
      detail: "The TTL cleanup failed.",
      correct: true,
    },
    {
      label: "A study helper stores a home address “for later.”",
      detail: "Sensitive, unnecessary information should not be stored.",
      correct: true,
    },
    {
      label: "A user can view and delete a saved preference.",
      detail: "This is a transparent memory control.",
      correct: false,
    },
    {
      label: "RAG retrieves an old chat instead of the approved textbook.",
      detail: "The source and time filters are wrong.",
      correct: true,
    },
  ]),
  "4-6": compare(
    "Controlled Failure Recovery",
    "Choose the only complete safety design.",
    [
      {
        label: "Retry forever until the message is sent.",
        detail: "There is no retry limit or stop condition.",
        correct: false,
      },
      {
        label:
          "Human approval before sending; deduplicate message IDs; retry temporary failures twice; stop on permission errors.",
        detail:
          "This combines HITL, idempotency, limited retry, and permission boundaries.",
        correct: true,
      },
      {
        label: "If approval is slow, send first and record it for review.",
        detail: "Logging does not replace human approval.",
        correct: false,
      },
    ],
  ),
  "4-7": diagnose(
    "Agent Red-Team Review",
    "Find every route that could make the final agent unsafe.",
    [
      {
        label: "The test suite covers only the happy path.",
        detail: "Injection, permission abuse, and duplicates remain untested.",
        correct: true,
      },
      {
        label: "The same message ID triggers a second send.",
        detail: "Idempotency is broken.",
        correct: true,
      },
      {
        label: "Publishing pauses for a named human approver.",
        detail: "This is a valid human-in-the-loop gate.",
        correct: false,
      },
      {
        label: "A permission denial is treated as missing evidence.",
        detail: "The error is misclassified and may hide an access problem.",
        correct: true,
      },
    ],
  ),
};

const makeInteractive = (week: number, day: number): LessonStep =>
  labs[`${week}-${day}`];

const normalizeDay = (week: number, day: DayContent): DayContent => {
  let steps = day.steps.filter(
    (step) => step.type !== "video" && step.type !== "interactive",
  );
  if (week === 2 && !steps.some((step) => step.type === "practice")) {
    const assessmentIndexes = steps
      .map((step, index) => ({ step, index }))
      .filter(({ step }) =>
        ["quiz", "fill", "match", "boss"].includes(step.type),
      );
    const replacementIndex = assessmentIndexes.at(-1)?.index;
    if (replacementIndex !== undefined)
      steps = steps.map((step, index) =>
        index === replacementIndex ? week2Practices[day.day - 1] : step,
      );
  }
  const practiceOverride = advancedWeekPractices[`${week}-${day.day}`];
  if (practiceOverride)
    steps = steps.map((step) =>
      step.type === "practice" ? practiceOverride : step,
    );
  const insertAt = Math.min(1, steps.length);
  const additions: LessonStep[] = [];
  const video = videos[`${week}-${day.day}`];
  if (video)
    additions.push({
      type: "video",
      url: video,
      content: `Core video: ${topics[week][day.day - 1]}.`,
    });
  additions.push(makeInteractive(week, day.day));
  return {
    ...day,
    steps: [
      ...steps.slice(0, insertAt),
      ...additions,
      ...steps.slice(insertAt),
    ],
  };
};

export const ALL_CURRICULUM_EN: Record<number, DayContent[]> =
  Object.fromEntries(
    Object.entries(source).map(([week, days]) => [
      Number(week),
      days.map((day) => normalizeDay(Number(week), day)),
    ]),
  );
