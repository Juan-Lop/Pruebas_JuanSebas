import { useState, useMemo } from 'react';

// Lista inicial de nombres
const initialNames = [
  'Ana García',
  'Carlos López',
  'María Rodríguez',
  'Juan Pérez',
  'Laura Martínez',
  'David Sánchez',
  'Carmen González',
  'Miguel Fernández',
  'Isabel Torres',
  'Antonio Ruiz',
  'Sofía Morales',
  'Francisco Jiménez',
  'Patricia Álvarez',
  'José Manuel Castro',
  'Elena Vargas',
  'Roberto Herrera',
  'Cristina Ortega',
  'Fernando Ramos',
  'Pilar Delgado',
  'Alejandro Molina',
];

export default function SearchList() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtrar nombres basado en el término de búsqueda
  const filteredNames = useMemo(() => {
    if (!searchTerm.trim()) {
      return initialNames;
    }
    
    return initialNames.filter(name =>
      name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-list">
      <h2>Buscador en Lista</h2>
      
      {/* Campo de búsqueda */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="search-input" style={{ display: 'block', marginBottom: '8px' }}>
          Buscar nombres:
        </label>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            id="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Escribe un nombre para buscar..."
            data-testid="search-input"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              flex: 1,
              minWidth: '200px'
            }}
          />
          
          <button
            onClick={clearSearch}
            data-testid="clear-button"
            style={{
              padding: '10px 15px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div
        data-testid="search-stats"
        style={{
          marginBottom: '15px',
          padding: '10px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      >
        {searchTerm.trim() ? (
          `Mostrando ${filteredNames.length} de ${initialNames.length} resultados para "${searchTerm}"`
        ) : (
          `Mostrando todos los ${initialNames.length} nombres`
        )}
      </div>

      {/* Lista de resultados */}
      <div
        data-testid="results-container"
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          maxHeight: '400px',
          overflowY: 'auto'
        }}
      >
        {filteredNames.length > 0 ? (
          <ul
            data-testid="names-list"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}
          >
            {filteredNames.map((name, index) => (
              <li
                key={name}
                data-testid={`name-item-${index}`}
                style={{
                  padding: '12px 16px',
                  borderBottom: index < filteredNames.length - 1 ? '1px solid #eee' : 'none',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <div
            data-testid="no-results-message"
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#666',
              fontSize: '16px'
            }}
          >
            No encontrado
          </div>
        )}
      </div>

      {/* Información adicional */}
      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0'
        }}
      >
        <h3>Funcionalidades del Buscador:</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Búsqueda en tiempo real mientras escribes</li>
          <li>No distingue entre mayúsculas y minúsculas</li>
          <li>Busca coincidencias parciales en cualquier parte del nombre</li>
          <li>Contador de resultados encontrados</li>
          <li>Botón para limpiar la búsqueda</li>
        </ul>
      </div>
    </div>
  );
}