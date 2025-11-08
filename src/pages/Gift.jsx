import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cake, Images, Mail, Heart } from 'lucide-react';

const menuItems = [
  {
    id: 'cake',
    title: 'Kue Ultah',
    icon: Cake,
    description: 'Lihat kue lagi yuk~',
    path: '/cake',
    gradient: 'from-primary to-primary-dark',
  },
  {
    id: 'gallery',
    title: 'Gallery',
    icon: Images,
    description: 'Foto-foto si cantique',
    path: '/gallery',
    gradient: 'from-secondary to-secondary-dark',
  },
  {
    id: 'letter',
    title: 'Surat',
    icon: Mail,
    description: 'Ada surat nih xixixi~',
    path: '/letter',
    gradient: 'from-birthday-yellow to-accent',
  },
  {
    id: 'about',
    title: 'About Us',
    icon: Heart,
    description: 'tentang Pembuatt 💕',
    path: '/about',
    gradient: 'from-birthday-pink to-primary',
  },
];

export default function GiftPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-birthday-gradient animate-gradient flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Floating decorations */}
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
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🎁', '💝', '✨', '🎀', '💖'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Back button */}
      <motion.button
        onClick={() => navigate('/cake')}
        className="absolute top-8 left-8 z-50 bg-card/80 backdrop-blur-sm p-3 rounded-full hover:bg-card transition-colors border border-primary/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft className="w-6 h-6 text-primary" />
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-foreground mb-4 font-chewy"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Gift Menu 🎁
        </motion.h1>
        <p className="text-lg text-muted-foreground">
          Pilih hadiah yang mana dulu nih? 💝
        </p>
      </motion.div>

      {/* Menu Grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full relative z-10"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`group relative bg-card/90 backdrop-blur-lg rounded-3xl p-8 border-2 border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Icon */}
              <motion.div
                className="mb-4"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${item.gradient}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Text */}
              <h3 className="text-2xl font-bold text-foreground mb-2 font-baloo">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>

              {/* Decorative corner sparkles */}
              <motion.div
                className="absolute top-4 right-4 text-2xl"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                ✨
              </motion.div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Bottom decoration */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-muted-foreground mt-8 text-sm relative z-10"
      >
        enih cuma buat kamu doang aseli ilopyuseempangpaaji~ 💕
      </motion.p>
    </div>
  );
}
