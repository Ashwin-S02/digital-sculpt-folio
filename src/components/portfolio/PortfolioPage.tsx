import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { Button } from "@/components/ui/button";

const portrait =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ornaments = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    alt: "Silver 3D moon",
    className: "top-[4%] left-[1%] w-[120px] sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]",
    delay: 0.1,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    alt: "Abstract silver 3D form",
    className:
      "bottom-[8%] left-[3%] w-[100px] sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]",
    delay: 0.25,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    alt: "Chrome 3D toy block",
    className:
      "top-[4%] right-[1%] w-[120px] sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]",
    delay: 0.15,
    x: 80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    alt: "Abstract chrome 3D group",
    className:
      "bottom-[8%] right-[3%] w-[130px] sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]",
    delay: 0.3,
    x: 80,
  },
];

const services = [
  ["3D Modeling", "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."],
  ["Rendering", "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."],
  ["Motion Design", "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."],
  ["Branding", "Crafting cohesive visual identities — from logos to full brand systems — that communicate a clear and memorable presence."],
  ["Web Design", "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."],
] as const;

const projects = [
  {
    name: "Nextlevel Studio",
    category: "Client",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
    ],
  },
  {
    name: "Aura Brand Identity",
    category: "Personal",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
    ],
  },
  {
    name: "Solaris Digital",
    category: "Client",
    images: [
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
    ],
  },
] as const;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
};

