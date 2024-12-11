import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import AudioPlayer from "@/components/AudioPlayer";
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
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold tracking-tight"
          >
            Miguel Tavera
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-muted-foreground mt-4"
          >
            Senior Engineering Program Manager at Apple
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg leading-relaxed"
          >
            Specializing in Natural Language Understanding and driving innovation in AI technology. Leading high-impact engineering teams to deliver groundbreaking solutions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-x-4"
          >
            <Link href="/about">
              <Button size="lg" className="px-6">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="px-6">
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
          <h3 className="text-xl font-semibold mb-4">Audio Overview</h3>
          <AudioPlayer audioUrl="/resume-overview.mp3" />
        </motion.div>
      </div>
    </motion.div>
  );
}
