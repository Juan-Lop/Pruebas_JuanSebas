import { useState, useEffect } from 'react';

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState<string>('#ffffff');

  // Cargar color desde localStorage al montar el componente
  useEffect(() => {
    const savedColor = localStorage.getItem('selected-color');
    if (savedColor) {
      setSelectedColor(savedColor);
    }
  }, []);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    
    // Guardar en localStorage
    localStorage.setItem('selected-color', newColor);
  };

  const resetColor = () => {
    setSelectedColor('#ffffff');
    localStorage.setItem('selected-color', '#ffffff');
  };

  return (
    <div className="color-picker">
      <h2>Selector de Colores</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="color-input" style={{ display: 'block', marginBottom: '10px' }}>
          Selecciona un color:
        </label>
        
        <input
          id="color-input"
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
          data-testid="color-input"
          style={{
            width: '100px',
            height: '50px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '15px'
          }}
        />

        <button
          onClick={resetColor}
          data-testid="reset-color-button"
          style={{
            padding: '10px 20px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          Restablecer a Blanco
        </button>
      </div>

      {/* Div que cambia de color */}
      <div
        data-testid="color-display"
        style={{
          width: '300px',
          height: '200px',
          backgroundColor: selectedColor,
          border: '2px solid #333',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: selectedColor === '#ffffff' || selectedColor === '#000000' ? '#333' : '#fff',
          fontWeight: 'bold',
          fontSize: '18px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          marginBottom: '20px'
        }}
      >
        Color seleccionado: {selectedColor.toUpperCase()}
      </div>

      {/* Información adicional */}
      <div
        data-testid="color-info"
        style={{
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}
      >
        <h3>Información del Color:</h3>
        <p><strong>Código Hexadecimal:</strong> {selectedColor.toUpperCase()}</p>
        <p><strong>RGB:</strong> {hexToRgb(selectedColor)}</p>
        <p><strong>Persistencia:</strong> El color se guarda automáticamente en el navegador</p>
      </div>
    </div>
  );
}

// Función auxiliar para convertir hex a RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  return 'No válido';
}