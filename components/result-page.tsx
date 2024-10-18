'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { downloadFormData, clearFormData, getFormData } from '@/components/util/formStorage'
import { questions, QuestionSection, QuestionCategory, sectionDescriptions } from '@/components/util/questions'
import HomeButton from '@/components/home-button'
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Trophy, AlertCircle, Users, MousePointerSquare, Database, Share2, ShieldCheck, CheckCircle2, LucideIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Medal {
  type: string;
  color: string;
  icon: JSX.Element;
}

interface CategoryScore {
  score: number;
  percentageAnswered: number;
}

interface SectionScore extends CategoryScore {
  medal: Medal;
}

type FormData = Record<QuestionSection, Record<string, string>>
type ProcessedFormData = Record<QuestionSection, Record<QuestionCategory, Record<string, string>>>

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

const COLORS: Record<string, string> = {
  'Suficiente': 'hsl(var(--chart-1))',
  'Insuficiente': 'hsl(var(--chart-2))',
  'Inexistente': 'hsl(var(--chart-3))',
  'Outro': 'hsl(var(--chart-4))',
  'Apropriado': 'hsl(var(--chart-1))',
  'Inapropriado': 'hsl(var(--chart-2))',
  'Necessita melhorias': 'hsl(var(--chart-3))'
}

const sectionIcons: Record<QuestionSection, LucideIcon> = {
  'Pessoas/Atores': Users,
  'Propósito de uso': MousePointerSquare,
  'Dados pessoais': Database,
  'Compartilhamento': Share2,
  'Agenciamento': ShieldCheck,
}

const getMedalType = (score: number): Medal => {
  if (score >= 91) return { type: 'Ouro', color: '#FFD700', icon: <Trophy className="h-6 w-6 text-yellow-500" /> }
  if (score >= 61) return { type: 'Prata', color: '#C0C0C0', icon: <Trophy className="h-6 w-6 text-gray-400" /> }
  if (score >= 41) return { type: 'Bronze', color: '#CD7F32', icon: <Trophy className="h-6 w-6 text-orange-700" /> }
  return { type: 'Iniciante', color: '#808080', icon: <Trophy className="h-6 w-6 text-gray-600" /> }
}

const calculateCategoryScore = (categoryData: Record<string, string>, totalQuestions: number): CategoryScore => {
  let score = 0
  let answeredQuestions = 0

  Object.values(categoryData).forEach(answer => {
    if (answer) {
      answeredQuestions++
      if (answer === 'Apropriado' || answer === 'Suficiente') {
        score += 100
      } else if (answer === 'Necessita melhorias' || answer === 'Insuficiente') {
        score += 50
      }
    }
  })

  const categoryScore = Math.round((score / (totalQuestions * 100)) * 100)
  const percentageAnswered = (answeredQuestions / totalQuestions) * 100

  return { score: categoryScore, percentageAnswered }
}

const calculateSectionScore = (sectionScores: Record<QuestionCategory, CategoryScore>): SectionScore => {
  const scores = Object.values(sectionScores)
  const totalScore = scores.reduce((acc, curr) => acc + curr.score, 0)
  const totalPercentage = scores.reduce((acc, curr) => acc + curr.percentageAnswered, 0)
  const averageScore = Math.round(totalScore / scores.length)
  const averagePercentage = totalPercentage / scores.length

  return {
    score: averageScore,
    percentageAnswered: averagePercentage,
    medal: getMedalType(averageScore)
  }
}

const countAnswers = (categoryData: Record<string, string>): ChartData[] => {
  const counts: Record<string, number> = {}
  Object.values(categoryData).forEach(answer => {
    if (answer) {
      counts[answer] = (counts[answer] || 0) + 1
    }
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value, fill: COLORS[name] || 'hsl(var(--chart-5))' }))
}

const processFormData = (rawFormData: FormData): ProcessedFormData => {
  const processedData: ProcessedFormData = {} as ProcessedFormData;
  Object.entries(rawFormData).forEach(([section, sectionData]) => {
    processedData[section as QuestionSection] = {} as Record<QuestionCategory, Record<string, string>>;
    Object.entries(questions[section as QuestionSection]).forEach(([category, _]) => {
      processedData[section as QuestionSection][category as QuestionCategory] = {};
      Object.entries(sectionData).forEach(([key, value]) => {
        if (key.startsWith(category)) {
          processedData[section as QuestionSection][category as QuestionCategory][key] = value;
        }
      });
    });
  });
  return processedData;
};

