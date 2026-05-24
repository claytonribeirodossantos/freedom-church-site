import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sermons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    titleEs: z.string().optional(),
    series: z.string(),
    pastor: z.string(),
    date: z.coerce.date(),
    duration: z.string(),
    youtubeId: z.string(),
    description: z.string().optional(),
    descriptionEn: z.string().optional(),
    descriptionEs: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    titleEs: z.string().optional(),
    tag: z.string(),
    date: z.coerce.date(),
    time: z.string(),
    place: z.string(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    descriptionEs: z.string().optional(),
    cover: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    titleEs: z.string().optional(),
    author: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    excerptEn: z.string().optional(),
    excerptEs: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { sermons, events, blog };
