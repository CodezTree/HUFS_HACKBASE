import React, {useState, useEffect} from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {onSnapshot, doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.js'
import useStore from '../zustand/store'
import {useNavigate} from "react-router-dom";

export default function QRGenerator() {
  const user = useStore((state) => state.user);
  const [lastConnection, setLastConnection] = useState(null)
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    // firebase realtime watcher
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLastConnection(data.lastConnectionUid || null);

        const fetchUserName = async() => {
          const userDocRef = doc(db, 'users', data.lastConnectionUid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists())
          {
            setFeedback(`성공! ${userDoc.data().name || '알 수 없는 사용자'}님과 연결되었습니다.\n 5점씩 획득!`);

            setTimeout(()=>{
              navigate('/')
            }, 1000)
          }
        }

        fetchUserName();
      }
    });

    return () => unsubscribe(); // snapshot 구독 해제 (컴포넌트 언마운트시)
  }, [user, lastConnection])

  if (!user || (!user.uid && !user.email))
  {
    return <p className="text-black">로그인 후 QR 코드를 생성하세요.</p>
  }

  return (
    <div className="flex flex-col items-center">
      {lastConnection ? (
        <div className="text-black">
          {feedback}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <QRCodeSVG value={user.uid || user.email} size={200} />
          <p className="mt-4 text-lg text-black">이 QR을 상대방에게 보여주세요!</p>
        </div>
      )}
    </div>
  );
}