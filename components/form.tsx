'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import HomeButton from '@/components/home-button'
import { InfoIcon, MousePointerSquare, Users, Database, Share2, ShieldCheck, LucideIcon, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { questions, sectionDescriptions, QuestionCategory, QuestionSection } from '@/components/util/questions'
import { saveFormData, getFormData } from '@/components/util/formStorage'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const sectionIcons: Record<QuestionSection, LucideIcon> = {
  'Pessoas/Atores': Users,
  'Propósito de uso': MousePointerSquare,
  'Dados pessoais': Database,
  'Compartilhamento': Share2,
  'Agenciamento': ShieldCheck,
}

export default function FormularioInspecao() {
  const router = useRouter()

  const initialFormData: Record<QuestionSection, Record<string, string>> = Object.keys(questions).reduce((acc, section) => {
    acc[section as QuestionSection] = {};
    return acc;
  }, {} as Record<QuestionSection, Record<string, string>>);

  const [formData, setFormData] = useState<Record<QuestionSection, Record<string, string>>>(initialFormData)
  const [otherText, setOtherText] = useState<Record<QuestionSection, Record<string, string>>>(initialFormData)
  const [activeSection, setActiveSection] = useState<QuestionSection>('Pessoas/Atores');
  const [activeCategory, setActiveCategory] = useState<QuestionCategory>('Existência e Qualidade da Informação');
  const [progress, setProgress] = useState<Record<QuestionSection, number>>({} as Record<QuestionSection, number>);
  const [totalProgress, setTotalProgress] = useState<number>(0);

  const handleRadioChange = (section: QuestionSection, questionKey: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionKey]: value
      }
    }))
  }

  const handleOtherTextChange = (section: QuestionSection, questionKey: string, value: string) => {
    setOtherText(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [questionKey]: value
      }
    }))
  }

  const handleCalculate = () => {
    saveFormData(formData, otherText)
    router.push('/result-page')
  }

  useEffect(() => {
    const { formData: savedFormData, otherText: savedOtherText } = getFormData()
    if (Object.keys(savedFormData).length > 0) {
      setFormData(savedFormData)
    }
    if (Object.keys(savedOtherText).length > 0) {
      setOtherText(savedOtherText)
    }
  }, [])

  useEffect(() => {
    saveFormData(formData, otherText)
  }, [formData, otherText])

  useEffect(() => {
    const newProgress: Record<QuestionSection, number> = {} as Record<QuestionSection, number>;
    let totalAnswered = 0;
    let totalQuestions = 0;

    (Object.keys(questions) as QuestionSection[]).forEach(section => {
      const sectionQuestions = Object.values(questions[section]).flat().length;
      const answeredQuestions = Object.keys(formData[section] || {}).length;
      newProgress[section] = (answeredQuestions / sectionQuestions) * 100;
      totalAnswered += answeredQuestions;
      totalQuestions += sectionQuestions;
    })

    setProgress(newProgress)
    setTotalProgress((totalAnswered / totalQuestions) * 100)
  }, [formData])

  const isSectionComplete = (section: QuestionSection) => {
    return progress[section] === 100;
  }

  const isCategoryComplete = (section: QuestionSection, category: QuestionCategory) => {
    const categoryQuestions = questions[section][category];
    const answeredQuestions = categoryQuestions.filter((_, index) =>
      formData[section]?.[`${category}-${index}`]
    );
    return answeredQuestions.length === categoryQuestions.length;
  }

  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    setOpen(false)
    router.push('/')
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <HomeButton />
        <Card className="w-full">
          <CardHeader className="pb-0">
            <CardTitle className="text-xl sm:text-3xl font-bold text-primary">Formulário de Inspeção</CardTitle>
            <CardDescription className="pb-3 text-sm sm:text-base text-muted-foreground">Preencha o formulário de acordo com sua avaliação.</CardDescription>
            <Separator className="mt-5" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="lg:w-1/5">
                <div className="mb-2">
                  <h2 className="pl-4 pt-4 text-lg font-bold">Seções</h2>
                </div>
                <ScrollArea className="h-[calc(100vh-24rem)]">
                  <nav className="flex flex-col space-y-1">
                    {(Object.keys(questions) as QuestionSection[]).map((section) => {
                      const Icon = sectionIcons[section]
                      return (
                        <Button
                          key={section}
                          variant={activeSection === section ? "secondary" : "ghost"}
                          className={cn(
                            "justify-start w-full text-left",
                            activeSection === section ? "bg-secondary" : "hover:bg-secondary/50"
                          )}
                          onClick={() => setActiveSection(section)}
                        >
                          <Icon className="mr-2 h-4 w-4 flex-shrink-0" />
                          <span className="truncate flex-grow">{section}</span>
                          {isSectionComplete(section) && (
                            <CheckCircle2 className="ml-2 h-4 w-4 text-green-500 flex-shrink-0" />
                          )}
                        </Button>
                      )
                    })}
                  </nav>
                </ScrollArea>
                <div className="mt-4 space-y-2">
                  <Progress value={totalProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">
                    {Math.round(totalProgress)}% concluído
                  </p>
                  <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="w-full py-2 text-sm"
                      >
                        Calcular
                      </Button>
                    </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Prosseguir?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Preencha todas as respostas para garantir um resultado mais preciso. Caso algum campo esteja vazio, o cálculo pode não refletir a análise completa.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCalculate}>Calcular</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
              </aside>
              <div className="flex-1 lg:max-w-4xl">
                <ScrollArea className="h-[calc(100vh-16rem)] pr-6">
                  <div className="space-y-6">
                    <div className="sticky top-0 bg-background z-10 py-4">
                      <h2 className="text-2xl font-bold">{activeSection}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{sectionDescriptions[activeSection]}</p>
                      <Separator className="mt-4" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.keys(questions[activeSection]).map((category) => (
                        <Badge
                          key={category}
                          variant={activeCategory === category ? "default" : "outline"}
                          className={cn(
                            "text-xs sm:text-sm cursor-pointer flex items-center justify-center",
                            "px-2 py-1 sm:px-3 sm:py-1.5",
                            "transition-all duration-200 ease-in-out",
                            activeCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                            isCategoryComplete(activeSection, category as QuestionCategory) ? "border-green-500 border-2" : ""
                          )}
                          onClick={() => setActiveCategory(category as QuestionCategory)}
                        >
                          <span className="truncate">{category}</span>
                          {isCategoryComplete(activeSection, category as QuestionCategory) && (
                            <CheckCircle2 className="ml-1 h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          )}
                        </Badge>
                      ))}
                    </div>
                    <div>
                      {questions[activeSection][activeCategory].map((question, qIndex) => {
                        const questionNumber = questions[activeSection][activeCategory].findIndex((q) => q === question) + 1;
                        const options = activeCategory === 'Formato de Apresentação'
                          ? ['Apropriado', 'Inapropriado', 'Necessita melhorias', 'Outro']
                          : ['Suficiente', 'Insuficiente', 'Inexistente', 'Outro'];
                        return (
                          <Card key={`${activeCategory}-${qIndex}`} className="relative mb-4">
                            <CardContent className="pt-6 pb-4 px-6">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: questionNumber * 0.1 }}
                              >
                                <Label className="text-base font-medium mb-2 block">
                                  <span className="font-bold mr-2">{questionNumber}.</span>
                                  {question}
                                </Label>
                                <Separator className="my-4" />
                                <RadioGroup
                                  value={formData[activeSection]?.[`${activeCategory}-${qIndex}`] || ""}
                                  onValueChange={(value) => handleRadioChange(activeSection, `${activeCategory}-${qIndex}`, value)}
                                  className="flex flex-col space-y-2 mt-2"
                                >
                                  {options.map((option) => (
                                    <div key={option} className="flex items-center space-x-2">
                                      <RadioGroupItem value={option} id={`${activeSection}-${activeCategory}-${qIndex}-${option}`} />
                                      <Label htmlFor={`${activeSection}-${activeCategory}-${qIndex}-${option}`}>{option}</Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                                {formData[activeSection]?.[`${activeCategory}-${qIndex}`] === 'Outro' && (
                                  <Input
                                    type="text"
                                    placeholder="Descreva"
                                    className="mt-2"
                                    value={otherText[activeSection]?.[`${activeCategory}-${qIndex}`] || ''}
                                    onChange={(e) => handleOtherTextChange(activeSection, `${activeCategory}-${qIndex}`, e.target.value)}
                                  />
                                )}
                              </motion.div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
