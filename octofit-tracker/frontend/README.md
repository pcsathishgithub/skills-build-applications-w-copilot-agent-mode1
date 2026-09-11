# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## OctoFit Tracker Frontend

The React 19 presentation tier uses React Router and reads data from the Node.js API.

## Environment

Create `octofit-tracker/frontend/.env.local` and define `VITE_CODESPACE_NAME` with the
Codespaces name so API requests use `https://$VITE_CODESPACE_NAME-8000.app.github.dev`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

This variable must be defined for Codespaces API access. When it is unset, the app safely
falls back to `http://localhost:8000` for local development.
