import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, RotateCcw, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const STARTER_QUESTIONS = [
  'Which project best shows backend architecture?',
  'How did Gideon improve Konga payouts?',
  'Compare transit microservices and the cargo platform',
  'What can Gideon build for my team?'
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('chat_widget_open');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [userProfile, setUserProfile] = useState<{ firstName: string; lastName?: string } | null>(() => {
    try {
      const saved = sessionStorage.getItem('chat_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [onboardFirstName, setOnboardFirstName] = useState('');
  const [onboardLastName, setOnboardLastName] = useState('');
  const [onboardEmail, setOnboardEmail] = useState('');
  const [followUpConsent, setFollowUpConsent] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = sessionStorage.getItem('chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved) as Message[];
        return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }

    let greetingText = "Hi! I'm Sensei, Gideon's AI assistant. Ask me about his web, mobile, backend, DevOps, or end-to-end project work.";
    try {
      const savedProfile = sessionStorage.getItem('chat_user_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p?.firstName) {
          greetingText = `Hi ${p.firstName}! I'm Sensei, Gideon's AI assistant. Ask me about his web, mobile, backend, DevOps, or end-to-end project work.`;
        }
      }
    } catch {}

    return [
      {
        role: 'assistant',
        text: greetingText,
        timestamp: new Date()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeChat = () => {
    setIsOpen(false);
    requestAnimationFrame(() => toggleButtonRef.current?.focus());
  };

  useEffect(() => {
    localStorage.removeItem('chat_user_profile');
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem('chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      sessionStorage.setItem('chat_widget_open', JSON.stringify(isOpen));
    } catch (e) {
      console.error('Failed to save chat open state:', e);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      chatPanelRef.current?.querySelector<HTMLElement>('input, button')?.focus();
    });

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      closeChat();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardFirstName.trim()) return;

    const profile = {
      firstName: onboardFirstName.trim(),
      lastName: onboardLastName.trim(),
    };

    if (followUpConsent && onboardEmail.trim()) {
      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...profile, email: onboardEmail.trim(), consent: true })
        });
        if (!response.ok) throw new Error('Lead registration rejected');
      } catch (err) {
        console.error('Failed to register follow-up consent:', err);
      }
    }

    sessionStorage.setItem('chat_user_profile', JSON.stringify(profile));
    setUserProfile(profile);

    const greeting = {
      role: 'assistant' as const,
      text: `Hi ${profile.firstName}! I'm Sensei, Gideon's AI assistant. Ask me about his web, mobile, backend, DevOps, or end-to-end project work.`,
      timestamp: new Date()
    };
    setMessages([greeting]);
  };

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || loading) return;

    const normalizedMessage = userMessage.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: normalizedMessage, timestamp: new Date() }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: normalizedMessage,
          userProfile,
          history: messages.slice(-8).map(({ role, text }) => ({ role, text }))
        })
      });

      if (!response.ok) throw new Error('Chat API error');
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply, timestamp: new Date() }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "I couldn't reach the chat service. Please try again or contact Gideon directly at nwadialugideon@gmail.com.",
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const resetConversation = () => {
    const greeting = {
      role: 'assistant' as const,
      text: `Fresh slate${userProfile?.firstName ? `, ${userProfile.firstName}` : ''}. Ask about a project, architecture decision, result, or Gideon's fit for your team.`,
      timestamp: new Date()
    };
    setMessages([greeting]);
    setInput('');
  };

  return (
    <div className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 font-mono text-xs">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatPanelRef}
            id="sensei-assistant-panel"
            role="region"
            aria-label="Sensei project assistant"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full sm:w-80 md:w-96 h-[min(68dvh,520px)] sm:h-[450px] flex-shrink-0 bg-slate-950/95 border border-slate-800 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-md mb-3 sm:mb-4"
          >
            {/* Header */}
            <div className="p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img 
                    src="/sensei_avatar.webp"
                    alt="Sensei" 
                    width="192"
                    height="192"
                    decoding="async"
                    className="w-7 h-7 rounded-full border border-orange-500/40 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Sensei</h4>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Project guide</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {userProfile && (
                  <button
                    type="button"
                    aria-label="Start a new conversation"
                    title="New conversation"
                    onClick={resetConversation}
                    className="p-1.5 hover:bg-slate-900 rounded text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Close Sensei assistant"
                  onClick={closeChat}
                  className="p-1.5 hover:bg-slate-900 rounded text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!userProfile ? (
              /* Onboarding Form */
              <form onSubmit={handleOnboardSubmit} className="flex-grow p-5 flex flex-col justify-center gap-2.5 bg-slate-950/40 overflow-y-auto">
                <div className="text-center mb-1">
                  <h3 className="text-orange-400 font-bold text-xs tracking-wider uppercase">Meet Sensei</h3>
                  <p className="text-xs text-slate-400 leading-normal font-sans">Your name stays in this browser session. Email is only saved when you request a follow-up.</p>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <label htmlFor="chat-first-name" className="text-[10px] text-slate-400 uppercase tracking-wider">First Name *</label>
                    <input 
                      id="chat-first-name"
                      name="firstName"
                      type="text"
                      required
                      autoComplete="given-name"
                      maxLength={80}
                      value={onboardFirstName}
                      onChange={e => setOnboardFirstName(e.target.value)}
                      placeholder="First name" 
                      className="bg-slate-900 border border-slate-850 rounded px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500/40 text-xs placeholder-slate-650 w-full min-w-0"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <label htmlFor="chat-last-name" className="text-[10px] text-slate-400 uppercase tracking-wider">Last Name</label>
                    <input 
                      id="chat-last-name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      maxLength={80}
                      value={onboardLastName}
                      onChange={e => setOnboardLastName(e.target.value)}
                      placeholder="Last name" 
                      className="bg-slate-900 border border-slate-850 rounded px-2.5 py-2 text-slate-200 focus:outline-none focus:border-orange-500/40 text-xs placeholder-slate-650 w-full min-w-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="chat-email" className="text-[10px] text-slate-400 uppercase tracking-wider">Your Email (Optional)</label>
                  <input 
                    id="chat-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    value={onboardEmail}
                    onChange={e => setOnboardEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="bg-slate-900 border border-slate-850 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500/40 text-xs placeholder-slate-650 w-full"
                  />
                </div>

                <label className="flex items-start gap-2 text-[10px] leading-relaxed text-slate-400 font-sans">
                  <input
                    type="checkbox"
                    checked={followUpConsent}
                    disabled={!onboardEmail.trim()}
                    onChange={(event) => setFollowUpConsent(event.target.checked)}
                    className="mt-0.5 accent-orange-500 disabled:opacity-40"
                  />
                  <span>Save my contact details so Gideon can follow up. Stored for up to 180 days.</span>
                </label>

                <button 
                  type="submit"
                  className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 hover:border-orange-500/40 py-2 rounded transition-all font-bold tracking-wider text-[10px] uppercase cursor-pointer mt-1.5"
                >
                  Start conversation
                </button>
              </form>
            ) : (
              /* Chat View */
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40" aria-live="polite" aria-busy={loading}>
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-2 max-w-[85%] ${
                        msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <img 
                          src="/sensei_avatar.webp"
                          alt=""
                          width="192"
                          height="192"
                          loading="lazy"
                          decoding="async"
                          className="w-5 h-5 rounded-full border border-slate-800 flex-shrink-0 object-cover"
                        />
                      )}
                      <div 
                        className={`p-3 rounded-lg leading-normal ${
                          msg.role === 'user' 
                            ? 'bg-orange-500/10 border border-orange-500/20 text-slate-200' 
                            : 'bg-slate-900/60 border border-slate-850 text-slate-300'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {messages.filter((message) => message.role === 'user').length === 0 && !loading && (
                    <div className="grid gap-1.5 pt-1" aria-label="Suggested questions">
                      {STARTER_QUESTIONS.map((question) => (
                        <button
                          key={question}
                          type="button"
                          onClick={() => void sendMessage(question)}
                          className="border border-slate-800 px-3 py-2 text-left text-[10px] leading-relaxed text-slate-400 hover:border-orange-500/40 hover:text-orange-300 transition-colors cursor-pointer"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                  {loading && (
                    <div className="flex gap-2 max-w-[85%] mr-auto items-center">
                      <span className="sr-only">Sensei is preparing a response.</span>
                      <img 
                        src="/sensei_avatar.webp"
                        alt=""
                        width="192"
                        height="192"
                        loading="lazy"
                        decoding="async"
                        className="w-5 h-5 rounded-full border border-slate-800 flex-shrink-0 object-cover"
                      />
                      <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-lg text-slate-500 flex items-center gap-1.5 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Form */}
                <form onSubmit={handleSend} className="p-3 border-t border-slate-850 bg-slate-950 flex gap-2">
                  <input 
                    aria-label="Message for Sensei"
                    type="text" 
                    maxLength={600}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask Sensei a question..." 
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500/40 text-[11px]"
                  />
                  <button 
                    type="submit"
                    aria-label="Send message"
                    disabled={loading || !input.trim()}
                    className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 hover:border-orange-500/40 p-2 rounded transition-all cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button & Prompt Speech Bubble */}
      <div className="flex items-center justify-end relative pointer-events-none">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              aria-label="Open Sensei assistant"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className="absolute right-14 mr-2 hidden max-w-[calc(100vw-6rem)] items-center gap-2 truncate rounded-lg border border-orange-500/30 bg-slate-950/90 px-3.5 py-2 text-[10px] font-bold tracking-wide text-orange-400 shadow-xl backdrop-blur-md transition-colors hover:border-orange-500/60 hover:text-orange-300 sm:flex pointer-events-auto cursor-pointer select-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span>Questions about the work?</span>
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          ref={toggleButtonRef}
          type="button"
          aria-label={isOpen ? 'Close Sensei assistant' : 'Open Sensei assistant'}
          aria-expanded={isOpen}
          aria-controls="sensei-assistant-panel"
          onClick={() => isOpen ? closeChat() : setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-orange-500/30 hover:border-orange-500/60 shadow-lg shadow-orange-500/20 overflow-hidden cursor-pointer relative group flex items-center justify-center bg-slate-950/80 focus:outline-none pointer-events-auto"
        >
          <img 
            src="/sensei_avatar.webp"
            alt="Sensei Avatar" 
            width="192"
            height="192"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border border-slate-950" />
        </motion.button>
      </div>
    </div>
  );
}
