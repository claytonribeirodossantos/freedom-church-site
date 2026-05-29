/**
 * Configuração de lançamento do site.
 *
 * COMO LANÇAR O SITE (tirar do "Em breve"):
 *   troque `maintenance: true` para `maintenance: false` e faça commit.
 *
 * Enquanto `maintenance: true`:
 *   - Quem visita ourfreedomchurch.com (público) vê a página "Em breve".
 *   - A equipe continua testando o site REAL no link .workers.dev (sem bloqueio).
 *   - Pra ver o site real no domínio próprio, acesse com ?preview no final da URL
 *     uma vez (ex: ourfreedomchurch.com/?preview) — fica liberado naquele navegador.
 */
export const SITE = {
  /** true = público vê "Em breve" no domínio próprio. false = site no ar pra todos. */
  maintenance: true,

  /** Domínios públicos onde o modo manutenção vale. O .workers.dev nunca é bloqueado. */
  liveHosts: ['ourfreedomchurch.com', 'www.ourfreedomchurch.com'],
} as const;
