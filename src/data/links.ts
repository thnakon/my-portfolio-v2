import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Globe, 
  Cpu, 
  Laptop, 
  PenTool, 
  Mail,
  Youtube,
  FileText
} from "lucide-react";

export interface LinkItem {
  title: string;
  url: string;
  description: string;
  icon: any;
  category: "social" | "portfolio" | "contact" | "featured";
  isInternal?: boolean;
}

export const socialLinks: LinkItem[] = [
  {
    title: "GitHub",
    url: "https://github.com/thnakon",
    description: "Open source projects & experiments",
    icon: Github,
    category: "social"
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/thanankon-duangkumwattanasiri-1709823a8/",
    description: "Professional experience & networking",
    icon: Linkedin,
    category: "social"
  },
  {
    title: "Twitter",
    url: "https://x.com/Obounwarm",
    description: "Daily thoughts & tech updates",
    icon: Twitter,
    category: "social"
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/itzwarm_/",
    description: "Photography & life snippets",
    icon: Instagram,
    category: "social"
  },
  {
    title: "Youtube",
    url: "https://www.youtube.com/@warmthanankon",
    description: "Tech tutorials & project demos",
    icon: Youtube,
    category: "social"
  }
];

export const portfolioLinks: LinkItem[] = [
  {
    title: "Selected Work",
    url: "/work",
    description: "Explore my premium project case studies",
    icon: PenTool,
    category: "portfolio",
    isInternal: true
  },
  {
    title: "AI Attitudes",
    url: "/ai-attitudes",
    description: "My philosophy on AI in 2026",
    icon: Cpu,
    category: "portfolio",
    isInternal: true
  },
  {
    title: "Recent Journal",
    url: "/blog",
    description: "Insights on design & engineering",
    icon: PenTool,
    category: "portfolio",
    isInternal: true
  },
  {
    title: "Resume",
    url: "/resume.pdf",
    description: "Download my latest CV / Resume",
    icon: FileText,
    category: "portfolio",
    isInternal: false
  },
  {
    title: "Tech Stack & Tools",
    url: "/uses",
    description: "The gear and software I use daily",
    icon: Laptop,
    category: "portfolio",
    isInternal: true
  }
];

export const contactLinks: LinkItem[] = [
  {
    title: "Email",
    url: "mailto:thnakon.d@gmail.com",
    description: "thnakon.d@gmail.com",
    icon: Mail,
    category: "contact"
  }
];
