/**
 * YouTube RSS feed integration.
 * Fetches the channel's public RSS feed at build time and parses videos.
 * No API key needed. Free, public, and serverless-friendly.
 */

import { church } from '../data/church';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: Date;
  thumbnailUrl: string;
  watchUrl: string;
  embedUrl: string;
  author: string;
}

let cachedVideos: YouTubeVideo[] | null = null;

export async function getChannelVideos(force = false): Promise<YouTubeVideo[]> {
  if (cachedVideos && !force) return cachedVideos;

  const channelId = church.social.youtubeChannelId;
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 FreedomChurchSite/1.0' },
    });
    if (!res.ok) {
      console.warn(`[youtube] feed fetch failed: ${res.status}`);
      return [];
    }
    const xml = await res.text();
    cachedVideos = parseFeed(xml).sort(
      (a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf(),
    );
    return cachedVideos;
  } catch (err) {
    console.warn('[youtube] feed fetch error:', err);
    return [];
  }
}

function parseFeed(xml: string): YouTubeVideo[] {
  const entries = xml.split('<entry>').slice(1);
  return entries
    .map((entry): YouTubeVideo | null => {
      const id = match(entry, /<yt:videoId>([^<]+)<\/yt:videoId>/);
      const title = decodeXmlEntities(match(entry, /<title>([^<]+)<\/title>/));
      const description = decodeXmlEntities(match(entry, /<media:description>([\s\S]*?)<\/media:description>/));
      const publishedRaw = match(entry, /<published>([^<]+)<\/published>/);
      const author = decodeXmlEntities(match(entry, /<author>\s*<name>([^<]+)<\/name>/));

      if (!id || !title) return null;

      return {
        id,
        title,
        description,
        publishedAt: new Date(publishedRaw),
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
        embedUrl: `https://www.youtube.com/embed/${id}`,
        author: author || 'Freedom Church',
      };
    })
    .filter((v): v is YouTubeVideo => v !== null);
}

function match(s: string, re: RegExp): string {
  const m = s.match(re);
  return m ? m[1].trim() : '';
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/**
 * Extract a "series" name from the title.
 * Patterns:
 *   "Pastor X | SERIES | Part N | Freedom Church Maryland"
 *   "Pastor X | SERIES | Freedom Church Maryland"
 *   "Sunday service - Freedom Church Maryland"
 */
export function extractSeries(title: string): string {
  // Pattern: "... | SERIES | Part N | ..."
  const partMatch = title.match(/\|\s*([^|]+?)\s*\|\s*Part\s*\d+/i);
  if (partMatch) return partMatch[1].trim();

  // Pattern: "Pastor X | SERIES | Freedom Church..."
  const pipes = title.split('|').map((s) => s.trim()).filter(Boolean);
  if (pipes.length >= 3) {
    // Middle segments (not first, not last "Freedom Church...")
    const middle = pipes.slice(1, -1);
    if (middle.length > 0) return middle[0];
  }

  // Sunday service patterns
  if (/sunday\s+service/i.test(title)) return 'Sunday Service';
  if (/culto\s+(dominical|de\s+domingo)/i.test(title)) return 'Culto Dominical';

  return 'Mensagem';
}

/**
 * Extract pastor name from the title.
 */
export function extractPastor(title: string): string {
  const pastorMatch = title.match(/^(Pastor[a]?\.?\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?)/i);
  if (pastorMatch) return pastorMatch[1].trim();

  const prMatch = title.match(/^(Pr\.?[a]?\.?\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?)/i);
  if (prMatch) return prMatch[1].trim();

  return 'Freedom Church';
}

/**
 * Clean the title by removing pastor prefix and channel suffix.
 */
export function cleanTitle(title: string): string {
  return title
    .replace(/^(Pastor[a]?\.?|Pr\.?[a]?\.?)\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)?\s*\|\s*/i, '')
    .replace(/\s*\|\s*Freedom Church.*$/i, '')
    .replace(/\s*-\s*Freedom Church.*$/i, '')
    .replace(/\s*\|\s*Part\s*(\d+)/i, ' · Parte $1')
    .trim();
}
