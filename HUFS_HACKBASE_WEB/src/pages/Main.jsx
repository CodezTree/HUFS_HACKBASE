import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { Hand, QrCode, ScanLine } from 'lucide-react'
import useStore from "../zustand/store.js";
import {db} from "../firebase.js";
import {doc, getDoc} from "firebase/firestore";


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

const fetchUniversityScore = async (universityName) => {
  try {
    const docRef = doc(db, "university", universityName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().univScore;
    } else {
      console.error("Cannot find univ doc");
      return null;
    }
  } catch (error) {
    console.error("Firestore에서 데이터를 가져오는 중 오류 발생 : ", error);
    return null;
  }
}

export default function Main() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const [userPoint, setUserPoint] = useState(user.score || 0);
  const [univScore, setUnivScore] = useState(0);

  const [univName, setUnivName] = useState('');
  const [userName, setUserName] = useState('');

  const [stage, setStage] = useState('hand');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleHandClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setStage('loading')
      setTimeout(() => navigate('/highfive'), 1500)
    }, 1000)
  }

  useEffect(()=> {
    console.log(user)
    const fetchUserData = async () => {
      const userDocRef = doc(db, 'users', user.uid); // 'users' 컬렉션에서 uid로 문서 참조
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists())
      {
        setUnivName(userDoc.data().university);
        setUserName(userDoc.data().name);
      }
    }

    fetchUserData();

    if (user?.university)
    {
      const fetchData = async () => {
        const score = await fetchUniversityScore(user.university);
        setUnivScore(score);
      };

      console.debug("Oh Yeah")

      fetchData();

      setUnivName(user.university);
    }
  }, [user])


  // return (
  //   <div className="h-screen flex npmflex-col justify-center items-center bg-blue-100">
  //     <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-lg">
  //       <span className="text-lg font-bold text-black">점수: {userPoints}</span>
  //     </div>
  //     <button
  //       onClick={() => navigate('/highfive')}
  //       className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-full text-3xl shadow-md"
  //     >
  //       ✋ HI-FIVE!
  //     </button>
  //   </div>
  // );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full flex justify-start px-4">
        <p className="text-[#3F617F] font-extrabold text-5xl">HI-FIVE</p>
      </div>

      <div className="w-full px-16 py-6">
        <div className="flex flex-col bg-blue-100 text-[#3F617F] items-center justify-center py-4 rounded-2xl">
          <div className="flex flex-row items-center justify-center text-3xl font-bold gap-4">
            <img src="/university_logo/hufs_logo.svg" width={60}/>
            <p>{univName}</p>
          </div>
          <div className="bg-white rounded-md w-fit text-2xl font-bold mt-4 py-2 px-4">
            {
              "SCORE : " + univScore
            }
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {stage === 'hand' && (
          <motion.button
            key="hand"
            className="relative p-8 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none"
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            onClick={handleHandClick}
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.5}}
          >
            <Hand className="w-24 h-24 text-blue-500"/>
            <AnimatePresence>
              {isAnimating && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-200 opacity-50"
                    initial={{scale: 1}}
                    animate={{scale: 1.5, opacity: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 1, repeat: 2, repeatType: 'loop'}}
                  />
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-full border-4 border-blue-400"
                      initial={{scale: 1, opacity: 0}}
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
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            Loading...
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full p-8">
        <div className="flex flex-col bg-blue-100 text-[#3F617F] items-center justify-center py-4 rounded-2xl">
          <div className="flex flex-row items-center justify-center text-2xl font-bold gap-4">
            <img src="/user_image/user_image_base.png" width={100}/>
            <div>{'이름 : ' + userName}<br/>{'소속 : ' + univName}</div>
          </div>
          <div className="mt-8">
            { user.email }
          </div>
        </div>
      </div>
    </div>
  )
}