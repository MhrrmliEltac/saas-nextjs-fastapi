import { LogoMark } from "@/components/icons/logo-mark";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24">
      <div className="relative flex size-16 items-center justify-center">
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-primary/15 border-t-primary" />
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <LogoMark className="size-5" />
        </span>
      </div>
      <p className="text-sm font-medium text-muted-foreground">Yüklənir...</p>
    </div>
  );
}
