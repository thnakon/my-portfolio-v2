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
  {
    slug: "mai-lon",
    title: "Mai-lon",
    description: "A single platform that helps students \"study hard, succeed in their careers, and live a good life.\"",
    overview: "Designed to empower student journeys from academic excellence to professional success.",
    image: "/projects/5.png",
    hoverImage: "/projects/6.png",
    tags: ["Next.js 14", "Supabase", "Tailwind CSS", "TypeScript", "shadcn/ui"],
    githubUrl: "https://github.com/thnakon/Mai-Lon",
    liveUrl: "#", // Placeholder
    architecture: [
      "Framework: Next.js 14 with App Router for optimal performance",
      "Backend: Supabase for real-time data, authentication, and vector search",
      "UI Library: shadcn/ui for accessible and modular components",
      "Styling: Modern Tailwind CSS for a refined, student-focused aesthetic"
    ],
    deployment: "Vercel serverless deployment with automated CI/CD and production-grade monitoring.",
    features: [
      { text: "Academic Excellence: Comprehensive study tools and lecture management.", icon: "Zap" },
      { text: "Career Success: Career tracking and professional networking resources.", icon: "Inbox" },
      { text: "Personal Well-being: Features for balanced living and lifestyle management.", icon: "BarChart3" },
      { text: "Unified Experience: A single workspace for all student-related activities.", icon: "Smartphone" }
    ],
    isAI: false
  },
  {
    slug: "klin-dental-clinic",
    title: "Medical Platform (Internship)",
    description: "Klin Dental Clinic: A comprehensive dental clinic management and booking platform.",
    overview: "Developed during an internship to streamline patient scheduling and clinic operations.",
    image: "/projects/1.png",
    hoverImage: "/projects/2.png",
    tags: ["Laravel", "Bootstrap", "MySQL", "JavaScript"],
    githubUrl: undefined,
    liveUrl: undefined,
    architecture: [
      "Framework: Laravel for robust server-side logic and API management",
      "Database: MySQL for secure and relational patient data storage",
      "Frontend: JavaScript and Bootstrap for a responsive and intuitive clinical interface",
      "Standards: Industry-standard medical data handling and appointment logic"
    ],
    deployment: "On-premise deployment with automated backup systems and local network optimization.",
    features: [
      { text: "Patient Scheduling: Efficient booking system for dental appointments.", icon: "Zap" },
      { text: "Clinic Operations: Tools to manage daily tasks and patient records.", icon: "Inbox" },
      { text: "Management Dashboard: Real-time overview of clinic performance and status.", icon: "BarChart3" },
      { text: "Secure Records: Encrypted patient history and medical documentation.", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    slug: "singha-enterprise",
    title: "Enterprise Web (Internship)",
    description: "Contribution to the development of the official Singha website during an internship. Focused on enhancing web performance and implementing new features.",
    overview: "Worked on a high-traffic enterprise platform, optimizing frontend performance and modularity.",
    image: "/projects/sigha1.png",
    hoverImage: "/projects/sigha2.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Performance Optimization"],
    githubUrl: undefined,
    liveUrl: "https://www.singha.com",
    architecture: [
      "Frontend: Next.js with server-side rendering for optimal SEO and performance",
      "Styling: Tailored CSS and Tailwind for high-fidelity enterprise UI",
      "Optimization: Implemented lazy loading, image optimization, and code splitting",
      "Scale: Modular architecture for enterprise-level codebase maintainability"
    ],
    deployment: "Enterprise-grade hosting with global CDN (Content Delivery Network) for low-latency access.",
    features: [
      { text: "Performance Tuning: Significant improvements in Core Web Vitals.", icon: "Zap" },
      { text: "Feature Implementation: Developed interactive components for product showcases.", icon: "Inbox" },
      { text: "Enterprise Scale: Handled complex workflows within a large-scale codebase.", icon: "Monitor" },
      { text: "High Fidelity: Translated complex design requirements into pixel-perfect web interfaces.", icon: "Star" }
    ],
    isAI: false
  },
  {
    slug: "portfolio-v1",
    title: "My Portfolio v1",
    description: "A high-performance personal portfolio website built with a focus on premium aesthetics, narrative storytelling, and cutting-edge web technologies.",
    overview: "My first major portfolio redesign focusing on high-end interaction design and performance.",
    image: "/projects/portfolio-home.png",
    hoverImage: "/projects/portfolio-about.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lucide"],
    githubUrl: "https://github.com/thnakon/my-portfolio",
    liveUrl: "https://my-portfolio-silk-sigma-85.vercel.app/",
    architecture: [
      "Framework: Next.js with App Router for modern dev experience",
      "Animations: Framer Motion for complex, high-fidelity UI transitions",
      "Icons: Lucide for a consistent and professional stroke-based icon style",
      "Styling: Tailwind CSS for rapid and modular design implementation"
    ],
    deployment: "Vercel deployment with optimized asset delivery and serverless handling.",
    features: [
      { text: "Narrative Storytelling: Engaging content layouts that tell a story.", icon: "Zap" },
      { text: "Premium Aesthetics: Minimalist and high-contrast design language.", icon: "Star" },
      { text: "Motion Design: Smooth interactions and page transitions.", icon: "Sparkles" },
      { text: "Responsive: Fully optimized for all device categories and screen sizes.", icon: "Smartphone" }
    ],
    isAI: false
  },
];
