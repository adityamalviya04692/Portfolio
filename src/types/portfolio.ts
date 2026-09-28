export interface Social {
  linkedin: string; github: string; naukri: string;
  email: string; phone: string; website: string;
}
export interface Profile {
  name: string; shortName: string; role: string; tagline: string;
  specialization: string; location: string; yearsOfExperience: string;
  availability: string; bio: string; bioSecondary: string;
  avatar: string; resume: string; resumeDocx: string; social: Social;
}
export interface Stat { value: string; label: string }
export interface SkillCategory { name: string; items: string[] }
export interface Capability { title: string; summary: string; points: string[] }
export interface ExperienceProject { name: string; period: string; highlights: string[] }
export interface Experience {
  company: string; role: string; account: string; period: string;
  location: string; summary: string; projects: ExperienceProject[];
}
export interface ProjectMetric { value: string; label: string }
export interface Project {
  id: string; title: string; subtitle: string; category: string;
  description: string; stack: string[]; metrics: ProjectMetric[];
  year: string; link: string; highlight: boolean;
}
export interface Certification { name: string; code: string; issuer: string }
export interface Education { degree: string; institution: string; period: string; result: string }
export interface Testimonial { id: string; quote: string; name: string; role: string; avatarColor: string }

export interface PortfolioData {
  profile: Profile;
  stats: Stat[];
  skills: { categories: SkillCategory[] };
  capabilities: Capability[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  languages: string[];
  testimonials: Testimonial[];
}
