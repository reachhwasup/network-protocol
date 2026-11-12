# Protocol Explorer — local clone

A self-contained mirror of https://protocol-explorer-alpha.vercel.app/ captured on November 12, 2026. Original application and branding by Dilum Sanjaya; attribution is retained.

## Run

Requires Node.js 18 or newer. No dependencies to install.

```sh
npm run dev
```

Open http://localhost:5173. Set `PORT` to choose another port.

```sh
npm run check
npm run build
```

Deploy `dist/` to a static host. All application bundles, translations, fonts, icons, and sharing images are stored locally in `public/`.

This is a mirror of the deployed application, including its compiled JavaScript and CSS, rather than the original uncompiled source project. For substantial feature development, obtain the original source from its author.
