
export type QuestionSection = 'Pessoas/Atores' | 'Propósito de uso' | 'Dados pessoais' | 'Compartilhamento' | 'Agenciamento';
export type QuestionCategory = 'Existência e Qualidade da Informação' | 'Formato de Apresentação';

export const questions: Record<QuestionSection, Record<QuestionCategory, string[]>> = {
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
};

export const sectionDescriptions: Record<QuestionSection, string> = {
  'Pessoas/Atores': 'Pessoas (atores) envolvidas no uso dos dados pessoais. Verifique se as informações sobre quem realiza as tarefas são apresentadas assim como informações sobre como entrar em contato com o ator.',
  'Propósito de uso': 'Verifique informações sobre como os dados pessoais são utilizados, ou seja, os objetivos de uso dos dados pessoais.',
  'Dados pessoais': 'Verifique informações sobre quais dados são utilizados e como eles são adquiridos.',
  'Compartilhamento': 'Verifique as informações sobre o compartilhamento de dados pessoais com outros controladores.',
  'Agenciamento': 'Verifique as informações sobre como o indivíduo pode/deve agir quando se sentir enganado ou lesado.',
};
