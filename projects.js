/* Project narratives are kept separate from presentation so claims are easy to review. */
window.PORTFOLIO_PROJECTS = {
  jarvis: {
    title: 'Personal Jarvis', category: 'PRODUCT DESIGN / INTERACTION PROTOTYPE',
    deck: 'A personal assistant you speak to, with a workspace that makes its next move visible.',
    role: 'Concept, interaction design & prototype', type: 'Independent exploration',
    flow: ['Speak a request', 'Review the plan', 'Approve an action', 'See the receipt'],
    sections: [
      ['The question', 'What would a personal assistant feel like if voice were the starting point? I wanted the presence of a companion and the clarity of a useful instrument, centered on daily planning and actions across apps.'],
      ['The design decision', 'The conversation does not become a wall of messages. A compact schedule provides context while a visible action plan lets someone understand what will change before they approve it.'],
      ['Making trust tangible', 'The prototype explores explicit approval, cancellation, an action receipt, undo, and editable memory. Each state gives a voice interaction something concrete to return to.'],
      ['What I would test next', 'Can someone predict the assistant’s next action? Can they interrupt it and recover confidently? A focused usability study around one daily planning task is the next step before expanding the scope.']
    ],
    stack: 'HTML · CSS · JavaScript · Browser speech APIs · Local storage',
    status: 'Working interface prototype with simulated planning and actions. Calendar integrations, cross-app execution, and a live AI assistant are future work. The case study documents the concept and design decisions; it does not claim completed user research.',
    links: [['Explore the case study', 'experiments/jarvis/case-study.html'], ['Try the prototype', 'experiments/jarvis/'], ['Source on GitHub', 'https://github.com/Saneitt/personal-jarvis']]
  },
  interview: {
    title: 'InterviewEye', category: 'SOFTWARE / APPLIED AI',
    deck: 'An adaptive interview practice loop, from a resume and job description to spoken questions and a session review.',
    role: 'Full-stack development', type: 'Independent project',
    flow: ['Resume + role', 'Spoken question', 'Recorded answer', 'Feedback + adaptation'],
    sections: [
      ['The problem', 'Interview practice needs more context than a fixed list of questions. InterviewEye brings the candidate’s resume and target role into the session, then uses answer feedback to shape what comes next.'],
      ['A responsive practice loop', 'The interface exposes processing phases over WebSockets while the AI pipeline works. A PID-based controller smooths answer scores before adjusting difficulty, so a single weak answer does not abruptly change the session.'],
      ['Inside the system', 'A React interface connects to a Node/Express server, SQLite persistence, and Python workers. Resume, role, and job-description retrieval are separated using ChromaDB and sentence embeddings. Groq-hosted Llama handles question and feedback generation.'],
      ['Details that affect the experience', 'Faster-Whisper transcribes answers and Piper speaks the questions. A short leading silence protects the first spoken word from clipping. Voice and video analysis feed an experimental session review alongside answer feedback.']
    ],
    stack: 'React · Vite · Tailwind · Recharts · Node.js · WebSockets · SQLite · Python · ChromaDB · Faster-Whisper · Piper · MediaPipe · Librosa',
    status: 'Independent prototype. Voice and facial signals are exploratory feedback, not validated measures of confidence, emotion, or interview performance.',
    links: [['Explore the source', 'https://github.com/Saneitt/InterviewEye']]
  },
  eco: {
    title: 'EcoSpectre', category: 'MOBILE / PRODUCT THINKING',
    deck: 'Making sustainability information easier to act on, at the moment someone is deciding what to use.',
    role: 'Mobile development & interaction design', type: 'Independent project',
    flow: ['Capture a product', 'Understand materials', 'Review guidance', 'Save a decision'],
    sections: [
      ['The problem', 'Information about packaging and disposal is often separated from the moment it is useful. EcoSpectre starts with a camera capture and brings an AI-generated assessment into a short, focused decision flow.'],
      ['Clarity before depth', 'The result presents a concise first impression with an expandable breakdown. Someone can inspect the detail, then record a consume-or-reject decision with a swipe instead of navigating another form.'],
      ['Keeping the flow moving', 'Processing states explain what is happening. Decisions save locally before background synchronization, allowing the interface to return even if a remote save fails. Retry paths, timeouts, and navigation guards cover common interruptions.'],
      ['Inside the system', 'React Native and Expo power the mobile app, with Zustand for state and Reanimated for interactions. The client calls Gemini for image interpretation. A separate Express and MongoDB backend supports authentication and scan persistence.']
    ],
    stack: 'React Native · Expo · TypeScript · React Navigation · Zustand · Reanimated · Gemini · Express · MongoDB',
    status: 'Experimental product assessment. Scores and disposal suggestions are AI-generated and have not been independently validated as environmental guidance.',
    links: [['Explore the source', 'https://github.com/Saneitt/EcoSpectre']]
  },
  qa: {
    title: 'QuantumQA', category: 'DEVELOPER TOOLS / APPLIED AI',
    deck: 'A reviewable path from product documentation to test cases and downloadable Selenium scripts.',
    role: 'RAG pipeline & application development', type: 'Assessment project',
    flow: ['Documentation + HTML', 'Retrieve context', 'Review test cases', 'Generate scripts'],
    sections: [
      ['The problem', 'Turning requirements into tests involves repeatedly moving between documentation, expected behavior, and the interface itself. QuantumQA brings those inputs into a staged generation workflow.'],
      ['Keep the developer in the loop', 'Generated test cases retain source references. The developer reviews and selects cases before generating scripts, keeping the transition from a requirement to executable code visible.'],
      ['Grounding the output', 'Documents are parsed, split, embedded, and stored in ChromaDB. Relevant passages provide context to Gemini; selectors extracted from target HTML are supplied separately to support script generation.'],
      ['A complete handoff', 'A Streamlit interface brings knowledge-base creation, case review, script generation, and ZIP download together. The result is an inspectable starting point for testing a real application.']
    ],
    stack: 'Python · Streamlit · Gemini · ChromaDB · Sentence Transformers · PyMuPDF · BeautifulSoup · Selenium',
    status: 'Built as an OceanAI assessment project. Generated cases and scripts require developer review and execution against the target application.',
    links: [['Explore the source', 'https://github.com/Saneitt/QuantumQA']]
  }
};
