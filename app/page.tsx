import EnhancedHero from './components/EnhancedHero';
import EnhancedSkills from './components/EnhancedSkills';
import Section from './components/Section';
import ContactForm from './components/ContactForm';
import AnalyticsDashboard from './components/AnalyticsDashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <EnhancedHero />
      
      <Section id="skills" title="Skills & Expertise">
        <EnhancedSkills />
      </Section>
      
      <Section id="contact" title="Get In Touch">
        <ContactForm />
      </Section>
      
      <AnalyticsDashboard />
    </main>
  );
}