import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useStore from '../zustand/store';

export default function QRScanner() {
  const setQRData = useStore((state) => state.setQRData);
  const [userInfo, setUserInfo] = useState(null);

  const handleScan = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid); // Firestore에서 사용자 정보 조회
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setQRData(uid); // Zustand 상태에 QR 데이터 저장
        setUserInfo(docSnap.data()); // 사용자 정보 저장
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
  };

  return (
    <div className="flex flex-col items-center">
      {!userInfo ? (
        <>
          <Scanner
            onScan={(result, error) => {
              if (!!result) {
                handleScan(result?.text); // QR 코드에서 UID 추출
              }
              if (!!error) {
                handleError(error);
              }
            }}
            style={{ width: '300px' }}
          />
          <p className="mt-4 text-lg">QR 코드를 스캔하세요!</p>
        </>
      ) : (
        <div>
          <p className="mt-4 text-lg">스캔 성공! UID: {userInfo.uid}</p>
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            <p><strong>사용자 이름:</strong> {userInfo.name}</p>
            <p><strong>이메일:</strong> {userInfo.email}</p>
            <p><strong>대학교:</strong> {userInfo.university}</p>
          </div>
        </div>
      )}
    </div>
  );
}