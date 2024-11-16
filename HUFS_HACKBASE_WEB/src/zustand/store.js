import { create } from 'zustand';
import {auth} from "../firebase.js";

const useStore = create((set) => ({
  user: null, // 현재 사용자 정보
  qrData: null, // 스캔된 QR 데이터
  setUser: (user) => set({ user }),
  setQRData: (data) => set({ qrData: data }),
}));

auth.onAuthStateChanged((user) => {
  useStore.getState().setUser(user);
});

export default useStore;