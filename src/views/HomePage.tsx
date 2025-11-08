import { motion } from "framer-motion";

export default function HomeContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 min-h-screen">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Planeta animado */}
        <motion.div
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-32 h-32 mx-auto mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-2xl shadow-cyan-500/50">
            {/* Anillos del planeta */}
            <div className="absolute -inset-4 border-4 border-yellow-400/40 rounded-full transform -rotate-12"></div>
            <div className="absolute -inset-6 border-2 border-pink-400/30 rounded-full transform rotate-12"></div>
          </div>
          {/* Estrellas alrededor */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-300 rounded-full"
          />
        </motion.div>

        <motion.h2 
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(255, 255, 0, 0.5)",
              "0 0 40px rgba(255, 0, 255, 0.5)",
              "0 0 20px rgba(255, 255, 0, 0.5)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ¡Explora y Aprende! 🚀✨
        </motion.h2>
        
        <p className="text-xl md:text-2xl mb-4 max-w-2xl mx-auto text-yellow-100 font-semibold">
          Un viaje increíble por las 
          <span className="text-cyan-300"> Matemáticas 📐</span>, 
          <span className="text-green-300"> Ciencias Sociales🌍</span> y 
          <span className="text-orange-300"> el Sistema Solar 🪐</span>
        </p>
        
        <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-purple-200">
          Descubre ejercicios divertidos, aprende sobre los planetas 
          y explora las maravillas de nuestro mundo
        </p>

        {/* Iconos decorativos */}
        <div className="flex justify-center gap-8 mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl"
          >
            🌟
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl"
          >
            📚
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="text-5xl"
          >
            🎯
          </motion.div>
        </div>

        <div className="space-x-4 flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition text-lg"
          >
            🎮 ¡Empezar Aventura!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/50 transition text-lg"
          >
            🔭 Ver más
          </motion.button>
        </div>

        {/* Elementos decorativos flotantes */}
        <div className="absolute top-20 left-10 text-4xl animate-bounce">⭐</div>
        <div className="absolute top-40 right-20 text-3xl animate-pulse">🌙</div>
        <div className="absolute bottom-40 left-20 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🪐</div>
        <div className="absolute bottom-20 right-40 text-4xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
      </motion.div>
    </div>
  );
}