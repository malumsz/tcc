"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { SimplifiedBadgedForm } from "@/components/form"
import { HeroSectionComponent } from "@/components/hero-section"


export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6">
      <HeroSectionComponent/>
    </section>
  )
}
