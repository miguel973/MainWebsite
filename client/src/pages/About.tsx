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
              As a Senior Program Manager, I specialize in delivering large-scale, innovative technology projects with a focus on LLMs that reach billions of users worldwide. I lead cross-functional teams through complex deployments and optimizations while managing AI infrastructure to enhance platform efficiency. My technical expertise is complemented by a strong interpersonal foundation built from over six years of direct customer service, where I completed more than 15,000 technical appointments.
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-semibold">Gen AI Leadership</h3>
                <p className="text-muted-foreground">Drive innovation by combining expertise in generative AI, large language models, and infrastructure optimization to create scalable, user-focused solutions that align with cutting-edge trends.</p>
              </div>
              <div>
                <h3 className="font-semibold">Strategic Program Management</h3>
                <p className="text-muted-foreground">Excel at orchestrating cross-functional strategies to solve complex problems, enabling seamless integration of AI technologies with enterprise systems and enhancing product ecosystems.</p>
              </div>
              <div>
                <h3 className="font-semibold">Collaborative Visionary</h3>
                <p className="text-muted-foreground">Cultivate collaboration across engineering, research, and design teams to develop forward-thinking features, translating market insights into impactful, future-ready AI solutions.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Experience</h2>
            <ul className="space-y-4">
              <li>
                <div className="font-semibold">Senior Program Manager</div>
                <div className="text-muted-foreground">Apple, Platform Accuracy and Scale • Sep 2024 - Present</div>
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
              <li>
                <div className="font-semibold">CIO Advisory Intern</div>
                <div className="text-muted-foreground">KPMG US • May 2021 - Jul 2021</div>
                <p className="mt-2">Collaborated with leadership to align IT capabilities with strategic objectives, focusing on next-generation technologies and digital transformation. Helped optimize IT programs and develop solutions that maximize business impact and technological efficiency.</p>
              </li>
              <li>
                <div className="font-semibold">Program Manager Intern, Supply Chain</div>
                <div className="text-muted-foreground">NASA Ames Research Center • Jan 2021 - May 2021</div>
                <p className="mt-2">Delivered manufacturing delivery-time simulation for NASA's Revolutionary Vertical Lift Technology Project, focusing on AAM/VTOL vehicle procurement. Developed predictive tools for critical component delivery analysis, enhancing operational efficiency for specialized missions.</p>
              </li>
              <li>
                <div className="font-semibold">Instructional Designer</div>
                <div className="text-muted-foreground">Strategic Ascent • Jan 2019 - Jan 2021</div>
                <p className="mt-2">Designed virtual training curricula for entry-level engineers, reducing onboarding time by 17%. Led organizational compliance assessments resulting in substantial cost savings.</p>
              </li>
              <li>
                <div className="font-semibold">Technical Expert & Genius</div>
                <div className="text-muted-foreground">Apple Retail • Jan 2015 - Jan 2021</div>
                <p className="mt-2">Progressed through multiple technical and customer-facing roles including Technical Specialist, Business Pro, Technical Expert, and Genius, demonstrating expertise in Apple technologies and leadership in customer service excellence.</p>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Education</h2>
            <ul className="space-y-4">
              <li>
                <div className="font-semibold">M.S. Management Information Systems</div>
                <div className="text-muted-foreground">University of Houston • 2022</div>
              </li>
              <li>
                <div className="font-semibold">B.S. Human Resource Development</div>
                <div className="text-muted-foreground">University of Houston • 2020</div>
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
