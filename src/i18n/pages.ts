import type { Lang } from './ui';

type PageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

type PagesMap = Record<string, Record<Lang, PageContent>>;

export const pages: PagesMap = {
  about: {
    pt: { eyebrow: 'Quem somos', title: 'Uma família\nantes de tudo.', subtitle: 'A Freedom Church nasceu do sonho de ver brasileiros nos Estados Unidos vivendo uma fé que liberta — em comunidade, com propósito.' },
    en: { eyebrow: 'About us', title: 'A family\nfirst.', subtitle: 'Freedom Church was born from the dream of seeing Brazilians in the United States living a faith that sets free — in community, with purpose.' },
    es: { eyebrow: 'Quiénes somos', title: 'Una familia\nantes que todo.', subtitle: 'Freedom Church nació del sueño de ver brasileños en Estados Unidos viviendo una fe que libera — en comunidad, con propósito.' },
  },
  services: {
    pt: { eyebrow: 'Cultos e horários', title: 'Venha como\nvocê é.', subtitle: 'Nossos encontros são acolhedores, sem julgamentos. Música, Palavra e oração para todas as fases da vida.' },
    en: { eyebrow: 'Services & times', title: 'Come as\nyou are.', subtitle: 'Our gatherings are welcoming, no judgment. Music, the Word, and prayer for every season of life.' },
    es: { eyebrow: 'Cultos y horarios', title: 'Ven tal como\neres.', subtitle: 'Nuestros encuentros son acogedores, sin juicios. Música, Palabra y oración para todas las etapas de la vida.' },
  },
  sermons: {
    pt: { eyebrow: 'Pregações', title: 'A Palavra que\ntransforma.', subtitle: 'Mensagens semanais que conectam a Bíblia à sua vida real. Assista, ouça, compartilhe.' },
    en: { eyebrow: 'Sermons', title: 'The Word that\ntransforms.', subtitle: 'Weekly messages that connect the Bible to your real life. Watch, listen, share.' },
    es: { eyebrow: 'Prédicas', title: 'La Palabra que\ntransforma.', subtitle: 'Mensajes semanales que conectan la Biblia con tu vida real. Mira, escucha, comparte.' },
  },
  events: {
    pt: { eyebrow: 'Eventos', title: 'Algo está\nacontecendo.', subtitle: 'Conferências, encontros, retiros e ações sociais. Veja o que vem por aí.' },
    en: { eyebrow: 'Events', title: 'Something is\nhappening.', subtitle: 'Conferences, gatherings, retreats and outreach. See what is coming up.' },
    es: { eyebrow: 'Eventos', title: 'Algo está\nsucediendo.', subtitle: 'Conferencias, encuentros, retiros y acciones sociales. Mira lo que viene.' },
  },
  ministries: {
    pt: { eyebrow: 'Ministérios', title: 'Há um lugar\npara você.', subtitle: 'Crianças, jovens, casais, mulheres, homens, louvor. Encontre seu espaço para crescer e servir.' },
    en: { eyebrow: 'Ministries', title: 'There is a place\nfor you.', subtitle: 'Kids, youth, couples, women, men, worship. Find your space to grow and serve.' },
    es: { eyebrow: 'Ministerios', title: 'Hay un lugar\npara ti.', subtitle: 'Niños, jóvenes, parejas, mujeres, hombres, alabanza. Encuentra tu espacio para crecer y servir.' },
  },
  give: {
    pt: { eyebrow: 'Contribua', title: 'Cada semente\nfaz história.', subtitle: 'Sua generosidade sustenta o ministério, transforma vidas e leva o Evangelho mais longe.' },
    en: { eyebrow: 'Give', title: 'Every seed\nmakes history.', subtitle: 'Your generosity sustains the ministry, transforms lives, and takes the Gospel further.' },
    es: { eyebrow: 'Ofrendar', title: 'Cada semilla\nhace historia.', subtitle: 'Tu generosidad sostiene el ministerio, transforma vidas y lleva el Evangelio más lejos.' },
  },
  newHere: {
    pt: { eyebrow: 'Sou novo aqui', title: 'Bem-vindo\nem casa.', subtitle: 'Sabemos que dar o primeiro passo pode ser difícil. Aqui você é esperado com café, abraço e zero pressão.' },
    en: { eyebrow: "I'm new here", title: 'Welcome\nhome.', subtitle: 'We know taking the first step can be hard. Here you are expected with coffee, a hug, and zero pressure.' },
    es: { eyebrow: 'Soy nuevo aquí', title: 'Bienvenido\na casa.', subtitle: 'Sabemos que dar el primer paso puede ser difícil. Aquí te esperamos con café, abrazo y cero presión.' },
  },
  prayer: {
    pt: { eyebrow: 'Pedidos de oração', title: 'Oramos\npor você.', subtitle: 'Compartilhe seu pedido. Nossa equipe de intercessão orará em sigilo e com fé.' },
    en: { eyebrow: 'Prayer requests', title: 'We pray\nfor you.', subtitle: 'Share your request. Our intercession team will pray in confidence and with faith.' },
    es: { eyebrow: 'Peticiones de oración', title: 'Oramos\npor ti.', subtitle: 'Comparte tu petición. Nuestro equipo de intercesión orará en confianza y con fe.' },
  },
  contact: {
    pt: { eyebrow: 'Contato', title: 'Fale com\na gente.', subtitle: 'Dúvidas, parcerias, batismo, casamento, visita pastoral. Estamos aqui.' },
    en: { eyebrow: 'Contact', title: 'Get in\ntouch.', subtitle: 'Questions, partnerships, baptism, weddings, pastoral visit. We are here.' },
    es: { eyebrow: 'Contacto', title: 'Habla con\nnosotros.', subtitle: 'Dudas, alianzas, bautismo, bodas, visita pastoral. Estamos aquí.' },
  },
  leadership: {
    pt: { eyebrow: 'Liderança', title: 'Pastores\ndo coração.', subtitle: 'Conheça quem caminha à frente da Freedom Church servindo, ensinando e amando esta família.' },
    en: { eyebrow: 'Leadership', title: 'Pastors of\nthe heart.', subtitle: 'Meet those who walk ahead of Freedom Church serving, teaching, and loving this family.' },
    es: { eyebrow: 'Liderazgo', title: 'Pastores\ndel corazón.', subtitle: 'Conoce a quienes caminan al frente de Freedom Church sirviendo, enseñando y amando a esta familia.' },
  },
  live: {
    pt: { eyebrow: 'Ao vivo', title: 'Conecte-se\nde onde estiver.', subtitle: 'Acompanhe nossos cultos ao vivo todo domingo às 10h30. Quando não estamos no ar, assista o último culto abaixo.' },
    en: { eyebrow: 'Live', title: 'Connect\nfrom anywhere.', subtitle: 'Join our live services every Sunday at 10:30 AM. When we are off air, watch the latest service below.' },
    es: { eyebrow: 'En vivo', title: 'Conéctate\ndesde donde estés.', subtitle: 'Acompaña nuestros cultos en vivo cada domingo a las 10:30 AM. Cuando no estamos al aire, mira el último culto abajo.' },
  },
  kids: {
    pt: { eyebrow: 'Freedom Kids', title: 'Fé que cabe\nno coração delas.', subtitle: 'Um espaço seguro, divertido e bíblico onde nossas crianças aprendem que Jesus é amigo de verdade.' },
    en: { eyebrow: 'Freedom Kids', title: 'Faith that fits\nin their hearts.', subtitle: 'A safe, fun, and biblical space where our kids learn that Jesus is a real friend.' },
    es: { eyebrow: 'Freedom Kids', title: 'Fe que cabe\nen sus corazones.', subtitle: 'Un espacio seguro, divertido y bíblico donde nuestros niños aprenden que Jesús es un amigo de verdad.' },
  },
  youth: {
    pt: { eyebrow: 'Freedom Youth', title: 'Geração que\nnão se vende.', subtitle: 'Para jovens que querem viver uma fé real, com amigos reais, no mundo real. Sextas à noite.' },
    en: { eyebrow: 'Freedom Youth', title: 'A generation\nthat does not sell out.', subtitle: 'For young people who want to live a real faith, with real friends, in the real world. Friday nights.' },
    es: { eyebrow: 'Freedom Youth', title: 'Una generación\nque no se vende.', subtitle: 'Para jóvenes que quieren vivir una fe real, con amigos reales, en el mundo real. Viernes por la noche.' },
  },
  gallery: {
    pt: { eyebrow: 'Galeria', title: 'Momentos\nque nos definem.', subtitle: 'Um pedacinho do que vivemos juntos: cultos, retiros, batismos, encontros e muito mais.' },
    en: { eyebrow: 'Gallery', title: 'Moments\nthat define us.', subtitle: 'A glimpse of what we live together: services, retreats, baptisms, gatherings and much more.' },
    es: { eyebrow: 'Galería', title: 'Momentos\nque nos definen.', subtitle: 'Un vistazo de lo que vivimos juntos: cultos, retiros, bautismos, encuentros y mucho más.' },
  },
  resources: {
    pt: { eyebrow: 'Recursos', title: 'Para sua\ncaminhada.', subtitle: 'Estudos, devocionais, wallpapers e ferramentas para alimentar sua fé durante a semana.' },
    en: { eyebrow: 'Resources', title: 'For your\njourney.', subtitle: 'Studies, devotionals, wallpapers and tools to nourish your faith during the week.' },
    es: { eyebrow: 'Recursos', title: 'Para tu\ncamino.', subtitle: 'Estudios, devocionales, fondos de pantalla y herramientas para alimentar tu fe durante la semana.' },
  },
  pastoralServices: {
    pt: { eyebrow: 'Serviços pastorais', title: 'Estamos\ncom você.', subtitle: 'Batismo, casamento, apresentação de filhos, aconselhamento, visita pastoral. Solicite com a gente.' },
    en: { eyebrow: 'Pastoral services', title: 'We are\nwith you.', subtitle: 'Baptism, weddings, child dedication, counseling, pastoral visit. Request with us.' },
    es: { eyebrow: 'Servicios pastorales', title: 'Estamos\ncontigo.', subtitle: 'Bautismo, boda, presentación de hijos, consejería, visita pastoral. Solicítalo con nosotros.' },
  },
  newsletter: {
    pt: { eyebrow: 'Newsletter', title: 'Toda semana\nna sua caixa.', subtitle: 'Um email curto e bem feito: próximos cultos, devocional, anúncios e a pregação da semana.' },
    en: { eyebrow: 'Newsletter', title: 'Every week\nin your inbox.', subtitle: 'A short, well-crafted email: upcoming services, devotional, announcements, and the sermon of the week.' },
    es: { eyebrow: 'Newsletter', title: 'Cada semana\nen tu bandeja.', subtitle: 'Un correo corto y bien hecho: próximos cultos, devocional, anuncios y la prédica de la semana.' },
  },
  privacy: {
    pt: { eyebrow: 'Privacidade', title: 'Sua confiança\nimporta.', subtitle: 'Como tratamos seus dados quando você usa este site, faz uma doação ou se inscreve em algo.' },
    en: { eyebrow: 'Privacy', title: 'Your trust\nmatters.', subtitle: 'How we handle your data when you use this site, make a donation, or sign up for something.' },
    es: { eyebrow: 'Privacidad', title: 'Tu confianza\nimporta.', subtitle: 'Cómo tratamos tus datos cuando usas este sitio, haces una donación o te registras en algo.' },
  },
  terms: {
    pt: { eyebrow: 'Termos', title: 'O combinado\nentre nós.', subtitle: 'As regras simples de uso deste site e dos serviços oferecidos online pela Freedom Church.' },
    en: { eyebrow: 'Terms', title: 'The agreement\nbetween us.', subtitle: 'The simple rules of using this site and the services offered online by Freedom Church.' },
    es: { eyebrow: 'Términos', title: 'El acuerdo\nentre nosotros.', subtitle: 'Las reglas simples de uso de este sitio y los servicios ofrecidos online por Freedom Church.' },
  },
};

export function getPageContent(key: string, lang: Lang): PageContent {
  return pages[key]?.[lang] ?? pages[key]?.pt ?? { eyebrow: '', title: '', subtitle: '' };
}
