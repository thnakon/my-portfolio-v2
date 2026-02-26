export const getTechIconSlug = (tag: string) => {
  const t = tag.toLowerCase();
  
  if (t.includes("next.js") || t.includes("nextjs")) return "nextdotjs";
  if (t.includes("react")) return "react";
  if (t.includes("tailwind")) return "tailwindcss";
  if (t.includes("typescript") || t === "ts") return "typescript";
  if (t.includes("javascript") || t === "js") return "javascript";
  if (t.includes("three")) return "threedotjs";
  if (t.includes("prisma")) return "prisma";
  if (t.includes("framer")) return "framer";
  if (t.includes("gsap") || t.includes("greensock")) return "greensock";
  if (t.includes("mysql")) return "mysql";
  if (t.includes("postgresql") || t.includes("postgres")) return "postgresql";
  if (t.includes("supabase")) return "supabase";
  if (t.includes("laravel")) return "laravel";
  if (t.includes("vue")) return "vuedotjs";
  if (t.includes("docker")) return "docker";
  if (t.includes("openai")) return "openai";
  if (t.includes("claude")) return "claude";
  if (t.includes("gemini")) return "googlegemini";
  if (t.includes("figma")) return "figma";
  if (t.includes("vercel")) return "vercel";
  if (t.includes("node.js") || t.includes("nodejs")) return "nodedotjs";
  if (t.includes("html")) return "html5";
  if (t.includes("css")) return "css3";
  if (t.includes("php")) return "php";
  if (t.includes("shadcn")) return "shadcnui";
  if (t.includes("lucide")) return "lucide";
  if (t.includes("bootstrap")) return "bootstrap";
  if (t.includes("chatgpt")) return "openai";
  if (t.includes("rag") || t.includes("llm") || t.includes("agentic") || t.includes("openclaw")) return "openai";
  if (t.includes("css3") || t === "css") return "css3";

  return t.replace(/\s+/g, "");
};
