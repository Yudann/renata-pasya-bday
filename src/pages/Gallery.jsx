import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    { id: 1, src: '/bubub/lucu1.jpg', caption: 'Lucuuu banget! 🥰', rotation: -3, size: 'large', frame: 'polaroid' },
    { id: 2, src: '/bubub/cantik1.jpg', caption: 'Cantik parah sih 💖', rotation: 2, size: 'medium', frame: 'vintage' },
    { id: 3, src: '/bubub/wm1.jpg', caption: 'Gemesin deh! 🌸', rotation: -2, size: 'small', frame: 'polaroid' },
    { id: 4, src: '/bubub/lucu2.jpg', caption: 'Imut bangett 🎀', rotation: 4, size: 'medium', frame: 'modern' },
    { id: 5, src: '/bubub/cantik2.jpg', caption: 'Stunning! ✨', rotation: -4, size: 'large', frame: 'vintage' },
    { id: 6, src: '/bubub/wm2.jpg', caption: 'Vibes-nya oke! 🌟', rotation: 3, size: 'small', frame: 'polaroid' },
    { id: 7, src: '/bubub/lucu3.jpg', caption: 'Gemas abis! 💕', rotation: -1, size: 'medium', frame: 'modern' },
    { id: 8, src: '/bubub/cantik3.jpg', caption: 'Glowing! 🌺', rotation: 2, size: 'large', frame: 'vintage' },
    { id: 9, src: '/bubub/wm3.jpg', caption: 'Cutiee 🦋', rotation: -3, size: 'small', frame: 'polaroid' },
    { id: 10, src: '/bubub/lucu4.jpg', caption: 'Adorable! 🎈', rotation: 1, size: 'medium', frame: 'modern' },
    { id: 11, src: '/bubub/cantik4.jpg', caption: 'Aesthetic sih 🌈', rotation: -2, size: 'large', frame: 'vintage' },
    { id: 12, src: '/bubub/wm4.jpg', caption: 'So pretty! 🌷', rotation: 3, size: 'small', frame: 'polaroid' },
    { id: 13, src: '/bubub/lucu5.jpg', caption: 'Manis! 🍓', rotation: -4, size: 'medium', frame: 'modern' },
    { id: 14, src: '/bubub/cantik5.jpg', caption: 'Flawless 💎', rotation: 2, size: 'large', frame: 'vintage' },
    { id: 15, src: '/bubub/wm5.jpg', caption: 'Charming! 🎀', rotation: -1, size: 'small', frame: 'polaroid' },
  ];

  const sizeClasses = {
    small: 'w-64 h-64',
    medium: 'w-72 h-80',
    large: 'w-80 h-96',
  };

  const frameStyles = {
    polaroid: {
      container: 'bg-white p-4 pb-16 rounded-2xl shadow-2xl border-4 border-white',
      tape: 'absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-yellow-100/80 border-2 border-yellow-200 rotate-0 shadow-md',
    },
    vintage: {
      container: 'bg-amber-50 p-3 pb-14 rounded-lg shadow-2xl border-8 border-amber-200 relative',
      tape: 'absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/70 border border-amber-300 rotate-0 shadow-sm',
      overlay: 'absolute inset-0 bg-amber-300/10 mix-blend-multiply',
    },
    modern: {
      container: 'bg-gradient-to-br from-white to-gray-50 p-2 pb-12 rounded-xl shadow-2xl border-2 border-gray-200 relative overflow-hidden',
      tape: 'hidden',
      accent: 'absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-400',
    }
  };

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      rotate: 0,
      zIndex: 30,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  // Memoized photo component untuk performance
  const PhotoCard = useCallback(({ photo, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover="hover"
      className="break-inside-avoid mb-6 cursor-pointer"
      onClick={() => setSelectedPhoto(photo)}
    >
      <div className="relative group">
        {/* Photo frame berdasarkan type */}
        <div className={`${frameStyles[photo.frame].container} transition-all duration-300 hover:shadow-pink-300/50`}>
          
          {/* Frame overlay untuk vintage */}
          {photo.frame === 'vintage' && (
            <div className={frameStyles.vintage.overlay} />
          )}
          
          {/* Accent bar untuk modern frame */}
          {photo.frame === 'modern' && (
            <div className={frameStyles.modern.accent} />
          )}

          {/* Photo container */}
          <div className={`${sizeClasses[photo.size]} relative overflow-hidden rounded-lg`}>
            <motion.img
              src={photo.src}
              className="w-full h-full object-cover"
              loading="lazy"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23FFB3D9" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="30" fill="%23fff" text-anchor="middle" dy=".3em"%3E📸 Photo ${photo.id}%3C/text%3E%3C/svg%3E';
              }}
            />
            
            {/* Overlay gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Caption */}


          {/* Decorative stickers */}
          <motion.div
            className="absolute -top-3 -right-3 text-4xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatDelay: 2 
            }}
          >
            {['💖', '✨', '🌸', '🦋'][index % 4]}
          </motion.div>
        </div>

        {/* Tape effect */}
        {photo.frame !== 'modern' && (
          <div className={frameStyles[photo.frame].tape} />
        )}
      </div>
    </motion.div>
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-x-hidden">
      {/* Optimized background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => ( // Reduced number for performance
          <motion.div
            key={i}
            className="absolute text-2xl opacity-15" // Smaller opacity
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 8 + Math.random() * 4, // Slower for smoother animation
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['💖', '✨', '🌸', '🦋', '💕', '🌟', '🎀'][i % 7]}
          </motion.div>
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
            Memory Gallery 📸
          </motion.h1>

          <div className="w-24" />
        </div>
      </div>

      {/* Gallery Grid dengan optimized animations */}
      <div className="relative py-16 px-4 md:px-8">
        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {photos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </motion.div>

        {/* Optimized decorative element */}
        <motion.div
          className="fixed bottom-8 right-8 text-5xl opacity-20 pointer-events-none"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          💝
        </motion.div>
      </div>

      {/* Optimized Lightbox Modal */}
      <AnimatePresence mode="wait">
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.button
              className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/30 transition-all z-60"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced polaroid frame for lightbox */}
              <div className="bg-white p-6 pb-20 rounded-3xl shadow-2xl relative">
                {/* Photo booth style corners */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-pink-400 rounded-tl-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-400 rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-pink-400 rounded-br-lg" />

                <div className="relative overflow-hidden rounded-2xl border-4 border-white">
                  <motion.img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.caption}
                    className="w-full h-auto max-h-[60vh] object-contain"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Caption dengan background */}
                <div className="mt-6 text-center">
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border border-pink-200">
                 
                  </div>
                </div>
              </div>

              {/* Optimized confetti effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => ( // Reduced number
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-5%',
                      backgroundColor: ['#FF6BB3', '#A86BFF', '#6BB5FF', '#6BFFA3'][i % 4],
                    }}
                    animate={{
                      y: ['0vh', '105vh'],
                      x: [0, (Math.random() - 0.5) * 50],
                      rotate: [0, Math.random() * 360],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random(),
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer note */}
      <div className="py-12 text-center">
        <motion.p
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
          style={{ fontFamily: 'Baloo 2, cursive' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Setiap momen bersama kamu selalu spesial! 💖✨
        </motion.p>
      </div>
    </div>
  );
}