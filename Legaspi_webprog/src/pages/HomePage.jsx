import { useState, useRef } from 'react';
import Button from '../components/Button';

import FloodGuard from '../assets/FloodGuard.jpg';
import fishbook from '../assets/fishbook.jpg';
import car from '../assets/car.jpg';
import Suika from '../assets/Suika.jpg';
import Lakan from '../assets/Lakan.jpg';
import rabbit from '../assets/rabbit.jpg';
import me from '../assets/me.jpg';


const kpis = [
  { number: '0', label: 'Sleep' },
  { number: '0', label: 'Money' },
  { number: '100%', label: 'Cortisol' },
  { number: '100%', label: 'Coffee Fueled' },
];

const features = [
  { 
    title: 'FloodGuardAI', 
    desc: 'UI/UX designer and front-end developer, this project involved creating an intuitive interface for a machine learning model that predicts flood risks in the NCR region, utilizing React and Tailwind CSS for a responsive design.',
    image: FloodGuard
  },
  { 
    title: 'RABBITS', 
    desc: 'front-end developer, this project is like a reddit/4chan',
    image: rabbit
  },
  { 
    title: 'Car Rental Platform', 
    desc: 'fullstack developer, this project I create with MERN stack, learning how to use MongoDB for database management, Express.js for server-side logic, React for building the user interface, and Node.js for handling backend operations. The platform allows users to browse available vehicles, make reservations, and manage their bookings seamlessly.',
    image: car
  },
  { 
    title: 'Suika Game Flower', 
    desc: 'front-end and back-end developer, this game we created with android studio with a framework of libgdx.',
    image: Suika
  },
  { 
    title: 'Lakan eCommerce', 
    desc: 'UI/UX designer and front-end developer, this project me and my team created a e-commerce website for a local gaming peripherals, using only barebone html and css.',
    image: Lakan
  },
  { 
    title: 'Fishbook', 
    desc: 'fullstack developer, this project is a practice for building full-stack applications using flutter dart.',
    image: fishbook
  },
];

const HomePage = () => {
  // Logic for the Mouse Tracking Spotlight
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="flex w-full flex-col">
      
      {/* HERO SECTION: 
        Added relative positioning, overflow hidden, and the mouse movement tracker 
      */}
      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: -1000, y: -1000 })} // Hide spotlight when cursor leaves
        className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8"
      >
        {/* 1. Ambient Background Waves (iOS Aurora effect) */}
        <div className="pointer-events-none absolute -top-[20%] left-[10%] h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[100px] animate-pulse" />
        <div className="pointer-events-none absolute -bottom-[20%] right-[10%] h-[400px] w-[400px] rounded-full bg-purple-200/40 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* 2. The Dynamic Cursor Spotlight */}
        <div 
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.8), transparent 40%)`,
            }}
        />

        {/* 3. The Frosted Glass Content Wrapper */}
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center rounded-3xl border border-white/60 bg-white/30 p-8 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">
              Developer Portfolio
            </p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-zinc-900 sm:text-5xl tracking-tight">
              Sean Martin "SHU" Legaspi.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600">
              Hello! I am an IT student in National University Manila, and here is my portfolio showcasing my creation on software development, website development, and more. 
            </p>
            <div className="mt-8 flex gap-4">
              <Button to="/about" variant="primary" className="shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Read My Story
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-white/60 bg-white/20 p-2 shadow-2xl backdrop-blur-md">
            <div className="overflow-hidden rounded-3xl bg-zinc-200">
              <img src={me} alt="Hero Profile" className="h-[340px] w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* KPI SECTION */}
      <section className="border-b border-zinc-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">By The Numbers</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">Experience at a glance</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="group rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50">
                <p className="text-3xl font-extrabold text-zinc-900">{kpi.number}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-500 group-hover:text-zinc-700 transition-colors">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-zinc-500">Selected Works</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-900">Recent Development Projects</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="group flex flex-col rounded-3xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-zinc-200">
                <div className="overflow-hidden rounded-2xl bg-zinc-100">
                   <img src={feature.image} alt={feature.title} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-2 pb-2 pt-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-zinc-900 tracking-tight">{feature.title}</h3>
                    <p className="mt-3 flex-grow text-sm leading-relaxed text-zinc-500">
                        {feature.desc}
                    </p>
                    <div className="mt-6">
                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-zinc-900 hover:text-zinc-500 transition cursor-pointer">
                            View Details &rarr;
                        </span>
                    </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;