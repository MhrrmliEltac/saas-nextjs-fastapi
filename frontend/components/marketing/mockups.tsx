import {
  Bell,
  CalendarCheck2,
  Home,
  LayoutGrid,
  Search,
  Users,
  Wallet,
  Check,
  TrendingUp,
} from "lucide-react";

function MockupFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[28px] bg-gradient-to-br from-(--brand)/50 via-(--brand-soft) to-(--brand)/60 p-[3px] shadow-[0_30px_60px_-25px_rgba(30,41,150,0.35)]">
      <div className="overflow-hidden rounded-[25px] bg-white">{children}</div>
    </div>
  );
}

const navItems = [
  { icon: Home, label: "Ana səhifə", active: true },
  { icon: Bell, label: "Bildirişlər" },
  { icon: Users, label: "İşçilər" },
  { icon: LayoutGrid, label: "Departamentlər" },
  { icon: CalendarCheck2, label: "Məzuniyyət" },
  { icon: Wallet, label: "Maaş" },
];

export function DashboardMockup() {
  return (
    <MockupFrame>
      <div className="flex h-[340px] sm:h-[400px]">
        <div className="hidden w-44 shrink-0 flex-col gap-1 border-r border-(--hairline) bg-(--cream-soft)/60 p-4 sm:flex">
          <div className="mb-4 flex items-center gap-1.5 px-1 text-sm font-semibold text-(--ink)">
            <span className="size-2 rounded-full bg-(--brand)" />
            orbit
          </div>
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-(--hairline) bg-white px-2.5 py-1.5 text-xs text-(--ink-faint)">
            <Search className="size-3.5" />
            Axtar
          </div>
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                item.active ? "bg-(--brand)/10 text-(--brand)" : "text-(--ink-muted)"
              }`}
            >
              <item.icon className="size-3.5" />
              {item.label}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-6 p-6 sm:p-10">
          <div>
            <p className="text-xs font-medium text-(--ink-faint)">Xoş gəldiniz</p>
            <p className="mt-1 text-xl font-semibold text-(--ink) sm:text-2xl">
              Bu gün komandanızda <span style={{ fontFamily: "var(--font-accent)" }} className="italic text-(--brand)">hər şey</span> qaydasındadır.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Aktiv işçi", value: "128" },
              { label: "Bugünkü davamiyyət", value: "97%" },
              { label: "Açıq vakansiya", value: "6" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-(--hairline) bg-(--cream-soft)/50 p-3">
                <p className="text-lg font-semibold text-(--ink)">{stat.value}</p>
                <p className="mt-0.5 text-[11px] text-(--ink-faint)">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-(--hairline) bg-(--cream-soft)/60 px-4 py-2 text-xs text-(--ink-faint)">
            <TrendingUp className="size-3.5 text-(--brand)" />
            Performans hesabatı hazırdır — baxmaq üçün klikləyin
          </div>
        </div>
      </div>
    </MockupFrame>
  );
}

export function AttendanceMockup() {
  const days = ["B.e", "Ç.a", "Ç", "C.a", "C", "Ş", "B"];
  return (
    <MockupFrame>
      <div className="flex h-[300px] flex-col gap-5 p-6 sm:h-[340px] sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-(--ink)">Bu həftə · Davamiyyət</p>
          <span className="rounded-full bg-(--brand)/10 px-2.5 py-1 text-[11px] font-medium text-(--brand)">
            Canlı
          </span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-(--ink-faint)">{day}</span>
              <div
                className={`flex size-8 items-center justify-center rounded-full text-[11px] font-medium ${
                  i === 5 || i === 6
                    ? "bg-(--cream-soft) text-(--ink-faint)"
                    : "bg-(--brand) text-white"
                }`}
              >
                {i === 5 || i === 6 ? "—" : <Check className="size-3.5" />}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 space-y-2">
          {[
            { name: "Aygün Məmmədova", status: "Ofisdə", time: "09:02" },
            { name: "Rəşad Quliyev", status: "Məzuniyyətdə", time: "3 gün" },
            { name: "Nərmin Əliyeva", status: "Ofisdə", time: "08:47" },
          ].map((row) => (
            <div
              key={row.name}
              className="flex items-center justify-between rounded-xl border border-(--hairline) bg-(--cream-soft)/40 px-3 py-2 text-xs"
            >
              <span className="font-medium text-(--ink)">{row.name}</span>
              <span className="text-(--ink-faint)">{row.status}</span>
              <span className="text-(--ink-faint)">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

export function PayrollMockup() {
  return (
    <MockupFrame>
      <div className="flex h-[300px] flex-col gap-5 p-6 sm:h-[340px] sm:p-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-(--ink)">Avqust · Maaş cədvəli</p>
          <Wallet className="size-4 text-(--brand)" />
        </div>
        <div className="rounded-2xl border border-(--hairline) bg-gradient-to-br from-(--brand)/10 to-transparent p-4">
          <p className="text-[11px] text-(--ink-faint)">Ümumi ödəniş</p>
          <p className="mt-1 text-2xl font-semibold text-(--ink)">48,320 ₼</p>
          <p className="mt-1 text-[11px] text-(--brand)">128 işçi üçün avtomatik hesablandı</p>
        </div>
        <div className="space-y-2">
          {[
            { name: "Baza maaş", value: "42,100 ₼" },
            { name: "Bonuslar", value: "4,820 ₼" },
            { name: "Kəsintilər", value: "-1,400 ₼" },
          ].map((row) => (
            <div key={row.name} className="flex items-center justify-between text-xs">
              <span className="text-(--ink-muted)">{row.name}</span>
              <span className="font-medium text-(--ink)">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}
