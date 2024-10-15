'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { downloadFormData, clearFormData, getFormData } from '@/components/util/formStorage'
import { questions, QuestionSection, QuestionCategory } from '@/components/util/questions'
import HomeButton from '@/components/home-button'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Trophy } from 'lucide-react'

interface Medal {
  type: string;
  color: string;
  icon: JSX.Element;
}

interface CategoryScore {
  score: number;
  percentageAnswered: number;
}

type FormData = Record<QuestionSection, Record<string, string>>
type OtherText = Record<QuestionSection, Record<string, string>>

interface ChartData {
  name: string;
  value: number;
}

const getMedalType = (score: number): Medal => {
  if (score >= 91) return { type: 'Ouro', color: '#FFD700', icon: <Trophy className="h-6 w-6 text-yellow-500" /> }
  if (score >= 61) return { type: 'Prata', color: '#C0C0C0', icon: <Trophy className="h-6 w-6 text-gray-400" /> }
  if (score >= 41) return { type: 'Bronze', color: '#CD7F32', icon: <Trophy className="h-6 w-6 text-orange-700" /> }
  return { type: 'Lata', color: '#808080', icon: <Trophy className="h-6 w-6 text-gray-600" /> }
}

const calculateCategoryScore = (categoryData: Record<string, string>, totalQuestions: number): CategoryScore => {
  let answeredQuestions = 0
  let score = 0

  Object.entries(categoryData).forEach(([_, answer]) => {
    if (answer) {
      answeredQuestions++
      if (answer === 'Apropriado' || answer === 'Suficiente') {
        score += 100
      } else if (answer === 'Inapropriado' || answer === 'Insuficiente') {
        score += 50
      }
    }
  })

  const percentageAnswered = (answeredQuestions / totalQuestions) * 100
  const categoryScore = answeredQuestions > 0 ? Math.round(score / answeredQuestions) : 0

  return { score: categoryScore, percentageAnswered }
}

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({} as FormData)
  const [categoryScores, setCategoryScores] = useState<Record<QuestionSection, CategoryScore>>({} as Record<QuestionSection, CategoryScore>)

  useEffect(() => {
    const timer = setTimeout(() => {
      const { formData, otherText } = getFormData()
      setFormData(formData)

      const scores: Record<QuestionSection, CategoryScore> = {} as Record<QuestionSection, CategoryScore>
      Object.entries(questions).forEach(([section, sectionQuestions]) => {
        const totalQuestions = Object.values(sectionQuestions).flat().length
        scores[section as QuestionSection] = calculateCategoryScore(formData[section as QuestionSection] || {}, totalQuestions)
      })
      setCategoryScores(scores)

      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleDownload = () => {
    downloadFormData(questions)
    clearFormData()
  }

  const renderCategoryCard = (section: QuestionSection) => {
    const { score, percentageAnswered } = categoryScores[section]
    const { type: medalType, color: medalColor, icon: medalIcon } = getMedalType(score)

    const chartData: ChartData[] = [
      { name: 'Pontuação', value: score },
      { name: 'Restante', value: 100 - score }
    ]

    const chartConfig = {
      score: {
        label: "Pontuação",
        color: "hsl(var(--chart-1))",
      },
      remaining: {
        label: "Restante",
        color: "hsl(var(--chart-2))",
      },
    }

    return (
      <Card key={section} className="mb-6">
        <CardHeader>
          <CardTitle>{section}</CardTitle>
          <CardDescription>{`${percentageAnswered.toFixed(1)}% das questões respondidas`}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ChartContainer config={chartConfig} className="w-48 h-48">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? chartConfig.score.color : chartConfig.remaining.color} />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox) return null;

                    const { cx, cy } = viewBox as { cx: number; cy: number };

                    return (
                      <text x={cx} y={cy} fill="currentColor" textAnchor="middle" dominantBaseline="central">
                        <tspan x={cx} y={cy - 10} className="text-2xl font-bold">{score}</tspan>
                        <tspan x={cx} y={cy + 10} className="text-xs">Pontuação</tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-4 flex items-center">
            {medalIcon}
            <span className="ml-2 font-bold">{medalType}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={percentageAnswered} className="w-full" />
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
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
          <h1 className="text-3xl font-bold mb-6">Resultados da Inspeção</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.keys(questions).map((section) => renderCategoryCard(section as QuestionSection))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleDownload}>
              Download Resultados (JSON)
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
