"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenLine, User, Mail, FormInput } from "lucide-react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import user from "@/public/assets/user.png";

interface UserData {
  fullName: string;
  email: string;
  nim: string;
  vehicleType?: string;
  vehicleNumber?: string;
}

export default function Component() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen w-full grid">
      <div className="w-full bg-blue-500 bg-blueLight rounded-b-[36px] h-48 flex relative">
        <h1 className="text-base font-bold text-neutral-950 mx-auto mt-12">
          Profil Saya
        </h1>
        <span className="w-[92px] h-[92px] border-2 border-blue rounded-full absolute -bottom-10 left-8">
          <Image src={user} alt="user" className="object-cover" />
        </span>
        <Button className="absolute bg-blue -bottom-4 right-8 text-xs rounded-lg font-light pr-9">
          Edit Profile
          <PenLine size={2} className="scale-75 absolute right-4" />
        </Button>
      </div>
      <div className="mx-6 h-2/3 space-y-5 pb-40">
        <div className="mt-14">
          <h2 className="text-xl font-bold">{userData?.fullName}</h2>
          <p className="text-sm">{userData?.email}</p>
        </div>
        <Card className="rounded-xl shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nama lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 h-4 w-4 top-2.5 font-light" />
                  <Input
                    value={userData?.fullName || "Belum ditambahkan"}
                    readOnly
                    className="bg-gray-50 text-xs pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Alamat email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 h-4 w-4 top-2.5 font-light" />
                  <Input
                    value={userData?.email || "Belum ditambahkan"}
                    readOnly
                    className="bg-gray-50 text-xs pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Jenis kendaraan</Label>
                <div className="relative">
                  <Icon
                    icon="fa-solid:motorcycle"
                    className="absolute w-4 h-4 left-3 top-2.5"
                  />
                  <Input
                    value={userData?.vehicleType || "Belum ditambahkan"}
                    readOnly
                    className="bg-gray-50 text-xs pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nomor kendaraan</Label>
                <div className="relative">
                  <FormInput className="absolute w-4 h-4 top-2.5 left-3" />
                  <Input
                    value={userData?.vehicleNumber || "Belum ditambahkan"}
                    readOnly
                    className="bg-gray-50 text-xs pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
