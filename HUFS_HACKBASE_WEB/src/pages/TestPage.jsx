import { useState } from 'react'
import { EyeOff, Eye } from 'lucide-react'

export default function TestPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md relative">
        {/* 블러 효과 원 */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-200 rounded-full filter blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-200 rounded-full filter blur-3xl opacity-30" />

        {/* 메인 컨테이너 (글래스모피즘 효과) */}
        <div className="relative backdrop-blur-xl bg-white/10 rounded-3xl shadow-xl p-8 space-y-6">
          {/* 앱 아이콘 */}
          <div className="flex justify-center mb-4">
            <svg width="80" height="80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="200" rx="40" fill="#E5F4F4"/>
              <path d="M60 80C60 60 75 45 100 45C125 45 140 60 140 80V120C140 140 125 155 100 155C75 155 60 140 60 120V80Z" fill="#003876"/>
              <path d="M85 95C85 85 90 80 100 80C110 80 115 85 115 95V105C115 115 110 120 100 120C90 120 85 115 85 105V95Z" fill="white"/>
              <path d="M95 90L105 90M95 100L105 100" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold text-gray-800">하이파이브</h1>
            <p className="text-sm text-gray-600">전국대학생 모임</p>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="아이디 또는 이메일"
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className="w-full px-4 py-3 rounded-xl bg-white/90 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              비밀번호 찾기
            </a>
          </div>

          <button className="w-full py-3 px-4 bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-xl transition-colors">
            로그인
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-gray-500 text-sm">또는 다음으로 계속하기</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <span className="sr-only">카카오로 로그인</span>
              <svg className="w-8 h-8 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C6.477 3 2 6.477 2 12C2 17.523 6.477 21 12 21C17.523 21 22 17.523 22 12C22 6.477 17.523 3 12 3Z" fill="#FEE500"/>
                <path d="M12 8.5C9.24 8.5 7 10.24 7 12.45C7 13.84 7.89 15.05 9.26 15.74V17.5L11.21 16.18C11.47 16.22 11.73 16.25 12 16.25C14.76 16.25 17 14.51 17 12.3C17 10.09 14.76 8.5 12 8.5Z" fill="#000000"/>
              </svg>
            </button>
            <button className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <span className="sr-only">한국외국어대학교로 로그인</span>
              <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#00205B"/>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                  HUFS
                </text>
              </svg>
            </button>
            <button className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <span className="sr-only">구글로 로그인</span>
              <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
                <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00"/>
                <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50"/>
                <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.785L18.7045 19.404C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
              </svg>
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">아직 회원이 아니신가요? </span>
            <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
              지금 가입하기
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}