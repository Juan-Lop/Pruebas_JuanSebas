import CountdownTimer from '../components/CountdownTimer';

export default function CountdownTimerView() {
  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <CountdownTimer />
          
          {/* Información adicional o instrucciones */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: '#fff8f0', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <h3>Instrucciones del Contador Regresivo</h3>
            <p>Ingresa la cantidad de segundos y presiona "Iniciar" para comenzar la cuenta regresiva.</p>
            <ul>
              <li>Ingresa segundos en el campo de texto</li>
              <li>Presiona "Iniciar" para comenzar</li>
              <li>Usa "Detener" para pausar el contador</li>
              <li>Usa "Reiniciar" para volver a cero</li>
              <li>El contador se detiene automáticamente en 0</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}