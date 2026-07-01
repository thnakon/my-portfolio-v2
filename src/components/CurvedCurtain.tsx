"use client";

import { cn } from "@/lib/utils";

/**
 * A translucent, blurred glass panel that fills its animated parent (which
 * should be `fixed inset-0`) and hangs a convex curved edge just below the
 * viewport.
 *
 * When the parent sits at translateY(0) the panel covers the whole screen and
 * the curved edge is parked below the fold (invisible). As the parent slides
 * up, the curve rises into view and becomes the signature curved reveal edge.
 *
 * Shared by the entrance <Preloader /> and the page-transition <template>, so
 * both use the exact same shape and colour.
 */
export function CurvedCurtain({
  color = "rgba(12, 12, 14, 1)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{ backgroundColor: color }}
      aria-hidden
    >
      {/* Curved edge hanging just below the solid panel. */}
      <svg
        className="absolute left-0 top-full w-full"
        style={{ height: "16vh", color, display: "block" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Flat top edge + a shallow, wide downward bulge (center lowest). */}
        <path d="M0,0 L100,0 Q50,100 0,0 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
