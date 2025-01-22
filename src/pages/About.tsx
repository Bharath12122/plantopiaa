import React from "react";
import { Footer } from "@/components/Footer";
import { Leaf, Sprout, TreeDeciduous, FlowerIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const handleDonate = () => {
    navigate("/donate");
  };

  return (
    <div className="min-h-screen bg-[#FCFDF7]">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-[#2A3B1D] mb-8 text-center">About Plantopiaa</h1>
        
        {/* Welcome Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Welcome to Plantopiaa, where nature meets innovation! We are a dedicated platform designed to empower plant enthusiasts, 
              gardeners, and nature lovers to unlock the full potential of their green companions.
            </p>
            <p className="text-lg text-gray-700">
              Whether you're a seasoned plant parent or just embarking on your journey, Plantopiaa is here to guide and inspire you 
              every step of the way.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735"
              alt="Beautiful plants"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="mb-16 bg-[#F2FCE2] p-8 rounded-lg">
          <h2 className="text-3xl font-semibold text-[#2A3B1D] mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At Plantopiaa, our mission is to bridge the gap between technology and nature by offering solutions that make plant care 
            easier, smarter, and more enjoyable. We aim to cultivate a greener world, one plant at a time, by empowering individuals 
            with knowledge and tools tailored to their unique needs.
          </p>
        </div>

        {/* What We Offer Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-[#2A3B1D] mb-8">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Leaf className="text-[#00B388] mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Plant Identification Made Simple</h3>
                  <p className="text-gray-700">Snap a picture, and our advanced AI will identify your plant and provide detailed information about its care needs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Sprout className="text-[#00B388] mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2">Personalized Plant Care Tips</h3>
                  <p className="text-gray-700">Get expert advice on watering schedules, sunlight requirements, and optimal growing conditions.</p>
                </div>
              </div>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b"
                alt="Plant care"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <TreeDeciduous className="text-[#00B388] mb-4 h-8 w-8" />
            <h3 className="font-semibold text-xl mb-2">Disease Detection & Remedies</h3>
            <p className="text-gray-700">Our AI helps you diagnose plant issues and offers actionable remedies to keep your greens thriving.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FlowerIcon className="text-[#00B388] mb-4 h-8 w-8" />
            <h3 className="font-semibold text-xl mb-2">Companion Planting Insights</h3>
            <p className="text-gray-700">Discover which plants grow best together for healthier and more productive gardens.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Leaf className="text-[#00B388] mb-4 h-8 w-8" />
            <h3 className="font-semibold text-xl mb-2">Gamified Experience</h3>
            <p className="text-gray-700">Earn rewards and badges as you grow, care for, and learn more about your plants.</p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
              alt="Sustainable future"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-[#2A3B1D] mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700">
              We envision a world where every home is filled with thriving plants, and every individual is empowered to grow their 
              own little paradise. At Plantopiaa, we believe that nurturing plants is not just a hobby—it's a lifestyle that fosters 
              mindfulness, health, and sustainability.
            </p>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="text-center bg-[#F2FCE2] p-8 rounded-lg mb-16">
          <h2 className="text-3xl font-semibold text-[#2A3B1D] mb-4">Join Us</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Whether you're here to identify a plant, solve a gardening challenge, or embark on a new green adventure, Plantopiaa is 
            your trusted partner. Together, let's create a world where plants thrive and people flourish.
          </p>
          <p className="text-xl font-semibold text-[#00B388] mt-4">
            Explore. Learn. Grow. Welcome to Plantopiaa!
          </p>
        </div>

        {/* Donate Button Section */}
        <div className="text-center mb-16">
          <Button
            onClick={handleDonate}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 px-8 py-6 rounded-full shadow-md hover:shadow-lg text-lg"
          >
            <Heart className="w-6 h-6" /> Support Our Mission
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}