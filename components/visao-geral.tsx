'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { FileText, CheckCircle2, Sun, MousePointer, BarChartBig } from "lucide-react"

export function VisaoGeral() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="group hover:bg-secondary/10">
          Visão Geral
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Visão Geral</DialogTitle>
          <DialogDescription className="text-lg">
            Ferramenta para Inspeção de Transparência de Dados Pessoais
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground">
            <p className="leading-relaxed">
              Este projeto aborda a carência de ferramentas práticas e acessíveis para avaliar a transparência das práticas de manipulação de dados pessoais. O objetivo é propor uma ferramenta para inspeção de Transparência de Dados Pessoais em aplicações de software.
            </p>
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center mb-3">
                <MousePointer className="mr-2 h-5 w-5 text-primary" />
                Funcionalidades
              </h3>
              <ul className="space-y-3">
                {[
                  { icon: CheckCircle2, text: "Preenchimento do formulário de inspeção em escalas de <u>Suficiente</u>, <u>Insuficiente</u> e <u>Inexistente</u>." },
                  { icon: BarChartBig, text: "Cálculo de um <b>score</b> final com base nas respostas, acompanhado de gráficos visuais." },
                  { icon: FileText, text: "Exportação do resultado em formato <b>JSON</b> ao final da inspeção." },
                  { icon: Sun, text: "<b>Modo claro</b>/<b>escuro</b> para melhor adaptação visual com base na preferência do usuário." },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <item.icon className="mr-2 h-5 w-5 text-primary mt-0.5" />
                    <span dangerouslySetInnerHTML={{ __html: item.text }} />
                  </li>
                ))}
              </ul>
            </div>
            <p className="leading-relaxed">
              Esta ferramenta visa capacitar os usuários a tomar decisões mais informadas sobre sua privacidade e auxiliar desenvolvedores na criação de software em conformidade com legislações como GDPR e LGPD.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
