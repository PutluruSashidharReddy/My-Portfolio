import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Briefcase,
  GitFork,
  Link,
  ChevronDown,
  User,
  GraduationCap,
  Hammer,
  Award,
  Github,
  Linkedin,
  Mail,
  Phone,
  Code,
  Sun,
  Moon,
  Send
} from 'lucide-react';

// Global style for smooth scrolling
const globalStyles = `
  html {
    scroll-behavior: smooth;
  }
`;

const resumeData = {
  name: 'PUTLURU SASHIDHAR REDDY',
  about: "Ambitious and driven Computer Science and Engineering student at Vellore Institute of Technology, Chennai, with a solid foundation in Data Structures and Algorithms. Adept at designing and developing full-stack web applications with a strong focus on user experience and efficient back-end systems. Passionate about leveraging technical expertise to solve complex problems, and eager to contribute to innovative projects through various opportunities. Looking forward to enhancing my skills, gaining hands-on experience, and driving impactful results in a dynamic and collaborative environment.",
  contact: {
    phone: '+91 9392440588',
    email: 'putlurusasidharreddy@gmail.com',
    linkedin: 'https://www.linkedin.com/in/putluru-sashidhar-reddy-5b6110278', 
    github: 'https://github.com/PutluruSashidharReddy',
  },
  education: [
    {
      institution: 'Vellore Institute of Technology',
      degree: 'Bachelor of Technology Computer Science and Engineering',
      score: 'CGPA: 8.56',
      duration: 'September 2022 - June 2026',
      location: 'Chennai, India',
    },
    {
      institution: 'Narayana Junior College',
      degree: 'Stream: Maths, Physics and Chemistry',
      score: 'Score: 97.4%',
      duration: 'June 2020 - May 2022',
      location: 'Patancheru, Telangana',
    },
  ],
  experience: [
    {
      role: 'Externship on MERN Stack Development',
      company: 'SmartInternz',
      duration: 'June 2024 - July 2024',
      location: 'Remote',
      description: 'Gained hands-on experience in the MERN stack development.',
      points: [],
    },
    {
      role: 'Web Development Member',
      company: 'CodeChef Chapter',
      duration: 'September 2024 - May 2025',
      location: 'Chennai, India',
      points: [
        'Contributed to chapter projects by collaborating on front-end and back-end tasks using modern web technologies.',
        'Engaged in team activities, enhancing communication and technical collaboration among peers.',
      ],
    },
  ],
  projects: [
    {
      title: 'Fintrack',
      technologies: 'React JS, Tailwind CSS, Node JS, Express JS, MongoDB, Chart.js',
      duration: 'May 2025 - July 2025',
      description: 'Developed a full-stack expense tracking application with user authentication, income/expense management, and visual analytics using Rechart. Implemented downloadable reports and a responsive dashboard UI to enhance financial planning and user experience.',
      link: 'https://fintrack-application.vercel.app',
      gitRepo: 'https://github.com/PutluruSashidharReddy/FintrackApplication.git',
      icon: <Code />,
      image: 'https://placehold.co/600x400/212a4b/white?text=Fintrack+Screenshot'
    },
    {
      title: 'Community Showcase',
      technologies: 'React JS, Tailwind CSS, MongoDB, Express JS, Node JS',
      duration: 'January 2025',
      description: 'Built a platform where users can add and showcase their images on a community dashboard, with data retrieval efficiency improved by 30% through Cloudinary integration.',
      link: 'https://community-showcase-vijo.vercel.app',
      gitRepo: 'https://github.com/PutluruSashidharReddy/CommunityShowcase.git',
      icon: <Code />,
      image: 'https://placehold.co/600x400/212a4b/white?text=Community+Showcase+Screenshot'
    },
  ],
  skills: {
    languages: ['Java', 'C', 'C++', 'HTML', 'CSS', 'Javascript', 'SQL'],
    technologies: ['React JS', 'MongoDB', 'PostgreSQL', 'Node JS', 'Express JS', 'Tailwind CSS'],
    tools: ['Git', 'Github', 'Docker'],
    softSkills: ['Project management', 'Technical Writing', 'Teamwork'],
  },
  certifications: [
    {
      name: 'Full Stack Developer - MERN Stack by Smartinternz',
      link: 'https://drive.google.com/file/d/11zzTJBP6LC9soyyVHZ5HJBCL-efFruYQ/view', 
    },
    {
      name: 'Introduction to SQL by University of Michigan',
      link: 'https://www.coursera.org/account/accomplishments/verify/8T4HLS9E57X4', 
    },
  ],
};

// Custom Hook to manage section visibility
const useSectionVisibility = (sections) => {
  const [activeSection, setActiveSection] = useState(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);
  return activeSection;
};

// Component for the section headers
const SectionHeader = ({ id, title, icon }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex items-center space-x-3 text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8"
  >
    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg">
      {icon}
    </div>
    <h2 id={id} className="scroll-mt-24">{title}</h2>
  </motion.div>
);

// Component for the dark/light theme toggle button
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialMode = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

