"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  Accessibility,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  ClipboardCheck,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileText,
  FolderKanban,
  Gauge,
  GitCompareArrows,
  Globe2,
  Info,
  LayoutDashboard,
  Link2,
  LoaderCircle,
  LockKeyhole,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  MoveUpLeft,
  PencilLine,
  RefreshCw,
  Plus,
  Radar,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Smartphone,
  SquareArrowOutUpLeft,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  UserRoundCheck,
  WandSparkles,
  X,
} from "lucide-react";

type Screen =
  | "landing"
  | "dashboard"
  | "projects"
  | "new-audit"
  | "initial-result"
  | "processing"
  | "report"
  | "voice-setup"
  | "voice-report"
  | "unified"
  | "compare"
  | "reports"
  | "services"
  | "methodology"
  | "settings";

const navItems: Array<{
  label: string;
  screen: Screen;
  icon: typeof LayoutDashboard;
}> = [
  { label: "الرئيسية", screen: "dashboard", icon: LayoutDashboard },
  { label: "المشاريع", screen: "projects", icon: FolderKanban },
  { label: "تقييم المنتج", screen: "new-audit", icon: ClipboardCheck },
  { label: "آراء المستخدمين", screen: "voice-setup", icon: MessageSquareText },
  { label: "التقرير الموحّد", screen: "unified", icon: Link2 },
  { label: "المتابعة والإصدارات", screen: "compare", icon: GitCompareArrows },
  { label: "التقارير", screen: "reports", icon: FileText },
  { label: "الخدمات المتخصصة", screen: "services", icon: BriefcaseBusiness },
  { label: "دليل المنهجية", screen: "methodology", icon: BookOpen },
  { label: "الإعدادات", screen: "settings", icon: Settings },
];

const dimensions = [
  { name: "التنقل وبنية المعلومات", score: 84 },
  { name: "قابلية الاستخدام", score: 76 },
  { name: "إمكانية الوصول", score: 62 },
  { name: "التسلسل البصري", score: 88 },
  { name: "وضوح المحتوى", score: 79 },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </span>
      <span className="brand-copy">
        <strong>XP Insight</strong>
        {!compact && <small>ذكاء تجربة المنتجات</small>}
      </span>
    </div>
  );
}

function DemoBadge() {
  return (
    <span className="demo-badge">
      <Info size={14} /> بيانات توضيحية لأغراض النموذج الأولي
    </span>
  );
}

function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

function Landing({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="landing">
      <header className="landing-header container">
        <Logo />
        <nav aria-label="التنقل الرئيسي">
          <button onClick={() => navigate("methodology")}>دليل المنهجية</button>
          <button onClick={() => navigate("dashboard")}>الدخول للمنصة</button>
        </nav>
      </header>

      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} /> نموذج أولي عربي لقطاع الأعمال
          </span>
          <h1>افهم تجربة منتجك من الواجهة وصوت المستخدم</h1>
          <p>
            قيّم منتجك الرقمي، واكتشف مشكلات الاستخدام، واربطها بآراء المستخدمين
            العامة في تقرير واحد يساعد فريقك على تحديد أولويات التحسين.
          </p>
          <div className="hero-actions">
            <Button
              onClick={() => navigate("new-audit")}
              icon={<ArrowLeft size={18} />}
            >
              ابدأ تقييمًا أوليًا
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("report")}
              icon={<BarChart3 size={18} />}
            >
              استعرض تقريرًا توضيحيًا
            </Button>
          </div>
          <p className="trust-note">
            <ShieldCheck size={17} /> لا نقدّم النتائج الآلية كبديل عن اختبار المستخدمين
          </p>
        </div>

        <div className="hero-visual" aria-label="مثال على التحليل الموحد">
          <div className="preview-window">
            <div className="preview-topbar">
              <div className="window-dots"><i /><i /><i /></div>
              <span>التقرير الموحّد — مشروع متجر نَماء</span>
              <Radar size={18} />
            </div>
            <div className="preview-body">
              <div className="connection-line" />
              <article className="signal-card interface-signal">
                <span className="signal-label">
                  <Bot size={15} /> اكتشاف آلي
                </span>
                <strong>خطوات إتمام الطلب أطول من اللازم</strong>
                <p>7 خطوات لإكمال عملية الشراء</p>
                <div className="confidence-row">
                  <span>نسبة الثقة</span><b>87٪</b>
                </div>
              </article>
              <div className="link-node"><Link2 size={20} /></div>
              <article className="signal-card user-signal">
                <span className="signal-label">
                  <Users size={15} /> دليل من المستخدمين
                </span>
                <blockquote>«الدفع طويل واضطررت لإعادة بيانات العنوان»</blockquote>
                <p>12 رأيًا مرتبطًا · 3 مصادر عامة</p>
              </article>
              <div className="unified-result">
                <span><Target size={17} /> الإجراء المقترح</span>
                <strong>دمج خطوتي العنوان والتسليم وتأجيل الحقول غير الضرورية</strong>
                <small>توصية تحتاج اختبارًا قبل الاعتماد</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section container">
        <div className="section-heading centered">
          <span>خدمات متدرجة حسب حاجة فريقك</span>
          <h2>ابدأ بتشخيص سريع وانتقل إلى التحقق والتحسين</h2>
        </div>
        <div className="service-grid">
          <article className="service-card">
            <span className="service-icon"><ClipboardCheck /></span>
            <div>
              <small>الخدمة الأساسية</small>
              <h3>التقييم والتقرير التشخيصي</h3>
              <p>تقييم أولي محدود، ثم تقرير آلي مفصل للرابط الحي ضمن سياق الجمهور والمهمة.</p>
            </div>
            <button onClick={() => navigate("new-audit")} aria-label="ابدأ تقييم تجربة المنتج">
              <ArrowLeft size={20} />
            </button>
          </article>
          <article className="service-card">
            <span className="service-icon"><MessageSquareText /></span>
            <div>
              <small>الخدمة المكمّلة</small>
              <h3>تحليل آراء المستخدمين</h3>
              <p>تنظيم الآراء العامة المسموح باستخدامها وربطها بمشكلات تجربة المنتج.</p>
            </div>
            <button onClick={() => navigate("voice-setup")} aria-label="ابدأ تحليل صوت المستخدم">
              <ArrowLeft size={20} />
            </button>
          </article>
        </div>
      </section>

      <section className="method-teaser container">
        <div>
          <span className="eyebrow neutral"><BookOpen size={16} /> منهجية شفافة</span>
          <h2>اعرف لماذا ظهرت كل نتيجة، وما الذي يحتاج تحققًا بشريًا</h2>
          <p>
            كل ملاحظة مرتبطة بدليل ومعيار ونسبة ثقة وطريقة تحقق، مع فصل واضح بين
            الاكتشاف الآلي ورأي المستخدم والمحاكاة السلوكية.
          </p>
        </div>
        <div className="hero-actions compact-actions">
          <Button variant="secondary" onClick={() => navigate("methodology")} icon={<BookOpen size={18} />}>افتح دليل المنهجية</Button>
          <Button variant="secondary" onClick={() => navigate("services")} icon={<BriefcaseBusiness size={18} />}>الخدمات المتخصصة</Button>
        </div>
      </section>

      <footer className="landing-footer container">
        <Logo compact />
        <span>XP Insight — هوية رقمية مستقلة بدعم من أبعاد التجربة · نموذج أولي 2026</span>
      </footer>
    </main>
  );
}

function Sidebar({
  screen,
  navigate,
  open,
  close,
}: {
  screen: Screen;
  navigate: (screen: Screen) => void;
  open: boolean;
  close: () => void;
}) {
  return (
    <>
      <div className={`sidebar-overlay ${open ? "show" : ""}`} onClick={close} />
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="mobile-close" onClick={close} aria-label="إغلاق القائمة"><X /></button>
        </div>
        <div className="workspace-switcher">
          <span className="workspace-logo">أ</span>
          <span><strong>فريق متجر نَماء</strong><small>مساحة عميل تجريبية</small></span>
          <ChevronDown size={16} />
        </div>
        <nav className="sidebar-nav" aria-label="تنقل المنصة">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.screen === screen;
            return (
              <button
                key={item.screen}
                className={active ? "active" : ""}
                onClick={() => {
                  navigate(item.screen);
                  close();
                }}
              >
                <Icon size={19} />
                <span>{item.label}</span>
                {item.screen === "unified" && <i>3</i>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-method-card">
          <BookOpen size={20} />
          <div><strong>كيف نحسب النتائج؟</strong><span>اطّلع على المعايير وحدود التقييم</span></div>
          <button onClick={() => navigate("methodology")} aria-label="فتح المنهجية"><ChevronLeft size={18} /></button>
        </div>
        <div className="sidebar-user">
          <span className="avatar">ب</span>
          <span><strong>براء الصاعدي</strong><small>مدير مساحة العمل</small></span>
          <MoreHorizontal size={18} />
        </div>
      </aside>
    </>
  );
}

function Topbar({
  title,
  openMenu,
  navigate,
  onSearch,
  onNotifications,
}: {
  title: string;
  openMenu: () => void;
  navigate: (screen: Screen) => void;
  onSearch: () => void;
  onNotifications: () => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <button className="menu-trigger" onClick={openMenu} aria-label="فتح القائمة"><Menu /></button>
        <div><small>مساحة العمل</small><h1>{title}</h1></div>
      </div>
      <div className="topbar-actions">
        <DemoBadge />
        <button className="icon-button" onClick={onSearch} aria-label="البحث"><Search size={19} /></button>
        <button className="icon-button notification" onClick={onNotifications} aria-label="الإشعارات"><Bell size={19} /><i /></button>
        <Button className="desktop-action" onClick={() => navigate("new-audit")} icon={<Plus size={18} />}>تقييم جديد</Button>
      </div>
    </header>
  );
}

function MetricCard({
  label,
  value,
  helper,
  icon,
  tone = "blue",
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  tone?: "blue" | "red" | "green" | "amber";
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}>{icon}</div>
      <div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{helper}</small></div>
    </article>
  );
}

function ScoreRing({ score }: { score: number }) {
  return (
    <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}>
      <div><strong>{score}</strong><span>من 100</span></div>
    </div>
  );
}

function Dashboard({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="page dashboard-page">
      <section className="welcome-row">
        <div>
          <span className="page-kicker">الأربعاء، 12 أغسطس</span>
          <h2>صباح الخير، براء</h2>
          <p>هذه أحدث صورة عن تجربة منتجاتك وما يحتاج قرارًا من الفريق.</p>
        </div>
        <div className="quick-actions">
          <Button onClick={() => navigate("new-audit")} icon={<ClipboardCheck size={18} />}>ابدأ تقييمًا أوليًا</Button>
          <Button variant="secondary" onClick={() => navigate("voice-setup")} icon={<MessageSquareText size={18} />}>تحليل آراء المستخدمين</Button>
          <Button variant="secondary" onClick={() => navigate("services")} icon={<UserRoundCheck size={18} />}>اطلب خدمة متخصصة</Button>
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="متوسط تجربة المنتجات" value="78" helper="+6 نقاط عن التقييم السابق" icon={<Gauge />} tone="blue" />
        <MetricCard label="المشكلات الحرجة" value="3" helper="تحتاج معالجة قبل الإطلاق" icon={<CircleAlert />} tone="red" />
        <MetricCard label="التحسين منذ الإصدار السابق" value="+13" helper="من 68 إلى 81 في متجر نَماء" icon={<TrendingUp />} tone="green" />
        <MetricCard label="الآراء العامة المحللة" value="1,284" helper="بيانات توضيحية من 6 مصادر" icon={<MessageSquareText />} tone="amber" />
      </section>

      <section className="dashboard-grid">
        <article className="panel project-health">
          <div className="panel-head">
            <div><span className="panel-kicker">المشروع النشط</span><h3>متجر نَماء</h3></div>
            <button className="text-button" onClick={() => navigate("report")}>فتح التقرير <ChevronLeft size={17} /></button>
          </div>
          <div className="project-health-body">
            <ScoreRing score={81} />
            <div className="dimension-mini-list">
              {dimensions.map((dimension) => (
                <div key={dimension.name}>
                  <span>{dimension.name}</span><b>{dimension.score}</b>
                  <i><em style={{ width: `${dimension.score}%` }} /></i>
                </div>
              ))}
            </div>
          </div>
          <div className="panel-foot insight-foot">
            <span><CircleCheck size={17} /> عولجت 7 مشكلات منذ آخر تقييم</span>
            <button onClick={() => navigate("compare")}>قارن الإصدارين</button>
          </div>
        </article>

        <article className="panel unified-preview">
          <div className="panel-head">
            <div><span className="panel-kicker">أقوى فرصة الآن</span><h3>دليل موحّد يحتاج قرارك</h3></div>
            <span className="count-badge">3 روابط جديدة</span>
          </div>
          <div className="mini-link-visual">
            <div className="mini-finding"><Bot size={17} /><span><small>مشكلة في الواجهة</small><strong>خطوات إتمام الطلب طويلة</strong></span></div>
            <span className="mini-connector"><Link2 size={17} /></span>
            <div className="mini-finding"><Users size={17} /><span><small>صوت المستخدم</small><strong>12 رأيًا متوافقًا</strong></span></div>
          </div>
          <p className="unified-summary">تتقاطع نتيجة التقييم التشخيصي مع آراء عامة توضيحية حول طول الدفع وإعادة إدخال العنوان.</p>
          <div className="evidence-chips">
            <span>ثقة العلاقة 87٪</span><span>رحلة الشراء</span><span>3 مصادر توضيحية</span>
          </div>
          <div className="panel-foot">
            <Button onClick={() => navigate("unified")} icon={<Link2 size={17} />}>مراجعة الرابط</Button>
            <Button variant="ghost" onClick={() => navigate("unified")}>عرض الكل</Button>
          </div>
        </article>
      </section>

      <section className="panel recent-section">
        <div className="panel-head">
          <div><span className="panel-kicker">آخر النشاطات</span><h3>التقييمات والتحليلات الأخيرة</h3></div>
          <button className="text-button" onClick={() => navigate("projects")}>كل المشاريع <ChevronLeft size={17} /></button>
        </div>
        <div className="responsive-table">
          <table>
            <thead><tr><th>المشروع</th><th>نوع التحليل</th><th>الحالة</th><th>النتيجة</th><th>آخر تحديث</th><th /></tr></thead>
            <tbody>
              <tr><td><span className="table-product teal">ن</span><b>متجر نَماء</b></td><td>تقرير تشخيصي آلي</td><td><span className="status success">توضيحي مكتمل</span></td><td><strong>81 / 100</strong></td><td>منذ ساعتين</td><td><button onClick={() => navigate("report")} aria-label="فتح التقرير"><ChevronLeft /></button></td></tr>
              <tr><td><span className="table-product blue">ن</span><b>متجر نَماء</b></td><td>تحليل آراء المستخدمين</td><td><span className="status success">توضيحي مكتمل</span></td><td><strong>846 رأيًا</strong></td><td>أمس</td><td><button onClick={() => navigate("voice-report")} aria-label="فتح التقرير"><ChevronLeft /></button></td></tr>
              <tr><td><span className="table-product amber">ن</span><b>متجر نَماء</b></td><td>تقرير موحّد</td><td><span className="status warning">بحاجة مراجعة</span></td><td><strong>3 علاقات</strong></td><td>قبل 3 أيام</td><td><button onClick={() => navigate("unified")} aria-label="فتح التقرير"><ChevronLeft /></button></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

type Notify = (message: string, tone?: "success" | "warning" | "info") => void;

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="inner-page-head">
      <div>
        {eyebrow && <span className="page-kicker">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {actions && <div className="page-head-actions">{actions}</div>}
    </section>
  );
}

function Modal({
  title,
  description,
  children,
  onClose,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal-backdrop" onClick={onClose} aria-label="إغلاق النافذة" />
      <section className="modal-card">
        <header>
          <div><h3>{title}</h3>{description && <p>{description}</p>}</div>
          <button className="icon-button" onClick={onClose} aria-label="إغلاق"><X size={19} /></button>
        </header>
        {children}
      </section>
    </div>
  );
}

function FormField({
  label,
  hint,
  error,
  children,
  wide = false,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`form-field ${wide ? "field-wide" : ""} ${error ? "has-error" : ""}`}>
      <span>{label}</span>
      {children}
      {error ? <small className="field-error"><CircleAlert size={13} /> {error}</small> : hint ? <small>{hint}</small> : null}
    </label>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  onChange,
  icon,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button type="button" className={`toggle-card ${checked ? "selected" : ""}`} onClick={onChange} aria-pressed={checked}>
      <span className="toggle-icon">{icon ?? <Check size={17} />}</span>
      <span><strong>{title}</strong><small>{description}</small></span>
      <i>{checked && <Check size={13} />}</i>
    </button>
  );
}

