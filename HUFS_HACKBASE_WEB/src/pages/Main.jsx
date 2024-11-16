import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const userPoints = 150; // 예시: 사용자가 획득한 점수

  return (
    <div className="h-screen flex npmflex-col justify-center items-center bg-blue-100">
      <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg">
        <span className="text-lg font-bold text-black">점수: {userPoints}</span>
      </div>
      <button
        onClick={() => navigate('/highfive')}
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-full text-3xl shadow-md"
      >
        ✋ HI-FIVE!
      </button>
    </div>
  );
}