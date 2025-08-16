'use client';
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import SideBar from '../myComponents/SideBar';
import { Card, CardContent, CardDescription, CardFooter } from '../Components/ui/Card';

type FAQType = {
  question: string;
  answer: string;
};

const faqData: FAQType[] = [
  { question: "How can I reset my password?", answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page." },
  { question: "How do I contact support?", answer: "You can contact support via the 'Help' section in your dashboard or email us at support@example.com." },
  { question: "Where can I find my purchase history?", answer: "Your purchase history is available under the 'Orders' section in your profile." },
];

export default function FAQPage() {
  const [selectedFAQ, setSelectedFAQ] = useState<FAQType | null>(null);

  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC]  md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between  relative justify-center w-full">
          <div className='mx-auto'>
            <h1 className="text-xl lg:text-4xl">FAQ</h1>
            <p className="text-md lg:text-xl">
              Find answers to the most common questions
            </p>
          </div>
        </div>
      </div>

      <div className="md:pl-[8px] lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC]   grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8">
        {faqData.map((faq, index) => (
          <Card className="w-[300px] overflow-hidden mx-auto rounded-3xl" key={index}>
            <CardContent className="w-[300px] overflow-hidden">
              <h2 className="text-lg font-bold">{faq.question}</h2>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-4">
              <Dialog open={!!selectedFAQ} onOpenChange={(isOpen) => { if (!isOpen) setSelectedFAQ(null); }}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setSelectedFAQ(faq)}
                    className="!text-black !font-bold !text-md !lg:text-xl !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
                    variant="ghost"
                  >
                    View Answer
                  </Button>
                </DialogTrigger>
                {selectedFAQ && (
                  <DialogContent>
                    <DialogTitle>{selectedFAQ.question}</DialogTitle>
                    <p className="text-md lg:text-lg mt-4">{selectedFAQ.answer}</p>
                  </DialogContent>
                )}
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
