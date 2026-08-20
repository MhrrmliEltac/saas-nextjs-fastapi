"use client";

import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAzPhoneNumber } from "@/lib/utils";

export function PhoneNumberField<TFieldValues extends FieldValues>({
  control,
  name,
  id = "phone_number",
  error,
}: {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  id?: string;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>Telefon</Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const digits: string = field.value ?? "";

          return (
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-sm text-muted-foreground">
                +994
              </span>
              <Input
                id={id}
                inputMode="numeric"
                placeholder="51 767 37 68"
                aria-invalid={!!error}
                className="pl-12"
                value={formatAzPhoneNumber(digits)}
                onChange={(event) => {
                  const nextDigits = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 9);
                  field.onChange(nextDigits);
                }}
                onBlur={field.onBlur}
              />
            </div>
          );
        }}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
