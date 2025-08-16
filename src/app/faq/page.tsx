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

type FAQType = {
  id: number;
  question: string;
  answer: string;
  approved: boolean;
};

const defaultFAQ: FAQType[] = [
  { id: 1, question: "How can I reset my password?", answer: "Click on 'Forgot Password' on login page.", approved: true },
  { id: 2, question: "How do I contact support?", answer: "Email us at support@example.com.", approved: false },
  { id: 3, question: "Where can I find my purchase history?", answer: "Under 'Orders' in your profile.", approved: true },
];

export default function FAQPage() {
  const [faqData, setFaqData] = useState<FAQType[]>([]);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQType | null>(null);
  const [editingFAQ, setEditingFAQ] = useState<FAQType | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  // Load FAQ from localStorage or use default
  useEffect(() => {
    const stored = localStorage.getItem('faqData');
    if (stored) {
      setFaqData(JSON.parse(stored));
    } else {
      setFaqData(defaultFAQ);
    }
  }, []);

  // Save FAQ to localStorage whenever faqData changes
  useEffect(() => {
    localStorage.setItem('faqData', JSON.stringify(faqData));
  }, [faqData]);

  const toggleApproval = (id: number) => {
    setFaqData(prev =>
      prev.map(f => f.id === id ? { ...f, approved: !f.approved } : f)
    );
  };

  const deleteFAQ = (id: number) => {
    setFaqData(prev => prev.filter(f => f.id !== id));
  };

  const saveEdit = () => {
    if (editingFAQ) {
      setFaqData(prev =>
        prev.map(f => f.id === editingFAQ.id ? editingFAQ : f)
      );
      setEditingFAQ(null);
    }
  };

  const addFAQ = () => {
    if (newQuestion && newAnswer) {
      const newFAQ: FAQType = {
        id: Date.now(),
        question: newQuestion,
        answer: newAnswer,
        approved: false,
      };
      setFaqData(prev => [...prev, newFAQ]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  return (
    <section className="overflow-x-hidden grid grid-cols-1 lg:flex-nowrap w-full text-white">
      <SideBar />
      <div className="text-white font-bold gap-4 lg:justify-between p-10 flex flex-col bg-[#189DAC] md:pl-[8px] lg:pl-[268px] md:pr-[8px] w-full text-center justify-around">
        <div className="flex flex-col md:flex-col lg:flex-row lg:justify-between relative justify-center w-full">
          <div className='mx-auto'>
            <h1 className="text-xl lg:text-4xl">FAQ Admin Panel</h1>
            <p className="text-md lg:text-xl">
              Manage user questions and answers
            </p>
          </div>
        </div>

        {/* Add new FAQ */}
        <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center">
          <input
            type="text"
            placeholder="New question"
            className="p-2 rounded-lg text-black w-full md:w-[300px]"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Answer"
            className="p-2 rounded-lg text-black w-full md:w-[300px]"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <Button className="!bg-green-500 !text-white" onClick={addFAQ}>Add</Button>
        </div>
      </div>

      <div className="md:pl-[8px] lg:pl-[268px] md:pr-[18px] w-full min-h-[40rem] bg-[#189DAC] grid grid-cols-1 md:flex md:flex-row md:flex-wrap md:gap-8 lg:flex lg:flex-row lg:gap-6 justify-center items-center gap-8 p-4">
        {faqData.map((faq) => (
          <Card className="w-[300px] overflow-hidden mx-auto rounded-3xl" key={faq.id}>
            <CardContent className="w-[300px] overflow-hidden">
              <h2 className="text-lg font-bold">{faq.question}</h2>
              <p className="mt-1 text-sm">{faq.approved ? '✅ Approved' : '⏳ Pending'}</p>
            </CardContent>
            <CardFooter className="grid grid-cols-1 gap-2">
              <Dialog open={!!selectedFAQ && selectedFAQ.id === faq.id} onOpenChange={(isOpen) => { if (!isOpen) setSelectedFAQ(null); }}>
                <DialogTrigger asChild>
                  <Button
                    className="!text-black !font-bold !px-4 !py-2 !rounded-2xl !border-1 !border-gray cursor-pointer"
                    variant="ghost"
                    onClick={() => setSelectedFAQ(faq)}
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

              <Button className="!bg-blue-500 !text-white" onClick={() => setEditingFAQ(faq)}>Edit</Button>
              <Button className="!bg-yellow-500 !text-white" onClick={() => toggleApproval(faq.id)}>
                {faq.approved ? 'Unapprove' : 'Approve'}
              </Button>
              <Button className="!bg-red-500 !text-white" onClick={() => deleteFAQ(faq.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}

        {/* Edit dialog */}
        {editingFAQ && (
          <Dialog open={!!editingFAQ} onOpenChange={(isOpen) => { if (!isOpen) setEditingFAQ(null); }}>
            <DialogContent>
              <DialogTitle>Edit FAQ</DialogTitle>
              <div className="flex flex-col gap-4 mt-4">
                <input
                  className="p-2 rounded-lg text-black"
                  value={editingFAQ.question}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, question: e.target.value })}
                />
                <input
                  className="p-2 rounded-lg text-black"
                  value={editingFAQ.answer}
                  onChange={(e) => setEditingFAQ({ ...editingFAQ, answer: e.target.value })}
                />
                <div className="flex gap-4">
                  <Button className="!bg-green-500 !text-white" onClick={saveEdit}>Save</Button>
                  <Button className="!bg-gray-500 !text-white" onClick={() => setEditingFAQ(null)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
