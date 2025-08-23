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
import { initialFAQData, FAQType } from '../data';
import UserCard from '../myComponents/UserCards';
import { Bell } from 'lucide-react';

export default function FAQPage() {
  const [faqData, setFaqData] = useState<FAQType[]>([]);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQType | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('faqData');
    if (storedData) {
      const parsed = JSON.parse(storedData);

      if (parsed.length !== initialFAQData.length) {
        setFaqData(initialFAQData);
        localStorage.setItem('faqData', JSON.stringify(initialFAQData));
      } else {
        setFaqData(parsed);
      }
    } else {
      setFaqData(initialFAQData);
      localStorage.setItem('faqData', JSON.stringify(initialFAQData));
    }
  }, [initialFAQData.length]);

  const updateFAQ = (updatedFAQ: FAQType) => {
    const newData = faqData.map((faq) =>
      faq.id === updatedFAQ.id ? updatedFAQ : faq
    );
    setFaqData(newData);
    localStorage.setItem('faqData', JSON.stringify(newData));
  };

  const handleApprove = (faq: FAQType) => {
    updateFAQ({
      ...faq,
      status: 'approved',
      answer: faq.answer || 'Answer will be provided by support.',
    });
  };

  const handleReject = (faq: FAQType) => {
    updateFAQ({ ...faq, status: 'rejected' });
  };

  const handleDelete = (faq: FAQType) => {
    const newData = faqData.filter((f) => f.id !== faq.id);
    setFaqData(newData);
    localStorage.setItem('faqData', JSON.stringify(newData));
  };

  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC] dark:bg-[#0f4b5c]  md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between  relative  justify-center w-full">
          <div className=" text-center">
            <h1 className="text-xl lg:text-4xl">FAQ Management</h1>
            <p className="text-md lg:text-xl">
             Hi Mohammad Review and manage user-submitted questions
            </p>
          </div>
          <div className=' hidden lg:flex  flex-row gap-3 flex-nowrap'>
            <UserCard/>
            <Bell className=" hidden lg:inline-block cursor-pointer lg:mt-5 mx-1 " color="white" />
          </div>
        </div>
      </div>

      <div className="md:pl-[8px] pb-11 lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC] dark:bg-[#0f4b5c] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8">
        {faqData.map((faq) => (
          <Card
            className="w-[350px]  h-[250px] overflow-hidden mx-auto rounded-3xl"
            key={faq.id}
          >
            <CardContent className="w-[300px] overflow-hidden">
              <h2 className="text-2xl font-extrabold px-2 py-1 ">
                {faq.question}
              </h2>
              <p className="mt-2 text-sm md:text-md md:text-lg font-bold p-1">
                <span
                  className={
                    faq.status === 'approved'
                      ? 'bg-[#b2f2bb] text-[#056608] p-1 rounded-md'
                      : faq.status === 'rejected'
                      ? 'bg-[#f5c2c7]  p-1 rounded-md text-[#a10000]'
                      : '  p-1 rounded-md bg-[#f6e4a5] text-[#444]'
                  }
                >
                  {faq.status?.toUpperCase()}
                </span>
              </p>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-2">
              {faq.status == 'pending' ? (
                <div className="flex gap-2 justify-center mt-3 cursor-pointer pb-4">
                  <Dialog
                    open={!!selectedFAQ}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) setSelectedFAQ(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="bg-[#e9ecef] cursor-pointer hover:bg-[#b9babb]"
                        onClick={() => setSelectedFAQ(faq)}
                      >
                        View Answer
                      </Button>
                    </DialogTrigger>
                    {selectedFAQ && (
                      <DialogContent className="backdrop-blur-sm bg-white/90 dark:bg-[#1e293b] dark:text-white">
                        <DialogTitle>{selectedFAQ.question}</DialogTitle>
                        <p className="text-md lg:text-lg mt-4">
                          {selectedFAQ.answer || 'No answer yet.'}
                        </p>
                      </DialogContent>
                    )}
                  </Dialog>
                  <Button
                    className="bg-[#2ecc71] cursor-pointer hover:bg-green-600 text-white "
                    onClick={() => handleApprove(faq)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="bg-[#e74c3c] cursor-pointer hover:bg-red-600"
                    onClick={() => handleReject(faq)}
                  >
                    Reject
                  </Button>
                </div>
              ) : faq.status == 'approved' ? (
                <div className="flex gap-2 justify-center mt-3 cursor-pointer pb-4">
                  <Dialog
                    open={!!selectedFAQ}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) setSelectedFAQ(null);
                    }}
                  >
                    <DialogTrigger className="" asChild>
                      <Button
                        className="bg-[#e9ecef] cursor-pointer hover:bg-[#b9babb]"
                        onClick={() => setSelectedFAQ(faq)}
                      >
                        View Answer
                      </Button>
                    </DialogTrigger>
                    {selectedFAQ && (
                      <DialogContent className="backdrop-blur-sm bg-white/90 dark:bg-[#1e293b] dark:text-white">
                        <DialogTitle>{selectedFAQ.question}</DialogTitle>
                        <p className="text-md  lg:text-lg mt-4">
                          {selectedFAQ.answer || 'No answer yet.'}
                        </p>
                      </DialogContent>
                    )}
                  </Dialog>
                  <Button
                    className="bg-[#e74c3c] cursor-pointer hover:bg-red-600"
                    onClick={() => handleReject(faq)}
                  >
                    Reject
                  </Button>
                  <Button
                    className="bg-[#2d3436] text-white cursor-pointer hover:bg-[#4b575a]"
                    onClick={() => handleDelete(faq)}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 justify-center mt-3 cursor-pointer pb-4">
                  <Dialog
                    open={!!selectedFAQ}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) setSelectedFAQ(null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="bg-[#e9ecef] cursor-pointer hover:bg-[#b9babb]"
                        onClick={() => setSelectedFAQ(faq)}
                      >
                        View Answer
                      </Button>
                    </DialogTrigger>
                    {selectedFAQ && (
                      <DialogContent className="backdrop-blur-sm bg-white/90 dark:bg-[#1e293b] dark:text-white">
                        <DialogTitle>{selectedFAQ.question}</DialogTitle>
                        <p className="text-md lg:text-lg mt-4">
                          {selectedFAQ.answer || 'No answer yet.'}
                        </p>
                      </DialogContent>
                    )}
                  </Dialog>
                  <Button
                    className="bg-[#2ecc71] cursor-pointer hover:bg-green-600 text-white "
                    onClick={() => handleApprove(faq)}
                  >
                    Approve
                  </Button>
                  <Button
                    className="bg-[#2d3436] text-white cursor-pointer hover:bg-[#4b575a]"
                    onClick={() => handleDelete(faq)}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
