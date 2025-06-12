"use client";

import { motion } from "framer-motion";
import { Code2, PiIcon, TestTube, Database, Coffee, Eye, Figma, PenTool, Brain, Puzzle, Users, Clock, MessageSquare } from "lucide-react";

export function EnhancedSkills() {
  const skills = {
    technical: [
      { name: "Python", icon: PiIcon, level: 85, color: "from-blue-500 to-blue-600" },
      { name: "QA Automation", icon: TestTube, level: 90, color: "from-green-500 to-green-600" },
      { name: "SQL", icon: Database, level: 80, color: "from-purple-500 to-purple-600" },
      { name: "Java", icon: Coffee, level: 75, color: "from-orange-500 to-orange-600" },
      { name: "Laravel", icon: Code2, level: 70, color: "from-red-500 to-red-600" },
      { name: "Javascript", icon: Code2, level: 85, color: "from-yellow-500 to-yellow-600" },
      { name: "Manual Testing", icon: Eye, level: 95, color: "from-indigo-500 to-indigo-600" },
    ],
    design: [
      { name: "Figma", icon: Figma, level: 80, color: "from-pink-500 to-pink-600" },
      { name: "Adobe Illustrator", icon: PenTool, level: 75, color: "from-cyan-500 to-cyan-600" },
    ],
    soft: [
      { name: "Analytical Thinking", icon: Brain, level: 90, color: "from-emerald-500 to-emerald-600" },
      { name: "Problem Solving", icon: Puzzle, level: 95, color: "from-violet-500 to-violet-600" },
      { name: "Team Collaboration", icon: Users, level: 88, color: "from-rose-500 to-rose-600" },
      { name: "Time Management", icon: Clock, level: 85, color: "from-teal-500 to-teal-600" },
      { name: "Communication", icon: MessageSquare, level: 90, color: "from-amber-500 to-amber-600" },
      { name: "Attention to Detail", icon: Eye, level: 95, color: "from-lime-500 to-lime-600" },
    ],
  };

  const SkillCard = ({ skill, index }: { skill: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${skill.color} text-white shadow-lg`}>
            <skill.icon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
              {skill.name}
            </h4>
            <p className="text-sm text-gray-500">{skill.level}% Proficiency</p>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: index * 0.1 }}
            className={`h-2 rounded-full bg-gradient-to-r ${skill.color} shadow-sm`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200/50 mb-6">
            <Code2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Skills & Expertise</span>
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
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
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
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
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
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
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