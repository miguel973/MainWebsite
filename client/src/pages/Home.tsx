import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import AudioPlayer from "@/components/AudioPlayer";
import ProjectCarousel from "@/components/ProjectCarousel";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <img
              src="/8ced78b7-6457-490a-88e8-c15725fc5300.jpg"
              alt="Miguel Taveras"
              className="rounded-lg shadow-lg w-96 h-96 object-cover mx-auto md:mx-0"
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold tracking-tight"
          >
            Miguel Taveras
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-muted-foreground mt-4"
          >
            Senior Program Manager at Apple
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-muted p-4 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Audio Overview</h3>
            <AudioPlayer audioUrl="/Me.wav" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed"
          >
            I'm Miguel—a Senior Program Manager dedicated to bringing advanced technology projects and AI-driven experiences to life for billions of users worldwide. With deep expertise in large-scale deployments of machine learning and Large Language Models (LLMs), I focus on making complex technologies accessible, scalable, and impactful. My unique blend of technical leadership and exceptional customer-focused skills, honed over 15,000 technical appointments, helps me build solutions that genuinely resonate with users. Beyond tech, I'm a passionate adventurer exploring motorcycles, scuba diving, real estate investing, and global travel.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-x-4"
          >
            <Link href="/about">
              <Button size="lg" className="px-6 cursor-pointer">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="px-6 cursor-pointer">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-muted p-6 rounded-lg h-full"
        >
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Featured Projects</h3>
            <ProjectCarousel />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Media Showcase</h3>
            <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h4 className="font-semibold">Drone Footage & Video Content</h4>
              <p className="mt-2 text-sm">Check out my professional drone footage and video content showcasing properties and landscapes across Texas.</p>
              <div className="mt-3 flex">
                <img 
                  src="https://img.youtube.com/vi/WHGMVOq5QG0/mqdefault.jpg" 
                  alt="Drone Footage Preview" 
                  className="w-24 h-14 object-cover rounded"
                />
                <div className="ml-3 mt-1 text-sm">
                  <p className="font-medium">Houston Aerial Views</p>
                  <p className="text-muted-foreground">Drone footage showcase</p>
                </div>
              </div>
              <Link href="/media">
                <Button variant="outline" size="sm" className="mt-3">
                  View Media Gallery <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Featured Properties</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h4 className="font-semibold">307 Mission Ln, Houston, TX 77011</h4>
                <Badge variant="secondary" className="mt-2">Taken until January 2026</Badge>
                <div className="space-y-1 mt-2 text-sm">
                  <p>3 Bedroom(s)</p>
                  <p>3 Full Bath(s)</p>
                  <p>1,530 Sqft</p>
                  <p>Rental - Townhouse/Condo</p>
                </div>
                <a 
                  href="https://www.har.com/homedetail/307-mission-ln-houston-tx-77011/11104799"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block mt-2"
                >
                  View on HAR.com
                </a>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <h4 className="font-semibold">2305 Bastrop St A, Houston, TX 77004</h4>
                <Badge variant="secondary" className="mt-2">Taken until June 2026</Badge>
                <div className="space-y-1 mt-2 text-sm">
                  <p>3 Bedroom(s)</p>
                  <p>2 Full & 1 Half Bath(s)</p>
                  <p>1,476 Sqft</p>
                  <p>Rental - Townhouse/Condo</p>
                </div>
                <a 
                  href="https://www.har.com/homedetail/2305-bastrop-st-a-houston-tx-77004/10132155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block mt-2"
                >
                  View on HAR.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}