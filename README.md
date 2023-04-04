# To Do List API

This project is a To Do List API built using the **Express** and **TypeScript**. It allows users to add, view, update and delete tasks on their to do list. The project is still under development and aims to provide a strong, reliable, and scalable backend service.

# Getting Started

## Prerequisites

Before running this project, you must have the following installed:

- Node.js (**v16.20.0** or later)

- Yarn or npm

- MongoDB

## Installation

1. Clone this repository to your local machine.

2. Run `yarn` or `npm install` in the project directory to install all required dependencies.

3. Create a `.env` file at the root directory of the project and add the necessary environment variables. See the `.env.example` file for reference.

4. Run `yarn start` or `npm start` to start the application.

## Usage

The application can be accessed by visiting `http://localhost:8080` in your web browser. From there, you can add, view, update and delete tasks on your Todo List.

# Technology Stack

- Express: A popular web framework for Node.js used to build APIs and web applications.

- TypeScript: A superset of JavaScript that adds static typing and other features to improve code quality and maintainability.

- MongoDB: A NoSQL document database used to store and manage data.

- JWT: JSON Web Tokens are used for authentication and authorization purposes. They are commonly used in web applications to securely transmit user data.

- Zod: A TypeScript-first schema validation library that is used to validate and sanitize incoming data.

- Jest: A JavaScript testing framework used for unit and integration testing.

- i18next: A popular internationalization (i18n) library used to provide multilingual support for web applications.

- Docker: A containerization platform used to package applications and their dependencies into lightweight, portable containers.

- GitHub Actions: A CI/CD platform that automates software development workflows.

- AWS EC2: A cloud-based compute service used to run applications and services.

# Project Structure

```
.
├── .github
│   └── workflows
│       └── github-actions-demo.yml
├── .vscode
│   ├── extensions.json
│   └── settings.json
├── src
│   ├── __tests__
│   │   └── routes
│   │       └── testRoutes.test.ts
│   ├── controllers
│   │   ├── authController.ts
│   │   ├── testController.ts
│   │   └── todosController.ts
│   ├── database
│   │   └── index.ts
│   ├── locales
│   │   ├── en
│   │   │   └── translation.json
│   │   └── zh-TW
│   │       └── translation.json
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   └── i18nMiddleware.ts
│   ├── models
│   │   ├── todo.ts
│   │   └── user.ts
│   ├── routes
│   │   ├── authRoutes.ts
│   │   ├── index.ts
│   │   ├── testRoutes.ts
│   │   └── todosRoutes.ts
│   ├── types
│   │   └── apiResponse.ts
│   ├── utils
│   │   └── apiResponse.ts
│   ├── app.ts
│   └── server.ts
├── .dockerignore
├── .env.example
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── Dockerfile
├── README.md
├── cspell.json
├── jest.config.json
├── package.json
├── project-words.txt
├── tsconfig.json
└── yarn.lock
```
