import React, {useState, useEffect} from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { onSnapshot, doc } from 'firebase/firestore'
import {db} from '../firebase.js'
import useStore from '../zustand/store'

export default function QRGenerator() {
  const user = useStore((state) => state.user);
  const [lastConnection, setLastConnection] = useState(null)
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);

    // firebase realtime watcher
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLastConnection(data.lastConnectionUid || null);

        if (lastConnection)
          setFeedback(`성공! ${lastConnection || '알 수 없는 사용자'}님과 연결되었습니다.`);
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
        <div>
          <QRCodeSVG value={user.uid || user.email} size={200} />
          <p className="mt-4 text-lg">이 QR을 상대방에게 보여주세요!</p>
        </div>
      )}
    </div>
  );
}