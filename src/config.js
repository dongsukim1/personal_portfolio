// Skills icons - https://icon-sets.iconify.design/
import { Icon } from "@iconify/react";

// Navbar Logo image (add your image to the src/images directory and uncomment the line below to import your image)
// import newLogo from "./images/yourFileName"

// Hero Images (add your images to the /images directory with the same names)
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images (add your images to the images directory and import below)
// import Logo from "./images/logo.svg";
import pp1 from "./images/project_photo1.jpg"
import pp2 from "./images/project_photo2.jpg"
import pp3 from "./images/temp_project_image.jpg"


//Github Username

export const githubUsername = "dongsukim1";

// Site metadata - single source of truth
export const siteConfig = {
  displayName: "Dong Su Kim",
  siteName: "Portfolio",
  description: "Bioengineering/Computer Science graduate from Berkeley",
  url: "https://dongsukim1.github.io/personal_portfolio/"
};

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
  "I am a recent Bioengineering/Computer Science graduate from Berkeley seeking opportunities to apply interdisciplinary problem-solving skills to real world software/ML systems.";
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

/* Projects
 ************************************************************** 
  List the repo names (string - "your-repo-name") you want to include (they will be sorted alphabetically). If empty, only the first 3 will be included.
*/
export const filteredProjects = ["Blood_Protein_Classification", "Image_Classification", "data_augmentation_examples"];

// Custom display names for projects (optional - if not specified, repo name will be used)
export const projectDisplayNames = {
  "data_augmentation_examples": "Sequence Augmentation Project",
  "Image_Classification": "Image Classification Project",
  "Blood_Protein_Classification": "Blood Protein Classification Project"
  // "repo-name": "Custom Display Name"
};

// Replace the default GitHub image for matching repos below (images imported above - lines 7-8)
export const projectCardImages = [
  {
    name: "Blood_Protein_Classification",
    image: pp2
  },
  {
    name: "Image_Classification",
    image: pp1,
  },
  {
    name: "data_augmentation_examples",
    image: pp3
  }
];

/* Contact Info
 ************************************************************** 
  Add your formspree endpoint below.
  https://formspree.io/
*/
// export const formspreeUrl = "https://formspree.io/f/YourEndpoint";

// Footer icons theme (light or dark)
export const footerTheme = "dark";
