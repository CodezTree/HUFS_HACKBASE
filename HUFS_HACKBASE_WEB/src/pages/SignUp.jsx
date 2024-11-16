import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import {useNavigate} from "react-router-dom";
import { auth, db } from '../firebase';
import useStore from '../zustand/store';


export default function SignUp() {
  const setUser = useStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const universityList = [
    "서울대학교",
    "연세대학교",
    "고려대학교",
    "한국외국어대학교",
    "이화여자대학교",
    "성균관대학교",
    "한양대학교",
    "중앙대학교",
    "경희대학교",
    "동국대학교",
  ];

  // loading
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // 기존 에러 초기화

    if (!university || university === "") {
      setError("대학교를 선택해주세요.");
      return;
    }

    // password email 검증
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setLoading(false)
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      setLoading(false);
      return;
    }

    try {
      // Firebase Authentication - 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 사용자 프로필 저장
      await setDoc(doc(db, 'users', user.uid), {
        name,
        university,
        email,
        score: 0, // 초기 점수 설정
        createdAt: new Date(),
      });

      // Zustand에 사용자 상태 저장
      setUser({ uid: user.uid, email: user.email });

      setSuccess(true);

      // 성공했으니 이동
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("이미 사용중인 이메일입니다."); // 에러 메시지 설정
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">회원가입</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">회원가입 성공! (자동으로 로그인 이동합니다)</p>}
        <div>
          <label className="block text-gray-700">이름</label>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">대학교</label>
          <select
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">대학교를 선택하세요</option>
            {universityList.map((uni, index) => (
              <option key={index} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">이메일</label>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring bg-white"
            required
          />
        </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {loading ? '처리 중...' : '가입하기'}
          </button>
      </form>
    </div>
);
}