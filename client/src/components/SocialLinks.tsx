import { Button } from "@/components/ui/button";
import { SiLinkedin, SiGithub, SiTiktok, SiX } from "react-icons/si";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: SiLinkedin,
    url: "https://linkedin.com/in/miguel-tavera",
  },
  {
    name: "X (Twitter)",
    icon: SiX,
    url: "https://twitter.com/miguel_tavera",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    url: "https://github.com/miguel-tavera",
  },
  {
    name: "TikTok",
    icon: SiTiktok,
    url: "https://tiktok.com/@miguel.gaming",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
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