function ProjectsScreen({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="page">
      <PageHeader
        eyebrow="مساحة المنتجات"
        title="المشاريع"
        description="كل مشروع يجمع تقييمات الواجهة وصوت المستخدم والإصدارات في سجل واحد."
        actions={<Button onClick={() => navigate("new-audit")} icon={<Plus size={18} />}>مشروع جديد</Button>}
      />
      <div className="filter-bar">
        <div className="search-input"><Search size={17} /><input aria-label="البحث في المشاريع" placeholder="ابحث باسم المنتج أو الفريق" /></div>
        <select className="filter-select" aria-label="تصفية المشاريع حسب الحالة"><option>كل الحالات</option><option>نشط</option><option>مؤرشف</option></select>
        <select className="filter-select" aria-label="تصفية المشاريع حسب الفترة"><option>آخر 90 يومًا</option><option>آخر 30 يومًا</option><option>آخر سنة</option></select>
      </div>
      <section className="project-card-grid">
        <article className="project-card featured-project">
          <div className="project-card-head"><span className="project-avatar teal">ن</span><div><h3>متجر نَماء</h3><p>متجر إلكتروني سعودي خيالي — بيانات توضيحية</p></div><span className="status success">نشط</span></div>
          <div className="project-scores"><div><span>تجربة المنتج</span><strong>81</strong><small>+13 منذ الإصدار السابق</small></div><div><span>الآراء المحللة</span><strong>1,284</strong><small>78٪ ذات صلة</small></div><div><span>روابط موحّدة</span><strong>3</strong><small>تحتاج قرار الفريق</small></div></div>
          <div className="project-card-foot"><span>آخر تحديث: اليوم، 10:42 ص</span><Button variant="secondary" onClick={() => navigate("report")} icon={<ArrowLeft size={16} />}>فتح المشروع</Button></div>
        </article>
        <article className="empty-project-card">
          <span><Plus size={22} /></span><h3>أضف منتجًا جديدًا</h3><p>ابدأ بتقييم تجربة المنتج أو بجمع صوت المستخدم.</p><Button variant="ghost" onClick={() => navigate("new-audit")}>إنشاء مشروع</Button>
        </article>
      </section>
    </div>
  );
}

const auditSteps = [
  { number: 1, label: "معلومات المنتج" },
  { number: 2, label: "سياق الجمهور" },
  { number: 3, label: "الأهداف والمهمة" },
  { number: 4, label: "نطاق التقييم" },
];

const initialAuditData = {
  productName: "متجر نَماء",
  url: "https://demo.nama-store.sa",
  productType: "متجر إلكتروني",
  industry: "التجارة الإلكترونية",
  market: "السوق السعودي",
  language: "العربية",
  platform: "موقع إلكتروني",
  stage: "منتج قائم",
  model: "B2C",
  audience: "متسوقون داخل المملكة يستخدمون الجوال والحاسوب لإتمام مشترياتهم بأنفسهم",
  experience: "متفاوتة",
  country: "المملكة العربية السعودية",
  device: "الهاتف المحمول",
  accessibility: "قارئات الشاشة، وضوح التباين، تكبير النص، التنقل بلوحة المفاتيح",
  businessGoal: "تقليل التعطل في رحلة الشراء وتحسين وضوح إتمام الطلب",
  userGoal: "العثور على منتج وإضافته إلى السلة وإكمال الطلب دون مساعدة",
  criticalTask: "إكمال عملية شراء",
  journey: "البحث ← صفحة المنتج ← السلة ← العنوان والتسليم ← الدفع ← تأكيد الطلب",
  metric: "إكمال المهمة من أول محاولة",
  purpose: "التحقق قبل إطلاق الإصدار الجديد",
};

