import ColorPicker from '../components/ColorPicker';

export default function ColorPickerView() {
  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <ColorPicker />
          
          {/* Información adicional o instrucciones */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: '#f0f4f8', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <h3>Instrucciones del Selector de Colores</h3>
            <p>Utiliza el selector de color para cambiar el fondo del área de visualización.</p>
            <ul>
              <li>Haz clic en el selector de color para abrir la paleta</li>
              <li>Selecciona cualquier color de la paleta</li>
              <li>El área de visualización cambiará automáticamente</li>
              <li>El color se guarda automáticamente en tu navegador</li>
              <li>Usa el botón "Restablecer" para volver al color blanco</li>
              <li>Puedes ver la información del color (Hex y RGB) debajo</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}