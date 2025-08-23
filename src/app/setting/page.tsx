"use client";
import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../components/ui/button';
import SideBar from '../myComponents/SideBar';
import { DarkModeContext } from '../myComponents/darkModeProvider';
import { Card, CardContent, CardFooter } from '../Components/ui/Card';
import { initialSettingsData, SettingsType } from '../data';
import UserCard from '../myComponents/UserCards';
import NotificationBell from '../myComponents/NotificationBell';
import { useToast } from '../myComponents/useToast'; 

export default function SettingsPage() {
  const [settingsData, setSettingsData] = useState<SettingsType[]>([]);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { toast } = useToast();

  useEffect(() => {
    const storedData = localStorage.getItem('settingsData');
    if (storedData) {
      try {
        const parsed: SettingsType[] = JSON.parse(storedData);
        const mergedData = [...parsed];
        initialSettingsData.forEach(initialSetting => {
          if (!parsed.some(s => s.id === initialSetting.id)) {
            mergedData.push(initialSetting);
          }
        });
        setSettingsData(mergedData);
        localStorage.setItem('settingsData', JSON.stringify(mergedData));
      } catch {
        setSettingsData(initialSettingsData);
        localStorage.setItem('settingsData', JSON.stringify(initialSettingsData));
      }
    } else {
      setSettingsData(initialSettingsData);
      localStorage.setItem('settingsData', JSON.stringify(initialSettingsData));
    }
  }, [initialSettingsData]);

  const toggleSetting = (setting: SettingsType) => {
    const updated = settingsData.map(s =>
      s.id === setting.id ? { ...s, enabled: !s.enabled } : s
    );
    setSettingsData(updated);
    localStorage.setItem('settingsData', JSON.stringify(updated));

    if (setting.name === 'Dark Mode') {
      toggleDarkMode();
    }

    if (setting.name === 'Enable Notifications') {
       const newStatus = !setting.enabled; 
    localStorage.setItem('notificationsEnabled', JSON.stringify(newStatus));

    if (newStatus) {
      toast({
        title: "Notifications Enabled",
        description: "You will now receive notifications.",
      });
    }
  }
  };

 const notificationsEnabled =
  settingsData.find(s => s.name === "Enable Notifications")?.enabled ??
  JSON.parse(localStorage.getItem('notificationsEnabled') || 'false');

  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC] dark:bg-[#0f4b5c] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          <div className='w-full flex flex-row gap-3 flex-nowrap justify-between'>
            <div className='mx-auto lg:mx-0'>
              <h1 className="text-xl lg:text-4xl">Settings</h1>
              <p className="text-md lg:text-xl">Hi Mohammad Manage application settings</p>
            </div>
            <div className='hidden lg:flex flex-row flex-nowrap gap-3 justify-end text-center'>
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
                <span className={setting.enabled ? 'bg-[#b2f2bb] text-[#056608] p-1 rounded-md' : 'bg-[#f5c2c7] p-1 rounded-md text-[#a10000]'}>
                  {setting.enabled ? 'ENABLED' : 'DISABLED'}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex justify-center mt-3 gap-2 pb-6">
              <Button
                className={setting.enabled ? 'bg-[#e74c3c] cursor-pointer hover:bg-red-600 text-white' : 'bg-[#2ecc71] hover:bg-green-600 text-white cursor-pointer'}
                onClick={() => toggleSetting(setting)}
              >
                {setting.enabled ? 'Disable' : 'Enable'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
