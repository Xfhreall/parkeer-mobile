"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, IdCard } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SuccessModal from "@/components/ui/successModal";

const formSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Nama harus diisi minimal 2 karakter.",
    }),
    nim: z.string().min(5, {
      message: "NIM harus diisi dengan benar.",
    }),
    email: z.string().email({
      message: "Email UB harus diisi dengan benar.",
    }),
    password: z.string().min(8, {
      message: "Kata sandi minimal 8 karakter.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      nim: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { formState } = form;
  const isValid = formState.isValid;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setShowSuccessModal(true);
  }

  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        router.push("/parkeer");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, router]);

  return (
    <div className="h-[100dvh] flex justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="grid gap-6">
          <h1 className="text-xl font-bold">Mari menjadi bagian Parkeer!</h1>
          <p className="text-sm text-gray-500">Isi data dengan benar ya</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative h-auto w-full">
                      <User className="absolute left-3 top-[15px] h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Nama lengkap"
                        className="rounded-xl border-2 pl-10 py-6 text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-[15px] h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="NIM"
                        className="rounded-xl border-2 pl-10 py-6 text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-[15px] h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Email UB"
                        className="rounded-xl border-2 pl-10 py-6 text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-[15px] h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Kata sandi"
                        className="rounded-xl border-2 pl-10 py-6 text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-[15px] h-5 w-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Konfirmasi kata sandi"
                        className="rounded-xl border-2 pl-10 py-6 text-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-auto pt-20">
              <Button
                type="submit"
                variant="secondary"
                className={`w-full py-[26px] rounded-xl text-gray-800 font-light disabled:opacity-50 disabled:cursor-not-allowed ${
                  isValid
                    ? "bg-blue text-neutral-200"
                    : "bg-blue text-neutral-200"
                }`}
              >
                Daftar
              </Button>
            </div>
          </form>
        </Form>
        <div className="text-center text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue underline">
            Masuk
          </Link>
        </div>
      </div>
      {showSuccessModal && <SuccessModal />}
    </div>
  );
}
