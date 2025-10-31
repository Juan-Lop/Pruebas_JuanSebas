// src/components/GeometryShapes.tsx
import { useState, useEffect } from "react";

type ShapeType = "square" | "rectangle" | "circle" | "triangle" | null;

interface CalculationResult {
  area: number;
  perimeter: number;
}

interface ShapeInfo {
  name: string;
  color: string;
  emoji: string;
  description: string;
  formula: string;
}

const shapeData: Record<string, ShapeInfo> = {
  square: {
    name: "Cuadrado",
    color: "from-blue-400 via-blue-500 to-blue-600",
    emoji: "🟦",
    description: "Todos sus lados son iguales",
    formula: "Área = lado²",
  },
  rectangle: {
    name: "Rectángulo",
    color: "from-green-400 via-green-500 to-green-600",
    emoji: "🟩",
    description: "Tiene 4 lados, 2 largos y 2 cortos",
    formula: "Área = largo × ancho",
  },
  circle: {
    name: "Círculo",
    color: "from-purple-400 via-purple-500 to-purple-600",
    emoji: "🟣",
    description: "Perfectamente redondo",
    formula: "Área = π × radio²",
  },
  triangle: {
    name: "Triángulo",
    color: "from-orange-400 via-orange-500 to-orange-600",
    emoji: "🔺",
    description: "Tiene 3 lados y 3 vértices",
    formula: "Área = (base × altura) ÷ 2",
  },
};

