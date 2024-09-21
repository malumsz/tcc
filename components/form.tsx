"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const sections = [
  {
    id: "personalInfo",
    title: "Personal Info",
    question: "What's your preferred method of communication?",
    options: ["Email", "Phone", "Video Call"],
  },
  {
    id: "workExperience",
    title: "Work Experience",
    question: "How many years of work experience do you have?",
    options: ["0-2 years", "3-5 years", "5+ years"],
  },
  {
    id: "education",
    title: "Education",
    question: "What's your highest level of education?",
    options: ["High School", "Bachelor's", "Master's", "PhD"],
  },
  {
    id: "skills",
    title: "Skills",
    question: "Which programming language are you most proficient in?",
    options: ["JavaScript", "Python", "Java", "C++"],
  },
]

export function SimplifiedBadgedForm() {
  const [activeSection, setActiveSection] = useState(sections[0].id)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})

  const allSectionsCompleted = useMemo(() => {
    return sections.every(section => answers[section.id])
  }, [answers])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex flex-wrap justify-center gap-2" role="tablist">
        {sections.map((section) => (
          <Badge
            key={section.id}
            variant={activeSection === section.id ? "default" : "outline"}
            className="cursor-pointer px-3 py-1"
            onClick={() => setActiveSection(section.id)}
            role="tab"
            aria-selected={activeSection === section.id}
          >
            {section.title}
            {answers[section.id] && (
              <span className="ml-2" aria-label="Completed">✓</span>
            )}
          </Badge>
        ))}
      </div>
      {sections.map((section) => (
        section.id === activeSection && (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-2">{section.question}</h3>
              <RadioGroup
                onValueChange={(value) => setAnswers(prev => ({ ...prev, [section.id]: value }))}
                value={answers[section.id] || ""}
              >
                {section.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${section.id}-${index}`} />
                    <Label htmlFor={`${section.id}-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        )
      ))}
      <div className="flex justify-center">
        <Button

          className="px-6 py-2"
          disabled={!allSectionsCompleted}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}
