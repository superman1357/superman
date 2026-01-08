'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Gọi đến Backend Flask của cậu
      const response = await fetch('http://127.0.0.1:9999/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Đã sửa thành 'username' để khớp 100% với AuthService.py của cậu
        body: JSON.stringify({ 
          username: email, 
          password: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Lưu Token để dùng cho các yêu cầu sau
        localStorage.setItem('token', data.token);
        
        // 2. Lưu Object 'user' (chứa role và name) để Dashboard hiển thị
        // Lưu ý: Backend cần trả về đúng cấu trúc { "user": { "role": "...", "name": "..." } }
        localStorage.setItem('user', JSON.stringify(data.user)); 
        
        // 3. Chuyển hướng sang trang Dashboard
        router.push('/dashboard');
      } else {
        // Hiển thị lỗi từ Backend hoặc lỗi mặc định
        setError(data.error || 'Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      setError('Không thể kết nối đến máy chủ. Hãy đảm bảo Backend (9999) đang chạy.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Hiệu ứng đốm màu chuyển động phía sau */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-[420px] bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl p-10 border border-white/20">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-indigo-200 rotate-3 hover:rotate-0 transition-transform duration-300">
            <Shield className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            BizFlow
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-2">Nền tảng quản lý hộ kinh doanh thông minh</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Tài khoản / Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                placeholder="admin@bizflow.vn"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Mật khẩu</label>
              <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">Quên mật khẩu?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-900 focus:bg-white focus:border-indigo-500 outline-none transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-semibold p-4 rounded-2xl border border-red-100 flex items-center gap-2 animate-in fade-in zoom-in duration-300">
              <div className="w-1 h-1 rounded-full bg-red-600"></div>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3 group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                <span>Đăng nhập hệ thống</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-xs">
          © 2026 BizFlow Platform. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}