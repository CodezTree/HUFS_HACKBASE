import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { doc, getDoc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useStore from '../zustand/store';

export default function QRScanner() {
  const setQRData = useStore((state) => state.setQRData);
  const user = useStore((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleScan = async (uid) => {
    console.log("scan handling : " + uid);
    if (!uid || typeof uid !== 'string') {
      alert('잘못된 QR 코드입니다.');
      return;
    }

    try {
      const docRef = doc(db, 'users', uid); // Firestore에서 사용자 정보 조회
      const docSnap = await getDoc(docRef);

      const uniDocRef = doc(db, 'university', user.university)
      const uniDocSnap = await getDoc(uniDocRef)

      if (docSnap.exists()) {
        setQRData(uid); // Zustand 상태에 QR 데이터 저장
        
        const scannedUser = docSnap.data();
        setUserInfo({ ...scannedUser, uid: docSnap.id }); // uid를 문서 ID로 추가

        // Firestore에서 점수 업데이트
        const currentUserDoc = doc(db, 'users', user.uid);
        const scannedUserDoc = doc(db, 'users', uid);

        await Promise.all([
          updateDoc(currentUserDoc, { score: increment(5), lastConnectionUid: uid}), // 현재 사용자 점수 + 5
          updateDoc(scannedUserDoc, { score: increment(5), lastConnectionUid: user.uid}), // 스캔된 사용자 점수 + 5
        ]);

        if (uniDocSnap.exists()) {
          const myUnivDoc = doc(db, 'university', user.university);
          const opposeUnivDoc = doc(db, 'university', scannedUser.university);

          await Promise.all([
            updateDoc(myUnivDoc, { univScore: increment(5)}),
            updateDoc(opposeUnivDoc, { univScore: increment(5) })
          ]);
        }

        // 피드백 메시지 설정
        setFeedback(`성공! ${scannedUser.name || '알 수 없는 사용자'}님과 연결되었습니다.`);
      } else {
        alert('사용자 정보를 찾을 수 없습니다.');
      }
    } catch (err) {
      console.error('QR 스캔 에러:', err);
      alert('스캔 중 문제가 발생했습니다.');
    }
  };

  const handleError = (err) => {
    console.error('QR 스캐너 오류:', err);
    setFeedback('QR 스캔 중 오류가 발생했습니다.');
  };

  return (
    <div className="flex flex-col items-center">
      {!userInfo ? (
        <>
          <Scanner
            onScan={(result, error) => {
              if (result[0] && result[0].rawValue) {
                handleScan(result[0].rawValue); // QR 코드에서 UID 추출
              } else if (error) {
                handleError(error);
              }
            }}
            style={{ width: '300px' }}
          />
          <p className="mt-4 text-lg text-black">QR 코드를 스캔하세요!</p>
        </>
        ) : (
        <div>
          <p className="mt-4 text-lg text-black">{feedback}</p>
          {/*<div className="mt-4 p-4 border rounded-md bg-gray-100">*/}
          {/*  <p><strong>사용자 이름:</strong> {userInfo.name || '정보 없음'}</p>*/}
          {/*  <p><strong>사용자 UID:</strong> {userInfo.uid}</p>*/}
          {/*</div>*/}
        </div>
      )}
    </div>);
  // ) : (
  //   <div>
  //     <p className="mt-4 text-lg">스캔 성공! UID: {userInfo.uid}</p>
  //     <div className="mt-4 p-4 border rounded-md bg-gray-100 text-black">
  //       <p><strong>사용자 이름:</strong> {userInfo.name}</p>
  //       <p><strong>이메일:</strong> {userInfo.email}</p>
      //       <p><strong>대학교:</strong> {userInfo.university_logo}</p>
      //     </div>
      //   </div>
      // )}
  //   </div>
  // );
}