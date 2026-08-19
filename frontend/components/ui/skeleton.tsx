import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "skeleton-shimmer relative overflow-hidden rounded-md bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
