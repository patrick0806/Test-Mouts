## Getting Started

First, run the development server:

### Obs: Run the api first for the front running in localhost:3001

## Install dependencies
```bash
npm i
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Project structure (simplfied)
```bash
src/
├── app/
│   └── dashboard/
|   └── Page.tsx # App pages
├── components/
│   ├── page/           # Componentes by page
│   ├── ui/             # Shadcn components
├── hooks/              # Application hooks eg: useListUsers()
├── libs/               # libs configurations for running like axios
├── providers/              # providers eg: react query provider
└── main.ts             # Application entrypoint
```
