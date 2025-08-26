"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import Progress from "./Progress";
import { DarkModeContext } from "../myComponents/darkModeProvider";

interface StatusType {
  totalVisitors: string;
  todaysVisitors: string;
  todaysHits: string;
  totalHits: string;
}

export default function Statistics() {
  const contextDark = useContext(DarkModeContext);
  if (!contextDark) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }
  const { darkMode } = contextDark;

  const getStats = async () => {
    const response = await axios.get("/api/data");
    return response.data.data.statistics;
  };

  const { data } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStats,
  });

  const containerBg = darkMode ? "bg-[#0f4b5c]" : "bg-white";
  const cardBg = darkMode ? "bg-[#189DAC]" : "bg-white";
  const textColor = darkMode ? "text-white" : "text-black";

  return (
    <div className={`flex justify-center w-full p-4 rounded-3xl ${containerBg}`}>
      <div
        className={`m-5 ${cardBg} w-full flex-col md:h-[18rem] lg:h-full p-4 rounded-3xl`}
      >
        <h3
          className={`text-xl lg:text-3xl text-center font-bold mt-2 mb-2 ${textColor}`}
        >
          Statistic Website
        </h3>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-8 justify-center">
          {data &&
            data.map((status: StatusType, key: number) =>
              Object.entries(status).map(([keyStatus, valueStatus], idx) => (
                <div
                  key={`${key}-${idx}`}
                  className="mt-6 h-32 w-28 md:w-32 md:h-32 lg:w-44 lg:h-48 mx-auto"
                >
                  <Progress
                    keyStatus={keyStatus}
                    target={+valueStatus}
                    darkMode={darkMode}
                  />
                </div>
              ))
            )}
        </div>
      </div>
    </div>
  );
}
