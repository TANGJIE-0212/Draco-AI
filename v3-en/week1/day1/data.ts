import { DayContent } from '../../../types';

export const v3enw1d1Data: DayContent = {
  day: 1,
  title: 'A Brief History of AI: From the Turing Test to Generative AI',
  shards: 1,
  steps: [
    {
      type: 'theory',
      content:
        "Welcome to your AI learning journey. Generative AI feels new, but people have been asking whether machines can think for a long time. You do not need to memorize every year today. Focus on the big shift: AI moved from strict hand-written rules to learning from huge amounts of examples and then generating new content."
    },
    {
      type: 'video',
      url: 'https://player.bilibili.com/player.html?isOutside=true&aid=115858420663313&bvid=BV1MhiQBDEXn&cid=35259483025&p=1&autoplay=0&muted=0',
      content: 'Video: A mirror of human intelligence - a short history of AI'
    },
    {
      type: 'theory',
      content: 'Now use a few key milestones to map where AI came from. Understanding the change is more important than memorizing dates.'
    },
    {
      type: 'quiz',
      question:
        '1. In 1950, Alan Turing proposed the idea now called the Turing Test. What does it mainly test?',
      options: [
        'Whether a human judge can tell machine responses from human responses in text conversation',
        'Whether a machine can do math faster than all humans',
        'Whether a machine can build another machine by itself'
      ],
      correct: 0
    },
    {
      type: 'quiz',
      question:
        '2. Why is the 1956 Dartmouth Conference considered an important starting point in AI history?',
      options: [
        'It helped turn "Artificial Intelligence" into a named field with shared research goals',
        'It produced the first machine proven to have consciousness',
        'It was the first event to prove computers could connect to the internet'
      ],
      correct: 0
    },
    {
      type: 'quiz',
      question: '3. How did expert systems in the late 20th century mostly work?',
      options: [
        'They learned patterns only by themselves from huge data',
        'They made decisions using if-then rules written by humans',
        'They guessed randomly and kept lucky answers'
      ],
      correct: 1
    },
    {
      type: 'quiz',
      question: '4. Why did AI go through an "AI winter" in history?',
      options: [
        'Early promises were too high for the data, computing power, and methods available at the time',
        'Researchers agreed machines could never compute',
        'After the internet appeared, people no longer needed AI'
      ],
      correct: 0
    },
    {
      type: 'fill',
      question:
        '5. In 1997, IBM\'s ___ defeated world chess champion Garry Kasparov.',
      parts: ['The IBM system that beat Kasparov in 1997 was', '___', '.'],
      options: ['Deep Blue', 'AlphaGo', 'ChatGPT'],
      correct: 'Deep Blue'
    },
    {
      type: 'quiz',
      question:
        '6. AlexNet stood out in image recognition in 2012. Which direction did this help bring back strongly?',
      options: ['Expert systems', 'Deep learning', 'Mechanical calculators'],
      correct: 1
    },
    {
      type: 'quiz',
      question:
        '7. In 2016, which event showed the public that deep learning could handle very complex strategy problems?',
      options: [
        'Turing published "Computing Machinery and Intelligence"',
        'AlphaGo defeated Lee Sedol',
        'The Dartmouth Conference was held'
      ],
      correct: 1
    },
    {
      type: 'quiz',
      question:
        '8. Which approach introduced in the 2017 paper "Attention Is All You Need" later became a key foundation for GPT-style models?',
      options: [
        'Expert systems, which mainly encode knowledge as fixed if-then rules',
        'Convolutional neural networks, which mainly use local filters to extract image features',
        'Transformers, which use self-attention to connect information across different input positions'
      ],
      correct: 2
    },
    {
      type: 'match',
      question: '9. Match each AI milestone to the right year and description.',
      pairs: [
        { left: '1950', right: 'Turing proposed a famous test idea for machine intelligence' },
        { left: '1956', right: 'Dartmouth helped establish AI as a research field' },
        { left: '1997', right: 'Deep Blue defeated a world chess champion' },
        { left: '2016', right: 'AlphaGo defeated Lee Sedol' }
      ]
    },
    {
      type: 'quiz',
      question: '10. Why did AI grow rapidly again in the 2010s?',
      options: [
        'Large datasets, stronger computing power, and better algorithms worked together',
        'Only because the name "AI" became popular again',
        'Because all software switched back to expert systems'
      ],
      correct: 0
    },
    {
      type: 'match',
      isBoss: true,
      question: '11. Match each stage of AI development to its main feature.',
      pairs: [
        { left: 'Symbolic AI and expert systems', right: 'Relied on human-written knowledge and rules' },
        { left: 'Machine learning', right: 'Found patterns from data' },
        { left: 'Deep learning', right: 'Used multi-layer neural networks to learn complex features' },
        { left: 'Generative AI', right: 'Generated text, images, and more from learned patterns' }
      ]
    },
    {
      type: 'quiz',
      question: '12. ChatGPT drew wide attention in 2022. What change does this best represent?',
      options: [
        'AI jumped from fixed rules directly into conscious life',
        'Generative AI reached the public through natural-language conversation',
        'AI could process numbers for the first time'
      ],
      correct: 1
    },
    {
      type: 'quiz',
      question: '13. From Deep Blue to AlphaGo, what was the key technical shift?',
      options: [
        'From mainly heavy search and handcrafted knowledge to much more learning from data and gameplay',
        'From using computers to not using computers at all',
        'From Go to chess'
      ],
      correct: 0
    },
    {
      type: 'fill',
      question:
        '14. The letter T in ChatGPT comes from the ___ architecture proposed in 2017.',
      parts: ['The T in GPT stands for', '___', '.'],
      options: ['Transformer', 'Turing Test', 'Technology'],
      correct: 'Transformer'
    },
    {
      type: 'practice',
      task:
        '15. Choose three milestones from this list: Turing Test, Dartmouth Conference, Deep Blue, AlphaGo, Transformer, ChatGPT. Put them in time order and explain what happened and why each one mattered.',
      rubric:
        'A full-score answer chooses at least three real milestones in correct order, explains both event and importance for each one, and shows the shift from rules/search/learning toward generative AI.',
      placeholder: 'For example: In 1950... This mattered because...',
      minLength: 30,
      referenceAnswer:
        'In 1950, Turing proposed a conversation-based way to discuss machine intelligence. In 1997, Deep Blue beat the world chess champion, showing the power of large-scale computation and search. In 2017, the Transformer architecture was proposed and later became a major base for large language models. In 2022, ChatGPT brought generative AI to the public through natural-language dialogue.'
    },
    {
      type: 'theory',
      content:
        'Day 1 complete. Tomorrow we will use a "word-chain" idea to see how large language models generate responses step by step, and why sounding fluent is not the same as always being correct.'
    }
  ]
};
