'use client'
import React, { useState, useEffect } from 'react';
import SideBar from '../myComponents/SideBar';
import { Card, CardContent, CardFooter } from '../Components/ui/Card';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { DatabaseRecordType } from '../data';
import { initialDatabaseData } from '../data';
import UserCard from '../myComponents/UserCards';
import { Context } from '../myComponents/Contextprovider';
import { useContext } from 'react';
import NotificationBell from '../myComponents/NotificationBell';




export default function DatabasePage() {
  const [data, setData] = useState<DatabaseRecordType[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<DatabaseRecordType | null>(null);
const context=useContext(Context)
 useEffect(() => {
  const storedData = localStorage.getItem('databaseData');
  if (storedData) {
    try {
      const parsed: DatabaseRecordType[] = JSON.parse(storedData);
      if (Array.isArray(parsed)) {
      
        const mergedData = [...parsed];
        initialDatabaseData.forEach(initialRecord => {
          if (!parsed.some(r => r.id === initialRecord.id)) {
            mergedData.push(initialRecord);
          }
        });
        setData(mergedData);
        localStorage.setItem('databaseData', JSON.stringify(mergedData));
      } else {
        setData(initialDatabaseData);
        localStorage.setItem('databaseData', JSON.stringify(initialDatabaseData));
      }
    } catch (error) {
      console.error("Failed to parse databaseData:", error);
      setData(initialDatabaseData);
      localStorage.setItem('databaseData', JSON.stringify(initialDatabaseData));
    }
  } else {
    setData(initialDatabaseData);
    localStorage.setItem('databaseData', JSON.stringify(initialDatabaseData));
  }
}, [initialDatabaseData]);


  const toggleStatus = (record: DatabaseRecordType) => {
    const newData = data.map(r =>
      r.id === record.id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
    );
    setData(newData);
    localStorage.setItem('databaseData', JSON.stringify(newData));
  };

  const handleDelete = (record: DatabaseRecordType) => {
    const newData = data.filter(r => r.id !== record.id);
    setData(newData);
    localStorage.setItem('databaseData', JSON.stringify(newData));
  };
   const notificationsEnabled=context?.notificationsEnabled
    const setNotificationsEnabled=context?.setNotificationsEnabled
    useEffect(() => {
      if(!notificationsEnabled || !setNotificationsEnabled) return
    const stored = localStorage.getItem('notificationsEnabled');
    if (stored !== null) {
      setNotificationsEnabled(JSON.parse(stored));
    }
  }, [notificationsEnabled]);
  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC] dark:bg-[#0f4b5c] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          <div className='w-full flex flex-row justify-between gap-3 '>
            <div className='mx-auto lg:mx-0'>  <h1 className="text-xl lg:text-4xl">Database Management</h1>
            <p className="text-md lg:text-xl">
             Hi Mohammad View and manage your database tables
            </p></div>
            <div className='hidden lg:flex flex-row gap-3 justify-end text-center'>
                <UserCard/> <NotificationBell enabled={notificationsEnabled}/>
            </div>
           
          </div>
        </div>
      </div>

      <div className="md:pl-[8px] pb-11 lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC] dark:bg-[#0f4b5c] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8">
        {data.map(record => (
          <Card className="w-[350px] h-[220px] overflow-hidden mx-auto rounded-3xl" key={record.id}>
            <CardContent className="w-[300px] overflow-hidden">
              <h2 className="text-2xl font-extrabold px-2 py-1">{record.name}</h2>
              <p className="mt-2 text-md font-bold px-2">Type: {record.type}</p>
              <p className={`mt-2 px-2 font-bold w-20 py-1 rounded-md  ${record.status === 'active' ? 'bg-[#b2f2bb] text-[#056608] p-1 rounded-md' : 'bg-[#f5c2c7] text-[#a10000] p-1 rounded-md'}`}>
                {record.status.toUpperCase()}
              </p>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-2 justify-center">
              <div className="flex gap-2 justify-center mt-2">
                <Dialog open={!!selectedRecord} onOpenChange={(isOpen) => { if (!isOpen) setSelectedRecord(null); }}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedRecord(record)}
                      className="!text-black  !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer bg-[#e9ecef]"
                      variant="ghost"
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  {selectedRecord && (
                    <DialogContent className="backdrop-blur-sm bg-white/90">
                      <DialogTitle>{selectedRecord.name}</DialogTitle>
                      <p className="text-md lg:text-lg mt-4">{selectedRecord.description || 'No description.'}</p>
                      <p className="mt-2 font-bold">Status: {selectedRecord.status.toUpperCase()}</p>
                      <p className="mt-2 font-bold">Type: {selectedRecord.type}</p>
                    </DialogContent>
                  )}
                </Dialog>

                <Button className={` cursor-pointer text-white ${record.status === 'active' ? 'bg-[#e74c3c] hover:bg-red-600' : 'bg-[#2ecc71] hover:bg-green-600'}`} onClick={() => toggleStatus(record)}>
                  {record.status === 'active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button className="bg-[#2d3436] text-white hover:bg-[#4b575a] cursor-pointer" onClick={() => handleDelete(record)}>Delete</Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
