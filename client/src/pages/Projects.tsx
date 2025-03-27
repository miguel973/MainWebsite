import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Private Cloud Integration for Siri",
    description: "Led the Siri platform integration with Private Cloud Compute, ensuring private, secure, and efficient server processing of Generative AI Siri features. Enhanced user privacy and processing efficiency, protecting user data for the Apple Intelligence release in iOS 18.1 and macOS Sequoia 15.2.",
    tags: ["Generative AI", "Cloud Computing", "Privacy", "Security", "iOS", "macOS"],
    year: "2024",
    link: "https://security.apple.com/blog/private-cloud-compute/"
  },
  {
    title: "Use ChatGPT with Apple Intelligence on iPhone",
    description: "Integrated ChatGPT capabilities with Apple Intelligence on iPhone, creating a seamless and privacy-focused user experience. Developed features allowing Siri to access ChatGPT for questions about photos and documents, enabled ChatGPT with Writing Tools to compose text or images from descriptions, and implemented visual intelligence with Camera Control to help users learn about places and objects. Users can connect their ChatGPT accounts (free or paid) for enhanced capabilities while maintaining strong privacy controls.",
    tags: ["ChatGPT", "Apple Intelligence", "Privacy", "iOS", "Machine Learning"],
    year: "2024",
    link: "https://support.apple.com/guide/iphone/use-chatgpt-with-apple-intelligence-iph00fd3c8c2/ios"
  },
  {
    title: "Natural Language Router Development",
    description: "Led the development of an advanced natural language classifier for routing Siri requests to specific fine-tuned LLMs and chatGPT. Achieved >90% task completion rate and improved response accuracy by >20 basis points. Successfully handled complex cases including ellipsis/anaphora and on-screen referencing.",
    tags: ["LLM", "Natural Language Processing", "Machine Learning", "System Architecture"],
    year: "2024",
    link: "https://youtu.be/f1-_OAJ4TG8?t=28"
  },
  {
    title: "Siri Health Integration",
    description: "Launched Siri Health on watchOS 10.2 and iOS 17.2, integrating voice commands with the Health app. Led cross-functional collaboration to enable on-device processing of over 20 health data types, enhancing user privacy and convenience. Users can now easily access their health data using voice commands.",
    tags: ["iOS", "watchOS", "Health Integration", "Voice Commands", "Privacy"],
    year: "2023",
    link: "https://www.apple.com/newsroom/2023/12/siri-can-now-help-users-access-and-log-their-health-app-data/"
  },
  {
    title: "NASA VTOL Simulation System",
    description: "Developed a manufacturing delivery-time simulation for NASA's Revolutionary Vertical Lift Technology Project, focusing on AAM/VTOL vehicle ordering at scale. Created predictive tools for critical component delivery failure analysis, enhancing operational efficiency for specialized missions.",
    tags: ["Simulation", "Risk Analysis", "Manufacturing", "Aerospace"],
    year: "2021"
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
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
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