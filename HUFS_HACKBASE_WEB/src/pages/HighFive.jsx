import React, { useState } from 'react';
import QRGenerator from '../components/QRGenerator';
import QRScanner from '../components/QRScanner';
import { QrCode, ScanLine } from 'lucide-react'
import {motion, AnimatePresence} from "framer-motion";

const Button3D = ({ children, icon: Icon, onClick }) => (
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
    onClick={onClick}
  >
    <Icon className="w-6 h-6" />
    {children}
  </motion.button>
)

export default function HighFive() {
  const [mode, setMode] = useState(null); // 'generate' 또는 'scan'

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      {!mode ? (
        <div className="flex gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key="qr"
              className="flex flex-col items-center justify-center gap-8"
              initial={{opacity: 0, y: 50}}
              animate={{opacity: 1, y: 0}}
              transition={{staggerChildren: 0.2, delayChildren: 0.2}}
            >
              <Button3D icon={QrCode} onClick={() => setMode('generate')}>QR 생성</Button3D>
              <Button3D icon={ScanLine} onClick={() => setMode('scan')}>QR 스캔</Button3D>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : mode === 'generate' ? (
        <QRGenerator/>
      ) : (
        <QRScanner/>
      )}
    </div>
  );
}