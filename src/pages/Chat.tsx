import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithSousChef } from '../services/api';
import clsx from 'clsx';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello Chef! How can I help you in the kitchen today?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            // Pass history if needed, for now just the query
            const response = await chatWithSousChef(userMessage, messages);

            // Assuming response structure from WF6: { answer: "..." } or similar
            // If WF6 returns a string directly or a JSON with 'output', adjust here.
            // Based on WDD, WF6 uses an Agent which usually returns 'output' or 'text'.
            // Let's assume 'output' or 'answer'.
            const answer = response.output || response.answer || response.text || JSON.stringify(response);

            setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
        } catch (error) {
            console.error('Chat failed:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'I apologize, Chef. I seem to be having trouble connecting to my brain right now.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
            <div className="flex-1 overflow-y-auto space-y-6 p-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={clsx(
                            'flex gap-4 max-w-[80%]',
                            msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                        )}
                    >
                        <div className={clsx(
                            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                            msg.role === 'user' ? 'bg-orange-500' : 'bg-blue-500'
                        )}>
                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                        </div>

                        <div className={clsx(
                            'p-4 rounded-2xl text-sm leading-relaxed',
                            msg.role === 'user'
                                ? 'bg-orange-500/10 text-orange-100 rounded-tr-none'
                                : 'bg-[#1e1e1e] text-gray-300 border border-white/5 rounded-tl-none'
                        )}>
                            {msg.role === 'user' ? (
                                msg.content
                            ) : (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex gap-4 max-w-[80%]">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-500">
                            <Bot size={20} />
                        </div>
                        <div className="bg-[#1e1e1e] p-4 rounded-2xl rounded-tl-none border border-white/5">
                            <div className="flex gap-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 mt-4">
                <form onSubmit={handleSend} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about recipes, techniques, or your library..."
                        className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl pl-6 pr-14 py-4 text-white focus:outline-none focus:border-orange-500 shadow-lg"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};
