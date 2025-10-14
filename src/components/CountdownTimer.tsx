import { useState, useEffect, useRef } from 'react';

export default function CountdownTimer() {
  const [inputSeconds, setInputSeconds] = useState<string>('');
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    const seconds = parseInt(inputSeconds);
    if (seconds > 0) {
      setCurrentSeconds(seconds);
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setCurrentSeconds(0);
    setInputSeconds('');
  };

  useEffect(() => {
    if (isActive && currentSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentSeconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="countdown-timer">
      <h2>Contador Regresivo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="number"
          value={inputSeconds}
          onChange={(e) => setInputSeconds(e.target.value)}
          placeholder="Ingrese segundos"
          min="0"
          disabled={isActive}
          data-testid="seconds-input"
          style={{
            padding: '8px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        
        <button
          onClick={startTimer}
          disabled={isActive || !inputSeconds}
          data-testid="start-button"
          style={{
            padding: '8px 16px',
            backgroundColor: isActive ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isActive ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          Iniciar
        </button>

        <button
          onClick={stopTimer}
          disabled={!isActive}
          data-testid="stop-button"
          style={{
            padding: '8px 16px',
            backgroundColor: !isActive ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: !isActive ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          Detener
        </button>

        <button
          onClick={resetTimer}
          data-testid="reset-button"
          style={{
            padding: '8px 16px',
            backgroundColor: '#ff9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reiniciar
        </button>
      </div>

      <div
        data-testid="timer-display"
        style={{
          fontSize: '3rem',
          fontFamily: 'monospace',
          textAlign: 'center',
          color: currentSeconds === 0 && inputSeconds ? '#f44336' : '#333',
          padding: '20px',
          border: '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        {formatTime(currentSeconds)}
      </div>

      {currentSeconds === 0 && isActive === false && inputSeconds && (
        <div 
          data-testid="finished-message"
          style={{
            marginTop: '10px',
            color: '#f44336',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          ¡Tiempo terminado!
        </div>
      )}
    </div>
  );
}