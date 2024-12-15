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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
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
            This was made with an LLM called ReplitAgent!
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-muted p-4 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Audio Overview</h3>
            <AudioPlayer audioUrl={`${import.meta.env.BASE_URL}Me.wav`} />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed"
          >
            Senior Technical Product Manager with extensive experience in AI/ML, LLMs, program management, and product development. Dedicated to keeping the user front and center in all technological advancements. I specialize in natural language understanding and orchestrating complex AI/ML features for major OS releases.
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
          className="bg-muted p-6 rounded-lg"
        >
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Featured Projects</h3>
            <ProjectCarousel />
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Featured Properties</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <img
                  src="/mission-townhouse.png"
                  alt="307 Mission Ln"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold">307 Mission Ln, Houston, TX 77011</h4>
                <Badge variant="default" className="mt-2">Available Now</Badge>
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
                <img
                  src={`${import.meta.env.BASE_URL}bastrop.png`}
                  alt="2305 Bastrop St A"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-semibold">2305 Bastrop St A, Houston, TX 77004</h4>
                <Badge variant="secondary" className="mt-2">Taken until March 2026</Badge>
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