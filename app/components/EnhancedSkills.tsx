"use client";

import { motion } from "framer-motion";
import { Code2, PiIcon, TestTube, Database, Coffee, Eye, Figma, PenTool, Brain, Puzzle, Users, Clock, MessageSquare } from "lucide-react";

export function EnhancedSkills() {
  const skills = {
    technical: [
      { name: "Python", icon: PiIcon, level: "Advanced" },
      { name: "QA Automation", icon: TestTube, level: "Expert" },
      { name: "SQL", icon: Database, level: "Advanced" },
      { name: "Java", icon: Coffee, level: "Intermediate" },
      { name: "Laravel", icon: Code2, level: "Intermediate" },
      { name: "Javascript", icon: Code2, level: "Advanced" },
      { name: "Manual Testing", icon: Eye, level: "Expert" },
    ],
    design: [
      { name: "Figma", icon: Figma, level: "Advanced" },
      { name: "Adobe Illustrator", icon: PenTool, level: "Intermediate" },
    ],
    soft: [
      { name: "Analytical Thinking", icon: Brain, level: "Expert" },
      { name: "Problem Solving", icon: Puzzle, level: "Expert" },
      { name: "Team Collaboration", icon: Users, level: "Advanced" },
      { name: "Time Management", icon: Clock, level: "Advanced" },
      { name: "Communication", icon: MessageSquare, level: "Expert" },
      { name: "Attention to Detail", icon: Eye, level: "Expert" },
    ],
  };

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
          <skill.icon className="w-6 h-6 text-gray-700" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">{skill.name}</h4>
          <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded-md">
            {skill.level}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 mb-6">
            <Code2 className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Skills & Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What I Bring to the Table
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive skill set spanning technical proficiency, creative design, and essential soft skills
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Technical Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              Technical Proficiency
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.technical.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Design Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <Figma className="w-5 h-5 text-white" />
              </div>
              Design Tools
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.design.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              Soft Skills
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.soft.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}