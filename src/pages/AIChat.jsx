import React, { useState, useEffect, useRef } from 'react'
import { generateAIResponse } from '../config/gemini.js'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  FiSend, FiRotateCcw, FiCopy, FiThumbsUp, FiThumbsDown, 
  FiMic, FiCpu, FiMessageSquare, FiCompass 
} from 'react-icons/fi'

function AIChat({ searchQuery }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am your research assistant. Ask me to explain a concept, structure a literature review, draft research gaps, or map out timelines.", time: 'Just now' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  
  const endOfMessagesRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Listen to Global Sidebar triggers
  useEffect(() => {
    const handleNewChat = () => {
      setMessages([
        { sender: 'ai', text: "Hello! Started a fresh research session. Let me know what you want to research today.", time: 'Just now' }
      ]);
    };

    const handleLoadPastChat = (e) => {
      const topic = e.detail || "Past Session";
      setMessages([
        { sender: 'user', text: `Review notes on ${topic}`, time: '10m ago' },
        { sender: 'ai', text: `Here is the loaded context regarding ${topic}. Based on your local library indexes, we have 2 papers covering this topology. Let me know if you would like me to generate a bibliography reference or format notes.`, time: '9m ago' }
      ]);
    };

    window.addEventListener('initiate-new-chat', handleNewChat);
    window.addEventListener('load-past-chat', handleLoadPastChat);
    return () => {
      window.removeEventListener('initiate-new-chat', handleNewChat);
      window.removeEventListener('load-past-chat', handleLoadPastChat);
    };
  }, []);

  // Send message action
  const handleSend = async (customPrompt) => {
    const query = customPrompt || inputVal;
    if (!query.trim()) return;

    // 1. Push user message
    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // 2. Query Google Gemini model with full history context
      const answer = await generateAIResponse(query, messages);
      
      // 3. Simulated streaming effect
      setIsTyping(false);
      const aiMsgPlaceholder = {
        sender: 'ai',
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsgPlaceholder]);

      // Stream the words to the UI
      const words = answer.split(' ');
      let currentText = '';
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < words.length) {
          currentText += (index === 0 ? '' : ' ') + words[index];
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...aiMsgPlaceholder, text: currentText };
            return updated;
          });
          index++;
        } else {
          clearInterval(timer);
        }
      }, 50);

    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "Error connecting to Gemini API. Please make sure your API key in `.env` is correct, or check your console logs.",
        time: 'Just now'
      }]);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied response to clipboard!');
  };

  const toggleVoiceInput = () => {
    setVoiceActive(!voiceActive);
    if (!voiceActive) {
      setInputVal("Write a literature review on Transformers in edge computing");
      setTimeout(() => {
        setVoiceActive(false);
      }, 2000);
    }
  };

  const suggestedPrompts = [
    "Explain PEFT models in edge deployments",
    "Identify research gaps in Generative Agent simulations",
    "Draft a methodology outline for open-domain RAG"
  ];

  return (
    <div className="chat-window animate__animated animate__fadeIn">
      {/* Messages Scroll Area */}
      <div className="chat-messages-area">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
            {msg.sender === 'user' ? (
              <div>{msg.text}</div>
            ) : (
              <ReactMarkdown
                children={msg.text}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              />
            )}
            
            {msg.sender === 'ai' && idx > 0 && (
              <div className="d-flex align-items-center gap-3 mt-3 pt-2 border-top border-secondary-subtle" style={{ opacity: 0.75 }}>
                <button className="btn btn-link p-0 text-secondary border-0" onClick={() => copyToClipboard(msg.text)}>
                  <FiCopy size={13} /> <span style={{ fontSize: '11px' }}>Copy</span>
                </button>
                <button className="btn btn-link p-0 text-secondary border-0" onClick={() => handleSend("Regenerate: " + messages[idx - 1].text)}>
                  <FiRotateCcw size={13} /> <span style={{ fontSize: '11px' }}>Regenerate</span>
                </button>
                <button className="btn btn-link p-0 text-secondary border-0" onClick={() => alert('Thanks for the feedback!')}>
                  <FiThumbsUp size={13} />
                </button>
                <button className="btn btn-link p-0 text-secondary border-0" onClick={() => alert('Feedback registered')}>
                  <FiThumbsDown size={13} />
                </button>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="typing-bubble">
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
            <span className="typing-dot"></span>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Suggested prompts on empty chat or near the input panel */}
      {messages.length <= 1 && (
        <div className="px-4 py-2 d-flex flex-wrap gap-2 justify-content-center">
          {suggestedPrompts.map((prompt, idx) => (
            <button 
              key={idx} 
              onClick={() => handleSend(prompt)} 
              className="prompt-badge"
            >
              💡 {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Textbox Send Panel */}
      <div className="chat-input-panel">
        <div className="chat-input-wrapper">
          <button 
            type="button"
            className={`btn ${voiceActive ? 'btn-danger' : 'btn-link text-secondary'} position-absolute start-0 ms-3 p-0 border-0`}
            style={{ zIndex: 5 }}
            onClick={toggleVoiceInput}
          >
            <FiMic size={18} />
          </button>
          
          <input 
            type="text" 
            className="chat-textbox" 
            style={{ paddingLeft: '50px' }}
            placeholder="Ask anything about academic publications, drafts, concepts, or synthesis..." 
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          
          <button 
            type="button" 
            className="chat-send-btn"
            onClick={() => handleSend()}
          >
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChat
