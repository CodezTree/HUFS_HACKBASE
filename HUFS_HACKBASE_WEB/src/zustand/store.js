import { create } from 'zustand';

const useStore = create((set) => ({
  user: null, // 현재 사용자 정보
  qrData: null, // 스캔된 QR 데이터
  setUser: (user) => set({ user }),
  setQRData: (data) => set({ qrData: data }),
}));

export default useStore;