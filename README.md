# Task Management Application

---

## Project Overview

This application allows users to manage task lists and individual tasks. Users can create, edit, and delete task lists and tasks, track task status, monitor remaining time for each task and add/remove comments for each task.

Built with **Next.js 14+ (App Router)** and **Feature-Sliced Design (FSD)**.

---

## Technologies

- **Next.js 15.4.6** (App Router)
- **React** + TypeScript
- **Mantine** – UI component library
- **React-hook-form** for forms
- **Style-dictionary** for design tokens
- State Management: Redux Toolkit
- **CSS Modules / CSS Variables**
- **Jest + React Testing Library** for unit testing
- **Storybook** for component documentation
- **Zod** for schemas
- **MongoDB** – Database

---

## Project Structure (FSD)

```md
src/
|-- **tests**/ # App tests
|-- app/ # App Router pages
| |-- page.tsx
| └── api/ # Internal Next.js API routes
|-- features/ # Functional blocks (Auth, TaskManagement)
|-- lib/ # Mongo DB, Redux Toolkit configurations
|-- shared/ # Common components, layouts, constants, enums, schemas, types, middlewares and utils
└-- theme/ # Mantine configuration
```

## Features

### 1. Welcome Screen

- Greeting message
- Button to navigate to the login page

### 2. Login Page

- Fields: Email and Password
- Button: "Login"
- Local test credentials:

Email: test@gmail.com
Password: Test1234$

### 3. Main Screen (Task Lists)

- View all task lists with task counts
- Add, edit, delete task lists

### 5. Task Modal

- Display task details: title, description, status, dueDate, timer, comments
- Edit and delete task functionality

## Installation & Local Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Run database container:
   ```sh
   docker compose up
   ```
3. Run the application:
   ```sh
   npm run dev
   ```
4. Run Storybook:
   ```sh
   npm run storybook
   ```
5. Run tests:
   ```sh
   npm run test
   ```

## Test Credentials

Email: test@gmail.com
Password: Test1234$

## Deployment

**Link**: https://next-todo-list-test-o1wifwthc-staskonashuks-projects.vercel.app
