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

/**
 * Curated list of the channel's real, recent videos (newest first).
 * Acts as a guaranteed fallback so the Sermons page is NEVER empty: the
 * YouTube RSS feed (/feeds/videos.xml) frequently returns 404 to servers
 * (build hosts, CORS proxies), which used to leave the page blank.
 * When the live feed DOES work (build-time or client-side), it replaces this.
 * To refresh: open the channel's /videos page and update the ids + titles.
 */
const FALLBACK_VIDEOS: { id: string; title: string }[] = [
  { id: 'DtOQxqTXkbU', title: 'A Fé que Envia - Pr. Adaelton de Souza' },
  { id: 'Ry5TlNTN07M', title: 'Pastora Marina Reus | Vinho novo | Freedom Church Maryland' },
  { id: 'GHN-DmKxrR0', title: 'Pastor Adaelton de Souza | Freedom Church Maryland' },
  { id: '8fZbDk0GVw0', title: 'Pastor Adaelton de Souza | Cartas de Jesus | Part 5 | Freedom Church Maryland' },
  { id: 'OyjCzjXnC2A', title: 'Pastora Marina Reus | Os olhos de Deus | Freedom Church Maryland' },
  { id: 'JKBCP9ZGUDs', title: 'Pastor Adaelton de Souza | Cartas de Jesus | Part 4 | Freedom Church Maryland' },
  { id: 'sydidLL1Ek8', title: 'Pastor Adaelton de Souza | Cartas de Jesus | Part 3 | Freedom Church Maryland' },
  { id: 'wc5g5Odrmo4', title: 'Pastor Adaelton de Souza | Cartas de Jesus | Part 2 | Freedom Church Maryland' },
];

function fallbackVideos(): YouTubeVideo[] {
  return FALLBACK_VIDEOS.map(({ id, title }) => ({
    id,
    title,
    description: '',
    publishedAt: new Date(0), // unknown date — display layer omits it
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
    watchUrl: `https://www.youtube.com/watch?v=${id}`,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    author: 'Freedom Church',
  }));
}

export async function getChannelVideos(force = false): Promise<YouTubeVideo[]> {
  if (cachedVideos && !force) return cachedVideos;

  const channelId = church.social.youtubeChannelId;
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

  try {
    const res = await fetch(feedUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 FreedomChurchSite/1.0' },
    });
    if (!res.ok) {
      console.warn(`[youtube] feed fetch failed: ${res.status} — using fallback list`);
      return fallbackVideos();
    }
    const xml = await res.text();
    const parsed = parseFeed(xml).sort(
      (a, b) => b.publishedAt.valueOf() - a.publishedAt.valueOf(),
    );
    cachedVideos = parsed.length > 0 ? parsed : fallbackVideos();
    return cachedVideos;
  } catch (err) {
    console.warn('[youtube] feed fetch error — using fallback list:', err);
    return fallbackVideos();
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
  const pastorMatch = title.match(/^(Pastor[a]?\.?\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+){0,3}?)\s*\|/i);
  if (pastorMatch) return pastorMatch[1].trim();

  const prMatch = title.match(/^(Pr\.?[a]?\.?\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+){0,3}?)\s*\|/i);
  if (prMatch) return prMatch[1].trim();

  // Trailing form: "Title - Pr. Adaelton de Souza"
  const trailing = title.match(/[-–|]\s*((?:Pastor[a]?\.?|Pr\.?[a]?\.?)\s+[A-Za-zÀ-ÿ.]+(?:\s+[A-Za-zÀ-ÿ.]+){0,2})\s*$/i);
  if (trailing) return trailing[1].trim();

  return 'Freedom Church';
}

/**
 * Clean the title by removing pastor prefix and channel suffix.
 */
export function cleanTitle(title: string): string {
  const cleaned = title
    .replace(/^(Pastor[a]?\.?|Pr\.?[a]?\.?)\s+[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+){0,3}\s*\|\s*/i, '')
    .replace(/\s*\|\s*Freedom Church.*$/i, '')
    .replace(/\s*-\s*Freedom Church.*$/i, '')
    .replace(/\s*[-–|]\s*(?:Pastor[a]?\.?|Pr\.?[a]?\.?)\s+[A-Za-zÀ-ÿ.]+(?:\s+[A-Za-zÀ-ÿ.]+){0,2}\s*$/i, '')
    .replace(/\s*\|\s*Part\s*(\d+)/i, ' · Parte $1')
    .replace(/^\s*Freedom Church\b.*$/i, '') // leftover when the title was just pastor + channel
    .trim();
  return cleaned || 'Mensagem';
}
