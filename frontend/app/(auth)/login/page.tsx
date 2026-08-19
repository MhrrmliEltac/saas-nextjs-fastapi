"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { type LoginInput, loginSchema } from "@/lib/validations/auth";
import { useAuthLogin } from "@/lib/queries/useAuthentication";
import { isAxiosError } from "axios";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mutation = useAuthLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginInput) => {
    try {
      await mutation.mutateAsync(values);
      router.push(searchParams.get("next") ?? "/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        setError("root", {
          message: error.response?.data.detail,
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Hesabınıza daxil olun</CardTitle>
        <CardDescription>
          Xoş gəldiniz! Məlumatlarınızı daxil edin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
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
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password">Şifrə</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              {...register("password")}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Daxil ol
          </Button>

          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t-0 bg-transparent p-0 py-6">
        <p className="text-sm text-muted-foreground">
          Hesabınız yoxdur?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground hover:underline"
          >
            Qeydiyyatdan keçin
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
