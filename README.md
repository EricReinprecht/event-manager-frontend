# Event Frontend

Frontend application for the Event Platform.

Built with:

- React
- TypeScript
- Vite
- ESLint

The frontend communicates with the Event API backend and automatically generates shared API route constants from the backend project.

---

## Requirements

Before running the frontend, make sure you have:

- Node.js installed
- npm installed
- Event API backend available

---

## Installation

Install dependencies:

```bash
npm install
```

## Available Commands

| Command                   | Description                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev`             | Generates the latest backend route constants and starts the Vite development server         |
| `npm run build`           | Generates backend route constants, runs TypeScript checks, and creates the production build |
| `npm run generate-routes` | Generates the frontend route constants from the backend API routes                          |
| `npm run lint`            | Runs ESLint and checks the codebase for linting issues                                      |
| `npm run preview`         | Starts a local server to preview the production build                                       |

---

## Route Generation

The frontend shares API routes with the backend.

Routes are defined in the backend project and automatically generated for frontend usage.

Backend source:

```text
event-api/internal/routes/constants
```