function FadeIn({ children, className, delay = 0, duration = 0.7, x = 0, y = 30 }: FadeInProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Magnet({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const [active, setActive] = useState(false);

  function move(event: MouseEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const inside = Math.abs(dx) <= bounds.width / 2 + 150 && Math.abs(dy) <= bounds.height / 2 + 150;
    setActive(inside);
    setTransform(inside ? `translate3d(${dx / 3}px, ${dy / 3}px, 0)` : "translate3d(0, 0, 0)");
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={() => {
        setActive(false);
        setTransform("translate3d(0, 0, 0)");
      }}
      style={{ transform, transition: active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

function ContactButton() {
  return (
    <Button asChild variant="portfolio" size="portfolio">
      <a href="mailto:">Contact me</a>
    </Button>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen min-h-[640px] flex-col overflow-x-clip bg-background">
      <FadeIn y={-20} className="relative z-30">
        <nav aria-label="Primary" className="flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-foreground md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
          <a className="transition-opacity duration-200 hover:opacity-70" href="#about">About</a>
          <a className="transition-opacity duration-200 hover:opacity-70" href="#services">Price</a>
          <a className="transition-opacity duration-200 hover:opacity-70" href="#projects">Projects</a>
          <a className="transition-opacity duration-200 hover:opacity-70" href="mailto:">Contact</a>
        </nav>
      </FadeIn>

      <div className="mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap text-center text-[14vw] leading-none font-black tracking-tight uppercase sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i&apos;m jack
          </h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="pointer-events-none absolute top-1/2 left-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <Magnet>
          <img className="block h-auto w-full" src={portrait} alt="Jack, 3D creator" fetchPriority="high" />
        </Magnet>
      </FadeIn>

      <div className="relative z-20 mt-auto flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] leading-snug font-light tracking-wide uppercase text-foreground sm:max-w-[220px] md:max-w-[260px]">
            a 3d creator driven by crafting striking and unforgettable projects
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}><ContactButton /></FadeIn>
      </div>
    </section>
  );
}

function MarqueeRow({ images, direction, offset }: { images: readonly string[]; direction: 1 | -1; offset: number }) {
  const repeated = [...images, ...images, ...images];
  return (
    <div
      className="flex w-max gap-3"
      style={{ transform: `translate3d(${direction * (offset - 200)}px, 0, 0)`, willChange: "transform" }}
    >
      {repeated.map((src, index) => (
        <img key={`${src}-${index}`} className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" src={src} alt="3D motion work preview" loading="lazy" />
      ))}
    </div>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sectionTop = ref.current?.offsetTop ?? 0;
        setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <section ref={ref} aria-label="Selected motion work" className="overflow-hidden bg-background pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <MarqueeRow images={marqueeImages.slice(0, 11)} direction={1} offset={offset} />
        <MarqueeRow images={marqueeImages.slice(11)} direction={-1} offset={offset} />
      </div>
    </section>
  );
}

function AnimatedCharacter({ children, progress, start, end }: { children: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="invisible">{children}</span>
      <motion.span aria-hidden="true" className="absolute inset-0" style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  return (
    <p ref={ref} className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] leading-relaxed font-medium text-foreground">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((character, index) => {
          const start = index / text.length;
          return <AnimatedCharacter key={`${character}-${index}`} progress={scrollYProgress} start={start} end={Math.min(1, start + 0.08)}>{character === " " ? "\u00A0" : character}</AnimatedCharacter>;
        })}
      </span>
    </p>
  );
}

function AboutSection() {
  const copy = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";
  return (
    <section id="about" className="relative flex min-h-screen scroll-mt-8 items-center justify-center overflow-hidden bg-background px-5 py-20 sm:px-8 md:px-10">
      {ornaments.map((ornament) => (
        <FadeIn key={ornament.src} delay={ornament.delay} x={ornament.x} y={0} duration={0.9} className={`pointer-events-none absolute ${ornament.className}`}>
          <img className="h-auto w-full object-contain" src={ornament.src} alt={ornament.alt} loading="lazy" />
        </FadeIn>
      ))}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}><h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] leading-none font-black tracking-tight uppercase">About me</h2></FadeIn>
        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText text={copy} />
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-8 rounded-t-[40px] bg-paper px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn><h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] leading-none font-black tracking-tight uppercase sm:mb-20 md:mb-28">Services</h2></FadeIn>
      <div className="mx-auto max-w-5xl border-t border-ink-soft">
        {services.map(([name, description], index) => (
          <FadeIn key={name} delay={index * 0.1} className="border-b border-ink-soft">
            <article className="grid grid-cols-[minmax(68px,0.35fr)_1fr] gap-5 py-8 sm:gap-10 sm:py-10 md:py-12">
              <p className="text-[clamp(3rem,10vw,140px)] leading-none font-black">{String(index + 1).padStart(2, "0")}</p>
              <div className="flex flex-col justify-center gap-3 sm:gap-4">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] leading-tight font-medium uppercase">{name}</h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] leading-relaxed font-light opacity-60">{description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, progress }: { project: (typeof projects)[number]; index: number; progress: MotionValue<number> }) {
  const total = projects.length;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const rangeStart = index / total;
  const scale = useTransform(progress, [rangeStart, Math.min(1, rangeStart + 0.35)], [1, targetScale]);
  return (
    <div className="h-[85vh] min-h-[680px]">
      <motion.article
        className="sticky top-24 rounded-[40px] border-2 border-foreground bg-background p-4 sm:rounded-[50px] sm:p-6 md:top-32 md:rounded-[60px] md:p-8"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <div className="mb-5 grid grid-cols-[auto_1fr] items-end gap-x-5 gap-y-4 sm:mb-7 sm:grid-cols-[auto_1fr_auto] md:gap-x-8">
          <p className="row-span-2 text-[clamp(3rem,10vw,140px)] leading-[0.75] font-black">{String(index + 1).padStart(2, "0")}</p>
          <p className="text-xs font-light tracking-widest uppercase text-muted-foreground sm:text-sm">{project.category}</p>
          <Button asChild variant="portfolioOutline" size="portfolioOutline" className="row-span-2 hidden self-center sm:inline-flex">
            <a href={project.images[2]} target="_blank" rel="noreferrer">Live project <ArrowUpRight aria-hidden="true" /></a>
          </Button>
          <h3 className="text-[clamp(1.1rem,2.5vw,2.5rem)] leading-tight font-medium uppercase">{project.name}</h3>
        </div>
        <div className="grid grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <img className="h-[clamp(130px,16vw,230px)] w-full rounded-[24px] object-cover sm:rounded-[40px] md:rounded-[60px]" src={project.images[0]} alt={`${project.name} detail one`} loading="lazy" />
            <img className="h-[clamp(160px,22vw,340px)] w-full rounded-[24px] object-cover sm:rounded-[40px] md:rounded-[60px]" src={project.images[1]} alt={`${project.name} detail two`} loading="lazy" />
          </div>
          <img className="h-full min-h-0 w-full rounded-[24px] object-cover sm:rounded-[40px] md:rounded-[60px]" src={project.images[2]} alt={`${project.name} featured work`} loading="lazy" />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="projects" ref={ref} className="relative z-10 -mt-10 scroll-mt-8 rounded-t-[40px] bg-background px-4 pt-20 pb-28 sm:-mt-12 sm:rounded-t-[50px] sm:px-6 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn><h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] leading-none font-black tracking-tight uppercase md:mb-24">Project</h2></FadeIn>
      <div className="mx-auto max-w-[1500px]">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} progress={scrollYProgress} />)}
      </div>
    </section>
  );
}

export function PortfolioPage() {
  return (
    <main className="overflow-x-clip bg-background">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </main>
  );
}