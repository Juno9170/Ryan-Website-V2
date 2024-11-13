# Ryan Zhu: Portfolio
> All about me :)


## 🚀 Project Structure

```text
/
├── public/fonts
│   └── myFonts.otf                      //Open type fonts are here
├── .storybook/
│   ├── main.ts
│   └── component.stories.tsx
├── netlify/
│   └── serverlessFunc.tsx  
├── src/
│   ├── assets/
│   │   └── FallbackImages.png
│   ├── components/
│   │   ├── page-specific-components/
│   │   |   ├── Biography.astro
│   │   |   └── Skills.tsx
│   │   ├── ui/
│   │   |   └──Input.tsx                 // Shadcn/ui components
│   ├── layouts/
│   │   └── Layout.astro
│   ├── funcs/
│   │   └── atoms.tsx
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   |   └── contact.astro
│   ├── global.css
├── package.json
├── tailwind.config.mjs
├── vite.config.ts
├── astro.config.mjs
└── README.md
```
## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
