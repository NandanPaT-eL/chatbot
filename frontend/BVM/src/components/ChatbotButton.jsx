import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

export default function ChatbotWidget() {
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const chatRef = useRef(null);

  const toggleChat = () => setShowChat(!showChat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || waiting) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage, { sender: 'bot', text: '...', typing: true }]);
    setInput('');
    setWaiting(true);

    try {
      const res = await axios.post('http://localhost:8000/ask', { question: input });
      setMessages((prev) =>
        prev.filter((msg) => !msg.typing)
      );
      setMessages((prev) => [...prev, { sender: 'bot', text: res.data.answer }]);
    } catch (err) {
      setMessages((prev) =>
        prev.filter((msg) => !msg.typing)
      );
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: Failed to get response.' }]);
    }

    setWaiting(false);
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(darkMode.matches);

    const listener = (e) => setIsDark(e.matches);
    darkMode.addEventListener('change', listener);
    return () => darkMode.removeEventListener('change', listener);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden"
        onClick={toggleChat}
        style={{ display: showChat ? 'none' : 'block' }}
      >
        💬
      </button>

      {showChat && (
        <div
          className={`w-[90vw] max-w-md h-[75vh] md:h-[500px] rounded-lg shadow-xl flex flex-col overflow-hidden border
            ${isDark ? 'bg-gray-900 text-white border-gray-700' : 'bg-white text-black border-gray-300'}`}
        >
          <div className={`px-4 py-2 font-semibold flex justify-between items-center ${
            isDark ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'
          }`}>
            <span>Ask CoE Bot</span>
            <button onClick={toggleChat} className="text-white">✕</button>
          </div>

          <div
            ref={chatRef}
            className={`flex-1 p-4 space-y-2 overflow-y-auto ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-xs md:max-w-sm text-sm whitespace-pre-line ${
                  msg.sender === 'user'
                    ? `${isDark ? 'bg-blue-800' : 'bg-blue-100'} self-end ml-auto`
                    : `${isDark ? 'bg-gray-700' : 'bg-gray-200'} self-start mr-auto`
                }`}
              >
                {msg.typing ? (
                  <div className="flex gap-1 items-center justify-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className={`p-2 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={waiting}
                placeholder={waiting ? 'Waiting for response...' : 'Type your question'}
                className={`flex-1 p-2 rounded-md border focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-gray-800 text-white border-gray-600 focus:ring-blue-500'
                    : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              <button
                type="submit"
                disabled={waiting || !input.trim()}
                className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}