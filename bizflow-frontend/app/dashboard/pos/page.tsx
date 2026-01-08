'use client';
import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Printer, CreditCard, Plus, Trash2, Loader2, Minus } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Định nghĩa kiểu dữ liệu khớp với Backend trả về
interface Product {
  product_id: number;
  product_name: string;
  selling_price: number;
  stock_quantity: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function PosPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Lấy danh sách sản phẩm từ Backend khi vào trang
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Lấy token từ localStorage (đã lưu lúc đăng nhập)
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).token : '';

      // Gọi API Backend (Chạy ở cổng 9999)
      const res = await fetch('http://127.0.0.1:9999/products/', {
        headers: {
          'Authorization': `Bearer ${token}` // Gửi kèm token xác thực
        }
      });
      const data = await res.json();
      
      // Backend trả về dạng { data: [...] }
      if (res.ok && data.data) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Lỗi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Thêm vào giỏ hàng
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product_id === product.product_id);
      if (existing) {
        return prev.map(item => 
          item.product_id === product.product_id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Xóa khỏi giỏ hàng
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product_id !== productId));
  };

  // Giảm số lượng
  const decreaseQuantity = (productId: number) => {
    setCart(prev => prev.map(item => {
      if (item.product_id === productId) {
        return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
      }
      return item;
    }));
  };

  // Tính tổng tiền
  const totalAmount = cart.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);

  // 3. Xử lý Thanh toán (Gọi API Tạo đơn)
  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");
    setIsPaying(true);

    try {
      const userData = localStorage.getItem('user');
      const token = userData ? JSON.parse(userData).token : '';

      // Chuẩn bị dữ liệu đúng format Backend yêu cầu
      const orderData = {
        customer_id: 1, // Tạm thời hardcode khách lẻ (Trong DB cần có khách hàng ID=1)
        payment_method: "Cash",
        items: cart.map(item => ({
          product_id: item.product_id,
          unit_id: 1, // Tạm thời hardcode unit (Logic chọn đơn vị tính sẽ làm sau)
          quantity: item.quantity,
          unit_price: item.selling_price
        }))
      };

      const res = await fetch('http://127.0.0.1:9999/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await res.json();

      if (res.ok) {
        alert(`Thanh toán thành công! Mã đơn: ${result.order_id}`);
        setCart([]); // Xóa giỏ hàng sau khi thành công
      } else {
        alert(`Lỗi: ${result.error || "Không thể tạo đơn"}`);
      }

    } catch (error) {
      console.error("Lỗi thanh toán:", error);
      alert("Lỗi kết nối đến server!");
    } finally {
      setIsPaying(false);
    }
  };

  // Lọc sản phẩm theo tìm kiếm
  const filteredProducts = products.filter(p => 
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
          {loading ? (
            <div className="col-span-full flex justify-center py-10 text-gray-400">
              <Loader2 className="animate-spin mr-2" /> Đang tải dữ liệu...
            </div>
          ) : filteredProducts.length === 0 ? (
             <div className="col-span-full text-center text-gray-400 py-10">Không tìm thấy sản phẩm</div>
          ) : (
            filteredProducts.map(p => (
              <div 
                key={p.product_id} 
                onClick={() => addToCart(p)}
                className="p-4 border rounded-xl hover:border-indigo-500 cursor-pointer bg-white transition-all shadow-sm group select-none flex flex-col justify-between"
              >
                <div>
                  <p className="font-bold text-gray-800 line-clamp-2">{p.product_name}</p>
                  <p className="text-xs text-gray-400 mt-1">Tồn kho: {p.stock_quantity}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-indigo-600 font-bold">{p.selling_price.toLocaleString()}đ</span>
                  <button className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. GIỎ HÀNG & THANH TOÁN */}
      <div className="w-96 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b flex items-center gap-2 font-bold text-gray-800 bg-indigo-50 text-indigo-700">
          <ShoppingCart size={20} /> Giỏ hàng ({cart.length})
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-300">
                <ShoppingCart size={48} className="mb-2 opacity-20"/>
                <p className="text-sm font-medium">Chưa có sản phẩm nào</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 truncate w-40">{item.product_name}</p>
                    <p className="text-xs text-indigo-600 font-medium">{item.selling_price.toLocaleString()}đ</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQuantity(item.product_id)} className="p-1 hover:bg-gray-100 rounded">
                      <Minus size={14} className="text-gray-500" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="p-1 hover:bg-gray-100 rounded">
                      <Plus size={14} className="text-gray-500" />
                    </button>
                    <button onClick={() => removeFromCart(item.product_id)} className="ml-2 p-1 hover:bg-red-50 rounded text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
        </div>

        <div className="p-4 border-t space-y-3 bg-gray-50">
          {/* Nút Tìm khách hàng */}
          <div className="flex items-center gap-2 p-2.5 bg-white border border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 transition-colors">
             <User size={18} className="text-gray-400" />
             <span className="text-sm text-gray-500">Khách lẻ (Mặc định)</span>
          </div>

          <div className="flex justify-between font-black text-xl text-gray-800 pt-2">
            <span>Tổng tiền:</span>
            <span className="text-indigo-600">{totalAmount.toLocaleString()}đ</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-2 py-3 border border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
              <CreditCard size={18} /> Ghi nợ
            </button>
            <button 
              onClick={handleCheckout}
              disabled={isPaying || cart.length === 0}
              className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPaying ? <Loader2 className="animate-spin" size={18}/> : <Printer size={18} />} 
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}