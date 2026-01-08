'use client';
import { Package, Plus, Search, Filter, Edit, Trash2, MoreVertical, AlertTriangle } from 'lucide-react';

export default function ProductsPage() {
  // Dữ liệu mẫu mô phỏng Database (Bảng Product + Unit trong ERD)
  const products = [
    { id: 1, code: 'VL001', name: 'Xi măng Hà Tiên', category: 'Vật liệu thô', price: 90000, stock: 15, unit: 'Bao', status: 'Sắp hết' },
    { id: 2, code: 'VL002', name: 'Cát xây dựng', category: 'Vật liệu thô', price: 350000, stock: 100, unit: 'Khối', status: 'Còn hàng' },
    { id: 3, code: 'ST001', name: 'Sơn Dulux Trong Nhà', category: 'Sơn nước', price: 1200000, stock: 24, unit: 'Thùng (18L)', status: 'Còn hàng' },
    { id: 4, code: 'ST002', name: 'Thép Pomina Phi 10', category: 'Sắt thép', price: 115000, stock: 200, unit: 'Cây', status: 'Còn hàng' },
    { id: 5, code: 'D001', name: 'Bóng đèn Rạng Đông 40W', category: 'Điện', price: 45000, stock: 0, unit: 'Cái', status: 'Hết hàng' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. HEADER & THANH CÔNG CỤ */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
             <Package className="text-indigo-600"/> Kho hàng & Sản phẩm
           </h2>
           <p className="text-xs text-gray-500 mt-1">Quản lý danh mục, giá bán và định mức tồn kho.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           {/* Ô tìm kiếm */}
           <div className="relative flex-1 md:flex-none group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500" size={16} />
              <input 
                type="text" 
                placeholder="Tìm mã, tên SP..." 
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-indigo-500 w-full md:w-64 transition-all"
              />
           </div>
           
           {/* Nút bộ lọc */}
           <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter size={18}/>
           </button>

           {/* Nút thêm mới */}
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center gap-2">
             <Plus size={18}/> Thêm sản phẩm
           </button>
        </div>
      </div>

      {/* 2. BẢNG DANH SÁCH SẢN PHẨM */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4">Mã SP</th>
                  <th className="p-4">Tên Sản phẩm</th>
                  <th className="p-4">Danh mục</th>
                  <th className="p-4 text-right">Giá bán</th>
                  <th className="p-4 text-center">Tồn kho</th>
                  <th className="p-4 text-center">Trạng thái</th>
                  <th className="p-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="p-4 font-mono text-gray-500 font-medium">{p.code}</td>
                    
                    <td className="p-4">
                        <p className="font-bold text-gray-800">{p.name}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Đơn vị tính: <b className="text-gray-600">{p.unit}</b></p>
                    </td>
                    
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-600 border border-gray-200">
                        {p.category}
                      </span>
                    </td>
                    
                    <td className="p-4 text-right font-bold text-indigo-600 text-base">
                        {p.price.toLocaleString()}đ
                    </td>
                    
                    <td className="p-4 text-center font-bold text-gray-700">
                       {p.stock}
                    </td>

                    <td className="p-4 text-center">
                       {p.stock === 0 ? (
                           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500 uppercase">
                               Hết hàng
                           </span>
                       ) : p.stock < 20 ? (
                           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-600 uppercase">
                               <AlertTriangle size={10}/> Sắp hết
                           </span>
                       ) : (
                           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600 uppercase">
                               Sẵn sàng
                           </span>
                       )}
                    </td>

                    <td className="p-4">
                       <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 bg-white border border-gray-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors" title="Sửa">
                               <Edit size={16}/>
                           </button>
                           <button className="p-2 bg-white border border-gray-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Xóa">
                               <Trash2 size={16}/>
                           </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        
        {/* Footer phân trang (UI giả lập) */}
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
            <span>Hiển thị 5 / 124 sản phẩm</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Trước</button>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border rounded hover:bg-gray-50">Sau</button>
            </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
      `}</style>
    </div>
  );
}