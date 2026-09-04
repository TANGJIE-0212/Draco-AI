import { DayContent } from '../../../types';

export const v3enw4d1Data: DayContent = {
  "day": 1,
  "title": "Summon Clone Skills: Chat / Workflow / Agent",
  "shards": 30,
  "steps": [
    {
      "type": "theory",
      "content": "🐉 **Three Layers: Chat, Workflow, Agent**\n\nChat handles one-turn Q&A. Workflow automates fixed sequences. Agent works in uncertain situations with plan-execute-correct loops. Core chain: **Goal → Plan → Tool → Act → Check → Update or Stop**."
    },
    {
      "type": "video",
      "url": "",
      "content": "Video: today's concept and safe operation demo"
    },
    {
      "type": "theory",
      "content": "💬 **Theory Card | Watch the action chain**\nA chatbot is great for explaining one concept or polishing one sentence. An Agent is better for tasks like \"prepare this week's astronomy club checklist\": it plans research, organizes data, and verifies details step by step."
    },
    {
      "type": "theory",
      "content": "🧭 **Theory Card | Clear goals first**\n\"Help me make this better\" is not a goal. Better: \"Write a 150-word draft for Friday's stargazing event, include 3 observation targets with sources, draft only, no sending.\""
    },
    {
      "type": "theory",
      "content": "🛡️ **Theory Card | Safety red lines**\nDo not collect sensitive data like home addresses, ID numbers, contact details, exact location, or passwords. Payments, sending, deleting, and publishing must require human confirmation."
    },
    {
      "type": "theory",
      "content": "🔍 **Theory Card | Reliability means checking**\nWhen sources conflict, evidence is missing, or a request goes out of scope, the Agent should check, revise the plan, or stop and report."
    },
    {
      "type": "quiz",
      "question": "1. What is the most reliable sign that a helper is acting as an Agent?",
      "options": [
        "It can generate very long answers in one try.",
        "It remembers one previous chat turn.",
        "It can plan steps around a goal, use allowed tools, and check results.",
        "It has web search enabled."
      ],
      "correct": 2
    },
    {
      "type": "quiz",
      "question": "2. Your stargazing club needs materials for Friday. Which setup best fits a controlled Agent?",
      "options": [
        "Let it collect as much as possible from the open web first.",
        "Let it extract targets from two approved public sources and draft a note.",
        "Let it draft, choose audience, and auto-send before deadline.",
        "Let it rewrite last week's content without checking this week's sources."
      ],
      "correct": 1
    },
    {
      "type": "quiz",
      "question": "3. The Agent finished a poster draft and suggests \"publish now\". What should happen next?",
      "options": [
        "Let it decide by predicted clicks.",
        "Generate 3 versions and let it publish the most attractive one.",
        "Auto-schedule posting once no personal data is visible.",
        "A human reviews content, image rights, and audience, then decides."
      ],
      "correct": 3
    },
    {
      "type": "quiz",
      "question": "4. Which is a clear, testable Agent goal?",
      "options": [
        "Create an attractive event plan and fill missing info on your own.",
        "Collect all astronomy news this month and pick the most valuable.",
        "Use two public astronomy sources to write a 150-word reminder draft with citations.",
        "Choose event time, budget, and participant list based on preferences."
      ],
      "correct": 2
    },
    {
      "type": "quiz",
      "question": "5. The Agent finds telescope accessories in three shops. What is the safest design?",
      "options": [
        "Compare price/spec/return policy and output recommendations; human confirms payment.",
        "Auto-order if price is inside budget, then leave a log for review.",
        "Collect all participants' addresses first for shipping sort.",
        "Watch prices continuously and auto-buy below threshold."
      ],
      "correct": 0
    },
    {
      "type": "quiz",
      "question": "6. Two trusted pages disagree on meteor shower peak date. What should the Agent do?",
      "options": [
        "Choose the newest page and hide the difference.",
        "Mark the conflict, check date and region scope, then report and stop if unresolved.",
        "Write both dates and leave readers to decide.",
        "Keep searching until all pages agree exactly."
      ],
      "correct": 1
    },
    {
      "type": "fill",
      "question": "7. In the core action model, after checking, the system should \"update or ___\".",
      "parts": [
        "Fill in:",
        "___",
        "."
      ],
      "options": [
        "stop",
        "expand tools",
        "store memory"
      ],
      "correct": "stop"
    },
    {
      "type": "fill",
      "question": "8. Before approval, the best output for a club announcement is a ___ .",
      "parts": [
        "Fill in:",
        "___",
        "."
      ],
      "options": [
        "reviewable draft",
        "already sent notice",
        "public link"
      ],
      "correct": "reviewable draft"
    },
    {
      "type": "fill",
      "question": "9. Listing which websites/files/functions are allowed ahead of time is setting a tool ___ .",
      "parts": [
        "Fill in:",
        "___",
        "."
      ],
      "options": [
        "whitelist",
        "priority",
        "version log"
      ],
      "correct": "whitelist"
    },
    {
      "type": "quiz",
      "question": "10. A draft needs members' city but not street address. How should the Agent collect data?",
      "options": [
        "Ask only for city needed for the task and explain why.",
        "Also ask for addresses in case future features need them.",
        "Infer exact location from profile photos."
      ],
      "correct": 0
    },
    {
      "type": "practice",
      "task": "11. [Controlled action chain] For a stargazing reminder, write: goal, two allowed source types, one checkpoint, and stop point. Agent can draft only, not send.",
      "rubric": "Must include a testable goal, two source types, at least one checkpoint, a draft-only stop point, and a no-send boundary. No real private data.",
      "placeholder": "Goal: ...\nAllowed sources: ...\nCheckpoint: ...\nStop point: ...",
      "minLength": 45,
      "referenceAnswer": "Goal: Write a 120-word stargazing reminder draft. Allowed sources: astronomy center public page and school event notice. Checkpoint: verify date, location, and citations. Stop point: stop after draft and wait for organizer approval."
    },
    {
      "type": "match",
      "question": "12. Match each scenario with the best helper mode:",
      "pairs": [
        {
          "left": "Explain \"apparent magnitude\" and improve one promo sentence",
          "right": "Single-turn support from a chatbot"
        },
        {
          "left": "Organize two sources, cite them, and draft an event note",
          "right": "Multi-step task for a controlled Agent"
        },
        {
          "left": "Decide whether to post the poster publicly",
          "right": "Human confirmation"
        },
        {
          "left": "Source dates conflict",
          "right": "Check, then update or stop"
        }
      ]
    },
    {
      "type": "match",
      "question": "13. Match each goal style with likely result:",
      "pairs": [
        {
          "left": "\"Write a 150-word draft with two sources, do not send\"",
          "right": "Scope and stop point are testable"
        },
        {
          "left": "\"Make the event as great as possible\"",
          "right": "Criteria are vague and hard to check"
        },
        {
          "left": "\"Decide yourself who should receive it\"",
          "right": "Crosses human decision boundaries"
        },
        {
          "left": "\"If no reliable source is found, report it\"",
          "right": "Defines an exit path for failure"
        }
      ]
    },
    {
      "type": "match",
      "question": "14. Match each permission request with proper handling:",
      "pairs": [
        {
          "left": "Read public astronomy pages to draft a reminder",
          "right": "Allow within limited scope"
        },
        {
          "left": "Access full class contact list to draft text",
          "right": "Reject unrelated permission"
        },
        {
          "left": "Complete payment while comparing prices",
          "right": "Reserve for human confirmation"
        },
        {
          "left": "Delete original sources while cleaning drafts",
          "right": "List candidates and wait for confirmation"
        }
      ]
    },
    {
      "type": "match",
      "question": "15. Match each execution signal with the best next action:",
      "pairs": [
        {
          "left": "Draft has conclusions but no citations",
          "right": "Add citations before acceptance"
        },
        {
          "left": "Output exceeds required length",
          "right": "Revise to constraints and re-check"
        },
        {
          "left": "Needs home address to continue",
          "right": "Stop and do not collect that data"
        },
        {
          "left": "All acceptance checks are satisfied",
          "right": "Stop and hand over for human review"
        }
      ]
    },
    {
      "type": "theory",
      "content": "✅ **Wrap-up**\nRemember: **Goal → Plan → Tool → Act → Check → Update or Stop**. Payments, sending, deleting, and publishing always require human confirmation."
    }
  ]
};
