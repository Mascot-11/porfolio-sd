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
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";
import { ContactForm } from "./components/ContactForm";
import { Modal } from "./components/Modal";
import { EnhancedHero } from "./components/EnhancedHero";
import { EnhancedSkills } from "./components/EnhancedSkills";
import { AnalyticsDashboard } from "./components/AnalyticsDashboard";
import { useAnalytics } from "./hooks/useAnalytics";
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
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
      className={`py-20 ${className}`}
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
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("about");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [randomQuote, setRandomQuote] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const { analytics, trackPageView } = useAnalytics();

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
      trackPageView(sectionId);
    }
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
      alt: "AWS Academy Machine Learning Foundations Certificate",
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
    { id: "contact", label: "Contact" },
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
    <div className="min-h-screen bg-white relative">
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
      
      {/* Clean Header */}
      <header
        ref={headerRef}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200"
      >
        <motion.div 
          className="h-1 bg-gray-900 origin-left" 
          style={{ scaleX }} 
        />
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl font-bold text-gray-900"
            >
              Shreeyush Dhungana
            </motion.h1>

            <div className="hidden md:flex space-x-1 items-center">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={activeTab === item.id ? "page" : undefined}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === item.id
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
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
                className="md:hidden mt-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
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
        className="pt-24"
      >
        {/* Hero Section */}
        <EnhancedHero />

        {/* About Section */}
        <Section id="about" className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
                <Sparkles className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">About Me</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Passionate About Quality
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  I'm a dedicated QA professional and computing student with a strong passion for 
                  ensuring software quality and reliability. My journey in technology is driven by 
                  curiosity, continuous learning, and a commitment to excellence.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <TestTube className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">QA Excellence</h3>
                    <p className="text-gray-600 text-sm">
                      Specialized in manual and automated testing with a keen eye for detail
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">AWS Certified</h3>
                    <p className="text-gray-600 text-sm">
                      Multiple AWS certifications in cloud foundations and machine learning
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200"
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Continuous Growth</h3>
                    <p className="text-gray-600 text-sm">
                      Always learning and adapting to new technologies and methodologies
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        {/* Education Section */}
        <Section id="education" className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 mb-6">
                <Book className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Education</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Academic Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Building a strong foundation through continuous learning and academic excellence
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  school: "Islington College",
                  degree: "BSc Honours in Computing",
                  period: "2022-2025",
                  description:
                    "Focusing on software development, testing, and quality assurance. Maintaining excellent academic performance with hands-on experience in modern technologies.",
                  current: true,
                },
                {
                  school: "Trinity International SS/College",
                  degree: "High School",
                  period: "2020-2022",
                  description:
                    "Completed high school with focus on science and mathematics, laying the groundwork for technical education.",
                  current: false,
                },
                {
                  school: "Meridian International",
                  degree: "School",
                  period: "2009-2019",
                  description:
                    "Built strong foundation in academics and participated in various extracurricular activities, developing leadership and teamwork skills.",
                  current: false,
                },
              ].map((edu, index) => (
                <motion.div
                  key={edu.school}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="relative mb-12 last:mb-0"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
                        <Book className="w-8 h-8 text-white" />
                      </div>
                      {index < 2 && (
                        <div className="w-0.5 h-16 bg-gray-200 mx-auto mt-4"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{edu.school}</h3>
                        {edu.current && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-semibold text-gray-700 mb-2">{edu.degree}</p>
                      <p className="text-sm text-gray-500 mb-4">{edu.period}</p>
                      <p className="text-gray-600 leading-relaxed">{edu.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Skills Section */}
        <EnhancedSkills />

        {/* Experience Section */}
        <Section id="experience" className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 mb-6">
                <Briefcase className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Experience</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Professional Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Growing expertise through hands-on experience in quality assurance and software testing
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto space-y-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  role: "Quality Assurance Trainee",
                  company: "ING Tech",
                  period: "2024 August - Present",
                  responsibilities: [
                    "Developing and maintaining comprehensive test cases for web and mobile applications",
                    "Performing thorough manual testing across multiple platforms and browsers",
                    "Collaborating with development teams to identify and resolve quality issues",
                    "Contributing to test strategy development and documentation improvements",
                    "Participating in agile ceremonies and sprint planning sessions",
                  ],
                  current: true,
                },
                {
                  role: "Quality Assurance Intern",
                  company: "ING Tech",
                  period: "2024 June - 2024 August",
                  responsibilities: [
                    "Learned and applied industry-standard QA methodologies and best practices",
                    "Assisted in developing detailed test cases and test scenarios",
                    "Participated in daily standups and agile development processes",
                    "Gained hands-on experience with testing tools and bug tracking systems",
                    "Contributed to team knowledge sharing and documentation efforts",
                  ],
                  current: false,
                },
              ].map((exp, index) => (
                <motion.div
                  key={exp.period}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-lg font-semibold text-gray-700 mb-1">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </div>
                    <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-600 leading-relaxed">{resp}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Certifications Section */}
        <Section id="certifications" className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
                <Award className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Certifications</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Professional Certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Validated expertise through industry-recognized AWS certifications
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 cursor-pointer"
                  onClick={() => setSelectedCert(cert.fullImage)}
                >
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                      <Image
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.alt}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">Amazon Web Services</p>
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        <Award className="w-3 h-3" />
                        Certified
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" className="bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-200 mb-6">
                <Mail className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Get in Touch</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Let's Connect
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have a question or want to collaborate? I'd love to hear from you!
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <a
                          href="tel:+977-9813761895"
                          className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                        >
                          +977-9813761895
                        </a>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a
                          href="mailto:Shreeyush23@gmail.com"
                          className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                        >
                          Shreeyush23@gmail.com
                        </a>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <span className="text-gray-900 font-medium">Kathmandu, Nepal 44600</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Quote Section */}
        <Section id="quote" className="bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <blockquote className="text-xl sm:text-2xl italic text-gray-700 leading-relaxed">
                  "{randomQuote}"
                </blockquote>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">Shreeyush Dhungana</h3>
              <p className="text-gray-400 mb-6">QA Professional & Computing Student</p>
              <div className="flex items-center justify-center gap-6">
                <motion.a
                  href="https://github.com/Mascot-11"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/_.mascot/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} Shreeyush Dhungana. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
        {selectedCert && (
          <div className="relative">
            <Image
              src={selectedCert || "/placeholder.svg"}
              alt="Certificate"
              width={800}
              height={600}
              className="rounded-xl"
            />
          </div>
        )}
      </Modal>

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />
    </div>
  );
}