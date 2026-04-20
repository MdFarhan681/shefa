import { motion } from "framer-motion";
import {
  ShieldCheck,
  CreditCard,
  Clock,
  UserCheck,
  Headphones,
  Globe,
} from "lucide-react";
import Motion from "../../../Components/Motion/Motion.jsx";

// Simple Card wrapper
const Card = ({ children, className }) => (
  <div
    className={`rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children }) => (
  <div className="flex flex-col gap-4">{children}</div>
);

export default function WhyChoose() {
  const benefits = [
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "ভেরিফাইড ডাক্তার",
    desc: "আমাদের সকল ডাক্তারদের লাইসেন্স ও যোগ্যতা যাচাই করা হয় যাতে আপনি নিরাপদে সেবা নিতে পারেন।",
  },
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: "AI স্বাস্থ্য সহায়তা",
    desc: "যা রোগীর উপসর্গ অনুযায়ী সঠিক ডাক্তার নির্বাচন করতে সাহায্য করে এবং জরুরি অবস্থায় প্রয়োজনীয় গাইডলাইন প্রদান করে।",
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: "সহজ অ্যাপয়েন্টমেন্ট",
    desc: "আপনার সুবিধামতো সময়ে ডাক্তার বুকিং করুন, যেকোনো সময় যেকোনো জায়গা থেকে।",
  },
  {
    icon: <UserCheck className="w-10 h-10" />,
    title: "মেডিসিন ও রিপোর্ট ডেলিভারি",
    desc: "প্রেসক্রিপশন অনুযায়ী ওষুধ এবং মেডিকেল রিপোর্ট দ্রুত আপনার বাড়িতে পৌঁছে দেওয়া হয়।",
  }, {
    icon: <Globe className="w-10 h-10" />,
    title: "নিকটস্থ অ্যাম্বুলেন্স ও ডায়াগনস্টিক ",
    desc: "আপনার আশেপাশের অ্যাম্বুলেন্স, ডায়াগনস্টিক সেন্টার ও জরুরি স্বাস্থ্যসেবা সহজেই খুঁজে পান।",
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "২৪/৭ সাপোর্ট",
    desc: "যেকোনো সমস্যায় আমাদের সাপোর্ট টিম সবসময় আপনার পাশে আছে।",
  },
 
];

  return (
    <section className="w-full mx-auto">
      
      {/* Header */}
      <div className="text-center mb-12">
        <Motion>
          <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-2">
            আমাদের সুবিধাসমূহ
          </span>

          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
            কেন আমাদের প্ল্যাটফর্ম সেরা?
          </h2>

          <p className="text-gray-600 text-base lg:text-lg">
            আমরা আপনাকে দিচ্ছি নিরাপদ, সহজ এবং দ্রুত অনলাইন চিকিৎসা সেবা —
            যেখানে আপনার স্বাস্থ্যই আমাদের প্রথম অগ্রাধিকার।
          </p>
        </Motion>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((item, index) => (
          <Motion key={index} delay={index * 0.1}>
            <Card>
              <CardContent>
                <div className="text-blue-500">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </Motion>
        ))}
      </div>
    </section>
  );
}