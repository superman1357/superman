'use client';

import { useEffect, useState } from 'react';
// QUAN TRỌNG: Đã thêm 'Shield' vào dòng import dưới đây
import { 
  TrendingUp, Users, Package, AlertCircle, 
  ArrowRight, DollarSign, Wallet, Shield 
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <div>Đang tải...</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER: CHỈ HIỆN CHO ADMIN / OWNER */}
      {user.role === 'owner' && (
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Tổng quan doanh thu hôm nay</h2>
            <p className="text-indigo-200 text-sm">Cập nhật lúc: {new Date().toLocaleTimeString('vi-VN')}</p>
          </div>
          <div className="text-right">
             <h3 className="text-4xl font-bold">4.200.000đ</h3>
             <p className="text-sm font-medium bg-indigo-500/50 px-2 py-1 rounded inline-block mt-1">
               +15% so với hôm qua
             </p>
          </div>
        </div>
      )}

      {/* HEADER: CHỈ HIỆN CHO NHÂN VIÊN */}
      {user.role === 'employee' && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex items-center justify-between">
          <div>
             <h2 className="text-2xl font-bold">Xin chào, {user.name}! 👋</h2>
             <p className="text-purple-100">Chúc bạn một ca làm việc hiệu quả.</p>
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-xl font-bold shadow-md hover:bg-gray-50 transition-colors">
             Vào bán hàng ngay
          </button>
        </div>
      )}

      {/* CÁC THẺ THỐNG KÊ (STAT CARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Đơn hàng mới" 
          value="12" 
          icon={<TrendingUp size={24} className="text-white"/>} 
          bg="bg-blue-500" 
        />
        <StatCard 
          title="Khách hàng nợ" 
          value="5" 
          sub="Cần thu: 12.5tr"
          icon={<Users size={24} className="text-white"/>} 
          bg="bg-orange-500" 
        />
        <StatCard 
          title="Sản phẩm sắp hết" 
          value="3" 
          sub="Nhập kho ngay"
          icon={<Package size={24} className="text-white"/>} 
          bg="bg-red-500" 
        />
        <StatCard 
          title="Hệ thống" 
          value="Ổn định" 
          icon={<Shield size={24} className="text-white"/>} 
          bg="bg-green-500" 
        />
      </div>

      {/* DANH SÁCH CẦN CHÚ Ý */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Cột trái: Thông báo */}
         <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-orange-500"/> Cần chú ý gấp
            </h3>
            <div className="space-y-3">
               <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <p className="text-sm text-gray-700 flex-1">Khách hàng <b>Nguyễn Văn A</b> quá hạn nợ 30 ngày.</p>
                  <ArrowRight size={16} className="text-orange-400"/>
               </div>
               <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <p className="text-sm text-gray-700 flex-1">Sản phẩm <b>Xi măng Hà Tiên</b> chỉ còn 5 bao.</p>
                  <ArrowRight size={16} className="text-red-400"/>
               </div>
            </div>
         </div>

         {/* Cột phải: Doanh thu nhanh (Chỉ Admin thấy) */}
         {user.role === 'owner' && (
           <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Wallet size={20} className="text-green-600"/> Dòng tiền mặt
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                 <span className="text-gray-500 text-sm">Tiền mặt tại quầy</span>
                 <span className="font-bold text-gray-800">15.200.000đ</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                 <span className="text-gray-500 text-sm">Tiền trong tài khoản</span>
                 <span className="font-bold text-gray-800">120.500.000đ</span>
              </div>
           </div>
         )}
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}

// Component thẻ con
function StatCard({ title, value, sub, icon, bg }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${bg}`}>
          {icon}
        </div>
        {sub && <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">{sub}</span>}
      </div>
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
      </div>
    </div>
  );
}