export const church = {
  name: 'Freedom Church',
  brandHandle: 'OurFreedomChurch',
  tagline: {
    pt: 'Liberte-se em Cristo.',
    en: 'Find freedom in Christ.',
    es: 'Libérate en Cristo.',
  },

  address: {
    street: '5020 Nicholson Court',
    city: 'Kensington',
    state: 'MD',
    zip: '20895',
    country: 'USA',
    full: '5020 Nicholson Court, Kensington, MD 20895, USA',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=5020+Nicholson+Court+Kensington+MD+20895',
  },

  services: {
    pt: [
      { day: 'Domingo', time: '10h30', name: 'Culto principal', desc: 'Louvor, Palavra, oração e ministério para crianças.' },
    ],
    en: [
      { day: 'Sunday', time: '10:30 AM', name: 'Sunday Service', desc: 'Worship, the Word, prayer and kids ministry.' },
    ],
    es: [
      { day: 'Domingo', time: '10:30 AM', name: 'Culto principal', desc: 'Alabanza, Palabra, oración y ministerio infantil.' },
    ],
  },

  pastors: [
    {
      name: 'Adaelton de Souza',
      role: { pt: 'Pastor', en: 'Pastor', es: 'Pastor' },
      bio: {
        pt: 'Pastor da Freedom Church ao lado da Pra Jheini. Marido, pai e apaixonado por ver vidas livres em Cristo.',
        en: 'Pastor of Freedom Church alongside Ps. Jheini. Husband, father, and passionate about seeing lives set free in Christ.',
        es: 'Pastor de Freedom Church junto a la Pra Jheini. Esposo, padre y apasionado por ver vidas libres en Cristo.',
      },
      instagram: 'https://www.instagram.com/adaelton_desouza/',
      handle: '@adaelton_desouza',
      photo: '/pastors/adaelton.jpg',
    },
    {
      name: 'Jheini de Souza',
      role: { pt: 'Pastora', en: 'Pastor', es: 'Pastora' },
      bio: {
        pt: 'Pastora da Freedom Church ao lado do Pr Adaelton. Esposa, mãe e voz que carrega esperança e cura.',
        en: 'Pastor of Freedom Church alongside Ps. Adaelton. Wife, mother, and a voice that carries hope and healing.',
        es: 'Pastora de Freedom Church junto al Pr Adaelton. Esposa, madre y voz que lleva esperanza y sanidad.',
      },
      instagram: 'https://www.instagram.com/jheinidesouza/',
      handle: '@jheinidesouza',
      photo: '/pastors/jheini.jpg',
    },
  ],

  pastorsCouple: {
    photo: '/pastors/pastores.jpg',
    altText: 'Pastores Adaelton e Jheini de Souza',
  },

  social: {
    instagram: 'https://www.instagram.com/ourfreedomchurch_md/',
    instagramHandle: '@ourfreedomchurch_md',
    // Channel ID URL — sempre funciona, não depende de handle do canal
    youtube: 'https://www.youtube.com/channel/UCmItF2T27GJFT6gFJti_9SA',
    youtubeHandle: '@ourfreedomchurch',
    youtubeName: 'Freedom Church',
    youtubeChannelId: 'UCmItF2T27GJFT6gFJti_9SA',
    facebook: 'https://www.facebook.com/ourfreedomchurchMD',
    spotify: '',
    whatsapp: '',
  },

  sampleSermon: {
    youtubeId: 'vPoRJh9AWZk',
    embedUrl: 'https://www.youtube.com/embed/vPoRJh9AWZk',
    watchUrl: 'https://www.youtube.com/watch?v=vPoRJh9AWZk',
  },

  contact: {
    email: 'contato@ourfreedomchurch.com',
    phone: '',
  },

  giving: {
    zelle: {
      identifier: 'Give@ourfreedomchurch.com',
      identifierType: 'email',
      label: 'Zelle',
    },
    venmo: {
      handle: '@ourfreedomchurch',
      url: 'https://venmo.com/u/ourfreedomchurch',
      label: 'Venmo',
    },
    cashapp: {
      handle: '$ourfreedomchurch',
      url: 'https://cash.app/$ourfreedomchurch',
      label: 'Cash App',
    },
  },

  /**
   * Web3Forms access key for prayer + contact forms.
   * Free account at https://web3forms.com — Clayton needs to swap this
   * placeholder for the real key generated for ourfreedomchurch.com.
   */
  web3FormsAccessKey: 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY',

  ministries: {
    pt: ['Kids', 'Jovens', 'Casais', 'Mulheres', 'Homens', 'Louvor', 'Células'],
    en: ['Kids', 'Youth', 'Couples', 'Women', 'Men', 'Worship', 'Small Groups'],
    es: ['Niños', 'Jóvenes', 'Parejas', 'Mujeres', 'Hombres', 'Alabanza', 'Grupos pequeños'],
  },
} as const;
