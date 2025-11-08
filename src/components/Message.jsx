import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Message({ onClose }) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const audioRef = useRef(null);
  const typingIntervalRef = useRef(null);

  const message = `Untuk Renata Pasya yang tersayang...

Selamat ulang tahun yang ke-21! 🎉

Waktu berjalan begitu cepat ya? Rasanya baru kemarin kita ketawa bareng hal-hal receh, dan sekarang kamu sudah bertambah dewasa lagi.

Di umur yang ke-21 ini, semoga:
• Kamu makin percaya diri dengan semua potensi yang kamu punya
• Semua mimpi dan goals-mu perlahan tapi pasti terwujud
• Tetap jadi pribadi yang kuat, mandiri, dan penuh senyuman
• Jangan lupa bahagia dengan hal-hal kecil setiap hari
• Terus jadi Renata yang aku kenal dan sayang banget 😊

Thank you for being such an amazing person in my life. You bring so much joy, laughter, and beautiful chaos into my world.

Tetap jadi dirimu yang authentic, jangan berubah buat siapa pun, dan ingat selalu bahwa kamu itu cukup, kamu itu capable, dan kamu itu deserves semua hal baik di dunia.

Happy 21st birthday, sayang! 
Semoga tahun ini jadi tahun terbaik buat kamu sampai saat ini.

With all my love,
Yudan 💖

P.S: Jangan lupa terima kasih ke Labubu yang udah nemenin kita! 😆`;

  useEffect(() => {
    if (isLetterVisible) {
      typingIntervalRef.current = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayedText(prev => prev + message[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        } else {
          clearInterval(typingIntervalRef.current);
        }
      }, 30);

      return () => {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
      };
    }
  }, [isLetterVisible, currentIndex, message]);

  const unlockAudio = () => {
    if (isMusicPlaying) return;

    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.volume = 0.6;

      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(error => {
          console.warn("Gagal memutar audio:", error);
        });
    }
  };

  const openEnvelope = () => {
    if (isEnvelopeOpened) {
      showLetter();
      return;
    }

    setIsEnvelopeOpened(true);
    unlockAudio();

    setTimeout(() => {
      showLetter();
    }, 1200);

    setTimeout(() => {
      setShowMusicPlayer(true);
    }, 3500);
  };

  const showLetter = () => {
    setIsLetterVisible(true);
  };

  const closeLetter = () => {
    setIsLetterVisible(false);
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }
    onClose();
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        unlockAudio();
      }
    }
  };

  const readAgain = () => {
    setIsLetterVisible(false);
    setDisplayedText('');
    setCurrentIndex(0);
    
    setTimeout(() => {
      showLetter();
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
      style={{ 
        background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)',
        fontFamily: 'Georgia, Times New Roman, serif'
      }}
    >
      {/* Main Container */}
      <div className="relative w-full max-w-4xl text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 z-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mb-4 px-4">
            Just you, being effortlessly my favorite view 💖
          </h1>
          <p className="text-lg md:text-xl text-pink-600 max-w-md mx-auto px-4">
            {isEnvelopeOpened ? '💌 Surat spesial untukmu!' : 'Click the envelope to open your special letter!'}
          </p>
        </motion.div>

        {/* Envelope Container - Sama persis dengan desain HTML */}
        <motion.div
          className={`relative mx-auto w-80 h-56 cursor-pointer transition-all duration-500 perspective-1000 ${
            isEnvelopeOpened ? '' : 'animate-bounce'
          }`}
          style={{
            width: '320px',
            height: '220px'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            y: isEnvelopeOpened ? 0 : [0, -10, 0]
          }}
          transition={{ 
            delay: 0.5,
            y: {
              duration: 3,
              repeat: isEnvelopeOpened ? 0 : Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={!isEnvelopeOpened ? { 
            scale: 1.05, 
            filter: "brightness(1.05)" 
          } : {}}
          onClick={openEnvelope}
        >
          {/* Envelope Body */}
          <div 
            className="absolute inset-0 rounded-xl z-10 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #f8b4d9 0%, #f8a5c8 100%)',
              borderRadius: '12px',
              boxShadow: `
                0 15px 35px rgba(219, 39, 119, 0.3),
                inset 0 2px 10px rgba(255, 255, 255, 0.4)
              `
            }}
          >
            {/* Light Effect */}
            <motion.div 
              className="absolute rounded-lg"
              style={{
                top: '20%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 223, 0, 0.3) 30%, transparent 70%)',
                borderRadius: '12px'
              }}
              animate={{ opacity: isEnvelopeOpened ? [0.4, 0.8, 0.4] : 0 }}
              transition={{ duration: 2, repeat: isEnvelopeOpened ? Infinity : 0 }}
            />
            
            {/* Letter Inside */}
            <div 
              className="absolute rounded-lg"
              style={{
                top: '20px',
                left: '15px',
                right: '15px',
                height: '170px',
                background: '#fffef7',
                borderRadius: '8px',
                boxShadow: `
                  0 2px 10px rgba(0, 0, 0, 0.1),
                  inset 0 0 20px rgba(219, 39, 119, 0.05)
                `,
                opacity: 0.9
              }}
            >
              {/* Letter Lines */}
              <div 
                className="absolute"
                style={{
                  top: '30px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px'
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-px mb-3"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(219, 39, 119, 0.2) 50%, transparent 100%)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Envelope Flap */}
          <motion.div
            className="absolute rounded-t-xl shadow-lg z-20"
            style={{
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: 'linear-gradient(135deg, #f8a5c8 0%, #db2777 100%)',
              borderRadius: '12px 12px 0 0',
              boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.1)',
              transformOrigin: 'top'
            }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isEnvelopeOpened ? -180 : 0 }}
            transition={{ duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
          >
            {/* Triangle part of flap */}
            <div 
              className="absolute"
              style={{
                bottom: '-50px',
                left: 0,
                width: 0,
                height: 0,
                borderLeft: '160px solid transparent',
                borderRight: '160px solid transparent',
                borderTop: '50px solid #f8a5c8'
              }}
            />
          </motion.div>

          {/* Sparkles */}
          {!isEnvelopeOpened && (
            <>
              <motion.div
                className="absolute rounded-full pointer-events-none z-15"
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 223, 0, 0.8) 100%)',
                  top: '10%',
                  left: '10%'
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div
                className="absolute rounded-full pointer-events-none z-15"
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 223, 0, 0.8) 100%)',
                  top: '15%',
                  right: '15%'
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute rounded-full pointer-events-none z-15"
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 223, 0, 0.8) 100%)',
                  bottom: '20%',
                  left: '20%'
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              <motion.div
                className="absolute rounded-full pointer-events-none z-15"
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 223, 0, 0.8) 100%)',
                  bottom: '15%',
                  right: '10%'
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 1.5,
                }}
              />
            </>
          )}

          {/* Heart on Envelope */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl z-25"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-8 z-10"
        >
          {isEnvelopeOpened && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={readAgain}
              className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                boxShadow: '0 6px 20px rgba(219, 39, 119, 0.4)'
              }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              📖 Baca Lagi
            </motion.button>
          )}
          
          <motion.button
            onClick={closeLetter}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              boxShadow: '0 6px 20px rgba(219, 39, 119, 0.4)'
            }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            🎂 Kembali ke Kue
          </motion.button>
        </motion.div>

        {/* Music Player */}
        <AnimatePresence>
          {showMusicPlayer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-6 right-6 bg-white/95 p-5 rounded-3xl shadow-2xl border-2 border-pink-300/30 z-60"
              style={{
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(236, 72, 153, 0.2)'
              }}
            >
              <audio 
                ref={audioRef} 
                loop
                muted
                src="/birthday-music.mp3"
              />
              <div className="text-pink-500 font-semibold text-sm mb-3 text-center">
                🎵 Musik Spesial untuk Renata
              </div>
              <button
                onClick={toggleMusic}
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-bold py-3 px-6 rounded-full hover:shadow-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
                }}
              >
                {isMusicPlaying ? '⏸️ Pause Music' : '🔊 Play Music'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Letter Modal */}
      <AnimatePresence>
        {isLetterVisible && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={closeLetter}
            />
            
            {/* Letter Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[80vh] bg-amber-50 rounded-2xl shadow-2xl border-4 border-pink-300 z-50 overflow-hidden"
              style={{
                background: '#fffef7',
                boxShadow: `
                  0 25px 70px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(255, 255, 255, 0.9),
                  inset 0 0 30px rgba(219, 39, 119, 0.05)
                `
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLetter}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-pink-400/10 border-2 border-pink-400 text-pink-500 text-xl flex items-center justify-center hover:bg-pink-400 hover:text-white transition-all duration-300 z-10"
                style={{
                  background: 'rgba(219, 39, 119, 0.1)',
                  border: '2px solid #ec4899'
                }}
              >
                ×
              </button>

              {/* Letter Content */}
              <div className="p-8 md:p-10 overflow-y-auto max-h-[70vh]">
                <div className="font-serif text-gray-800 leading-relaxed">
                  {/* Letter Header */}
                  <div className="text-center mb-8 pb-8 border-b-2 border-pink-300/30 relative">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent"
                        style={{
                          background: 'linear-gradient(135deg, #ec4899, #db2777)',
                          WebkitBackgroundClip: 'text'
                        }}>
                      Happy 21st Birthday, Renata! 🎉
                    </h2>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-amber-50 px-4 text-2xl"
                         style={{ background: '#fffef7' }}>
                      💌
                    </div>
                  </div>

                  {/* Salutation */}
                  <div className="text-xl font-bold text-pink-500 mb-8 text-center">
                    Untuk Renata Pasya yang tersayang...
                  </div>

                  {/* Letter Body */}
                  <div className="space-y-6 text-justify">
                    {displayedText.split('\n').map((paragraph, index) => (
                      paragraph.trim() && (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="leading-8 text-gray-800"
                          style={{ lineHeight: '1.9' }}
                        >
                          {paragraph}
                          {index === displayedText.split('\n').length - 1 && currentIndex < message.length && (
                            <span className="inline-block w-2 h-6 bg-pink-500 ml-1 animate-pulse" />
                          )}
                        </motion.p>
                      )
                    ))}
                  </div>

                  {/* Closing */}
                  <div className="text-right mt-12 italic text-gray-600">
                    <div>With all my love,</div>
                    <div className="text-2xl font-bold text-pink-500 mt-4 not-italic">
                      Yudan <span className="animate-pulse">💖</span>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  {currentIndex < message.length && (
                    <div className="text-center mt-8">
                      <div className="inline-flex items-center gap-3 text-pink-600 text-sm">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⏳
                        </motion.div>
                        Mengetik pesan spesial...
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}