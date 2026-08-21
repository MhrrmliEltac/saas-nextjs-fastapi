import Link from "next/link";
import { ArrowRight, CalendarClock, ShieldCheck, Users, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Users,
    title: "İşçi idarəetməsi",
    description: "Bütün işçi məlumatlarını, departamentləri və vəzifələri tək yerdə saxlayın.",
  },
  {
    icon: CalendarClock,
    title: "Davamiyyət və məzuniyyət",
    description: "Giriş-çıxışları izləyin, məzuniyyət tələblərini bir kliklə təsdiqləyin.",
  },
  {
    icon: Wallet,
    title: "Maaş və performans",
    description: "Aylıq maaş cədvəlini idarə edin, dövri performans qiymətləndirmələri aparın.",
  },
  {
    icon: ShieldCheck,
    title: "Etibarlı təhlükəsizlik",
    description: "Rol əsaslı icazələr və tam təcridlə həssas HR məlumatlarınız qorunur.",
  },
];

const plans = [
  {
    name: "Free",
    price: "0 ₼",
    description: "Kiçik komandalar üçün başlanğıc.",
    features: ["10 işçiyə qədər", "Davamiyyət və məzuniyyət", "Əsas dəstək"],
  },
  {
    name: "Pro",
    price: "49 ₼",
    description: "Böyüyən şirkətlər üçün.",
    features: ["Limitsiz işçi", "Maaş və performans modulları", "Prioritet dəstək"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Fərdi",
    description: "Böyük təşkilatlar üçün.",
    features: ["Xüsusi SLA və SSO", "İşə qəbul modulu", "Şəxsi hesab meneceri"],
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 flex justify-center blur-3xl"
        >
          <div className="h-80 w-xl rounded-full bg-primary/20" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-24 pt-24 text-center sm:pt-32">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            HR idarəetməsi üçün yeni nəsil platforma
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Bütün HR proseslərini bir platformada idarə edin
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-balance">
            Orbit — işçilər, davamiyyət, məzuniyyət, maaş və işə qəbul üçün sadə, sürətli insan resursları idarəetmə sistemi.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg">
                Pulsuz başla
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Daha ətraflı
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Şəffaf qiymətləndirmə</h2>
          <p className="mt-3 text-muted-foreground">Böyüdükcə yeniləyin. İstənilən vaxt ləğv edin.</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.highlighted ? "border-foreground bg-foreground text-background" : "border-border"
              }`}
            >
              <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">{plan.name}</h3>
              <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
              <p className={`mt-2 text-sm ${plan.highlighted ? "opacity-80" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${plan.highlighted ? "bg-background" : "bg-foreground"}`} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8">
                <Button
                  variant={plan.highlighted ? "outline" : "default"}
                  className={`w-full ${plan.highlighted ? "border-background text-background hover:bg-background/10" : ""}`}
                >
                  Seç
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
