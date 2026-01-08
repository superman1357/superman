'use client';

import { useEffect, useState } from 'react';
import { 
  LayoutDashboard, ShoppingCart, Users, Package, 
  FileText, Bot, Store, LogOut 
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setUser({ name: 'Admin Demo', role: 'owner' }); 
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* 1. CỘT TRÁI: Rộng 320px (w-80) */}
      <aside className="w-80 bg-[#1e293b] text-white flex flex-col shadow-2xl shrink-0 overflow-y-auto z-50">
        
        {/* Logo BizFlow */}
        <div className="p-8 border-b border-gray-700 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/50">
            <Store className="text-white w-7 h-7" />
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-wide leading-none">BizFlow</h1>
            <span className="text-sm text-gray-400 uppercase font-bold tracking-widest">Management</span>
          </div>
        </div>

        {/* Menu - Cách xa nhau (space-y-4) */}
        <nav className="flex-1 p-6 space-y-4">
          
          <div className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 mt-2 mb-4">Tổng quan</div>
          <MenuItem href="/dashboard" icon={<LayoutDashboard size={24}/>} label="Bảng điều khiển" active={pathname === '/dashboard'} />

          {(user.role === 'employee' || user.role === 'owner') && (
            <>
              <div className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 mt-8 mb-4">Bán hàng & AI</div>
              <MenuItem href="/dashboard/pos" icon={<ShoppingCart size={24}/>} label="Bán hàng tại quầy" active={pathname.includes('/pos')} />
              <MenuItem href="/dashboard/ai-drafts" icon={<Bot size={24}/>} label="Duyệt đơn nháp AI" badge="3" active={pathname.includes('/ai-drafts')} />
            </>
          )}

          {user.role === 'owner' && (
            <>
              <div className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 mt-8 mb-4">Quản lý cửa hàng</div>
              <MenuItem href="/dashboard/products" icon={<Package size={24}/>} label="Sản phẩm & Kho" active={pathname.includes('/products')} />
              <MenuItem href="/dashboard/customers" icon={<Users size={24}/>} label="Khách hàng & Nợ" active={pathname.includes('/customers')} />
              
              <div className="text-sm font-black text-gray-500 uppercase tracking-widest px-4 mt-8 mb-4">Kế toán</div>
              <MenuItem href="/dashboard/reports" icon={<FileText size={24}/>} label="Sổ sách (Thông tư 88)" active={pathname.includes('/reports')} />
            </>
          )}
        </nav>

        {/* Nút Đăng xuất */}
        <div className="p-6 border-t border-gray-700 bg-[#1e293b] shrink-0">
          <button onClick={handleLogout} className="flex items-center gap-4 w-full p-4 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-lg font-bold border border-transparent hover:border-red-500/20">
            <LogOut size={24} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* 2. NỘI DUNG CHÍNH */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
        <header className="bg-white border-b border-gray-200 h-20 flex items-center justify-between px-10 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-base">Xin chào,</span>
            <span className="font-bold text-gray-800 text-xl">{user.name}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right hidden md:block">
               <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                 {user.role === 'owner' ? 'Chủ cửa hàng' : 'Nhân viên'}
               </p>
               <p className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">● Online</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-indigo-600 border-4 border-indigo-100 flex items-center justify-center text-white text-xl font-bold shadow-md">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {children}
        </div>
      </main>

    </div>
  );
}

// Component Menu Item - ĐÃ ĐƯỢC TÁCH DÒNG ĐỂ KHÔNG BỊ LỖI
function MenuItem({ icon, label, badge, active = false, href }: any) {
  // Tách style ra biến riêng cho gọn
  const baseStyle = "flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-200 group";
  const activeStyle = "bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 transform scale-[1.02]";
  const inactiveStyle = "text-gray-400 hover:bg-white/10 hover:text-white hover:pl-6";

  return (
    <Link 
      href={href} 
      className={`${baseStyle} ${active ? activeStyle : inactiveStyle}`}
    >
      <div className="flex items-center gap-4">
        <span className={`${active ? 'text-white' : 'text-gray-500 group-hover:text-white'}`}>
          {icon}
        </span>
        <span className="font-bold text-lg tracking-wide">{label}</span>
      </div>
      
      {badge && (
        <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          {badge}
        </span>
      )}
    </Link>
  );
}