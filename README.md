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
4. Crie o banco de dados com o comando: `npx sequelize-cli db:migrate`
4. Insira os dados padrões no banco de dados com o comando: `npx sequelize-cli db:seed:all`
5. Caso seja trocada a porta padrão (3333), executar o comando para atualizar a documentação Swagger: `npm run swagger-autogen`
6. Renomeie o arquivo `.env.example` para `.env` e insira as credencias de acesso ao banco de dados e configurações de rota conforme preferência
7. Inicie o projeto com o comando: `npm run dev`
8. A documentação Swagger dos endpoints pode ser consultada em: http://localhost:3333/api/docs/

## Uso

Após a instalação e configuração, a api estará disponível na URL: http://localhost:3333/api

## Melhorias a serem aplicadas
- Deveríamos implementar a inclusão da Foto do paciente para agilizar atendimentos emergenciais em que o paciente não estivesse responsivo;
- Juntamente com a foto, implementar uma busca por reconhecimento facial onde pudesse ser usado um scanner pra buscar no sistema o paciente a ser atendido;
- Feedback de atendimento para médicos, onde os pacientes pudessem registrar elogios/reclamações de seus respectivos atendimentos e assim deixar o registro para futuros pacientes.
- Feedback de atendimento para pacientes, onde os médicos pudessem relatar uma breve descrição do atendimento, se o paciente foi receptivo ao tratamento, se foi dificil indicar tratamento pelo comportamento do paciente e assim ser possível que o próximo médico a atende-la esteja pronto e preparado para as dificuldades que possam vir a acontecer.