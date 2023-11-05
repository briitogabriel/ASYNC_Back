## Async Medical - Backend

> Projeto desenvolvido usando NodeJS.

O Async é um software de gestão médica desenvolvida para auxiliar na administração e organização de hospitais.

##### Objetivo principal

O objetivo principal é oferecer uma plataforma que simplifique processos de atendimento, gerenciamento de consultas, exames e prontuários de paciente.

#####Funcionalidades Principais

- Cadastro e gerenciamento de pacientes
- Cadastro e gerenciamento de exames
- Cadastro e gerenciamento de consultas
- Cadastro e gerenciamento de dietas
- Cadastro e gerenciamento de exercicios
- Cadastro e gerenciamento de medicamentos
- Dashboard com estatísticas da quantidade de pacientes cadastrados, consultas e exames realizados
- Página e listagem de prontuários

## Pré Requisitos

- Banco de dados Postgres 16+
- NodeJS 18
- Configurar adequadamente as variáveis de ambiente constantes no arquivo .env na raiz do projeto

## Instalação
1. Clone o repositório: `git@github.com:FullStack-Trindade/M3P-BackEnd-Squad4.git`
2. Acesse o diretório do projeto: `cd M3P-BackEnd-Squad4`
3. Instale as dependências: `npm install`
4. Crie o banco de dados com o comando: `db:migrate`
4. Insira os dados padrões no banco de dados com o comando: `db:seed`
5. Inicie o projeto com o comando: `npm run dev`

## Uso

Após a instalação e configuração, a api estará disponível na URL: http://localhost:3333