import React, { useState } from 'react';
import QRGenerator from '../components/QRGenerator';
import QRScanner from '../components/QRScanner';

export default function HighFive() {
  const [mode, setMode] = useState(null); // 'generate' 또는 'scan'

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-green-100">
      {!mode ? (
        <div className="flex gap-6">
          <button
            onClick={() => setMode('generate')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
          >
            QR 생성
          </button>
          <button
            onClick={() => setMode('scan')}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-md"
          >
            QR 스캔
          </button>
        </div>
      ) : mode === 'generate' ? (
        <QRGenerator />
      ) : (
        <QRScanner />
      )}
    </div>
  );
}