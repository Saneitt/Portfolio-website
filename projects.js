/* Project narratives are kept separate from presentation so claims are easy to review. */
window.PORTFOLIO_PROJECTS = {
  jarvis: {
    "title": "Personal Jarvis",
    "category": "SOFTWARE / VOICE-FIRST PRODUCT",
    "deck": "A local Windows assistant that listens naturally and works with your files, apps and calendar.",
    "role": "Product design, interaction design & implementation",
    "type": "Independent working application",
    "flow": [
        "Speak naturally",
        "Local model + tools",
        "Review consequential actions",
        "Hear the result"
    ],
    "sections": [
        [
            "From prototype to a working assistant",
            "I carried the original voice-first design into an installable Windows application. It runs a local Qwen3.5 model through Ollama, transcribes with faster-whisper and speaks with Kokoro. Conversation, speech and system operations stay on the PC."
        ],
        [
            "Keep the conversation moving",
            "The wake phrase is needed from standby; natural follow-ups remain open after a reply. Short sentences are grouped and audio is prepared ahead of playback to avoid clipped endings and gaps. A voice-only preview helped distinguish model quality from playback problems during testing."
        ],
        [
            "Useful work with visible control",
            "Jarvis can work with files, open apps, inspect the computer, control media, run approved PowerShell, remember explicit preferences and manage local events and reminders. A month calendar and day agenda expose the same persistent data the assistant can read and change."
        ],
        [
            "Designing for the hardware",
            "The tested configuration uses 16 GB RAM and a 4 GB RTX 3050. A language-only Qwen3.5 4B profile leaves more GPU memory for conversation. Setup offers smaller and larger local models so the tools and interface can stay useful when the hardware changes."
        ],
        [
            "A complete Windows handoff",
            "The native window has its own icon and Start menu entry. Closing it shuts down the backend and model runners, with kernel ownership protecting against orphaned services after a crash. The download includes setup scripts and a model picker, rather than requiring developer tooling."
        ],
        [
            "What has been checked",
            "Automated checks cover calendar persistence and alerts, file operations, approval handling, speech chunking, interruption and playback. The native UI was exercised for calendar editing and actual voice output. These checks and my listening feedback are not a substitute for a broader usability study."
        ]
    ],
    "stack": "Python · FastAPI · SQLite · Ollama / Qwen3.5 · faster-whisper · Kokoro / Piper · Web Audio · JavaScript · C# / WebView2",
    "status": "Working local Windows application. The 4B profile is tested on the development laptop; other hardware tiers are setup options that need their own validation. Calendar data is local; Google/Outlook sync, external email, autonomous visual GUI control and broader usability testing remain future work. Developed with AI assistance.",
    "links": [
        [
            "See the build and design decisions",
            "experiments/jarvis/case-study.html"
        ],
        [
            "Download the Windows app",
            "https://github.com/Saneitt/personal-jarvis/releases/latest"
        ],
        [
            "Source and setup guide",
            "https://github.com/Saneitt/personal-jarvis"
        ],
        [
            "Explore the original design prototype",
            "experiments/jarvis/"
        ]
    ]
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
