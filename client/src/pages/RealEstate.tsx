import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const properties = [
  {
    address: "2305 Bastrop St A, Houston, TX 77004",
    harLink: "https://www.har.com/homedetail/2305-bastrop-st-a-houston-tx-77004/10132155",
    status: "Taken until March 2026",
    image: "/2305-bastrop.jpg"
  },
  {
    address: "307 Mission Ln, Houston, TX 77011",
    harLink: "https://www.har.com/homedetail/307-mission-ln-houston-tx-77011/11104799",
    status: "Available Now",
    image: "/307-mission.jpg"
  }
];

const agent = {
  name: "Jenna Robertson",
  email: "jenna@areatexas.com",
  phone: "815-734-3435",
  company: "Area Texas Realty & Management",
  website: "https://www.propertymanagementhouston.com/"
};

export default function RealEstate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">Real Estate Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {properties.map((property, index) => (
          <Card key={index} className="p-6">
            <img
              src={property.image}
              alt={property.address}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{property.address}</h3>
            <Badge 
              variant={property.status.includes("Available") ? "default" : "secondary"}
              className="mb-4"
            >
              {property.status}
            </Badge>
            <a 
              href={property.harLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline block mb-4"
            >
              View on HAR.com
            </a>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Contact Real Estate Agent</h2>
        <div className="space-y-4">
          <p className="text-lg font-semibold">{agent.name}</p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${agent.email}`} className="text-blue-500 hover:underline">
              {agent.email}
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href={`tel:${agent.phone}`} className="text-blue-500 hover:underline">
              {agent.phone}
            </a>
          </p>
          <p>
            <strong>Company:</strong> {agent.company}
          </p>
          <p>
            <a 
              href={agent.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Company Website
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
