'use client';
import { FileText, Download, Calendar, ShieldCheck, FileSpreadsheet, PieChart } from 'lucide-react';

export default function ReportsPage() {
  // Danh sách các loại sổ sách bắt buộc theo Thông tư 88/2021/TT-BTC
  const officialReports = [
    { title: 'Sổ chi tiết doanh thu bán hàng', code: 'S1-HKD', desc: 'Ghi nhận chi tiết doanh thu theo từng mặt hàng và hóa đơn.' },
    { title: 'Sổ chi tiết vật liệu, dụng cụ, hàng hóa', code: 'S2-HKD', desc: 'Theo dõi nhập - xuất - tồn kho vật liệu xây dựng.' },
    { title: 'Sổ chi phí sản xuất, kinh doanh', code: 'S3-HKD', desc: 'Tổng hợp các chi phí vận hành cửa hàng hàng tháng.' },
    { title: 'Sổ theo dõi thực hiện nghĩa vụ thuế', code: 'S4-HKD', desc: 'Báo cáo thuế GTGT và thuế TNCN dự tính.' },
    { title: 'Sổ tình hình thanh toán tiền lương', code: 'S5-HKD', desc: 'Quản lý lương, thưởng và bảo hiểm nhân viên.' },
    { title: 'Sổ quỹ tiền mặt', code: 'S6-HKD', desc: 'Theo dõi dòng tiền mặt ra vào tại cửa hàng.' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. HEADER BÁO CÁO */}
      <div className="bg-white p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
            <ShieldCheck size={32}/>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Hệ thống Sổ sách & Báo cáo thuế</h2>
            <p className="text-sm text-gray-500">Chuẩn hóa theo <b className="text-blue-600">Thông tư 88/2021/TT-BTC</b></p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Calendar size={16}/> Chọn kỳ
           </button>
           <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2">
              <Download size={16}/> Xuất toàn bộ
           </button>
        </div>
      </div>

      {/* 2. DANH SÁCH CÁC LOẠI SỔ SÁCH */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officialReports.map((report, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md tracking-widest uppercase border border-blue-100">
                 {report.code}
              </span>
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                <FileSpreadsheet className="text-gray-300 group-hover:text-blue-500" size={20}/>
              </div>
            </div>
            
            <h4 className="font-bold text-gray-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
              {report.title}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              {report.desc}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
              <span className="text-[10px] text-gray-300 font-medium italic">Cập nhật: Mới nhất</span>
              <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                Xem & Tải về <Download size={12}/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. PHẦN BIỂU ĐỒ MINH HỌA (Làm đẹp giao diện) */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl mt-8">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <PieChart className="text-blue-400"/> Phân tích Doanh thu & Lợi nhuận
          </h3>
          <p className="text-gray-400 text-sm max-w-lg">
            Hệ thống tự động tổng hợp dữ liệu từ các đơn hàng POS và AI để đưa ra báo cáo lãi lỗ chính xác theo thời gian thực.
          </p>
        </div>
        {/* Hình trang trí mờ mờ */}
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
           <FileText size={300} />
        </div>
      </div>
    </div>
  );
}