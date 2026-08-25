"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  monthly: number | null;
  annual: number | null;
  priceLabel?: string;
  description: string;
  groups: { title: string; items: string[] }[];
  highlighted?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    annual: 0,
    description: "Kiçik komandalar üçün başlanğıc.",
    cta: "Pulsuz başla",
    groups: [
      { title: "Komanda", items: ["10 işçiyə qədər", "1 departament"] },
      { title: "Xüsusiyyətlər", items: ["Davamiyyət və məzuniyyət", "Əsas dəstək"] },
    ],
  },
  {
    name: "Pro",
    monthly: 49,
    annual: 41,
    description: "Böyüyən şirkətlər üçün.",
    cta: "Pro-ya keç",
    highlighted: true,
    groups: [
      { title: "Komanda", items: ["Limitsiz işçi", "Limitsiz departament"] },
      {
        title: "Xüsusiyyətlər",
        items: ["Maaş və performans modulları", "İşə qəbul axını", "Prioritet dəstək"],
      },
    ],
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    priceLabel: "Fərdi",
    description: "Böyük təşkilatlar üçün.",
    cta: "Bizimlə əlaqə saxla",
    groups: [
      { title: "Komanda", items: ["Limitsiz işçi", "Çoxlu təşkilat"] },
      { title: "Xüsusiyyətlər", items: ["Xüsusi SLA və SSO", "Şəxsi hesab meneceri"] },
    ],
  },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[repeating-linear-gradient(115deg,transparent_0,transparent_38px,var(--brand)_38px,var(--brand)_40px)] opacity-[0.06]"
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium text-(--brand)">Qiymətlər</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
            Böyüyən komandalar üçün
          </h2>
          <p className="mt-3 text-(--ink-muted)">Böyüdükcə yeniləyin. İstənilən vaxt ləğv edin.</p>

          <div className="mx-auto mt-8 inline-flex items-center gap-1 rounded-full border border-(--hairline) bg-white p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                !annual ? "bg-(--ink) text-(--cream)" : "text-(--ink-muted)"
              )}
            >
              Aylıq
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                annual ? "bg-(--ink) text-(--cream)" : "text-(--ink-muted)"
              )}
            >
              İllik
              <span className="rounded-full bg-(--brand)/15 px-1.5 py-0.5 text-[10px] font-semibold text-(--brand)">
                16% qənaət
              </span>
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {plans.map((plan) => {
            const price = annual ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border p-8",
                  plan.highlighted
                    ? "border-(--brand) bg-white shadow-[0_25px_50px_-25px_rgba(30,41,150,0.35)]"
                    : "border-(--hairline) bg-white/70"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-(--brand) px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    Ən populyar
                  </span>
                )}

                <h3 className="text-sm font-medium tracking-wide text-(--ink-faint)">{plan.name}</h3>
                <p className="mt-3 text-3xl font-semibold text-(--ink)">
                  {plan.priceLabel ?? `${price} ₼`}
                  {plan.priceLabel === undefined && (
                    <span className="text-base font-normal text-(--ink-faint)">/ay</span>
                  )}
                </p>
                <p className="mt-2 text-sm text-(--ink-muted)">{plan.description}</p>

                <div className="mt-6 flex-1 space-y-5">
                  {plan.groups.map((group) => (
                    <div key={group.title}>
                      <p className="text-xs font-semibold tracking-wide text-(--ink-faint) uppercase">
                        {group.title}
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-(--ink-muted)">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-(--brand)" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <Link href="/register" className="mt-8">
                  <Button
                    className={cn(
                      "w-full rounded-full",
                      plan.highlighted
                        ? "bg-(--brand) text-white hover:bg-(--brand-hover)"
                        : "border border-(--hairline) bg-white text-(--ink) hover:bg-(--cream-soft)"
                    )}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
