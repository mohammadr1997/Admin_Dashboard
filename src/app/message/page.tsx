'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import SideBar from '../myComponents/SideBar';
import { Card, CardContent, CardFooter } from '../Components/ui/Card';
import { initialMessagesData, MessageType } from '../data';
import UserCard from '../myComponents/UserCards';
import { Context } from '../myComponents/ContextProvider';
import { useContext } from 'react';
import NotificationBell from '../myComponents/NotificationBell';


export default function MessagesPage() {
  
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);

 
  useEffect(() => {
    const storedData = localStorage.getItem('messagesData');
    if (storedData) {
      try {
        const parsed: MessageType[] = JSON.parse(storedData);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          return;
        }
      } catch (error) {
        console.error("Failed to parse messagesData:", error);
      }
    }
    setMessages(initialMessagesData);
    localStorage.setItem('messagesData', JSON.stringify(initialMessagesData));
  }, [initialMessagesData]);

 
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('messagesData', JSON.stringify(messages));
    }
  }, [messages]);

  const markAsRead = (msg: MessageType) => {
    setMessages(prev =>
      prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m)
    );
  };

  const deleteMessage = (msg: MessageType) => {
    setMessages(prev => prev.filter(m => m.id !== msg.id));
  };
  const context=useContext(Context)
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
          <div className='flex flex-row justify-between gap-3  w-full '>
            <div className='mx-auto lg:mx-0'>
               <h1 className="text-xl lg:text-4xl">Messages Management</h1>
            <p className="text-md lg:text-xl">
             Hi Mohammad Review and manage user messages
            </p>
            </div>
            <div className="hidden lg:flex flex-row text-center flex-nowrap gap-3 justify-end">
              <UserCard/>  <NotificationBell enabled={notificationsEnabled} />
            </div>
           
          </div>
        </div>
      </div>

      <div className="md:pl-[8px] pb-11 lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC] dark:bg-[#0f4b5c] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8">
        {messages.map(msg => (
          <Card className="w-[350px] h-[280px] overflow-hidden mx-auto rounded-3xl" key={msg.id}>
            <CardContent className="w-[300px] overflow-hidden">
              <h2 className="text-2xl font-extrabold px-2 py-1">{msg.sender}</h2>
              <p className="mt-2 text-sm md:text-md md:text-lg font-bold p-1">
                <span className={msg.status === 'unread' ? 'bg-[#f6e4a5] text-[#444] p-1 rounded-md' : 'bg-[#b2f2bb] text-[#056608] p-1 rounded-md'}>
                  {msg.status?.toUpperCase()}
                </span>
              </p>
              <p className="mt-2 text-md lg:text-lg px-2 h-24">
                {msg.text.length > 45 ? msg.text.substring(0, 45) + '...' : msg.text}
              </p>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-2 pb-3">
              <div className="flex gap-2 justify-center mt-3 cursor-pointer pb-4">
                <Dialog open={!!selectedMessage} onOpenChange={(isOpen) => { if (!isOpen) setSelectedMessage(null); }}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedMessage(msg)}
                      className="bg-[#a5a6a6] cursor-pointer dark:text-white hover:!bg-[#b9babb] text-black   !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray "
                      variant="ghost"
                    >
                      View Message
                    </Button>
                  </DialogTrigger>
                  {selectedMessage && (
                    <DialogContent className="backdrop-blur-sm bg-white/90">
                      <DialogTitle>{selectedMessage.sender}</DialogTitle>
                      <p className="text-md lg:text-lg mt-4">{selectedMessage.text}</p>
                    </DialogContent>
                  )}
                </Dialog>

                {msg.status === 'unread' ? (
                  <Button className="bg-[#2ecc71] cursor-pointer hover:bg-green-600 text-white" onClick={() => markAsRead(msg)}>Mark as Read</Button>
                ) : (
                  <Button className="bg-[#2d3436] text-white cursor-pointer hover:bg-[#4b575a]" onClick={() => deleteMessage(msg)}>Delete</Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
