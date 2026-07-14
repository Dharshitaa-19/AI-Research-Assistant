// ResearchMate - Comprehensive Demo Data

window.ResearchMateData = {
  profile: {
    name: "Dr. Sarah Jenkins",
    role: "Lead AI Researcher",
    institution: "Stanford University",
    department: "Institute for Human-Centered Artificial Intelligence (HAI)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    bio: "Sarah is a cognitive computer scientist investigating human-AI collaboration. Her current research focuses on agentic workflows and interactive document synthesis.",
    interests: ["Agentic Workflows", "Human-AI Interaction", "Large Language Models", "Cognitive Computing", "Interactive Web UIs"],
    savedTopics: ["RLHF Optimizations", "Multi-Agent Protocols", "Visual-Language Grounding", "Retrieval-Augmented Generation"],
    achievements: [
      { id: 1, title: "Super Reader", desc: "Read 15 papers in one week", icon: "fa-book-open", color: "text-warning" },
      { id: 2, title: "Cite Machine", desc: "Generated 50 citations correctly", icon: "fa-quote-right", color: "text-info" },
      { id: 3, title: "AI Whisperer", desc: "Conducted 100+ AI assistant dialogs", icon: "fa-robot", color: "text-success" },
      { id: 4, title: "Note Taking Guru", desc: "Created 20 detailed research notes", icon: "fa-note-sticky", color: "text-danger" }
    ],
    badges: ["AI Architect", "Top Citator", "Methodologist"]
  },

  papers: [
    {
      id: "paper-1",
      title: "Attention Is All You Need",
      authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
      journal: "Advances in Neural Information Processing Systems (NeurIPS)",
      year: 2017,
      doi: "10.48550/arXiv.1706.03762",
      abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
      keywords: ["Transformers", "Deep Learning", "Attention Mechanism", "NLP"],
      readingStatus: "Completed",
      isFavorite: true,
      color: "#e0e7ff",
      rating: 5,
      dateAdded: "2026-06-01"
    },
    {
      id: "paper-2",
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      authors: "Patrick Lewis, Ethan Perez, Aleksandara Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela",
      journal: "arXiv Preprint",
      year: 2020,
      doi: "10.48550/arXiv.2005.11401",
      abstract: "Large pre-trained language models have been shown to store implicit knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and hence on knowledge-intensive tasks, their performance lags behind task-specific architectures. We explore Retrieval-Augmented Generation (RAG) which combines parametric and non-parametric memories.",
      keywords: ["RAG", "Information Retrieval", "Language Models", "Knowledge Representation"],
      readingStatus: "Reading",
      isFavorite: true,
      color: "#ccfbf1",
      rating: 4,
      dateAdded: "2026-06-15"
    },
    {
      id: "paper-3",
      title: "Generative Agents: Interactive Simulacra of Human Behavior",
      authors: "Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein",
      journal: "ACM Symposium on User Interface Software and Technology (UIST)",
      year: 2023,
      doi: "10.1145/3586183.3606763",
      abstract: "Credible evaluations of human behavior can empower interactive applications ranging from immersive environments to rehearsal spaces for interpersonal communication. In this paper, we introduce generative agents—computational software agents that simulate believable human behavior. Generative agents wake up, cook breakfast, head to work, discuss art, and form opinions.",
      keywords: ["Generative Agents", "Simulation", "LLM Agents", "HCI"],
      readingStatus: "Reading",
      isFavorite: false,
      color: "#fef3c7",
      rating: 5,
      dateAdded: "2026-07-02"
    },
    {
      id: "paper-4",
      title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
      authors: "Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn",
      journal: "Advances in Neural Information Processing Systems (NeurIPS)",
      year: 2023,
      doi: "10.48550/arXiv.2305.18290",
      abstract: "While large-scale unsupervised language models learn broad world knowledge and some reasoning skills, achieving precise control over their behavior is difficult. Existing methods do this by aligning models using Reinforcement Learning from Human Feedback (RLHF). We present Direct Preference Optimization (DPO), a simple, stable alternative to RLHF.",
      keywords: ["DPO", "RLHF", "Alignment", "Fine-Tuning"],
      readingStatus: "Unread",
      isFavorite: false,
      color: "#fce7f3",
      rating: 3,
      dateAdded: "2026-07-10"
    },
    {
      id: "paper-5",
      title: "LoRA: Low-Rank Adaptation of Large Language Models",
      authors: "Edward J. Hu, Yuxin Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen",
      journal: "International Conference on Learning Representations (ICLR)",
      year: 2022,
      doi: "10.48550/arXiv.2106.09685",
      abstract: "An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to particular tasks or domains. As we pre-train larger models, full fine-tuning becomes less feasible. We propose Low-Rank Adaptation (LoRA), which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.",
      keywords: ["LoRA", "Parameter-Efficient Fine-Tuning", "PEFT", "Adaptation"],
      readingStatus: "Completed",
      isFavorite: true,
      color: "#f3e8ff",
      rating: 4,
      dateAdded: "2026-05-20"
    }
  ],

  notes: [
    {
      id: "note-1",
      title: "RAG vs Long-Context LLMs",
      content: "Need to structure a comprehensive analysis comparing RAG systems with infinite/long-context models like Gemini 1.5. Key metrics should be latency, costs, recall accuracy in needle-in-a-haystack tasks, and freshness of updated knowledge.\n\nPros of RAG: cost efficiency, hot-swappable knowledge, explicit citation tracking.\nPros of Long-Context: zero indexing required, handles semantic synthesis across document links better.",
      date: "2026-07-13",
      pinned: true,
      color: "note-indigo",
      tags: ["RAG", "Research Design"]
    },
    {
      id: "note-2",
      title: "PEFT Strategy for Local Deployments",
      content: "For local deployments (e.g., Apple Silicon or edge cards), LoRA represents the gold standard. Rank r=8 or r=16 seems optimal with alpha=32. We need to evaluate whether QLoRA (4-bit quantization) is suitable for low-latency coding tasks or if accuracy drops too significantly on syntax checks.",
      date: "2026-07-12",
      pinned: true,
      color: "note-emerald",
      tags: ["LoRA", "Fine-Tuning"]
    },
    {
      id: "note-3",
      title: "Literature Gap on Multi-Agent Comm",
      content: "Current research focuses heavily on centralized routing (e.g., AutoGen or CrewAI managers). There is a significant gap in peer-to-peer unstructured agent negotiations, where nodes dynamically delegate sub-tasks and merge responses without a central planner. Check literature in distributed networks.",
      date: "2026-07-08",
      pinned: false,
      color: "note-amber",
      tags: ["Literature Review", "Agents"]
    },
    {
      id: "note-4",
      title: "Draft Outline: NeurIPS Paper",
      content: "1. Abstract (Focus on dynamic topology)\n2. Introduction (Current limitations of static agent configurations)\n3. Related Work (Swarm intelligence, actor-model)\n4. Proposed Framework (ADAMS: Adaptive Agent Media Swarm)\n5. Evaluation (Multi-turn coding benchmarks and debate challenges)",
      date: "2026-07-05",
      pinned: false,
      color: "note-rose",
      tags: ["NeurIPS", "Writing"]
    }
  ],

  chats: [
    {
      id: "chat-1",
      title: "Transformer Math Breakdown",
      pinned: true,
      messages: [
        { sender: "user", text: "Can you break down the mathematical formulation of Self-Attention?", time: "09:40 AM" },
        {
          sender: "ai",
          text: "Self-Attention in the Transformer is calculated as:\n\n$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$\n\nWhere:\n1. **$Q$ (Query)**: matrix representing queries of dimension $d_k$.\n2. **$K$ (Key)**: matrix representing keys of dimension $d_k$.\n3. **$V$ (Value)**: matrix representing values of dimension $d_v$.\n4. **$\\sqrt{d_k}$**: scale factor to avoid extremely small gradients in the softmax due to large dot products.",
          time: "09:41 AM"
        }
      ]
    },
    {
      id: "chat-2",
      title: "RAG Evaluation Frameworks",
      pinned: false,
      messages: [
        { sender: "user", text: "What is the best way to evaluate RAG applications?", time: "Yesterday" },
        {
          sender: "ai",
          text: "The current gold standard for RAG evaluation is the **Ragas** framework or **TruLens**. They focus on the 'RAG Triad':\n1. **Context Relevance**: Is the retrieved context relevant to the query?\n2. **Faithfulness**: Is the response generated relying *only* on the context? (No hallucinations)\n3. **Answer Relevance**: Does the final response actually answer the user's question directly?",
          time: "Yesterday"
        }
      ]
    }
  ],

  suggestedPrompts: [
    "Explain the contribution of LoRA in PEFT",
    "Compare APA 7th edition and Harvard citation style formatting",
    "Identify research gaps in Generative Agent simulations",
    "Draft a methodological outline for evaluating LLM agent logic loops"
  ],

  planner: {
    dailyGoals: [
      { id: 1, text: "Read 2 pages of Generative Agents paper", done: true },
      { id: 2, text: "Write summary section for RAG notes", done: false },
      { id: 3, text: "Run local LoRA script validation", done: false }
    ],
    weeklyGoals: [
      { id: 1, text: "Complete literature grid comparing 5 PEFT methods", done: true },
      { id: 2, text: "Publish notes draft onto local repo", done: false },
      { id: 3, text: "Outline methodology section for proposal", done: false }
    ],
    milestones: [
      { id: 1, title: "Proposal Draft Approval", date: "July 20, 2026", progress: 80 },
      { id: 2, title: "Dataset Generation", date: "August 10, 2026", progress: 30 },
      { id: 3, title: "NeurIPS Submission Deadline", date: "Sept 15, 2026", progress: 10 }
    ]
  },

  kanbanTasks: {
    todo: [
      { id: "task-101", title: "Read DPO paper", desc: "Understand alignment difference vs RLHF", priority: "High", comments: 2, date: "Jul 18" },
      { id: "task-102", title: "Format references", desc: "Clean up BibTeX entries for draft", priority: "Low", comments: 0, date: "Jul 25" }
    ],
    inprogress: [
      { id: "task-103", title: "Implement RAG pipeline", desc: "Setup vector store using ChromaDB", priority: "Medium", comments: 5, date: "Jul 15" },
      { id: "task-104", title: "Draft Methodology", desc: "Section 3 of the main proposal", priority: "High", comments: 3, date: "Jul 16" }
    ],
    completed: [
      { id: "task-105", title: "Run baseline models", desc: "Evaluate Llama-3-8B baseline metrics", priority: "Medium", comments: 1, date: "Jul 10" }
    ]
  },

  calendarEvents: [
    { id: 1, title: "Lab Meeting: Agent Architecture", date: "2026-07-15", time: "10:00 AM", type: "meeting", desc: "Discussing autonomous agent routing topologies" },
    { id: 2, title: "RAG Evaluation Draft Due", date: "2026-07-17", time: "05:00 PM", type: "deadline", desc: "Submit progress logs to Advisor Jenkins" },
    { id: 3, title: "IEEE Access Camera Ready Due", date: "2026-07-22", time: "11:59 PM", type: "deadline", desc: "Final PDF formatting alignment checks" },
    { id: 4, title: "Reviewer Reply Deadline", date: "2026-07-28", time: "09:00 AM", type: "meeting", desc: "Drafting comments to rebuttal reviews" }
  ],

  history: [
    { id: 1, action: "Searched globally for 'Self Attention'", category: "search", time: "10 mins ago" },
    { id: 2, action: "Opened PDF Viewer for 'Generative Agents'", category: "view", time: "30 mins ago" },
    { id: 3, action: "Generated Harvard Citation for 'LoRA'", category: "citation", time: "2 hours ago" },
    { id: 4, action: "Modified Note 'RAG vs Long-Context'", category: "edit", time: "1 day ago" },
    { id: 5, action: "Added paper 'Direct Preference Optimization'", category: "upload", time: "3 days ago" }
  ],

  bookmarks: [
    { id: 1, title: "Vector Database Comparisons", type: "External Resource", url: "https://example.com/vector-db" },
    { id: 2, title: "RAG Evaluation Metrics Cheat Sheet", type: "PDF Reference", url: "https://example.com/rag-eval" },
    { id: 3, title: "Markdown Math Rendering Rules", type: "Writing Guide", url: "https://example.com/math-md" }
  ],

  summaries: {
    "paper-1": {
      short: "Introduces the Transformer, a sequence transduction model relying entirely on self-attention mechanisms, replacing recurrence and convolutions.",
      detailed: "The Transformer structure is purely attention-based. By utilizing multi-head self-attention, the model learns dependencies between words regardless of distance in the sequence, allowing massive parallelization. It achieves state-of-the-art results on English-to-German and English-to-French translation benchmarks with orders of magnitude shorter training times.",
      findings: "Eliminating sequential processing allows parallel computation across all tokens. Self-attention layers exhibit $O(1)$ path length between distant positions, reducing the vanishing gradient problem in long-sequence tracking.",
      methodology: "Encoder-Decoder structure. The encoder contains N=6 identical layers, each with multi-head self-attention and position-wise feed-forward networks. The decoder adds a masked multi-head attention layer over the encoder outputs. Trained using Adam optimizer, label smoothing, and dropout.",
      conclusion: "Self-attention is a highly expressive, parallelizable, and efficient architectural core that outperforms CNNs/RNNs in sequence modeling.",
      advantages: "Drastic training speedups, superior global dependency modeling, and easily explainable attention weights.",
      limitations: "Quadratic memory complexity $O(n^2)$ relative to sequence length, making long documents expensive to parse.",
      future: "Adapting local or sparse attention limits to handle massive infinite contexts at reduced complexity."
    },
    "paper-2": {
      short: "Combines pre-trained parametric language models with non-parametric dense vector index lookup databases for dynamic information retrieval.",
      detailed: "RAG models retrieve document representations using dense vector queries and use them as auxiliary inputs when generating responses. The architecture uses a pre-trained sequence-to-sequence model (like BART) and a dense passage retriever (DPR) to locate relevant materials. The combination ensures highly accurate and factual outputs for open-domain QA.",
      findings: "Retrieving relevant documents on the fly significantly reduces hallucination and boosts performance on knowledge-bound tasks, even beating 500x larger parameter-only models.",
      methodology: "Dual-encoder architecture using Dense Passage Retrieval (DPR) to fetch top-k document passages, concatenated with user inputs, processed by a sequence-to-sequence generator.",
      conclusion: "Integrating external retrieval with generative capability creates a more factual, inspectable, and dynamically updateable AI agent.",
      advantages: "Hot-swappable knowledge base, provides clear reference links, and reduces hallucination frequencies.",
      limitations: "Dependent on retriever quality; retrieval latencies add computational overhead.",
      future: "End-to-end joint training of retriever and generator with multi-step reasoning chains."
    }
  },

  litReview: {
    comparisons: [
      { id: 1, title: "Attention Is All You Need", authors: "Vaswani et al.", method: "Self-Attention", gap: "Quadratic scaling overhead on long sequences", relevance: "Core architecture foundation" },
      { id: 2, title: "Retrieval-Augmented Gen", authors: "Lewis et al.", method: "External Vector Search + BART", gap: "Dependent on search retrieval accuracy, high query latency", relevance: "Dynamic knowledge access" },
      { id: 3, title: "Generative Agents", authors: "Park et al.", method: "Memory Stream + Reflexive Planning", gap: "Compounding simulation drift, high token consumption cost", relevance: "Interactive human simulacra" },
      { id: 4, title: "Direct Preference Opt.", authors: "Rafailov et al.", method: "Implicit Reward Closed-form Optimization", gap: "Sensitivities to out-of-distribution prompts", relevance: "Model alignment model scaling" }
    ],
    findings: "The current literature highlights a shift from training massive parameters to optimizing prompt pipelines, memory structures, and retrieval queries. PEFT adaptations like LoRA enable low-compute adjustments, while alignment models like DPO bypass unstable RL reward models.",
    gaps: "Dynamic real-time database updating during multi-agent conversations remains under-explored, with most models relying on static vector embeddings created offline."
  },

  citations: {
    "paper-1": {
      apa: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017). Attention is all you need. In Advances in Neural Information Processing Systems (pp. 5998-6008).",
      ieee: "A. Vaswani et al., \"Attention is all you need,\" in Advances in Neural Information Processing Systems, 2017, pp. 5998-6008.",
      mla: "Vaswani, Ashish, et al. \"Attention is all you need.\" Advances in Neural Information Processing Systems, 2017, pp. 5998-6008.",
      chicago: "Vaswani, Ashish, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin. \"Attention is all you need.\" In Advances in Neural Information Processing Systems, pp. 5998-6008. 2017.",
      harvard: "Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, Ł. and Polosukhin, I., 2017. Attention is all you need. In Advances in Neural Information Processing Systems (pp. 5998-6008)."
    },
    "paper-2": {
      apa: "Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W. T., Rocktäschel, T., Riedel, S., & Kiela, D. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. arXiv preprint arXiv:2005.11401.",
      ieee: "P. Lewis et al., \"Retrieval-augmented generation for knowledge-intensive NLP tasks,\" arXiv preprint arXiv:2005.11401, 2020.",
      mla: "Lewis, Patrick, et al. \"Retrieval-augmented generation for knowledge-intensive NLP tasks.\" arXiv preprint arXiv:2005.11401 (2020).",
      chicago: "Lewis, Patrick, Ethan Perez, Aleksandara Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler et al. \"Retrieval-augmented generation for knowledge-intensive NLP tasks.\" arXiv preprint arXiv:2005.11401 (2020).",
      harvard: "Lewis, P., Perez, E., Piktus, A., Petroni, F., Karpukhin, V., Goyal, N., Küttler, H., Lewis, M., Yih, W.T., Rocktäschel, T. and Riedel, S., 2020. Retrieval-augmented generation for knowledge-intensive NLP tasks. arXiv preprint arXiv:2005.11401."
    }
  }
};
