'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import HomeButton from '@/components/home-button'
import { InfoIcon, MousePointerSquare, Users, Database, Share2, ShieldCheck, LucideIcon, CheckCircle2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

type QuestionSection = 'Pessoas/Atores' | 'Propósito de uso' | 'Dados pessoais' | 'Compartilhamento' | 'Agenciamento';
type QuestionCategory = 'Existência e Qualidade da Informação' | 'Formato de Apresentação';

const questions: Record<QuestionSection, Record<QuestionCategory, string[]>> = {
  'Pessoas/Atores': {
    'Existência e Qualidade da Informação': [
      'Informações sobre os atores tais como: Nome, endereço, telefone, e-mail e responsável pela empresa?',
      'Informações que indicam quais são as agências de proteção de dados que regulamentam o uso dos dados pessoais pelos atores?',
      'Informações sobre o papel (função) de cada ator no uso dos dados pessoais?',
    ],
    'Formato de Apresentação': [
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações dos atores.',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise dos atores envolvidos no uso dos dados pessoais.',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia de grandes volumes de textos.',
      'As informações existentes descartam a necessidade do indivíduo buscar informações em outras fontes.',
    ],
  },
  'Propósito de uso': {
    'Existência e Qualidade da Informação': [
      'Descrição do objetivo de uso dos dados pessoais.',
      'Informação sobre a lei/regulamentação que torna o uso dos dados pessoais legal.',
      'Informações sobre quais dados pessoais serão utilizados para atingir os objetivos apontados.',
      'Informação do ator responsável legal pelo uso dos dados pessoais.',
      'Informações sobre a existência, ou não, da utilização ou processamento de dados pessoais feitas exclusivamente por computador, sem a supervisão humana.',
      'Informações sobre o período de manipulação dos dados pessoais para o propósito indicado.',
    ],
    'Formato de Apresentação': [
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre o(s) propósito(s) de uso dos dados.',
      'Simplicidade, objetividade e relevância das informações, de forma a auxiliar efetivamente na análise do(s) propósito(s) de uso dos dados pessoais.',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.',
    ],
  },
  'Dados pessoais': {
    'Existência e Qualidade da Informação': [
      'Informações de quais dados pessoais são utilizados.',
      'Descrição de como os dados pessoais são compostos (detalhes que possam explicar melhor os dados pessoais).',
      'Informações sobre a origem dos dados (dispositivos, compra de terceiros, compartilhamento etc).',
      'Em caso de obrigatoriedade da disponibilização dos dados pelos indivíduos, informações sobre o que pode ocorrer no caso da não coleta dos dados.',
      'Informações sobre o objetivo do uso do dado pessoal e como (qual processo) é feito com o dado pessoal.',
      'Informações sobre a permissão concedida pelo indivíduo para o uso dos dados pessoais.',
    ],
    'Formato de Apresentação': [
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre os dados pessoais manipulados',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise do propósito de uso os dados pessoais',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.',
    ],
  },
  'Compartilhamento': {
    'Existência e Qualidade da Informação': [
      'Informações de quais dados pessoais são transferidos ou compartilhados com terceiros.',
      'Informações sobre o motivo da transferência e/ou compartilhamento dos dados pessoais.',
      'Informações sobre a base legal (lei/regulamentação) que garante a legalidade do compartilhamento dos dados.',
      'Dados completos do destinatário dos dados pessoais, de forma que permita a identificação e o contato com o destinatário.',
      'Dados da organização que monitora o uso dos dados pessoais no país ou região do destinatário, de forma que permita a identificação e o contato com o órgão.',
      'Relação de quais dados foram transferidos ou compartilhados e como foram obtidos.',
      'Informações para relembrar como você permitiu e/ou autorizou o compartilhamento dos dados pessoais.',
      'Informações sobre os eventos que causam a transferência/compartilhamento dos dados pessoais.',
    ],
    'Formato de Apresentação': [
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre a transferência/compartilhamento dos dados.',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise da transferência/compartilhamento dos dados.',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.',
    ],
  },
  'Agenciamento': {
    'Existência e Qualidade da Informação': [
      'Informações de como o indivíduo pode solicitar cópia de seus dados, alteração de permissão de uso dos dados, realizar uma reclamação ou exercer qualquer direito sobre os seus dados.',
      'Informações sobre meios de contato, telefones, e-mails sobre os atores envolvidos no uso dos dados pessoais.',
      'Informações e/ou recursos para o indivíduo solicitar cópia de seus dados, alteração de permissão de uso dos dados, realizar uma reclamação ou exercer qualquer direito sobre os seus dados diretamente no software, sem a necessidade de entrar em contato.',
    ],
    'Formato de Apresentação': [
      'Elementos de design (textos, figuras, fotos etc) utilizados para apresentar as informações sobre agências de controle e ações para questionar ou verificar o uso dos dados.',
      'Simplicidade, objetividade e relevância das informações de forma a auxiliar efetivamente na análise das agências de controle e ações para questionar ou verificar o uso dos dados.',
      'Facilidade de acesso das informações de forma a não exigir que o indivíduo realize buscas complexas ou análise/leia grandes volumes de textos.',
      'As informações existentes descartam a necessidade do usuário buscar informações em outras fontes.',
    ],
  },
}

const sectionDescriptions: Record<QuestionSection, string> = {
  'Pessoas/Atores': 'Pessoas (atores) envolvidas no uso dos dados pessoais. Verifique se as informações sobre quem realiza as tarefas são apresentadas assim como informações sobre como entrar em contato com o ator.',
  'Propósito de uso': 'Verifique informações sobre como os dados pessoais são utilizados, ou seja, os objetivos de uso dos dados pessoais.',
  'Dados pessoais': 'Verifique informações sobre quais dados são utilizados e como eles são adquiridos.',
  'Compartilhamento': 'Verifique as informações sobre o compartilhamento de dados pessoais com outros controladores.',
  'Agenciamento': 'Verifique as informações sobre como o indivíduo pode/deve agir quando se sentir enganado ou lesado.',
}

const sectionIcons: Record<QuestionSection, LucideIcon> = {
  'Pessoas/Atores': Users,
  'Propósito de uso': MousePointerSquare,
  'Dados pessoais': Database,
  'Compartilhamento': Share2,
  'Agenciamento': ShieldCheck,
}

type HoverCardInfo = {
  trigger: string;
  content: string;
}

const hoverCardInfo: Record<QuestionSection, Record<string, HoverCardInfo[]>> = {
  'Pessoas/Atores': {
    'Existência e Qualidade da Informação': [
      {
        trigger: 'agências de proteção de dados',
        content: 'Órgãos que garantem o cumprimento das leis de privacidade e proteção de dados pessoais, como a ANPD no Brasil e o EDPB na Europa.'
      }
    ],
    'Formato de Apresentação': []
  },
  'Propósito de uso': {
    'Existência e Qualidade da Informação': [
      {
        trigger: 'lei/regulamentação',
        content: 'Leis que autorizam o tratamento de dados pessoais, como a LGPD no Brasil ou o GDPR na Europa.'
      }
    ],
    'Formato de Apresentação': []
  },
  'Dados pessoais': {
    'Existência e Qualidade da Informação': [],
    'Formato de Apresentação': []
  },
  'Compartilhamento': {
    'Existência e Qualidade da Informação': [
      {
        trigger: 'base legal',
        content: 'Justificativa legal que permite o compartilhamento de dados, como consentimento ou obrigações legais, conforme a LGPD ou GDPR.'
      }
    ],
    'Formato de Apresentação': []
  },
  'Agenciamento': {
    'Existência e Qualidade da Informação': [],
    'Formato de Apresentação': []
  }
}

const TextWithHoverCard: React.FC<{ text: string; hoverCards: HoverCardInfo[] }> = ({ text, hoverCards }) => {
  const parts = text.split(new RegExp(`(${hoverCards.map(hc => hc.trigger).join('|')})`, 'gi'));

  return (
    <>
      {parts.map((part, index) => {
        const hoverCard = hoverCards.find(hc => hc.trigger.toLowerCase() === part.toLowerCase());
        if (hoverCard) {
          return (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <span className="cursor-pointer font-bold hover:underline transition-all duration-200">
                  {part}
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                <InfoIcon className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  <div className="space-y-1 flex-grow">
                    <h4 className="text-sm font-semibold">{hoverCard.trigger}</h4>
                    <p className="text-sm text-muted-foreground">{hoverCard.content}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default function FormularioInspecao() {
  const router = useRouter()

  const initialFormData: Record<QuestionSection, Record<string, string>> = Object.keys(questions).reduce((acc, section) => {
    acc[section as QuestionSection] = {};
    return acc;
  }, {} as Record<QuestionSection, Record<string, string>>);

  const [formData, setFormData] = useState<Record<QuestionSection, Record<string, string>>>(initialFormData);
  const [otherText, setOtherText] = useState<Record<QuestionSection, Record<string, string>>>(initialFormData);
  const [activeSection, setActiveSection] = useState<QuestionSection>('Pessoas/Atores');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    console.log('Other Text:', otherText)
    // Here you would typically send the data to a server
  }

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
                  <Button
                    onClick={handleSubmit}
                    className="w-full py-2 text-sm"
                    disabled={totalProgress < 100}
                  >
                    Calcular
                  </Button>
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
                    {Object.entries(questions[activeSection]).map(([category, categoryQuestions]) => (
                      <div key={category}>
                        <h3 className="text-xl font-semibold mb-4">{category}</h3>
                        {categoryQuestions.map((question, qIndex) => {
                          const questionNumber = Object.values(questions[activeSection])
                            .flat()
                            .findIndex((q) => q === question) + 1;
                          const options = category === 'Formato de Apresentação'
                            ? ['Apropriado', 'Inapropriado', 'Necessita melhorias', 'Outro']
                            : ['Suficiente', 'Insuficiente', 'Inexistente', 'Outro'];
                          return (
                            <Card key={`${category}-${qIndex}`} className="relative mb-4">
                              <CardContent className="pt-6 pb-4 px-6">
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: questionNumber * 0.1 }}
                                >
                                  <Label className="text-base font-medium mb-2 block">
                                    <span className="font-bold mr-2">{questionNumber}.</span>
                                    <TextWithHoverCard
                                      text={question}
                                      hoverCards={hoverCardInfo[activeSection]?.[category] || []}
                                    />
                                  </Label>
                                  <Separator className="my-4" />
                                  <RadioGroup
                                    value={formData[activeSection]?.[`${category}-${qIndex}`] || ""}
                                    onValueChange={(value) => handleRadioChange(activeSection, `${category}-${qIndex}`, value)}
                                    className="flex flex-col space-y-2 mt-2"
                                  >
                                    {options.map((option) => (
                                      <div key={option} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`${activeSection}-${category}-${qIndex}-${option}`} />
                                        <Label htmlFor={`${activeSection}-${category}-${qIndex}-${option}`}>{option}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                  {formData[activeSection]?.[`${category}-${qIndex}`] === 'Outro' && (
                                    <Input
                                      type="text"
                                      placeholder="Descreva"
                                      className="mt-2"
                                      value={otherText[activeSection]?.[`${category}-${qIndex}`] || ''}
                                      onChange={(e) => handleOtherTextChange(activeSection, `${category}-${qIndex}`, e.target.value)}
                                    />
                                  )}
                                </motion.div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    ))}
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
