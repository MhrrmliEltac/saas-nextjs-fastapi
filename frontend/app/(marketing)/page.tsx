import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  CalendarClock,
  FileSpreadsheet,
  GitBranch,
  Link2,
  Mail,
  MessageSquare,
  Sparkles,
  UserPlus,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardMockup, AttendanceMockup, PayrollMockup } from "@/components/marketing/mockups";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";

const steps = [
  {
    icon: UserPlus,
    title: "Hesab yaradın",
    description: "Pulsuz qeydiyyatdan keçin, komanda üzvlərini dəvət edin və işçilərinizi əlavə edin.",
  },
  {
    icon: Link2,
    title: "Sistemlərinizi qoşun",
    description: "Google Təqvim, Slack və e-poçtu qoşun ki, Orbit real iş axınınız üzərində işləsin.",
  },
  {
    icon: Sparkles,
    title: "İdarə edin və izləyin",
    description: "Davamiyyəti izləyin, məzuniyyəti təsdiqləyin, maaşı hesablayın — hamısı bir yerdə.",
  },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Bir baxışda hesabatlar",
    description: "Komandanın davamiyyət, məzuniyyət və performans göstəricilərini real vaxtda görün.",
  },
  {
    icon: GitBranch,
    title: "Departament axını",
    description: "Departamentləri, vəzifələri və hesabat xəttini vizual şəkildə qurun.",
  },
];

const integrations = [
  { icon: Mail, name: "E-poçt bildirişləri", description: "Məzuniyyət və maaş yeniləmələrini avtomatik göndərin." },
  { icon: CalendarClock, name: "Google Təqvim", description: "Məzuniyyət və görüşləri komandanın təqviminə sinxronlayın." },
  { icon: MessageSquare, name: "Slack", description: "Təsdiq və bildirişləri birbaşa Slack kanallarına ötürün." },
  { icon: FileSpreadsheet, name: "Excel / CSV", description: "İşçi və maaş məlumatlarını idxal-ixrac edin." },
  { icon: Banknote, name: "Bank inteqrasiyası", description: "Maaş ödənişlərini birbaşa bank sistemindən icra edin." },
  { icon: Video, name: "Video görüşlər", description: "Performans müsahibələrini təqvimdən birbaşa planlayın." },
];

function AccentWord({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-accent)" }} className="text-(--brand) italic">
      {children}
    </span>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-40 -top-40 h-105 w-105 rounded-full bg-(--brand)/25 blur-[110px]" />
          <div className="absolute -right-32 top-10 h-95 w-95 rounded-full bg-(--brand)/15 blur-[110px]" />
          <div
            className="absolute inset-x-0 bottom-0 h-64 opacity-[0.35]"
            style={{
              background:
                "repeating-linear-gradient(115deg, transparent 0, transparent 26px, var(--brand) 26px, var(--brand) 28px)",
              maskImage: "linear-gradient(to top, black, transparent)",
            }}
          />
        </div>

        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 text-center sm:pt-32">
          <h1 className="mx-auto max-w-2xl text-5xl leading-[1.05] font-semibold tracking-tight text-(--ink) text-balance sm:text-7xl">
            Komandanızı
            <br />
            <AccentWord>asanlıqla</AccentWord> idarə edin
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-(--ink-muted) text-balance">
            Orbit — işçilər, davamiyyət, məzuniyyət, maaş və işə qəbul üçün sadə, sürətli insan resursları
            idarəetmə sistemi.
          </p>

          <div className="mx-auto mt-10 max-w-md">
            <Link
              href="/register"
              className="group flex items-center justify-between gap-3 rounded-full border border-(--hairline) bg-white py-3 pr-2 pl-6 text-left shadow-[0_20px_45px_-25px_rgba(30,41,150,0.4)] transition-colors hover:border-(--brand)/40"
            >
              <span className="truncate text-sm text-(--ink-faint)">İşçi əlavə et, məzuniyyət təsdiqlə...</span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--brand) text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <p className="mt-4 text-sm text-(--ink-faint)">⚡ Pulsuz başlayın. Kredit kartı tələb olunmur.</p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 pb-24">
          <DashboardMockup />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-(--hairline) py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-medium text-(--brand)">Necə işləyir</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
              Üç addımda hazır olun
            </h2>
            <p className="mt-3 text-(--ink-muted)">Qeydiyyatdan ilk AI-siz, sadə HR idarəçiliyinə. Uzun quraşdırma yoxdur.</p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title}>
                <div className="flex size-11 items-center justify-center rounded-2xl bg-(--brand)/10 text-(--brand)">
                  <step.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-(--ink)">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-(--ink-muted)">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-3xl border border-(--hairline) bg-white/70 p-8">
                <div className="flex size-10 items-center justify-center rounded-xl bg-(--brand)/10 text-(--brand)">
                  <item.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-(--ink)">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-(--ink-muted)">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature: Attendance */}
      <section id="features" className="py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-(--brand)">Davamiyyət</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
                Giriş-çıxışı izləyin,
                <br />
                <AccentWord>saniyələr</AccentWord> içində
              </h2>
              <p className="mt-4 max-w-md text-(--ink-muted)">
                Komandanın harada olduğunu real vaxtda görün, məzuniyyət tələblərini bir kliklə təsdiqləyin.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-(--ink-muted)">
                {[
                  "Giriş-çıxış avtomatik qeydə alınır",
                  "Məzuniyyət tələbləri bir kliklə təsdiqlənir",
                  "Təqvimdə komandanın statusunu görün",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-(--brand)" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 inline-block">
                <Button className="rounded-full border border-(--hairline) bg-white px-5 text-(--ink) hover:bg-(--cream-soft)">
                  Davamiyyəti izlə
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>
            <div className="parallax-right">
              <AttendanceMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Feature: Payroll */}
      <section className="py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="order-2 lg:order-1 parallax-left">
              <PayrollMockup />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-medium text-(--brand)">Maaş və performans</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
                Maaş hesablamalarını
                <br />
                <AccentWord>avtomatlaşdırın</AccentWord>
              </h2>
              <p className="mt-4 max-w-md text-(--ink-muted)">
                Aylıq maaş cədvəlini avtomatik hesablayın, bonus və kəsintiləri izləyin, performans dövrlərini
                planlaşdırın.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-(--ink-muted)">
                {[
                  "Aylıq maaş cədvəli avtomatik hesablanır",
                  "Performans qiymətləndirmə dövrləri planlaşdırılır",
                  "Bonus və kəsintilər şəffaf izlənilir",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-(--brand)" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 inline-block">
                <Button className="rounded-full border border-(--hairline) bg-white px-5 text-(--ink) hover:bg-(--cream-soft)">
                  Maaşı idarə et
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="border-t border-(--hairline) py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <p className="text-sm font-medium text-(--brand)">İnteqrasiyalar</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
                Artıq istifadə etdiyiniz
                <br />
                alətlərə qoşulun
              </h2>
              <p className="mt-4 max-w-md text-(--ink-muted)">
                Təqvim, e-poçt və maaş sistemləriniz Orbit-ə qoşulur ki, komandanız real iş məlumatları üzərində
                işləsin.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {integrations.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start gap-3 rounded-2xl border border-(--hairline) bg-white/70 p-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-(--brand)/10 text-(--brand)">
                    <item.icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-(--ink)">{item.name}</p>
                    <p className="mt-0.5 text-xs leading-5 text-(--ink-muted)">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Pricing />
      <Faq />
    </>
  );
}
