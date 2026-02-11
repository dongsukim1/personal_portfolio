// Skills icons - https://icon-sets.iconify.design/
import { Icon } from "@iconify/react";

// Navbar Logo image 
// import newLogo from "./images/yourFileName"

// Hero Images 
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images 
// Unused photos/projects commented out
// import pp1 from "./images/project_photo1.jpg"
// import pp3 from "./images/temp_project_image.jpg"
import pp2 from "./images/project_photo2.jpg"
import pp5 from "./images/Hunger_logo.png"
import pp4 from  "./images/wildlife_classification.png"


//Github Username

export const githubUsername = "dongsukim1";

// Social links
export const linkedinUrl = "https://www.linkedin.com/in/dongsukim1/";
export const emailAddress = "dkim0168@gmail.com";
export const resumeUrl = "/resume.pdf"

// Site metadata - single source of truth
export const siteConfig = {
  displayName: "Dong Su Kim",
  siteName: "Portfolio",
  description: "Computer Science/Bioengineering graduate from Berkeley",
  url: "https://dongsukim1.github.io/personal_portfolio/"
};

// Navigation configuration
export const navigationConfig = {
  routes: [
    { id: "home-route", name: "Home", route: "/" },
    { id: "projects-route", name: "All Projects", route: "/All-Projects" },
  ],
  sections: [
    { id: "home-section", name: "Home", to: "Home" },
    { id: "skills-section", name: "Skills", to: "Skills" },
    { id: "projects-section", name: "Projects", to: "Projects" },
  ],
};

// External resources configuration
export const externalResourcesConfig = [
  {
    id: "research-resource", 
    name: "Research",
    url: "/research.pdf",
    icon: "fa6-solid:microscope",
    description: "View my research work",
    type: "page",
    showOnMobile: true,
  }
];

// Legacy export for backward compatibility
export const displayName = siteConfig.displayName;

// Navbar Logo image
export const navLogo = null;

/* Main
 ************************************************************** 
  Add a custom blog icon or update the hero images for the Main section.
*/
export const Blog = "";

// Hero images (imported above - lines 8-9)
export { HeroLight as Light };
export { HeroDark as Dark };

/* About Me
 **************************************************************
  Add a second paragraph for the about me section.
*/
export const moreInfo =
  "I am a recent Computer Science graduate from Berkeley seeking Software Engineering/Machine Learning opportunities. I have a strong foundation in programming languages such as Python, Java, and C, and I am passionate about leveraging AI and machine learning to solve real-world problems.";
/* Skills
 ************************************************************** 
  Add or remove skills in the SAME format below, choose icons here - https://icon-sets.iconify.design/
*/
export const skillData = [
  {
    id: 1,
    skill: <Icon icon="skill-icons:python-dark" className="display-4" />,
    name: "Python",
  },
  {
    id: 2,
    skill: <Icon icon="skill-icons:java-light" className="display-4" />,
    name: "Java",
  },
  {
    id: 3,
    skill: <Icon icon="vscode-icons:file-type-c" className="display-4" />,
    name: "C",
  },
  {
    id: 4,
    skill: <Icon icon="fa6-brands:js" className="display-4" />,
    name: "JavaScript",
  },
  {
    id: 5,
    skill: <Icon icon="skill-icons:aws-dark" className="display-4" />,
    name: "AWS",
  },
  {
    id: 6,
    skill: <Icon icon="mdi:react" className="display-4" />,
    name: "React",
  },
  {
    id: 7,
    skill: <Icon icon="bi:git" className="display-4" />,
    name: "Git",
  },
  {
    id: 8,
    skill: <Icon icon="fa6-brands:square-github" className="display-4" />,
    name: "GitHub",
  },
];

// Resume link (string - "https://YourResumeUrl") - I am using CloudFront to share my resume (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
export const resume = null;

/* Projects Configuration
 ************************************************************** 
  Unified project configuration - single source of truth for all project metadata
*/
export const projectsConfig = [
  {
    repoName: "Blood_Protein_Classification",
    displayName: "Single Cell RNA-Sequencing Analysis Tool",
    image: pp2,
    description: "A tool created to help analyze sc-RNA seq data consisting of 765 different genes from 700 cells using an autoencoder and a simple custom neural network. Focuses on being able to differentiate between different immune cell types such as T cells, B cells, monocytes, dendritic cells, and NK cells. Uses dimensionality reduction techniques for visualization of data, performs feature extraction for downstream analysis and biomarker discovery. Data is preprocessed via log transform + standardization. ",
    tags: ["PyTorch", "Keras", "NumPy", "Pandas", "sklearn", "seaborn"],
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  {
    repoName: "cat_classification", 
    displayName: "Wildcat Conservation Project",
    image: pp4,
    description: "An automated camera trap classification platform built to aid bigcat conservation efforts in the United States. Relies on an ENB3 backbone to robustly classify GBs of camera trap images and identify bobcats with 90%+ accuracy. Trained on a 200+ GB dataset distilled into 6 geographically and conservationally relevant species. The model is quantized to be able to return inferences at lightning speed with minimal compute from within a browser via ONNX Runtime. It is currently being worked on to improve inference accuracy via quantization aware training and the addition of automated bounding boxes.",
    tags: ["PyTorch", "OpenCV", "Docker", "AWS - s3, EC2, SageMaker"],
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: true,
    demoUrl: null,
  },
  {
    repoName: "Hunger",
    displayName: "Hunger", 
    image: pp5,
    description: "A recreation of 'Beli' designed around addressing the core usability flaw where locations gradually lose relevance as entries increase. Allows for the creation of custom groupings or contexts that solves this issue. Hunger also contains a basic machine learning based recommender that can recommend new locations through a questionnaire. Effectively narrows down 500+ choices to <3 using an XGBoost model trained on 10,000+ synthetic personas with 20+ features. Comes with a minimalistic frontend for integration testing that showcases robustness of backend API endpoints. Backend API endpoints implement real-time deletion and addition of locations and their ratings as well as a time based garbage collector/recovery for deleted lists",
    tags: ["Python", "Javascript/CSS/html", "SQLite3", "FastAPI", "scikit-learn", "Google Places API"],
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  // Add more projects here as needed
  // {
  //   repoName: "your-repo-name",
  //   displayName: "Your Project Display Name",
  //   image: yourImage,
  //   description: null, // Custom description for card body
  //   tags: null, // Example: ["Python", "React", "AWS"]
  //   url: null, // Optional override for GitHub URL
  //   showOnHomepage: true,
  //   hasOnnxDemo: false,
  //   demoUrl: "https://your-demo-url.com", // Optional external demo
  // },
];

/* Contact Info
 ************************************************************** 
  Add your formspree endpoint below.
  https://formspree.io/
*/
// export const formspreeUrl = "https://formspree.io/f/YourEndpoint";

// Footer icons theme (light or dark)
export const footerTheme = "dark";

/* ONNX Demo Configuration
 ************************************************************** 
  Configure your ONNX model demo here
*/
export const onnxDemoConfig = {
  title: "Image Classification Demo",
  description: "Upload an image to see AI-powered classification in action. The model runs entirely in your browser!",
  modelUrl: "/models/your-model.onnx", // Place your .onnx file in public/models/
  inputName: "input", // Check your model's input name
  outputName: "output", // Check your model's output name  
  inputSize: 224, // Model input image size (e.g., 224x224)
  classes: [
    // Add your model's class labels here
    "Class 1",
    "Class 2", 
    "Class 3",
    // ... add all your classes
  ]
};
