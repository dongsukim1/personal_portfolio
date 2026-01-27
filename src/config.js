// Skills icons - https://icon-sets.iconify.design/
import { Icon } from "@iconify/react";

// Navbar Logo image (add your image to the src/images directory and uncomment the line below to import your image)
// import newLogo from "./images/yourFileName"

// Hero Images (add your images to the /images directory with the same names)
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images (add your images to the images directory and import below)
// Unused photos/projects commented out
// import pp1 from "./images/project_photo1.jpg"
// import pp3 from "./images/temp_project_image.jpg"
import pp2 from "./images/project_photo2.jpg"
import pp5 from "./images/Hunger_logo.png"
import pp4 from  "./images/wildlife_classification.png"


//Github Username

export const githubUsername = "dongsukim1";

// Site metadata - single source of truth
export const siteConfig = {
  displayName: "Dong Su Kim",
  siteName: "Portfolio",
  description: "Bioengineering/Computer Science graduate from Berkeley",
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
    { id: "about-section", name: "About Me", to: "About" },
    { id: "skills-section", name: "Skills", to: "Skills" },
    { id: "projects-section", name: "Projects", to: "Projects" },
  ],
};

// External resources configuration
export const externalResourcesConfig = [
  {
    id: "resume-resource",
    name: "Resume",
    url: "/resume.pdf",
    icon: "fa6-solid:file-pdf",
    description: "Download my resume",
    type: "download",
    showOnMobile: true,
  },
  {
    id: "research-resource", 
    name: "Research",
    url: "/research",
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
  "I am a recent Computer Science graduate from Berkeley seeking New Grad / Apprentice / Intern level Software Engineering opportunities. I have a strong foundation in programming languages such as Python, Java, and C, and I am passionate about leveraging AI and machine learning to solve real-world problems.";
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
    displayName: "Blood Protein Classification Project",
    image: pp2,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  {
    repoName: "cat_classification", 
    displayName: "Wildcat Conservation Project",
    image: pp4,
    showOnHomepage: true,
    hasOnnxDemo: true,
    demoUrl: null,
  },
  {
    repoName: "Hunger",
    displayName: "Hunger - Beli Clone", 
    image: pp5,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  // Add more projects here as needed
  // {
  //   repoName: "your-repo-name",
  //   displayName: "Your Project Display Name",
  //   image: yourImage,
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
