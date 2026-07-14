import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem('chat_widget_open');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [userProfile, setUserProfile] = useState<{ firstName: string; lastName?: string; email?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('chat_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [onboardFirstName, setOnboardFirstName] = useState('');
  const [onboardLastName, setOnboardLastName] = useState('');
  const [onboardEmail, setOnboardEmail] = useState('');

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

    let greetingText = "Hi! I'm Sensei, Gideon's AI assistant. Ask me anything about his software engineering experience (Konga, Xxolcare), core backend stacks, or microservices projects!";
    try {
      const savedProfile = localStorage.getItem('chat_user_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p?.firstName) {
          greetingText = `Hi ${p.firstName}! I'm Sensei, Gideon's AI assistant. Ask me anything about his software engineering experience (Konga, Xxolcare), core backend stacks, or microservices projects!`;
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const handleOnboardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onboardFirstName.trim()) return;

    const profile = {
      firstName: onboardFirstName.trim(),
      lastName: onboardLastName.trim(),
      email: onboardEmail.trim()
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
    } catch (err) {
      console.error('Failed to register lead:', err);
    }

    localStorage.setItem('chat_user_profile', JSON.stringify(profile));
    setUserProfile(profile);

    const greeting = {
      role: 'assistant' as const,
      text: `Hi ${profile.firstName}! I'm Sensei, Gideon's AI assistant. Ask me anything about his software engineering experience (Konga, Xxolcare), core backend stacks, or microservices projects!`,
      timestamp: new Date()
    };
    setMessages([greeting]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage, timestamp: new Date() }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: userMessage,
          userProfile: userProfile
        })
      });

      if (!response.ok) throw new Error('Chat API error');
      const data = await response.json();
      
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply, timestamp: new Date() }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: "I'm having a hard time connecting to my neural core. Please try again or reach out to Gideon directly via nwadialugideon@gmail.com!", 
        timestamp: new Date() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono text-xs">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-80 md:w-96 h-[450px] flex-shrink-0 bg-slate-950/95 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-md mb-4"
          >
            {/* Header */}
            <div className="p-3 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img 
                    src="/sensei_avatar.png" 
                    alt="Sensei" 
                    className="w-7 h-7 rounded-full border border-orange-500/40 object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-slate-950" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">Sensei</h4>
                  <span className="text-[8px] text-slate-500 uppercase tracking-widest">Portfolio AI Core</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-900 rounded text-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!userProfile ? (
              /* Onboarding Form */
              <form onSubmit={handleOnboardSubmit} className="flex-grow p-5 flex flex-col justify-center gap-2.5 bg-slate-950/40 overflow-y-auto">
                <div className="text-center mb-1">
                  <h3 className="text-orange-400 font-bold text-xs tracking-wider uppercase">Systems Briefing</h3>
                  <p className="text-[10px] text-slate-400 leading-normal font-sans">Introduce yourself to initialize Sensei's AI assistant core.</p>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[8px] text-slate-500 uppercase tracking-wider">First Name *</label>
                    <input 
                      type="text"
                      required
                      value={onboardFirstName}
                      onChange={e => setOnboardFirstName(e.target.value)}
                      placeholder="First name" 
                      className="bg-slate-900 border border-slate-850 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-orange-500/40 text-[10px] placeholder-slate-650 w-full min-w-0"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <label className="text-[8px] text-slate-500 uppercase tracking-wider">Last Name</label>
                    <input 
                      type="text"
                      value={onboardLastName}
                      onChange={e => setOnboardLastName(e.target.value)}
                      placeholder="Last name" 
                      className="bg-slate-900 border border-slate-850 rounded px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-orange-500/40 text-[10px] placeholder-slate-650 w-full min-w-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[8px] text-slate-500 uppercase tracking-wider">Your Email (Optional)</label>
                  <input 
                    type="email"
                    value={onboardEmail}
                    onChange={e => setOnboardEmail(e.target.value)}
                    placeholder="name@company.com" 
                    className="bg-slate-900 border border-slate-850 rounded px-3 py-1.5 text-slate-200 focus:outline-none focus:border-orange-500/40 text-[10px] placeholder-slate-650 w-full"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 hover:border-orange-500/40 py-2 rounded transition-all font-bold tracking-wider text-[10px] uppercase cursor-pointer mt-1.5"
                >
                  Initialize Sensei ⚡
                </button>
              </form>
            ) : (
              /* Chat View */
              <>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`flex gap-2 max-w-[85%] ${
                        msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <img 
                          src="/sensei_avatar.png" 
                          alt="Sensei" 
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
                  {loading && (
                    <div className="flex gap-2 max-w-[85%] mr-auto items-center">
                      <img 
                        src="/sensei_avatar.png" 
                        alt="Sensei" 
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
                    type="text" 
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask Sensei a question..." 
                    className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-orange-500/40 text-[11px]"
                  />
                  <button 
                    type="submit"
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
      <div className="flex items-center justify-end relative">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ delay: 0.8, duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className="absolute right-14 mr-2 bg-slate-950/90 border border-orange-500/30 px-3.5 py-2 rounded-lg text-orange-400 font-bold text-[10px] tracking-wide whitespace-nowrap shadow-xl flex items-center gap-2 backdrop-blur-md cursor-pointer select-none hover:border-orange-500/60 hover:text-orange-300 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
              <span>Need systems intelligence? Ask me! ⚡</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full border border-orange-500/30 hover:border-orange-500/60 shadow-lg shadow-orange-500/20 overflow-hidden cursor-pointer relative group flex items-center justify-center bg-slate-950/80 focus:outline-none"
        >
          <img 
            src="/sensei_avatar.png" 
            alt="Sensei Avatar" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border border-slate-950" />
        </motion.button>
      </div>
    </div>
  );
}
