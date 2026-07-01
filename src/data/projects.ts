export interface Feature {
  text: string;
  icon: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
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
    slug: "wishdom-by-f1",
    title: "Wishdom by F1",
    date: "May 2026 – Jul 2026",
    description: "Real-time booking system for a tutoring center and co-working space, supporting hourly, daily, weekly, and monthly reservations.",
    overview: "A fully automated booking platform integrating LINE chat-based reservations alongside standard web booking, with automated payment slip verification.",
    image: "/projects/wishdom-preview.png",
    tags: ["Next.js", "React", "Supabase", "LINE API", "TypeScript"],
    githubUrl: undefined,
    liveUrl: "https://www.wishdombyf1forall.com",
    architecture: [
      "Frontend: Next.js with React for a seamless booking experience",
      "Backend: Supabase for real-time data and authentication",
      "Integration: LINE Messaging API with automated reply bot",
      "Payments: Automated slip verification to reduce manual checks"
    ],
    deployment: "Hosted on Vercel with Supabase global edge infrastructure for low-latency real-time updates.",
    features: [
      { text: "Built LINE chat-based booking with an automated reply API alongside standard web booking.", icon: "Zap" },
      { text: "Implemented automatic payment slip verification to increase transparency and reduce manual checks.", icon: "ShieldCheck" },
      { text: "Automated the full booking lifecycle — confirmation, cancellation, and rescheduling.", icon: "BarChart3" },
      { text: "Replaced a previously untracked manual process with a fully auditable system.", icon: "Inbox" }
    ],
    isAI: false
  },
  {
    slug: "provision-provider",
    title: "Provision Provider",
    date: "May 2026",
    description: "Restored and modernized the company website for an AV, Lighting & Sound Systems installer — delivered in 7 days.",
    overview: "Revitalized a non-functioning company website within a legacy tech stack, delivering full restoration with modern UI in 7 days.",
    image: "/projects/provision-preview.png",
    tags: ["HTML/CSS", "JavaScript", "PHP"],
    githubUrl: undefined,
    liveUrl: "https://provisionprovider.com",
    architecture: [
      "Legacy Stack: Worked within existing technology to preserve stability",
      "UI Modernization: Refreshed design while maintaining data continuity",
      "Content: Updated all audio/visual/lighting systems installer content",
      "Delivery: Full project completed and deployed in 7 days"
    ],
    deployment: "Deployed on existing server infrastructure with updated content and optimized asset loading.",
    features: [
      { text: "Restored a non-functioning company website database back to full working order.", icon: "Zap" },
      { text: "Modernized the site's UI while working within an existing legacy technology stack.", icon: "Inbox" },
      { text: "Delivered the full project within 7 days, including updated content and new data entries.", icon: "BarChart3" },
      { text: "Updated all audio/visual/lighting product listings and company information.", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    slug: "wainai-wing-jhing-mai",
    title: "Wainai Wing Jhing Mai",
    date: "Apr 2026 – May 2026",
    description: "Temple database website covering Mueang Chiang Mai district, built with Laravel and MySQL.",
    overview: "A comprehensive temple directory covering Mueang Chiang Mai, independently designed and built from database structure to UI/UX.",
    image: "/projects/wainai-preview.png",
    tags: ["Laravel", "MySQL", "HTML/CSS", "JavaScript"],
    githubUrl: undefined,
    liveUrl: undefined,
    architecture: [
      "Backend: Laravel for robust routing and MVC architecture",
      "Database: MySQL with a custom-designed schema for temple data",
      "Data: Independently collected and photographed primary source data",
      "UI/UX: Designed from the ground up for accessible browsing"
    ],
    deployment: "Shared hosting with optimized database queries for efficient directory lookups.",
    features: [
      { text: "Designed and developed a temple database covering Mueang Chiang Mai district.", icon: "Zap" },
      { text: "Independently collected and photographed primary source data for the database.", icon: "Inbox" },
      { text: "Designed the full database structure, system architecture, and UI/UX from scratch.", icon: "BarChart3" },
      { text: "Built with Laravel and MySQL for reliable data management.", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    slug: "oboun-erp",
    title: "Oboun ERP",
    date: "Aug 2025 – Mar 2026",
    description: "Pharmacy Management System developed as a final project, improving inventory tracking and automating drug safety alerts.",
    overview: "A full-scale ERP system for pharmacy management with automated safety alerts, inventory accuracy improvements, and streamlined workflows.",
    image: "/projects/oboun-preview.png",
    hoverImage: "/projects/oboun-pos.png",
    tags: ["Laravel", "Vue.js 3", "MySQL", "Tailwind", "Docker"],
    githubUrl: "https://github.com/thnakon/ERP_PMS",
    liveUrl: undefined,
    architecture: [
      "Routing: Built on Laravel with full SPA capabilities via Vue.js",
      "Database: MySQL with advanced indexing for sub-second queries",
      "Authentication: Custom auth with role-based access control",
      "Containers: Docker for consistent dev and production environments"
    ],
    deployment: "Self-hosted with Docker containerization and automated backup workflows.",
    features: [
      { text: "Improved inventory tracking accuracy (Survey Satisfaction x̄ = 4.47).", icon: "BarChart3" },
      { text: "Built automated drug safety alerts for Pregnancy and G6PD conditions.", icon: "ShieldCheck" },
      { text: "Streamlined pharmacy workflows and ensured data integrity across departments.", icon: "Zap" },
      { text: "Designed a complete ERP from database structure to UI/UX.", icon: "Inbox" }
    ],
    isAI: false
  },
  {
    slug: "babybib",
    title: "Babybib",
    date: "Nov 2025 – Jan 2026",
    description: "Automated bibliography generation system reducing manual citation time by 70% via automation.",
    overview: "A high-performance citation engine integrating Open Library and Google Books APIs for intelligent academic formatting.",
    image: "/projects/babybib-preview.png",
    stackImages: ["/projects/babybib2.png", "/projects/babybib3.png"],
    githubUrl: "https://github.com/thnakon/Babybib",
    tags: ["HTML5", "CSS3", "JavaScript", "PHP"],
    liveUrl: "https://babybib.com",
    architecture: [
       "Core Engine: PHP-based regex parser for dynamic citation building",
       "Frontend: Zero-dependency JavaScript for ultra-fast performance",
       "APIs: Open Library and Google Books API for metadata extraction",
       "Standards: Strict adherance to APA 7th Edition logic"
    ],
    deployment: "Optimized for lightweight hosting with minimal server overhead. Static assets served via global CDN.",
    features: [
      { text: "Reduced manual citation time by 70% via intelligent automation.", icon: "Zap" },
      { text: "Integrated Smart Search using Open Library and Google Books APIs.", icon: "Inbox" },
      { text: "Organized references with a project-based management system.", icon: "BarChart3" },
      { text: "Features real-time bibliography previews and instant validation logic.", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    slug: "singha-enterprise",
    title: "Enterprise Web (Internship)",
    date: "Apr 2025 – Jun 2025",
    description: "Contributed to developing and updating new products and building new APIs for Singha's official website during internship.",
    overview: "Worked on a high-traffic enterprise platform at Merge Digital Agency, contributing to real-world client features and API development.",
    image: "/projects/sigha1.png",
    hoverImage: "/projects/sigha2.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: undefined,
    liveUrl: "https://www.singha.com",
    architecture: [
      "Frontend: Next.js with server-side rendering for optimal SEO and performance",
      "Styling: Tailored CSS and Tailwind for high-fidelity enterprise UI",
      "APIs: Developed and updated APIs for real-world client product features",
      "Scale: Modular architecture for enterprise-level codebase maintainability"
    ],
    deployment: "Enterprise-grade hosting with global CDN for low-latency access.",
    features: [
      { text: "Contributed to developing and updating new products for a real-world client.", icon: "Zap" },
      { text: "Built and updated new APIs as part of the Singha core development team.", icon: "Inbox" },
      { text: "Built real-time object detection using YOLO (Python) for product automation.", icon: "ShieldCheck" },
      { text: "Developed full-lifecycle Laravel web applications in a professional agency setting.", icon: "BarChart3" }
    ],
    isAI: false
  },
  {
    slug: "klin-dental-clinic",
    title: "Medical Platform (Internship)",
    date: "Apr 2025 – Jun 2025",
    description: "Klin Dental Clinic: A comprehensive dental clinic management and booking platform built during internship.",
    overview: "Developed during an internship at Merge Digital Agency to streamline patient scheduling and clinic operations.",
    image: "/projects/1.png",
    hoverImage: "/projects/2.png",
    tags: ["Laravel", "Bootstrap", "MySQL", "JavaScript"],
    githubUrl: undefined,
    liveUrl: undefined,
    architecture: [
      "Framework: Laravel for robust server-side logic and API management",
      "Database: MySQL for secure and relational patient data storage",
      "Frontend: JavaScript and Bootstrap for a responsive clinical interface",
      "Standards: Industry-standard medical data handling and appointment logic"
    ],
    deployment: "On-premise deployment with automated backup systems and local network optimization.",
    features: [
      { text: "Patient Scheduling: Efficient booking system for dental appointments.", icon: "Zap" },
      { text: "Clinic Operations: Tools to manage daily tasks and patient records.", icon: "Inbox" },
      { text: "Management Dashboard: Real-time overview of clinic performance.", icon: "BarChart3" },
      { text: "Secure Records: Encrypted patient history and medical documentation.", icon: "ShieldCheck" }
    ],
    isAI: false
  },
  {
    slug: "portfolio-v2",
    title: "My Portfolio v2",
    date: "2025 – Present",
    description: "A premium minimalist portfolio built with the latest stack for performance, interaction, and aesthetics.",
    overview: "A state-of-the-art developer portfolio showcasing advanced web development techniques and high-end animations.",
    image: "/projects/port-v2-1.png",
    hoverImage: "/projects/port-v2-2.png",
    tags: ["Next.js 16", "React 19", "TypeScript", "Framer Motion", "Prisma", "MySQL"],
    githubUrl: "https://github.com/thnakon/my-portfolio-v2",
    liveUrl: "https://my-portfolio-v2-eight-iota.vercel.app/",
    architecture: [
      "Frontend: Next.js 16 (App Router) with React 19 concurrent features",
      "Animations: High-fidelity motion with Framer Motion and view transitions",
      "Backend: Prisma ORM with MySQL for robust data management and NextAuth",
      "Styling: Tailwind CSS 4 for modern utility-first design"
    ],
    deployment: "Optimized Vercel deployment with edge functions and global asset distribution.",
    features: [
      { text: "Advanced Web Development: Built with a focus on modern architectures and clean code.", icon: "Code2" },
      { text: "Creative Interaction: Seamless shared layout transitions and micro-animations.", icon: "Sparkles" },
      { text: "Performance First: Optimized bundle size, asset loading, and Core Web Vitals.", icon: "Zap" },
      { text: "Command System: Intelligent site-wide search and navigation palette.", icon: "Search" }
    ],
    isAI: false
  },
];
