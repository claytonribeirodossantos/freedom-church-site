# Freedom Church — Website

Trilingual (PT / EN / ES) website for **Freedom Church** — a Brazilian church in Kensington, Maryland, USA.

🌐 Live at: [ourfreedomchurch.com](https://ourfreedomchurch.com)
📍 Address: 5020 Nicholson Court, Kensington, MD 20895, USA
⛪ Sunday service: 10:30 AM

---

## Stack

- [Astro 6](https://astro.build/) — static site framework
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [Decap CMS](https://decapcms.org/) — visual content editor at `/admin`
- Hosted on [Cloudflare Pages](https://pages.cloudflare.com/) — free, global CDN
- Repo on GitHub — free

**Total monthly cost: $0**

## Local development

```bash
npm install
npm run dev      # → http://localhost:4321
npm run build    # → static output in dist/
npm run preview  # → preview built site
```

## Content editing

Visit `/admin` on the live site, log in with GitHub, and edit sermons, events, and blog posts visually. Changes commit to this repo automatically and the site rebuilds in ~30 seconds.

## Project structure

```
src/
├── components/         # UI components (Hero, Header, Footer, etc)
│   └── pages/          # Page content components
├── content/            # Markdown content (sermons, events, blog)
├── content.config.ts   # Astro Content Collections schemas
├── data/church.ts      # Church info (single source of truth)
├── i18n/               # Translations (PT, EN, ES) + helpers
├── layouts/            # BaseLayout
├── pages/              # Astro routes
└── styles/global.css   # Design tokens + Tailwind v4
public/
└── admin/              # Decap CMS panel + config
```

## License

Content © Freedom Church. Code released under MIT.
