import { motion } from 'framer-motion';

export default function Confetti() {
  const confettiColors = ['#F9A8D4', '#C084FC', '#FDE047']; // Labubu color palette
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {[...Array(150)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
            backgroundColor: confettiColors[i % confettiColors.length],
          }}
          initial={{ 
            y: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
            rotate: [0, 360, 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}