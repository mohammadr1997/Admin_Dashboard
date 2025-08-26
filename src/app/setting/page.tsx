"use client";
import React, { useState, useEffect, useContext } from "react";
import { Button } from "../../components/ui/button";

import { Context } from "../myComponents/Contextprovider";
import SideBar from "../myComponents/SideBar";
import { DarkModeContext } from "../myComponents/darkModeProvider";
import { Card, CardContent, CardFooter } from "../Components/ui/Card";
import { initialSettingsData, SettingsType } from "../data";
import UserCard from "../myComponents/UserCards";
import NotificationBell from "../myComponents/NotificationBell";
import { useToast } from "../myComponents/useToast";

export default function SettingsPage() {
  const context=useContext(Context)
  const [settingsData, setSettingsData] = useState<SettingsType[]>([]);
   const notificationsEnabled=context?.notificationsEnabled
  const setNotificationsEnabled=context?.setNotificationsEnabled
  // const [locationAccess, setLocationAccess] = useState(false);
  // const [emailAlert, setEmailAlert] = useState(false);
  // const [betaFeature, setBetaFeature] = useState(false);
  // const [dataSync, setDataSync] = useState(false);

  const { toggleDarkMode } = useContext(DarkModeContext);
  const { toast } = useToast();

  useEffect(() => {
    const loadSettings = () => {
      const storedData = localStorage.getItem("settingsData");
      if (storedData) {
        try {
          const parsed: SettingsType[] = JSON.parse(storedData);
          const mergedData = [...parsed];
          initialSettingsData.forEach((initialSetting) => {
            if (!parsed.some((s) => s.id === initialSetting.id)) {
              mergedData.push(initialSetting);
            }
          });
          setSettingsData(mergedData);
          localStorage.setItem("settingsData", JSON.stringify(mergedData));
        } catch {
          setSettingsData(initialSettingsData);
          localStorage.setItem(
            "settingsData",
            JSON.stringify(initialSettingsData)
          );
        }
      } else {
        setSettingsData(initialSettingsData);
        localStorage.setItem(
          "settingsData",
          JSON.stringify(initialSettingsData)
        );
      }
    };

    loadSettings();
      if(!notificationsEnabled || !setNotificationsEnabled) return
   
    setNotificationsEnabled(JSON.parse(localStorage.getItem("notificationsEnabled") || "false"));
    setLocationAccess(JSON.parse(localStorage.getItem("locationAccess") || "false"));
    setEmailAlert(JSON.parse(localStorage.getItem("emailAlert") || "false"));
    setBetaFeature(JSON.parse(localStorage.getItem("betaFeature") || "false"));
    setDataSync(JSON.parse(localStorage.getItem("dataSync") || "false"));

    
    const handleStorageChange = (event: StorageEvent) => {
      if (!event.key) return;
      const value = JSON.parse(event.newValue || "false");

      switch(event.key) {
        case "settingsData":
          setSettingsData(JSON.parse(event.newValue!));
          break;
        case "notificationsEnabled":
          setNotificationsEnabled(value);
          break;
        case "locationAccess":
          setLocationAccess(value);
          break;
        case "emailAlert":
          setEmailAlert(value);
          break;
        case "betaFeature":
          setBetaFeature(value);
          break;
        case "dataSync":
          setDataSync(value);
          break;
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
    useEffect(() => {
        if(!notificationsEnabled || !setNotificationsEnabled) return
      const stored = localStorage.getItem('notificationsEnabled');
      if (stored !== null) {
        setNotificationsEnabled(JSON.parse(stored));
      }
    }, [notificationsEnabled]);

  const toggleSetting = (setting: SettingsType) => {
    const updated = settingsData.map((s) =>
      s.id === setting.id ? { ...s, enabled: !s.enabled } : s
    );
    setSettingsData(updated);
    localStorage.setItem("settingsData", JSON.stringify(updated));

    const newStatus = !setting.enabled;

    switch(setting.name) {
      case "Dark Mode":
        toggleDarkMode();
        break;
      case "Enable Notifications":
        setNotificationsEnabled(newStatus);
        localStorage.setItem("notificationsEnabled", JSON.stringify(newStatus));
        toast({
          title: newStatus ? "Notifications Enabled" : "Notifications Disabled",
          description: newStatus ? "Notifications for users are now enabled." : "Notifications for users are now disabled."
        });
        break;
      case "Location Access":
        setLocationAccess(newStatus);
        localStorage.setItem("locationAccess", JSON.stringify(newStatus));
        toast({
          title: newStatus ? "Location Access Enabled" : "Location Access Disabled",
          description: "Location feature for users is now " + (newStatus ? "enabled." : "disabled.")
        });
        break;
      case "Email Alerts":
        setEmailAlert(newStatus);
        localStorage.setItem("emailAlert", JSON.stringify(newStatus));
        toast({
          title: newStatus ? "Email Alerts Enabled" : "Email Alerts Disabled",
          description: "Email alert feature for users is now " + (newStatus ? "enabled." : "disabled.")
        });
        break;
      case "Beta Feature":
        setBetaFeature(newStatus);
        localStorage.setItem("betaFeature", JSON.stringify(newStatus));
        toast({
          title: newStatus ? "Beta Feature Enabled" : "Beta Feature Disabled",
          description: newStatus ? "Beta feature is now active for testing." : "Beta feature is now inactive."
        });
        break;
      case "Data Sync":
        setDataSync(newStatus);
        localStorage.setItem("dataSync", JSON.stringify(newStatus));
        toast({
          title: newStatus ? "Data Sync Enabled" : "Data Sync Disabled",
          description: newStatus ? "Data Sync for users is now enabled." : "Data Sync for users is now disabled."
        });
        break;
    }
  };

  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC] dark:bg-[#0f4b5c] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          <div className="w-full flex flex-row gap-3 flex-nowrap justify-between">
            <div className="mx-auto lg:mx-0">
              <h1 className="text-xl lg:text-4xl">Settings</h1>
              <p className="text-md lg:text-xl">Hi Mohammad, manage application settings</p>
            </div>
            <div className="hidden lg:flex flex-row flex-nowrap gap-3 justify-end text-center">
              <UserCard />
              <NotificationBell enabled={notificationsEnabled} />
            </div>
          </div>
        </div>
      </div>

      <div className="md:pl-[8px] pb-11 lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC] dark:bg-[#0f4b5c] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8">
        {settingsData.map((setting) => (
          <Card className="w-[350px] h-[190px] overflow-hidden mx-auto rounded-3xl" key={setting.id}>
            <CardContent className="w-[300px] h-30 overflow-hidden">
              <h2 className="text-2xl font-extrabold px-2 py-1">{setting.name}</h2>
              <p className="mt-2 text-sm md:text-md md:text-lg font-bold p-1">
                <span className={setting.enabled ? "bg-[#b2f2bb] text-[#056608] p-1 rounded-md" : "bg-[#f5c2c7] p-1 rounded-md text-[#a10000]"}>
                  {setting.enabled ? "ENABLED" : "DISABLED"}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-center mt-3 gap-2 pb-6">
              <Button
                className={setting.enabled ? "bg-[#e74c3c] cursor-pointer hover:bg-red-600 text-white" : "bg-[#2ecc71] hover:bg-green-600 text-white cursor-pointer"}
                onClick={() => toggleSetting(setting)}
              >
                {setting.enabled ? "Disable" : "Enable"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
