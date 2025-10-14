import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker from './ColorPicker';

// Mock localStorage
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

describe('ColorPicker', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  test('muestra el título y el color inicial como blanco', () => {
    render(<ColorPicker />);
    expect(screen.getByText('Selector de Colores')).toBeInTheDocument();
    const colorInput = screen.getByTestId('color-input');
    const colorDisplay = screen.getByTestId('color-display');
    expect(colorInput).toHaveValue('#ffffff');
    expect(colorDisplay).toHaveStyle('background-color: #ffffff');
  });

  test('cambia el color y lo guarda en localStorage', () => {
    render(<ColorPicker />);
    const colorInput = screen.getByTestId('color-input');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });
    expect(colorInput).toHaveValue('#ff0000');
    expect(mockLocalStorage.getItem('selected-color')).toBe('#ff0000');
  });

  test('restablece el color a blanco con el botón', () => {
    render(<ColorPicker />);
    const colorInput = screen.getByTestId('color-input');
    const resetButton = screen.getByTestId('reset-color-button');
    fireEvent.change(colorInput, { target: { value: '#00ff00' } });
    fireEvent.click(resetButton);
    expect(colorInput).toHaveValue('#ffffff');
  });
});