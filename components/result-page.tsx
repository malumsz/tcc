'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { downloadFormData, clearFormData } from '@/components/util/formStorage'
import { questions } from '@/components/util/questions'

export default function ResultsPage() {
  const handleDownload = () => {
    downloadFormData(questions)
    clearFormData()
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Seu conteúdo existente aqui */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleDownload}>
          Download Results (JSON)
        </Button>
      </div>
    </div>
  )
}
