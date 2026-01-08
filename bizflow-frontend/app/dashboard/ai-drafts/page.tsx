'use client';
import { Bot, MessageSquare, Check, X, Edit3, User, Zap } from 'lucide-react';

export default function AiDraftsPage() {
  const drafts = [
    {
      id: 1,
      source: 'Zalo Message',
      content: 'Lấy cho anh Ba 5 bao xi măng Hà Tiên, ghi sổ nhé em',
      customer: 'Anh Ba',
      items: [{ name: 'Xi măng Hà Tiên', qty: 5, unit: 'Bao' }],
      time: '2 phút trước'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <Bot className="text-white" size={28} />
        </div>
        <div>
            <h2 className="text-2xl font-bold text-gray-800">Duyệt đơn hàng nháp từ AI</h2>
            <p className="text-gray-500 text-sm italic">Hệ thống BizFlow tự động chuyển tin nhắn thành đơn hàng.</p>
        </div>
      </div>

      {drafts.map(d => (
        <div key={d.id} className="bg-white rounded-3xl border-2 border-indigo-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row">
            {/* Nguồn tin nhắn gốc */}
            <div className="w-full md:w-1/3 bg-indigo-50/50 p-8 border-r border-indigo-50">
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600"><MessageSquare size={16}/></span>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Nội dung gốc</span>
              </div>
              <p className="italic text-indigo-900 font-medium text-lg leading-relaxed">"{d.content}"</p>
              <div className="mt-6 flex items-center gap-2 text-indigo-400">
                <Zap size={14} />
                <span className="text-xs font-medium">Nhận diện bởi BizFlow AI • {d.time}</span>
              </div>
            </div>

            {/* Kết quả AI xử lý */}
            <div className="flex-1 p-8">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Khách hàng nhận diện</p>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {d.customer.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-800 text-lg">{d.customer}</span>
                    </div>
                 </div>
                 <div className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-green-200 shadow-sm">
                    Độ tin cậy: Cao (98%)
                 </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400 uppercase text-[10px] tracking-wider border-b">
                        <th className="pb-3">Tên sản phẩm</th>
                        <th className="pb-3 text-center">Số lượng</th>
                        <th className="pb-3 text-right">Đơn vị</th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.items.map((item, idx) => (
                        <tr key={idx} className="font-bold text-gray-700">
                          <td className="py-4">{item.name}</td>
                          <td className="py-4 text-center">
                              <span className="bg-white px-3 py-1 rounded-lg border shadow-sm">{item.qty}</span>
                          </td>
                          <td className="py-4 text-right text-gray-400 font-medium">{item.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button className="px-5 py-2.5 rounded-xl text-gray-400 font-bold hover:bg-gray-50 hover:text-red-500 transition-all flex items-center gap-2">
                  <X size={18}/> Hủy bỏ
                </button>
                <button className="px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all flex items-center gap-2 border border-indigo-100">
                  <Edit3 size={18}/> Sửa thủ công
                </button>
                <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center gap-2">
                  <Check size={18}/> Xác nhận & Tạo đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}