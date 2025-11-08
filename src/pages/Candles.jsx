import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export default function Candles() {
  const [candles, setCandles] = useState(
    Array.from({ length: 21 }, (_, i) => {
      // Generate random position in a circle around center, but outside the magic circle
      const angle = (i / 21) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 200 + Math.random() * 150; // Far from center
      return {
        id: i,
        isLit: true,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4
      };
    })
  );
  const [allBlown, setAllBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [draggedCandle, setDraggedCandle] = useState(null);

  const litCount = candles.filter(c => c.isLit).length;

  useEffect(() => {
    if (litCount === 0 && !allBlown) {
      setAllBlown(true);
      setTimeout(() => setShowCelebration(true), 500);
    }
  }, [litCount, allBlown]);

  const blowCandle = (candleId) => {
    setCandles(prev => prev.map(c => 
      c.id === candleId ? { ...c, isLit: false } : c
    ));
  };

  const handleDragEnd = (event, info, candleId) => {
    // Get center of screen
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate distance from drag position to center
    const distanceX = info.point.x - centerX;
    const distanceY = info.point.y - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
    // If dragged close to center (within magic circle radius ~100px)
    if (distance < 120) {
      blowCandle(candleId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Mystical background particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? '#C084FC' : '#F472B6',
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Labubu watching from corner (placeholder) */}
      <motion.div
        className="absolute bottom-8 right-8 w-32 h-32 opacity-30"
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
        <div className="w-full h-full bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="text-4xl">👁️</span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!showCelebration ? (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full max-w-4xl"
          >
            {/* Title */}
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-3">
                Magic Candle Ritual ✨
              </h1>
              <p className="text-purple-300 text-sm md:text-base">
                Tarik setiap lilin ke lingkaran magic buat mematikannya~
              </p>
              <motion.div
                className="mt-4 text-pink-400 text-xl md:text-2xl font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {litCount} lilin tersisa 🕯️
              </motion.div>
            </motion.div>

            {/* Central Magic Circle */}
            <div className="relative flex items-center justify-center h-[500px] md:h-[600px]">
              {/* Outer glow rings */}
              <motion.div
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-purple-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.div
                className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border-2 border-pink-500/40"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: -360,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Center magic circle */}
              <motion.div
                className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 backdrop-blur-md border-4 border-purple-400/50 flex items-center justify-center shadow-2xl shadow-purple-500/50"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(168, 85, 247, 0.5)',
                    '0 0 80px rgba(236, 72, 153, 0.7)',
                    '0 0 60px rgba(168, 85, 247, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-4xl md:text-5xl mb-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.div>
                  <p className="text-xs text-purple-200 font-bold">DRAG HERE</p>
                </div>
              </motion.div>

              {/* Floating Candles */}
              <AnimatePresence>
                {candles.map((candle) => (
                  candle.isLit && (
                    <motion.div
                      key={candle.id}
                      drag
                      dragElastic={0.3}
                      dragConstraints={{ left: -400, right: 400, top: -300, bottom: 300 }}
                      onDragEnd={(e, info) => handleDragEnd(e, info, candle.id)}
                      whileDrag={{ scale: 1.3, zIndex: 50, cursor: 'grabbing' }}
                      whileHover={{ scale: 1.1 }}
                      initial={{
                        opacity: 0,
                        scale: 0,
                        x: candle.x,
                        y: candle.y,
                      }}
                      animate={{
                        opacity: 1,
                        scale: candle.scale,
                        x: [
                          candle.x,
                          candle.x + (Math.random() - 0.5) * 20,
                          candle.x
                        ],
                        y: [
                          candle.y,
                          candle.y + (Math.random() - 0.5) * 15,
                          candle.y
                        ],
                        rotate: [
                          candle.rotation,
                          candle.rotation + 5,
                          candle.rotation - 5,
                          candle.rotation
                        ],
                      }}
                      exit={{
                        scale: 0,
                        opacity: 0,
                        rotate: 180,
                        y: candle.y - 100,
                        transition: { duration: 0.6 }
                      }}
                      transition={{
                        opacity: { duration: 0.3, delay: candle.id * 0.05 },
                        scale: { duration: 0.3, delay: candle.id * 0.05 },
                        x: { duration: 3 + candle.id * 0.1, repeat: Infinity, ease: "easeInOut" },
                        y: { duration: 2.5 + candle.id * 0.1, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      }}
                      className="absolute cursor-grab"
                      style={{ touchAction: 'none' }}
                    >
                      {/* Candle body */}
                      <div className="relative">
                        {/* Glow effect */}
                        <motion.div
                          className="absolute -inset-4 rounded-full opacity-40 blur-xl"
                          style={{
                            background: `radial-gradient(circle, ${
                              candle.id % 3 === 0 ? '#F472B6' : 
                              candle.id % 3 === 1 ? '#C084FC' : '#FDE047'
                            }, transparent)`
                          }}
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.7, 0.4],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                        />

                        {/* Flame */}
                        <motion.div
                          className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                          animate={{
                            scale: [1, 1.2, 1],
                            y: [0, -2, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                          }}
                        >
                          <div className="relative">
                            <div className="absolute inset-0 w-5 h-7 bg-yellow-400 rounded-full blur-md" />
                            <div className="relative w-5 h-7 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full" 
                                 style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                          </div>
                        </motion.div>

                        {/* Candle stick */}
                        <div
                          className="w-4 h-14 rounded-full shadow-lg"
                          style={{
                            background: candle.id % 3 === 0 
                              ? 'linear-gradient(to bottom, #F9A8D4, #EC4899)' 
                              : candle.id % 3 === 1
                              ? 'linear-gradient(to bottom, #DDD6FE, #A78BFA)'
                              : 'linear-gradient(to bottom, #FEF3C7, #FDE047)'
                          }}
                        />

                        {/* Melting wax drip */}
                        <motion.div
                          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-3 rounded-full opacity-60"
                          style={{
                            background: candle.id % 3 === 0 ? '#FDF2F8' : '#FAF5FF'
                          }}
                          animate={{
                            height: [3, 6, 3],
                            opacity: [0.6, 0.8, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </div>

            {/* Hint instruction */}
            <motion.div
              className="text-center mt-8"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <p className="text-purple-300 text-xs md:text-sm">
                💫 Drag & drop lilin ke tengah lingkaran ajaib 💫
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 text-center max-w-2xl mx-auto"
          >
            {/* Celebration emojis */}
            <motion.div
              className="flex justify-center gap-8 mb-8"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              {['🎉', '✨', '🎂', '✨', '🎉'].map((emoji, i) => (
                <motion.div
                  key={i}
                  className="text-5xl md:text-7xl"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300">
                Happy Birthday
              </span>
            </motion.h1>

            <motion.h2
              className="text-5xl md:text-7xl font-bold text-yellow-300 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{
                textShadow: '0 0 40px rgba(253, 224, 71, 0.8), 0 0 80px rgba(253, 224, 71, 0.4)'
              }}
            >
              sayaaaang! 🎊
            </motion.h2>

            <motion.p
              className="text-pink-300 text-lg md:text-xl mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Semua lilin udah mati! Magic ritual sukses! ✨
            </motion.p>

            <motion.p
              className="text-purple-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Lanjut ke adventure berikutnya yuk...
            </motion.p>

            {/* Sparkle burst effect */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(60)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    backgroundColor: ['#F472B6', '#C084FC', '#FDE047', '#34D399'][i % 4],
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: (Math.cos(i * 6) * (100 + Math.random() * 100)),
                    y: (Math.sin(i * 6) * (100 + Math.random() * 100)),
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.02,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti rain */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                backgroundColor: ['#F9A8D4', '#C084FC', '#FDE047', '#86EFAC'][i % 4],
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, (Math.random() - 0.5) * 100],
                rotate: [0, Math.random() * 720],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                delay: i * 0.03,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}