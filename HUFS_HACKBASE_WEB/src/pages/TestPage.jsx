import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, QrCode, ScanLine } from 'lucide-react'

const Button3D = ({ children, icon: Icon }) => (
  <motion.button
    className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-lg transition-all duration-300 ease-out transform perspective-1000"
    style={{
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      transform: 'translateZ(0)',
    }}
    whileHover={{
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)',
    }}
    whileTap={{ scale: 0.95 }}
  >
    <Icon className="w-6 h-6" />
    {children}
  </motion.button>
)

export default function Component() {
  const [stage, setStage] = useState('hand')
  const [isAnimating, setIsAnimating] = useState(false)

  const handleHandClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setStage('loading')
      setTimeout(() => setStage('qr'), 1500)
    }, 1000)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        {stage === 'hand' && (
          <motion.button
            key="hand"
            className="relative p-8 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHandClick}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <Hand className="w-24 h-24 text-blue-500" />
            <AnimatePresence>
              {isAnimating && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-200 opacity-50"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: 2, repeatType: 'loop' }}
                  />
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-full border-4 border-blue-400"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: [1, 1.5, 2],
                        opacity: [0.7, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.4,
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.button>
        )}
        {stage === 'loading' && (
          <motion.div
            key="loading"
            className="text-2xl font-bold text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.div>
        )}
        {stage === 'qr' && (
          <motion.div
            key="qr"
            className="flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          >
            <Button3D icon={QrCode}>QR 생성</Button3D>
            <Button3D icon={ScanLine}>QR 스캔</Button3D>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}