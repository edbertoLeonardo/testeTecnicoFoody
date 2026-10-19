# Foody — Sistema de Gerenciamento de Pedidos

Aplicação web desenvolvida como parte de um desafio técnico para gerenciamento de pedidos, com autenticação de usuários, criação, consulta de pedidos e atualização de status.

## Repositório

[https://github.com/edbertoLeonardo/testeTecnicoFoody](https://github.com/edbertoLeonardo/testeTecnicoFoody)

## Tecnologias utilizadas

### Back-end
- Java 17
- Spring Boot 4.1.1
- Spring Security
- Spring Data JPA
- Hibernate
- SQLite
- Maven

### Front-end
- React 19.2.8
- React Router DOM 7.18.4
- Vite 8.3.0

## Funcionalidades

### Autenticação
- Cadastro de usuários com nome, e-mail e senha.
- Login com e-mail e senha.
- Proteção de rotas para usuários autenticados.
- Logout e encerramento da sessão.

### Gerenciamento de pedidos
- Criação de pedidos com cliente, itens e endereço de entrega.
- Listagem dos pedidos do usuário autenticado.
- Busca de pedido por ID.
- Atualização do status do pedido.
- Controle de acesso para impedir que um usuário consulte ou altere pedidos de outro usuário.

### Status dos pedidos
- `RECEBIDO`
- `EM_PREPARO`
- `SAIU_PARA_ENTREGA`
- `ENTREGUE`
- `CANCELADO`

## Como executar o projeto

### Pré-requisitos

- Java 17 instalado.
- Node.js e npm instalados.
- Git instalado.

### 1. Clonar o repositório

Abra um terminal e execute:

```bash
git clone https://github.com/edbertoLeonardo/testeTecnicoFoody.git
cd testeTecnicoFoody
```

### 2. Executar o back-end

Na raiz do projeto, abra um terminal e execute:

```bash
./mvnw spring-boot:run
```

O backend será iniciado, por padrão, em:

http://localhost:8080

Mantenha esse terminal aberto enquanto estiver utilizando a aplicação.

### 3. Executar o front-end

Abra um segundo terminal, na raiz do projeto, e execute:

```bash
cd rastrear-pedido-front/
npm install
npm run dev
```

Acesse a aplicação pelo navegador:

http://localhost:5173

## Banco de dados SQLite

O projeto utiliza SQLite para persistir os dados de usuários e pedidos, sem precisar configurar um servidor de banco de dados separado.

O arquivo do banco de dados está localizado em:

`data/rastrear-pedido.db`

A conexão está configurada no arquivo `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlite:./data/rastrear-pedido.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
spring.jpa.hibernate.ddl-auto=update
```

O Hibernate utiliza a configuração `ddl-auto=update` para atualizar o esquema do banco conforme as entidades da aplicação.

Os dados ficam persistidos no arquivo SQLite, permitindo que os pedidos continuem disponíveis após reiniciar a aplicação, desde que o arquivo do banco seja mantido.

## Endpoints da API REST

| Método | Endpoint | Descrição |
|---|---|---|
| `POST` | `/api/auth/register` | Cadastro de usuário |
| `POST` | `/api/auth/login` | Login |
| `GET` | `/api/auth/me` | Consultar usuário autenticado |
| `POST` | `/api/auth/logout` | Encerrar sessão |
| `POST` | `/api/pedidos` | Criar pedido |
| `GET` | `/api/pedidos` | Listar pedidos do usuário |
| `GET` | `/api/pedidos/{id}` | Buscar pedido por ID |
| `PATCH` | `/api/pedidos/{id}/status?novoStatus={status}` | Atualizar status do pedido |

As rotas de pedidos exigem autenticação. Cadastro e login são públicos.

## Segurança

A aplicação utiliza Spring Security e autenticação baseada em sessão HTTP. O backend verifica se o pedido pertence ao usuário autenticado antes de permitir sua consulta ou atualização.

## Versionamento

O projeto utiliza Git para controle de versão e registro do histórico de desenvolvimento.

## Autor

Desenvolvido como parte de um desafio técnico.
