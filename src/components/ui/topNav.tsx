import React from "react";
import Image from "next/image";
import user from "@/public/assets/user.png";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface UserData {
  fullName: string;
  email: string;
}
const TopNav = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const storedData = localStorage.getItem("registrationData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  const router = useRouter();
  return (
    <div className="p-4 flex h-32 shadow-md items-end justify-between bg-white z-50 sticky">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border-blue border-2">
          <Image
            src={user}
            alt="Profile"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="-space-y-1">
          <p className="text-xs">Halo</p>
          <p className="font-bold text-blue">{userData?.fullName || "User"}</p>
        </div>
      </div>

      <div className="mr-4">
        <Icon
          icon="mdi:bell-badge"
          width={25}
          height={30}
          onClick={() => router.push("/notif")}
          className=" text-blue"
        />
      </div>
    </div>
  );
};

export default TopNav;
