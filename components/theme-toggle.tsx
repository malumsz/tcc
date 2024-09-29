"use client";

import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const OptionMode = [
  {
    value: "light",
    label: "Claro",
    icon: SunIcon,
  },
  {
    value: "dark",
    label: "Escuro",
    icon: MoonIcon,
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Mudar Tema</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-2">
        {OptionMode.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant="ghost"
              onClick={() => setTheme(option.value)}
              className="w-full justify-start"
            >
              <Icon className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