const renderSectionSummary = (section: QuestionSection, sectionScores: Record<QuestionSection, SectionScore>) => {
  const sectionScore = sectionScores[section]
  if (!sectionScore) {
    return null
  }

  const { score, percentageAnswered, medal } = sectionScore

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <div className="bg-primary text-primary-foreground rounded-full p-2">
                {medal.icon}
              </div>
              <span className="font-bold text-xl sm:text-2xl">{medal.type}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {`${percentageAnswered.toFixed(1)}% das questões respondidas`}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Progress value={score} className="flex-grow" />
            <div className="text-2xl sm:text-3xl font-semibold bg-primary text-primary-foreground px-3 py-1 rounded">
              {score}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const renderCategoryChart = (section: QuestionSection, category: QuestionCategory, formData: ProcessedFormData, categoryScores: Record<QuestionSection, Record<QuestionCategory, CategoryScore>>) => {
  const categoryData = categoryScores[section]?.[category]
  if (!categoryData) {
    return null
  }

  const { score } = categoryData

  const answerCounts = countAnswers(formData[section]?.[category] || {})
  const totalAnswers = answerCounts.reduce((acc, curr) => acc + curr.value, 0)

  const chartConfig = Object.fromEntries(
    answerCounts.map(({ name, fill }) => [name, { label: name, color: fill }])
  )

  if (totalAnswers === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-6">
        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
        <CardTitle className="text-center mb-2">{category}</CardTitle>
        <p className="text-muted-foreground text-center">Nenhuma questão respondida nesta categoria</p>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={answerCounts}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              strokeWidth={5}
            >
              {answerCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAnswers}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Respondidas
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="flex flex-wrap justify-center gap-2 mt-4"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const renderQuestionResponses = (section: QuestionSection, formData: ProcessedFormData) => {
  const sectionData = formData[section]
  if (!sectionData) return null

  const hasAnswers = Object.values(sectionData).some(categoryData =>
    Object.values(categoryData).some(answer => answer)
  )

  if (!hasAnswers) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Respostas Detalhadas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">Nenhuma questão respondida nesta seção</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Respostas Detalhadas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={Object.keys(sectionData)[0]}>
          <TabsList className="grid w-full grid-cols-2">
            {Object.keys(sectionData).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(sectionData).map(([category, categoryData]) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[400px] w-full">
                <div className="space-y-4 pr-4">
                  {Object.entries(categoryData).map(([questionKey, answer]) => {
                    const [_, index] = questionKey.split('-')
                    const question = questions[section][category as QuestionCategory][parseInt(index)]
                    return (
                      <motion.div
                        key={questionKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card>
                          <CardContent className="p-4">
                            <div className="flex flex-col space-y-2">
                              <p className="text-sm text-muted-foreground">{question}</p>
                              <div className="flex justify-center">
                                <Badge
                                  variant={answer ? "default" : "secondary"}
                                  className="text-xs py-0.5 px-2"
                                >
                                  {answer || 'Não respondida'}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<ProcessedFormData>({} as ProcessedFormData)
  const [categoryScores, setCategoryScores] = useState<Record<QuestionSection, Record<QuestionCategory, CategoryScore>>>({} as Record<QuestionSection, Record<QuestionCategory, CategoryScore>>)
  const [sectionScores, setSectionScores] = useState<Record<QuestionSection, SectionScore>>({} as Record<QuestionSection, SectionScore>)
  const [activeSection, setActiveSection] = useState<QuestionSection>('Pessoas/Atores')

  useEffect(() => {
    const timer = setTimeout(() => {
      const { formData: rawFormData } = getFormData()
      const processedData = processFormData(rawFormData)

      setFormData(processedData)

      const scores: Record<QuestionSection, Record<QuestionCategory, CategoryScore>> = {} as Record<QuestionSection, Record<QuestionCategory, CategoryScore>>
      const sectionScores: Record<QuestionSection, SectionScore> = {} as Record<QuestionSection, SectionScore>

      Object.entries(questions).forEach(([section, sectionQuestions]) => {
        scores[section as QuestionSection] = {} as Record<QuestionCategory, CategoryScore>
        Object.entries(sectionQuestions).forEach(([category, categoryQuestions]) => {
          const totalQuestions = categoryQuestions.length
          const categoryData = processedData[section as QuestionSection]?.[category as QuestionCategory] || {}
          scores[section as QuestionSection][category as QuestionCategory] = calculateCategoryScore(categoryData, totalQuestions)
        })
        sectionScores[section as QuestionSection] = calculateSectionScore(scores[section as QuestionSection])
      })

      setCategoryScores(scores)
      setSectionScores(sectionScores)
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    downloadFormData(questions)
    clearFormData()
  }

  return (
    <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <HomeButton />
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Resultados da Inspeção</h1>
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:space-x-6 xl:space-x-12">
                <aside className="w-full lg:w-1/4 mb-6 lg:mb-0">
                  <h2 className="text-lg font-semibold mb-4">Seções</h2>
                  <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-24rem)]">
                    <nav className="flex flex-col space-y-1">
                      {(Object.keys(questions) as QuestionSection[]).map((section) => {
                        const Icon = sectionIcons[section]
                        const sectionScore = sectionScores[section]
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
                            {sectionScore && (
                              <div className="flex items-center ml-2">
                                <Trophy className="h-3 w-3 mr-1" style={{ color: sectionScore.medal.color }} />
                                <span className="text-xs font-semibold">{sectionScore.score}</span>
                              </div>
                            )}
                          </Button>
                        )
                      })}
                    </nav>
                  </ScrollArea>
                  <div className="mt-4">
                    <Button
                      onClick={handleDownload}
                      className="w-full py-2 text-sm"
                    >
                      Download (JSON)
                    </Button>
                  </div>
                </aside>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-[calc(100vh-16rem)] pr-4 sm:pr-6">
                    <div className="space-y-6">
                      <div className="sticky top-0 bg-background z-10 py-4">
                        <h2 className="text-xl sm:text-2xl font-bold">{activeSection}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{sectionDescriptions[activeSection]}</p>
                        <Separator className="mt-4" />
                      </div>
                      {renderSectionSummary(activeSection, sectionScores)}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {renderCategoryChart(activeSection, 'Existência e Qualidade da Informação', formData, categoryScores)}
                        {renderCategoryChart(activeSection, 'Formato de Apresentação', formData, categoryScores)}
                      </div>
                      {renderQuestionResponses(activeSection, formData)}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
