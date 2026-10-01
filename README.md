# Mystery Room 

> An interactive, browser-based mystery and escape-room experience built by **Team 4 — B4F Cohort 8, Salamiyah**.

A player opens the app, chooses a mystery, reads the situation, inspects clues, submits answers, and progresses toward a final reveal.

The **backend validates every answer and controls the game's progression**, while the frontend acts as a window into the story.

---

## Table of Contents

* [About the Project](#about-the-project)
* [Features](#features)
* [Mysteries](#mysteries)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [API Overview](#api-overview)
* [Team](#team)
* [Roles & Responsibilities](#roles--responsibilities)
* [Git Workflow](#git-workflow)
* [Definition of Done](#definition-of-done)
* [License](#license)

---

## About the Project

**Mystery Room** is an interactive mystery-solving experience designed to feel like a real game rather than a traditional dashboard or CRUD application.

The project was built as a weekly mini-project for the **B4F React + Node Bootcamp — Cohort 8, Salamiyah**.

It uses the technical stack taught throughout Sessions 01–06:

* **React + React Router** for the frontend
* **TypeScript** for type safety
* **Redux Toolkit + Context API** for state management where genuinely needed
* **Node.js + Express.js** for the backend
* **In-memory state** with no database
* **No authentication**

### Backend Responsibilities

The backend is responsible for:

* Serving mystery data
* Providing the current question and options
* Validating submitted answers
* Moving the player to the next stage
* Detecting when a mystery is solved
* Providing hints and clues
* Managing the current game state
* Returning meaningful HTTP status codes

---

## Features

* ✅ Two original mysteries with unique stories, characters, and clues
* ✅ Multiple stages with progression logic
* ✅ Multiple-choice and free-text answers
* ✅ Hint system with a visible hints-remaining counter
* ✅ Clue panels that reveal story details progressively
* ✅ Real backend validation with proper HTTP status codes
* ✅ Loading, error, and empty states
* ✅ Final reveal screen for each mystery
* ✅ Fully responsive UI
* ✅ Centralized API layer with no `fetch` scattered across components

---

##  Mysteries

The app includes two original mysteries.

### Mystery 1 — الغرفة المغلقة في سوق الحميدية

**Difficulty:** Easy → Medium

> In 1975, the merchant Abu Saleh sealed his room in Souq Al-Hamidiyah with a mysterious lock, leaving behind a message: whoever opens it must pass three locks. No one knows what he hid.

**Stages:**

1. Metal identification
2. Number pattern
3. Alternating sequence

**Format:** Multiple-choice

**Final Reveal:** A family secret about sacrifice.

---

### Mystery 2 — Coming Soon

**Difficulty:** Medium → Hard

> A second mystery with its own original story, characters, and clues. It follows the same structure as Mystery 1 but introduces more challenging puzzles that require multi-step reasoning.

**Stages:**

1. Pattern recognition
2. Logic and classification
3. Final multi-step deduction

**Format:** Multiple-choice + free-text answers

**Goal:** Each stage builds on the previous one and leads to a meaningful final reveal.

> **Note:** The story and clues of Mystery 2 are intentionally not revealed here. The mystery begins when you play it.

---

# Tech Stack

## Frontend

| Technology          | Purpose                                      |
| ------------------- | -------------------------------------------- |
| **React 18**        | UI library                                   |
| **TypeScript**      | Type safety                                  |
| **Vite**            | Build tool and development server            |
| **React Router v7** | Client-side routing                          |
| **Redux Toolkit**   | Shared state where needed                    |
| **Context API**     | Theme, notifications, and small shared state |
| **Custom CSS**      | Styling and responsive design                |

## Backend

| Technology           | Purpose                    |
| -------------------- | -------------------------- |
| **Node.js**          | Runtime environment        |
| **Express.js**       | HTTP server and API        |
| **ES Modules**       | `import` / `export` syntax |
| **express.Router()** | Route organization         |
| **Controllers**      | Separation of concerns     |
| **In-memory state**  | Runtime game state         |

## Developer Tools

* **VS Code** — Code editor
* **Thunder Client / Postman** — API testing
* **Git + GitHub** — Version control
* **npm** — Package manager

---

## Forbidden / Out of Scope

The following technologies and patterns were intentionally not used according to the project specification:

* Databases such as MongoDB, PostgreSQL, Prisma, or Mongoose
* Authentication such as JWT, sessions, cookies, or password hashing
* NestJS or Next.js
* GraphQL
* WebSockets
* Redis
* Redux async patterns such as `createAsyncThunk` or RTK Query
* Validation libraries such as Zod, Joi, or express-validator
* Docker or deployment tools

---

# Project Structure

```text
mystery-room-b4f/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── mysteryApi.ts
│   │   │
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MysteryCard.tsx
│   │   │   ├── LoadingMessage.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   │
│   │   │   └── game/
│   │   │       ├── StageHeader.tsx
│   │   │       ├── StageQuestion.tsx
│   │   │       ├── AnswerOptions.tsx
│   │   │       ├── SubmitAnswerButton.tsx
│   │   │       ├── HintButton.tsx
│   │   │       ├── HintBox.tsx
│   │   │       ├── CluePanel.tsx
│   │   │       ├── StageProgress.tsx
│   │   │       ├── GameStatus.tsx
│   │   │       ├── SuccessMessage.tsx
│   │   │       ├── WrongAnswerMessage.tsx
│   │   │       └── ResultCard.tsx
│   │   │
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── NotificationContext.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── MysteriesPage.tsx
│   │   │   ├── MysteryDetailsPage.tsx
│   │   │   ├── GamePage.tsx
│   │   │   ├── ResultPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   │
│   │   ├── router/
│   │   │   └── AppRouter.tsx
│   │   │
│   │   ├── store/
│   │   │   ├── store.ts
│   │   │   ├── hooks.ts
│   │   │   ├── selectors.ts
│   │   │   └── gameSlice.ts
│   │   │
│   │   ├── types/
│   │   │   ├── mystery.ts
│   │   │   ├── stage.ts
│   │   │   ├── game.ts
│   │   │   └── api.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   ├── variables.css
│   │   │   ├── layout.css
│   │   │   └── components.css
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/
│   ├── controllers/
│   │   └── mysteryController.js
│   ├── data/
│   │   └── mysteries.js
│   ├── routes/
│   │   └── mysteries.js
│   ├── store.js
│   ├── utils.js
│   ├── index.js
│   └── package.json
│
├── docs/
│   ├── API_CONTRACT.md
│   ├── FRONTEND_TASKS.md
│   └── BACKEND_GUIDE.md
│
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure you have:

* **Node.js v18 or higher**
* **npm**
* A modern browser such as Chrome, Firefox, or Edge

---

## 1. Clone the Repository

```bash
git clone https://github.com/hamidAlhaj/mystery-room-b4f.git
cd mystery-room-b4f
```

---

## 2. Start the Backend

Open a terminal:

```bash
cd server
npm install
npm start
```

The API will run at:

```text
http://localhost:3001
```

You should see:

```text
Mystery Room API running at http://localhost:3001
```

---

## 3. Start the Frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

Open that address in your browser.

---

# API Overview

### Base URL

```text
http://localhost:3001
```

### Endpoints

| Method  | Endpoint                     | Purpose            | Success | Errors              |
| ------- | ---------------------------- | ------------------ | ------- | ------------------- |
| `GET`   | `/api/mysteries`             | List all mysteries | `200`   | —                   |
| `GET`   | `/api/mysteries/:id`         | Get one mystery    | `200`   | `404`               |
| `GET`   | `/api/mysteries/:id/clues`   | Get all clues      | `200`   | `404`               |
| `POST`  | `/api/mysteries/:id/answers` | Submit an answer   | `200`   | `400`, `404`, `409` |
| `PATCH` | `/api/mysteries/:id/hint`    | Request a hint     | `200`   | `404`, `409`        |

---

## Mystery Object

Example response:

```json
{
  "id": 1,
  "slug": "sealed-room",
  "title": "الغرفة المغلقة في سوق الحميدية",
  "intro": "...",
  "totalStages": 3,
  "currentStage": 0,
  "solved": false,
  "hintsUsed": 0,
  "currentQuestion": "...",
  "currentOptions": [
    "brass",
    "iron",
    "gold",
    "silver"
  ]
}
```

> **Security note:** The correct answer is never sent to the client. It remains on the server.

---

## HTTP Status Code Decisions

| Scenario                              | Code  | Reason                                   |
| ------------------------------------- | ----- | ---------------------------------------- |
| Successful request                    | `200` | Request completed successfully           |
| Missing or invalid answer             | `400` | Client sent invalid input                |
| Mystery does not exist                | `404` | Requested resource was not found         |
| Invalid action for current game state | `409` | Request conflicts with the current state |

---

# Team

**Team 4 — B4F Cohort 8, Salamiyah**

| Student             | Role                                               |
| ------------------- | -------------------------------------------------- |
| **Hamid Al Haj**    | Team Lead + Backend                                |
| **Ali Mikdad**      | Backend + Testing                                  |
| **Shiam Ezzo**      | Frontend — Pages + Router + Navigation             |
| **Hassan Alloush**  | Frontend — API Layer + Types + Loading/Error       |
| **Mulham Al Kasir** | Frontend — State + Context + GamePage Coordination |
| **Adham Albasha**   | Frontend — Game Components + Result UI             |

---

# Roles & Responsibilities

##  Hamid Al Haj — Team Lead + Backend

* Owns the `server/` structure and integration
* Coordinates the team and merges Pull Requests into `main`
* Reviews backend changes
* Writes the second mystery data
* Performs final integration testing

## Ali Mikdad — Backend + Testing

* Assists with backend implementation
* Independently tests every endpoint using Curl / Thunder Client
* Verifies status codes and edge cases
* Fixes backend bugs

## Shiam Ezzo — Pages + Router + Navigation

* Owns `client/src/pages/`
* Owns `client/src/router/`
* Builds all page components
* Implements `AppRouter.tsx` with dynamic routes
* Builds Navbar, Header, and Footer
* Ensures real navigation using `Link` / `NavLink`

## Hassan Alloush — API Layer + Types

* Owns `client/src/api/`
* Owns `client/src/types/`
* Builds the base `apiRequest` wrapper
* Builds `mysteryApi.ts`
* Defines TypeScript interfaces
* Builds Loading, Error, and Empty states

## Mulham Al Kasir — State + GamePage Coordination

* Owns `client/src/context/`
* Owns `client/src/store/`
* Builds `ThemeContext` and shared state
* Owns `GamePage.tsx`
* Coordinates API, state, and game components
* Decides when Redux is genuinely needed

## Adham Albasha — Game Components + Result UI

* Owns `client/src/components/game/`
* Builds all game-related components
* Builds `ResultCard` and result UI
* Ensures components are reusable and focused
* Handles success and wrong-answer feedback

---

# Git Workflow

## Branches

### `main`

Protected branch. Only **Hamid** merges Pull Requests into `main`.

### Feature branches

Use one branch per feature:

```text
feature/<name>-<task>
```

Example:

```text
feature/hassan-api-types
```

---

## Commit Messages

| Prefix      | Use for               |
| ----------- | --------------------- |
| `feat:`     | New feature           |
| `fix:`      | Bug fix               |
| `docs:`     | Documentation         |
| `chore:`    | Setup / configuration |
| `refactor:` | Code refactoring      |
| `test:`     | Testing               |

---

## Development Workflow

### 1. Start from the latest `main`

```bash
git checkout main
git pull origin main
```

### 2. Create your feature branch

```bash
git checkout -b feature/<your-name>-<task>
```

### 3. Work and commit

```bash
git add .
git commit -m "feat: add mystery API layer"
```

### 4. Push your branch

```bash
git push origin feature/<your-name>-<task>
```

### 5. Open a Pull Request

Create a Pull Request on GitHub and wait for review.

---

# ✅ Pull Request Checklist

Before opening a Pull Request:

* [ ] `npm run build` passes in the client
* [ ] `npm run lint` passes in the client
* [ ] `node --check index.js` passes in the server if backend code changed
* [ ] All Curl / Postman / Thunder Client tests pass
* [ ] No new npm packages without team approval
* [ ] No database
* [ ] No authentication
* [ ] No forbidden libraries

---

#  Merge Order

To reduce conflicts, the recommended merge order is:

1. **Hassan** — API + Types
2. **Adham** — Game Components
3. **Mulham** — GamePage + State
4. **Shiam** — Router + Pages
5. **Hamid** — Final Integration

---

# Definition of Done

The project is considered complete when:

* [ ] Fresh `npm install` works in both `server/` and `client/`
* [ ] `npm start` works for the server
* [ ] `npm run dev` works for the client
* [ ] A player can go from **Home → Mystery → Solved → Result**
* [ ] No console errors break the flow
* [ ] All 5 API endpoints are independently testable
* [ ] Both Mystery 1 and Mystery 2 are playable
* [ ] Invalid answers return `400`
* [ ] Missing mysteries return `404`
* [ ] Invalid game-state requests return `409`
* [ ] Loading, error, and empty states exist on API-driven screens
* [ ] Story, clues, and wording are original
* [ ] Every team member has a real speaking role in the presentation
* [ ] The `main` branch contains commits from every team member

---

# License

This project was built for educational purposes as part of the:

**B4F Bootcamp — Cohort 8, Salamiyah**

It is **not intended for production use**.

---

<p align="center">
  <strong>Mystery Room</strong><br>
  <em>Because the best way to learn is to build something you'd actually want to play.</em>
</p>
