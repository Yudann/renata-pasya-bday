import { motion } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            {['💖', '✨', '🌸', '🦋', '💕'][i % 5]}
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
            Our Story 💕
          </motion.h1>

          <div className="w-24" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side - Sticky Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32 self-start lg:w-1/3"
          >
            <div className="relative">
              {/* Photo Frame */}
              <motion.div
                className="relative bg-white rounded-3xl p-6 shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative corners */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-pink-400 rounded-tl-lg" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-purple-400 rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-pink-400 rounded-br-lg" />
                
                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pink-200 to-purple-200">
                  <img
                    src="/bubub/wm7.jpg" // Ganti dengan path foto kamu
                    alt="My Photo"
                    className="w-full h-96 object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23F9A8D4" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23fff" text-anchor="middle" dy=".3em"%3E📸 Photo%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Name Tag */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      Bertoooo
                    </span>
                    <Heart className="w-5 h-5" fill="white" />
                    <span className="font-bold text-lg" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      Ciciiii
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 text-4xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 text-4xl"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                💖
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Scrollable Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white overflow-hidden">
              {/* Text Content */}
              <div className="p-8 md:p-12 max-h-[70vh] overflow-y-auto">
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  {/* Introduction */}
                  <div className="text-center mb-8">
                    <motion.h2
                      className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                      style={{ fontFamily: 'Baloo 2, cursive' }}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, duration: 0.5 }}
                    >
                      Cerita Kita
                    </motion.h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto" />
                  </div>

                  {/* Story paragraphs with large text */}
                  <motion.div
                    className="space-y-6 text-gray-800"
                    style={{ fontSize: '3rem', lineHeight: '1.2' }}
                  >
                   <p> Dari pertama kali kita ketemu, aku udah ngerasa ada yang beda dari kamu. Gatau kenapa, tiba-tiba jadi excited lagi buat hidup, jadi pengen jatuh cinta lagi. Kayak *dayumm*, ada something di orang ini — dan yang bikin aneh, aku beneran bisa jatuh cinta lagi xixiix. 💞 </p> <p> Aku suka banget versi diriku pas bareng kamu. Aku bisa jadi diri sendiri, ngomong apa aja tanpa takut aneh, dan semuanya tuh selalu terasa ringan. Kamu tuh punya vibe yang bikin aku ngerasa aman dan diterima apa adanya. </p> <p> Hal-hal kecil dari kamu tuh selalu bikin aku jatuh cinta lagi dan lagi. Cara kamu ngomong, cara kamu senyum, cara kamu peduli sama orang — semuanya tuh nyantol banget di kepala. </p> <p> Kacamata kamu, tatapan kamu, tawa kamu, semua detail kecil itu tuh kayak… entah kenapa manis banget. Bikin aku senyum sendiri tiap kali inget. </p> <p> Aku ga tau gimana caranya jelasin, tapi kamu tuh punya efek yang susah dijelasin — yang jelas, kamu bikin aku ngerasa hidup lagi, dan itu sesuatu yang ga semua orang bisa lakuin. </p> <p> Intinya, aku suka kamu. Bukan cuma karena kamu spesial, tapi karena tiap hari aku selalu nemuin alasan baru buat jatuh cinta lagi sama kamu. 💗 </p>
                  </motion.div>

                  {/* Closing */}
                  <motion.div
                    className="text-center mt-12 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border-2 border-pink-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                  >
                    <p className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
                      To You, Always 🌷”
                    </p>
                    <p className="text-2xl text-gray-600" style={{ fontFamily: 'Baloo 2, cursive' }}>
                      -berto
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="text-center py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="text-sm">Scroll untuk baca lebih lanjut</span>
                  <span>👇</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating action button */}
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          className="bg-gradient-to-r from-pink-400 to-purple-400 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Heart className="w-6 h-6" fill="white" />
        </motion.button>
      </motion.div>
    </div>
  );
}