# AGENTS.md

## Build Commands
- `npm run dev` - Start development server on port 3000
- `npm run build` - Production build with Vite
- `npm run preview` - Preview production build
- No test framework configured

## Environment
- Requires `GEMINI_API_KEY` in `.env` file (accessed via `process.env.API_KEY`)

## Code Style
- **TypeScript**: Strict typing with ES2022 target, React JSX
- **Imports**: Use `@/*` path alias for project root; group external imports first
- **Components**: Functional React components with TypeScript interfaces for props
- **Naming**: PascalCase for components/types/enums, camelCase for functions/variables
- **Enums**: Use TypeScript enums for state machines (e.g., `AppState`, `Language`)
- **Async**: Use async/await with try/catch; log errors with `console.error`
- **State**: React hooks (`useState`, `useCallback`) for component state

## Project Structure
- `components/` - React UI components
- `services/` - API integrations (Gemini AI)
- `utils/` - Utilities (IndexedDB caching)
- `data/` - Static data (lesson presets)
- `types.ts` - Shared TypeScript types
