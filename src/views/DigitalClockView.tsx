import DigitalClock from '../components/DigitalClock';

export default function DigitalClockView() {
  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <DigitalClock />
          
          {/* Información adicional o instrucciones */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: '#f0f8ff', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <h3>ℹ️ Información del Reloj Digital</h3>
            <p>Este reloj muestra la hora actual en formato 24 horas (HH:MM:SS) y se actualiza automáticamente cada segundo.</p>
            <ul>
              <li>✅ Formato: HH:MM:SS</li>
              <li>✅ Actualización automática cada segundo</li>
              <li>✅ Horario de 24 horas</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};