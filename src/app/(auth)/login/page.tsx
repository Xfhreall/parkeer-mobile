"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import logo from "@/public/assets/logo.svg";
import google from "@/public/assets/google.svg";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email("Email tidak valid")
    .endsWith("ub.ac.id", "Masukkan email UB anda"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { formState } = form;
  const isValid = formState.isValid;
  const router = useRouter();

  function onSubmit(values: FormValues) {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (
        parsedData.email === values.email &&
        parsedData.password === values.password
      ) {
        router.push("/parkeer");
        setErrorMessage("");
        console.log("Login successful");
      } else {
        setLoginStatus("error");
        setErrorMessage("Email atau password salah");
      }
    } else {
      setLoginStatus("error");
      setErrorMessage("Akun tidak terdaftar");
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col items-center justify-center mx-6 relative">
      <motion.div
        className="w-full max-w-sm space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex justify-center -translate-y-16">
          <Image
            src={logo}
            alt="Parkeer Logo"
            width={120}
            height={120}
            className="h-10 w-auto"
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="h-5 w-5 absolute left-3 top-[14px] text-gray-400 transition-colors peer-focus:text-black" />
                      <Input
                        placeholder="Masukkan email UB"
                        type="email"
                        className="rounded-lg border-gray-200 pl-10 py-6 text-xs peer"
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
                      <Lock className="h-5 w-5 absolute left-3 top-[14px] text-gray-400 transition-colors peer-focus:text-black" />
                      <Input
                        placeholder="Masukkan kata sandi"
                        type={showPassword ? "text" : "password"}
                        className="rounded-lg border-gray-200 pl-10 pr-10 py-6 text-xs peer"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-[14px] text-gray-400 hover:text-black"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loginStatus === "success" && (
              <p className="text-green-500 text-sm mt-2">Login berhasil!</p>
            )}
            {loginStatus === "error" && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-gray-500 hover:text-gray-700 font-extralight"
              >
                Lupa kata sandi?
              </Link>
            </div>
            <Button
              type="submit"
              variant="secondary"
              className={`w-full py-[26px] text-gray-800 font-light disabled:opacity-50 disabled:cursor-not-allowed ${
                isValid ? "bg-blue text-neutral-200" : "bg-gray-500 text-white"
              }`}
              disabled={!isValid}
            >
              Masuk
            </Button>
          </form>
        </Form>
        <div className="space-y-4">
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-neutral-400 font-light">
                Atau
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full relative py-6 text-neutral-600 rounded-xl font-light border-neutral-800 border"
            onClick={() => alert("coming soon...")}
          >
            <Image
              src={google}
              alt="Google Logo"
              width={20}
              height={20}
              className="absolute left-6 h-6 w-6"
            />
            Masuk dengan Google
          </Button>
        </div>
        <div className="text-center absolute text-sm bottom-10 right-0 left-0">
          <span className="text-gray-500">Belum punya akun? </span>
          <Link href="/register" className="underline text-blue">
            Daftar
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
