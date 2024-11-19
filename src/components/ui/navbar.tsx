"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinned, MessageSquareMoreIcon, UserCogIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Parkeer", icon: MapPinned, href: "/parkeer" },
    { name: "Lapor", icon: MessageSquareMoreIcon, href: "/lapor" },
    { name: "Saya", icon: UserCogIcon, href: "/saya" },
  ];

  return (
    <nav className="fixed bottom-0 w-full h-20 bg-white rounded-t-3xl flex justify-center items-center shadow-[0_-6px_6px_-1px_rgba(0,0,0,0.1)]">
      <ul className="flex gap-24 justify-center w-full text-xs">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (pathname === "/" && item.href === "/parkeer");
          return (
            <li key={item.name}>
              <Link href={item.href}>
                <div
                  className={`grid items-center justify-center gap-1 ${
                    isActive ? "text-blue" : "text-neutral-300"
                  }`}
                >
                  <item.icon size={26} className="mx-auto" />
                  <p>{item.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
