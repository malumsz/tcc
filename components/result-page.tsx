'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, MousePointerSquare, Database, Share2, ShieldCheck, PieChart as PieChartIcon } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

type QuestionSection = 'Pessoas/Atores' | 'Propósito de uso' | 'Dados pessoais' | 'Compartilhamento' | 'Agenciamento'
type QuestionCategory = 'Existência e Qualidade da Informação' | 'Formato de Apresentação'

const sectionIcons = {
  'Pessoas/Atores': Users,
  'Propósito de uso': MousePointerSquare,
  'Dados pessoais': Database,
  'Compartilhamento': Share2,
  'Agenciamento': ShieldCheck,
}

const mockResults = {
  'Pessoas/Atores': {
    'Existência e Qualidade da Informação': {
      'Informações sobre os atores tais como: Nome, endereço, telefone, e-mail e responsável pela empresa?': 'Suficiente',
      'Informações que indicam quais são as agências de proteção de dados que regulamentam o uso dos dados pessoais pelos atores?': 'Insuficiente',
      'Informações sobre o papel (função) de cada ator no uso dos dados pessoais?': 'Suficiente',
    },
    'Formato de Apresentação': {
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações dos atores.': 'Apropriado',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise dos atores envolvidos no uso dos dados pessoais.': 'Necessita melhorias',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia de grandes volumes de textos.': 'Apropriado',
      'As informações existentes descartam a necessidade do indivíduo buscar informações em outras fontes.': 'Inapropriado',
    },
  },
  'Propósito de uso': {
    'Existência e Qualidade da Informação': {
      'Descrição do objetivo de uso dos dados pessoais.': 'Suficiente',
      'Informação sobre a lei/regulamentação que torna o uso dos dados pessoais legal.': 'Insuficiente',
      'Informações sobre quais dados pessoais serão utilizados para atingir os objetivos apontados.': 'Suficiente',
      'Informação do ator responsável legal pelo uso dos dados pessoais.': 'Suficiente',
      'Informações sobre a existência, ou não, da utilização ou processamento de dados pessoais feitas exclusivamente por computador, sem a supervisão humana.': 'Inexistente',
      'Informações sobre o período de manipulação dos dados pessoais para o propósito indicado.': 'Insuficiente',
    },
    'Formato de Apresentação': {
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre o(s) propósito(s) de uso dos dados.': 'Apropriado',
      'Simplicidade, objetividade e relevância das informações, de forma a auxiliar efetivamente na análise do(s) propósito(s) de uso dos dados pessoais.': 'Necessita melhorias',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.': 'Apropriado',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.': 'Inapropriado',
    },
  },
  'Dados pessoais': {
    'Existência e Qualidade da Informação': {
      'Informações de quais dados pessoais são utilizados.': 'Suficiente',
      'Descrição de como os dados pessoais são compostos (detalhes que possam explicar melhor os dados pessoais).': 'Insuficiente',
      'Informações sobre a origem dos dados (dispositivos, compra de terceiros, compartilhamento etc).': 'Suficiente',
      'Em caso de obrigatoriedade da disponibilização dos dados pelos indivíduos, informações sobre o que pode ocorrer no caso da não coleta dos dados.': 'Inexistente',
      'Informações sobre o objetivo do uso do dado pessoal e como (qual processo) é feito com o dado pessoal.': 'Suficiente',
      'Informações sobre a permissão concedida pelo indivíduo para o uso dos dados pessoais.': 'Insuficiente',
    },
    'Formato de Apresentação': {
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre os dados pessoais manipulados': 'Apropriado',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise do propósito de uso os dados pessoais': 'Necessita melhorias',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.': 'Apropriado',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.': 'Inapropriado',
    },
  },
  'Compartilhamento': {
    'Existência e Qualidade da Informação': {
      'Informações de quais dados pessoais são transferidos ou compartilhados com terceiros.': 'Suficiente',
      'Informações sobre o motivo da transferência e/ou compartilhamento dos dados pessoais.': 'Insuficiente',
      'Informações sobre a base legal (lei/regulamentação) que garante a legalidade do compartilhamento dos dados.': 'Inexistente',
      'Dados completos do destinatário dos dados pessoais, de forma que permita a identificação e o contato com o destinatário.': 'Insuficiente',
      'Dados da organização que monitora o uso dos dados pessoais no país ou região do destinatário, de forma que permita a identificação e o contato com o órgão.': 'Inexistente',
      'Relação de quais dados foram transferidos ou compartilhados e como foram obtidos.': 'Suficiente',
      'Informações para relembrar como você permitiu e/ou autorizou o compartilhamento dos dados pessoais.': 'Insuficiente',
      'Informações sobre os eventos que causam a transferência/compartilhamento dos dados pessoais.': 'Suficiente',
    },
    'Formato de Apresentação': {
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre a transferência/compartilhamento dos dados.': 'Apropriado',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise da transferência/compartilhamento dos dados.': 'Necessita melhorias',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.': 'Apropriado',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.': 'Inapropriado',
    },
  },
  'Agenciamento': {
    'Existência e Qualidade da Informação': {
      'Informações de como o indivíduo pode solicitar cópia de seus dados, alteração de permissão de uso dos dados, realizar uma reclamação ou exercer qualquer direito sobre os seus dados.': 'Suficiente',
      'Informações sobre meios de contato, telefones, e-mails sobre os atores envolvidos no uso dos dados pessoais.': 'Insuficiente',
      'Informações e/ou recursos para o indivíduo solicitar cópia de seus dados, alteração de permissão de uso dos dados, realizar uma reclamação ou exercer qualquer direito sobre os seus dados diretamente no software, sem a necessidade de entrar em contato.': 'Inexistente',
    },
    'Formato de Apresentação': {
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre agências de controle e ações para questionar ou verificar o uso dos dados.': 'Apropriado',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise das agências de controle e ações para questionar ou verificar o uso dos dados.': 'Necessita melhorias',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.': 'Apropriado',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.': 'Inapropriado',
    },
  },
}

