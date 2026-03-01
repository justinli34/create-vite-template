# Create Vite Template

This template provides a minimal setup for a static site using:

- React
- TypeScript
- Vite
- Oxlint
- Oxfmt

## Prerequisites

- Node.js
- pnpm

## Usage

Create a project in a new directory:

```
pnpm create @justinli/vite-template my-app
```

Create a project in the current (empty) directory:

```
pnpm create @justinli/vite-template .
```

cd into the project directory, install dependencies, and start the development server:

```
cd my-app
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build for production
- `pnpm preview`: Preview the production build locally
- `pnpm lint`: Run Oxlint to check for linting errors
- `pnpm lint:fix`: Run Oxlint to fix linting errors
- `pnpm fmt`: Run Oxfmt to format code
- `pnpm fmt:check`: Run Oxfmt to check if code is formatted
- `pnpm check`: Run TypeScript, Oxlint, and Oxfmt checks
