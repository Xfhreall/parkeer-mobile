"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import TopNav from "@/components/ui/topNav";
import { useState } from "react";

export default function Component() {
  const [report, setReport] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report submitted:", report);
    setReport("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="px-8 pt-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[#2F2F2F]">
              Apa masalah Anda hari ini ?
            </label>
            <Card className="mt-2 rounded-xl">
              <Textarea
                placeholder="Parkiran Edutech aduh ada aja yang parkir gak bener, ini gimana sih!"
                className="border-0 resize-none h-32 shadow-xl text-sm"
                value={report}
                onChange={(e) => setReport(e.target.value)}
              />
            </Card>
          </div>

          <Button
            variant="outline"
            type="submit"
            className="w-full bg-blue h-14 rounded-lg text-white"
          >
            Lapor
          </Button>
        </form>

        <div className="space-y-3 py-4">
          <h2 className="font-bold text-xl">Sering Dilaporkan</h2>
          <Card className="p-4 border-blueLight rounded-md">
            <h3 className="font-medium mb-2">Pertanyaan</h3>
            <p className="text-xs text-gray-600">
              Jawaban siapa salah pusing hgt ujian tugas ini nggaain bikin
              aplikasi sih ya Allah ya Allah
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
