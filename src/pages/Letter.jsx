import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function Letter() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [typingProgress, setTypingProgress] = useState([]);
  
  const audioRef = useRef(null);
  const instructionText = "Click the envelope to open your special letter!";

  const letterContent = [
    "Semoga di umur baru ini kamu selalu diberi kesehatan, kelancaran, dan kebahagiaan dalam setiap langkah. You deserve all the good things in life.",
    "Thank you for being you, and for sharing your journey with me. Aku tau sometimes things get tough, but i'll always be here, cheering you on.",
    "Maaf ya kalo aku ngucapin banyak hari ini, it's just because i really want this day to feel extra special for you. Biar kamu inget kalo ada banyak cinta, doa, dan perhatian buat kamu di hari ini. I don't ever get tired of saying it, because celebrating you will never feel enough.",
    "Hari ini bukan cuma kamu bertambah usia, tapi juga how far you've come, all the things you've been through, and how strong you are. Aku bangga banget sama kamu, and i hope you can feel it every time i say happy birthday. ❤"
  ];

  // Initialize typing progress
  useEffect(() => {
    setTypingProgress(letterContent.map(() => ({
      text: '',
      isTyping: false,
      isFinished: false
    })));
  }, []);

  const unlockAudio = () => {
    if (!audioRef.current || isAudioUnlocked) return;

    audioRef.current.muted = false;
    audioRef.current.volume = 0.6;
    setIsAudioUnlocked(true);

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch(error => {
          console.warn("Gagal memutar audio:", error);
          audioRef.current.muted = true;
          setIsMusicPlaying(false);
        });
    }
  };

  const typeParagraph = async (paragraphIndex, delay = 0) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const text = letterContent[paragraphIndex];
        let currentText = '';
        let index = 0;

        setTypingProgress(prev => {
          const newProgress = [...prev];
          newProgress[paragraphIndex] = { 
            ...newProgress[paragraphIndex], 
            isTyping: true 
          };
          return newProgress;
        });

        const typingInterval = setInterval(() => {
          if (index < text.length) {
            currentText += text.charAt(index);
            setTypingProgress(prev => {
              const newProgress = [...prev];
              newProgress[paragraphIndex] = { 
                ...newProgress[paragraphIndex], 
                text: currentText 
              };
              return newProgress;
            });
            index++;
          } else {
            clearInterval(typingInterval);
            setTypingProgress(prev => {
              const newProgress = [...prev];
              newProgress[paragraphIndex] = { 
                ...newProgress[paragraphIndex], 
                isTyping: false,
                isFinished: true 
              };
              return newProgress;
            });
            resolve();
          }
        }, 25);
      }, delay);
    });
  };

  const displayLetterContent = async () => {
    for (let i = 0; i < letterContent.length; i++) {
      await typeParagraph(i, i === 0 ? 0 : 500);
    }
  };

  const openEnvelope = async () => {
    if (isEnvelopeOpened) {
      showLetter();
      return;
    }

    setIsEnvelopeOpened(true);
    unlockAudio();

    // Tunggu animasi amplop terbuka selesai
    await new Promise(resolve => setTimeout(resolve, 1200));
    showLetter();
  };

  const showLetter = () => {
    setIsLetterVisible(true);
    displayLetterContent();
  };

  const closeLetter = () => {
    setIsLetterVisible(false);
  };

  const readAgain = () => {
    closeLetter();
    setTimeout(() => {
      // Reset typing progress
      setTypingProgress(letterContent.map(() => ({
        text: '',
        isTyping: false,
        isFinished: false
      })));
      showLetter();
    }, 600);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsMusicPlaying(true))
          .catch(error => console.warn("Gagal memutar audio:", error));
      }
    }
  };

  // Auto play music on load (muted)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.warn("Autoplay muted:", e);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 relative overflow-x-hidden">
      {/* Background Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-5 h-5 rounded-full bg-gradient-to-br from-white to-yellow-200"
            style={{
              top: `${[10, 15, 80, 85][i]}%`,
              left: `${[10, 85, 20, 90][i]}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b-4 border-pink-200 shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <motion.button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-5 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-300/50 transition-all"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            style={{ fontFamily: 'Baloo 2, cursive' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Surat Spesial 💌
          </motion.h1>

          <div className="w-24" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 relative z-10">
        {/* Title Section */}
        <motion.div
          className="text-center mb-12 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-pink-700 mb-4 px-4">
            Just you, being effortlessly my favorite view 💖
          </h1>
          <p className="text-lg md:text-xl text-pink-600 max-w-md mx-auto px-4">
            {isEnvelopeOpened ? '💌 Surat spesial untukmu!' : instructionText}
          </p>
        </motion.div>

        {/* Envelope */}
        <motion.div
          className={`envelope relative w-80 h-56 cursor-pointer perspective-1000 ${
            !isEnvelopeOpened ? 'envelope-float' : ''
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={!isEnvelopeOpened ? { scale: 1.05 } : {}}
          onClick={openEnvelope}
        >
          {/* Envelope Body */}
          <div className="envelope-body absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 rounded-xl shadow-2xl z-10 overflow-hidden">
            {/* Light Effect */}
            <motion.div
              className="light-effect absolute inset-4 bg-radial from-white/90 via-yellow-300/30 to-transparent rounded-lg opacity-0 z-2"
              animate={isEnvelopeOpened ? { opacity: [0.4, 0.8, 0.4] } : {}}
              transition={{ duration: 2, repeat: isEnvelopeOpened ? Infinity : 0 }}
            />
            
            {/* Letter Inside */}
            <div className="letter-inside absolute top-5 left-4 right-4 h-44 bg-amber-50 rounded-lg shadow-inner z-15 opacity-90">
              <div className="letter-lines absolute top-8 left-5 right-5 bottom-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="letter-line h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent mb-3" />
                ))}
              </div>
            </div>
          </div>

          {/* Envelope Flap */}
          <motion.div
            className="envelope-flap absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-pink-400 to-pink-500 rounded-t-xl shadow-lg z-20 origin-top"
            animate={isEnvelopeOpened ? { rotateX: -180 } : { rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-8 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <AnimatePresence>
            {isEnvelopeOpened && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={readAgain}
                className="action-button bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-300/50 transition-all"
              >
                📖 Baca Lagi
              </motion.button>
            )}
          </AnimatePresence>
          
          <motion.button
            onClick={() => window.location.href = '/kue'}
            className="action-button bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-300/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎂 Kembali ke Kue
          </motion.button>
        </motion.div>
      </div>

      {/* Music Player */}
      <AnimatePresence>
        {isEnvelopeOpened && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5 }}
            className="music-player fixed bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border-2 border-pink-200 z-60"
          >
            <div className="music-info text-sm text-pink-500 font-semibold mb-2">
              🎵 Abadi - Perunggu
            </div>
            <button
              onClick={toggleMusic}
              className="action-button flex items-center gap-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm py-2 px-4 rounded-full font-semibold shadow-lg hover:shadow-pink-300/50 transition-all"
            >
              {isMusicPlaying ? <Pause size={16} /> : <Play size={16} />}
              {isMusicPlaying ? 'Pause Music' : 'Play Music'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter Modal */}
      <AnimatePresence>
        {isLetterVisible && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
              onClick={closeLetter}
            />
            
            {/* Letter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
              className="letter-out fixed top-10 left-52 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[85vh] bg-amber-50 rounded-3xl shadow-2xl border-4 border-white z-50 overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={closeLetter}
                className="close-button absolute top-4 right-4 w-10 h-10 rounded-full bg-pink-500/10 border-2 border-pink-500 text-pink-500 text-xl flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all z-10"
              >
                ×
              </button>

              {/* Letter Content */}
              <div className="letter-content p-8 md:p-10">
                {/* Photo Booth Corners */}
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-pink-400 rounded-tl-lg" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-purple-400 rounded-tr-lg" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-pink-400 rounded-br-lg" />

                <div className="letter-header text-center mb-8 pb-8 border-b-2 border-pink-500/20 relative">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Happy 21th Birthday, sayaaang! 🎉
                  </h2>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-amber-50 px-4 text-2xl">
                    💌
                  </div>
                </div>

                <div className="letter-salutation text-xl md:text-2xl font-cursive text-pink-500 mb-6 font-bold">
                  To my favorite person, Renata Pasya   !
                </div>

                <div className="letter-body mb-8 space-y-6">
                  {typingProgress.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className="letter-paragraph text-justify leading-relaxed text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: paragraph.text ? 1 : 0 }}
                    >
                      {paragraph.text}
                      {paragraph.isTyping && (
                        <span className="inline-block w-1 h-5 bg-pink-500 ml-1 animate-pulse" />
                      )}
                    </motion.p>
                  ))}
                </div>

                <div className="letter-closing text-right mt-10 text-gray-600 italic">
                  <div>All my love (and all my prayers),</div>
                  <div className="letter-signature text-2xl font-cursive text-pink-500 font-bold not-italic mt-2">
                    Yudannnnn — the one who'll always be here for you.
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        loop
        muted
        playsInline
        className="hidden"
      >
        <source src="/assets/perunggu-ini-abadi.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Custom Styles */}
      <style jsx>{`
        .envelope-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .font-cursive {
          font-family: 'Dancing Script', cursive;
        }

        .bg-radial {
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.9) 0%, rgba(255,223,0,0.3) 30%, transparent 70%);
        }
      `}</style>

      {/* External Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Dancing+Script:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}