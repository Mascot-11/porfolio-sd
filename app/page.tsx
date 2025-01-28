"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

import Image from "next/image";
import Head from "next/head";
import { JsonLd } from "react-schemaorg";
import type { Person } from "schema-dts";
import {
  Book,
  Code2,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Menu,
  X,
  Github,
  Instagram,
  PiIcon,
  TestTube,
  Database,
  Coffee,
  Eye,
  Figma,
  PenTool,
  Brain,
  Puzzle,
  Users,
  Clock,
  MessageSquare,
} from "lucide-react";
import { ContactForm } from "./components/ContactForm";
import { Modal } from "./components/Modal";
import { SpotlightCursor } from "./components/SpotlightCursor";
import "./globals.css";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id: string;
}

const Section = ({ children, className = "", delay = 0, id }: SectionProps) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, delay }}
      className={`py-16 ${className}`}
    >
      {children}
    </motion.section>
  );
};

function checkCanonicalLink() {
  if (typeof document !== "undefined") {
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      console.warn("Canonical link tag not found");
    }
  }
}

const quotes = [
  "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. – Albert Schweitzer",
  "Opportunities don't happen, you create them. – Chris Grosser",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "It does not matter how slowly you go as long as you do not stop. – Confucius",
  "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. – Steve Jobs",
  "Don't be afraid to give up the good to go for the great. – John D. Rockefeller",
  "Success is not in what you have, but who you are. – Bo Bennett",
  "The way to get started is to quit talking and begin doing. – Walt Disney",
  "Do one thing every day that scares you. – Eleanor Roosevelt",
  "Hard work beats talent when talent doesn't work hard. – Tim Notke",
  "The best way to predict the future is to create it. – Abraham Lincoln",
  "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau",
  "The only place where success comes before work is in the dictionary. – Vidal Sassoon",
  "I find that the harder I work, the more luck I seem to have. – Thomas Jefferson",
  "The future depends on what we do in the present. – Mahatma Gandhi",
  "In the middle of difficulty lies opportunity. – Albert Einstein",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "The best revenge is massive success. – Frank Sinatra",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Success is not how high you have climbed, but how you make a positive difference to the world. – Roy T. Bennett",
  "Don't be afraid to give up the good to go for the great. – John D. Rockefeller",
  "Everything you've ever wanted is on the other side of fear. – George Addair",
  "Great things are not done by impulse, but by a series of small things brought together. – Vincent Van Gogh",
  "The harder you work for something, the greater you'll feel when you achieve it. – Anonymous",
  "Strive not to be a success, but rather to be of value. – Albert Einstein",
  "Success is a journey, not a destination. – Arthur Ashe",
  "Success is walking from failure to failure with no loss of enthusiasm. – Winston Churchill",
  "The only limit to our realization of tomorrow is our doubts of today. – Franklin D. Roosevelt",
  "It's not whether you get knocked down, it's whether you get up. – Vince Lombardi",
  "If you are not willing to risk the usual, you will have to settle for the ordinary. – Jim Rohn",
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState("");
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll("section[id]");
      const headerHeight = headerRef.current?.offsetHeight || 0;

      sections.forEach((section) => {
        const sectionTop =
          (section as HTMLElement).offsetTop - headerHeight - 1;
        const sectionBottom =
          sectionTop + (section as HTMLElement).offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveTab(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    checkCanonicalLink();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href")!);
        target?.scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    // Set a random quote
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTab(sectionId);
      setIsMenuOpen(false);
    }
  };

  const skills = {
    technical: [
      { name: "Python", icon: PiIcon },
      { name: "QA Automation", icon: TestTube },
      { name: "SQL", icon: Database },
      { name: "Java", icon: Coffee },
      { name: "Laravel", icon: Code2 },
      { name: "Javascript", icon: Code2 },
      { name: "Manual Testing", icon: Eye },
    ],
    design: [
      { name: "Figma", icon: Figma },
      { name: "Adobe Illustrator", icon: PenTool },
    ],
    soft: [
      { name: "Analytical Thinking", icon: Brain },
      { name: "Problem Solving", icon: Puzzle },
      { name: "Team Collaboration", icon: Users },
      { name: "Time Management", icon: Clock },
      { name: "Communication", icon: MessageSquare },
      { name: "Attention to Detail", icon: Eye },
    ],
  };

  const certifications = [
    {
      name: "AWS Academy Cloud Foundations",
      image:
        "https://images.credly.com/size/340x340/images/73e4a58b-a8ef-41a3-a7db-9183dd269882/image.png",
      alt: "AWS Academy Cloud Foundations Certificate",
      fullImage:
        "/images/AWS_Academy_Graduate___AWS_Academy_Cloud_Foundations_Badge20250126-26-u6kyrl_page-0001.jpg",
    },
    {
      name: "AWS Academy Machine Learning Foundations",
      image:
        "https://images.credly.com/size/340x340/images/254b883a-44a3-4cec-b6f2-946a80522b39/image.png",
      alt: "/images/AWS Academy Machine Learning Foundations Certificate",
      fullImage:
        "/images/AWS_Academy_Graduate___AWS_Academy_Machine_Learning_Foundations_Badge20250126-26-ddihn6_page-0001.jpg",
    },
    {
      name: "AWS Academy Machine Learning for Natural Language Processing",
      image:
        "https://images.credly.com/size/340x340/images/199ec218-422f-4663-bddd-bcea8f2041f6/image.png",
      alt: "AWS Academy Machine Learning for NLP Certificate",
      fullImage:
        "/images/AWS_Academy_Graduate___AWS_Academy_Machine_Learning_for_Natural_Language_Processing_Badge20250126-27-6qojhq_page-0001.jpg",
    },
    {
      name: "AWS Academy Data Engineering",
      image:
        "https://images.credly.com/size/340x340/images/4f514a93-8f7a-424c-aeca-2e8f79612bc5/image.png",
      alt: "AWS Academy Data Engineering Certificate",
      fullImage:
        "/images/AWS_Academy_Graduate___AWS_Academy_Data_Engineering_Badge20250126-27-jeabsk_page-0001.jpg",
    },
  ];

  const navItems = [
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certifications" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <Head>
        <link rel="canonical" href="https://www.shreeyushdhungana.com.np" />
      </Head>
      <JsonLd<Person>
        item={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Shreeyush Dhungana",
          jobTitle: "QA Professional and Computing Student",
          url: "https://www.shreeyushdhungana.com.np",
          sameAs: [
            "https://www.linkedin.com/in/shreeyushdhungana",
            "https://github.com/shreeyushdhungana",
          ],
        }}
      />
      <header
        ref={headerRef}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100"
      >
        <motion.div className="h-1 bg-black origin-left" style={{ scaleX }} />
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold"
            >
              Shreeyush Dhungana
            </motion.h1>

            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeTab === item.id ? "page" : undefined}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-black text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <motion.button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      <main
        id="main-content"
        className="pt-24 container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <Section id="about" className="text-center space-y-8">
          <motion.div
            className="space-y-4 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              BSc Honours in <span className="text-gray-700">Computing</span>
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl text-gray-600 leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Passionate QA professional and computing student with a strong
              focus on software quality assurance. Currently deepening my
              knowledge in test automation and software testing processes. With
              AWS certifications and strong problem-solving skills, I
              continuously improve my technical abilities to contribute to the
              quality of software products.
            </motion.p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="/ShreeyushDhunganaCV.pdf"
              download
              className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm sm:text-base shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5" />
              Download CV
            </motion.a>
            <div className="flex items-center gap-4 mt-4">
              <motion.a
                href="https://github.com/Mascot-11"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/_.mascot/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </Section>

        <Section id="education" delay={0.2}>
          <div className="flex items-center gap-3 mb-8">
            <Book className="w-8 h-8 text-gray-700" />
            <h3 className="text-2xl sm:text-3xl font-bold">
              Education Journey
            </h3>
          </div>
          <motion.div
            className="space-y-12 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            {[
              {
                school: "Islington College",
                degree: "BSc Honours in Computing",
                period: "2022-Present",
                description:
                  "Focusing on software development, testing, and quality assurance. Maintaining excellent academic performance.",
                current: true,
              },
              {
                school: "Trinity International SS/College",
                degree: "High School",
                period: "2020-2022",
                description:
                  "Completed high school with focus on science and mathematics.",
                current: false,
              },
              {
                school: "Meridian International",
                degree: "School",
                period: "2009-2019",
                description:
                  "Built strong foundation in academics and participated in various extracurricular activities.",
                current: false,
              },
            ].map((edu) => (
              <motion.div
                key={edu.school}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-gray-300"
              >
                <div
                  className={`absolute w-4 h-4 ${
                    edu.current ? "bg-black" : "bg-gray-400"
                  } rounded-full -left-[9px] top-1`}
                ></div>
                <h4 className="font-bold text-xl">{edu.school}</h4>
                <p className="text-gray-700 font-medium">{edu.degree}</p>
                <p className="text-sm text-gray-600 mt-1">{edu.period}</p>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="skills" delay={0.3}>
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-8 h-8 text-gray-700" />
            <h3 className="text-2xl sm:text-3xl font-bold">
              Skills & Expertise
            </h3>
          </div>
          <motion.div
            className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            <div className="space-y-6">
              <h4 className="font-bold text-xl">Technical Proficiency</h4>
              <div className="grid grid-cols-2 gap-4">
                {skills.technical.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <skill.icon className="w-6 h-6 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="font-bold text-xl">Design Tools</h4>
              <div className="grid grid-cols-2 gap-4">
                {skills.design.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <skill.icon className="w-6 h-6 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
              <h4 className="font-bold text-xl mt-8">Soft Skills</h4>
              <div className="grid grid-cols-2 gap-4">
                {skills.soft.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill-card flex items-center gap-2 p-2 bg-gray-100 rounded-lg shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <skill.icon className="w-6 h-6 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Section>

        <Section id="experience" delay={0.4}>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-gray-700" />
            <h3 className="text-2xl sm:text-3xl font-bold">Work Experience</h3>
          </div>
          <motion.div
            className="space-y-12 max-w-3xl mx-auto"
            variants={containerVariants}
          >
            {[
              {
                role: "Quality Assurance Trainee",
                company: "ING Tech",
                period: "2024 August - Present",
                responsibilities: [
                  "Developing and maintaining test cases",
                  "Performing comprehensive manual testing",
                  "Collaborating with development teams for quality improvements",
                  "Contributing to test strategy and documentation",
                ],
              },
              {
                role: "Quality Assurance Intern",
                company: "ING Tech",
                period: "2024 June - 2024 August",
                responsibilities: [
                  "Learned and applied QA methodologies",
                  "Assisted in test case development",
                  "Participated in agile ceremonies",
                  "Gained hands-on experience with testing tools",
                ],
              },
            ].map((exp) => (
              <motion.div
                key={exp.period}
                variants={itemVariants}
                className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 card-3d"
              >
                <h4 className="font-bold text-xl">{exp.role}</h4>
                <p className="text-gray-700 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-600 mt-1">{exp.period}</p>
                <ul className="mt-4 space-y-2">
                  {exp.responsibilities.map((resp, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <ChevronRight className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="certifications" delay={0.5}>
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-gray-700" />
            <h3 className="text-2xl sm:text-3xl font-bold">Certifications</h3>
          </div>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            variants={containerVariants}
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="certification-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 bg-white card-hover"
                onClick={() => setSelectedCert(cert.fullImage)}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={cert.alt}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="text-center">
                    <h4 className="font-bold text-base">{cert.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Amazon Web Services
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="contact" delay={0.6} className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold">Get in Touch</h3>
            <p className="text-gray-600 mt-2">
              Have a question or want to work together?
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Phone className="w-5 h-5 text-gray-700" />
                <a
                  href="tel:+977-9813761895"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  +977-9813761895
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Mail className="w-5 h-5 text-gray-700" />
                <a
                  href="mailto:Shreeyushdhungana@gmail.com"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Shreeyush23@gmail.com
                </a>
              </motion.div>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <MapPin className="w-5 h-5 text-gray-700" />
                <span className="text-gray-600">Kathmandu, Nepal 44600</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              ></motion.div>
            </div>
            <ContactForm />
          </div>
        </Section>

        <Section id="quote" delay={0.6} className="text-center space-y-8">
          <motion.div
            className="quote-card mt-12 p-6 bg-gray-100 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-lg italic text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {randomQuote}
            </motion.p>
          </motion.div>
        </Section>
      </main>

      <footer className="mt-16 bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} Shreeyush Dhungana. All rights
            reserved.
          </p>
        </div>
      </footer>

      <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
        {selectedCert && (
          <div className="relative">
            <Image
              src={selectedCert || "/placeholder.svg"}
              alt="Certificate"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>
        )}
      </Modal>
      <SpotlightCursor />
    </div>
  );
}
