export const languages = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
} as const;

export const defaultLang = 'pt';

export type Lang = keyof typeof languages;

export const ui = {
  pt: {
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.services': 'Cultos',
    'nav.sermons': 'Pregações',
    'nav.events': 'Eventos',
    'nav.ministries': 'Ministérios',
    'nav.prayer': 'Oração',
    'nav.give': 'Contribua',
    'nav.contact': 'Contato',
    'nav.newHere': 'Sou Novo Aqui',

    'hero.eyebrow': 'Bem-vindo à Freedom Church',
    'hero.title': 'Onde a fé liberta\nvidas.',
    'hero.subtitle': 'Uma comunidade brasileira de fé nos Estados Unidos. Venha como você é.',
    'hero.cta.primary': 'Visite-nos',
    'hero.cta.secondary': 'Assistir ao vivo',

    'section.next.eyebrow': 'Próximo encontro',
    'section.next.title': 'Junte-se a nós neste domingo',

    'section.sermons.eyebrow': 'Pregação recente',
    'section.sermons.title': 'A Palavra que transforma',
    'section.sermons.cta': 'Ver todas as pregações',

    'section.about.eyebrow': 'Quem somos',
    'section.about.title': 'Uma igreja para todos',
    'section.about.cta': 'Conheça nossa história',

    'footer.tagline': 'Liberdade em Cristo.',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.address': 'Endereço',
    'footer.contact': 'Contato',
    'footer.follow': 'Siga-nos',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.sermons': 'Sermons',
    'nav.events': 'Events',
    'nav.ministries': 'Ministries',
    'nav.prayer': 'Prayer',
    'nav.give': 'Give',
    'nav.contact': 'Contact',
    'nav.newHere': "I'm New Here",

    'hero.eyebrow': 'Welcome to Freedom Church',
    'hero.title': 'Where faith sets\nlives free.',
    'hero.subtitle': 'A Brazilian community of faith in the United States. Come as you are.',
    'hero.cta.primary': 'Visit us',
    'hero.cta.secondary': 'Watch live',

    'section.next.eyebrow': 'Next gathering',
    'section.next.title': 'Join us this Sunday',

    'section.sermons.eyebrow': 'Recent sermon',
    'section.sermons.title': 'The Word that transforms',
    'section.sermons.cta': 'View all sermons',

    'section.about.eyebrow': 'Who we are',
    'section.about.title': 'A church for everyone',
    'section.about.cta': 'Discover our story',

    'footer.tagline': 'Find freedom in Christ.',
    'footer.rights': 'All rights reserved.',
    'footer.address': 'Address',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow us',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Nosotros',
    'nav.services': 'Cultos',
    'nav.sermons': 'Prédicas',
    'nav.events': 'Eventos',
    'nav.ministries': 'Ministerios',
    'nav.prayer': 'Oración',
    'nav.give': 'Ofrendar',
    'nav.contact': 'Contacto',
    'nav.newHere': 'Soy Nuevo Aquí',

    'hero.eyebrow': 'Bienvenido a Freedom Church',
    'hero.title': 'Donde la fe libera\nvidas.',
    'hero.subtitle': 'Una comunidad brasileña de fe en Estados Unidos. Ven como eres.',
    'hero.cta.primary': 'Visítanos',
    'hero.cta.secondary': 'Ver en vivo',

    'section.next.eyebrow': 'Próximo encuentro',
    'section.next.title': 'Acompáñanos este domingo',

    'section.sermons.eyebrow': 'Prédica reciente',
    'section.sermons.title': 'La Palabra que transforma',
    'section.sermons.cta': 'Ver todas las prédicas',

    'section.about.eyebrow': 'Quiénes somos',
    'section.about.title': 'Una iglesia para todos',
    'section.about.cta': 'Conoce nuestra historia',

    'footer.tagline': 'Libérate en Cristo.',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.address': 'Dirección',
    'footer.contact': 'Contacto',
    'footer.follow': 'Síguenos',
  },
} as const;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
