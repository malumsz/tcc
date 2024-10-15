import { FormEvent } from 'react'

export type QuestionSection = 'Pessoas/Atores' | 'Propósito de uso' | 'Dados pessoais' | 'Compartilhamento' | 'Agenciamento';
export type QuestionCategory = 'Existência e Qualidade da Informação' | 'Formato de Apresentação';

export const handleSubmit = (
  e: FormEvent,
  questions: Record<QuestionSection, Record<QuestionCategory, string[]>>,
  formData: Record<QuestionSection, Record<string, string>>,
  otherText: Record<QuestionSection, Record<string, string>>
) => {
  e.preventDefault()
  
  const exportData: Record<QuestionSection, Record<QuestionCategory, Record<string, string>>> = {} as Record<QuestionSection, Record<QuestionCategory, Record<string, string>>>;

  (Object.keys(questions) as QuestionSection[]).forEach(section => {
    exportData[section] = {} as Record<QuestionCategory, Record<string, string>>;
    
    (Object.keys(questions[section]) as QuestionCategory[]).forEach(category => {
      exportData[section][category] = {};
      questions[section][category].forEach((question, index) => {
        const key = `${category}-${index}`;
        const answer = formData[section][key] || '';
        const otherAnswer = formData[section][key] === 'Outro' ? otherText[section][key] || '' : '';
        exportData[section][category][question] = answer + (otherAnswer ? ` - ${otherAnswer}` : '');
      });
    });
  });

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'formulario_inspecao_respostas.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}