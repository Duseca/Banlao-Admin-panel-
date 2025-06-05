import React, { useState, useRef, useEffect } from 'react';

const UserChat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello, how can I help you today?',
      sender: 'admin',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: "Hi! I'm having trouble with my account settings.",
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: '3',
      text: 'What specific issue are you facing?',
      sender: 'admin',
      timestamp: new Date(Date.now() - 900000),
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'admin',
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className='bg-white rounded-md shadow-sm mt-2'>
      <div className='p-4 border-b border-gray-200'>
        <h3 className='font-medium text-gray-700'>Chat with User</h3>
      </div>

      <div className='h-96 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'admin' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                message.sender === 'admin'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`text-xs mt-1 ${
                  message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className='p-4 border-t border-gray-200'>
        <div className='flex space-x-2'>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder='Type your message...'
            className='flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserChat;
