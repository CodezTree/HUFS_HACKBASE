import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
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

  // loading
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // 기존 에러 초기화

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
        <h2 className="text-2xl font-bold text-center">회원가입</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">회원가입 성공! (자동으로 로그인 이동합니다)</p>}
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />
        <input
          type="text"
          placeholder="대학교"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? '처리 중...' : '가입하기' }
        </button>
      </form>
    </div>
  );
}