import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Private Cloud Integration for Siri",
    description: "Led the Siri platform integration with Private Cloud Compute, ensuring private, secure, and efficient server processing of Generative AI Siri features. Enhanced user privacy and processing efficiency, protecting user data for the Apple Intelligence release in iOS 18.1 and macOS Sequoia 15.2.",
    tags: ["Generative AI", "Cloud Computing", "Privacy", "Security", "iOS", "macOS"],
    year: "2024"
  },
  {
    title: "Personal Context Search Enhancement",
    description: "Launched an intelligent Siri system leveraging personal context for real-time, personalized assistance. Implemented on-device information processing for tasks like flight details lookup and screen content summarization, achieving double-digit increase in user engagement and task completion rates.",
    tags: ["Machine Learning", "NLP", "User Context", "On-device Processing"],
    year: "2024"
  },
  {
    title: "Natural Language Router Development",
    description: "Led the development of an advanced natural language classifier for routing Siri requests to specific fine-tuned LLMs and chatGPT. Achieved >90% task completion rate and improved response accuracy by >20 basis points. Successfully handled complex cases including ellipsis/anaphora and on-screen referencing.",
    tags: ["LLM", "Natural Language Processing", "Machine Learning", "System Architecture"],
    year: "2024"
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
