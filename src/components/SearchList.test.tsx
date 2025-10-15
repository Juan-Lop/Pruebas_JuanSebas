import { render, screen, fireEvent } from '@testing-library/react';
import SearchList from './SearchList';

describe('SearchList', () => {
  test('debe mostrar todos los elementos inicialmente', () => {
    render(<SearchList />);
    
    const namesList = screen.getByTestId('names-list');
    expect(namesList).toBeInTheDocument();
    
    // Verificar que se muestran algunos nombres específicos
    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.getByText('Carlos López')).toBeInTheDocument();
    expect(screen.getByText('María Rodríguez')).toBeInTheDocument();
  });

  test('debe filtrar nombres al escribir en el input', () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId('search-input');
    
    // Buscar "Ana"
    fireEvent.change(searchInput, { target: { value: 'Ana' } });
    
    // Debe mostrar solo Ana García
    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.queryByText('Carlos López')).not.toBeInTheDocument();
  });

  test('debe mostrar mensaje "No encontrado" cuando no hay coincidencias', () => {
    render(<SearchList />);
    
    const searchInput = screen.getByTestId('search-input');
    
    // Buscar algo que no existe
    fireEvent.change(searchInput, { target: { value: 'XYZ123' } });
    
    expect(screen.getByTestId('no-results-message')).toBeInTheDocument();
    expect(screen.getByText('No encontrado')).toBeInTheDocument();
  });
});