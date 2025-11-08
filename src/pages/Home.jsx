import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim().toLowerCase();
    const correctName = 'renata pasya';

    if (trimmedName === correctName) {
      localStorage.setItem('birthdayName', name.trim());
      setShowSuccess(true);
      setTimeout(() => {
        // Navigate to game page
        window.location.href = '/game'; // Akan diintegrasikan dengan React Router nanti
      }, 2000);
    } else {
      setShowError(true);
      setName('');
    }
  };

  const handleRetry = () => {
    setShowError(false);
    setName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-birthday-pink-100 via-birthday-blue-100 to-birthday-green-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['💖', '🎀', '✨', '🎂', '🌟'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Cute character decoration */}
      <motion.div
        className="absolute bottom-4 left-4 w-24 h-24"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-birthday-pink-300 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-3xl">🐰</span>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-md w-full"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-birthday-pink-300/30">
          <AnimatePresence mode="wait">
            {!showError && !showSuccess && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                {/* Header with animation */}
                <motion.div
                  className="mb-6"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <h1 className="text-4xl font-happy text-birthday-pink-500 mb-2">
                    🎉 Happy Birthday! 🎉
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-birthday-pink-500 to-birthday-blue-500 mx-auto rounded-full"></div>
                </motion.div>
                
                <p className="text-birthday-blue-500 text-lg mb-8 font-comic">
                  Website spesial ini dibuat hanya untuk kamu~
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Siapa namamu sayang? 💖"
                      className="w-full px-6 py-4 bg-white border-2 border-birthday-pink-300 rounded-2xl text-birthday-blue-600 placeholder-birthday-pink-300 focus:outline-none focus:border-birthday-blue-400 focus:ring-4 focus:ring-birthday-blue-200 transition-all duration-300 text-center font-comic text-lg shadow-lg"
                      autoFocus
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-birthday-pink-500 to-birthday-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-comic text-lg group"
                    whileHover={{ 
                      scale: 1.05,
                      background: 'linear-gradient(135deg, #FF4DA6 0%, #4DA6FF 100%)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Masuk ke Surprise! 
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🎀
                      </motion.span>
                    </span>
                  </motion.button>
                </form>
              </motion.div>
            )}

            {showError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: 3,
                  }}
                  className="text-6xl mb-4"
                >
                  😅
                </motion.div>
                
                <h2 className="text-2xl font-bold text-birthday-pink-500 mb-4 font-comic">
                  Hmm... kayanya bukan kamu deh!
                </h2>
                
                <p className="text-birthday-blue-500 mb-6 text-lg">
                  Website ini cuma buat Renata Pasya, pacar tersayangku 💕
                </p>

                <motion.button
                  onClick={handleRetry}
                  className="bg-gradient-to-r from-birthday-green-400 to-birthday-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 font-comic text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Coba Lagi Yuk!
                </motion.button>
              </motion.div>
            )}

            {showSuccess && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="text-6xl mb-4"
                >
                  🎊
                </motion.div>
                
                <h2 className="text-2xl font-bold text-birthday-pink-500 mb-2 font-comic">
                  Yeayy! Selamat datang Sayangku! 💖
                </h2>
                
                <p className="text-birthday-blue-500 text-lg">
                  Siap-siap untuk surprise spesial! ✨
                </p>

                {/* Celebration effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(25)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: '50%',
                        top: '50%',
                      }}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: (Math.random() - 0.5) * 400,
                        y: (Math.random() - 0.5) * 400,
                        rotate: Math.random() * 720,
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.05,
                      }}
                    >
                      {['🎉', '✨', '💖', '🎀', '🌟'][i % 5]}
                    </motion.div>
                  ))}
                </div>

                {/* Loading animation */}
                <motion.div
                  className="mt-6 flex justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 bg-birthday-pink-500 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-birthday-blue-400 text-sm mt-4 font-comic"
        >
          Made with 💖 for Renata Pasya
        </motion.p>
      </motion.div>
    </div>
  );
}