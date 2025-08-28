import {
  LayoutDashboard,
  Newspaper,
  GalleryHorizontal,
  SlidersHorizontal,
  Map,
  MessageCircle,
  MailQuestionMark,
  Database,
  Settings,
  Users,
  UserRound,
  BadgeCent,
  LogIn,
  MessageSquareReply,
  Activity,
} from 'lucide-react';
export type SettingsType = {
  id: number;
  name: string;
  description?: string;
  enabled: boolean;
};
export type DatabaseRecordType = {
  id: number;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  description?: string;
};
export type MessageType = {
  id: number;
  sender: string;
  text: string;
  status: 'unread' | 'read';
};
export type FAQType = {
  id: number;
  question: string;
  answer: string;
  status: 'pending' | 'approved' | 'rejected';
};
export const menuItem = [
  {
    mainItem: [
      { name: 'Dashboard', icon: LayoutDashboard, url: 'Dashboard' },
      { name: 'News', icon: Newspaper, url: 'News' },

      { name: 'Gallery', icon: GalleryHorizontal, url: 'Gallery' },
      { name: 'Slide Banner', icon: SlidersHorizontal, url: 'banner' },
    ],
    restItem: [
      { name: 'Sitemap', icon: Map, url: 'siteMap' },
      { name: 'FAQ', icon: MailQuestionMark, url: 'faq' },

      { name: 'Message', icon: MessageCircle, url: 'message' },
      { name: 'DataBase', icon: Database, url: 'dataBase' },
      { name: 'Setting', icon: Settings, url: 'setting' },
    ],
  },
];
export const stats = [
  {
    icon: UserRound,
    title: 'Visitors',
    value: '2.2 K',
    note: 'Lower than last week',
    bg: 'bg-green-700 text-gray-200',
  },
  {
    icon: BadgeCent,
    title: 'Sales / Revenue',
    value: '$ 12,430',
    note: 'Stable this month',
    bg: 'bg-indigo-900 text-gray-200',
  },
  {
    icon: MessageSquareReply,
    title: 'Responses / Tickets',
    value: '320',
    note: 'Increased by 12%',
    bg: 'bg-emerald-800 text-gray-200',
  },
  {
    icon: Activity,
    title: 'Bounce Rate',
    value: '38 %',
    note: 'Slightly higher than target',
    bg: 'bg-sky-800 text-gray-200',
  },
  {
    icon: Users,
    title: 'Daily Active Users',
    value: '890',
    note: 'Consistent daily growth',
    bg: 'bg-indigo-700 text-gray-200',
  },
  {
    icon: LogIn,
    title: 'Signups / Registrations',
    value: '430',
    note: 'Less than expected',
    bg: 'bg-cyan-800 text-gray-300',
  },
];
export const initialFAQData: FAQType[] = [
  {
    id: 1,
    question: 'How can I reset my password?',
    answer:
      'Go to the login page and click on "Forgot Password". Enter your registered email and follow the instructions to reset your password.',
    status: 'pending',
  },
  {
    id: 2,
    question: 'How do I contact support?',
    answer:
      'You can contact our support team through the "Contact Us" page or by emailing support@example.com. We usually respond within 24 hours.',
    status: 'pending',
  },
  {
    id: 3,
    question: 'Where can I find my purchase history?',
    answer:
      'Log in to your account, go to "My Account" → "Orders" to view your full purchase history.',
    status: 'pending',
  },
  {
    id: 4,
    question: 'What is the refund policy?',
    answer:
      'Refunds are available within 14 days of purchase, provided the product has not been used extensively. Please check our Refund Policy page for more details.',
    status: 'pending',
  },
  {
    id: 5,
    question: 'Where can I download the user guide?',
    answer:
      'You can download the latest version of the user guide from the "Help Center" or directly from your account dashboard under "Resources".',
    status: 'pending',
  },
  {
    id: 6,
    question: 'How to integrate with the API?',
    answer:
      'Our API documentation is available in the Developer Portal. You will need to generate an API key from your account settings before integration.',
    status: 'pending',
  },
];
export const initialMessagesData: MessageType[] = [
  {
    id: 1,
    sender: 'Alice Johnson',
    text: 'Hi, I need help with my account settings.',
    status: 'unread',
  },
  {
    id: 2,
    sender: 'Bob Smith',
    text: 'Can you provide an update on my last order?',
    status: 'read',
  },
  {
    id: 3,
    sender: 'Catherine Lee',
    text: 'I am experiencing issues with the payment process.',
    status: 'unread',
  },
  {
    id: 4,
    sender: 'David Kim',
    text: 'Thank you for your support last week!',
    status: 'read',
  },
  {
    id: 5,
    sender: 'Eva Brown',
    text: 'Is there a way to change my subscription plan?',
    status: 'unread',
  },
  {
    id: 6,
    sender: 'Frank Wilson',
    text: 'I would like to delete my account permanently.',
    status: 'unread',
  },
  {
    id: 7,
    sender: 'George Martin',
    text: 'Can someone assist me with resetting my password?',
    status: 'unread',
  },
];
export const initialDatabaseData: DatabaseRecordType[] = [
  {
    id: 1,
    name: 'Users',
    type: 'Table',
    status: 'active',
    description: 'Contains all user accounts.',
  },
  {
    id: 2,
    name: 'Orders',
    type: 'Table',
    status: 'active',
    description: 'Contains all user orders.',
  },
  {
    id: 3,
    name: 'Products',
    type: 'Table',
    status: 'active',
    description: 'All products available in the store.',
  },
  {
    id: 4,
    name: 'Logs',
    type: 'Table',
    status: 'inactive',
    description: 'System logs, archived.',
  },
  {
    id: 5,
    name: 'FAQ',
    type: 'Table',
    status: 'active',
    description: 'Frequently Asked Questions.',
  },
  {
    id: 6,
    name: 'Messages',
    type: 'Table',
    status: 'active',
    description: 'User messages and support tickets.',
  },
  {
    id: 7,
    name: 'Settings',
    type: 'Table',
    status: 'active',
    description: 'Application settings.',
  },
];
export const initialSettingsData: SettingsType[] = [
  {
    id: 1,
    name: 'Enable Notifications',
    description: 'Receive notifications about updates and offers.',
    enabled: true,
  },
  {
    id: 2,
    name: 'Dark Mode',
    description: 'Switch the interface to dark theme.',
    enabled: false,
  },
  {
    id: 3,
    name: 'Auto-Update',
    description: 'Automatically download and install updates.',
    enabled: true,
  },
  {
    id: 4,
    name: 'Location Access',
    description: 'Allow the app to access your location.',
    enabled: false,
  },
  {
    id: 5,
    name: 'Email Alerts',
    description: 'Receive important alerts via email.',
    enabled: true,
  },
  {
    id: 6,
    name: 'Beta Features',
    description: 'Access new experimental features.',
    enabled: false,
  },

  {
    id: 7,
    name: 'Data Sync',
    description: 'Sync your data across devices.',
    enabled: true,
  },
];
