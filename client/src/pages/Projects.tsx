import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "NLP Engine Optimization",
    description: "Led the optimization of Apple's core NLP engine, resulting in 40% improved processing efficiency and enhanced accuracy in multiple languages.",
    tags: ["Natural Language Processing", "Machine Learning", "Python", "TensorFlow"],
    year: "2022-2023"
  },
  {
    title: "Cross-Platform Voice Assistant Integration",
    description: "Managed the integration of advanced NLU capabilities across Apple's ecosystem, improving user interaction accuracy by 35%.",
    tags: ["Voice Recognition", "iOS", "macOS", "Machine Learning"],
    year: "2021-2022"
  },
  {
    title: "Multilingual Understanding Framework",
    description: "Developed a framework for real-time language understanding supporting 25+ languages with 95% accuracy.",
    tags: ["NLP", "Distributed Systems", "Scalability"],
    year: "2020-2021"
  }
];

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Notable Projects
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <ExternalLink className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4 flex-grow">
                {project.description}
              </p>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  {project.year}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
