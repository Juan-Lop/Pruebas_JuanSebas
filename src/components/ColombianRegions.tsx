// src/components/ColombianRegions.tsx
import { useState, useEffect } from "react";

interface Region {
  name: string;
  departments: string[];
  characteristics: string;
  economy: string;
  culture: string;
  color: string;
  emoji: string;
  capital: string;
}

const regions: Region[] = [
  {
    name: "Región Caribe",
    departments: [
      "Atlántico",
      "Bolívar",
      "Cesar",
      "Córdoba",
      "La Guajira",
      "Magdalena",
      "Sucre",
    ],
    characteristics:
      "Costas sobre el mar Caribe, clima cálido tropical y hermosas playas de arena blanca",
    economy: "Pesca, turismo costero, ganadería, agricultura y puertos marítimos importantes",
    culture: "Vallenato, cumbia, porro, Carnaval de Barranquilla (Patrimonio Cultural de la Humanidad)",
    color: "from-yellow-400 via-orange-400 to-red-400",
    emoji: "🏖️",
    capital: "Barranquilla",
  },
  {
    name: "Región Pacífica",
    departments: ["Chocó", "Valle del Cauca", "Cauca", "Nariño"],
    characteristics:
      "Costas sobre el océano Pacífico, selvas tropicales exuberantes y la mayor biodiversidad del mundo",
    economy: "Pesca, minería artesanal, agricultura tropical, extracción forestal sostenible",
    culture: "Música del Pacífico, currulao, marimba (Patrimonio Cultural), Festival Petronio Álvarez",
    color: "from-blue-400 via-teal-400 to-cyan-500",
    emoji: "🌊",
    capital: "Cali",
  },
  {
    name: "Región Andina",
    departments: [
      "Antioquia",
      "Boyacá",
      "Caldas",
      "Cundinamarca",
      "Huila",
      "Norte de Santander",
      "Quindío",
      "Risaralda",
      "Santander",
      "Tolima",
    ],
    characteristics:
      "Atravesada por la cordillera de los Andes, clima variado desde cálido hasta frío, ciudades principales",
    economy: "Café (exportación mundial), flores, industria manufacturera, comercio y servicios",
    culture: "Feria de las Flores (Medellín), Festival Vallenato, bambuco, tango, carranga",
    color: "from-green-400 via-emerald-500 to-green-600",
    emoji: "⛰️",
    capital: "Bogotá",
  },
  {
    name: "Región Orinoquía",
    departments: ["Arauca", "Casanare", "Meta", "Vichada"],
    characteristics: "Extensas llanuras (llanos), ríos caudalosos como el Orinoco, sabanas naturales infinitas",
    economy: "Ganadería extensiva, explotación petrolera, agricultura de arroz y palma",
    culture: "Joropo llanero, coleo, Festival Internacional del Joropo, cultura ganadera",
    color: "from-orange-400 via-amber-400 to-yellow-500",
    emoji: "🐴",
    capital: "Villavicencio",
  },
  {
    name: "Región Amazonía",
    departments: [
      "Amazonas",
      "Caquetá",
      "Guainía",
      "Guaviare",
      "Putumayo",
      "Vaupés",
    ],
    characteristics:
      "Selva tropical amazónica (pulmón del mundo), inmensa biodiversidad y comunidades indígenas ancestrales",
    economy: "Ecoturismo responsable, investigación científica, extracción sostenible de recursos naturales",
    culture: "Tradiciones indígenas milenarias, artesanías ancestrales, mitos y leyendas de la selva",
    color: "from-emerald-600 via-green-700 to-teal-700",
    emoji: "🌳",
    capital: "Leticia",
  },
  {
    name: "Región Insular",
    departments: ["San Andrés y Providencia"],
    characteristics: "Islas paradisíacas en el mar Caribe, playas de arena blanca y mar de siete colores",
    economy: "Turismo internacional, comercio libre, pesca artesanal",
    culture: "Música reggae, calipso, cultura raizal (afrodescendiente), gastronomía caribeña única",
    color: "from-cyan-400 via-sky-400 to-blue-500",
    emoji: "🏝️",
    capital: "San Andrés",
  },
];

