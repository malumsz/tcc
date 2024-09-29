// /app/form-page.tsx
"use client";  // Ativa o modo client-side para esta página

import { SimplifiedBadgedForm } from "@/components/form";

export default function FormPage() {
  return (
    <section className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Formulário de Contato</h1>
      <SimplifiedBadgedForm />
    </section>
  );
}
