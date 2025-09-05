'use client';

import { useEffect, useState, useRef } from 'react';

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const messengerRef = useRef(null);
  
  useEffect(() => {
    // Add a small delay before showing the chat component
    const timer = setTimeout(() => {
      setShowChat(true);
      setShowGreeting(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showChat || isLoaded) return;
    
    // Load Dialogflow script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    document.body.appendChild(script);

    // Add custom styles for the chatbot
    const style = document.createElement('style');
    style.textContent = `
      df-messenger {
        z-index: 999;
        position: fixed;
        bottom: 16px;
        right: 16px;
        --df-messenger-bot-message: #059669;
        --df-messenger-button-titlebar-color: #059669;
        --df-messenger-chat-background-color: #ffffff;
        --df-messenger-font-color: #1a1a1a;
        --df-messenger-user-message: #3b82f6;
        --df-messenger-minimized-chat-close-icon-color: #ffffff;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      /* Mobile responsive adjustments */
      @media (max-width: 640px) {
        df-messenger {
          bottom: 12px;
          right: 12px;
          left: 12px;
          width: calc(100vw - 24px) !important;
        }
        
        df-messenger::part(chat-wrapper) {
          width: 100% !important;
          max-width: none !important;
          height: 70vh !important;
          max-height: 70vh !important;
          border-radius: 16px !important;
        }
        
        df-messenger::part(chat-button) {
          width: 48px !important;
          height: 48px !important;
          bottom: 20px !important;
          right: 20px !important;
        }
      }

      /* Tablet responsive adjustments */
      @media (min-width: 641px) and (max-width: 1024px) {
        df-messenger {
          bottom: 20px;
          right: 20px;
        }
        
        df-messenger::part(chat-wrapper) {
          width: 360px !important;
          max-height: 500px !important;
        }
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      df-messenger::part(chat-wrapper) {
        border-radius: 24px;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        backdrop-filter: blur(10px);
        background: rgba(255, 255, 255, 0.95);
      }

      df-messenger::part(chat-wrapper):hover {
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
        transform: translateY(-4px);
      }
      
      df-messenger::part(chat-button) {
        background: linear-gradient(135deg, #059669, #047857);
        border-radius: 50%;
        box-shadow: 0 4px 20px rgba(5, 150, 105, 0.4);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        animation: pulseGlow 3s infinite;
      }

      df-messenger::part(chat-button):hover {
        transform: scale(1.1) rotate(360deg);
        box-shadow: 0 6px 24px rgba(5, 150, 105, 0.5);
      }

      @keyframes pulseGlow {
        0% {
          box-shadow: 0 4px 20px rgba(5, 150, 105, 0.4);
        }
        50% {
          box-shadow: 0 4px 32px rgba(5, 150, 105, 0.6), 0 0 48px rgba(5, 150, 105, 0.3);
        }
        100% {
          box-shadow: 0 4px 20px rgba(5, 150, 105, 0.4);
        }
      }

      df-messenger::part(message-list) {
        padding: 12px;
        scroll-behavior: smooth;
      }

      df-messenger::part(messenger-title) {
        font-size: 1.1rem;
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        letter-spacing: 0.5px;
      }

      /* Mobile title adjustments */
      @media (max-width: 640px) {
        df-messenger::part(messenger-title) {
          font-size: 1rem;
        }
        
        df-messenger::part(message-list) {
          padding: 8px;
        }
      }

      df-messenger::part(user-message) {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        border-radius: 20px 20px 4px 20px;
        padding: 10px 16px;
        animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        font-size: 14px;
      }

      df-messenger::part(bot-message) {
        background: linear-gradient(135deg, #059669, #047857);
        border-radius: 20px 20px 20px 4px;
        padding: 10px 16px;
        animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 2px 8px rgba(5, 150, 105, 0.2);
        font-size: 14px;
      }

      /* Mobile message adjustments */
      @media (max-width: 640px) {
        df-messenger::part(user-message),
        df-messenger::part(bot-message) {
          padding: 8px 14px;
          font-size: 13px;
          border-radius: 16px;
        }
        
        df-messenger::part(user-message) {
          border-radius: 16px 16px 4px 16px;
        }
        
        df-messenger::part(bot-message) {
          border-radius: 16px 16px 16px 4px;
        }
      }

      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      df-messenger::part(chat-input) {
        border-radius: 20px;
        margin: 10px 12px;
        border: 2px solid #e2e8f0;
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(8px);
        padding: 10px 14px;
        font-size: 14px;
      }

      /* Mobile input adjustments */
      @media (max-width: 640px) {
        df-messenger::part(chat-input) {
          margin: 8px 10px;
          padding: 8px 12px;
          font-size: 16px; /* Prevents zoom on iOS */
          border-radius: 18px;
        }
      }

      df-messenger::part(chat-input):focus-within {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        transform: translateY(-1px);
      }

      df-messenger::part(send-icon) {
        color: #059669;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        opacity: 0.9;
      }

      df-messenger::part(send-icon):hover {
        transform: scale(1.15) rotate(15deg);
        opacity: 1;
      }

      df-messenger::part(chat-title-bar) {
        background: linear-gradient(135deg, #059669, #047857);
        border-radius: 24px 24px 0 0;
        padding: 14px;
      }

      /* Mobile title bar adjustments */
      @media (max-width: 640px) {
        df-messenger::part(chat-title-bar) {
          padding: 12px;
          border-radius: 16px 16px 0 0;
        }
      }

      df-messenger::part(message-timestamp) {
        font-size: 0.75rem;
        opacity: 0.7;
        margin-top: 4px;
      }

      df-messenger::part(message-list-wrapper) {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.95) 100%);
        backdrop-filter: blur(8px);
      }

      /* Reduce motion for better mobile performance */
      @media (prefers-reduced-motion: reduce) {
        df-messenger,
        df-messenger::part(*) {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Create a custom greeting message
    const createGreetingMessage = () => {
      if (!document.querySelector('.custom-greeting')) {
        const chatWrapper = document.querySelector('df-messenger::part(chat-wrapper)');
        if (chatWrapper) {
          const greeting = document.createElement('div');
          greeting.className = 'custom-greeting';
          greeting.style.padding = '12px';
          greeting.style.fontFamily = 'system-ui, -apple-system, sans-serif';
          greeting.style.fontSize = '14px';
          greeting.style.color = '#1a1a1a';
          greeting.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
          greeting.style.borderRadius = '16px';
          greeting.style.margin = '12px';
          greeting.style.animation = 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          greeting.innerHTML = `
            <div style="display: flex; align-items: start; gap: 8px;">
              <div style="flex-shrink: 0; margin-top: 2px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10"></path>
                  <path d="M12 22a10 10 0 0 1-10-10"></path>
                  <path d="M12 2a10 10 0 0 0-10 10"></path>
                  <path d="M12 22a10 10 0 0 0 10-10"></path>
                  <path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                </svg>
              </div>
              <div style="flex: 1 1 auto;">
                <p style="margin: 0; padding: 0; font-weight: 600; color: #059669; margin-bottom: 4px;">Jharkhand Travel Assistant</p>
                <p style="margin: 0; padding: 0;">Hello! 👋 Welcome to Jharkhand travel assistance. How can I help you today?</p>
              </div>
            </div>
          `;
          chatWrapper.appendChild(greeting);
        }
      }
    };

    // Wait for the chat to be visible before showing the greeting
    const checkChatVisibility = setInterval(() => {
      if (isLoaded && showGreeting) {
        createGreetingMessage();
        clearInterval(checkChatVisibility);
      }
    }, 500);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      if (document.querySelector('.custom-greeting')) {
        document.querySelector('.custom-greeting').remove();
      }
      clearInterval(checkChatVisibility);
    };
  }, [showChat, isLoaded, showGreeting]);

  if (!showChat || !isLoaded) return null;

  return (
    <div className="dialogflow-messenger-wrapper">
      <df-messenger
        intent="WELCOME"
        chat-title="Jharkhand_Travel_Assistant"
        agent-id="2a15634b-6bb1-4013-8ee2-168ff5a047b1"
        language-code="en"
        chat-icon="https://www.svgrepo.com/show/447627/chat.svg"
      />
    </div>
  );
};

export default ChatBot;