export default function ColombianRegions() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [score, setScore] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Region | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }, [showConfetti]);

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    setQuizMode(false);
  };

  const startQuiz = () => {
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];
    setCurrentQuestion(randomRegion);

    const correctAnswer = randomRegion.name;
    const wrongAnswers = regions
      .filter((r) => r.name !== correctAnswer)
      .map((r) => r.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const allOptions = [correctAnswer, ...wrongAnswers].sort(
      () => Math.random() - 0.5
    );
    setOptions(allOptions);
    setQuizMode(true);
    setSelectedRegion(null);
  };

  const handleAnswer = (answer: string) => {
    setQuestionsAnswered(questionsAnswered + 1);
    
    if (answer === currentQuestion?.name) {
      setScore(score + 1);
      setShowConfetti(true);
      
      // Usar Web Speech API
      const utterance = new SpeechSynthesisUtterance("¡Correcto! Muy bien");
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    } else {
      const utterance = new SpeechSynthesisUtterance(`Incorrecto. La respuesta era ${currentQuestion?.name}`);
      utterance.lang = 'es-ES';
      window.speechSynthesis.speak(utterance);
    }
    
    setTimeout(() => startQuiz(), 1500);
  };

  const resetQuiz = () => {
    setScore(0);
    setQuestionsAnswered(0);
    setQuizMode(false);
    setCurrentQuestion(null);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-20 left-10 text-9xl">🇨🇴</div>
        <div className="absolute bottom-20 right-20 text-9xl">🏔️</div>
        <div className="absolute top-1/2 left-1/3 text-9xl">🌴</div>
      </div>

      {/* Confetti cuando acierta */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                fontSize: '24px',
                animationDelay: `${Math.random() * 0.3}s`,
                animationDuration: `${1.5 + Math.random()}s`,
              }}
            >
              {['🎉', '⭐', '🏆', '✨', '🎊'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-6xl md:text-8xl animate-wave">🇨🇴</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-blue-600 to-red-600">
              Regiones de Colombia
            </h1>
          </div>
          <p className="text-gray-700 text-lg md:text-xl font-medium">
            ¡Explora la diversidad de nuestro hermoso país! 🌎✨
          </p>
        </div>

        {/* Controles del Quiz */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-red-600 transition-all transform hover:scale-110 shadow-2xl flex items-center gap-3"
          >
            <span className="text-3xl">🎮</span>
            {quizMode ? "Nueva Pregunta" : "Iniciar Quiz Interactivo"}
          </button>
          
          {quizMode && (
            <div className="flex gap-4">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border-4 border-purple-300">
                <span className="font-bold text-purple-600 text-xl">
                  ⭐ Puntaje: {score}/{questionsAnswered}
                </span>
              </div>
              <button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-gray-500 hover:to-gray-700 transition-all transform hover:scale-105 shadow-lg"
              >
                ❌ Salir
              </button>
            </div>
          )}
        </div>

        {/* Grid de regiones (modo exploración) */}
        {!quizMode && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-6xl mx-auto">
            {regions.map((region, index) => (
              <button
                key={region.name}
                onClick={() => handleRegionClick(region)}
                className={`group relative p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 bg-gradient-to-br ${region.color} animate-fadeIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-white">
                  <span className="text-5xl md:text-6xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {region.emoji}
                  </span>
                  <p className="font-extrabold text-lg md:text-xl text-center drop-shadow-lg">
                    {region.name}
                  </p>
                  <p className="text-sm md:text-base mt-2 opacity-90">
                    {region.departments.length} departamentos
                  </p>
                </div>
                
                {selectedRegion?.name === region.name && (
                  <div className="absolute -top-3 -right-3 bg-yellow-400 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl animate-bounce shadow-xl">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Modo Quiz */}
        {quizMode && currentQuestion && (
          <div className="max-w-3xl mx-auto animate-slideUp">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-purple-300">
              {/* Pregunta */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 flex items-center justify-center gap-3">
                  <span className="text-5xl">🤔</span>
                  ¿Qué región es?
                </h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-8 border-blue-500">
                  <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed">
                    {currentQuestion.characteristics}
                  </p>
                </div>
              </div>

              {/* Opciones */}
              <div className="space-y-4">
                {options.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-6 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl text-left flex items-center gap-4 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    <span className="text-3xl group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </button>
                ))}
              </div>

              {/* Pista */}
              <div className="mt-6 bg-yellow-50 border-l-8 border-yellow-400 p-4 rounded-xl">
                <p className="text-gray-700 font-medium flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  <strong>Pista:</strong> Su capital es {currentQuestion.capital}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Panel de información (modo exploración) */}
        {selectedRegion && !quizMode && (
          <div className="max-w-4xl mx-auto animate-slideUp">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-green-300">
              {/* Encabezado */}
              <div className="flex items-center gap-6 mb-8 pb-6 border-b-4 border-green-200">
                <span className="text-7xl md:text-8xl animate-bounce">{selectedRegion.emoji}</span>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800">
                    {selectedRegion.name}
                  </h2>
                  <p className={`text-xl font-bold bg-gradient-to-r ${selectedRegion.color} bg-clip-text text-transparent mt-2`}>
                    Capital: {selectedRegion.capital} 🏛️
                  </p>
                </div>
              </div>

              {/* Información detallada */}
              <div className="space-y-6">
                {/* Departamentos */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border-l-8 border-blue-500 transform hover:scale-105 transition-all">
                  <h3 className="font-extrabold text-2xl text-blue-800 mb-3 flex items-center gap-3">
                    <span className="text-3xl">📍</span>
                    Departamentos
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedRegion.departments.map((dept) => (
                      <span
                        key={dept}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                      >
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-l-8 border-green-500 transform hover:scale-105 transition-all">
                  <h3 className="font-extrabold text-2xl text-green-800 mb-3 flex items-center gap-3">
                    <span className="text-3xl">🌍</span>
                    Características
                  </h3>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {selectedRegion.characteristics}
                  </p>
                </div>

                {/* Economía */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-8 border-purple-500 transform hover:scale-105 transition-all">
                  <h3 className="font-extrabold text-2xl text-purple-800 mb-3 flex items-center gap-3">
                    <span className="text-3xl">💼</span>
                    Economía
                  </h3>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {selectedRegion.economy}
                  </p>
                </div>

                {/* Cultura */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border-l-8 border-orange-500 transform hover:scale-105 transition-all">
                  <h3 className="font-extrabold text-2xl text-orange-800 mb-3 flex items-center gap-3">
                    <span className="text-3xl">🎭</span>
                    Cultura
                  </h3>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {selectedRegion.culture}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mensaje inicial */}
        {!selectedRegion && !quizMode && (
          <div className="text-center mt-12">
            <div className="inline-block bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-yellow-400">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                🗺️ ¡Descubre Colombia!
              </p>
              <p className="text-gray-600 text-xl md:text-2xl">
                Selecciona una región o inicia el quiz para aprender 📚
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }

        .animate-wave {
          animation: wave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}