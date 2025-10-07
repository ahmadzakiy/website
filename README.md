This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, set up your environment variables by creating a `.env.local` file:

```bash
cp .env.local.template .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the result.

## Supabase Setup

This project uses Supabase as the database for storing notes/links data. The database schema is defined in `supabase-setup.sql`.

### Database Structure

- `categories` table: Stores the three main categories (articles, websites, tools)
- `notes` table: Stores all links with references to categories

### Running the Setup

1. Create a new Supabase project
2. Run the SQL commands from `supabase-setup.sql` in your Supabase SQL editor
3. Copy your project URL and anon key to `.env.local`

## Google Analytics Setup

This project includes Google Analytics integration for tracking website usage:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use an existing one
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)
4. Add it to your `.env.local` file as `NEXT_PUBLIC_GA_ID`

The analytics will only be active in production builds to avoid tracking development data.

## Project Architecture

This project follows a specific architecture pattern:

- **Framework**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Animation**: Motion (framer-motion v12) for smooth scroll-based animations
- **Database**: Supabase for data storage
- **Linting**: Biome with Ultracite rules

### Component Organization

```
src/components/          # Core reusable components
src/fancy/components/    # Experimental/creative components
  background/            # Background effects
  blocks/               # Layout blocks
  text/                 # Text animations
```

## Development

This project uses:

- Port 9000 for development server
- Biome for linting and formatting (`pnpm lint`, `pnpm format`)
- Lefthook for git hooks
- Custom theme system with localStorage persistence

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
