import { render, screen, fireEvent } from '@testing-library/react';
import CountdownTimer from './CountdownTimer';

describe('CountdownTimer', () => {
  test('debe mostrar el título del contador regresivo', () => {
    render(<CountdownTimer />);
    
    expect(screen.getByText('Contador Regresivo')).toBeInTheDocument();
  });

  test('debe mostrar el tiempo inicial como 00:00', () => {
    render(<CountdownTimer />);
    
    const display = screen.getByTestId('timer-display');
    expect(display.textContent).toBe('00:00');
  });

  test('debe tener un input para ingresar segundos', () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId('seconds-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'number');
    expect(input).toHaveAttribute('placeholder', 'Ingrese segundos');
  });

  test('debe tener botones de control', () => {
    render(<CountdownTimer />);
    
    expect(screen.getByTestId('start-button')).toBeInTheDocument();
    expect(screen.getByTestId('stop-button')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });

  test('debe mostrar el tiempo inicial correctamente cuando se ingresa un valor', () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId('seconds-input');
    const startButton = screen.getByTestId('start-button');
    
    fireEvent.change(input, { target: { value: '65' } });
    fireEvent.click(startButton);
    
    const display = screen.getByTestId('timer-display');
    expect(display.textContent).toBe('01:05'); // 65 segundos = 1:05
  });

  test('debe deshabilitar el botón de inicio cuando no hay valor en el input', () => {
    render(<CountdownTimer />);
    
    const startButton = screen.getByTestId('start-button');
    expect(startButton).toBeDisabled();
  });

  test('debe habilitar el botón de inicio cuando se ingresa un valor', () => {
    render(<CountdownTimer />);
    
    const input = screen.getByTestId('seconds-input');
    const startButton = screen.getByTestId('start-button');
    
    fireEvent.change(input, { target: { value: '10' } });
    expect(startButton).not.toBeDisabled();
  });
});