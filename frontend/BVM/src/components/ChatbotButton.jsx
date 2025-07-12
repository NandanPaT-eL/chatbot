import React, { useState } from "react";
import chatbotIcon from "../assets/chatbot.png";

const ChatbotButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-24 w-[400px] h-[700px] bg-white rounded-lg shadow-lg z-40 p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>
          </div>
          <div className="h-[640px] overflow-y-auto border-t pt-2">
            {/* Replace this with your chatbot content */}
            <p className="text-gray-600">Chatbot content goes here...</p>
          </div>
        </div>
      )}

      {/* Chatbot Icon Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-transparent p-0 m-0 border-none cursor-pointer z-50"
      >
        <img src={chatbotIcon} alt="Chatbot" className="w-14 h-14" />
      </button>
    </>
  );
};

export default ChatbotButton;
