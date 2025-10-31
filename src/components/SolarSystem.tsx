// src/components/SolarSystem.tsx
import { useState } from "react";

interface Planet {
  name: string;
  distance: string;
  diameter: string;
  curiosity: string;
  color: string;
  emoji: string;
  size: string;
}

const planets: Planet[] = [
  {
    name: "Mercurio",
    distance: "57.9 millones de km",
    diameter: "4,879 km",
    curiosity: "Es el planeta más cercano al Sol y no tiene atmósfera. ¡Su superficie está llena de cráteres!",
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
    emoji: "🪨",
    size: "w-16 h-16",
  },
  {
    name: "Venus",
    distance: "108.2 millones de km",
    diameter: "12,104 km",
    curiosity: "Es el planeta más caliente del sistema solar. ¡Hace más calor que en Mercurio!",
    color: "bg-gradient-to-br from-yellow-300 to-orange-400",
    emoji: "🌕",
    size: "w-20 h-20",
  },
  {
    name: "Tierra",
    distance: "149.6 millones de km",
    diameter: "12,742 km",
    curiosity: "Es el único planeta conocido con vida. ¡Nuestro hogar azul! 🏡",
    color: "bg-gradient-to-br from-blue-400 to-green-500",
    emoji: "🌍",
    size: "w-20 h-20",
  },
  {
    name: "Marte",
    distance: "227.9 millones de km",
    diameter: "6,779 km",
    curiosity: "Se le conoce como el planeta rojo por su color. ¡Tiene el volcán más grande del sistema solar!",
    color: "bg-gradient-to-br from-red-500 to-red-700",
    emoji: "🔴",
    size: "w-18 h-18",
  },
  {
    name: "Júpiter",
    distance: "778.5 millones de km",
    diameter: "139,820 km",
    curiosity: "Es el planeta más grande del sistema solar. ¡Podrían caber 1,300 Tierras dentro!",
    color: "bg-gradient-to-br from-orange-400 to-orange-600",
    emoji: "🟠",
    size: "w-32 h-32",
  },
  {
    name: "Saturno",
    distance: "1,434 millones de km",
    diameter: "116,460 km",
    curiosity: "Tiene los anillos más visibles del sistema solar. ¡Sus anillos están hechos de hielo y roca!",
    color: "bg-gradient-to-br from-yellow-500 to-yellow-700",
    emoji: "🪐",
    size: "w-28 h-28",
  },
  {
    name: "Urano",
    distance: "2,871 millones de km",
    diameter: "50,724 km",
    curiosity: "Gira de lado, como una pelota rodando. ¡Es de color azul verdoso!",
    color: "bg-gradient-to-br from-cyan-300 to-cyan-500",
    emoji: "💠",
    size: "w-24 h-24",
  },
  {
    name: "Neptuno",
    distance: "4,495 millones de km",
    diameter: "49,244 km",
    curiosity: "Es el planeta más lejano del Sol y tiene vientos muy fuertes. ¡Los más rápidos del sistema solar!",
    color: "bg-gradient-to-br from-blue-600 to-blue-900",
    emoji: "🔵",
    size: "w-24 h-24",
  },
];

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
    setIsPlaying(false);
  };

  const playAudio = () => {
    setIsPlaying(true);
    // Simular reproducción de audio (aquí podrías integrar un audio real)
    const utterance = new SpeechSynthesisUtterance(
      `${selectedPlanet?.name}. ${selectedPlanet?.curiosity}`
    );
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-b from-indigo-950 via-purple-900 to-indigo-950 relative overflow-hidden">
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Título con animación */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center drop-shadow-2xl animate-pulse">
          ☀️ Sistema Solar Interactivo 🚀
        </h1>
        <p className="text-white text-center mb-8 text-lg opacity-90">
          ¡Haz clic en cada planeta para descubrir sus secretos! 🌟
        </p>
      </div>

      {/* Grid de planetas */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 max-w-6xl mx-auto">
        {planets.map((planet, index) => (
          <div
            key={planet.name}
            className="flex flex-col items-center"
            style={{
              animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <button
              onClick={() => handlePlanetClick(planet)}
              className={`${planet.color} ${planet.size} rounded-full shadow-2xl hover:scale-125 transition-all duration-300 flex items-center justify-center relative group border-4 border-white/20`}
              aria-label={`Planeta ${planet.name}`}
            >
              <span className="text-4xl">{planet.emoji}</span>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              {/* Anillo de selección */}
              {selectedPlanet?.name === planet.name && (
                <div className="absolute -inset-2 rounded-full border-4 border-yellow-300 animate-ping"></div>
              )}
            </button>
            
            <span className="mt-3 text-white font-bold text-sm md:text-base drop-shadow-lg">
              {planet.name}
            </span>
          </div>
        ))}
      </div>

      {/* Panel de información */}
      {selectedPlanet && (
        <div className="relative z-10 max-w-3xl mx-auto animate-slideUp">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border-4 border-purple-300">
            {/* Encabezado */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b-4 border-purple-200">
              <span className="text-6xl">{selectedPlanet.emoji}</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-900">
                  {selectedPlanet.name}
                </h2>
                <p className="text-purple-600 font-semibold">¡Explorando el espacio!</p>
              </div>
            </div>

            {/* Información */}
            <div className="space-y-4 text-gray-800">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4 border-blue-500">
                <p className="font-bold text-blue-700 mb-1">📏 Distancia al Sol:</p>
                <p className="text-xl">{selectedPlanet.distance}</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border-l-4 border-green-500">
                <p className="font-bold text-green-700 mb-1">⭕ Diámetro:</p>
                <p className="text-xl">{selectedPlanet.diameter}</p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border-l-4 border-yellow-500">
                <p className="font-bold text-orange-700 mb-1">✨ Dato curioso:</p>
                <p className="text-lg leading-relaxed">{selectedPlanet.curiosity}</p>
              </div>
            </div>

            {/* Botón de audio mejorado */}
            <button
              onClick={playAudio}
              disabled={isPlaying}
              className={`mt-6 w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                isPlaying
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white animate-pulse"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
              }`}
            >
              {isPlaying ? "🔊 Reproduciendo información..." : "🔊 Escuchar información del planeta"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-3">
              {isPlaying ? "¡Escucha y aprende! 🎧" : "Haz clic para escuchar"}
            </p>
          </div>
        </div>
      )}

      {/* Mensaje inicial */}
      {!selectedPlanet && (
        <div className="relative z-10 text-center mt-12">
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-white/20">
            <p className="text-white text-2xl font-bold mb-2">🌟 ¡Bienvenido al Sistema Solar! 🌟</p>
            <p className="text-white/90 text-lg">
              Selecciona un planeta arriba para comenzar tu aventura espacial 🚀
            </p>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}