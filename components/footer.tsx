"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Footer() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) {
    return null;
  }

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Image
            src={currentTheme === "dark" ? "/uenp-dark.png" : "/uenp-light.png"}
            alt="Logo"
            width={96}
            height={96}
            className="h-14 w-14"
            layout="fixed"
          />
          <span className="text-sm text-muted-foreground font-semibold">UENP</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}. Todos os direitos reservados.
        </p>
        <p className="text-sm text-muted-foreground">
          Feito com{" "}
          <a
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn
          </a>{" "}
          por malu moreira.
        </p>
      </div>
    </footer>
  );
}
