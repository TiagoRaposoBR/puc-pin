# API Multiverso DC
Servidores do Projeto Fazenda.

Projeto para matéria Projeto Integrado, do curso de pós-graduação em Arquitetura de Sistemas Distribuídos da PUC Minas.

## Estrutura dos projetos

O projeto usa o Node.js, com servidor de aplicação Express.js, e banco de dados PostgreSQL.

O arquivo index.js tem a inicialização e a definição das rotas do Express.js. Os middlewares de segurança e cache são colocados aqui.

A segurança está no módulo /security/auth.js, que é responsável pela geração de tokens de acesso e verificação dos mesmos. O método isAuthorized é o único que quebra a hierarquia de componentes, quando precisa buscar no banco de dados (através do serviço de usuários) os dados do token de acesso.

Se passarem pela segurança e cache, as requisições chamam os /routes específicos, que têm o tratamento de requisições e respostas.
Nesses módulos, os dados de entrada são lidos e transformados nos /model (no caso de POST), enviados para os /services, e as urls das respostas
são preenchidas.

Os /services fazem o tratamento dos dados, e contêm a lógica de negócios. Eles não tem controle sobre requisições, mas recebem os daddos destas, manipulam e buscam do /persistence, e retornam as respostas para os /routes.

O /persistence tem as querys de acesso ao banco de dados. Sua função é fazer a requisição ao banco e devolver os dados com um tratamento básico, para que os /services tratem. Os /persistence usam o módulo /database/database-driver.js para se comunicar com o banco, isolando a configuração de conexão dos métodos de query.

## Instalação em máquina virtual

### database

Copie os arquivos _base-table.sql_ e _install\_postgres.sh_ para a máquina virtual, e rode o arquivo de instalação.

### sensores-api e backend

Para instalar em uma máquina virtual (testada em um EC2 com Amazon Linux 2), copie as pastas _sensores-api_ e _backend_, uma para cada máquina. Alternativamente, clone o repositório git para a máquina virtual, e remova os projetos que não vai usar.

Dentro da pasta do projeto, rode o script _install\_node.sh_.

Edite o arquivo _sensores-api/database/database-driver.js_ (troque sensores-api por backend se apropriado), e coloque o ip da máquina PostgreSQL no campo 'host'. Depois, rode o comando _sudo systemctl restart pucpin-sensores.service_ (troque sensores por backend se apropriado).

Para rodar em um ambiente de desenvolvimento:

- instale o Node.js 14.x
- instale o PostgreSQL versão 13
- rode o script de banco em puc-api/database/base-table.sql para criar a base de dados
- execute ```# npm install``` na raiz do projeto
- inicie o serviço com ```# node index.js ```

## Usuário Administrador

Para cadastrar sensores, é preciso usar o token de administrador. Esse usuário não é acessível pela API.

Crie uma entrada na tabela sensores, com uma string no campo _access\_token_. Essa string é o token de administrador.

Para usar o endpoint POST /api/v1/sensors, coloque um cabeçalho de chave 'admin' e no valor o token.

## Fluxo de uso

### Sensores

Cadastre novos sensores no endpoint POST /api/v1/sensors, passando a latitude e longitude. Você vai receber um token de acesso.

Para enviar dados de telemetria, use o endpoint POST /api/v1/telemetry, passando o id do sensor, os dados de temperatura e humidade, e o token de acesso.

A cada chamada para telemetria, é retornado um novo token. Esse token deve ser usado na próxima chamada daquele sensor.

### Backend

A api _backend_ possui endpoints para cadastro de usuário e consulta a sensores e telemetria.

Cadastre um usuário no endpoint POST /api/v1/users, e em seguida use o endpoint POST /api/v1/token para pegar um token de acesso.

Use os endpoints GET /api/v1/sensors e /api/v1/telemetry para pegar os dados armazenados no banco.