'use client';
import { useState } from 'react';
import { Search, ShoppingCart, User, Printer, CreditCard, Trash2, Plus, Minus } from 'lucide-react';

export default function PosPage() {
  const [cart, setCart] = useState<any[]>([]);
  
  // Dữ liệu mẫu chuẩn theo đề bài Hộ kinh doanh vật liệu [cite: 3]
  const products = [
    { id: 1, name: 'Xi măng Hà Tiên', price: 90000, unit: 'Bao', category: 'Vật liệu thô' },
    { id: 2, name: 'Sắt Phi 10', price: 150000, unit: 'Cây', category: 'Sắt thép' },
    { id: 3, name: 'Sơn Dulux 5L', price: 450000, unit: 'Thùng', category: 'Sơn' },
  ];

  return (
    <div className="flex gap-6 h-[calc(100vh-160px)]">
      {/* 1. KHU VỰC CHỌN SẢN PHẨM */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Tìm tên sản phẩm (F1)..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
          {products.map(p => (
            <div key={p.id} className="p-4 border rounded-xl hover:border-indigo-500 cursor-pointer bg-white transition-all shadow-sm group">
              <p className="font-bold text-gray-800">{p.name}</p>
              <p className="text-xs text-gray-400">ĐVT: {p.unit}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-indigo-600 font-bold">{p.price.toLocaleString()}đ</span>
                <button className="p-1.5 bg-indigo-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. GIỎ HÀNG & THANH TOÁN (Hỗ trợ Ghi nợ & In hóa đơn) [cite: 14, 18] */}
      <div className="w-96 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center gap-2 font-bold text-gray-800 bg-indigo-50 text-indigo-700">
          <ShoppingCart size={20} /> Giỏ hàng
        </div>
        
        <div className="flex-1 p-4 flex flex-col items-center justify-center text-gray-300">
            <ShoppingCart size={48} className="mb-2 opacity-20"/>
            <p className="text-sm font-medium">Chưa có sản phẩm nào</p>
        </div>

        <div className="p-4 border-t space-y-3 bg-gray-50">
          {/* Nút Tìm khách hàng để ghi nợ [cite: 17] */}
          <div className="flex items-center gap-2 p-2.5 bg-white border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors">
             <User size={18} className="text-gray-400" />
             <span className="text-sm text-gray-400">Chọn khách hàng (F2)</span>
          </div>

          <div className="flex justify-between font-black text-xl text-gray-800 pt-2">
            <span>Tổng tiền:</span>
            <span className="text-indigo-600">0đ</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              <CreditCard size={18} /> Ghi nợ
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all">
              <Printer size={18} /> In hóa đơn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}