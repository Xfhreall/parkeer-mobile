"use client";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import logo from "@/public/assets/logoNotif.svg";
import Image from "next/image";

const notifData = [
  {
    content: "Parkiran Edutech sudah hampir penuh. Ayo segera parkir!",
    time: "Sekarang",
  },
  {
    content: "Kamu sudah lama tidak menggunakan Parkeer. Ayo parkir!",
    time: "48 menit yang lalu",
  },
  {
    content: "Parkiran Gedung G sudah hampir penuh. Ayo segera parkir!",
    time: "2 jam yang lalu",
  },
  {
    content: "Parkiran Edutech sedang sepi, nih. Kamu yakin tidak mau parkir?",
    time: "2 jam yang lalu",
  },
  {
    content: "Waduh! Parkir sudah penuh. Silakan cari tempat parkir lain.",
    time: "2 jam yang lalu",
  },
  {
    content: "Kamu sudah lama tidak menggunakan Parkeer. Ayo parkir!",
    time: "2 jam yang lalu",
  },
  {
    content: "Parkiran Edutech sedang sepi, nih. Kamu yakin tidak mau parkir?",
    time: "2 jam yang lalu",
  },
  {
    content: "Waduh! Parkir sudah penuh. Silakan cari tempat parkir lain.",
    time: "2 jam yang lalu",
  },
  {
    content: "Kamu sudah lama tidak menggunakan Parkeer. Ayo parkir!",
    time: "2 jam yang lalu",
  },
];

const Notif = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="min-h-screen w-full px-8">
      <div className="flex items-center justify-center p-4 relative h-16">
        <button onClick={handleBack} className="absolute left-0">
          <ChevronLeft size={30} />
        </button>
        <h2 className="font-bold">Notifikasi</h2>
      </div>
      {notifData.map((data, index) => (
        <div className="flex w-full space-x-4 border-b py-4" key={data.content}>
          <Image
            src={logo}
            sizes="52"
            alt="logo parkeer"
            className="object-contain rounded-full"
          />
          <div className="space-y-1">
            <p
              className={`text-sm ${
                index === 0 ? "text-blue" : "text-neutral-500"
              }`}
            >
              {data.content}
            </p>
            <p className="text-neutral-400 text-xs">{data.time}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Notif;
