'use client';

import { useState, useEffect } from 'react';
import { Package, Plus, Edit, Trash2, AlertTriangle, Loader2, RefreshCcw } from 'lucide-react';

// 1. KHAI BÁO KIỂU DỮ LIỆU (Để hết bị gạch đỏ ở các biến p.xxx)
interface Product {
  product_id: number;
  product_name: string;
  selling_price: number;
  stock_quantity: number;
}

export default function ProductsPage() {
  // 2. ĐỊNH NGHĨA STATE VỚI KIỂU DỮ LIỆU CHUẨN
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 3. HÀM GỌI API (Dùng 127.0.0.1 cho ổn định)
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:9999/products/owner/1');
      
      if (!response.ok) {
        throw new Error('Server đang bận hoặc chưa bật Backend.');
      }
      
      const result = await response.json();
      
      if (result.status === 'success' && result.data) {
        setProducts(result.data);
      } else {
        setProducts([]);
      }
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối tới Server.');
      console.error("Lỗi Fetch:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
           <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
             <div className="p-2 bg-indigo-50 rounded-xl">
               <Package className="text-indigo-600" size={24}/>
             </div>
             Kho hàng & Sản phẩm
           </h2>
           <p className="text-sm text-slate-400 mt-1 ml-11">Dữ liệu từ Database SQL Server (Port 9999)</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <button 
             onClick={fetchProducts}
             className="flex-1 md:flex-none px-5 py-2.5 border border-slate-200 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
           >
             <RefreshCcw size={16} className={isLoading ? 'animate-spin' : ''}/>
             Làm mới
           </button>
           <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
             <Plus size={18}/> Thêm mới
           </button>
        </div>
      </div>

      {/* HIỂN THỊ TRẠNG THÁI TẢI/LỖI */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-32 bg-white rounded-[2rem] border border-slate-50 shadow-sm">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} />
          <p className="text-slate-400 font-medium animate-pulse">Đang đồng bộ dữ liệu...</p>
        </div>
      ) : error ? (
        <div className="p-16 bg-rose-50 text-rose-600 rounded-[2rem] border border-rose-100 text-center shadow-sm">
          <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertTriangle size={32} />
          </div>
          <p className="font-bold text-lg mb-1">Kết nối thất bại!</p>
          <p className="text-sm opacity-80">{error}</p>
          <button onClick={fetchProducts} className="mt-6 px-6 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold">Thử lại ngay</button>
        </div>
      ) : (
        /* BẢNG DANH SÁCH SẢN PHẨM */
        <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/50 text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                  <tr>
                    <th className="p-5">Mã SP</th>
                    <th className="p-5">Tên Sản phẩm</th>
                    <th className="p-5 text-right">Giá bán</th>
                    <th className="p-5 text-center">Tồn kho</th>
                    <th className="p-5 text-center">Trạng thái</th>
                    <th className="p-5 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.length > 0 ? products.map((p) => (
                    <tr key={p.product_id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-5 font-mono text-slate-400">#{p.product_id}</td>
                      <td className="p-5 font-bold text-slate-700">{p.product_name}</td>
                      <td className="p-5 text-right font-black text-indigo-600 text-base">
                          {p.selling_price?.toLocaleString()}đ
                      </td>
                      <td className="p-5 text-center font-bold text-slate-600">
                         {p.stock_quantity}
                      </td>
                      <td className="p-5 text-center">
                         {p.stock_quantity <= 0 ? (
                             <span className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-slate-100 text-slate-500 uppercase">Hết hàng</span>
                         ) : p.stock_quantity < 10 ? (
                             <span className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-amber-100 text-amber-600 uppercase flex items-center justify-center gap-1">
                               <AlertTriangle size={10}/> Sắp hết
                             </span>
                         ) : (
                             <span className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-emerald-100 text-emerald-600 uppercase">Sẵn sàng</span>
                         )}
                      </td>
                      <td className="p-5">
                         <div className="flex justify-center gap-2">
                             <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit size={18}/></button>
                             <button className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={18}/></button>
                         </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="p-32 text-center text-slate-400 font-medium">
                        <Package className="mx-auto mb-2 opacity-20" size={48}/>
                        Chưa có sản phẩm nào gán cho chủ sở hữu này.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
          </div>
        </div>
      )}
    </div>
  );
}