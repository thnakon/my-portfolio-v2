"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/language-context";

export function FixedNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.projects"), path: "/projects" },
    { name: t("nav.experience"), path: "/experience" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav className="absolute top-8 right-8 z-50 flex flex-col items-end space-y-1.5 pointer-events-auto">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          style={{ fontWeight: 400, fontSize: "12px" }}
          className={`inline-block tracking-[0.08em] transition-all duration-300 hover:-translate-x-1.5 ${
            pathname === item.path
              ? "text-black dark:text-white"
              : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
