export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Privacy Tool",
  description:
    "Ferramenta para Inspeção de Transparência de Dados Pessoais",
  mainNav: [
    {
      title: "Início",
      href: "/",
    },
    {
      title: "Inspeção",
      href: "/form-page",
    },
  ],
  links: {
    twitter: "https://github.com/malumsz/tcc/blob/main/Documentation.pdf",
    //github: "https://github.com/malumsz/tcc",
    docs: "https://ui.shadcn.com",
  },
}
