
export interface Course {
  id: string;
  title: string;
  provider: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  skills: string[]; // Skill IDs this course teaches
  rating: number; // 1-5 scale
  url: string;
  image?: string;
}

const courses: Course[] = [
  // AWS Courses
  {
    id: "aws-certified-solutions-architect",
    title: "AWS Certified Solutions Architect Associate",
    provider: "Amazon Web Services",
    description: "Learn to design and implement distributed systems on AWS.",
    duration: "30 hours",
    level: "Intermediate",
    skills: ["aws", "networking", "security"],
    rating: 4.8,
    url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
    image: "https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png"
  },
  
  // Azure Courses
  {
    id: "azure-fundamentals",
    title: "Microsoft Azure Fundamentals",
    provider: "Microsoft Learn",
    description: "Learn Azure cloud concepts, core services, security, privacy, compliance, and trust.",
    duration: "10 hours",
    level: "Beginner",
    skills: ["azure", "security"],
    rating: 4.7,
    url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
    image: "https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg"
  },
  
  // GCP Courses
  {
    id: "gcp-professional-cloud-architect",
    title: "Google Professional Cloud Architect",
    provider: "Google Cloud",
    description: "Design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions to drive business objectives.",
    duration: "40 hours",
    level: "Advanced",
    skills: ["gcp", "security", "networking"],
    rating: 4.6,
    url: "https://cloud.google.com/certification/cloud-architect",
    image: "https://cloud.google.com/certification/images/cloud-architect.png"
  },
  
  // Docker & Kubernetes Courses
  {
    id: "docker-kubernetes-complete-guide",
    title: "Docker and Kubernetes: The Complete Guide",
    provider: "Udemy",
    description: "Master Docker and Kubernetes by building and deploying real web applications.",
    duration: "22 hours",
    level: "Intermediate",
    skills: ["docker", "kubernetes", "cicd"],
    rating: 4.7,
    url: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
    image: "https://img-c.udemycdn.com/course/750x422/1793828_7999.jpg"
  },

  // Terraform Courses
  {
    id: "terraform-associate-certification",
    title: "HashiCorp Terraform Associate Certification",
    provider: "HashiCorp",
    description: "Learn Infrastructure as Code (IaC) with Terraform to automate the provisioning of your cloud infrastructure.",
    duration: "16 hours",
    level: "Intermediate",
    skills: ["terraform", "cicd"],
    rating: 4.5,
    url: "https://www.hashicorp.com/certification/terraform-associate",
    image: "https://www.datocms-assets.com/2885/1620155116-brandhcterraformverticalcolor.svg"
  },
  
  // Python Courses
  {
    id: "python-for-data-science",
    title: "Python for Data Science and Machine Learning",
    provider: "Coursera",
    description: "Learn to use Python for data analysis, visualization, and machine learning.",
    duration: "40 hours",
    level: "Intermediate",
    skills: ["python", "pandas", "numpy", "ml-algorithms"],
    rating: 4.8,
    url: "https://www.coursera.org/specializations/data-science-python",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/3d/d26d401ae411e5a53c7a83d4d1ccbd/PPYTHON-1.jpg"
  },
  
  // Machine Learning Courses
  {
    id: "deep-learning-specialization",
    title: "Deep Learning Specialization",
    provider: "Coursera - deeplearning.ai",
    description: "Become a Deep Learning expert. Master Deep Learning and Break into AI.",
    duration: "90 hours",
    level: "Advanced",
    skills: ["ml-algorithms", "deep-learning", "tensorflow", "python"],
    rating: 4.9,
    url: "https://www.coursera.org/specializations/deep-learning",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/e3/d9861012d343ce889444325fa54bf8/Logo3.png"
  },

  // NLP Courses
  {
    id: "nlp-specialization",
    title: "Natural Language Processing Specialization",
    provider: "Coursera - deeplearning.ai",
    description: "Learn to build and apply NLP models to real-world applications.",
    duration: "60 hours",
    level: "Intermediate",
    skills: ["nlp", "python", "deep-learning"],
    rating: 4.7,
    url: "https://www.coursera.org/specializations/natural-language-processing",
    image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/a6/cee8c0b7dd11e8a8ae875ea36aff31/Course-Logo.png"
  },
  
  // Aerospace Engineering Courses
  {
    id: "intro-to-aerospace-engineering",
    title: "Introduction to Aerospace Engineering",
    provider: "edX - MIT",
    description: "Explore the exciting world of aerospace engineering and flight.",
    duration: "12 weeks",
    level: "Beginner",
    skills: ["propulsion", "avionics", "systems-engineering"],
    rating: 4.6,
    url: "https://www.edx.org/course/introduction-to-aerospace-engineering-astronautics",
    image: "https://prod-discovery.edx-cdn.org/media/course/image/e443769c-2e7a-4878-9c79-0d6e0be8642c-8c7663bd61d7.small.jpg"
  },
  
  // CAD Courses
  {
    id: "cad-for-aerospace",
    title: "CAD for Aerospace Design",
    provider: "Udemy",
    description: "Master CAD software for aerospace engineering applications.",
    duration: "28 hours",
    level: "Intermediate",
    skills: ["cad", "materials"],
    rating: 4.5,
    url: "https://www.udemy.com/course/fusion-360-for-aerospace-engineers/",
    image: "https://img-c.udemycdn.com/course/750x422/2056652_6a4c_4.jpg"
  },
  
  // Product Management Courses
  {
    id: "product-management-fundamentals",
    title: "Product Management Fundamentals",
    provider: "Product School",
    description: "Learn the fundamentals of product management in the digital age.",
    duration: "8 weeks",
    level: "Beginner",
    skills: ["product-strategy", "roadmapping", "stakeholder-management"],
    rating: 4.7,
    url: "https://productschool.com/product-management-certification/",
    image: "https://productschool.com/wp-content/uploads/2023/05/product-management-certification-pmc-new.png"
  },
  
  // Agile Courses
  {
    id: "professional-scrum-master",
    title: "Professional Scrum Master I",
    provider: "Scrum.org",
    description: "Learn Scrum theory and practice for effective Agile product development.",
    duration: "16 hours",
    level: "Intermediate",
    skills: ["agile", "project-management"],
    rating: 4.6,
    url: "https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-i-certification",
    image: "https://static.scrum.org/web/badges/badge-psmi.svg"
  }
];

export default courses;
