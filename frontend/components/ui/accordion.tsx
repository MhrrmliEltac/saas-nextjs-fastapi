"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-(--hairline)", className)}
      {...props}
    />
  )
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left text-base font-medium text-(--ink) transition-colors hover:text-(--brand)",
          className
        )}
        {...props}
      >
        {children}
        <Plus className="size-4 shrink-0 text-(--ink-faint) transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45 group-aria-expanded/accordion-trigger:text-(--brand)" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionPanel({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      className={cn(
        "h-[var(--accordion-panel-height)] overflow-hidden text-sm leading-6 text-(--ink-muted) transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-6 pr-10">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel }
