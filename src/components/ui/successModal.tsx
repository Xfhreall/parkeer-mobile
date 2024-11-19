"use client";
import React from "react";
import { useState } from "react";
import { Check } from "lucide-react";

export default function SuccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalView = () => {
    console.log(1);
    setIsOpen(!isOpen);
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
      onClick={() => console.log(2)}
    >
      <main className="w-[300px] h-[196px] bg-white rounded-[15px] flex items-center justify-center flex-col relative shadow-2xl shadow-white">
        <span className="w-[55px] h-[55px] bg-success absolute rounded-full flex items-center justify-center -top-6">
          <Check className="w-8 h-8 text-white" />
        </span>
        <div className="text-center h-3/4 space-y-2">
          <h2 className="mt-11 font-bold text-success">Berhasil!</h2>
          <p className="text-gray-700 text-xs">Akun anda berhasil dibuat.</p>
        </div>
        <div className="w-full border-t-2 grid h-1/4">
          <button className="text-sm" onClick={modalView}>
            Oke
          </button>
        </div>
      </main>
    </div>
  );
}
