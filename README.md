# My AI Portfolio
![App Preview](https://imgix.cosmicjs.com/99ee65c0-25fc-11f1-a9b4-1bd048ffba97-autopilot-photo-1558494949-ef010cbdcc31-1774190226960.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A stunning, modern AI developer portfolio built with **Next.js 16** and powered by **[Cosmic](https://www.cosmicjs.com)** CMS. Showcases projects, skills, and work experience with a dark futuristic aesthetic, glassmorphism effects, and smooth animations.

## Features

- 🚀 **Project Showcase** — Filterable cards with screenshots, tech stack badges, live URLs, and GitHub links
- 💡 **Skills Dashboard** — Visual proficiency bars organized by category
- 💼 **Work Experience Timeline** — Elegant vertical timeline with company details and dates
- 🎨 **Dark Futuristic Theme** — Glassmorphism cards, gradient text, and glowing accents
- ⚡ **Server-Side Rendering** — Lightning-fast loads with Next.js 16 Server Components
- 📱 **Fully Responsive** — Beautiful on every screen size
- 🔍 **SEO Optimized** — Complete metadata and semantic HTML
- 🏷️ **"Built with Cosmic" Badge** — Dismissible attribution badge

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69bffe38f748f8b9ec618acc&clone_repository=69bfff85b1edda07c7b10fe2)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a developer portfolio with projects (including screenshots, tech stack, and live URLs), skills, and work experience. User instructions: AI developer portfolio"

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called 'My AI Portfolio'. The content is managed in Cosmic CMS with the following object types: projects, skills, work-experience. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: AI developer portfolio"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **[Next.js 16](https://nextjs.org/)** — React framework with App Router and Server Components
- **[React 19](https://react.dev/)** — UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** — Type-safe development
- **[Tailwind CSS 3](https://tailwindcss.com/)** — Utility-first CSS framework
- **[Cosmic SDK](https://www.cosmicjs.com/docs)** — Headless CMS integration
- **[Inter Font](https://fonts.google.com/specimen/Inter)** — Clean, modern typography

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the content models set up

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-ai-portfolio

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Cosmic SDK Examples

### Fetching Projects

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: projects } = await cosmic.objects
  .find({ type: 'projects' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Skills by Category

```typescript
const { objects: skills } = await cosmic.objects
  .find({ type: 'skills' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This portfolio uses three content types from [Cosmic](https://www.cosmicjs.com/docs):

| Object Type | Metafields |
|---|---|
| **Projects** | description, screenshot, tech_stack, live_url, github_url, featured |
| **Skills** | name, category, proficiency |
| **Work Experience** | company, role, description, start_date, end_date, current |

Environment variables required:
- `COSMIC_BUCKET_SLUG` — Your Cosmic bucket slug
- `COSMIC_READ_KEY` — Your Cosmic read key
- `COSMIC_WRITE_KEY` — Your Cosmic write key (optional for read-only)

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->