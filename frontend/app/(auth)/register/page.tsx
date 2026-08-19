"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RegisterInput, registerSchema } from "@/lib/validations/auth";
import { useAuthRegister } from "@/lib/queries/useAuthentication";
import { isAxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mutation = useAuthRegister();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterInput) => {
    try {
      await mutation.mutateAsync(values);
      router.push(searchParams.get("next") ?? "/login");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.detail;
        setError("root", message);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Hesab yaradın</CardTitle>
        <CardDescription>
          30 saniyəyə başlayın, kredit kartı tələb olunmur.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-1.5">
            <Label htmlFor="name">Ad </Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Əli"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Soyad</Label>
            <Input
              id="surname"
              type="text"
              autoComplete="surname"
              placeholder="Vəliyev"
              aria-invalid={!!errors.surname}
              {...register("surname")}
            />
            {errors.surname && (
              <p className="text-sm text-destructive">
                {errors.surname.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">E-poçt</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="siz@sirket.com"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Şifrə</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Qeydiyyatdan keç
          </Button>

          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t-0 bg-transparent p-0 pt-6">
        <p className="text-sm text-muted-foreground">
          Artıq hesabınız var?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Daxil olun
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
