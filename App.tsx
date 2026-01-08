import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  ShieldCheck, 
  Zap, 
  Mail, 
  Star, 
  ChevronRight, 
  TrendingUp, 
  Cpu, 
  Briefcase, 
  ShoppingBag, 
  Server,
  Share2,
  Bookmark,
  DollarSign,
  Languages,
  CheckCircle2,
  AlertCircle,
  Award,
  Target
} from 'lucide-react';
// import { generatePersuasiveCopy } from './services/geminiService'; // 已改为使用静态文案
import { UseCase } from './types';

type Language = 'en' | 'cn';

const translations = {
  en: {
    nav_save: "Save",
    nav_btn: "Secure This Domain",
    hero_tag: "Global Digital Asset",
    hero_sub: "Electronic Connectivity. A short, powerful bridge for global technology and communication industries.",
    hero_cta: "Make an Offer",
    hero_badge: "International Ready",
    pitch_title: "Visionary Branding",
    pitch: "e-conn.com is a premium digital asset of exceptional strategic value. Its concise, powerful, and internationally resonant name directly captures the core proposition of 'electronic connectivity' in the digital era. Whether building cutting-edge technology ecosystems or shaping global business landscapes, e-conn naturally endows brands with inherent authority and technological foresight. It serves as the golden intersection connecting innovative technology with commercial applications, bridging the present and the future, empowering your brand to rapidly establish leadership and win market trust in the fiercely competitive global digital economy.",
    benefits_1_title: "Ultra Concise",
    benefits_1_desc: "Only 5 letters before the dot. Easy to type, hard to forget, and perfect for global branding.",
    benefits_2_title: "Universal Appeal",
    benefits_2_desc: "Ideal for IoT, networking, e-commerce, or enterprise connectivity solutions worldwide.",
    benefits_3_title: "Safe Transfer",
    benefits_3_desc: "Transactions are processed via Alibaba Cloud (Aliyun) Escrow to ensure 100% security and instant delivery.",
    benefits_4_title: "Premium Investment",
    benefits_4_desc: "A valuable digital asset with strong appreciation potential in the rapidly growing digital economy.",
    benefits_5_title: "Brand Authority",
    benefits_5_desc: "Instantly establishes credibility and professional image, enhancing brand recognition and market positioning.",
    benefits_6_title: "SEO Advantage",
    benefits_6_desc: "Short, memorable domain names perform better in search rankings and are easier for users to recall and share.",
    contact_secure: "Alibaba Cloud Escrow Supported",
    contact_title: "Acquisition Inquiry",
    contact_sub: "Directly reach the owner. All transfers are protected by official escrow platforms.",
    contact_verified: "Aliyun Verified",
    contact_escrow: "Secure Escrow & Instant Push",
    form_name: "Full Name",
    form_email: "Professional Email",
    form_currency: "Currency",
    form_price: "Maximum Offer Price",
    form_price_placeholder: "Your maximum budget",
    form_msg: "Your Message",
    form_msg_placeholder: "Describe your intent or additional terms...",
    form_btn: "Submit Acquisition Inquiry",
    form_sending: "Establishing Connection...",
    form_success: "Sent Successfully! We will contact you soon.",
    form_error: "Something went wrong. Please try again.",
    form_disclaimer: "We will respond to serious offers via email within 24 hours.",
    footer_stat_1: "Short Length",
    footer_stat_2: "Tier 1 TLD",
    footer_stat_3: "Mature History",
    footer_escrow: "Alibaba Cloud / Aliyun Secured",
    footer_verified: "Verified Domain Owner",
    footer_rights: "Protected by Aliyun professional domain transaction agreements."
  },
  cn: {
    nav_save: "收藏",
    nav_btn: "立即洽谈",
    hero_tag: "全球顶级数字资产",
    hero_sub: "电子连接之翼。连接全球技术与通信产业的强力短域名。",
    hero_cta: "提交报价",
    hero_badge: "国际通用",
    pitch_title: "前瞻性品牌定位",
    pitch: "e-conn.com 是极具战略价值的顶级数字资产。其简练、有力且富有国际化色彩的命名，直接锁定了\"电子连接\"这一数字化时代的核心命题。无论是构建前沿的科技生态，还是塑造全球化的商业版图，e-conn 都能为品牌赋予天然的权威性与技术前瞻感。它是连接创新技术与商业应用、现在与未来的黄金交汇点，助力您的品牌在竞争激烈的全球数字经济中迅速确立领跑地位并赢得市场信任。",
    benefits_1_title: "极致简约",
    benefits_1_desc: "仅5个字母。易记、易输入，是全球化品牌的不二之选。",
    benefits_2_title: "广泛适用",
    benefits_2_desc: "完美契合物联网、网络通信、电子商务或企业级连接方案。",
    benefits_3_title: "阿里云中介保障",
    benefits_3_desc: "所有交易支持通过阿里云（Alibaba Cloud）担保或带价 Push 方式进行，安全极速。",
    benefits_4_title: "优质投资资产",
    benefits_4_desc: "极具升值潜力的数字资产，在快速发展的数字经济中具有长期投资价值。",
    benefits_5_title: "品牌权威性",
    benefits_5_desc: "立即建立专业形象和可信度，提升品牌认知度和市场定位。",
    benefits_6_title: "SEO 优势",
    benefits_6_desc: "简短易记的域名在搜索引擎排名中表现更优，用户更易记忆和分享。",
    contact_secure: "支持阿里云中介交易",
    contact_title: "收购咨询",
    contact_sub: "直接与持有人联系。成交后将通过官方平台完成过户，确保万无一失。",
    contact_verified: "阿里云实名认证",
    contact_escrow: "官方担保交易 / 自动交付",
    form_name: "姓名",
    form_email: "电子邮箱",
    form_currency: "币种",
    form_price: "愿意支付的最高价格",
    form_price_placeholder: "请输入您的最高预算",
    form_msg: "留言信息",
    form_msg_placeholder: "请描述您的购买意向、付款方式或附加条款...",
    form_btn: "提交收购意向",
    form_sending: "正在建立连接...",
    form_success: "发送成功！我们将尽快回复您",
    form_error: "发送遇到问题，请稍后重试",
    form_disclaimer: "我们将在 24 小时内通过邮件回复认真的报价。",
    footer_stat_1: "极简长度",
    footer_stat_2: "顶级域名",
    footer_stat_3: "历史悠久",
    footer_escrow: "支持阿里云 (Alibaba Cloud) 担保交易",
    footer_verified: "阿里云已实名认证",
    footer_rights: "本交易受阿里云专业域名交易协议保护。"
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('cn');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [offerValue, setOfferValue] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);
  const domainName = "e-conn.com";
  const t = translations[lang];

  // 静态文案数据
  const pitchData = {
    pitch: t.pitch,
    useCases: lang === 'cn' ? [
      { title: "物联网方案", description: "物联网架构的理想中心枢纽。", icon: "cpu" },
      { title: "电子商务", description: "全球电子商务连接的极佳品牌。", icon: "shopping-bag" },
      { title: "网络硬件", description: "直指交换机、路由器和连接技术市场。", icon: "server" },
      { title: "企业软件", description: "通过无缝电子系统连接企业。", icon: "briefcase" }
    ] : [
      { title: "IoT Solutions", description: "The perfect hub for internet-of-things architecture.", icon: "cpu" },
      { title: "E-Commerce", description: "A memorable brand for global electronic commerce connectivity.", icon: "shopping-bag" },
      { title: "Network Hardware", description: "Direct positioning for switches, routers, and connectivity tech.", icon: "server" },
      { title: "Enterprise Software", description: "Connecting businesses through seamless electronic systems.", icon: "briefcase" }
    ]
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
  }, [lang]);

  // Robust submission handler using Hidden Iframe trick
  const handleFormSubmit = () => {
    setFormStatus('sending');
    // Local feedback is immediate because the iframe will handle the background request
    setTimeout(() => {
      setFormStatus('success');
      if (formRef.current) formRef.current.reset();
      setOfferValue('');
    }, 2000);
  };

  const handleBookmark = () => {
    const msg = lang === 'en' 
      ? "To bookmark, press " + (navigator.userAgent.includes('Mac') ? 'Cmd + D' : 'Ctrl + D')
      : "请按 " + (navigator.userAgent.includes('Mac') ? 'Cmd + D' : 'Ctrl + D') + " 收藏本页";
    alert(msg);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Premium Domain for Sale: ${domainName}`,
        text: `Check out this valuable domain name for sale: ${domainName}`,
        url: window.location.href,
      });
    } else {
      const copyMsg = lang === 'en' ? "URL copied to clipboard" : "链接已复制到剪贴板";
      navigator.clipboard.writeText(window.location.href);
      alert(copyMsg);
    }
  };

  return (
    <div className="min-h-screen selection:bg-blue-100">
      {/* Hidden Iframe for silent form submission */}
      <iframe name="hidden_iframe" id="hidden_iframe" style={{ display: 'none' }}></iframe>

      <div style={{
        backgroundColor: '#ffeb3b',
        color: '#000',
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '18px'
      }}>
        {lang === 'cn' ? '此域名正在出售！立即联系我们以获取更多信息。' : 'This domain is for sale! Contact us now for more details.'}
      </div>

      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-800 flex items-center gap-2">
            <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs italic font-serif">e</span>
            {domainName}
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors mr-2 px-3 py-1.5 rounded-full border border-slate-200"
            >
              <Languages size={16} />
              {lang === 'en' ? "中文" : "English"}
            </button>
            <button onClick={handleBookmark} className="hidden sm:flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
              <Bookmark size={18} /> {t.nav_save}
            </button>
            <button onClick={handleShare} className="p-2 text-slate-600 hover:text-blue-600 transition-colors"><Share2 size={20} /></button>
            <a href="#contact" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200">
              {t.nav_btn}
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20">
        <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-20 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
            <Star size={14} /> {t.hero_tag}
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-8">
            e-conn<span className="text-blue-600">.com</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">{t.hero_sub}</p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            {/* CTA Button scrolls to #contact */}
            <a href="#contact" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200">
              {t.hero_cta} <ChevronRight size={20} />
            </a>
            <div className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold text-lg hover:border-slate-300 transition-all flex items-center justify-center gap-2 cursor-default">
              <Globe className="text-blue-400 w-5 h-5" /> {t.hero_badge}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Zap />, title: t.benefits_1_title, desc: t.benefits_1_desc, bgColor: "bg-blue-50", textColor: "text-blue-600" },
            { icon: <Globe />, title: t.benefits_2_title, desc: t.benefits_2_desc, bgColor: "bg-indigo-50", textColor: "text-indigo-600" },
            { icon: <ShieldCheck />, title: t.benefits_3_title, desc: t.benefits_3_desc, bgColor: "bg-emerald-50", textColor: "text-emerald-600", highlight: true },
            { icon: <TrendingUp />, title: t.benefits_4_title, desc: t.benefits_4_desc, bgColor: "bg-amber-50", textColor: "text-amber-600" },
            { icon: <Award />, title: t.benefits_5_title, desc: t.benefits_5_desc, bgColor: "bg-purple-50", textColor: "text-purple-600" },
            { icon: <Target />, title: t.benefits_6_title, desc: t.benefits_6_desc, bgColor: "bg-rose-50", textColor: "text-rose-600" }
          ].map((benefit, i) => (
            <div key={i} className={`p-8 bg-white rounded-3xl border ${benefit.highlight ? 'border-blue-100 shadow-md ring-1 ring-blue-50' : 'border-slate-100 shadow-sm'} transition-shadow`}>
              <div className={`w-12 h-12 ${benefit.bgColor} rounded-2xl flex items-center justify-center ${benefit.textColor} mb-6`}>
                {benefit.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 ${benefit.highlight ? 'text-emerald-700' : ''}`}>{benefit.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{benefit.desc}</p>
            </div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800">{t.pitch_title}</h2>
            <p className="text-lg text-slate-600 leading-relaxed italic">"{pitchData.pitch}"</p>
          </div>
        </section>

        {/* scroll-mt-24 ensures the section title is visible below the fixed nav header */}
        <section id="contact" className="max-w-4xl mx-auto px-6 mt-40 scroll-mt-24">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-3">
                    <CheckCircle2 size={14} /> {t.contact_secure}
                  </div>
                  <h2 className="text-4xl font-bold">{t.contact_title}</h2>
                  <p className="text-slate-400 mt-2 max-w-sm">{t.contact_sub}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500"><ShieldCheck size={24} /></div>
                  <div className="text-sm">
                    <div className="font-bold">{t.contact_verified}</div>
                    <div className="text-slate-400 text-xs text-nowrap">{t.contact_escrow}</div>
                  </div>
                </div>
              </div>
              
              <form 
                ref={formRef}
                className="space-y-6" 
                method="POST" 
                action="https://formsubmit.co/865607246@qq.com" 
                target="hidden_iframe"
                onSubmit={handleFormSubmit}
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value={`Inquiry for ${domainName}`} />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{t.form_name}</label>
                    <input name="name" type="text" placeholder="John Doe" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{t.form_email}</label>
                    <input name="email" type="email" placeholder="contact@company.com" required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{t.form_currency}</label>
                    <select name="currency" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white appearance-none cursor-pointer">
                      <option className="bg-slate-900" value="USD">USD ($)</option>
                      <option className="bg-slate-900" value="CNY">CNY (¥)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2 relative">
                    <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{t.form_price}</label>
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><DollarSign size={18} /></div>
                      <input 
                        name="offer_price"
                        type="number" 
                        placeholder={t.form_price_placeholder}
                        value={offerValue}
                        onChange={(e) => setOfferValue(e.target.value)}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{t.form_msg}</label>
                  <textarea name="message" rows={4} placeholder={t.form_msg_placeholder} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white resize-none"></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-2xl ${
                    formStatus === 'success' ? 'bg-emerald-500 text-white cursor-default' : 
                    'bg-blue-600 hover:bg-blue-700 text-white active:scale-[0.98]'
                  }`}
                >
                  {formStatus === 'idle' && <><Mail size={22} /> {t.form_btn}</>}
                  {formStatus === 'sending' && <span className="animate-pulse">{t.form_sending}</span>}
                  {formStatus === 'success' && <><CheckCircle2 size={22} /> {t.form_success}</>}
                </button>

                <p className="text-center text-slate-500 text-xs">{t.form_disclaimer}</p>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full"></div>
          </div>
        </section>

        <footer className="mt-40 text-center border-t border-slate-100 pt-20">
          <div className="flex justify-center gap-8 md:gap-12 mb-12">
            {[[5, t.footer_stat_1], [".com", t.footer_stat_2], ["20+", t.footer_stat_3]].map(([v, s], i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-slate-800">{v}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{s as string}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-10">
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-blue-500" /> {t.footer_escrow}</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-blue-500" /> {t.footer_verified}</span>
          </div>
          <div className="text-xs text-slate-300 pb-12 px-6">© {new Date().getFullYear()} {domainName}. {t.footer_rights}</div>
        </footer>
      </main>
    </div>
  );
};

export default App;
