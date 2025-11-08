import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShapes, FaMap, FaRocket } from "react-icons/fa";

interface SidebarItem {
  label: string;
  route: string;
  icon?: React.ReactNode;
  color: string;
}

const exerciseItems: SidebarItem[] = [
  { 
    label: "Sistema Solar", 
    route: "/sistemasolar", 
    icon: <FaRocket className="text-xl" />,
    color: "from-purple-400 to-pink-500"
  },
  { 
    label: "Figuras Geométricas", 
    route: "/figurasgeometricas", 
    icon: <FaShapes className="text-xl" />,
    color: "from-blue-400 to-cyan-500"
  },
  { 
    label: "Regiones de Colombia", 
    route: "/regionescolombia", 
    icon: <FaMap className="text-xl" />,
    color: "from-green-400 to-emerald-500"
  },
];

export default function Sidebar() {
  const [openExercises, setOpenExercises] = useState(true);

  const renderNavItem = ({ label, route, icon, color }: SidebarItem) => (
    <NavLink
      key={route}
      to={route}
      className={({ isActive }) =>
        `group w-full text-left flex items-center gap-3 rounded-xl px-4 py-3 
         transition-all duration-300 transform hover:scale-105 hover:shadow-lg
         ${isActive 
           ? `bg-gradient-to-r ${color} text-white shadow-md` 
           : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:" + color + " hover:text-white"
         }`
      }
    >
      <div className="flex items-center gap-3 font-semibold text-base">
        <span className={`transform transition-transform group-hover:rotate-12 group-hover:scale-110`}>
          {icon}
        </span>
        {label}
      </div>
    </NavLink>
  );

  return (
    <aside className="hidden md:block w-full md:w-[260px] border-r border-slate-200 dark:border-slate-800 
                      bg-gradient-to-b from-orange-50 to-yellow-50 dark:from-slate-900 dark:to-slate-800">
      <div className="p-4 space-y-3">
        
        {/* Título del menú */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 
                         bg-clip-text text-transparent mb-1">
            🌟 Aprende Jugando 🌟
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            ¡Diviértete explorando!
          </p>
        </div>

        {/* Acordeón de Actividades */}
        <button
          onClick={() => setOpenExercises(!openExercises)}
          className="w-full flex items-center justify-between rounded-xl px-4 py-3 
                     bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold text-lg
                     shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            🎮 Mis Aventuras
          </span>
          <span className="text-2xl transform transition-transform duration-300" 
                style={{ transform: openExercises ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            🔽
          </span>
        </button>
        {openExercises && (
          <div className="space-y-2 mt-3">
            {exerciseItems.map(renderNavItem)}
          </div>
        )}

      </div>
    </aside>
  );
}