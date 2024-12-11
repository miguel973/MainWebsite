import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const publications = [
  {
    title: "Advances in Natural Language Understanding for Voice Assistants",
    conference: "Apple Machine Learning Journal",
    year: 2023,
    link: "https://machinelearning.apple.com"
  },
  {
    title: "Multilingual NLP: Challenges and Solutions in Production Systems",
    conference: "International Conference on Computational Linguistics",
    year: 2022,
    link: "https://apple.com/research"
  },
  {
    title: "Scaling Language Models: Infrastructure and Optimization",
    conference: "ACM Conference on Language Processing",
    year: 2021,
    link: "https://apple.com/research"
  }
];

export default function Publications() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.conference.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Publications
      </motion.h1>

      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search publications..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {filteredPublications.map((pub, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{pub.title}</h2>
                  <p className="text-muted-foreground mb-4">{pub.conference}</p>
                  <p className="text-sm text-muted-foreground">Published: {pub.year}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => window.open(pub.link, '_blank')}
                >
                  View Paper
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
