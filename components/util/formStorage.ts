'use client'

import { QuestionSection, QuestionCategory } from '@/components/util/questions'

type FormData = Record<QuestionSection, Record<string, string>>
type OtherText = Record<QuestionSection, Record<string, string>>

export const saveFormData = (formData: FormData, otherText: OtherText) => {
  localStorage.setItem('formData', JSON.stringify(formData))
  localStorage.setItem('otherText', JSON.stringify(otherText))
}

export const getFormData = (): { formData: FormData, otherText: OtherText } => {
  const formData = JSON.parse(localStorage.getItem('formData') || '{}')
  const otherText = JSON.parse(localStorage.getItem('otherText') || '{}')
  return { formData, otherText }
}

export const clearFormData = () => {
  localStorage.removeItem('formData')
  localStorage.removeItem('otherText')
}

export const downloadFormData = (questions: Record<QuestionSection, Record<QuestionCategory, string[]>>) => {
  const { formData, otherText } = getFormData()

  const exportData: Record<QuestionSection, Record<QuestionCategory, Record<string, string>>> = {} as Record<QuestionSection, Record<QuestionCategory, Record<string, string>>>

  (Object.keys(questions) as QuestionSection[]).forEach((section: QuestionSection) => {
    exportData[section] = {} as Record<QuestionCategory, Record<string, string>>

    (Object.keys(questions[section]) as QuestionCategory[]).forEach((category: QuestionCategory) => {
      exportData[section][category] = {}

      questions[section][category].forEach((question: string, index: number) => {
        const key = `${category}-${index}`
        const answer = formData[section]?.[key] || ''
        const otherAnswer = formData[section]?.[key] === 'Outro' ? otherText[section]?.[key] || '' : ''
        exportData[section][category][question] = answer + (otherAnswer ? ` - ${otherAnswer}` : '')
      })
    })
  })

  const jsonString = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'privacy_tool_respostas.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
