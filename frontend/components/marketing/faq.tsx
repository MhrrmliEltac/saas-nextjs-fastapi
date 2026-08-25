"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Orbit nədir?",
    answer:
      "Orbit — işçilər, davamiyyət, məzuniyyət, maaş və işə qəbul proseslərini tək platformada idarə etməyə imkan verən insan resursları idarəetmə sistemidir.",
  },
  {
    question: "Pulsuz planı varmı?",
    answer: "Bəli. 10 işçiyə qədər komandalar üçün kredit kartı tələb olunmadan həmişəlik pulsuz istifadə edə bilərsiniz.",
  },
  {
    question: "Hansı sistemlərlə inteqrasiya olunur?",
    answer: "Google Təqvim, Slack, e-poçt bildirişləri, Excel/CSV idxal-ixracı və bank ödəniş sistemləri ilə birbaşa qoşula bilərsiniz.",
  },
  {
    question: "Mövcud işçi məlumatlarını köçürə bilərəmmi?",
    answer: "Bəli, Excel və ya CSV faylından işçi, departament və maaş məlumatlarınızı bir neçə addımda idxal edə bilərsiniz.",
  },
  {
    question: "Məlumatlarım necə qorunur?",
    answer: "Hər təşkilatın məlumatları tam təcrid olunur, rol əsaslı icazələr tətbiq olunur və bütün trafik şifrələnir.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-medium text-(--brand)">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-(--ink) sm:text-4xl">
            Tez-tez verilən suallar
          </h2>
          <p className="mt-3 text-(--ink-muted)">
            Planlar, inteqrasiyalar və Orbit-in iş axınınıza necə uyğunlaşdığı haqqında qısa cavablar.
          </p>
        </div>

        <Accordion className="mt-12">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionPanel>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
