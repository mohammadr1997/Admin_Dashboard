"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Progress from "./Progress";
import { DarkModeContext } from "../myComponents/darkModeProvider";

export default function Statistics() {
  const { darkMode } = useContext(DarkModeContext);

  const getStats = async () => {
    const response = await axios.get("/api/data");
    return response.data.data.statistics;
  };

  const { data } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStats,
  });

  // کلاس‌های رنگی برای دارک مود
  const containerBg = darkMode ? "bg-[#0f4b5c]" : "bg-white";
  const cardBg = darkMode ? "bg-[#189DAC]" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex justify-center w-full p-4 rounded-3xl ${containerBg}`}>
      <div className={`m-5 ${cardBg} w-full flex-col md:h-[18rem] lg:h-full p-4 rounded-3xl`}>
        <h3 className={`text-xl lg:text-3xl text-center font-bold mt-2 mb-2 ${textColor}`}>
          Statistic Website
        </h3>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-center">
          {data &&
            data.map((status: any, key: number) => {
              const valueStatus = Object.values(status);
              const keystatus = Object.keys(status);
              return (
                <div
                  key={key}
                  className="mt-6 h-32 w-28 md:w-32 md:h-32 lg:w-44 lg:h-48 mx-auto"
                >
                  <Progress keyStatus={keystatus} target={+valueStatus} darkMode={darkMode} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
