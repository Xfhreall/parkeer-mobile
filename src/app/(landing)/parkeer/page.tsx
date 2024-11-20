"use client";

import TopNav from "@/components/ui/topNav";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import maps from "@/public/assets/maps.svg";
import radar from "@/public/fragments/location.svg";
import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";

interface ParkingSpot {
  id: number;
  available: number;
  total: number;
}

const getRandomCapacity = (total: number) => {
  return Math.floor(Math.random() * (total + 1));
};

const getStatusInfo = (available: number, total: number) => {
  if (available === total) {
    return {
      message: "Yahh parkiran sudah penuh.",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    };
  }
  if (available > total * 0.75) {
    return {
      message: "Parkiran hampir penuh!",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
    };
  }
  return {
    message: "Kuota masih ada, ayo parkir!",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  };
};

export default function Parkeer() {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([
    {
      id: 1,
      available: 157,
      total: 180,
    },
    {
      id: 2,
      available: 145,
      total: 180,
    },
  ]);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setParkingSpots((spots) =>
        spots.map((spot) => ({
          ...spot,
          available: getRandomCapacity(spot.total),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen w-full relative">
      <TopNav />
      <Image src={maps} alt="maps" fill className="object-cover z-0" />

      {/* First parking spot */}
      <div className="absolute top-80">
        <div
          className="relative cursor-pointer"
          onClick={() => setSelectedSpot(parkingSpots[0])}
        >
          <Icon
            icon="mdi:location"
            className="absolute text-red-600 left-4 size-14"
          />
          <Image src={radar} alt="radar" className="object-cover" />
        </div>
      </div>

      {/* Second parking spot */}
      <div className="absolute top-[340px] right-0">
        <div
          className="relative cursor-pointer"
          onClick={() => setSelectedSpot(parkingSpots[1])}
        >
          <Icon
            icon="mdi:location"
            className="absolute text-red-600 left-4 size-14"
          />
          <Image src={radar} alt="radar" className="object-cover" />
        </div>
      </div>

      {selectedSpot && (
        <div
          className="fixed inset-0 bg-black/20 flex items-end justify-center p-4 z-50"
          onClick={() => setSelectedSpot(null)}
        >
          <Card
            className="w-full max-w-md bg-white rounded-3xl px-4 pb-8 pt-4 mb-24 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              icon="pepicons-pop:line-x"
              className="mx-auto scale-x-[8] scale-y-150 text-neutral-400"
            />
            <div
              className={`${
                getStatusInfo(selectedSpot.available, selectedSpot.total)
                  .bgColor
              } 
                rounded-xl p-3 text-center font-normal ${
                  getStatusInfo(selectedSpot.available, selectedSpot.total)
                    .textColor
                }`}
            >
              {
                getStatusInfo(selectedSpot.available, selectedSpot.total)
                  .message
              }
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-lg text-neutral-950">Kapasitas</p>
                <p className="text-2xl font-bold">
                  {selectedSpot.available}/{selectedSpot.total}
                </p>
              </div>
              <div className="bg-blueLight/[16%] p-3 rounded-xl grid items-center justify-center h-16 w-16">
                <Icon
                  icon="fa-solid:motorcycle"
                  className="size-6 text-blue mx-auto"
                />
                <p className="text-xs text-blue">Motor</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </section>
  );
}
