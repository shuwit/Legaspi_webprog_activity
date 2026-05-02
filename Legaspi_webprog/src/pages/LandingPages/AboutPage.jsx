import Button from '../../components/Button';
import mee from '../../assets/mee.jpg';

const skills = [
  'ReactJS',
  'Mern Stack',
  'Flutter Dart',
  'UI/UX Design',
  'PC Building',
  'PC Optimizing',
];

const socials = [
  {
    name: 'GitHub',
    handle: '@shuwit',
    url: 'https://www.instagram.com/shuw1tzz/',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@shuwitzz',
    url: '#',
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: '@seanmartin Legaspi',
    url: 'https://www.facebook.com/seanmartin.gallamos/',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@shutwits',
    url: 'https://www.tiktok.com/@shuwits',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  }
];

const AboutPage = () => {
  return (
    <div className="relative flex w-full flex-col overflow-hidden bg-zinc-50 pb-20">

      {/* Ambient Background Waves */}
      <div className="pointer-events-none absolute -left-[10%] top-[5%] h-[600px] w-[600px] rounded-full bg-blue-200/30 blur-[120px] animate-pulse" />
      <div className="pointer-events-none absolute -right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-purple-200/30 blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* BIO SECTION */}
      <section className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] backdrop-blur-2xl sm:p-12">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div className="order-2 lg:order-1 relative group">
              <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-white/60 to-white/10 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
              <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/80 bg-white/20 p-2 shadow-xl backdrop-blur-md">
                <div className="overflow-hidden rounded-3xl bg-zinc-100">
                  <img src={mee} alt="Working Setup" className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                About Section
              </p>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
                Just about me and my background as a developer and student.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-600">
                Since I was a child, I have always been interested in technology, specially in PC building stuff and optimizing it, and as I grow older, I start to learn about programming and web development, and I find it really interesting, and I want to learn more about it, and that's why I decided to pursue a degree in IT, and here I am now, learning new things every day and trying to improve myself as a developer.
                <br /><br />

              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/" variant="primary" className="shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all">
                  Download CV
                </Button>
                <Button to="/articles" className="bg-white/50 border-white hover:bg-white hover:shadow-md transition-all">
                  Read My Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="relative z-10 mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
              Technical Arsenal
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">Tools & Technologies</h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              A constantly evolving stack focused on modern web development, data analysis, and network security protocols.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="group flex cursor-default items-center justify-center rounded-2xl border border-white/60 bg-white/40 p-5 text-center text-sm font-bold text-zinc-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/80 hover:text-zinc-900 hover:shadow-lg hover:shadow-zinc-200/50"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT WITH ME SECTION (Replaced Off The Clock) */}
      <section className="relative z-10 mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
            Let's Connect
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900">Find me on the grid</h2>
        </div>

        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-white/80 hover:shadow-xl hover:shadow-zinc-200/50"
            >
              <div className="mb-4 flex items-center justify-center text-zinc-700 transition-transform duration-300 group-hover:scale-110 group-hover:text-zinc-900">
                {social.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-900">{social.name}</h3>
              <p className="mt-1 text-xs font-semibold text-zinc-500 group-hover:text-zinc-700 transition-colors">
                {social.handle}
              </p>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;