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

export default function MessagesPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
    const [changedMessages,setChangedMessages]=useState<MessageType[]>([])
useEffect(() => {
  const storedData = localStorage.getItem('messagesData');
  let finalData: MessageType[] = initialMessagesData;
  let changedMessages: MessageType[] = [];

  if (storedData) {
    try {
      const parsed: MessageType[] = JSON.parse(storedData);

      if (Array.isArray(parsed)) {
        // مقایسه با initialMessagesData
        changedMessages = initialMessagesData.filter(initMsg => {
          const storedMsg = parsed.find(p => p.id === initMsg.id);
          // اگر پیام جدید است یا متن آن تغییر کرده
          return !storedMsg || storedMsg.text !== initMsg.text || storedMsg.status !== initMsg.status;
        });

        // داده نهایی: ترکیب داده‌های ذخیره‌شده با پیام‌های جدید
        finalData = [...parsed];
        changedMessages.forEach(msg => {
          if (!parsed.find(p => p.id === msg.id)) {
            finalData.push(msg);
          } else {
            // پیام موجود ولی تغییر کرده → جایگزین می‌کنیم
            finalData = finalData.map(p => p.id === msg.id ? msg : p);
          }
        });
      } else {
        finalData = initialMessagesData;
        changedMessages = initialMessagesData;
      }
    } catch (error) {
      console.error("Failed to parse messagesData:", error);
      finalData = initialMessagesData;
      changedMessages = initialMessagesData;
    }
  } else {
    changedMessages = initialMessagesData;
  }

  setMessages(finalData);
  setChangedMessages(changedMessages); // state جدید برای نمایش پیام‌های تغییر یافته
  localStorage.setItem('messagesData', JSON.stringify(finalData));
}, [initialMessagesData]);

  const markAsRead = (msg: MessageType) => {
    const updated = messages.map(m => m.id === msg.id ? { ...m, status: 'read' } : m);
    setMessages(updated);
    localStorage.setItem('messagesData', JSON.stringify(updated));
  };

  const deleteMessage = (msg: MessageType) => {
    const updated = messages.filter(m => m.id !== msg.id);
    setMessages(updated);
    localStorage.setItem('messagesData', JSON.stringify(updated));
  };

  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          <div className='mx-auto'>
            <h1 className="text-xl lg:text-4xl">Messages Management</h1>
            <p className="text-md lg:text-xl">
              Review and manage user messages
            </p>
          </div>
        </div>
      </div>

      <div className="md:pl-[8px] pb-11 lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8">
        {messages.map(msg => (
          <Card className="w-[350px] h-[280px] overflow-hidden mx-auto rounded-3xl" key={msg.id}>
            <CardContent className="w-[300px] overflow-hidden">
              <h2 className="text-2xl font-extrabold px-2 py-1">{msg.sender}</h2>
              <p className="mt-2 text-sm md:text-md md:text-lg font-bold p-1">
                <span className={msg.status === 'unread' ? 'bg-[#f6e4a5] text-[#444] p-1 rounded-md' : 'bg-[#b2f2bb] text-[#056608] p-1 rounded-md'}>
                  {msg.status?.toUpperCase()}
                </span>
              </p>
              <p className="mt-2 text-md lg:text-lg px-2  h-24">{msg.text.substring(0, 45)}...</p>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-2 pb-3">
              <div className="flex gap-2 justify-center mt-3 cursor-pointer pb-4">
                <Dialog open={!!selectedMessage} onOpenChange={(isOpen) => { if (!isOpen) setSelectedMessage(null); }}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setSelectedMessage(msg)}
                      className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer bg-[#e9ecef]"
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
