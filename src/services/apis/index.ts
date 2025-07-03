import { JobFilters } from "../store/jobStore";

export interface Job {
  id: string;
  company_name: string;
  title: string;
  description: string;
  remote: boolean;
  url: string;
  tags: string[];
  job_types: string[];
  location: string;
  created_at: string;
  is_applied?:boolean;
}

const MOCK_JOBS: Job[] = [
  {
    id: "senior-frontend-developer-tech-corp",
    company_name: "TechCorp",
    title: "Senior Frontend Developer",
    description: "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for developing user-facing web applications using modern JavaScript frameworks like React, Vue, or Angular. The ideal candidate should have strong experience with HTML5, CSS3, and JavaScript ES6+, along with knowledge of responsive design principles and cross-browser compatibility.",
    remote: true,
    url: "https://techcorp.com/careers/frontend-dev",
    tags: ["React", "TypeScript", "JavaScript", "CSS"],
    job_types: ["full-time"],
    location: "San Francisco, CA",
    created_at: new Date().toISOString()
  },
  {
    id: "product-manager-innovate-labs",
    company_name: "Innovate Labs",
    title: "Product Manager",
    description: "Join our product team to drive the development of cutting-edge software solutions. As a Product Manager, you'll work closely with engineering, design, and business teams to define product requirements, create roadmaps, and ensure successful product launches. We're looking for someone with 3+ years of product management experience, strong analytical skills, and excellent communication abilities.",
    remote: false,
    url: "https://innovatelabs.com/jobs/pm",
    tags: ["Product Strategy", "Analytics", "Agile", "Roadmapping"],
    job_types: ["full-time"],
    location: "New York, NY",
    created_at: new Date().toISOString()
  },
  {
    id: "ux-designer-creative-studio",
    company_name: "Creative Studio",
    title: "UX Designer",
    description: "We're seeking a talented UX Designer to create intuitive and engaging user experiences for our digital products. You'll be responsible for conducting user research, creating wireframes and prototypes, and collaborating with our development team to bring designs to life. The ideal candidate has experience with design tools like Figma or Sketch, understanding of user-centered design principles, and a portfolio showcasing mobile and web design work.",
    remote: true,
    url: "https://creativestudio.com/careers/ux-designer",
    tags: ["Figma", "User Research", "Prototyping", "UI/UX"],
    job_types: ["contract"],
    location: "Austin, TX",
    created_at: new Date().toISOString()
  },
  {
    id: "data-scientist-ai-solutions",
    company_name: "AI Solutions",
    title: "Data Scientist",
    description: "Join our AI team to work on machine learning projects that solve real-world problems. As a Data Scientist, you'll analyze large datasets, build predictive models, and work with our engineering team to deploy ML solutions at scale. We're looking for someone with strong Python/R skills, experience with ML frameworks like TensorFlow or PyTorch, and knowledge of statistical analysis and data visualization.",
    remote: true,
    url: "https://aisolutions.com/jobs/data-scientist",
    tags: ["Python", "Machine Learning", "TensorFlow", "Statistics"],
    job_types: ["full-time"],
    location: "Seattle, WA",
    created_at: new Date().toISOString()
  },
  {
    id: "backend-engineer-fintech-startup",
    company_name: "FinTech Startup",
    title: "Backend Engineer",
    description: "We're building the future of financial technology and need a skilled Backend Engineer to help scale our platform. You'll work on developing robust APIs, optimizing database performance, and ensuring system reliability. The role requires experience with Node.js or Python, knowledge of databases (SQL and NoSQL), cloud platforms (AWS/GCP), and understanding of microservices architecture.",
    remote: false,
    url: "https://fintechstartup.com/careers/backend",
    tags: ["Node.js", "Python", "AWS", "MongoDB", "PostgreSQL"],
    job_types: ["full-time"],
    location: "Boston, MA",
    created_at: new Date().toISOString()
  },
  {
    id: "marketing-manager-growth-company",
    company_name: "Growth Company",
    title: "Digital Marketing Manager",
    description: "Lead our digital marketing efforts to drive user acquisition and brand awareness. You'll manage multi-channel campaigns, analyze performance metrics, and optimize marketing funnels. We're looking for someone with experience in SEO/SEM, social media marketing, email campaigns, and marketing analytics tools like Google Analytics and HubSpot.",
    remote: true,
    url: "https://growthcompany.com/jobs/marketing",
    tags: ["SEO", "SEM", "Analytics", "Social Media"],
    job_types: ["part-time"],
    location: "Denver, CO",
    created_at: new Date().toISOString()
  }
];

export const fetchJobs = async (page: number = 1, filters: JobFilters): Promise<Job[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock data (in a real app, this would be an API call)
  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;
  
  // Create more jobs by duplicating and modifying the mock data
  const expandedJobs: Job[] = [];
  for (let i = 0; i < 5; i++) {
    MOCK_JOBS.forEach(job => {
      expandedJobs.push({
        ...job,
        id: `${job.id}-${i}`,
        title: `${job.title} ${i > 0 ? `(${i + 1})` : ''}`,
      });
    });
  }
  
  return expandedJobs.slice(startIndex, endIndex);
};
