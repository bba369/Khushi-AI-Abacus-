
import React from 'react';

const partners = [
  { name: 'Khushi AI Guru', icon: '🤖', desc: 'Personalized Abacus Tutor' },
  { name: 'ERIC Nepali', icon: '🏔️', desc: 'EdTech Innovation Hub' },
  { name: 'KHUSHI Entrepreneurs', icon: '🚀', desc: 'Business Empowerment' },
  { name: 'Khushi Mart', icon: '🛒', desc: 'Sustainable Ecosystem' },
];

const Partners: React.FC = () => {
  return (
    <div className="w-full mt-8 px-4">
      <div className="text-center mb-4">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Our Ecosystem Partners</h3>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-600 to-transparent mx-auto"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {partners.map((p) => (
          <div key={p.name} className="glass p-3 rounded-2xl border-white/5 hover:border-white/20 transition-all flex flex-col items-center text-center group">
            <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
              {p.icon}
            </div>
            <h4 className="text-xs font-bold text-slate-200 mb-0.5">{p.name}</h4>
            <p className="text-[8px] text-slate-500 uppercase tracking-wider">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
