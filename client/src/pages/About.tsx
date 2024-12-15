import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import SocialLinks from "@/components/SocialLinks";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          About Me
        </motion.h1>

        <div className="grid gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Professional Journey</h2>
            <p className="text-lg leading-relaxed">
              As a Senior Engineering Program Manager at Apple Intelligence, I drive the technical product strategy, development, and delivery of machine learning and large language model solutions for Siri and Search. I focus on improving accuracy, platform scalability, and natural language understanding capabilities.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Experience</h2>
            <ul className="space-y-4">
              <li>
                <div className="font-semibold">Senior Engineering Program Manager</div>
                <div className="text-muted-foreground">Apple Intelligence • Sep 2024 - Present</div>
                <p className="mt-2">Leading Accuracy, Platform, and Scale initiatives for Siri, focusing on Large Language Models (LLM) and Natural Language Understanding.</p>
              </li>
              <li>
                <div className="font-semibold">Engineering Program Manager</div>
                <div className="text-muted-foreground">Apple Intelligence • Feb 2024 - Sep 2024</div>
                <p className="mt-2">Managed Natural Language Understanding development for Siri, implementing advanced Machine Learning and Generative AI solutions.</p>
              </li>
              <li>
                <div className="font-semibold">Product Manager</div>
                <div className="text-muted-foreground">Apple • Aug 2021 - Feb 2024</div>
                <p className="mt-2">Led end-user experiences for Siri and Search, with notable achievements in health data integration and accessibility features.</p>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Core Skills</h2>
            <ul className="space-y-2">
              <li>• Machine Learning & Large Language Models (LLM)</li>
              <li>• Natural Language Processing & Understanding</li>
              <li>• Product Management & Strategy</li>
              <li>• Program Management</li>
              <li>• Generative AI</li>
              <li>• Software Development Life Cycle (SDLC)</li>
            </ul>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
            <SocialLinks />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
