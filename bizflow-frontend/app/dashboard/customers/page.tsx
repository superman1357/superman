'use client';
import { Users, Phone, MapPin, Wallet, History, AlertCircle } from 'lucide-react';

export default function CustomersPage() {
  // Dữ liệu giả lập danh sách khách hàng và số nợ
  const customers = [
    { id: 1, name: 'Nguyễn Văn An', phone: '0909 123 456', address: '123 Đường Láng', debt: 12500000, lastBuy: '2 ngày trước' },
    { id: 2, name: 'Trần Thị Bích', phone: '0912 345 678', address: '45 Cầu Giấy', debt: 0, lastBuy: 'Hôm nay' },
    { id: 3, name: 'Lê Văn Cường', phone: '0988 777 666', address: '88 Xã Đàn', debt: 420000, lastBuy: '1 tuần trước' },
    { id: 4, name: 'Hoàng Minh Đạt', phone: '0903 444 555', address: 'Khu tập thể A1', debt: 25000000, lastBuy: '1 tháng trước' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* THỐNG KÊ CÔNG NỢ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-white/80 text-sm font-bold uppercase">Tổng nợ phải thu</p>
            <h3 className="text-3xl font-bold mt-1">37.920.000đ</h3>
            <p className="text-xs mt-2 flex items-center gap-1"><AlertCircle size={14}/> Cần thu hồi gấp từ 2 khách</p>
         </div>
         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-sm font-bold uppercase">Khách hàng mới</p>
            <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
            <p className="text-xs text-green-500 mt-2 font-bold">+4 so với tháng trước</p>
         </div>
      </div>

      {/* DANH SÁCH KHÁCH HÀNG */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">Danh sách Khách hàng & Công nợ</h3>
          <button className="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
            Xuất Excel
          </button>
        </div>
        
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
            <tr>
              <th className="p-4">Khách hàng</th>
              <th className="p-4">Liên hệ</th>
              <th className="p-4 text-right">Dư nợ hiện tại</th>
              <th className="p-4 text-center">Lần mua cuối</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((c) => (
              <tr key={c.id} className="group hover:bg-gray-50 transition-colors">
                <td className="p-4">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                         {c.name.charAt(0)}
                      </div>
                      <div>
                         <p className="font-bold text-gray-800">{c.name}</p>
                         <p className="text-xs text-gray-400">KH00{c.id}</p>
                      </div>
                   </div>
                </td>
                <td className="p-4 space-y-1">
                   <div className="flex items-center gap-2 text-gray-600 text-xs"><Phone size={14}/> {c.phone}</div>
                   <div className="flex items-center gap-2 text-gray-400 text-xs"><MapPin size={14}/> {c.address}</div>
                </td>
                <td className="p-4 text-right">
                   {c.debt > 0 ? (
                     <span className="font-bold text-red-500 bg-red-50 px-2 py-1 rounded">-{c.debt.toLocaleString()}đ</span>
                   ) : (
                     <span className="font-bold text-green-500">Không có nợ</span>
                   )}
                </td>
                <td className="p-4 text-center text-gray-500 text-xs">{c.lastBuy}</td>
                <td className="p-4 flex justify-center gap-2">
                   <button className="flex items-center gap-1 px-3 py-1.5 border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold">
                      <Wallet size={14}/> Thu nợ
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}