# API Multiverso DC
API dos quadrinhos do Multiverso DC Comics.

Projeto para matéria APIs e WebServices, do curso de pós-graduação em Arquitetura de Sistemas Distribuídos da PUC Minas.

## Estrutura do projeto

O projeto usa o Node.js, com servidor de aplicação Express.js, e banco de dados PostgreSQL.

O arquivo index.js tem a inicialização e a definição das rotas do Express.js. Os middlewares de segurança e cache são colocados aqui.

A segurança está no módulo /security/auth.js, que é responsável pela geração de tokens de acesso e verificação dos mesmos. O método isAuthorized é o único que quebra a hierarquia de componentes, quando precisa buscar no banco de dados (através do serviço de usuários) os dados do token de acesso.

Se passarem pela segurança e cache, as requisições chamam os /routes específicos, que têm o tratamento de requisições e respostas.
Nesses módulos, os dados de entrada são lidos e transformados nos /model (no caso de POST), enviados para os /services, e as urls das respostas
são preenchidas.

Os /services fazem o tratamento dos dados, e contêm a lógica de negócios. Eles não tem controle sobre requisições, mas recebem os daddos destas, manipulam e buscam do /persistence, e retornam as respostas para os /routes.

O /persistence tem as querys de acesso ao banco de dados. Sua função é fazer a requisição ao banco e devolver os dados com um tratamento básico, para que os /services tratem. Os /persistence usam o módulo /database/database-driver.js para se comunicar com o banco, isolando a configuração de conexão
dos métodos de query.

## Instalação em máquina virtual

Para instalar em uma máquina virtual (testada em um EC2 com Amazon Linux 2), rode o comando abaixo no terminal da máquina:

```
sudo yum install git & git clone https://github.com/TiagoRaposoBR/puc-api.git & cd puc-api & sh install.sh
```

Para rodar em um ambiente de desenvolvimento:

- instale o Node.js 14.x
- instale o PostgreSQL versão 13
- rode o script de banco em puc-api/database/base-table.sql para criar a base de dados
- execute ```# npm install``` na raiz do projeto
- inicie o serviço com ```# node index.js ```

## Usuário Administrador

Para cadastrar dados no banco, é preciso usar o token de administrador. Esse usuário não é acessível pela API.

O token admin padrão é o seguinte. Recomendo alterar ao instalar o banco de dados, acessando diretamente por SQL. O id do usuário admin é 1.

```48yuikjrfdov09dis8w0eu34hjkgfi98d7eyu3h42tj59-ig8fru```