export default function GeometryShapes() {
  const [selectedShape, setSelectedShape] = useState<ShapeType>(null);
  const [dimension1, setDimension1] = useState<string>("");
  const [dimension2, setDimension2] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (result) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  }, [result]);

  const calculateShape = () => {
    const d1 = parseFloat(dimension1);
    const d2 = parseFloat(dimension2);

    if (isNaN(d1) || d1 <= 0) return;

    let area = 0;
    let perimeter = 0;

    switch (selectedShape) {
      case "square":
        area = d1 * d1;
        perimeter = d1 * 4;
        break;
      case "rectangle":
        if (isNaN(d2) || d2 <= 0) return;
        area = d1 * d2;
        perimeter = 2 * (d1 + d2);
        break;
      case "circle":
        area = Math.PI * d1 * d1;
        perimeter = 2 * Math.PI * d1;
        break;
      case "triangle":
        if (isNaN(d2) || d2 <= 0) return;
        area = (d1 * d2) / 2;
        perimeter = d1 * 3;
        break;
      default:
        return;
    }

    setResult({
      area: parseFloat(area.toFixed(2)),
      perimeter: parseFloat(perimeter.toFixed(2)),
    });
  };

  const resetCalculator = () => {
    setSelectedShape(null);
    setDimension1("");
    setDimension2("");
    setResult(null);
  };

  const handleShapeSelect = (shape: ShapeType) => {
    setSelectedShape(shape);
    setResult(null);
    setDimension1("");
    setDimension2("");
  };

  const getShapeLabel = (isFirst: boolean) => {
    if (!selectedShape) return "";
    
    switch (selectedShape) {
      case "square":
        return "Lado";
      case "rectangle":
        return isFirst ? "Largo" : "Ancho";
      case "circle":
        return "Radio";
      case "triangle":
        return isFirst ? "Base" : "Altura";
      default:
        return "";
    }
  };

  const needsSecondDimension =
    selectedShape === "rectangle" || selectedShape === "triangle";

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Formas geométricas decorativas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-400 rotate-45 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-green-400 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-orange-400 rotate-12 animate-float-delayed"></div>
      </div>

      {/* Confetti cuando se calcula */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                backgroundColor: ['#3b82f6', '#10b981', '#a855f7', '#f97316'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Título */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 animate-gradient">
            📐 Calculadora Geométrica
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-medium">
            ¡Explora el mundo de las figuras y sus medidas! ✨
          </p>
        </div>

        {/* Grid de figuras */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 max-w-6xl mx-auto">
          {/* Cuadrado */}
          <button
            onClick={() => handleShapeSelect("square")}
            className={`group relative p-4 md:p-8 rounded-3xl transition-all duration-500 transform hover:scale-110 ${
              selectedShape === "square"
                ? "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 shadow-2xl scale-110 ring-4 ring-blue-300"
                : "bg-white shadow-xl hover:shadow-2xl"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 md:w-24 md:h-24 mb-3 rounded-xl transition-all duration-500 transform group-hover:rotate-12 ${
                  selectedShape === "square"
                    ? "bg-white shadow-inner"
                    : "bg-gradient-to-br from-blue-400 to-blue-600"
                }`}
              ></div>
              <span className={`text-3xl md:text-4xl mb-2 transition-all ${
                selectedShape === "square" ? "animate-bounce" : ""
              }`}>
                🟦
              </span>
              <p className={`font-bold text-base md:text-lg ${
                selectedShape === "square" ? "text-white" : "text-gray-800"
              }`}>
                Cuadrado
              </p>
            </div>
            {selectedShape === "square" && (
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl animate-ping">
                ✓
              </div>
            )}
          </button>

          {/* Rectángulo */}
          <button
            onClick={() => handleShapeSelect("rectangle")}
            className={`group relative p-4 md:p-8 rounded-3xl transition-all duration-500 transform hover:scale-110 ${
              selectedShape === "rectangle"
                ? "bg-gradient-to-br from-green-400 via-green-500 to-green-600 shadow-2xl scale-110 ring-4 ring-green-300"
                : "bg-white shadow-xl hover:shadow-2xl"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-20 h-12 md:w-28 md:h-20 mb-3 rounded-xl transition-all duration-500 transform group-hover:rotate-12 ${
                  selectedShape === "rectangle"
                    ? "bg-white shadow-inner"
                    : "bg-gradient-to-br from-green-400 to-green-600"
                }`}
              ></div>
              <span className={`text-3xl md:text-4xl mb-2 transition-all ${
                selectedShape === "rectangle" ? "animate-bounce" : ""
              }`}>
                🟩
              </span>
              <p className={`font-bold text-base md:text-lg ${
                selectedShape === "rectangle" ? "text-white" : "text-gray-800"
              }`}>
                Rectángulo
              </p>
            </div>
            {selectedShape === "rectangle" && (
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl animate-ping">
                ✓
              </div>
            )}
          </button>

          {/* Círculo */}
          <button
            onClick={() => handleShapeSelect("circle")}
            className={`group relative p-4 md:p-8 rounded-3xl transition-all duration-500 transform hover:scale-110 ${
              selectedShape === "circle"
                ? "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 shadow-2xl scale-110 ring-4 ring-purple-300"
                : "bg-white shadow-xl hover:shadow-2xl"
            }`}
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-16 h-16 md:w-24 md:h-24 mb-3 rounded-full transition-all duration-500 transform group-hover:scale-125 ${
                  selectedShape === "circle"
                    ? "bg-white shadow-inner"
                    : "bg-gradient-to-br from-purple-400 to-purple-600"
                }`}
              ></div>
              <span className={`text-3xl md:text-4xl mb-2 transition-all ${
                selectedShape === "circle" ? "animate-bounce" : ""
              }`}>
                🟣
              </span>
              <p className={`font-bold text-base md:text-lg ${
                selectedShape === "circle" ? "text-white" : "text-gray-800"
              }`}>
                Círculo
              </p>
            </div>
            {selectedShape === "circle" && (
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl animate-ping">
                ✓
              </div>
            )}
          </button>

          {/* Triángulo */}
          <button
            onClick={() => handleShapeSelect("triangle")}
            className={`group relative p-4 md:p-8 rounded-3xl transition-all duration-500 transform hover:scale-110 ${
              selectedShape === "triangle"
                ? "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 shadow-2xl scale-110 ring-4 ring-orange-300"
                : "bg-white shadow-xl hover:shadow-2xl"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="mb-3">
                <div
                  className="transition-all duration-500 transform group-hover:rotate-180"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "32px solid transparent",
                    borderRight: "32px solid transparent",
                    borderBottom: `56px solid ${
                      selectedShape === "triangle" ? "white" : "rgb(251 146 60)"
                    }`,
                  }}
                ></div>
              </div>
              <span className={`text-3xl md:text-4xl mb-2 transition-all ${
                selectedShape === "triangle" ? "animate-bounce" : ""
              }`}>
                🔺
              </span>
              <p className={`font-bold text-base md:text-lg ${
                selectedShape === "triangle" ? "text-white" : "text-gray-800"
              }`}>
                Triángulo
              </p>
            </div>
            {selectedShape === "triangle" && (
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl animate-ping">
                ✓
              </div>
            )}
          </button>
        </div>

        {/* Panel de cálculo */}
        {selectedShape && (
          <div className="max-w-3xl mx-auto animate-slideUp">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-purple-200">
              {/* Encabezado */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b-4 border-purple-100">
                <span className="text-6xl md:text-7xl animate-float">{shapeData[selectedShape].emoji}</span>
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    {shapeData[selectedShape].name}
                  </h2>
                  <p className="text-purple-600 font-medium text-base md:text-lg">
                    {shapeData[selectedShape].description}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-mono bg-purple-50 px-3 py-1 rounded-lg inline-block">
                    {shapeData[selectedShape].formula}
                  </p>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-5 mb-6">
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <span className="text-2xl">📏</span>
                    {getShapeLabel(true)} (cm)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full border-4 border-purple-200 rounded-2xl p-4 text-xl font-semibold focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all bg-gradient-to-r from-purple-50 to-white"
                    placeholder="Ej: 5 o 5.5"
                    value={dimension1}
                    onChange={(e) => setDimension1(e.target.value)}
                  />
                </div>

                {needsSecondDimension && (
                  <div className="relative">
                    <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                      <span className="text-2xl">📐</span>
                      {getShapeLabel(false)} (cm)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full border-4 border-purple-200 rounded-2xl p-4 text-xl font-semibold focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all bg-gradient-to-r from-purple-50 to-white"
                      placeholder="Ej: 4 o 4.25"
                      value={dimension2}
                      onChange={(e) => setDimension2(e.target.value)}
                    />
                  </div>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-4">
                <button
                  onClick={calculateShape}
                  className={`flex-1 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-gradient-to-r ${shapeData[selectedShape].color} text-white shadow-xl hover:shadow-2xl flex items-center justify-center gap-2`}
                >
                  <span className="text-2xl">✨</span>
                  Calcular
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-8 py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  🔄
                </button>
              </div>

              {/* Resultados */}
              {result && (
                <div className="mt-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-6 md:p-8 border-4 border-green-300 animate-slideUp shadow-xl">
                  <h3 className="font-extrabold text-2xl md:text-3xl text-green-800 mb-6 flex items-center gap-3">
                    <span className="text-4xl animate-bounce">🎉</span>
                    ¡Resultados!
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-blue-400 transform hover:scale-105 transition-all">
                      <p className="text-gray-600 text-sm font-bold mb-2 flex items-center gap-2">
                        <span className="text-2xl">📦</span>
                        Área
                      </p>
                      <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        {result.area}
                      </p>
                      <p className="text-2xl font-bold text-blue-600 mt-1">cm²</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-8 border-purple-400 transform hover:scale-105 transition-all">
                      <p className="text-gray-600 text-sm font-bold mb-2 flex items-center gap-2">
                        <span className="text-2xl">📏</span>
                        Perímetro
                      </p>
                      <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {result.perimeter}
                      </p>
                      <p className="text-2xl font-bold text-purple-600 mt-1">cm</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mensaje inicial */}
        {!selectedShape && (
          <div className="text-center mt-12 animate-bounce-slow">
            <div className="inline-block bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-purple-300">
              <p className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                👆 ¡Elige una figura!
              </p>
              <p className="text-gray-600 text-xl md:text-2xl">
                Selecciona una figura arriba para comenzar 🧮
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
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

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .animate-confetti {
          animation: confetti 2s ease-out forwards;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}