import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Using the same projects data from Projects.tsx
const projects = [
  {
    title: "Private Cloud Integration for Siri",
    description: "Led the Siri platform integration with Private Cloud Compute, ensuring private, secure, and efficient server processing of Generative AI Siri features.",
    tags: ["Generative AI", "Cloud Computing", "Privacy"],
    year: "2024"
  },
  {
    title: "Personal Context Search Enhancement",
    description: "Launched an intelligent Siri system leveraging personal context for real-time, personalized assistance.",
    tags: ["Machine Learning", "NLP", "User Context"],
    year: "2024"
  },
  {
    title: "Natural Language Router Development",
    description: "Led the development of an advanced natural language classifier for routing Siri requests to specific fine-tuned LLMs and chatGPT.",
    tags: ["LLM", "NLP", "Machine Learning"],
    year: "2024"
  }
];

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  // Auto-advance every 5 seconds
  useState(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-2">{projects[currentIndex].title}</h3>
            <p className="text-muted-foreground mb-4">{projects[currentIndex].description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {projects[currentIndex].tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">{projects[currentIndex].year}</div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="flex justify-center mt-4 gap-2">
        {projects.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            className={`w-2 h-2 p-0 rounded-full ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
