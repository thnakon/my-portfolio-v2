export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readingTime: string;
  image: string;
  tags: string[];
}

export const blogs: BlogPost[] = [
  {
    slug: "minimal-monochrome-design",
    title: "The Art of Minimalist & Monochrome Design",
    excerpt: "Exploring why less is more when it comes to modern portfolio aesthetics.",
    content: `
      Minimalism isn't just about removing things; it's about making sure only what matters remains. In this post, we dive deep into the philosophy of monochrome design and how it can elevate a developer's brand.
      
      ### Why Monochrome?
      Monochrome design forces you to focus on typography, layout, and hierarchy rather than relying on color to create interest. It creates a timeless, high-end feel that is perfect for a professional portfolio.
      
      ### Key Principles
      - **Typography is Everything**: When color is gone, your choice of font speaks louder than ever.
      - **Focus on Space**: Negative space becomes a design element in itself.
      - **Hierarchy via Contrast**: Use blacks, whites, and varying shades of gray to guide the eye.
    `,
    date: "2024-03-20",
    category: "Design",
    readingTime: "5 min read",
    image: "/blog/minimal-design.jpg",
    tags: ["Minimalism", "Design", "Aesthetics"]
  },
  {
    slug: "agentic-coding-workflows",
    title: "Mastering Agentic Coding Workflows",
    excerpt: "How AI agents are changing the way we build and maintain software in 2024.",
    content: `
      AI is no longer just a autocomplete tool. The rise of agentic workflows means we can now orchestrate complex coding tasks with AI collaborators.
      
      ### What is an Agentic Workflow?
      Unlike a simple prompt-and-response, an agentic workflow involves an AI that can plan, execute, and verify its own work. It uses tools, researches codebases, and iterates based on feedback.
      
      ### The Future of Development
      We are moving towards a future where developers act more like architects or conductors, guiding a fleet of AI agents to build robust systems at unprecedented speeds.
    `,
    date: "2024-03-15",
    category: "AI",
    readingTime: "8 min read",
    image: "/blog/ai-coding.jpg",
    tags: ["AI", "Coding", "Workflows"]
  },
  {
    slug: "building-performant-nextjs-apps",
    title: "Building Ultra-Performant Next.js Applications",
    excerpt: "Advanced techniques for optimizing your React apps for speed and SEO.",
    content: `
      Performance isn't a feature; it's a requirement. Next.js provides many tools out of the box, but mastering them takes effort.
      
      ### Server Components vs. Client Components
      Use Server Components by default. Only use Client Components when you need interactivity or browser APIs. This reduces the JavaScript bundle size significantly.
      
      ### Image Optimization
      Next.js's Image component is magic. It handles lazy loading, resizing, and serving modern formats like WebP automatically. Always use it.
    `,
    date: "2024-03-10",
    category: "Development",
    readingTime: "6 min read",
    image: "/blog/nextjs-performance.jpg",
    tags: ["Next.js", "React", "Performance"]
  }
];
