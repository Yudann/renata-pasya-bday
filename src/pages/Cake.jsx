import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

export default function Candles() {
  const [showWishModal, setShowWishModal] = useState(true);
  const navigate = useNavigate();
  const [wishText, setWishText] = useState('');
  const [isBlown, setIsBlown] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [blowStrength, setBlowStrength] = useState(0);
  const [showManualOption, setShowManualOption] = useState(false);
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);
  const manualOptionTimerRef = useRef(null);

  const leftPhotos = [
    '/bubub/lucu1.jpg',
    '/bubub/lucu2.jpg',
    '/bubub/lucu3.jpg',
    '/bubub/lucu4.jpg',
    '/bubub/lucu5.jpg',
  ];

  const rightPhotos = [
    '/bubub/lucu6.jpg',
    '/bubub/lucu7.jpg',
    '/bubub/lucu8.jpg',
    '/bubub/lucu9.jpg',
    '/bubub/lucu10.jpg',
  ];

  // Initialize audio context and microphone
  const initMicrophone = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true
      });
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.3;
      
      source.connect(analyserRef.current);
      microphoneRef.current = source;
      
      setIsListening(true);
      startBlowDetection();
      
      // Show manual option after 10 seconds if not blown
      manualOptionTimerRef.current = setTimeout(() => {
        setShowManualOption(true);
      }, 10000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      // Jika microphone gagal, langsung tunjukkan manual option
      setShowManualOption(true);
      setIsListening(false);
    }
  };

  // Detect blow strength from microphone - SUPER SENSITIVE
  const startBlowDetection = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const blowThreshold = 15; // SANGAT RENDAH

    const detectBlow = () => {
      if (!isListening) return;

      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume from low frequencies
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += dataArray[i];
      }
      const average = sum / 10;
      
      // Normalize to 0-100 scale dengan sensitivitas tinggi
      const strength = Math.min(100, (average / 255) * 500);
      setBlowStrength(strength);

      // Check if blow is strong enough - threshold sangat rendah
      if (strength > blowThreshold && !isBlown) {
        handleBlowCandles();
      }

      animationFrameRef.current = requestAnimationFrame(detectBlow);
    };

    animationFrameRef.current = requestAnimationFrame(detectBlow);
  };

  // Stop microphone listening
  const stopMicrophone = () => {
    setIsListening(false);
    
    if (manualOptionTimerRef.current) {
      clearTimeout(manualOptionTimerRef.current);
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (microphoneRef.current) {
      microphoneRef.current.disconnect();
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const handleMakeWish = () => {
    if (wishText.trim().length > 0) {
      setShowWishModal(false);
      setTimeout(() => {
        initMicrophone();
      }, 500);
    }
  };

const handleBlowCandles = () => {
  if (isBlown) return;
  
  setIsBlown(true);
  stopMicrophone();
  setShowManualOption(false);
  
  setTimeout(() => {
    setShowCelebration(true);
    
    // Redirect ke gift page setelah 3 detik
    setTimeout(() => {
      navigate('/gift'); // Ganti '/gift' dengan route gift page kamu
    }, 3000);
  }, 800);
};

  // Manual blow function
  const handleManualBlow = () => {
    handleBlowCandles();
  };

  // Skip microphone and go straight to manual
  const handleSkipMicrophone = () => {
    stopMicrophone();
    setShowManualOption(true);
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center relative overflow-hidden">
      {/* Floating hearts and sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 4 === 0 ? '💖' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🎂' : '🎀'}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center gap-8">
        {/* Left Photo Slider - Animasi ke ATAS */}
        <div className="hidden lg:block w-48 h-[900px] relative overflow-hidden">
          <motion.div
            animate={{ y: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-col gap-4"
          >
            {[...leftPhotos, ...leftPhotos].map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: -3, zIndex: 10 }}
                className="relative group flex-shrink-0"
              >
                <div className="w-48 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-white">
                  <img
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="160"%3E%3Crect fill="%23F9A8D4" width="200" height="160"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%23fff" text-anchor="middle" dy=".3em"%3E📸 ${(index % 5) + 1}%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Center Cake Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 max-w-2xl text-center"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-12"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontFamily: 'Baloo 2, cursive' }}
          >
            Happy 21st Birthday! 🎉
          </motion.h1>

          {/* Blow Status */}
          <AnimatePresence>
            {isListening && !isBlown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-8 space-y-4"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl py-4 px-8 inline-block shadow-lg border-2 border-pink-300">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        scale: blowStrength > 5 ? [1, 1.2, 1] : 1 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      💨
                    </motion.div>
                    <div className="text-center">
                      <p className="text-gray-700 text-lg font-semibold mb-2">
                        {blowStrength > 10 ? 'TERUSKAN! 💨' : 'TIUP LILINNYA SEKARANG!'}
                      </p>
                      <div className="w-48 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${blowStrength}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Kekuatan: {Math.round(blowStrength)}%
                      </p>
                    </div>
                    <motion.div
                      animate={{ 
                        scale: blowStrength > 5 ? [1, 1.2, 1] : 1 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      💨
                    </motion.div>
                  </div>
                </div>

                {/* Skip microphone button */}
                <motion.button
                  onClick={handleSkipMicrophone}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎤 Kesulitan meniup? Klik di sini
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Manual Blow Option */}
          <AnimatePresence>
            {showManualOption && !isBlown && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl py-6 px-8 shadow-2xl border-2 border-blue-300">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <span className="text-2xl">💡</span>
                      <p className="text-lg font-semibold">Alternatif</p>
                      <span className="text-2xl">💡</span>
                    </div>
                    <p className="text-gray-700">
                      Atau gunakan tombol di bawah untuk mematikan lilin
                    </p>
                    <motion.button
                      onClick={handleManualBlow}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-blue-300/50 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ fontFamily: 'Baloo 2, cursive' }}
                    >
                      🕯️ Matikan Lilin
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cake Container */}
          <div className="relative flex justify-center items-end" style={{ height: '450px' }}>
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Cake plate shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-96 h-8 rounded-full blur-xl opacity-60"
                   style={{ background: 'radial-gradient(circle, rgba(219, 39, 119, 0.4), transparent)' }} />

              <div className="relative flex flex-col-reverse">
                {/* Layer 1 - Bottom (BIGGEST - Pink) */}
                <div
                  className="relative mx-auto rounded-t-[3rem] overflow-hidden"
                  style={{
                    width: '320px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #c51162 0%, #db2777 100%)',
                    boxShadow: '0 -6px 25px rgba(219, 39, 119, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Frosting top */}
                  <div
                    className="absolute top-0 left-0 right-0 rounded-t-[3rem]"
                    style={{
                      height: '12px',
                      background: 'repeating-linear-gradient(90deg, #fff3e0 0px, #fff3e0 20px, #ffe0b2 20px, #ffe0b2 40px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-white/10" />
                  {/* Sprinkles */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        left: `${8 + i * 6}%`,
                        top: `${35 + (i % 3) * 15}%`,
                        background: ['#ec4899', '#f472b6', '#a855f7', '#fbbf24', '#34d399'][i % 5],
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>

                {/* Layer 2 - Middle (MEDIUM - Blush Pink) */}
                <div
                  className="relative mx-auto rounded-t-[2.5rem] overflow-hidden"
                  style={{
                    width: '288px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #f48fb1 0%, #fbcfe8 100%)',
                    boxShadow: '0 -6px 22px rgba(244, 143, 177, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Frosting top */}
                  <div
                    className="absolute top-0 left-0 right-0 rounded-t-[2.5rem]"
                    style={{
                      height: '10px',
                      background: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0px, rgba(255, 255, 255, 0.6) 15px, rgba(255, 255, 255, 0.3) 15px, rgba(255, 255, 255, 0.3) 30px)',
                    }}
                  />
                  <div className="absolute inset-0 bg-white/10" />
                </div>

                {/* Layer 3 - Top (SMALLEST - Cream) */}
                <div
                  className="relative mx-auto rounded-t-[2rem] overflow-hidden"
                  style={{
                    width: '256px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                    boxShadow: '0 -6px 20px rgba(255, 224, 178, 0.5), inset 0 2px 6px rgba(255, 255, 255, 0.4)',
                  }}
                >
                  {/* Frosting top */}
                  <div
                    className="absolute top-0 left-0 right-0 rounded-t-[2rem]"
                    style={{
                      height: '8px',
                      background: 'repeating-linear-gradient(90deg, rgba(219, 39, 119, 0.4) 0px, rgba(219, 39, 119, 0.4) 12px, transparent 12px, transparent 24px)',
                    }}
                  />
                  <div className="absolute inset-0 bg-white/10" />
                </div>

                {/* Shimmer effect on all layers */}
                <motion.div
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-[3rem]"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    width: '50%',
                  }}
                />

                {/* Candles - Number 2 and 1 */}
                <div className="absolute left-1/2 -translate-x-1/2 flex gap-6" style={{ top: '-100px' }}>
                  <AnimatePresence>
                    {!isBlown && (
                      <>
                        {/* Candle 2 */}
                        <motion.div
                          className="relative flex flex-col items-center"
                          exit={{ opacity: 0, scale: 0, y: -80, rotate: 45 }}
                          transition={{ duration: 0.6 }}
                        >
                          {/* Flame */}
                          <motion.div
                            className="absolute"
                            style={{ top: '-35px' }}
                            animate={{
                              scale: [1, 1.15, 1],
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 0.15,
                              repeat: Infinity,
                            }}
                          >
                            <div className="relative">
                              {/* Glow */}
                              <motion.div
                                className="absolute rounded-full blur-lg"
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  left: '-5px',
                                  top: '-5px',
                                  background: 'radial-gradient(circle, rgba(255, 165, 0, 0.9), transparent)',
                                }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 0.9, 0.5],
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                }}
                              />
                              {/* Flame body */}
                              <div
                                style={{
                                  width: '20px',
                                  height: '40px',
                                  background: 'linear-gradient(to top, #FFA500 0%, #FF6347 50%, #FFD700 100%)',
                                  borderRadius: '50% 50% 20% 20%',
                                  position: 'relative',
                                }}
                              />
                            </div>
                          </motion.div>

                          {/* Number 2 */}
                          <div
                            className="text-6xl font-bold mb-1 relative"
                            style={{
                              color: '#c51162',
                              textShadow: '3px 3px 8px rgba(255, 255, 255, 0.8)',
                              fontFamily: 'Baloo 2, cursive',
                            }}
                          >
                            2
                          </div>

                          {/* Candle body */}
                          <div
                            className="rounded-full"
                            style={{
                              width: '24px',
                              height: '80px',
                              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                              boxShadow: '0 8px 20px rgba(255, 165, 0, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.6)',
                              border: '3px solid rgba(255, 215, 0, 0.6)',
                            }}
                          />
                        </motion.div>

                        {/* Candle 1 */}
                        <motion.div
                          className="relative flex flex-col items-center"
                          exit={{ opacity: 0, scale: 0, y: -80, rotate: -45 }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                        >
                          {/* Flame */}
                          <motion.div
                            className="absolute"
                            style={{ top: '-35px' }}
                            animate={{
                              scale: [1, 1.15, 1],
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 0.15,
                              repeat: Infinity,
                              delay: 0.1,
                            }}
                          >
                            <div className="relative">
                              {/* Glow */}
                              <motion.div
                                className="absolute rounded-full blur-lg"
                                style={{
                                  width: '30px',
                                  height: '30px',
                                  left: '-5px',
                                  top: '-5px',
                                  background: 'radial-gradient(circle, rgba(255, 165, 0, 0.9), transparent)',
                                }}
                                animate={{
                                  scale: [1, 1.3, 1],
                                  opacity: [0.5, 0.9, 0.5],
                                }}
                                transition={{
                                  duration: 0.5,
                                  repeat: Infinity,
                                  delay: 0.1,
                                }}
                              />
                              {/* Flame body */}
                              <div
                                style={{
                                  width: '20px',
                                  height: '40px',
                                  background: 'linear-gradient(to top, #FFA500 0%, #FF6347 50%, #FFD700 100%)',
                                  borderRadius: '50% 50% 20% 20%',
                                  position: 'relative',
                                }}
                              />
                            </div>
                          </motion.div>

                          {/* Number 1 */}
                          <div
                            className="text-6xl font-bold mb-1 relative"
                            style={{
                              color: '#c51162',
                              textShadow: '3px 3px 8px rgba(255, 255, 255, 0.8)',
                              fontFamily: 'Baloo 2, cursive',
                            }}
                          >
                            1
                          </div>

                          {/* Candle body */}
                          <div
                            className="rounded-full"
                            style={{
                              width: '24px',
                              height: '80px',
                              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                              boxShadow: '0 8px 20px rgba(255, 165, 0, 0.5), inset 0 2px 10px rgba(255, 255, 255, 0.6)',
                              border: '3px solid rgba(255, 215, 0, 0.6)',
                            }}
                          />
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Photo Slider - Animasi ke BAWAH */}
        <div className="hidden lg:block w-48 h-[900px] relative overflow-hidden">
          <motion.div
            animate={{ y: [-1000, 0] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex flex-col gap-4"
          >
            {[...rightPhotos, ...rightPhotos].map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, rotate: 3, zIndex: 10 }}
                className="relative group flex-shrink-0"
              >
                <div className="w-48 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-white">
                  <img
                    src={photo}
                    alt={`Memory ${index + 6}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="160"%3E%3Crect fill="%23C084FC" width="200" height="160"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%23fff" text-anchor="middle" dy=".3em"%3E📸 ${(index % 5) + 6}%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wish Modal */}
      <AnimatePresence>
        {showWishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-pink-300"
            >
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🌟
                  </motion.span>
                  <h2 className="text-3xl font-bold text-pink-600" style={{ fontFamily: 'Baloo 2, cursive' }}>
                    Make A Wish!
                  </h2>
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  >
                    🌟
                  </motion.span>
                </div>

                <p className="text-gray-700 text-base">
                  Sebelum tiup lilinnya, tulis harapan paling istimewa kamu~ 💖
                </p>

                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Tulis harapan rahasiamu di sini... ✨"
                  className="w-full h-32 px-4 py-3 bg-pink-50 border-2 border-pink-300 rounded-2xl text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all resize-none"
                  autoFocus
                />

                <p className="text-gray-500 text-sm">
                  💫 Coba tiup lilin dengan microphone, atau gunakan tombol alternatif 💫
                </p>

                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={handleMakeWish}
                    disabled={wishText.trim().length === 0}
                    className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${
                      wishText.trim().length > 0
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    whileHover={wishText.trim().length > 0 ? { scale: 1.02 } : {}}
                    whileTap={wishText.trim().length > 0 ? { scale: 0.98 } : {}}
                    style={{ fontFamily: 'Baloo 2, cursive' }}
                  >
                    {wishText.trim().length > 0 ? '✨ Siap! Tiup Sekarang 🎂' : '💭 Tulis harapan dulu ya...'}
                  </motion.button>

                  <button
                    onClick={() => setShowWishModal(false)}
                    className="w-full py-3 rounded-2xl font-semibold text-gray-600 border-2 border-gray-300 hover:bg-gray-100 transition-all"
                    style={{ fontFamily: 'Baloo 2, cursive' }}
                  >
                    Nanti Dulu
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-4 border-pink-400 max-w-md mx-4 text-center"
            >
              <motion.div
                className="text-7xl mb-6"
                animate={{ rotate: [0, 360], scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎊
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Baloo 2, cursive' }}>
                Semoga Terkabul! ✨
              </h2>
              <p className="text-gray-600 text-lg">
                Harapanmu pasti akan menjadi kenyataan 💖
              </p>
            </motion.div>

            {/* Confetti */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(100)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    backgroundColor: ['#ec4899', '#a855f7', '#fbbf24', '#f472b6'][i % 4],
                  }}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos(i * 3.6) * (150 + Math.random() * 150),
                    y: Math.sin(i * 3.6) * (150 + Math.random() * 150),
                  }}
                  transition={{
                    duration: 1.8,
                    delay: i * 0.01,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}