function AuditFlow({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [step, setStep] = useState(1);
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState(initialAuditData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [scope, setScope] = useState<Record<string, boolean>>({ live: true, screenshots: true, desktop: true, mobile: true, accessibility: true, rtl: true, journey: true });
  const setValue = (key: keyof typeof data, value: string) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };
  const validate = () => {
    const required: Record<number, Array<keyof typeof data>> = {
      1: ["productName", "url", "productType", "industry"],
      2: ["model", "audience", "country"],
      3: ["businessGoal", "userGoal", "criticalTask", "journey"],
      4: [],
    };
    const nextErrors: Record<string, string> = {};
    required[step]?.forEach((key) => { if (!data[key].trim()) nextErrors[key] = "هذا الحقل مطلوب للمتابعة"; });
    if (step === 1 && data.url && !/^https?:\/\//.test(data.url)) nextErrors.url = "أدخل رابطًا يبدأ بـ https://";
    if (step === 4 && !Object.values(scope).some(Boolean)) nextErrors.scope = "اختر عنصرًا واحدًا على الأقل من نطاق التقييم";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const next = () => { if (validate()) setStep((current) => Math.min(5, current + 1)); };
  const back = () => setStep((current) => Math.max(1, current - 1));
  const updateScope = (key: string) => setScope((current) => ({ ...current, [key]: !current[key] }));
  return (
    <div className="page form-page">
      <PageHeader eyebrow="تقييم أولي محدود" title="قيّم تجربة منتجك ضمن سياقه" description="ابدأ بفحص الرابط العام وعدد محدود من الملاحظات، ثم قرر إن كنت تحتاج التقرير التشخيصي الكامل." />
      <section className="stepper" aria-label="خطوات إعداد التقييم">
        {auditSteps.map((item) => <div key={item.number} className={`${step === item.number ? "active" : ""} ${step > item.number ? "done" : ""}`}><i>{step > item.number ? <Check size={14} /> : item.number}</i><span>{item.label}</span></div>)}
      </section>
      <section className="form-shell panel">
        {step === 1 && <>
          <div className="form-section-head"><span><Globe2 /></span><div><h3>معلومات المنتج</h3><p>سنفحص الرابط الحي ونستخدم هذه البيانات لفهم طبيعة التجربة.</p></div></div>
          <div className="form-grid">
            <FormField label="اسم المنتج" error={errors.productName}><input value={data.productName} onChange={(e) => setValue("productName", e.target.value)} /></FormField>
            <FormField label="رابط المنتج الحي" error={errors.url} hint="يجب أن تكون الصفحات المراد فحصها متاحة للعامة"><input dir="ltr" value={data.url} onChange={(e) => setValue("url", e.target.value)} /></FormField>
            <FormField label="نوع المنتج" error={errors.productType}><input value={data.productType} onChange={(e) => setValue("productType", e.target.value)} /></FormField>
            <FormField label="القطاع" error={errors.industry}><select value={data.industry} onChange={(e) => setValue("industry", e.target.value)}><option>الصحة الرقمية</option><option>الخدمات الحكومية</option><option>التجارة الإلكترونية</option><option>الخدمات المالية</option></select></FormField>
            <FormField label="السوق الرئيسي"><select value={data.market} onChange={(e) => setValue("market", e.target.value)}><option>السوق السعودي</option><option>دول الخليج</option><option>الشرق الأوسط وشمال أفريقيا</option></select></FormField>
            <FormField label="لغة الواجهة"><select value={data.language} onChange={(e) => setValue("language", e.target.value)}><option>العربية</option><option>العربية والإنجليزية</option><option>الإنجليزية</option></select></FormField>
            <FormField label="المنصة"><select value={data.platform} onChange={(e) => setValue("platform", e.target.value)}><option>موقع إلكتروني</option><option>متجر إلكتروني</option><option>منصة ويب</option></select></FormField>
            <FormField label="مرحلة المنتج"><select value={data.stage} onChange={(e) => setValue("stage", e.target.value)}><option>نموذج أولي</option><option>منتج قائم</option><option>قبل إطلاق إصدار</option><option>بعد إعادة تصميم</option></select></FormField>
          </div>
        </>}
        {step === 2 && <>
          <div className="form-section-head"><span><Users /></span><div><h3>سياق الجمهور</h3><p>لا يمكن تقييم قرار تصميمي من دون معرفة من يستخدمه وأين وكيف.</p></div></div>
          <div className="form-grid">
            <FormField label="نموذج السوق" error={errors.model}><div className="segmented"><button className={data.model === "B2B" ? "selected" : ""} onClick={() => setValue("model", "B2B")} type="button">شركة إلى شركة</button><button className={data.model === "B2C" ? "selected" : ""} onClick={() => setValue("model", "B2C")} type="button">شركة إلى فرد</button><button className={data.model === "B2B2C" ? "selected" : ""} onClick={() => setValue("model", "B2B2C")} type="button">نموذج مختلط</button></div></FormField>
            <FormField label="خبرة المستخدمين الرقمية"><select value={data.experience} onChange={(e) => setValue("experience", e.target.value)}><option>مبتدئة</option><option>متفاوتة</option><option>متقدمة</option></select></FormField>
            <FormField label="الجمهور المستهدف" error={errors.audience} wide><textarea rows={3} value={data.audience} onChange={(e) => setValue("audience", e.target.value)} /></FormField>
            <FormField label="الدولة المستهدفة" error={errors.country}><select value={data.country} onChange={(e) => setValue("country", e.target.value)}><option>المملكة العربية السعودية</option><option>الإمارات العربية المتحدة</option><option>دول الخليج</option></select></FormField>
            <FormField label="الجهاز الأساسي"><select value={data.device} onChange={(e) => setValue("device", e.target.value)}><option>الهاتف المحمول</option><option>الحاسوب المكتبي</option><option>أجهزة متعددة</option></select></FormField>
            <FormField label="اعتبارات إمكانية الوصول" wide hint="سنفصل ما يمكن اكتشافه آليًا عما يحتاج مراجعة بشرية"><textarea rows={3} value={data.accessibility} onChange={(e) => setValue("accessibility", e.target.value)} /></FormField>
          </div>
        </>}
        {step === 3 && <>
          <div className="form-section-head"><span><Target /></span><div><h3>أهداف العمل والمستخدم</h3><p>سنقيّم الرحلة بناءً على المهمة الحرجة ومعيار نجاح واضح.</p></div></div>
          <div className="form-grid">
            <FormField label="الهدف الرئيسي للعمل" error={errors.businessGoal}><input value={data.businessGoal} onChange={(e) => setValue("businessGoal", e.target.value)} /></FormField>
            <FormField label="الهدف الرئيسي للمستخدم" error={errors.userGoal}><input value={data.userGoal} onChange={(e) => setValue("userGoal", e.target.value)} /></FormField>
            <FormField label="المهمة الحرجة" error={errors.criticalTask}><select value={data.criticalTask} onChange={(e) => setValue("criticalTask", e.target.value)}><option>إكمال عملية شراء</option><option>إنشاء حساب</option><option>تقديم طلب رقمي</option><option>الاشتراك في خدمة</option></select></FormField>
            <FormField label="معيار النجاح"><input value={data.metric} onChange={(e) => setValue("metric", e.target.value)} /></FormField>
            <FormField label="الصفحة أو الرحلة المراد تقييمها" error={errors.journey} wide><input value={data.journey} onChange={(e) => setValue("journey", e.target.value)} /></FormField>
            <FormField label="غرض التقييم" wide><select value={data.purpose} onChange={(e) => setValue("purpose", e.target.value)}><option>التحقق قبل إطلاق الإصدار الجديد</option><option>تشخيص انخفاض إكمال المهمة</option><option>تحديد أولويات التحسين</option><option>مقارنة قبل وبعد إعادة التصميم</option></select></FormField>
          </div>
          <div className="context-note"><Info size={18} /><p><strong>تنبيه منهجي:</strong> النتيجة ستصف مؤشرات جودة التجربة، لكنها لن تثبت تحسن التحويل أو الرضا من دون قياس واختبار لاحق.</p></div>
        </>}
        {step === 4 && <>
          <div className="form-section-head"><span><SlidersHorizontal /></span><div><h3>نطاق التقييم</h3><p>اختر ما تريد تضمينه. سنوضح لكل نتيجة طريقة الاكتشاف وحدودها.</p></div></div>
          <div className="scope-grid">
            <ToggleCard checked={scope.live} onChange={() => updateScope("live")} icon={<Globe2 />} title="تحليل الصفحات الحية العامة" description="التقاط البنية والمحتوى وحالات التفاعل المتاحة دون تسجيل دخول" />
            <ToggleCard checked={scope.screenshots} onChange={() => updateScope("screenshots")} icon={<Upload />} title="إرفاق شاشات إضافية" description="إضافة حالات داخلية أو تطبيق جوال لا يمكن الوصول إليها عبر الرابط" />
            <ToggleCard checked={scope.desktop} onChange={() => updateScope("desktop")} icon={<LayoutDashboard />} title="تقييم سطح المكتب" description="عرض واسع ومحاكاة استخدام بالفأرة ولوحة المفاتيح" />
            <ToggleCard checked={scope.mobile} onChange={() => updateScope("mobile")} icon={<Smartphone />} title="تقييم الجوال" description="الاستجابة وحجم الأهداف اللمسية وتسلسل المحتوى" />
            <ToggleCard checked={scope.accessibility} onChange={() => updateScope("accessibility")} icon={<Accessibility />} title="فحوص إمكانية الوصول" description="فحوص آلية مع قائمة مستقلة لما يحتاج تحققًا بشريًا" />
            <ToggleCard checked={scope.rtl} onChange={() => updateScope("rtl")} icon={<ArrowRight />} title="تقييم العربية واتجاه RTL" description="المصطلحات، اتجاه الأيقونات، الأرقام، وترتيب القراءة" />
            <ToggleCard checked={scope.journey} onChange={() => updateScope("journey")} icon={<MoveUpLeft />} title="تقييم الرحلة كاملة" description="تسلسل المهمة الحرجة وحالات النظام والتعافي من الخطأ" />
          </div>
          {errors.scope && <p className="scope-error"><CircleAlert size={15} />{errors.scope}</p>}
          {scope.screenshots && <button className="upload-zone" onClick={() => notify("تم إرفاق 3 شاشات توضيحية للمهمة الحرجة", "success")} type="button"><Upload size={22} /><span><strong>اسحب الشاشات هنا أو اختر من جهازك</strong><small>ملفات PNG أو JPG — الحد الأقصى 10 ملفات</small></span></button>}
        </>}
        {step === 5 && <>
          <div className="form-section-head"><span><ClipboardCheck /></span><div><h3>تأكيد إعداد التقييم</h3><p>راجع السياق قبل بدء المعالجة. يمكنك العودة وتعديل أي خطوة.</p></div></div>
          <div className="confirmation-grid">
            <article><span>المنتج</span><strong>{data.productName}</strong><small>{data.url}</small></article>
            <article><span>السوق والجمهور</span><strong>{data.market} · {data.model}</strong><small>{data.audience}</small></article>
            <article><span>المهمة الحرجة</span><strong>{data.criticalTask}</strong><small>{data.journey}</small></article>
            <article><span>النطاق المختار</span><strong>{Object.values(scope).filter(Boolean).length} عناصر تقييم</strong><small>يشمل الرابط الحي، الجوال، الوصول، والعربية واتجاه RTL</small></article>
          </div>
          <div className="warning-banner"><ShieldCheck size={20} /><div><strong>ستُعرض النتائج بوضوح حسب نوع الدليل</strong><p>اكتشاف آلي، مراجعة بشرية، محاكاة سلوكية، أو رأي مستخدم عام. لن توصف المحاكاة بأنها اختبار مستخدمين.</p></div></div>
          <label className="authorization-check"><input type="checkbox" checked={authorized} onChange={(event) => setAuthorized(event.target.checked)} /><span><strong>أؤكد أنني مخول بإرسال هذا الرابط أو الشاشات للتحليل.</strong><small>سيقتصر النموذج على الصفحات العامة، ولن يطلب بيانات دخول أو يحلل صفحات محمية دون تصريح.</small></span></label>
        </>}
        <footer className="form-actions">
          <Button variant="secondary" onClick={step === 1 ? () => navigate("dashboard") : back} icon={<ArrowRight size={17} />}>{step === 1 ? "إلغاء" : "السابق"}</Button>
          {step < 5 ? <Button onClick={next} icon={<ArrowLeft size={17} />}>{step === 4 ? "مراجعة الإعداد" : "التالي"}</Button> : <Button disabled={!authorized} onClick={() => navigate("processing")} icon={<Activity size={17} />}>ابدأ التقييم الأولي</Button>}
        </footer>
      </section>
    </div>
  );
}

const processingStages = [
  "التقاط الصفحات الحية",
  "فحص بنية الصفحة",
  "التحقق من مؤشرات إمكانية الوصول التقنية",
  "تقييم مبادئ قابلية الاستخدام",
  "تحليل التسلسل البصري والمحتوى",
  "مراجعة تدفق المهمة الحرجة",
  "ربط آراء المستخدمين المتاحة",
  "إعداد التقرير النهائي",
];

function ProcessingScreen({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [activeStage, setActiveStage] = useState(0);
  const complete = activeStage >= processingStages.length;
  useEffect(() => {
    if (complete) return;
    const timer = window.setTimeout(() => setActiveStage((current) => current + 1), 620);
    return () => window.clearTimeout(timer);
  }, [activeStage, complete]);
  useEffect(() => { if (complete) notify("اكتمل التقييم الأولي لمتجر نَماء", "success"); }, [complete, notify]);
  const progress = Math.min(100, Math.round((activeStage / processingStages.length) * 100));
  return (
    <div className="page processing-page">
      <PageHeader eyebrow="مشروع متجر نَماء" title={complete ? "اكتمل التقييم الأولي" : "نحلّل تجربة المنتج الآن"} description={complete ? "تم تجهيز ثلاث ملاحظات أولية توضيحية مع الأدلة ونسب الثقة." : "يمكنك مغادرة الصفحة؛ سيظهر إشعار عند اكتمال التقييم."} />
      <section className="processing-layout">
        <article className="panel processing-main">
          <div className={`processing-orbit ${complete ? "complete" : ""}`}>{complete ? <CheckCircle2 size={36} /> : <Radar size={34} />}</div>
          <div className="processing-summary"><strong>{progress}٪</strong><span>{complete ? "التقرير جاهز للمراجعة" : processingStages[Math.min(activeStage, processingStages.length - 1)]}</span><i><em style={{ width: `${progress}%` }} /></i></div>
          <div className="stage-list">
            {processingStages.map((stage, index) => <div key={stage} className={`${index < activeStage ? "done" : ""} ${index === activeStage && !complete ? "active" : ""}`}><span>{index < activeStage || complete ? <Check size={15} /> : index === activeStage ? <LoaderCircle className="spin" size={16} /> : <CircleDashed size={16} />}</span><strong>{stage}</strong><small>{index < activeStage || complete ? "اكتمل" : index === activeStage ? "جارٍ الآن" : "في الانتظار"}</small></div>)}
          </div>
          <div className="processing-actions">
            {complete ? <Button onClick={() => navigate("initial-result")} icon={<ArrowLeft size={18} />}>فتح النتيجة الأولية</Button> : <Button variant="secondary" onClick={() => setActiveStage(processingStages.length)} icon={<WandSparkles size={17} />}>إكمال العرض التجريبي</Button>}
            <Button variant="ghost" onClick={() => { notify("سنخبرك عند اكتمال التقرير", "info"); navigate("dashboard"); }}>العودة للرئيسية</Button>
          </div>
        </article>
        <aside className="panel processing-aside">
          <h3>ما الذي يحدث؟</h3>
          <p>نفصل بين التحليل التقني والتقييم الاستدلالي ونجهّز مسار تحقق لكل نتيجة.</p>
          <dl><div><dt>الصفحات</dt><dd>6 صفحات عامة</dd></div><div><dt>العروض</dt><dd>مكتبي + جوال</dd></div><div><dt>المهمة</dt><dd>إكمال عملية شراء</dd></div><div><dt>اللغة</dt><dd>العربية واتجاه RTL</dd></div></dl>
          <div className="context-note compact"><LockKeyhole size={17} /><p>لا تُجمع بيانات دخول أو حقول شخصية أثناء فحص الصفحات العامة.</p></div>
        </aside>
      </section>
    </div>
  );
}

function InitialAuditResult({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <div className="page initial-result-page">
      <PageHeader eyebrow="متجر نَماء · تقييم أولي" title="نتيجة أولية تساعدك على تحديد الخطوة التالية" description="فحص محدود لصفحات عامة. لا يمثل التقرير التشخيصي الكامل ولا اختبارًا مع مستخدمين حقيقيين." actions={<Button variant="secondary" onClick={() => navigate("methodology")} icon={<BookOpen size={17} />}>كيف تم التقييم؟</Button>} />
      <div className="report-disclaimer"><DemoBadge /><span><Info size={16} /> مؤشر تقديري مبني على بيانات نموذجية، ويحتاج تحققًا بشريًا قبل اتخاذ قرار تنفيذي.</span></div>
      <section className="initial-result-grid">
        <article className="panel initial-score"><ScoreRing score={72} /><div><span className="panel-kicker">مؤشر التقييم الأولي</span><h3>توجد فرص واضحة في رحلة إتمام الطلب</h3><p>تم عرض ثلاث ملاحظات فقط من نطاق الفحص المحدود.</p></div></article>
        <article className="panel initial-findings"><div className="panel-head"><div><span className="panel-kicker">عينة النتائج</span><h3>أهم الملاحظات الأولية</h3></div><span className="status warning">3 من 11</span></div><div className="initial-finding-list"><button onClick={() => navigate("report")}><SeverityBadge severity="حرجة" /><span><strong>انخفاض تباين زر إتمام الطلب</strong><small>اكتشاف آلي · ثقة 94٪</small></span><ChevronLeft /></button><button onClick={() => navigate("report")}><SeverityBadge severity="عالية" /><span><strong>خطوات العنوان والتسليم طويلة</strong><small>محاكاة سلوكية · ثقة 87٪</small></span><ChevronLeft /></button><button onClick={() => navigate("report")}><SeverityBadge severity="متوسطة" /><span><strong>رسالة خطأ رمز الخصم غير واضحة</strong><small>يحتاج مراجعة بشرية · ثقة 82٪</small></span><ChevronLeft /></button></div></article>
      </section>
      <section className="panel upgrade-panel"><div><span><FileText /></span><div><small>الخدمة التالية</small><h3>اطلب التقرير التشخيصي الكامل</h3><p>يشمل كل الملاحظات، الأدلة، المعايير، الأولويات، التوصيات وطرق التحقق. السعر النهائي قيد الاختبار.</p></div></div><div><Button onClick={() => navigate("report")} icon={<ArrowLeft size={17} />}>استعرض تقريرًا توضيحيًا</Button><Button variant="secondary" onClick={() => navigate("services")}>اطلب التقرير الكامل</Button></div></section>
    </div>
  );
}

type FindingSeverity = "حرجة" | "عالية" | "متوسطة" | "منخفضة";
type FindingDecision = "جديدة" | "مؤكدة" | "مرفوضة" | "مراجعة بشرية" | "ضمن خطة التحسين" | "محلولة";
type Finding = {
  id: string;
  title: string;
  page: string;
  severity: FindingSeverity;
  impact: number;
  effort: number;
  confidence: number;
  method: string;
  standard: string;
  evidence: string;
  explanation: string;
  recommendation: string;
  validation: string;
  labels: string[];
  relatedOpinions: number;
  decision: FindingDecision;
};

const initialFindings: Finding[] = [
  {
    id: "F-018",
    title: "انخفاض تباين زر إتمام الطلب",
    page: "الدفع — مراجعة الطلب",
    severity: "حرجة",
    impact: 5,
    effort: 1,
    confidence: 94,
    method: "فحص آلي للتباين",
    standard: "WCAG 2.2 — المعيار 1.4.3",
    evidence: "نسبة التباين المقاسة 3.1:1 للنص الأبيض على الزر الأخضر.",
    explanation: "قد يصعب على المستخدمين ذوي ضعف البصر أو عند استخدام الشاشة في ضوء ساطع قراءة الإجراء الأساسي.",
    recommendation: "رفع نسبة التباين إلى 4.5:1 على الأقل مع الحفاظ على وضوح حالة التركيز.",
    validation: "إعادة قياس التباين آليًا، ثم فحص الزر بصريًا في حالات الراحة والتركيز والتعطيل.",
    labels: ["اكتشاف آلي", "يتطلب مراجعة بشرية"],
    relatedOpinions: 0,
    decision: "جديدة",
  },
  {
    id: "F-012",
    title: "خطوات العنوان والتسليم طويلة ولا توضّح مقدار التقدم",
    page: "رحلة إتمام الطلب",
    severity: "عالية",
    impact: 5,
    effort: 3,
    confidence: 87,
    method: "تحليل تدفق المهمة + محاكاة سلوكية",
    standard: "مبدأ وضوح حالة النظام وتقليل العبء المعرفي",
    evidence: "تتطلب المهمة 7 خطوات و18 حقلًا، ولا يظهر للمستخدم عدد الخطوات المتبقية.",
    explanation: "غياب التقدم المرئي وكثرة الحقول يزيدان عدم اليقين وقد يدفعان المستخدم إلى التوقف قبل الدفع.",
    recommendation: "دمج خطوتي العنوان والتسليم، وإظهار مؤشر تقدم، وتأجيل الحقول غير اللازمة لإتمام الطلب.",
    validation: "اختبار قابلية استخدام موجّه للمهمة وقياس الإكمال والوقت والأخطاء، ثم مقارنة النتائج مع النسخة الحالية.",
    labels: ["محاكاة وليست اختبار مستخدمين", "مدعوم برأي مستخدم حقيقي"],
    relatedOpinions: 12,
    decision: "مؤكدة",
  },
  {
    id: "F-009",
    title: "رسالة خطأ رمز الخصم لا توضّح طريقة التصحيح",
    page: "السلة — تطبيق رمز الخصم",
    severity: "عالية",
    impact: 4,
    effort: 1,
    confidence: 91,
    method: "فحص حالة تفاعل",
    standard: "WCAG 2.2 — المعيار 3.3.3 واقتراحات التصحيح",
    evidence: "تظهر عبارة «بيانات غير صحيحة» دون مثال للصيغة المقبولة أو تحديد الحقل المتسبب.",
    explanation: "لا يعرف المستخدم إن كان الرمز منتهيًا أو غير مؤهل أو كُتب بصيغة غير صحيحة.",
    recommendation: "تحديد سبب الرفض بجوار الحقل مع الاحتفاظ بالرمز وإتاحة محاولة التصحيح.",
    validation: "إعادة الفحص عبر إدخال ثلاث صيغ خاطئة والتحقق من وضوح الرسالة وارتباطها برمجيًا بالحقل.",
    labels: ["اكتشاف آلي", "يتطلب مراجعة بشرية"],
    relatedOpinions: 4,
    decision: "جديدة",
  },
  {
    id: "F-004",
    title: "أيقونة الرجوع تعكس الاتجاه المتوقع في الواجهة العربية",
    page: "صفحة المنتج — عرض الجوال",
    severity: "متوسطة",
    impact: 3,
    effort: 1,
    confidence: 84,
    method: "تحليل العربية واتجاه RTL",
    standard: "إرشادات اتجاه الواجهات ثنائية الاتجاه",
    evidence: "السهم يشير إلى اليمين بينما الرجوع في هذا السياق يجب أن يشير إلى اليمين وفق موقعه ومسار الانتقال الحالي؛ يحتاج السياق المرئي مراجعة بشرية.",
    explanation: "اتجاه الأيقونة وموضعها غير متسقين مع بقية الرحلة، ما يجعل معنى الإجراء ملتبسًا.",
    recommendation: "توحيد نمط الرجوع عبر الرحلة واختباره مع متحدثين بالعربية على الجوال.",
    validation: "مراجعة بشرية لكل حالات التنقل ثم اختبار تفضيل سريع مع 5 مستخدمين عرب.",
    labels: ["يتطلب مراجعة بشرية"],
    relatedOpinions: 0,
    decision: "مراجعة بشرية",
  },
  {
    id: "F-021",
    title: "تأكيد نجاح الطلب يختفي قبل قراءته",
    page: "تأكيد الطلب",
    severity: "منخفضة",
    impact: 2,
    effort: 1,
    confidence: 78,
    method: "تحليل حالة النظام",
    standard: "مبدأ إبقاء المستخدم على اطلاع بحالة النظام",
    evidence: "رسالة النجاح المؤقتة تختفي بعد ثانيتين ولا تبقى في سجل واضح داخل الصفحة.",
    explanation: "قد لا يلاحظ المستخدم التأكيد، خصوصًا عند استخدام قارئ شاشة أو اتصال بطيء.",
    recommendation: "إظهار صفحة تأكيد ثابتة تحتوي رقم الطلب وحالته وخيارات المتابعة أو التواصل.",
    validation: "مراجعة زمن الظهور وإعلان الرسالة لقارئ الشاشة ثم تجربة المهمة على شبكة بطيئة.",
    labels: ["محاكاة وليست اختبار مستخدمين"],
    relatedOpinions: 2,
    decision: "جديدة",
  },
];

const fullDimensions = [
  { name: "التنقل وبنية المعلومات", score: 84, previous: 76 },
  { name: "قابلية الاستخدام", score: 76, previous: 61 },
  { name: "إمكانية الوصول", score: 62, previous: 58 },
  { name: "التسلسل البصري", score: 88, previous: 74 },
  { name: "وضوح المحتوى", score: 79, previous: 69 },
  { name: "التفاعل وحالة النظام", score: 75, previous: 60 },
  { name: "الاستجابة للجوال", score: 86, previous: 73 },
  { name: "إكمال المهمة", score: 72, previous: 55 },
];

function SeverityBadge({ severity }: { severity: FindingSeverity }) {
  const key = severity === "حرجة" ? "critical" : severity === "عالية" ? "high" : severity === "متوسطة" ? "medium" : "low";
  return <span className={`severity ${key}`}>{severity}</span>;
}

function EvidenceLabels({ labels }: { labels: string[] }) {
  return <div className="evidence-labels">{labels.map((label) => <span key={label} className={label.includes("مستخدم") ? "real-user" : label.includes("بشرية") ? "human" : label.includes("محاكاة") ? "simulation" : "automatic"}>{label}</span>)}</div>;
}

function EvidenceScreenshot({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`evidence-shot ${compact ? "compact" : ""}`} aria-label="لقطة توضيحية لمنطقة المشكلة">
      <div className="shot-browser"><i /><i /><i /><span>demo.nama-store.sa/checkout</span></div>
      <div className="shot-content"><small>راجع بيانات الشراء</small><h4>ملخص الطلب</h4><label>طريقة التسليم</label><div className="fake-input">التوصيل إلى المنزل</div><span className="fake-button">إتمام الطلب</span><span className="annotation">3.1:1</span></div>
    </div>
  );
}

function FindingDrawer({
  finding,
  onClose,
  onDecision,
  navigate,
}: {
  finding: Finding;
  onClose: () => void;
  onDecision: (decision: FindingDecision) => void;
  navigate: (screen: Screen) => void;
}) {
  const [confidenceOpen, setConfidenceOpen] = useState(false);
  return (
    <div className="drawer-layer" role="dialog" aria-modal="true" aria-label={`تفاصيل ${finding.title}`}>
      <button className="drawer-backdrop" onClick={onClose} aria-label="إغلاق التفاصيل" />
      <aside className="finding-drawer">
        <header><div><span>{finding.id}</span><h3>{finding.title}</h3></div><button className="icon-button" onClick={onClose} aria-label="إغلاق"><X size={19} /></button></header>
        <div className="drawer-scroll">
          <div className="drawer-meta"><SeverityBadge severity={finding.severity} /><span>ثقة {finding.confidence}٪</span><span>{finding.page}</span></div>
          <EvidenceLabels labels={finding.labels} />
          <EvidenceScreenshot />
          <section className="drawer-section"><h4>الدليل المرصود</h4><p>{finding.evidence}</p></section>
          <section className="drawer-section"><h4>لماذا تهم المشكلة؟</h4><p>{finding.explanation}</p></section>
          <section className="drawer-section standard-box"><div><span>المعيار المرجعي</span><button onClick={() => navigate("methodology")}>{finding.standard} <SquareArrowOutUpLeft size={14} /></button></div><small>طريقة الاكتشاف: {finding.method}</small></section>
          <section className="drawer-section"><h4>الحل المقترح</h4><p>{finding.recommendation}</p><span className="recommendation-caveat">توصية تحتاج اختبارًا قبل الاعتماد</span></section>
          <section className="drawer-section"><h4>كيف نتحقق من الحل؟</h4><p>{finding.validation}</p></section>
          {finding.relatedOpinions > 0 && <button className="related-opinions" onClick={() => navigate("unified")}><MessageSquareText size={18} /><span><strong>{finding.relatedOpinions} آراء عامة مرتبطة</strong><small>اقرأ النصوص الأصلية ومصادرها في التحليل الموحّد</small></span><ChevronLeft size={18} /></button>}
          <button className="confidence-toggle" onClick={() => setConfidenceOpen(!confidenceOpen)}><span><Gauge size={17} /> كيف حُسبت الثقة؟</span>{confidenceOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>
          {confidenceOpen && <div className="confidence-detail"><p>تعتمد النسبة على وضوح القياس، وتكرار الاكتشاف عبر الحالات، وجود معيار قابل للتحقق، وتعارض الإشارات. لا تعبّر عن احتمال نجاح الحل.</p><div><span>وضوح الدليل <b>98٪</b></span><span>ثبات الاكتشاف <b>92٪</b></span><span>الحاجة للسياق البشري <b>متوسطة</b></span></div></div>}
        </div>
        <footer className="drawer-actions">
          <button className={finding.decision === "مؤكدة" ? "selected positive" : ""} onClick={() => onDecision("مؤكدة")}><CircleCheck size={17} /> تأكيد</button>
          <button className={finding.decision === "مرفوضة" ? "selected negative" : ""} onClick={() => onDecision("مرفوضة")}><X size={17} /> رفض</button>
          <button className={finding.decision === "مراجعة بشرية" ? "selected warning" : ""} onClick={() => onDecision("مراجعة بشرية")}><UserRoundCheck size={17} /> مراجعة بشرية</button>
          <button className={finding.decision === "ضمن خطة التحسين" ? "selected" : ""} onClick={() => onDecision("ضمن خطة التحسين")}><FolderKanban size={17} /> أضف لخطة التحسين</button>
          <button onClick={() => onDecision("محلولة")}><CheckCircle2 size={17} /> تحديد كمحلولة</button>
        </footer>
      </aside>
    </div>
  );
}

function AuditReport({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [tab, setTab] = useState<"summary" | "findings" | "matrix" | "method">("summary");
  const [findings, setFindings] = useState(initialFindings);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [severity, setSeverity] = useState("الكل");
  const [sort, setSort] = useState("الأولوية");
  const [shareOpen, setShareOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const selected = findings.find((item) => item.id === selectedId) ?? null;
  const filtered = useMemo(() => {
    const list = findings.filter((item) => severity === "الكل" || item.severity === severity);
    return [...list].sort((a, b) => sort === "الثقة" ? b.confidence - a.confidence : sort === "الجهد" ? a.effort - b.effort : sort === "الأثر" ? b.impact - a.impact : ({ حرجة: 4, عالية: 3, متوسطة: 2, منخفضة: 1 }[b.severity] - { حرجة: 4, عالية: 3, متوسطة: 2, منخفضة: 1 }[a.severity]));
  }, [findings, severity, sort]);
  const decide = (decision: FindingDecision) => {
    if (!selectedId) return;
    setFindings((current) => current.map((item) => item.id === selectedId ? { ...item, decision } : item));
    notify(`تم تحديث الملاحظة إلى: ${decision}`, decision === "مرفوضة" ? "warning" : "success");
  };
  return (
    <div className="page report-page">
      <PageHeader eyebrow="متجر نَماء · الإصدار 2.4" title="التقرير التشخيصي الآلي" description="تقييم توضيحي لرحلة البحث عن منتج وإضافته إلى السلة وإكمال الطلب — 12 أغسطس 2026" actions={<><Button variant="secondary" onClick={() => setShareOpen(true)} icon={<Share2 size={17} />}>مشاركة</Button><Button variant="secondary" onClick={() => setExportOpen(true)} icon={<Download size={17} />}>تصدير</Button><Button onClick={() => navigate("processing")} icon={<RefreshCw size={17} />}>إعادة التقييم</Button></>} />
      <div className="report-disclaimer"><DemoBadge /><span><ShieldCheck size={16} /> المؤشر تقديري ولا يثبت تحسن التحويل أو رضا المستخدم من دون قياس واختبار.</span></div>
      <nav className="tabs" aria-label="أقسام التقرير">
        {[{ id: "summary", label: "الملخص التنفيذي" }, { id: "findings", label: "الملاحظات", count: 5 }, { id: "matrix", label: "مصفوفة الأولوية" }, { id: "method", label: "شفافية المنهجية" }].map((item) => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id as typeof tab)}>{item.label}{item.count && <i>{item.count}</i>}</button>)}
      </nav>
      {tab === "summary" && <>
        <section className="executive-grid">
          <article className="panel executive-score"><ScoreRing score={81} /><div><span>حالة المنتج</span><strong>جيد مع فرص عالية الأولوية</strong><p>تحسن المؤشر 13 نقطة عن الإصدار السابق بعد معالجة 7 مشكلات.</p></div></article>
          <article className="panel executive-stats"><div><span>المشكلات الحرجة</span><strong className="red-text">1</strong><small>تحتاج معالجة قبل الإطلاق</small></div><div><span>فرص عالية الأولوية</span><strong>3</strong><small>منها فرصتان سريعتان</small></div><div><span>الثقة العامة</span><strong>89٪</strong><small>مرتفعة — مع 4 عناصر بشرية</small></div><div><span>النطاق</span><strong>12</strong><small>صفحة ورحلة حرجة واحدة</small></div></article>
        </section>
        <section className="panel dimension-panel"><div className="panel-head"><div><span className="panel-kicker">ثمانية أبعاد</span><h3>نتائج التقييم حسب البعد</h3></div><button className="text-button" onClick={() => navigate("methodology")}>طريقة الحساب <ChevronLeft size={16} /></button></div><div className="dimension-bars">{fullDimensions.map((item) => <div key={item.name}><div><span>{item.name}</span><b>{item.score}</b></div><i><em style={{ width: `${item.score}%` }} /></i><small>السابق {item.previous}</small></div>)}</div></section>
        <section className="panel top-findings"><div className="panel-head"><div><span className="panel-kicker">ابدأ من هنا</span><h3>أعلى الملاحظات أولوية</h3></div><button className="text-button" onClick={() => setTab("findings")}>عرض كل الملاحظات <ChevronLeft size={16} /></button></div><div className="finding-list compact-list">{findings.slice(0, 3).map((finding) => <button key={finding.id} className="finding-row" onClick={() => setSelectedId(finding.id)}><SeverityBadge severity={finding.severity} /><span><strong>{finding.title}</strong><small>{finding.page} · {finding.standard}</small></span><div><b>{finding.confidence}٪</b><small>نسبة الثقة</small></div><ChevronLeft size={18} /></button>)}</div></section>
      </>}
      {tab === "findings" && <>
        <div className="finding-toolbar"><div><select value={severity} onChange={(e) => setSeverity(e.target.value)} aria-label="تصفية حسب الشدة"><option>الكل</option><option>حرجة</option><option>عالية</option><option>متوسطة</option><option>منخفضة</option></select><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="ترتيب الملاحظات"><option>الأولوية</option><option>الأثر</option><option>الجهد</option><option>الثقة</option></select></div><span>{filtered.length} ملاحظات ظاهرة</span></div>
        <section className="finding-card-list">{filtered.map((finding) => <article key={finding.id} className="finding-card"><div className="finding-card-main"><div className="finding-title-row"><SeverityBadge severity={finding.severity} /><span className="finding-id">{finding.id}</span>{finding.decision !== "جديدة" && <span className="decision-badge">{finding.decision}</span>}</div><h3>{finding.title}</h3><p>{finding.explanation}</p><EvidenceLabels labels={finding.labels} /><div className="finding-facts"><span><Target size={14} /> الأثر {finding.impact}/5</span><span><Activity size={14} /> الجهد {finding.effort}/5</span><span><Gauge size={14} /> الثقة {finding.confidence}٪</span><span><Link2 size={14} /> {finding.relatedOpinions} آراء مرتبطة</span></div></div><aside><EvidenceScreenshot compact /><button onClick={() => setSelectedId(finding.id)}>فتح الدليل والتفاصيل <ArrowLeft size={16} /></button></aside></article>)}</section>
      </>}
      {tab === "matrix" && <section className="matrix-layout">
        <article className="panel priority-matrix"><div className="matrix-axis y">أثر أعلى</div><div className="matrix-axis x">جهد إصلاح أعلى</div><div className="quadrant quick"><span>مكاسب سريعة</span><button onClick={() => setSelectedId("F-018")}>F-018 التباين</button><button onClick={() => setSelectedId("F-009")}>F-009 رسالة الخطأ</button></div><div className="quadrant sprint"><span>السبرنت الحالي</span><button onClick={() => setSelectedId("F-012")}>F-012 رحلة الدفع</button></div><div className="quadrant next"><span>السبرنت القادم</span><button onClick={() => setSelectedId("F-004")}>F-004 اتجاه الرجوع</button></div><div className="quadrant later"><span>تحسينات طويلة المدى</span><button onClick={() => setSelectedId("F-021")}>F-021 تأكيد الطلب</button></div></article>
        <aside className="panel matrix-notes"><h3>كيف نستخدم المصفوفة؟</h3><p>الموضع اقتراح أولي يجمع الأثر والجهد والشدة. يجب أن يراجعه مالك المنتج مع القيود التقنية وأهداف الإصدار.</p><div><span><i className="dot critical" /> حرجة</span><span><i className="dot high" /> عالية</span><span><i className="dot medium" /> متوسطة</span></div><Button onClick={() => { notify("أضيفت 3 ملاحظات إلى خطة التحسين", "success"); }} icon={<FolderKanban size={17} />}>أضف المقترحات لخطة التحسين</Button></aside>
      </section>}
      {tab === "method" && <section className="panel method-summary"><div className="method-summary-intro"><span><BookOpen /></span><div><h3>كل نتيجة قابلة للتتبع</h3><p>لا نكتفي بعبارة «اكتشف الذكاء الاصطناعي مشكلة». كل ملاحظة تربط الدليل بطريقة الاكتشاف والمعيار وحدود الثقة والتحقق التالي.</p></div></div><div className="method-trace"><div><Bot /><strong>طريقة الاكتشاف</strong><span>فحص تقني، قاعدة إرشادية، محاكاة، أو ربط نصوص عامة</span></div><div><FileText /><strong>الدليل والمعيار</strong><span>قياس أو لقطة وحالة واجهة مع مرجع قابل للفتح</span></div><div><Gauge /><strong>نسبة الثقة</strong><span>قوة الدليل وثباته والحاجة إلى السياق البشري</span></div><div><UserRoundCheck /><strong>طريقة التحقق</strong><span>إعادة فحص، مراجعة خبير، أو دراسة استخدام بإشراف باحث</span></div></div><div className="method-limitations"><CircleAlert size={19} /><div><strong>حدود هذا التقييم</strong><ul><li>الفحص الآلي لا يثبت الالتزام الكامل بإمكانية الوصول.</li><li>المحاكاة السلوكية ليست بديلًا عن دراسة الاستخدام البشرية.</li><li>الآراء العامة لا تمثل بالضرورة جميع شرائح الجمهور.</li></ul></div></div><Button variant="secondary" onClick={() => navigate("methodology")} icon={<BookOpen size={17} />}>فتح دليل المنهجية الكامل</Button></section>}
      {selected && <FindingDrawer finding={selected} onClose={() => setSelectedId(null)} onDecision={decide} navigate={navigate} />}
      {shareOpen && <Modal title="مشاركة التقرير" description="الرابط خاص بأعضاء مساحة العمل في هذا النموذج." onClose={() => setShareOpen(false)}><div className="modal-body"><FormField label="رابط العرض"><div className="copy-field"><input dir="ltr" readOnly value="https://xp-insight.demo/reports/nama-v2-4" /><button onClick={() => notify("تم نسخ رابط التقرير التوضيحي", "success")}><Copy size={16} /> نسخ</button></div></FormField><div className="permission-choice"><label><input type="radio" name="permission" defaultChecked /> يمكن لأعضاء المساحة العرض</label><label><input type="radio" name="permission" /> أشخاص محددون فقط</label></div><footer><Button variant="secondary" onClick={() => setShareOpen(false)}>إلغاء</Button><Button onClick={() => { setShareOpen(false); notify("حُفظت إعدادات المشاركة", "success"); }} icon={<Share2 size={16} />}>حفظ المشاركة</Button></footer></div></Modal>}
      {exportOpen && <Modal title="تصدير التقرير" description="اختر الصيغة والمحتوى المطلوب. التصدير توضيحي داخل النموذج." onClose={() => setExportOpen(false)}><div className="modal-body export-options"><button onClick={() => { setExportOpen(false); notify("جُهّز ملف PDF التوضيحي للتنزيل", "success"); }}><FileText /><span><strong>ملف PDF</strong><small>ملخص تنفيذي وملاحظات مع الأدلة</small></span><Download /></button><button onClick={() => { setExportOpen(false); notify("جُهّز ملف Excel التوضيحي للتنزيل", "success"); }}><BarChart3 /><span><strong>ملف Excel</strong><small>قائمة قابلة للفرز والتسليم للفريق</small></span><Download /></button><button onClick={() => { setExportOpen(false); notify("جُهّز ملف مهام بصيغة CSV", "success"); }}><FolderKanban /><span><strong>مهام خطة التحسين</strong><small>المعرف والأولوية والجهد والحالة</small></span><Download /></button></div></Modal>}
    </div>
  );
}

const voiceSourceOptions = [
  { id: "review-sites", label: "منصات التقييم العامة", description: "التقييمات والنصوص المتاحة علنًا" },
  { id: "social", label: "الشبكات الاجتماعية", description: "منشورات عامة متاحة للفهرسة" },
  { id: "forums", label: "المجتمعات والمنتديات", description: "نقاشات عامة مرتبطة بالمنتج" },
  { id: "commerce", label: "منصات التجارة العامة", description: "مراجعات منتجات أو متاجر مسموح باستخدامها" },
  { id: "video", label: "منصات الفيديو", description: "عناوين وتعليقات عامة متاحة" },
  { id: "custom", label: "مصادر يحددها الفريق", description: "روابط عامة معتمدة للمراقبة" },
];

function VoiceSetup({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("متجر نَماء");
  const [website, setWebsite] = useState("https://demo.nama-store.sa");
  const [industry, setIndustry] = useState("التجارة الإلكترونية");
  const [market, setMarket] = useState("السوق السعودي");
  const [country, setCountry] = useState("المملكة العربية السعودية");
  const [language, setLanguage] = useState("العربية");
  const [dateRange, setDateRange] = useState("آخر 90 يومًا");
  const [keywords, setKeywords] = useState("متجر نَماء، إتمام الطلب، السلة، الدفع، التوصيل");
  const [excluded, setExcluded] = useState("نماء الخيرية، نماء العقارية");
  const [competitors, setCompetitors] = useState("متجر ألف، متجر باء — أمثلة توضيحية");
  const [areas, setAreas] = useState("البحث، صفحة المنتج، السلة، الدفع، التوصيل، الدعم");
  const [sources, setSources] = useState<Record<string, boolean>>({ "review-sites": true, social: true, forums: true, commerce: false, video: false, custom: false });
  const [error, setError] = useState("");
  const next = () => {
    if (!name.trim() || !website.trim()) { setError("أدخل اسم المنتج والموقع الرسمي للتمييز بين الأسماء المتشابهة."); return; }
    if (!/^https?:\/\//.test(website)) { setError("أدخل رابطًا صحيحًا يبدأ بـ https://"); return; }
    setError(""); setStep(2);
  };
  return (
    <div className="page form-page">
      <PageHeader eyebrow="تحليل جديد" title="حلّل صوت المستخدم ضمن سياق المنتج" description="حدّد الهوية والسوق والمصادر والكلمات بدقة لتقليل النتائج غير المرتبطة." />
      <div className="voice-stepper"><button className={step === 1 ? "active" : "done"} onClick={() => setStep(1)}><i>{step > 1 ? <Check size={14} /> : 1}</i><span><strong>تعريف المنتج والسوق</strong><small>من نبحث عنه؟</small></span></button><button className={step === 2 ? "active" : ""} onClick={() => step > 1 && setStep(2)}><i>2</i><span><strong>المصادر ونطاق البحث</strong><small>ما الذي نتابعه؟</small></span></button></div>
      <section className="form-shell panel">
        {step === 1 ? <>
          <div className="form-section-head"><span><Search /></span><div><h3>تعريف واضح للمنتج</h3><p>هذه البيانات تمنع الخلط بين المنتج وأسماء أشخاص أو شركات متشابهة.</p></div></div>
          {error && <div className="inline-error"><CircleAlert size={16} />{error}</div>}
          <div className="form-grid">
            <FormField label="اسم المنتج أو الشركة"><input value={name} onChange={(e) => { setName(e.target.value); setError(""); }} /></FormField>
            <FormField label="الموقع الرسمي" hint="يستخدم لتأكيد الاسم والنطاق"><input dir="ltr" value={website} onChange={(e) => { setWebsite(e.target.value); setError(""); }} /></FormField>
            <FormField label="القطاع"><select value={industry} onChange={(e) => setIndustry(e.target.value)}><option>الصحة الرقمية</option><option>الخدمات الحكومية</option><option>التجارة الإلكترونية</option><option>الخدمات المالية</option></select></FormField>
            <FormField label="السوق المستهدف"><select value={market} onChange={(e) => setMarket(e.target.value)}><option>السوق السعودي</option><option>دول الخليج</option><option>الشرق الأوسط وشمال أفريقيا</option></select></FormField>
            <FormField label="الدولة"><select value={country} onChange={(e) => setCountry(e.target.value)}><option>المملكة العربية السعودية</option><option>الإمارات العربية المتحدة</option><option>الكويت</option></select></FormField>
            <FormField label="لغة التحليل"><select value={language} onChange={(e) => setLanguage(e.target.value)}><option>العربية</option><option>العربية والإنجليزية</option><option>الإنجليزية</option></select></FormField>
          </div>
          <div className="identity-preview"><ShieldCheck size={18} /><div><strong>الهوية التي سنبحث عنها</strong><p>«{name}» في قطاع {industry}، مرتبط بالنطاق <span dir="ltr">{website.replace(/^https?:\/\//, "")}</span> ويستهدف {market}.</p></div></div>
        </> : <>
          <div className="form-section-head"><span><Radar /></span><div><h3>المصادر ونطاق البحث</h3><p>اختر المصادر العامة واضبط الكلمات والفترة ومجالات المنتج.</p></div></div>
          <div className="source-grid">{voiceSourceOptions.map((source) => <ToggleCard key={source.id} title={source.label} description={source.description} checked={Boolean(sources[source.id])} onChange={() => setSources((current) => ({ ...current, [source.id]: !current[source.id] }))} icon={<Globe2 />} />)}</div>
          <div className="form-grid voice-rules">
            <FormField label="الفترة الزمنية"><select value={dateRange} onChange={(e) => setDateRange(e.target.value)}><option>آخر 30 يومًا</option><option>آخر 90 يومًا</option><option>آخر 6 أشهر</option><option>آخر سنة</option></select></FormField>
            <FormField label="الكلمات المطلوبة" hint="افصل بين الكلمات بفاصلة"><input value={keywords} onChange={(e) => setKeywords(e.target.value)} /></FormField>
            <FormField label="الكلمات المستبعدة" hint="تساعد على إزالة الاستخدامات غير المتعلقة بالمنتج"><input value={excluded} onChange={(e) => setExcluded(e.target.value)} /></FormField>
            <FormField label="المنافسون" hint="للمقارنة الموضوعية لا لخلط النتائج"><input value={competitors} onChange={(e) => setCompetitors(e.target.value)} /></FormField>
            <FormField label="مجالات المنتج المراد مراقبتها" wide><textarea rows={3} value={areas} onChange={(e) => setAreas(e.target.value)} /></FormField>
          </div>
          <div className="context-note"><Info size={18} /><p>نحلّل الآراء العامة المتاحة فقط. قد لا تمثل النتائج جميع المستخدمين، وستظهر نسبة الصلة والثقة لكل رأي.</p></div>
        </>}
        <footer className="form-actions"><Button variant="secondary" onClick={step === 1 ? () => navigate("dashboard") : () => setStep(1)} icon={<ArrowRight size={17} />}>{step === 1 ? "إلغاء" : "السابق"}</Button>{step === 1 ? <Button onClick={next} icon={<ArrowLeft size={17} />}>التالي</Button> : <Button onClick={() => { notify("اكتمل تحليل البيانات التوضيحية لصوت المستخدم", "success"); navigate("voice-report"); }} icon={<Radar size={17} />}>ابدأ تحليل الآراء</Button>}</footer>
      </section>
    </div>
  );
}

type Opinion = {
  id: string;
  text: string;
  source: string;
  date: string;
  relevance: number;
  sentiment: "إيجابي" | "محايد" | "سلبي";
  confidence: number;
  category: string;
};

const demoOpinions: Opinion[] = [
  { id: "O-1048", text: "إتمام الطلب أخذ وقتًا طويلًا، وكل مرة أرجع أعيد بعض بيانات العنوان.", source: "منصة تقييم عامة — مصدر توضيحي", date: "10 أغسطس 2026", relevance: 96, sentiment: "سلبي", confidence: 92, category: "إتمام الطلب" },
  { id: "O-1032", text: "اختيار التوصيل صار أوضح بعد التحديث، لكن رسالة تأكيد الطلب تختفي بسرعة.", source: "شبكة اجتماعية — مصدر توضيحي", date: "8 أغسطس 2026", relevance: 93, sentiment: "محايد", confidence: 86, category: "الدفع" },
  { id: "O-1019", text: "البحث وإضافة المنتج للسلة كانا واضحين من الجوال.", source: "مجتمع رقمي — مصدر توضيحي", date: "5 أغسطس 2026", relevance: 89, sentiment: "إيجابي", confidence: 95, category: "تجربة الجوال" },
  { id: "O-0988", text: "رمز الخصم يرفضه ولا يوضح السبب أو كيف أصححه.", source: "منصة تقييم عامة — مصدر توضيحي", date: "29 يوليو 2026", relevance: 98, sentiment: "سلبي", confidence: 97, category: "السلة" },
  { id: "O-0964", text: "أتمنى حفظ عناوين التوصيل السابقة وإعادة الطلب بسرعة.", source: "شبكة اجتماعية — مصدر توضيحي", date: "25 يوليو 2026", relevance: 87, sentiment: "محايد", confidence: 81, category: "الميزات" },
];

function SentimentBadge({ sentiment }: { sentiment: Opinion["sentiment"] }) {
  return <span className={`sentiment ${sentiment === "إيجابي" ? "positive" : sentiment === "سلبي" ? "negative" : "neutral"}`}>{sentiment}</span>;
}

function VoiceReport({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [tab, setTab] = useState<"overview" | "opinions" | "topics">("overview");
  const [opinions, setOpinions] = useState(demoOpinions);
  const [sentimentFilter, setSentimentFilter] = useState("الكل");
  const [categoryFilter, setCategoryFilter] = useState("الكل");
  const [sourceInfo, setSourceInfo] = useState<Opinion | null>(null);
  const filtered = opinions.filter((item) => (sentimentFilter === "الكل" || item.sentiment === sentimentFilter) && (categoryFilter === "الكل" || item.category === categoryFilter));
  const correctSentiment = (id: string, value: Opinion["sentiment"]) => { setOpinions((current) => current.map((item) => item.id === id ? { ...item, sentiment: value, confidence: 100 } : item)); notify("حُفظ التصحيح اليدوي وسيُستخدم لتحسين التصنيف داخل المشروع", "success"); };
  return (
    <div className="page voice-report-page">
      <PageHeader eyebrow="متجر نَماء · آخر 90 يومًا" title="تقرير آراء المستخدمين" description="تنظيم توضيحي لآراء عامة حسب ارتباطها بتجربة المنتج. النصوص والمصادر في هذا النموذج ليست بيانات مجمعة فعليًا." actions={<><Button variant="secondary" onClick={() => navigate("voice-setup")} icon={<SlidersHorizontal size={17} />}>تعديل النطاق</Button><Button onClick={() => navigate("unified")} icon={<Link2 size={17} />}>افتح التقرير الموحّد</Button></>} />
      <div className="report-disclaimer"><DemoBadge /><span><CircleAlert size={16} /> الآراء والنصوص والمصادر أدناه بيانات مصممة لشرح النموذج وليست بيانات مجمعة فعليًا.</span></div>
      <nav className="tabs"><button className={tab === "overview" ? "active" : ""} onClick={() => setTab("overview")}>نظرة عامة</button><button className={tab === "opinions" ? "active" : ""} onClick={() => setTab("opinions")}>الآراء الأصلية <i>5</i></button><button className={tab === "topics" ? "active" : ""} onClick={() => setTab("topics")}>الموضوعات والفئات</button></nav>
      {tab === "overview" && <>
        <section className="metrics-grid voice-metrics"><MetricCard label="إجمالي الإشارات العامة" value="1,284" helper="قبل تصفية الصلة والتكرار" icon={<Radar />} tone="blue" /><MetricCard label="الإشارات ذات الصلة" value="1,002" helper="78٪ من الإجمالي" icon={<Target />} tone="green" /><MetricCard label="المصادر المحللة" value="6" helper="مصادر عامة توضيحية" icon={<Globe2 />} tone="amber" /><MetricCard label="متوسط ثقة التصنيف" value="88٪" helper="مع 64 حالة تحتاج مراجعة" icon={<Gauge />} tone="blue" /></section>
        <section className="voice-overview-grid">
          <article className="panel sentiment-panel"><div className="panel-head"><div><span className="panel-kicker">للآراء ذات الصلة</span><h3>توزيع الانطباع</h3></div><span className="method-chip">ثقة التصنيف 88٪</span></div><div className="sentiment-chart"><div className="donut" /><div className="sentiment-legend"><span><i className="positive" />إيجابي <b>42٪</b></span><span><i className="neutral" />محايد <b>24٪</b></span><span><i className="negative" />سلبي <b>34٪</b></span></div></div><p className="chart-note">الانطباع تصنيف لغوي تقديري ويمكن تصحيحه يدويًا لكل رأي.</p></article>
          <article className="panel trend-panel"><div className="panel-head"><div><span className="panel-kicker">8 أسابيع</span><h3>اتجاه الإشارات المرتبطة بإتمام الطلب</h3></div><span className="trend-down">−18٪ سلبي</span></div><div className="trend-bars">{[38, 54, 46, 67, 59, 44, 35, 31].map((height, index) => <div key={index}><i style={{ height: `${height}%` }} /><span>{index + 1}</span></div>)}</div><p className="chart-note">انخفاض الإشارات السلبية لا يثبت وحده تحسن الرضا؛ قد يتأثر بحجم النشر والمصادر.</p></article>
        </section>
        <section className="panel topic-preview"><div className="panel-head"><div><span className="panel-kicker">تجربة المنتج</span><h3>أكثر الموضوعات نقاشًا</h3></div><button className="text-button" onClick={() => setTab("topics")}>كل الموضوعات <ChevronLeft size={16} /></button></div><div className="topic-list"><div><span>إتمام الطلب</span><i><em style={{ width: "88%" }} /></i><b>264</b><small>62٪ سلبي</small></div><div><span>الأداء</span><i><em style={{ width: "71%" }} /></i><b>213</b><small>48٪ سلبي</small></div><div><span>الدفع</span><i><em style={{ width: "64%" }} /></i><b>192</b><small>51٪ إيجابي</small></div><div><span>تجربة الجوال</span><i><em style={{ width: "48%" }} /></i><b>144</b><small>58٪ إيجابي</small></div><div><span>الدعم</span><i><em style={{ width: "37%" }} /></i><b>111</b><small>43٪ محايد</small></div></div></section>
        <section className="panel source-distribution"><div className="panel-head"><div><span className="panel-kicker">6 مصادر</span><h3>توزيع المصادر العامة</h3></div></div><div className="source-bars"><div><span>منصات التقييم</span><i><em style={{ width: "38%" }} /></i><b>38٪</b></div><div><span>الشبكات الاجتماعية</span><i><em style={{ width: "32%" }} /></i><b>32٪</b></div><div><span>المجتمعات الرقمية</span><i><em style={{ width: "18%" }} /></i><b>18٪</b></div><div><span>مصادر أخرى</span><i><em style={{ width: "12%" }} /></i><b>12٪</b></div></div></section>
      </>}
      {tab === "opinions" && <>
        <div className="finding-toolbar opinion-toolbar"><div><select value={sentimentFilter} onChange={(e) => setSentimentFilter(e.target.value)}><option>الكل</option><option>إيجابي</option><option>محايد</option><option>سلبي</option></select><select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option>الكل</option><option>إتمام الطلب</option><option>السلة</option><option>الدفع</option><option>تجربة الجوال</option><option>الميزات</option></select></div><span>{filtered.length} آراء توضيحية</span></div>
        <section className="opinion-list">{filtered.map((opinion) => <article key={opinion.id} className="opinion-card"><header><div><span>{opinion.source}</span><small>{opinion.date} · {opinion.id}</small></div><button onClick={() => setSourceInfo(opinion)}>رابط المصدر <ExternalLink size={14} /></button></header><blockquote>«{opinion.text}»</blockquote><div className="opinion-tags"><span>صلة {opinion.relevance}٪</span><SentimentBadge sentiment={opinion.sentiment} /><span>ثقة الانطباع {opinion.confidence}٪</span><span>{opinion.category}</span></div><footer><label>تصحيح التصنيف يدويًا <select value={opinion.sentiment} onChange={(e) => correctSentiment(opinion.id, e.target.value as Opinion["sentiment"])}><option>إيجابي</option><option>محايد</option><option>سلبي</option></select></label><Button variant="ghost" onClick={() => navigate("unified")} icon={<Link2 size={15} />}>عرض الروابط مع الواجهة</Button></footer></article>)}</section>
        {filtered.length === 0 && <div className="empty-state"><Search size={28} /><h3>لا توجد آراء مطابقة</h3><p>غيّر عوامل التصفية أو وسّع الفترة الزمنية.</p><Button variant="secondary" onClick={() => { setSentimentFilter("الكل"); setCategoryFilter("الكل"); }}>مسح عوامل التصفية</Button></div>}
      </>}
      {tab === "topics" && <section className="topic-category-grid">{[
        ["إتمام الطلب", "264", "أبرز مشكلة: طول الخطوات وإعادة إدخال العنوان", "62٪ سلبي"], ["التنقل", "89", "وضوح جيد مع ملاحظات على الرجوع", "44٪ إيجابي"], ["الأداء", "213", "بطء متكرر عند تحديث السلة", "48٪ سلبي"], ["المحتوى", "76", "شروط التوصيل تحتاج تبسيطًا", "39٪ محايد"], ["إمكانية الوصول", "31", "حجم النص والتباين في الجوال", "55٪ سلبي"], ["الدفع", "192", "وضوح الوسائل ورسائل التأكيد", "51٪ إيجابي"], ["دعم العملاء", "111", "سرعة الرد وقنوات التواصل", "43٪ محايد"], ["الميزات", "96", "طلب حفظ العنوان وإعادة الطلب", "47٪ إيجابي"], ["الثقة", "73", "وضوح المتجر وخصوصية البيانات", "61٪ إيجابي"], ["تجربة الجوال", "144", "سهولة التسوق على الشاشات الصغيرة", "58٪ إيجابي"],
      ].map((topic) => <article key={topic[0]}><span>{topic[1]} إشارة</span><h3>{topic[0]}</h3><p>{topic[2]}</p><small>{topic[3]}</small><button onClick={() => { setCategoryFilter(topic[0] === "دعم العملاء" ? "الدعم" : topic[0]); setTab("opinions"); }}>عرض الآراء <ChevronLeft size={15} /></button></article>)}</section>}
      {sourceInfo && <Modal title="المصدر في النموذج التوضيحي" description="لا يوجد رابط خارجي حقيقي لهذا النص لأنه لم يُجمع من مستخدم فعلي." onClose={() => setSourceInfo(null)}><div className="modal-body source-modal"><div className="warning-banner"><Info size={19} /><div><strong>لماذا لا نفتح رابطًا خارجيًا؟</strong><p>المحتوى مصمم لشرح تجربة المنتج. في النسخة الفعلية سيظهر الرابط المباشر وتاريخ النشر والمصدر الأصلي وفق شروط المصدر.</p></div></div><dl><div><dt>معرف الرأي</dt><dd>{sourceInfo.id}</dd></div><div><dt>المصدر المعروض</dt><dd>{sourceInfo.source}</dd></div><div><dt>تاريخ النشر</dt><dd>{sourceInfo.date}</dd></div></dl><footer><Button onClick={() => setSourceInfo(null)}>فهمت</Button></footer></div></Modal>}
    </div>
  );
}

type InsightRelation = {
  id: string;
  finding: string;
  findingId: string;
  journey: string;
  opinions: number;
  confidence: number;
  action: string;
  validation: string;
  status: "بانتظار المراجعة" | "مؤكدة" | "غير مرتبطة" | "ضمن خطة التحسين";
  quotes: Array<{ text: string; source: string }>;
};

const initialRelations: InsightRelation[] = [
  { id: "R-03", finding: "خطوات العنوان والتسليم طويلة ولا توضّح مقدار التقدم", findingId: "F-012", journey: "إتمام الطلب", opinions: 12, confidence: 87, action: "دمج خطوتي العنوان والتسليم، وإظهار التقدم، وتأجيل الحقول غير اللازمة لإتمام الطلب.", validation: "إجراء دراسة استخدام بإشراف باحث وقياس الإكمال والوقت والأخطاء، ثم مقارنة النسختين.", status: "بانتظار المراجعة", quotes: [{ text: "إتمام الطلب أخذ وقتًا طويلًا، وكل مرة أرجع أعيد بيانات العنوان.", source: "منصة تقييم عامة — توضيحي" }, { text: "لم أعرف كم خطوة بقيت قبل الدفع.", source: "شبكة اجتماعية — توضيحي" }, { text: "طلب معلومات كثيرة قبل إظهار خيارات التوصيل.", source: "مجتمع رقمي — توضيحي" }] },
  { id: "R-02", finding: "رسالة خطأ رمز الخصم لا توضّح طريقة التصحيح", findingId: "F-009", journey: "السلة", opinions: 4, confidence: 91, action: "ربط رسالة محددة بالحقل وتوضيح سبب رفض الرمز مع الاحتفاظ بالقيمة.", validation: "اختبار ثلاث حالات خطأ ومراقبة نجاح التصحيح من أول محاولة.", status: "مؤكدة", quotes: [{ text: "رمز الخصم يرفضه ولا يوضح السبب.", source: "منصة تقييم عامة — توضيحي" }, { text: "أعدت كتابة الرمز أكثر من مرة ولم أعرف المشكلة.", source: "شبكة اجتماعية — توضيحي" }] },
  { id: "R-01", finding: "تأكيد نجاح الطلب يختفي قبل قراءته", findingId: "F-021", journey: "تأكيد الطلب", opinions: 2, confidence: 74, action: "استبدال الرسالة المؤقتة بتأكيد ثابت يتضمن رقم الطلب وحالته والإجراءات التالية.", validation: "التحقق مع قارئ شاشة وتجربة المهمة في اتصال بطيء، ثم مقابلة قصيرة بعد المهمة.", status: "بانتظار المراجعة", quotes: [{ text: "بعد الدفع لم أكن متأكدًا هل تم الطلب أم لا.", source: "منصة تقييم عامة — توضيحي" }, { text: "التأكيد اختفى بسرعة ولم ألحق حفظ رقم الطلب.", source: "مجتمع رقمي — توضيحي" }] },
];

function UnifiedInsight({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [relations, setRelations] = useState(initialRelations);
  const [activeId, setActiveId] = useState("R-03");
  const [filter, setFilter] = useState("الكل");
  const [showAllQuotes, setShowAllQuotes] = useState(false);
  const relation = relations.find((item) => item.id === activeId) ?? relations[0];
  const visible = relations.filter((item) => filter === "الكل" || item.status === filter);
  const updateStatus = (status: InsightRelation["status"]) => { setRelations((current) => current.map((item) => item.id === activeId ? { ...item, status } : item)); notify(status === "غير مرتبطة" ? "صُنّفت العلاقة كغير مرتبطة" : status === "ضمن خطة التحسين" ? "أضيفت العلاقة إلى خطة التحسين" : "تم تأكيد العلاقة بين الدليلين", status === "غير مرتبطة" ? "warning" : "success"); };
  return (
    <div className="page unified-page">
      <PageHeader eyebrow="مشروع متجر نَماء" title="التقرير الموحّد" description="قارن ما رصده التقييم التشخيصي بما ورد في الآراء العامة، ثم قرر إن كانت العلاقة صالحة للعمل." actions={<Button onClick={() => navigate("new-audit")} icon={<Plus size={17} />}>تحليل شامل جديد</Button>} />
      <div className="report-disclaimer"><DemoBadge /><span><Link2 size={16} /> الربط اقتراح تحليلي يحتاج تأكيد الفريق؛ تشابه الموضوع لا يعني بالضرورة علاقة سببية.</span></div>
      <section className="unified-summary-cards"><article><span><Link2 /></span><div><strong>3</strong><small>علاقات مقترحة</small></div></article><article><span><CircleCheck /></span><div><strong>{relations.filter((item) => item.status === "مؤكدة").length}</strong><small>علاقات مؤكدة</small></div></article><article><span><MessageSquareText /></span><div><strong>18</strong><small>رأيًا داعمًا</small></div></article><article><span><Gauge /></span><div><strong>84٪</strong><small>متوسط الثقة</small></div></article></section>
      <div className="unified-workspace">
        <aside className="panel relation-list-panel">
          <header><div><h3>العلاقات المقترحة</h3><span>{visible.length} نتائج</span></div><select value={filter} onChange={(e) => setFilter(e.target.value)}><option>الكل</option><option>بانتظار المراجعة</option><option>مؤكدة</option><option>غير مرتبطة</option><option>ضمن خطة التحسين</option></select></header>
          <div className="relation-list">{visible.map((item) => <button key={item.id} className={activeId === item.id ? "active" : ""} onClick={() => { setActiveId(item.id); setShowAllQuotes(false); }}><span className="relation-status-dot" /><div><strong>{item.finding}</strong><small>{item.opinions} آراء مرتبطة · ثقة {item.confidence}٪</small><em>{item.status}</em></div><ChevronLeft size={17} /></button>)}</div>
          {visible.length === 0 && <div className="empty-mini"><Search size={22} /><strong>لا توجد علاقات بهذه الحالة</strong><button onClick={() => setFilter("الكل")}>عرض الكل</button></div>}
        </aside>
        <main className="relation-detail panel">
          <header className="relation-detail-head"><div><span>{relation.id}</span><h3>{relation.finding}</h3><p>الرحلة المتأثرة: {relation.journey}</p></div><span className={`relation-state ${relation.status === "مؤكدة" ? "confirmed" : relation.status === "غير مرتبطة" ? "unrelated" : ""}`}>{relation.status}</span></header>
          <section className="evidence-bridge">
            <article className="bridge-side interface-bridge"><header><Bot size={18} /><span>ملاحظة في الواجهة</span></header><EvidenceScreenshot compact /><h4>{relation.finding}</h4><div><span>معرف الملاحظة {relation.findingId}</span><span>طريقة: تحليل الواجهة</span></div><button onClick={() => navigate("report")}>فتح الملاحظة كاملة <ArrowLeft size={15} /></button></article>
            <div className="bridge-center"><span><Link2 /></span><strong>{relation.confidence}٪</strong><small>ثقة العلاقة</small></div>
            <article className="bridge-side voice-bridge"><header><Users size={18} /><span>دليل من آراء عامة</span></header><div className="quote-stack">{relation.quotes.slice(0, showAllQuotes ? relation.quotes.length : 2).map((quote, index) => <blockquote key={index}>«{quote.text}»<small>{quote.source}</small></blockquote>)}</div><div><span>{relation.opinions} إشارة مرتبطة</span><span>3 مصادر توضيحية</span></div>{relation.quotes.length > 2 && <button onClick={() => setShowAllQuotes(!showAllQuotes)}>{showAllQuotes ? "إخفاء" : "عرض رأي إضافي"} <ChevronDown size={15} /></button>}<button onClick={() => navigate("voice-report")}>فتح كل الآراء الأصلية <ArrowLeft size={15} /></button></article>
          </section>
          <section className="recommended-action"><span><Target size={20} /></span><div><small>إجراء المنتج المقترح</small><h4>{relation.action}</h4><p><strong>طريقة التحقق المقترحة:</strong> {relation.validation}</p></div></section>
          <section className="relation-decision"><div><strong>هل الدليلان مرتبطان فعلًا؟</strong><span>راجع النصوص والسياق قبل التأكيد.</span></div><div><Button variant="secondary" onClick={() => updateStatus("غير مرتبطة")} icon={<X size={16} />}>غير مرتبطة</Button><Button onClick={() => updateStatus("مؤكدة")} icon={<CircleCheck size={16} />}>تأكيد العلاقة</Button></div></section>
          <footer className="relation-actions"><Button variant="secondary" onClick={() => updateStatus("ضمن خطة التحسين")} icon={<FolderKanban size={17} />}>أضف إلى خطة التحسين</Button><Button variant="secondary" onClick={() => { notify("جُهّز نطاق إعادة تقييم مركّز لرحلة إتمام الطلب", "info"); navigate("processing"); }} icon={<RefreshCw size={17} />}>ابدأ إعادة تقييم مركّزة</Button></footer>
        </main>
      </div>
    </div>
  );
}

function CompareVersions({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [journey, setJourney] = useState("رحلة الشراء وإتمام الطلب");
  return (
    <div className="page compare-page">
      <PageHeader eyebrow="مشروع متجر نَماء" title="المتابعة ومقارنة الإصدارات" description="اعرف ما تغيّر في مؤشرات التقييم والملاحظات والآراء المرتبطة بعد إعادة الفحص." actions={<Button onClick={() => navigate("processing")} icon={<RefreshCw size={17} />}>إعادة تقييم جديدة</Button>} />
      <div className="version-selectors"><label>الإصدار السابق<select><option>2.3 — 20 يونيو 2026</option></select></label><span><GitCompareArrows size={19} /></span><label>الإصدار الحالي<select><option>2.4 — 12 أغسطس 2026</option></select></label></div>
      <section className="improvement-statement"><TrendingUp size={23} /><div><strong>تحسن تقييم تجربة المنتج من 68 إلى 81 بعد معالجة 7 مشكلات.</strong><p>هذا تحسن في مؤشر التقييم، ولا يثبت تلقائيًا تحسن التحويل أو رضا المستخدم.</p></div></section>
      <section className="compare-score-grid">
        <article className="panel score-compare"><div><span>الإصدار 2.3</span><strong>68</strong><small>يحتاج تحسينات جوهرية</small></div><ArrowLeft size={26} /><div className="current"><span>الإصدار 2.4</span><strong>81</strong><small>جيد مع فرص عالية الأولوية</small></div><em>+13 نقطة</em></article>
        <article className="panel issue-change"><div><span className="green-text"><CheckCircle2 />7</span><strong>مشكلات محلولة</strong></div><div><span className="amber-text"><CircleAlert />4</span><strong>مشكلات متبقية</strong></div><div><span className="red-text"><Plus />2</span><strong>مشكلتان جديدتان</strong></div></article>
      </section>
      <section className="compare-grid">
        <article className="panel dimension-compare"><div className="panel-head"><div><span className="panel-kicker">حسب البعد</span><h3>تغير مؤشرات التقييم</h3></div></div><div>{fullDimensions.map((item) => <div className="compare-bar-row" key={item.name}><span>{item.name}</span><div><i><em className="previous" style={{ width: `${item.previous}%` }} /></i><small>{item.previous}</small></div><div><i><em className="current" style={{ width: `${item.score}%` }} /></i><small>{item.score}</small></div><b className={item.score - item.previous > 0 ? "up" : ""}>+{item.score - item.previous}</b></div>)}</div><footer><span><i className="legend-previous" /> السابق</span><span><i className="legend-current" /> الحالي</span></footer></article>
        <aside className="panel change-log"><div className="panel-head"><div><span className="panel-kicker">الملاحظات</span><h3>سجل التغييرات</h3></div></div><div className="change-list"><article className="resolved"><CheckCircle2 /><div><strong>أضيف مؤشر تقدم لإتمام الطلب</strong><p>الملاحظة F-006 · تم التحقق آليًا وبشريًا</p></div><span>محلولة</span></article><article className="resolved"><CheckCircle2 /><div><strong>حُفظت بيانات العنوان عند الرجوع</strong><p>الملاحظة F-011 · إعادة فحص المهمة</p></div><span>محلولة</span></article><article className="remaining"><CircleAlert /><div><strong>التباين لا يزال أقل من المعيار</strong><p>الملاحظة F-018 · 3.1:1</p></div><span>متبقية</span></article><article className="new"><Plus /><div><strong>تأكيد الطلب يختفي سريعًا</strong><p>الملاحظة F-021 · ظهرت في الإصدار الحالي</p></div><span>جديدة</span></article></div></aside>
      </section>
      <section className="panel journey-compare"><div className="panel-head"><div><span className="panel-kicker">الرحلات الحرجة</span><h3>التغير في جودة إكمال المهمة</h3></div><select value={journey} onChange={(e) => setJourney(e.target.value)}><option>رحلة الشراء وإتمام الطلب</option><option>البحث وصفحة المنتج</option><option>السلة وتطبيق الخصم</option></select></div><div className="journey-steps"><article><span>عدد الخطوات</span><div><del>9</del><ArrowLeft /><strong>7</strong></div><small>أقصر بخطوتين</small></article><article><span>نقاط التعطل المرصودة</span><div><del>6</del><ArrowLeft /><strong>3</strong></div><small>وفق المحاكاة</small></article><article><span>وضوح حالة النظام</span><div><del>61</del><ArrowLeft /><strong>75</strong></div><small>مؤشر تقديري</small></article><article><span>آراء سلبية مرتبطة</span><div><del>42</del><ArrowLeft /><strong>31</strong></div><small>−26٪ في المصادر نفسها</small></article></div></section>
      <section className="comparison-caveat"><Info size={19} /><div><strong>كيف نثبت أن التحسين نجح؟</strong><p>استكمل المقارنة باختبار مستخدمين، وتحليل إكمال المهمة، وقياس التحويل والرضا ضمن فترة ثابتة.</p></div><Button variant="secondary" onClick={() => notify("أضيفت خطة تحقق للإصدار 2.4", "success")}>أضف خطة تحقق</Button></section>
    </div>
  );
}

const methodologySections = [
  { id: "dimensions", title: "أبعاد التقييم", icon: <BarChart3 />, content: <><p>نقيّم ثمانية أبعاد مرتبطة بالمهمة والسياق: التنقل وبنية المعلومات، قابلية الاستخدام، إمكانية الوصول، التسلسل البصري، وضوح المحتوى، التفاعل وحالة النظام، الاستجابة للجوال، وإكمال المهمة.</p><div className="method-dimension-list">{fullDimensions.map((item) => <span key={item.name}>{item.name}</span>)}</div></> },
  { id: "scores", title: "كيف تُحسب الدرجات؟", icon: <Gauge />, content: <><p>درجة كل بُعد متوسط موزون للملاحظات ضمن نطاق التقييم. يؤثر في الوزن مقدار الشدة، واتساع الأثر، وقوة الدليل، مع عقوبة أكبر للمشكلات التي تمنع المهمة الحرجة.</p><div className="formula-box"><span>درجة البُعد</span><b>= 100 − مجموع أثر الملاحظات الموزون</b><small>تُطبّق حدود دنيا وعليا حتى لا تهيمن ملاحظة واحدة غير مؤكدة على النتيجة.</small></div><p>النتيجة مؤشر مقارنة داخلي بين الإصدارات، وليست معيارًا عالميًا ثابتًا ولا وعدًا بتحسن التحويل.</p></> },
  { id: "frameworks", title: "المعايير والأطر المستخدمة", icon: <BookOpen />, content: <><p>نربط كل اكتشاف بالمرجع الأقرب ونوضح إن كان معيارًا تقنيًا قابلًا للقياس أو مبدأً إرشاديًا يحتاج حكمًا بشريًا.</p><ul><li><strong>WCAG 2.2:</strong> مؤشرات إمكانية الوصول القابلة للفحص، مع فصل المتطلبات التي تحتاج مراجعة بشرية.</li><li><strong>مبادئ قابلية الاستخدام:</strong> وضوح حالة النظام، الاتساق، منع الخطأ، ودعم التعافي.</li><li><strong>بنية المعلومات:</strong> التسمية، التجميع، مسارات التنقل، وإمكانية التنبؤ.</li><li><strong>أنماط التفاعل والجوال:</strong> الأهداف اللمسية، الاستجابة، التغذية الراجعة، وترتيب المحتوى.</li></ul></> },
  { id: "evidence", title: "أنواع الأدلة والفروق بينها", icon: <ShieldCheck />, content: <div className="evidence-definition-grid"><article><Bot /><strong>اكتشاف آلي</strong><p>قياس أو قاعدة قابلة للتشغيل مثل التباين وبنية العناوين. قد ينتج إيجابيات كاذبة.</p></article><article><UserRoundCheck /><strong>مراجعة بشرية</strong><p>حكم خبير يحتاج فهم المعنى والسياق والحالة الكاملة.</p></article><article><WandSparkles /><strong>محاكاة سلوكية</strong><p>تتبّع تقديري للمهمة وليست جلسة مع مستخدمين حقيقيين.</p></article><article><Users /><strong>دليل مستخدم حقيقي</strong><p>نص عام منشور من مستخدم، مع مصدر وتاريخ وصلته بالمنتج؛ لا يمثل الجمهور كاملًا.</p></article></div> },
  { id: "accessibility", title: "حدود فحص إمكانية الوصول", icon: <Accessibility />, content: <><p>يمكن للأتمتة فحص مؤشرات مثل التباين، بعض السمات البرمجية، ترتيب العناوين، وتسميات الحقول. لكنها لا تستطيع وحدها إثبات أن الواجهة مفهومة أو قابلة للاستخدام مع كل تقنيات المساعدة.</p><div className="two-column-method"><div><strong>يمكن فحصه آليًا جزئيًا</strong><span>نسب التباين</span><span>وجود تسميات برمجية</span><span>بنية العناوين</span><span>بعض أخطاء لوحة المفاتيح</span></div><div><strong>يحتاج تحققًا بشريًا</strong><span>منطق ترتيب التركيز</span><span>وضوح النص البديل</span><span>جودة الإعلان لقارئ الشاشة</span><span>إتمام المهمة مع تقنيات المساعدة</span></div></div></> },
  { id: "severity", title: "معنى الشدة ونسبة الثقة", icon: <CircleAlert />, content: <><div className="severity-guide"><div><SeverityBadge severity="حرجة" /><p>تمنع المهمة أو تعرّض شريحة لخطر استبعاد جوهري.</p></div><div><SeverityBadge severity="عالية" /><p>تسبب تعطلًا أو خطأً مهمًا في مهمة أساسية.</p></div><div><SeverityBadge severity="متوسطة" /><p>تزيد الجهد أو الارتباك لكن يمكن تجاوزها.</p></div><div><SeverityBadge severity="منخفضة" /><p>أثر محدود أو تحسين جودة واتساق.</p></div></div><p><strong>الثقة</strong> تعبّر عن قوة الدليل وثبات الاكتشاف، لا عن حجم أثر المشكلة ولا عن احتمال نجاح التوصية.</p></> },
  { id: "rtl", title: "تقييم العربية واتجاه RTL", icon: <ArrowRight />, content: <><p>يفحص التقييم ترتيب القراءة والتبويب، واتجاه أيقونات الحركة، وموضع الأفعال، وخلط الأرقام العربية واللاتينية، والتفاف النص، وجودة المصطلحات، وتوافق الواجهة ثنائية الاتجاه.</p><p>تحتاج ملاءمة المصطلح للهجة والسياق السعودي مراجعة لغوية بشرية؛ لا يكفي أن يكون النص مترجمًا نحويًا.</p></> },
  { id: "validation", title: "كيف يجب التحقق من التوصيات؟", icon: <ClipboardCheck />, content: <><p>تتضمن كل توصية طريقة تحقق تناسب الدليل: إعادة فحص تقني، مراجعة خبير، اختبار مهمة مع مستخدمين، تحليل بيانات المنتج، أو تجربة مقارنة عند ملاءمتها.</p><ol><li>نفّذ التغيير في بيئة قابلة للاختبار.</li><li>أعد الفحص بالمقياس نفسه للمقارنة.</li><li>اختبر المهمة مع الشريحة المتأثرة عندما يكون الحكم سلوكيًا.</li><li>راقب المؤشر الفعلي دون افتراض علاقة سببية من درجة التقييم وحدها.</li></ol></> },
];

function MethodologyGuide({ navigate }: { navigate: (screen: Screen) => void }) {
  const [open, setOpen] = useState<string[]>(["dimensions", "evidence"]);
  const toggle = (id: string) => setOpen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return (
    <div className="page methodology-page">
      <PageHeader eyebrow="مرجع التقييم" title="دليل المنهجية" description="افهم ما الذي نقيسه، وما الذي لا نستطيع إثباته، وكيف تنتقل من ملاحظة إلى قرار قابل للتحقق." actions={<Button variant="secondary" onClick={() => navigate("report")} icon={<ArrowRight size={17} />}>العودة للتقرير</Button>} />
      <section className="methodology-hero panel"><div><span><BookOpen /></span><div><h3>منهجية قابلة للتتبع وليست صندوقًا أسود</h3><p>كل نتيجة ترتبط بطريقة اكتشاف ودليل ومعيار ونسبة ثقة وخطوة تحقق. نفصل بوضوح بين القياس الآلي والحكم البشري وصوت المستخدم.</p></div></div><dl><div><dt>آخر تحديث</dt><dd>12 أغسطس 2026</dd></div><div><dt>إصدار المنهجية</dt><dd>1.3 — توضيحي</dd></div><div><dt>لغة التقييم</dt><dd>العربية وRTL أصلًا</dd></div></dl></section>
      <div className="methodology-layout">
        <aside className="panel method-nav"><h3>في هذا الدليل</h3>{methodologySections.map((section) => <button key={section.id} onClick={() => { if (!open.includes(section.id)) setOpen((current) => [...current, section.id]); document.getElementById(`method-${section.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }); }}>{section.icon}<span>{section.title}</span><ChevronLeft size={15} /></button>)}</aside>
        <main className="method-accordion">{methodologySections.map((section) => <article className={`panel ${open.includes(section.id) ? "open" : ""}`} id={`method-${section.id}`} key={section.id}><button className="method-accordion-trigger" onClick={() => toggle(section.id)}><span>{section.icon}</span><h3>{section.title}</h3>{open.includes(section.id) ? <ChevronUp /> : <ChevronDown />}</button>{open.includes(section.id) && <div className="method-content">{section.content}</div>}</article>)}</main>
      </div>
      <section className="method-callout"><MessageSquareText size={20} /><div><strong>التقرير الجيد يذكر حدود الأدلة بقدر ما يذكر النتائج.</strong><p>إذا تعارض القياس الآلي مع سياق الاستخدام الحقيقي، تكون الأولوية للتحقق البشري واختبار المهمة.</p></div></section>
    </div>
  );
}

function ReportsScreen({ navigate, notify }: { navigate: (screen: Screen) => void; notify: Notify }) {
  const [query, setQuery] = useState("");
  const rows = [
    { project: "متجر نَماء", type: "التقرير التشخيصي الآلي", date: "12 أغسطس 2026", owner: "فريق تجربة المنتج", status: "جاهز", screen: "report" as Screen },
    { project: "متجر نَماء", type: "تحليل آراء المستخدمين", date: "11 أغسطس 2026", owner: "فريق أبحاث السوق", status: "جاهز", screen: "voice-report" as Screen },
    { project: "متجر نَماء", type: "التقرير الموحّد", date: "12 أغسطس 2026", owner: "براء الصاعدي", status: "جاهز", screen: "unified" as Screen },
    { project: "متجر نَماء", type: "مقارنة الإصدارين 2.3 و2.4", date: "12 أغسطس 2026", owner: "فريق المنتج", status: "جاهز", screen: "compare" as Screen },
  ].filter((row) => row.project.includes(query) || row.type.includes(query));
  return (
    <div className="page reports-page">
      <PageHeader eyebrow="مركز التقارير" title="التقارير" description="افتح التقارير الجاهزة، وشاركها، أو صدّر نسخة للتسليم والمتابعة." actions={<Button onClick={() => navigate("new-audit")} icon={<Plus size={17} />}>إنشاء تقرير جديد</Button>} />
      <div className="filter-bar"><div className="search-input"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث في التقارير" /></div><select className="filter-select"><option>كل الأنواع</option><option>تجربة المنتج</option><option>صوت المستخدم</option><option>مقارنة الإصدارات</option></select></div>
      <section className="panel reports-table"><div className="responsive-table"><table><thead><tr><th>المشروع والتقرير</th><th>تاريخ الإنشاء</th><th>المالك</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>{rows.map((row) => <tr key={row.type}><td><span className="table-product teal">{row.project.charAt(0)}</span><span><b>{row.project}</b><small>{row.type}</small></span></td><td>{row.date}</td><td>{row.owner}</td><td><span className={`status ${row.status === "جاهز" ? "success" : "warning"}`}>{row.status}</span></td><td><div className="table-actions"><button onClick={() => navigate(row.screen)} aria-label="فتح التقرير"><Eye size={17} /></button><button onClick={() => notify("تم تجهيز نسخة تصدير توضيحية", "success")} aria-label="تصدير التقرير"><Download size={17} /></button><button onClick={() => notify("تم نسخ رابط المشاركة", "success")} aria-label="مشاركة التقرير"><Share2 size={17} /></button></div></td></tr>)}</tbody></table></div>{rows.length === 0 && <div className="empty-state"><FileText size={28} /><h3>لا توجد تقارير مطابقة</h3><p>جرّب كلمة بحث أخرى.</p><Button variant="secondary" onClick={() => setQuery("")}>مسح البحث</Button></div>}</section>
    </div>
  );
}

type SpecializedService = "expert" | "consultation" | "improvement" | null;

function SpecializedServices({ notify }: { notify: Notify }) {
  const [activeService, setActiveService] = useState<SpecializedService>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedIssues, setSelectedIssues] = useState(["F-012"]);
  const close = () => { setActiveService(null); setSubmitted(false); };
  const submit = () => {
    setSubmitted(true);
    notify("سُجل الطلب التوضيحي بنجاح", "success");
  };
  const toggleIssue = (id: string) => setSelectedIssues((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const modalTitle = activeService === "expert" ? "طلب تقرير خبير مستقل" : activeService === "consultation" ? "حجز جلسة استشارية" : "طلب خدمة تحسين تجربة المستخدم";
  return (
    <div className="page services-page">
      <PageHeader eyebrow="خدمات تطلب عند الحاجة" title="الخدمات المتخصصة" description="انتقل من التشخيص الآلي إلى تحقق بشري محايد أو جلسة قرار أو طلب تنفيذ تحسينات. جميع الطلبات هنا توضيحية." />
      <div className="report-disclaimer"><DemoBadge /><span><ShieldCheck size={16} /> يفصل XP Insight بين الخبير الذي يراجع النتائج والفريق الذي قد ينفذ التحسينات لتقليل تعارض المصالح.</span></div>
      <section className="specialized-grid">
        <article className="panel specialized-card"><span><UserRoundCheck /></span><small>خدمة إضافية</small><h3>تقرير الخبير المستقل</h3><p>مراجعة بشرية متخصصة للتحقق من نتائج التقييم وتقديم رأي مهني محايد.</p><ul><li>اختيار نطاق المراجعة</li><li>التحقق من الأدلة والتوصيات</li><li>ملاحظات منفصلة عن فريق التنفيذ</li></ul><Button onClick={() => setActiveService("expert")} icon={<ArrowLeft size={16} />}>اطلب مراجعة خبير</Button></article>
        <article className="panel specialized-card"><span><CalendarDays /></span><small>خدمة إضافية</small><h3>جلسة استشارية</h3><p>جلسة مخصصة لمناقشة التقرير وترتيب الأولويات وتحديد الخطوة التالية.</p><ul><li>اختيار موضوع الجلسة</li><li>تحديد نوع المساعدة والمدة</li><li>إضافة المشاركين والملاحظات</li></ul><Button onClick={() => setActiveService("consultation")} icon={<ArrowLeft size={16} />}>احجز جلسة توضيحية</Button></article>
        <article className="panel specialized-card"><span><PencilLine /></span><small>خدمة منفصلة</small><h3>تحسين تجربة المستخدم</h3><p>طلب معالجة مشكلات مختارة من التقرير عبر حلول تصميمية أو استشارية.</p><ul><li>تحسين تدفقات الاستخدام</li><li>تنظيم المحتوى وبنية المعلومات</li><li>تطوير الواجهات وإمكانية الوصول</li></ul><Button onClick={() => setActiveService("improvement")} icon={<ArrowLeft size={16} />}>أنشئ طلب تحسين</Button></article>
      </section>
      <section className="revenue-section">
        <div className="section-heading"><span>نموذج الإيرادات المقترح</span><h2>اختر طريقة الخدمة، والسعر النهائي قيد الاختبار</h2><p>لا تعرض النسخة الأولية أسعارًا نهائية قبل اختبار استعداد العملاء للدفع وتكلفة تقديم كل خدمة.</p></div>
        <div className="revenue-grid">
          <article><span>للبداية</span><h3>تقييم أولي محدود</h3><p>عدد محدود من الملاحظات لتعريف العميل بقيمة المنصة.</p><strong>مجاني أو منخفض التكلفة</strong><button onClick={() => notify("التقييم الأولي متاح من صفحة تقييم المنتج", "info")}>ابدأ التقييم</button></article>
          <article><span>حسب الاستخدام</span><h3>تقرير تشخيصي واحد</h3><p>الدفع مقابل تقرير مفصل لمنتج رقمي محدد.</p><strong>السعر قيد الاختبار</strong><button onClick={() => setActiveService("expert")}>اطلب التقرير</button></article>
          <article><span>للمتابعة</span><h3>اشتراك دوري</h3><p>إعادة تقييم، حفظ التقارير ومقارنة التغير بين الإصدارات.</p><strong>شهري أو سنوي</strong><button onClick={() => notify("سُجل اهتمامك بتجربة المتابعة الدورية", "success")}>انضم إلى التجربة</button></article>
          <article><span>للمنظمات</span><h3>عقد مؤسسي</h3><p>نطاق مخصص لعدة منتجات وحسابات واحتياجات تشغيلية.</p><strong>يحدد حسب النطاق</strong><button onClick={() => setActiveService("consultation")}>اطلب عرضًا</button></article>
        </div>
      </section>
      {activeService && <Modal title={modalTitle} description="هذا المسار تفاعلي توضيحي ولا ينشئ حجزًا أو عملية شراء فعلية." onClose={close}><div className="modal-body service-request-body">{submitted ? <div className="service-success"><span><CheckCircle2 /></span><h3>تم تسجيل الطلب التوضيحي</h3><p>في المنتج الفعلي سيصل الطلب إلى الفريق المختص مع نطاق المشروع وبيانات التواصل.</p><Button onClick={close}>العودة إلى الخدمات</Button></div> : <><div className="request-context"><span>المشروع</span><strong>متجر نَماء</strong><small>بيانات توضيحية لأغراض النموذج الأولي</small></div>{activeService === "expert" && <div className="form-grid"><FormField label="نطاق المراجعة"><select defaultValue="الملاحظات عالية الأولوية"><option>الملاحظات عالية الأولوية</option><option>رحلة إتمام الطلب كاملة</option><option>إمكانية الوصول والعربية</option></select></FormField><FormField label="الموعد المتوقع"><input type="date" defaultValue="2026-08-25" /></FormField><FormField label="البريد المهني" wide><input type="email" defaultValue="product@example.sa" /></FormField><div className="context-note field-wide"><UserRoundCheck size={18} /><p>الخبير المراجع مستقل عن فريق تنفيذ التحسينات، والغرض هو التحقق المهني المحايد.</p></div></div>}{activeService === "consultation" && <div className="form-grid"><FormField label="موضوع الجلسة"><select><option>تحديد أولويات التقرير</option><option>مناقشة رحلة إتمام الطلب</option><option>خطة التحقق والقياس</option></select></FormField><FormField label="نوع المساعدة"><select><option>مراجعة قرارات المنتج</option><option>توجيه فريق التصميم</option><option>خطة تنفيذ التحسينات</option></select></FormField><FormField label="المدة"><select><option>45 دقيقة</option><option>60 دقيقة</option></select></FormField><FormField label="التاريخ والوقت"><input type="datetime-local" defaultValue="2026-08-26T11:00" /></FormField><FormField label="المشاركون"><input defaultValue="مدير المنتج، مصمم تجربة المستخدم" /></FormField><FormField label="ملاحظات" wide><textarea rows={3} defaultValue="نحتاج إلى ترتيب التحسينات المناسبة للإصدار القادم." /></FormField></div>}{activeService === "improvement" && <><div className="issue-picker"><span>اختر المشكلات المطلوب تضمينها</span>{initialFindings.slice(0, 4).map((finding) => <label key={finding.id}><input type="checkbox" checked={selectedIssues.includes(finding.id)} onChange={() => toggleIssue(finding.id)} /><span><strong>{finding.title}</strong><small>{finding.id} · {finding.severity}</small></span></label>)}</div><div className="form-grid"><FormField label="نوع الخدمة"><select><option>تحسين تدفق الاستخدام</option><option>تنظيم المحتوى وبنية المعلومات</option><option>تطوير واجهات عالية الدقة</option><option>مراجعة إمكانية الوصول</option></select></FormField><FormField label="الإطار الزمني"><select><option>يحدد بعد مراجعة النطاق</option><option>الإصدار القادم</option><option>خلال هذا الربع</option></select></FormField><FormField label="ملاحظات الفريق" wide><textarea rows={3} placeholder="أضف القيود أو الأهداف المهمة" /></FormField></div><div className="context-note"><Info size={18} /><p>تنفيذ التوصيات لا يضمن تلقائيًا ارتفاع التحويل أو الرضا، ويجب التحقق من أثرها بعد الإطلاق.</p></div></>}
        <footer className="service-modal-actions"><Button variant="secondary" onClick={close}>إلغاء</Button><Button disabled={activeService === "improvement" && selectedIssues.length === 0} onClick={submit} icon={<Send size={16} />}>إرسال الطلب التوضيحي</Button></footer></>}</div></Modal>}
    </div>
  );
}

function SettingsScreen({ notify }: { notify: Notify }) {
  const [tab, setTab] = useState("workspace");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [auditAlerts, setAuditAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(false);
  return (
    <div className="page settings-page">
      <PageHeader eyebrow="مساحة العمل" title="الإعدادات" description="إدارة معلومات المساحة والفريق وتفضيلات التنبيهات الافتراضية." />
      <div className="settings-layout">
        <aside className="panel settings-nav"><button className={tab === "workspace" ? "active" : ""} onClick={() => setTab("workspace")}><BriefcaseBusiness />مساحة العمل</button><button className={tab === "team" ? "active" : ""} onClick={() => setTab("team")}><Users />الفريق والصلاحيات</button><button className={tab === "notifications" ? "active" : ""} onClick={() => setTab("notifications")}><Bell />الإشعارات</button><button className={tab === "data" ? "active" : ""} onClick={() => setTab("data")}><ShieldCheck />البيانات والخصوصية</button></aside>
        <main className="panel settings-content">
          {tab === "workspace" && <><div className="settings-section-head"><h3>معلومات مساحة العمل</h3><p>تظهر هذه البيانات في التقارير والمشاركة الداخلية.</p></div><div className="form-grid"><FormField label="اسم المساحة"><input defaultValue="فريق متجر نَماء" /></FormField><FormField label="السوق الافتراضي"><select defaultValue="السوق السعودي"><option>السوق السعودي</option><option>دول الخليج</option></select></FormField><FormField label="لغة التقارير"><select defaultValue="العربية"><option>العربية</option><option>الإنجليزية</option></select></FormField><FormField label="المنطقة الزمنية"><select defaultValue="Asia/Riyadh"><option value="Asia/Riyadh">الرياض (UTC+3)</option></select></FormField></div><footer className="settings-footer"><Button onClick={() => notify("حُفظت إعدادات مساحة العمل", "success")}>حفظ التغييرات</Button></footer></>}
          {tab === "team" && <><div className="settings-section-head"><h3>الفريق والصلاحيات</h3><p>حدّد من يستطيع تعديل النتائج أو مشاركة التقارير.</p></div><div className="team-list"><div><span className="avatar">ب</span><span><strong>براء الصاعدي</strong><small>baraa@example.sa</small></span><b>مدير المساحة</b></div><div><span className="avatar light">ن</span><span><strong>نورة القحطاني</strong><small>noura@example.sa</small></span><select><option>محررة</option><option>مشاهدة فقط</option></select></div><div><span className="avatar light">ف</span><span><strong>فريق المنتج</strong><small>4 أعضاء</small></span><select><option>محررون</option><option>مشاهدة فقط</option></select></div></div><Button variant="secondary" onClick={() => notify("فُتح نموذج دعوة عضو جديد", "info")} icon={<Plus size={16} />}>دعوة عضو</Button></>}
          {tab === "notifications" && <><div className="settings-section-head"><h3>تفضيلات الإشعارات</h3><p>اختر متى تريد أن ننبّهك داخل المنصة أو عبر البريد.</p></div><div className="notification-settings"><label><span><strong>اكتمال التقييم</strong><small>عندما يصبح التقرير جاهزًا</small></span><input type="checkbox" checked={auditAlerts} onChange={() => setAuditAlerts(!auditAlerts)} /></label><label><span><strong>نتيجة تحتاج مراجعة</strong><small>عند انخفاض الثقة أو تعارض الأدلة</small></span><input type="checkbox" checked={reviewAlerts} onChange={() => setReviewAlerts(!reviewAlerts)} /></label><label><span><strong>إشعارات البريد</strong><small>نسخة من تنبيهات المساحة المهمة</small></span><input type="checkbox" checked={emailAlerts} onChange={() => setEmailAlerts(!emailAlerts)} /></label></div><footer className="settings-footer"><Button onClick={() => notify("حُفظت تفضيلات الإشعارات", "success")}>حفظ التفضيلات</Button></footer></>}
          {tab === "data" && <><div className="settings-section-head"><h3>البيانات والخصوصية</h3><p>حدود جمع البيانات الافتراضية للمساحة.</p></div><div className="privacy-cards"><article><Globe2 /><div><strong>صفحات عامة فقط</strong><p>لا يدخل الفحص إلى حسابات خاصة أو حقول تتطلب بيانات شخصية.</p></div></article><article><MessageSquareText /><div><strong>آراء منشورة علنًا</strong><p>يحتفظ التقرير بالرابط والتاريخ ويعرض قيود تمثيل العينة.</p></div></article><article><Trash2 /><div><strong>سياسة الاحتفاظ</strong><p>تحذف اللقطات الخام بعد 90 يومًا في هذا الإعداد التوضيحي.</p></div></article></div><Button variant="secondary" onClick={() => notify("تم تنزيل سجل بيانات توضيحي", "success")} icon={<Download size={16} />}>تنزيل سجل البيانات</Button></>}
        </main>
      </div>
    </div>
  );
}

const screenTitles: Record<Screen, string> = {
  landing: "XP Insight",
  dashboard: "الرئيسية",
  projects: "المشاريع",
  "new-audit": "تقييم تجربة المنتج",
  "initial-result": "نتيجة التقييم الأولي",
  processing: "تحليل المنتج",
  report: "تقرير تجربة المنتج",
  "voice-setup": "صوت المستخدم",
  "voice-report": "تقرير صوت المستخدم",
  unified: "التحليل الموحّد",
  compare: "مقارنة الإصدارات",
  reports: "التقارير",
  services: "الخدمات المتخصصة",
  methodology: "دليل المنهجية",
  settings: "الإعدادات",
};

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; tone: "success" | "warning" | "info" } | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navigate = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify: Notify = useCallback((message, tone = "info") => {
    setToast({ message, tone });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "dashboard": return <Dashboard navigate={navigate} />;
      case "projects": return <ProjectsScreen navigate={navigate} />;
      case "new-audit": return <AuditFlow navigate={navigate} notify={notify} />;
      case "processing": return <ProcessingScreen navigate={navigate} notify={notify} />;
      case "initial-result": return <InitialAuditResult navigate={navigate} />;
      case "report": return <AuditReport navigate={navigate} notify={notify} />;
      case "voice-setup": return <VoiceSetup navigate={navigate} notify={notify} />;
      case "voice-report": return <VoiceReport navigate={navigate} notify={notify} />;
      case "unified": return <UnifiedInsight navigate={navigate} notify={notify} />;
      case "compare": return <CompareVersions navigate={navigate} notify={notify} />;
      case "reports": return <ReportsScreen navigate={navigate} notify={notify} />;
      case "services": return <SpecializedServices notify={notify} />;
      case "methodology": return <MethodologyGuide navigate={navigate} />;
      case "settings": return <SettingsScreen notify={notify} />;
      default: return <Dashboard navigate={navigate} />;
    }
  };

  if (screen === "landing") return <Landing navigate={navigate} />;

  return (
    <div className="app-shell">
      <Sidebar screen={screen} navigate={navigate} open={sidebarOpen} close={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar title={screenTitles[screen]} openMenu={() => setSidebarOpen(true)} navigate={navigate} onSearch={() => setSearchOpen(true)} onNotifications={() => setNotificationsOpen(true)} />
        {renderScreen()}
      </div>
      {toast && <div className={`toast ${toast.tone}`} role="status">{toast.tone === "success" ? <CheckCircle2 size={18} /> : toast.tone === "warning" ? <CircleAlert size={18} /> : <Info size={18} />}<span>{toast.message}</span><button onClick={() => setToast(null)} aria-label="إغلاق"><X size={15} /></button></div>}
      {searchOpen && <Modal title="البحث في مساحة العمل" description="انتقل مباشرة إلى مشروع أو تقرير أو ملاحظة." onClose={() => setSearchOpen(false)}><div className="modal-body global-search"><div className="search-input"><Search size={18} /><input autoFocus placeholder="اكتب: نَماء، تقرير، إتمام الطلب..." /></div><span>اقتراحات سريعة</span><button onClick={() => { setSearchOpen(false); navigate("report"); }}><FileText /><div><strong>التقرير التشخيصي لمتجر نَماء</strong><small>المؤشر 81 من 100</small></div><ChevronLeft /></button><button onClick={() => { setSearchOpen(false); navigate("unified"); }}><Link2 /><div><strong>خطوات إتمام الطلب طويلة</strong><small>علاقة موحّدة · 12 إشارة داعمة</small></div><ChevronLeft /></button><button onClick={() => { setSearchOpen(false); navigate("methodology"); }}><BookOpen /><div><strong>معيار WCAG 1.4.3</strong><small>دليل المنهجية</small></div><ChevronLeft /></button></div></Modal>}
      {notificationsOpen && <Modal title="الإشعارات" description="آخر نشاطات مساحة العمل." onClose={() => setNotificationsOpen(false)}><div className="modal-body notification-list"><button onClick={() => { setNotificationsOpen(false); navigate("report"); }}><span className="green"><CheckCircle2 /></span><div><strong>اكتمل تقييم متجر نَماء</strong><small>أصبح التقرير التوضيحي جاهزًا · منذ 6 دقائق</small></div><ChevronLeft /></button><button onClick={() => { setNotificationsOpen(false); navigate("unified"); }}><span className="amber"><Link2 /></span><div><strong>3 علاقات جديدة تحتاج مراجعة</strong><small>بين ملاحظات الواجهة وآراء المستخدمين</small></div><ChevronLeft /></button></div></Modal>}
    </div>
  );
}
