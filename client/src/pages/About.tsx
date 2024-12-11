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
              As a Senior Engineering Program Manager at Apple, I lead complex initiatives in Natural Language Understanding, driving innovation in AI technology. With over 15 years of experience in software engineering and program management, I specialize in bridging technical excellence with strategic business objectives.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Expertise</h2>
            <ul className="space-y-2">
              <li>• Natural Language Processing & Understanding</li>
              <li>• Machine Learning Systems Architecture</li>
              <li>• Technical Program Management</li>
              <li>• Cross-functional Team Leadership</li>
              <li>• Agile Development Methodologies</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <ul className="space-y-4">
              <li>
                <div className="font-semibold">Stanford University</div>
                <div className="text-muted-foreground">M.S. Computer Science, Artificial Intelligence</div>
              </li>
              <li>
                <div className="font-semibold">University of California, Berkeley</div>
                <div className="text-muted-foreground">B.S. Computer Science</div>
              </li>
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
