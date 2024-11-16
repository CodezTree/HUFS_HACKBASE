import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import useStore from '../zustand/store'

export default function QRGenerator() {
  const user = useStore((state) => state.user);

  if (!user || (!user.uid && !user.email))
  {
    return <p className="text-black">로그인 후 QR 코드를 생성하세요.</p>
  }

  return (
    <div className="flex flex-col items-center">
      <QRCodeSVG value={user.uid || user.email} size={200} />
      <p className="mt-4 text-lg">이 QR을 상대방에게 보여주세요!</p>
    </div>
  );
}