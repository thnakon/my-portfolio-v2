import { Badge } from "@/components/ui/badge"
import { CheckCircle2, MapPin } from "lucide-react"

interface ExperienceHighlight {
  text: string
}

interface TimelineItemProps {
  date: string
  title: string
  company: string
  location?: string
  description: string
  highlights?: string[]
  tags?: string[]
  hideDot?: boolean
  isLast?: boolean
}

export function TimelineItem({ 
  date, 
  title, 
  company, 
  location, 
  description, 
  highlights, 
  tags, 
  hideDot,
  isLast 
}: TimelineItemProps) {
  const getIconUrl = (tech: string) => {
    const slugMap: Record<string, string> = {
      "Docker": "docker",
      "Laravel": "laravel",
      "Vue.js": "vuedotjs",
      "MySQL": "mysql",
      "React": "react",
      "Next.js": "nextdotjs",
      "TypeScript": "typescript",
      "Supabase": "supabase",
      "Tailwind": "tailwindcss",
      "Python": "python",
      "GitLab": "gitlab",
      "Figma": "figma",
      "PHP": "php",
      "HTML5": "html5",
      "CSS3": "css3",
      "JS": "javascript",
      "Bootstrap": "bootstrap",
    };
    const slug = slugMap[tech] || tech.toLowerCase();
    return `https://cdn.simpleicons.org/${slug}`;
  };

  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
      {/* Left: Date column */}
      <div className="flex md:flex-col md:items-end md:pt-5 gap-3 md:gap-2">
        <Badge
          variant="outline"
          className="font-mono font-bold text-[10px] uppercase tracking-wider py-1 px-2.5 h-fit w-fit whitespace-nowrap bg-background"
        >
          {date}
        </Badge>
      </div>

      {/* Right: Card */}
      <div className={`relative pl-6 md:pl-8 ${!isLast ? 'pb-12' : ''}`}>
        {/* Vertical connector line */}
        {!hideDot && !isLast && (
          <div className="absolute left-0 top-5 bottom-0 w-[1px] bg-border/40" />
        )}
        {/* Dot */}
        {!hideDot && (
          <div className="absolute left-[-4px] top-5 h-2.5 w-2.5 rounded-full bg-foreground ring-4 ring-background z-10" />
        )}

        {/* Content Card */}
        <div className="relative rounded-2xl border border-foreground/[0.06] bg-card/30 backdrop-blur-sm p-6 transition-all duration-300 group-hover:bg-card/60 group-hover:border-foreground/[0.12] group-hover:shadow-md group-hover:shadow-foreground/[0.03]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-foreground/[0.015] to-transparent pointer-events-none" />
          <div className="relative space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-base uppercase tracking-tight leading-snug">
                  {title}
                </h3>
                {location && (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest bg-foreground/[0.03] px-2 py-0.5 rounded-md">
                    <MapPin className="h-2.5 w-2.5" />
                    {location}
                  </div>
                )}
              </div>
              <p className="text-muted-foreground font-semibold text-sm">{company}</p>
            </div>

            <p className="text-muted-foreground/80 text-[13px] leading-relaxed">
              {description}
            </p>

            {highlights && highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                {highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 group/item">
                    <div className="h-5 w-5 rounded-lg bg-foreground/[0.03] border border-foreground/[0.05] flex items-center justify-center shrink-0 group-hover/item:bg-foreground/[0.07] transition-all duration-300">
                      <CheckCircle2 className="h-2.5 w-2.5 text-foreground/40" />
                    </div>
                    <span className="text-[12px] text-muted-foreground/90 leading-snug pt-0.5 group-hover/item:text-foreground transition-colors">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-foreground/[0.03] text-foreground/70 hover:text-foreground hover:bg-foreground/[0.06] text-[10px] items-center gap-1.5 border-transparent transition-all py-1 px-2.5 rounded-lg font-medium"
                  >
                    <img
                      src={getIconUrl(tag)}
                      alt={tag}
                      className="h-2.5 w-2.5 shrink-0 opacity-70 dark:brightness-0 dark:invert transition-all"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