const calculateScore = (responses: Record<string, string>) => {
  const scoreMap = {
    'Suficiente': 1,
    'Apropriado': 1,
    'Insuficiente': 0.5,
    'Necessita melhorias': 0.5,
    'Inexistente': 0,
    'Inapropriado': 0,
  }
  const totalQuestions = Object.keys(responses).length
  const score = Object.values(responses).reduce((acc, response) => acc + (scoreMap[response as keyof typeof scoreMap] || 0), 0)
  return (score / totalQuestions) * 100
}

const getMedalColor = (score: number) => {
  if (score >= 80) return 'gold'
  if (score >= 60) return 'silver'
  if (score >= 40) return '#cd7f32' // bronze
  return 'gray'
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B']

export default function ResultsPage() {
  const [activeSection, setActiveSection] = useState<QuestionSection>('Pessoas/Atores')

  const calculateSectionScore = (section: QuestionSection) => {
    const sectionData = mockResults[section]
    const allResponses = { ...sectionData['Existência e Qualidade da Informação'], ...sectionData['Formato de Apresentação'] }
    return calculateScore(allResponses)
  }

  const generateChartData = (section: QuestionSection) => {
    const sectionData = mockResults[section]
    const allResponses = { ...sectionData['Existência e Qualidade da Informação'], ...sectionData['Formato de Apresentação'] }
    const responseCounts = Object.values(allResponses).reduce((acc, response) => {
      acc[response] = (acc[response] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return Object.entries(responseCounts).map(([name, value]) => ({ name, value }))
  }

  const handleDownload = () => {
    const jsonString = JSON.stringify(mockResults, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'inspection_results.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Resultados da Inspeção</CardTitle>
          <Separator className="my-4" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/4">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <nav className="flex flex-col space-y-1">
                  {(Object.keys(mockResults) as QuestionSection[]).map((section) => {
                    const Icon = sectionIcons[section]
                    const sectionScore = calculateSectionScore(section)
                    return (
                      <Button
                        key={section}
                        variant={activeSection === section ? "secondary" : "ghost"}
                        className="justify-start"
                        onClick={() => setActiveSection(section)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        <span className="flex-grow text-left">{section}</span>
                        <Badge style={{ backgroundColor: getMedalColor(sectionScore) }} className="ml-2">
                          {sectionScore.toFixed(0)}%
                        </Badge>
                      </Button>
                    )
                  })}
                </nav>
              </ScrollArea>
            </aside>
            <div className="flex-1 lg:max-w-3xl">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">{activeSection}</h2>
                  <Card>
                    <CardHeader>
                      <CardTitle>Pontuação da Seção</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <Progress value={calculateSectionScore(activeSection)} className="flex-grow" />
                        <span className="text-2xl font-bold">{calculateSectionScore(activeSection).toFixed(0)}%</span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChartIcon className="mr-2 h-4 w-4" />
                        
                        Distribuição das Respostas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={generateChartData(activeSection)}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {generateChartData(activeSection).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  {(Object.keys(mockResults[activeSection]) as QuestionCategory[]).map((category) => (
                    <Card key={category}>
                      <CardHeader>
                        <CardTitle>{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {Object.entries(mockResults[activeSection][category]).map(([question, response]) => (
                            <li key={question} className="flex justify-between items-start">
                              <span className="text-sm flex-grow mr-4">{question}</span>
                              <Badge variant={response === 'Suficiente' || response === 'Apropriado' ? 'default' : 'destructive'}>
                                {response}
                              </Badge>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 flex justify-end">
        <Button onClick={handleDownload}>
          Download Results (JSON)
        </Button>
      </div>
    </div>
  )
}