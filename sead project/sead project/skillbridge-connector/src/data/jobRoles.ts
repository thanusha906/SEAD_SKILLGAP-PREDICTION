
export interface Skill {
  id: string;
  name: string;
  category: string;
  importance: number; // 1-10 scale, 10 being most important
}

export interface JobRole {
  id: string;
  title: string;
  category: string;
  description: string;
  skills: Skill[];
  icon: string;
}

const jobRoles: JobRole[] = [
  {
    id: "cloud-architect",
    title: "Cloud Architect",
    category: "Cloud Computing",
    description: "Design and oversee cloud computing strategies and infrastructure.",
    icon: "cloud",
    skills: [
      { id: "aws", name: "AWS", category: "Cloud", importance: 10 },
      { id: "azure", name: "Microsoft Azure", category: "Cloud", importance: 9 },
      { id: "gcp", name: "Google Cloud Platform", category: "Cloud", importance: 8 },
      { id: "docker", name: "Docker", category: "Containerization", importance: 9 },
      { id: "kubernetes", name: "Kubernetes", category: "Orchestration", importance: 9 },
      { id: "terraform", name: "Terraform", category: "IaC", importance: 8 },
      { id: "cloudformation", name: "CloudFormation", category: "IaC", importance: 7 },
      { id: "networking", name: "Cloud Networking", category: "Infrastructure", importance: 9 },
      { id: "security", name: "Cloud Security", category: "Security", importance: 10 },
      { id: "cicd", name: "CI/CD Pipelines", category: "DevOps", importance: 8 },
    ]
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    category: "Data Analytics",
    description: "Analyze and interpret complex data to inform business decisions.",
    icon: "bar-chart-2",
    skills: [
      { id: "python", name: "Python", category: "Programming", importance: 10 },
      { id: "r", name: "R", category: "Programming", importance: 7 },
      { id: "sql", name: "SQL", category: "Data Management", importance: 9 },
      { id: "statistics", name: "Statistical Analysis", category: "Analysis", importance: 10 },
      { id: "ml", name: "Machine Learning", category: "AI", importance: 9 },
      { id: "data-viz", name: "Data Visualization", category: "Visualization", importance: 8 },
      { id: "big-data", name: "Big Data Technologies", category: "Data", importance: 7 },
      { id: "pandas", name: "Pandas", category: "Data Wrangling", importance: 9 },
      { id: "numpy", name: "NumPy", category: "Computation", importance: 8 },
      { id: "tableau", name: "Tableau", category: "Visualization", importance: 7 },
    ]
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    category: "AIML",
    description: "Develop and deploy machine learning models for production.",
    icon: "brain",
    skills: [
      { id: "python", name: "Python", category: "Programming", importance: 10 },
      { id: "ml-algorithms", name: "ML Algorithms", category: "AI", importance: 10 },
      { id: "deep-learning", name: "Deep Learning", category: "AI", importance: 9 },
      { id: "tensorflow", name: "TensorFlow", category: "Frameworks", importance: 9 },
      { id: "pytorch", name: "PyTorch", category: "Frameworks", importance: 8 },
      { id: "nlp", name: "Natural Language Processing", category: "AI", importance: 7 },
      { id: "computer-vision", name: "Computer Vision", category: "AI", importance: 7 },
      { id: "mlops", name: "MLOps", category: "Operations", importance: 8 },
      { id: "model-deployment", name: "Model Deployment", category: "Operations", importance: 9 },
      { id: "feature-engineering", name: "Feature Engineering", category: "Data", importance: 8 },
    ]
  },
  {
    id: "aerospace-engineer",
    title: "Aerospace Engineer",
    category: "Aerospace",
    description: "Design and test aircraft, spacecraft, and related systems.",
    icon: "plane",
    skills: [
      { id: "cad", name: "CAD Software", category: "Design", importance: 9 },
      { id: "fea", name: "Finite Element Analysis", category: "Analysis", importance: 9 },
      { id: "cfd", name: "Computational Fluid Dynamics", category: "Analysis", importance: 9 },
      { id: "materials", name: "Materials Science", category: "Engineering", importance: 8 },
      { id: "propulsion", name: "Propulsion Systems", category: "Engineering", importance: 8 },
      { id: "avionics", name: "Avionics", category: "Electronics", importance: 7 },
      { id: "systems-engineering", name: "Systems Engineering", category: "Engineering", importance: 9 },
      { id: "matlab", name: "MATLAB", category: "Computation", importance: 8 },
      { id: "project-management", name: "Project Management", category: "Management", importance: 7 },
      { id: "testing", name: "Testing Methodologies", category: "QA", importance: 8 },
    ]
  },
  {
    id: "product-manager",
    title: "Product Manager",
    category: "Business",
    description: "Oversee product development from conception to launch.",
    icon: "briefcase",
    skills: [
      { id: "product-strategy", name: "Product Strategy", category: "Strategy", importance: 10 },
      { id: "ux", name: "User Experience", category: "Design", importance: 9 },
      { id: "market-research", name: "Market Research", category: "Research", importance: 9 },
      { id: "agile", name: "Agile Methodologies", category: "Process", importance: 8 },
      { id: "roadmapping", name: "Product Roadmapping", category: "Planning", importance: 9 },
      { id: "stakeholder-management", name: "Stakeholder Management", category: "Communication", importance: 8 },
      { id: "data-analysis", name: "Data Analysis", category: "Analysis", importance: 8 },
      { id: "presentation", name: "Presentation Skills", category: "Communication", importance: 7 },
      { id: "project-management", name: "Project Management", category: "Management", importance: 8 },
      { id: "technical-understanding", name: "Technical Understanding", category: "Knowledge", importance: 7 },
    ]
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    category: "Software Development",
    description: "Build user interfaces and interactive web applications.",
    icon: "code",
    skills: [
      { id: "html", name: "HTML", category: "Markup", importance: 9 },
      { id: "css", name: "CSS", category: "Styling", importance: 9 },
      { id: "javascript", name: "JavaScript", category: "Programming", importance: 10 },
      { id: "typescript", name: "TypeScript", category: "Programming", importance: 9 },
      { id: "react", name: "React", category: "Frameworks", importance: 9 },
      { id: "vue", name: "Vue.js", category: "Frameworks", importance: 7 },
      { id: "angular", name: "Angular", category: "Frameworks", importance: 7 },
      { id: "responsive-design", name: "Responsive Design", category: "UX/UI", importance: 8 },
      { id: "web-accessibility", name: "Web Accessibility", category: "Accessibility", importance: 8 },
      { id: "webpack", name: "Webpack/Build Tools", category: "Tools", importance: 7 },
    ]
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    category: "Software Development",
    description: "Develop server-side logic and database integrations.",
    icon: "database",
    skills: [
      { id: "nodejs", name: "Node.js", category: "Runtime", importance: 9 },
      { id: "python-backend", name: "Python", category: "Programming", importance: 9 },
      { id: "java", name: "Java", category: "Programming", importance: 8 },
      { id: "sql-db", name: "SQL Databases", category: "Databases", importance: 9 },
      { id: "nosql-db", name: "NoSQL Databases", category: "Databases", importance: 8 },
      { id: "rest-api", name: "REST API Design", category: "API", importance: 9 },
      { id: "graphql", name: "GraphQL", category: "API", importance: 7 },
      { id: "authentication", name: "Authentication & Authorization", category: "Security", importance: 9 },
      { id: "microservices", name: "Microservices", category: "Architecture", importance: 8 },
      { id: "testing-backend", name: "Backend Testing", category: "Testing", importance: 8 },
    ]
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    category: "Design",
    description: "Create intuitive and engaging user experiences for digital products.",
    icon: "design",
    skills: [
      { id: "user-research", name: "User Research", category: "Research", importance: 10 },
      { id: "wireframing", name: "Wireframing", category: "Design", importance: 9 },
      { id: "prototyping", name: "Prototyping", category: "Design", importance: 9 },
      { id: "usability-testing", name: "Usability Testing", category: "Testing", importance: 9 },
      { id: "information-architecture", name: "Information Architecture", category: "Structure", importance: 8 },
      { id: "figma", name: "Figma", category: "Tools", importance: 9 },
      { id: "sketch", name: "Sketch", category: "Tools", importance: 7 },
      { id: "accessibility-design", name: "Accessibility", category: "Inclusion", importance: 8 },
      { id: "design-systems", name: "Design Systems", category: "Systems", importance: 8 },
      { id: "user-flows", name: "User Flows", category: "Process", importance: 9 },
    ]
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    category: "Operations",
    description: "Build and maintain deployment infrastructure and CI/CD pipelines.",
    icon: "wrench",
    skills: [
      { id: "linux", name: "Linux Administration", category: "OS", importance: 9 },
      { id: "containerization", name: "Docker/Containerization", category: "Containers", importance: 10 },
      { id: "kubernetes-ops", name: "Kubernetes", category: "Orchestration", importance: 9 },
      { id: "ci-cd", name: "CI/CD", category: "Automation", importance: 10 },
      { id: "infrastructure-as-code", name: "Infrastructure as Code", category: "Automation", importance: 9 },
      { id: "monitoring", name: "Monitoring & Logging", category: "Observability", importance: 8 },
      { id: "cloud-platforms", name: "Cloud Platforms (AWS/GCP/Azure)", category: "Cloud", importance: 9 },
      { id: "networking-ops", name: "Network Infrastructure", category: "Networks", importance: 8 },
      { id: "security-practices", name: "Security Practices", category: "Security", importance: 9 },
      { id: "shell-scripting", name: "Shell Scripting", category: "Automation", importance: 8 },
    ]
  },
  {
    id: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Security",
    description: "Protect systems and networks from digital threats and attacks.",
    icon: "computer",
    skills: [
      { id: "security-assessment", name: "Security Assessment", category: "Analysis", importance: 10 },
      { id: "vulnerability-management", name: "Vulnerability Management", category: "Security", importance: 9 },
      { id: "intrusion-detection", name: "Intrusion Detection", category: "Monitoring", importance: 9 },
      { id: "incident-response", name: "Incident Response", category: "Response", importance: 10 },
      { id: "network-security", name: "Network Security", category: "Security", importance: 9 },
      { id: "encryption", name: "Encryption Protocols", category: "Security", importance: 8 },
      { id: "security-tools", name: "Security Tools", category: "Tools", importance: 9 },
      { id: "threat-intelligence", name: "Threat Intelligence", category: "Intelligence", importance: 8 },
      { id: "compliance", name: "Compliance Frameworks", category: "Compliance", importance: 8 },
      { id: "penetration-testing", name: "Penetration Testing", category: "Testing", importance: 9 },
    ]
  }
];

export default jobRoles;
