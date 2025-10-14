import React, { useState, useEffect } from 'react';

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  useEffect(() => {
    const updateTime = () => {
      setTime(formatTime(new Date()));
    };

    // Actualizar inmediatamente
    updateTime();

    // Actualizar cada segundo
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="digital-clock">
      <h2>Reloj Digital</h2>
      <div 
        data-testid="clock-time"
        style={{
          fontSize: '2rem',
          fontFamily: 'monospace',
          color: '#333',
          textAlign: 'center',
          padding: '20px',
          border: '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        {time}
      </div>
    </div>
  );
};

export default DigitalClock;