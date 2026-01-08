'use client';

import { useState } from 'react';
import { Building2, Mail, Lock, Phone, ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMethod, setResetMethod] = useState<'email' | 'phone'>('email');
  const [resetValue, setResetValue] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // --- HÀM ĐĂNG NHẬP ĐÃ SỬA (KẾT NỐI BACKEND) ---
  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      // Gọi sang Backend Python đang chạy ở cổng 9999
      // Lưu ý: Đảm bảo bên Python cậu đã tạo route '/api/login'
      const response = await fetch('http://127.0.0.1:9999/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email: email, 
            password: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // --- THÀNH CÔNG ---
        console.log("Đăng nhập thành công:", data);
        
        // Lưu thông tin user vào máy
        localStorage.setItem('user', JSON.stringify(data));
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        // Chuyển hướng vào Dashboard
        router.push('/dashboard');
      } else {
        // --- THẤT BẠI (Backend trả về lỗi) ---
        setError(data.message || 'Email hoặc mật khẩu không đúng');
      }

    } catch (err) {
      // --- LỖI KẾT NỐI ---
      console.error("Lỗi:", err);
      setError('Không thể kết nối đến Server (Backend 9999 đã bật chưa?)');
    } finally {
      setLoading(false);
    }
  };
  // ----------------------------------------------

  const handleResetPassword = () => {
    setResetSuccess(false);
    setTimeout(() => {
      setResetSuccess(true);
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetSuccess(false);
        setResetValue('');
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      {/* Login Card */}
      <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-transform">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BizFlow
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Nền tảng chuyển đổi số cho hộ kinh doanh</p>
        </div>

        {/* Login Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white/50"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">Ghi nhớ đăng nhập</span>
            </label>
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-shake">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <>
                <span>Đăng nhập</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

        {/* Demo Accounts - Chỉ để hiển thị thông tin, logic đã chuyển sang gọi API */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3 font-semibold uppercase tracking-wide">Tài khoản demo (Cần có trong Database)</p>
          <div className="space-y-2 text-xs">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <p className="font-bold text-blue-900 mb-1">👤 Chủ hộ kinh doanh</p>
              <p className="text-blue-700 font-mono">owner@bizflow.vn / owner123</p>
            </div>
            {/* Các account khác giữ nguyên UI */}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-slideUp">
            <button
              onClick={() => setShowForgotPassword(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quên mật khẩu?</h2>
            <p className="text-gray-600 text-sm mb-6">Chọn phương thức để khôi phục mật khẩu</p>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setResetMethod('email')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  resetMethod === 'email'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Mail className="w-5 h-5 inline mr-2" />
                Email
              </button>
              <button
                onClick={() => setResetMethod('phone')}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                  resetMethod === 'phone'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Phone className="w-5 h-5 inline mr-2" />
                SĐT
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {resetMethod === 'email' ? 'Email của bạn' : 'Số điện thoại'}
              </label>
              <input
                type={resetMethod === 'email' ? 'email' : 'tel'}
                value={resetValue}
                onChange={(e) => setResetValue(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder={resetMethod === 'email' ? 'email@example.com' : '0901234567'}
              />
            </div>

            {resetSuccess && (
              <div className="mb-4 bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg">
                <p className="text-sm font-medium">✓ Đã gửi link khôi phục mật khẩu!</p>
              </div>
            )}

            <button
              onClick={handleResetPassword}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Gửi link khôi phục
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}