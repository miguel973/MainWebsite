import { Link } from "wouter";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="flex flex-wrap gap-4">
              <li>
                <Link href="/about">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Projects
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/media">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Media
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Miguel Taveras - Taveras Holdings LLC. All rights reserved. This was made with an LLM called ReplitAgent!
          </p>
        </div>
      </div>
    </footer>
  );
}