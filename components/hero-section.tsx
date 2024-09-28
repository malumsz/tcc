'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Github, Book, ArrowRight, Layers, Scale, Sticker } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { VisaoGeral } from "@/components/visao-geral"

export function HeroSectionComponent() {
  const tccAspects = [
    { 
      icon: Layers, 
      title: "TR-Model", 
      description: "Uma aplicação de perfil de metadados para transparência de dados pessoais.",
      link: "https://each.usp.br/cond_met_pand/trmodel/"
    },
    { 
      icon: Scale, 
      title: "LGPD", 
      description: "Aplicação dos princípios da Lei Geral de Proteção de Dados (LGPD).",
      link: "https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd"
    },
    { 
      icon: Sticker, 
      title: "Feedback", 
      description: "Espaço para coletar e implementar sugestões de melhorias da comunidade.",
      link: "https://forms.gle/bPuCZdbjnKW9dTLS9"
    }
  ]

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl overflow-hidden shadow-lg">
        <CardContent className="p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col space-y-8 lg:w-1/2 justify-center">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="bg-primary rounded-full p-2">
                  <Shield className="h-5 w-5 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <h1 className="text-xl sm:text-3xl font-bold text-primary">Privacy Tool</h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-sm sm:text-base text-muted-foreground"
              >
                Uma ferramenta para Inspeção de Transparência de Dados Pessoais, construída com base na Lei Geral de Proteção de Dados (LGPD) e no TR-Model.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                  Inspeção
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <VisaoGeral />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4"
              >
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Github className="mr-2 h-4 w-4" />
                  Repositório
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  <Book className="mr-2 h-4 w-4" />
                  Documentação
                </Button>
              </motion.div>
            </div>

            <div className="lg:w-1/2 flex flex-col justify-between h-[500px]">
              {tccAspects.map((aspect, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className={`
                    transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105
                    ${index % 2 === 0 ? 'self-start' : 'self-end'}
                    ${index === 1 ? 'w-5/6' : 'w-4/5'}
                  `}
                >
                  <Card className="h-full">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div className="pl-3 flex items-center space-x-2">
                        <aspect.icon className="h-7 w-5 text-primary" />
                        <h3 className="font-semibold text-sm">{aspect.title}</h3>
                      </div>
                      <p className="pl-3 text-xs text-muted-foreground mt-2">{aspect.description}</p>
                      <Button variant="ghost" size="sm" className="self-start mt-1">
                        <Link href={aspect.link} target="_blank">Saiba mais</Link>
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}