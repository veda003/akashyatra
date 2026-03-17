import React, { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser, FaHeadset } from 'react-icons/fa';
import '../styles/Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "✨ Namaste! I'm AakashYatri's virtual assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // FAQ responses
  const botResponses = {
    'hello': "Hello! How can I assist you with your flight booking today?",
    'hi': "Hi there! Ready to plan your next journey?",
    'book flight': "To book a flight, simply use the search form above. Enter your departure city, destination, and travel dates!",
    'cancel': "You can cancel your booking from 'My Trips' section. Free cancellation within 24 hours!",
    'refund': "Refunds are processed within 5-7 business days to your original payment method.",
    'baggage': "Most domestic flights allow 15kg check-in baggage and 7kg cabin baggage. Check your airline's policy for exact details.",
    'check in': "Web check-in opens 48 hours before departure. You can check-in from 'My Trips' section.",
    'payment': "We accept all major credit/debit cards, UPI, and net banking. 100% secure payments!",
    'contact': "You can reach our 24/7 support at 📞 +91 6381241431 or 📧 vedagiri003@gmail.com",
    'deals': "Check our 'Exclusive Deals' section for the best offers on popular routes!",
    'help': "I can help you with: flight booking, cancellations, refunds, baggage info, check-in, payments, and more!",
    'bye': "Thank you for choosing AakashYatri! Have a wonderful journey! ✈️",
    'thank': "You're welcome! Happy to help! 😊",
    'default': "I'm here to help! You can ask me about flight booking, cancellations, baggage, payments, or contact our support team."
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botMessage = generateBotResponse(inputMessage.toLowerCase());
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    let responseText = botResponses.default;

    // Check for keywords in user input
    if (userInput.includes('hello') || userInput.includes('hi')) {
      responseText = botResponses.hello;
    } else if (userInput.includes('book') || userInput.includes('flight')) {
      responseText = botResponses['book flight'];
    } else if (userInput.includes('cancel')) {
      responseText = botResponses.cancel;
    } else if (userInput.includes('refund')) {
      responseText = botResponses.refund;
    } else if (userInput.includes('baggage') || userInput.includes('luggage')) {
      responseText = botResponses.baggage;
    } else if (userInput.includes('check in') || userInput.includes('check-in')) {
      responseText = botResponses['check in'];
    } else if (userInput.includes('payment')) {
      responseText = botResponses.payment;
    } else if (userInput.includes('contact') || userInput.includes('support')) {
      responseText = botResponses.contact;
    } else if (userInput.includes('deal') || userInput.includes('offer')) {
      responseText = botResponses.deals;
    } else if (userInput.includes('help')) {
      responseText = botResponses.help;
    } else if (userInput.includes('bye') || userInput.includes('goodbye')) {
      responseText = botResponses.bye;
    } else if (userInput.includes('thank')) {
      responseText = botResponses.thank;
    }

    return {
      id: messages.length + 2,
      text: responseText,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    };
  };

  const quickReplies = [
    'How to book a flight?',
    'Baggage allowance',
    'Cancellation policy',
    'Payment options',
    'Contact support',
    'Best deals'
  ];

  return (
    <>
      {/* Chat Button */}
      <button 
        className={`chat-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-left">
              <FaHeadset className="header-icon" />
              <div>
                <h3>AakashYatri Assistant</h3>
                <p>Online • Reply in 1 min</p>
              </div>
            </div>
            <button className="minimize-btn" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-avatar">
                  {message.sender === 'bot' ? <FaRobot /> : <FaUser />}
                </div>
                <div className="message-content">
                  <p>{message.text}</p>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot typing">
                <div className="message-avatar">
                  <FaRobot />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply-btn"
                onClick={() => {
                  setInputMessage(reply);
                  setTimeout(() => {
                    document.getElementById('chat-form').dispatchEvent(
                      new Event('submit', { cancelable: true })
                    );
                  }, 100);
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form id="chat-form" className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit" disabled={!inputMessage.trim()}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
