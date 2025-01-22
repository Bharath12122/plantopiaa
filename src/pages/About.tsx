import React from "react";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FCFDF7]">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#2A3B1D] mb-8">About Plantopiaa</h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Welcome to Plantopiaa, where technology meets nature to create a 
              greener, more sustainable future. Our mission is to make plant 
              identification and care accessible to everyone, from casual gardeners 
              to professional botanists.
            </p>
            <p className="text-lg text-gray-700">
              Using cutting-edge AI technology, we help you identify plants, 
              understand their health benefits, and provide personalized care 
              instructions to ensure your green companions thrive.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Team member working"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl md:order-1">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="Team collaboration"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[#2A3B1D] mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700">
              We envision a world where everyone can confidently grow and care for 
              plants, contributing to biodiversity and environmental sustainability. 
              Through education and technology, we're making this vision a reality.
            </p>
            <p className="text-lg text-gray-700">
              Our team of dedicated botanists, developers, and AI specialists work 
              together to provide you with accurate plant identification and 
              personalized care recommendations.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}