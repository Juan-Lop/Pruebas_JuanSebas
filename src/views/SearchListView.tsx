import SearchList from '../components/SearchList';

export default function SearchListView() {
  return (
    <div className="space-y-8">
      <section className="bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <SearchList />
          
          {/* Información adicional o instrucciones */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: '#fef3e2', 
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}>
            <h3>Instrucciones del Buscador en Lista</h3>
            <p>Utiliza el campo de búsqueda para filtrar la lista de nombres en tiempo real.</p>
            <ul>
              <li>Escribe cualquier parte de un nombre para filtrar</li>
              <li>La búsqueda no distingue entre mayúsculas y minúsculas</li>
              <li>Puedes buscar por nombre o apellido</li>
              <li>El contador muestra cuántos resultados se encontraron</li>
              <li>Usa el botón "Limpiar" para mostrar todos los nombres</li>
              <li>Si no hay coincidencias, verás el mensaje "No encontrado"</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}