import { render, screen } from '@testing-library/react';
import DigitalClock from './DigitalClock';

describe('DigitalClock', () => {
  test('debe mostrar el título del reloj digital', () => {
    render(<DigitalClock />);
    
    expect(screen.getByText('Reloj Digitalal')).toBeInTheDocument();
  });

  test('debe mostrar la hora inicial en formato HH:MM:SS', () => {
    render(<DigitalClock />);
    
    const timeElement = screen.getByTestId('clock-time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
  });

  test('debe tener los estilos correctos aplicados', () => {
    render(<DigitalClock />);
    
    const timeElement = screen.getByTestId('clock-time');
    
    expect(timeElement).toHaveStyle({
      fontSize: '2rem',
      fontFamily: 'monospace'
    });
  });

  test('debe mostrar el formato de tiempo válido', () => {
    render(<DigitalClock />);
    
    const timeElement = screen.getByTestId('clock-time');
    const timeText = timeElement.textContent || '';
    
    // Verificar que el formato es exactamente HH:MM:SS
    expect(timeText).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  test('debe mostrar contenido no vacío', () => {
    render(<DigitalClock />);
    
    const timeElement = screen.getByTestId('clock-time');
    expect(timeElement.textContent).not.toBe('');
  });
});