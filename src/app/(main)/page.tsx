'use client'
import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { FaEdit, FaFileAlt, FaRobot, FaStar, FaUpload, FaComments, FaChartLine, FaShareAlt } from 'react-icons/fa';

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      
      <div className="bg-[#03050c] min-h-screen text-[#fafafa] pt-12 px-4 sm:px-6">
        {/* Hero Section */}
        <motion.section 
          className="text-center py-24 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Transform Your Sales Conversations with Intelligent Transcripts</h1>
          <p className="text-xl mb-10">Annotate, summarize, and analyze sales interactions effortlessly with our AI-powered transcript management tool.</p>
          <div className="flex justify-center">
            <motion.button 
              className="btn-primary text-lg px-10 py-4 rounded-full bg-[#fff500] text-black hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started for Free
            </motion.button>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Our App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Interactive Transcript Management", icon: <FaEdit className="text-4xl mb-4 text-[#fff500]" />, description: "Easily add, edit, and delete comments on specific parts of your sales transcripts." },
              { title: "AI-Powered Summaries", icon: <FaRobot className="text-4xl mb-4 text-[#fff500]" />, description: "Generate concise, AI-driven summaries of entire sales transcripts with just one click." },
              { title: "Sales Coaching Insights", icon: <FaChartLine className="text-4xl mb-4 text-[#fff500]" />, description: "Leverage detailed annotations and summaries to provide actionable feedback." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-[#191b22] p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-[#9ea5ad]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-[#0d1117]">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Upload or Record", icon: <FaUpload />, description: "Upload your sales call transcript or record directly within the app." },
              { step: 2, title: "Annotate", icon: <FaComments />, description: "Add comments and notes to specific parts of the transcript." },
              { step: 3, title: "Generate Summary", icon: <FaFileAlt />, description: "Let our AI generate a concise summary of your sales interaction." },
              { step: 4, title: "Share Insights", icon: <FaShareAlt />, description: "Easily share annotated transcripts and summaries with your team." }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-16 h-16 bg-[#fff500] text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-[#9ea5ad]">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Free Tier", description: "Basic features for small teams", price: "$0", cta: "Start for Free" },
              { title: "Pro Tier", description: "Advanced features for growing teams", price: "$49", cta: "Upgrade to Pro", popular: true },
              { title: "Enterprise Tier", description: "Custom solutions for large organizations", price: "Custom", cta: "Contact Sales" }
            ].map((plan, index) => (
              <motion.div 
                key={index}
                className={`bg-[#191b22] p-8 rounded-lg text-center ${plan.popular ? 'border-2 border-[#fff500]' : ''}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {plan.popular && <div className="text-[#fff500] font-bold mb-4"><FaStar className="inline mr-2" />Most Popular</div>}
                <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
                <p className="mb-4 text-[#9ea5ad]">{plan.description}</p>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <button className={`btn-primary w-full py-3 ${plan.popular ? 'bg-[#fff500] text-black' : 'bg-[#383f45]'}`}>{plan.cta}</button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-24 text-center bg-[#191b22]">
          <h2 className="text-3xl font-bold mb-8">Ready to revolutionize your sales process?</h2>
          <div className="flex justify-center">
            <motion.button 
              className="btn-primary text-lg px-10 py-4 bg-[#fff500] text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { question: "What types of files can I upload?", answer: "You can upload transcripts in various formats including PDF, DOCX, and plain text." },
              { question: "How accurate are the AI-generated summaries?", answer: "Our AI summaries are highly accurate, capturing the key points from your transcripts. However, we recommend reviewing them for critical decisions." },
              { question: "Can I share transcripts with my team?", answer: "Yes, you can easily share annotated transcripts and summaries with your team members." }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-[#191b22] p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-[#9ea5ad]">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}