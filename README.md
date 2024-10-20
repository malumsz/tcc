
<a id="readme-top"></a>


<!-- PROJECT LOGO -->

<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://i.imgur.com/kxMxQ7D.png" alt="Logo" width="200" height="auto">
  </a>

[![/](https://img.shields.io/badge/PRIVACY-TOOL-black.svg?logo=&logoColor=f5f5f5&style=for-the-badge)]()
#

  <p align="center">
    Uma ferramenta para <b>Inspeção de Transparência de Dados Pessoais</b> em aplicações de <i>software</i>.
    <br/>
    
  
  
  <h4>
      <a href="https://privacy-tool.vercel.app" target="_blank">Demo</a>
      <span> · </span>
      <a href="Documentation.pdf">Documentação</a>
      <span> · </span>
      <a href="https://forms.gle/D49q345ssS2qginA8">Feedback</a>
    </h4>
    
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Conteúdo</summary>
  <ol>
    <li>
      <a href="#ⓘ-sobre-o-projeto">Sobre o projeto</a>
      <ul>
        <li><a href="#-funcionalidades">Funcionalidades</a></li>
        <li><a href="#-construção">Construção</a></li>
      </ul>
    </li>
    <li><a href="#%EF%B8%8F-uso">Uso</a></li>
    <li><a href="#-feedback">Feedback</a></li>
    <li><a href="#%EF%B8%8F-licen%C3%A7a">Licença</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## ⓘ Sobre o projeto

<img src="https://i.imgur.com/FbiVhpC.png" alt="Screenshot">

<img src="https://i.imgur.com/fJGl2xF.png" alt="Screenshot">

<img src="https://i.imgur.com/WI1gVmo.png" alt="Screenshot">

#

Este projeto aborda a carência de ferramentas práticas e acessíveis para avaliar a transparência das práticas de manipulação de dados pessoais. O objetivo é propor uma ferramenta para inspeção de Transparência de Dados Pessoais em aplicações de software construída com base na [Lei Geral de Proteção de Dados (LGPD)](https://www.gov.br/esporte/pt-br/acesso-a-informacao/lgpd) e no [TR-Model](https://each.usp.br/cond_met_pand/trmodel/).

#### ✅ Funcionalidades:
* Preenchimento do formulário de inspeção dividido em seções com escalas de `Suficiente`, `Insuficiente`, `Inexistente`, etc.
* Cálculo de um ***score*** final de cada seção com base nas respostas, acompanhado de gráficos visuais.
* Exportação das respostas em formato `JSON` ao final da inspeção.
* Modo claro/escuro para melhor adaptação visual com base na preferência do usuário.
  
Esta ferramenta visa capacitar os usuários a tomar decisões mais informadas sobre sua privacidade e auxiliar desenvolvedores na criação de software em conformidade com legislações como **GDPR** e **LGPD**.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



### 🛠 Construção
#
Para a construção da ferramenta de Inspeção de Transparência de Dados, foram utilizados, além de `HTML` e `CSS` para a criação da interface web, `TypeScript`, `React` e a biblioteca [`shadcn/ui`](https://ui.shadcn.com) como as tecnologias principais de ***front-end***, visto sua ampla compatibilidade. Já no ***back-end***, juntamente com os ambientes anteriores, foram utilizados `Node.js` e `Next.js` para gerência de operações de manipulação de dados.

[![My Skills](https://skillicons.dev/icons?i=nextjs,react,ts,html,css,tailwind,vercel,nodejs)](https://skillicons.dev)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>




<!-- USAGE EXAMPLES -->
## ▶️ Uso

A ferramenta consiste no preenchimento de um formulário dividido em seções baseadas no modelo **TR-Model**: `Pessoas/Atores`, `Propósito de uso`, `Dados pessoais`, `Compartilhamento` e `Agenciamento`. Cada uma delas com subseções `Existência e Qualidade da Informação` e `Formato de Apresentação`.

As opções de resposta variam de acordo com a subseção. O usuário terá liberdade para preencher todas as respostas possíveis para garantir um resultado mais preciso, porém caso algum campo seja deixado vazio, o cálculo pode não refletir a análise completa.

Ao final da inspeção será mostrado ao usuário uma página que apresenta um resumo detalhado dos resultados acompanhado de gráficos visuais, juntamente com o cálculo de um *score* baseado em suas respostas, com a atribuição de um troféu para cada intervalo de pontuação. Diferentes seções podem ser exploradas para obter *insights* sobre cada aspecto avaliado.

> [!NOTE]
> Você pode utilizar a ferramenta acessando o *link* abaixo:

<a href="https://privacy-tool.vercel.app"><img src="https://i.imgur.com/BCr3Bs5.png" alt="link" width="150" height="auto"></a>

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>




<!-- CONTRIBUTING -->
## 📋 Feedback

> [!IMPORTANT]
> Acesse o *link* abaixo para avaliar a ferramenta e sugerir implementações ou sugestões de melhorias.

[![feedback](https://img.shields.io/badge/Google%20Forms-7248B9.svg?style=for-the-badge&logo=Google-Forms&logoColor=white)](https://forms.gle/G6J2K2rPjbayvTjt8)


<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>




<!-- LICENSE -->
## ⚖️ Licença

> [!WARNING]
> Distribuído sob a licença **MIT**. Consulte `LICENSE.md` para obter mais informações.



<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

