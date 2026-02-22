export interface Feature {
  text: string;
  icon: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  overview: string;
  image: string;
  hoverImage?: string;
  stackImages?: string[];
  tags: string[];
  features: Feature[];
  architecture: string[];
  deployment?: string;
  githubUrl?: string;
  liveUrl?: string;
  isAI?: boolean;
}

export const projects: Project[] = [
  {
    slug: "oboun-erp",
    title: "Oboun ERP",
    description: "Enterprise Resource Planning system designed for SMEs automation.",
    overview: "A developer-first ERP optimized for performance and seamless integration.",
    image: "/projects/oboun-preview.png",
    hoverImage: "/projects/oboun-pos.png",
    tags: ["Laravel 11", "Vue.js 3", "MySQL", "Tailwind", "Docker"],
    githubUrl: "https://github.com/thnakon/ERP_PMS",
    liveUrl: "https://erp.oboun.com",
    architecture: [
      "Routing: Built on Laravel with full SPA capabilities via Vue.js",
      "Database: MySQL with advanced indexing for sub-second queries",
      "Authentication: Custom Breeze-based auth with multi-tenancy support",
      "Styling: Modern Tailwind CSS for highly responsive dashboard layouts"
    ],
    deployment: "Hosted on AWS with automatic CI/CD workflows via GitHub Actions. DNS managed by Cloudflare for high security and performance.",
    features: [
      { text: "Developed with Laravel 12 and Vue.js 3, ensuring long-term maintainability", icon: "Zap" },
      { text: "Implemented complex logic for real-time multi-warehouse inventory sync", icon: "Inbox" },
      { text: "Designed automated financial reporting with precise tax and ledger management", icon: "BarChart3" },
      { text: "Optimized MySQL database with advanced indexing for high-scale performance", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    slug: "babybib",
    title: "Babybib",
    description: "Automated bibliography generation system standardizing APA 7th Edition.",
    overview: "A high-performance citation engine for automated academic formatting.",
    image: "/projects/babybib-preview.png",
    stackImages: ["/projects/babybib2.png", "/projects/babybib3.png"],
    githubUrl: "https://github.com/thnakon/Babybib",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP"],
    liveUrl: "https://babybib.com",
    architecture: [
       "Core Engine: PHP-based regex parser for dynamic citation building",
       "Frontend: Zero-dependency JavaScript for ultra-fast performance",
       "Standards: Strict adherance to APA 7th Edition logic",
       "Validation: Real-time source verification and metadata extraction"
    ],
    deployment: "Optimized for lightweight hosting with minimal server overhead. Static assets served via global CDN for global accessibility.",
    features: [
      { text: "Architected a robust engine for automated APA 7th Edition citation standards.", icon: "Zap" },
      { text: "Supports diverse sources including journals, books, and digital media.", icon: "Inbox" },
      { text: "Built with a responsive UI that prioritizes user productivity and rapid work.", icon: "Smartphone" },
      { text: "Features real-time bibliography previews and instant validation logic.", icon: "BarChart3" }
    ],
    isAI: false
  },
  {
    slug: "scribehub",
    title: "ScribeHub",
    description: "All-in-one platform for modern researchers with AI intelligence.",
    overview: "An AI-powered assistant for intelligent research and data interaction.",
    image: "/projects/ScribeHub1.png",
    hoverImage: "/projects/ScribeHub2.png",
    githubUrl: "https://github.com/thnakon/scribehub",
    tags: ["React", "Next.js", "Supabase", "TypeScript", "Tailwind"],
    architecture: [
      "AI Engine: Integrated OpenAI GPT-4 with RAG for document analysis",
      "Persistence: Supabase with Row Level Security for sensitive data",
      "Real-time: Collaborative features via Supabase Realtime",
      "Navigation: Next.js App Router with dynamic ISR routes"
    ],
    deployment: "Hosted on Vercel with serverless functions. Data secured via Supabase's global edge infrastructure.",
    features: [
      { text: "Leveraged OpenAI's GPT-4 to create an intelligent research paper assistant.", icon: "Zap" },
      { text: "Engineered a collaborative environment with real-time updates for research teams.", icon: "Inbox" },
      { text: "Integrated a reference management system with automatic metadata extraction.", icon: "ShieldCheck" },
      { text: "Developed an interactive knowledge graph for visual data discovery.", icon: "BarChart3" }
    ],
    isAI: true
  },
];
