import { Button } from "@/components/ui/button";
import { SiLinkedin, SiGithub, SiTiktok, SiX } from "react-icons/si";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    url: "https://www.linkedin.com/in/taverasmiguel/",
  },
  {
    name: "X (Twitter)",
    icon: SiX,
    url: "https://x.com/MiguelTaveras_",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    url: "https://github.com/miguel973",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((link) => (
        <Button
          key={link.name}
          variant="outline"
          size="icon"
          onClick={() => window.open(link.url, '_blank')}
          className="w-10 h-10"
        >
          <link.icon className="h-5 w-5" />
          <span className="sr-only">{link.name}</span>
        </Button>
      ))}
    </div>
  );
}
