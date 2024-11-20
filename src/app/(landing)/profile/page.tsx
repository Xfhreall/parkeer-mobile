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
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setEditedData(parsedData);
    }
  }, []);

  const handleSave = () => {
    if (editedData) {
      localStorage.setItem("registrationData", JSON.stringify(editedData));
      setUserData(editedData);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="min-h-screen w-full grid bg-[#FAFAFF] pb-40">
        <div className="w-full bg-blue-500 bg-blueLight rounded-b-[36px] h-48 flex relative">
          <h1 className="text-base font-bold text-neutral-950 mx-auto mt-12">
            Profil Saya
          </h1>
          <span className="w-[92px] h-[92px] border-2 border-blue rounded-full absolute -bottom-10 left-1/2 -translate-x-1/2">
            <Image
              src={user}
              alt="user"
              className="object-cover rounded-full"
            />
          </span>
        </div>
        <Card className="mx-6 mt-16 pt-4 border-neutral-300">
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label className="text-sm">Nama lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 h-4 w-4 top-3 font-light" />
                <Input
                  value={editedData?.fullName || ""}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev!,
                      fullName: e.target.value,
                    }))
                  }
                  className="pl-10 text-xs py-5 border-neutral-400 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Alamat email</Label>
              <div className="relative">
                <Mail className="absolute left-3 h-4 w-4 top-3 font-light" />
                <Input
                  value={editedData?.email || ""}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev!,
                      email: e.target.value,
                    }))
                  }
                  className="pl-10 text-xs py-5 border-neutral-400 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Jenis kendaraan</Label>
              <div className="relative">
                <Icon
                  icon="fa-solid:motorcycle"
                  className="absolute w-4 h-4 left-3 top-3"
                />
                <Input
                  value={editedData?.vehicleType || ""}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev!,
                      vehicleType: e.target.value,
                    }))
                  }
                  className="pl-10 text-xs py-5 border-neutral-400 rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Nomor kendaraan</Label>
              <div className="relative">
                <FormInput className="absolute w-4 h-4 top-3 left-3" />
                <Input
                  value={editedData?.vehicleNumber || ""}
                  onChange={(e) =>
                    setEditedData((prev) => ({
                      ...prev!,
                      vehicleNumber: e.target.value,
                    }))
                  }
                  className="pl-10 text-xs py-5 border-neutral-400 rounded-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 flex">
          <Button
            variant="secondary"
            className="h-14 bg-blue rounded-xl text-neutral-200 w-full mx-6"
            onClick={handleSave}
          >
            Simpan
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full grid bg-[#FAFAFF]">
      <div className="w-full bg-blue-500 bg-blueLight rounded-b-[36px] h-48 flex relative">
        <h1 className="text-base font-bold text-neutral-950 mx-auto mt-12">
          Profil Saya
        </h1>
        <span className="w-[92px] h-[92px] border-2 border-blue rounded-full absolute -bottom-10 left-8">
          <Image src={user} alt="user" className="object-cover" />
        </span>
        <Button
          variant="outline"
          className="absolute bg-blue text-neutral-200 border-0 -bottom-4 right-8 text-xs rounded-lg font-light pr-6"
          onClick={() => setIsEditing(true)}
        >
          Edit Profil
          <PenLine size={2} className="scale-75 absolute right-2" />
        </Button>
      </div>
      <div className="mx-6 h-2/3 space-y-5 pb-40">
        <div className="mt-14">
          <h2 className="text-xl font-bold">{userData?.fullName}</h2>
          <p className="text-sm">{userData?.email}</p>
        </div>
        <Card className="rounded-xl shadow-lg border-2 border-neutral-300">
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="space-y-1">
                <Label className="text-sm">Nama lengkap</Label>
                <div className="relative">
                  <User className="absolute left-3 h-4 w-4 top-3 font-light" />
                  <Input
                    value={userData?.fullName || "Belum ditambahkan"}
                    readOnly
                    className="text-xs pl-10 border-neutral-400 py-5 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Alamat email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 h-4 w-4 top-3 font-light" />
                  <Input
                    value={userData?.email || "Belum ditambahkan"}
                    readOnly
                    className="text-xs pl-10 border-neutral-400 py-5 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Jenis kendaraan</Label>
                <div className="relative">
                  <Icon
                    icon="fa-solid:motorcycle"
                    className="absolute w-4 h-4 left-3 top-3"
                  />
                  <Input
                    value={userData?.vehicleType || "Belum ditambahkan"}
                    readOnly
                    className="text-xs pl-10 border-neutral-400 py-5 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-sm">Nomor kendaraan</Label>
                <div className="relative">
                  <FormInput className="absolute w-4 h-4 top-3 left-3" />
                  <Input
                    value={userData?.vehicleNumber || "Belum ditambahkan"}
                    readOnly
                    className="text-xs pl-10 border-neutral-400 py-5 rounded-lg"
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