const HeroSection = () => (
  <motion.header
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="py-24 md:py-32 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-800 text-center"
  >
    <div className="container max-w-7xl mx-auto px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500"
        >
          {resumeData.name}
        </motion.div>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-4 text-base md:text-lg font-light text-gray-700 dark:text-gray-300"
        >
          Full Stack Developer | Student at VIT Chennai
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <a href={`mailto:${resumeData.contact.email}`} className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
            <Mail size={32} />
          </a>
          <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
            <Linkedin size={32} />
          </a>
          <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors duration-300">
            <Github size={32} />
          </a>
        </motion.div>
      </div>
    </div>
  </motion.header>
);

const AboutSection = () => (
  <section id="about" className="py-20 md:py-24 scroll-mt-24">
    <div className="container max-w-7xl mx-auto px-4">
      <SectionHeader id="about-title" title="About Me" icon={<User />} />
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto text-center"
      >
        {resumeData.about}
      </motion.p>
    </div>
  </section>
);

const EducationSection = () => (
  <section id="education" className="py-20 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-24">
    <div className="container max-w-7xl mx-auto px-4">
      <SectionHeader id="education-title" title="Education" icon={<GraduationCap />} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
        {resumeData.education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{edu.institution}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium mt-2">{edu.degree}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{edu.score}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">{edu.duration}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">{edu.location}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section id="experience" className="py-20 md:py-24 scroll-mt-24">
    <div className="container max-w-7xl mx-auto px-4">
      <SectionHeader id="experience-title" title="Experience" icon={<Briefcase />} />
      <div className="space-y-12 max-w-4xl mx-auto">
        {resumeData.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-start flex-wrap">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{exp.role}</h3>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 md:mt-0">{exp.duration}</span>
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-medium mt-2">{exp.company}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{exp.location}</p>
            {exp.points && exp.points.length > 0 && (
              <ul className="mt-4 list-disc list-inside space-y-2 text-base text-gray-700 dark:text-gray-300">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="py-20 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-24">
    <div className="container max-w-7xl mx-auto px-4">
      <SectionHeader id="projects-title" title="Projects" icon={<GitFork />} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="group p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Project Image */}
            <div className="mb-4 rounded-lg overflow-hidden shadow-sm dark:shadow-none">
              <img src={project.image} alt={`${project.title} screenshot`} className="w-full h-auto object-cover" />
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-full">
                {project.icon}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{project.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{project.duration}</p>
              </div>
            </div>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">{project.description}</p>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                <span className="font-bold">Tech Stack:</span> {project.technologies}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:underline transition-colors duration-300"
                >
                  Live Demo
                  <Link size={16} className="ml-2" />
                </a>
              )}
              {project.gitRepo && (
                <a
                  href={project.gitRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:underline transition-colors duration-300"
                >
                  GitHub
                  <Github size={16} className="ml-2" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const SkillsSection = () => (
  <section id="skills" className="py-20 md:py-24 scroll-mt-24">
    <div className="container max-w-7xl mx-auto px-4">
      <SectionHeader id="skills-title" title="Skills" icon={<Hammer />} />
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(resumeData.skills).map(([category, skills], index) => (
            <motion.div
              key={category}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md"
            >
              <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 capitalize">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {skills.map((skill, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CertificationsSection = () => (
  <section id="certifications" className="py-20 md:py-24 bg-gray-50 dark:bg-gray-900 scroll-mt-24">
    <div className="container max-w-7xl mx-auto px-4">
      <SectionHeader id="certifications-title" title="Certifications" icon={<Award />} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {resumeData.certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{cert.name}</h4>
            {cert.link && (
              <div className="mt-2">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-300 text-sm"
                >
                  View Credential
                  <Link size={16} className="ml-1" />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent(`Message from your Portfolio by ${name}`);
    const body = encodeURIComponent(`Sender's Email: ${email}\n\n${message}`);
    const mailtoLink = `mailto:${resumeData.contact.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="py-20 md:py-24 scroll-mt-24">
      <div className="container max-w-7xl mx-auto px-4 max-w-2xl">
        <SectionHeader id="contact-title" title="Contact Me" icon={<Mail />} />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-base text-center text-gray-700 dark:text-gray-300 mb-8"
        >
          Have a question or want to work together? Send me a message!
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                Send Message
                <Send size={20} className="ml-2" />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 dark:bg-gray-950 text-white py-12">
    <div className="container max-w-7xl mx-auto px-4 text-center">
      <hr className="border-gray-700 dark:border-gray-700 mb-6" />
      <div className="flex justify-center space-x-6 mb-6">
        <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
          <Linkedin size={24} />
        </a>
        <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
          <Github size={24} />
        </a>
      </div>
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} {resumeData.name}. All rights reserved.
      </p>
      <div className="mt-4">
        <a href="#hero" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300">
          Back to top
        </a>
      </div>
    </div>
  </footer>
);

const BackToTopButton = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <motion.button
      style={{ opacity }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none"
    >
      <ChevronDown size={24} className="rotate-180" />
    </motion.button>
  );
};

const sections = [
  { id: 'about', name: 'About' },
  { id: 'education', name: 'Education' },
  { id: 'experience', name: 'Experience' },
  { id: 'projects', name: 'Projects' },
  { id: 'skills', name: 'Skills' },
  { id: 'certifications', name: 'Certifications' },
  { id: 'contact', name: 'Contact' },
];

export default function App() {
  const activeSection = useSectionVisibility(sections);

  return (
    <div className="bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <style>{globalStyles}</style>
      <ThemeToggle />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
