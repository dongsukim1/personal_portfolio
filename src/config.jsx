// Hero Images 
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images 
// Unused photos/projects commented out
import pp1 from "./images/project_photo1.jpg"
// import pp3 from "./images/temp_project_image.jpg"
import pp2 from "./images/project_photo2.jpg"
import pp5 from "./images/Hunger_logo.png"
import pp4 from  "./images/wildlife_classification.png"
import pp6 from "./images/ambra_demo.png"

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
  "I'm a Computer Science + Bioengineering graduate from Berkeley passionate about leveraging AI and machine learning to solve real-world problems. I have experience building end-to-end machine learning pipelines for analyzing large multi-modal datasets at scale. My current biggest interest is building intelligent Agentic AI orchestration systems.";

/* Projects Configuration
 ************************************************************** 
  Unified project configuration - single source of truth for all project metadata
  // Optional: set renderOrder to control left-to-right render sequence.
  // Smaller numbers render first. If omitted, array order is used.
  // Add more projects here as needed
  // {
  //   repoName: "your-repo-name",
  //   displayName: "Your Project Display Name",
  //   renderOrder: 4, // Optional explicit ordering
  //   image: yourImage,
  //   description: null, // Custom description for card body
  //   tags: null, // Example: ["Python", "React", "AWS"] or [{ label: "Python", icon: "simple-icons:python" }]
  //   url: null, // Optional override for GitHub URL
  //   showOnHomepage: true,
  //   hasOnnxDemo: false,
  //   demoUrl: "https://your-demo-url.com", // Optional external demo
  // },
*/
export const projectsConfig = [
  {
    repoName: "Hunger",
    displayName: "Hunger",
    renderOrder: 2,
    image: pp5,
    description: (
      <>
        A recreation of "Beli" designed around addressing the core usability flaw where locations
        gradually lose relevance as entries increase. Allows for the creation of custom groupings
        or contexts that solve this issue. Hunger also contains a basic machine-learning recommender that suggests locations through
        a questionnaire, narrowing 500+ choices to fewer than 3 with an XGBoost model trained on
        10,000+ synthetic personas and 20+ features. Includes a minimal frontend for integration testing and backend endpoints for real-time
        add/delete operations, plus a time-based garbage collector and recovery flow for deleted lists.
      </>
    ),
    tags: ["Python", "Javascript/CSS/html", "SQLite3", "FastAPI", "scikit-learn", "Google Places API"],
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  {
    repoName: "cat_classification",
    displayName: "Wildcat Conservation Project",
    renderOrder: 3,
    image: pp4,
    description: (
      <>
        An automated camera-trap classification platform built to aid big-cat conservation efforts
        in the United States. Uses an ENB3 backbone to classify large camera-trap image sets and identify bobcats with
        90%+ accuracy, trained on a 200+ GB dataset distilled into 6 geographically relevant species. 
        Quantized for fast, low-compute browser inference with ONNX Runtime, with ongoing work on
        quantization-aware training and automated bounding boxes to improve accuracy.
        <br />
        <strong><u>Reference Data Set</u></strong>
        <br />
        Sara Beery, Grant Van Horn, Pietro Perona. Recognition in Terra Incognita. Proceedings of the 15th European Conference on Computer Vision (ECCV 2018).
        <br />
      </>
    ),
    tags: ["Python", "PyTorch", "OpenCV", "Docker", "AWS - s3, EC2, SageMaker", "ONNX"],
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: true,
    demoUrl: null,
  },
  {
    repoName: "BloodCellClassification",
    displayName: "White Blood Cell Analysis Tool",
    renderOrder: 4,
    image: pp1,
    description: (
      <>
        A computer-vision project built to distinguish between three blood-cell types from
        microscope images using a pretrained PyTorch model and transfer learning.
        Implements a custom dataset pipeline with lazy loading and CPU-focused optimizations for
        low-compute inference, plus evaluation outputs including prediction examples, accuracy
        metrics, and a confusion matrix. Fine-tuned on a public microscopy dataset of 6,100 images, with a 500-image sample set in the repository for sanity checks.
        <br />
        <strong><u>Reference</u></strong>
        <br />
        Acevedo, A., Merino, A., Alferez, S., Molina, A., Boldu, L., & Rodellar, J. (2020).
        A dataset of microscopic peripheral blood cell images for development of automatic
        recognition systems (Version 1) [Data set]. Mendeley Data.
        <br />
        <>
        <a
          href="https://doi.org/10.17632/snkd93bnjr.1"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://doi.org/10.17632/snkd93bnjr.1
        </a>
        .
        </>
      </>
    ),
    tags: ["Python", "PyTorch", "NumPy", "sklearn"],
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  {
    repoName: "Blood_Protein_Classification",
    displayName: "Single Cell RNA-Seq Analysis Tool",
    renderOrder: 5,
    image: pp2,
    description: (
      <>
        A tool for analyzing scRNA-seq data (765 genes across 700 cells) using an autoencoder and
        a custom neural network. Focuses on distinguishing immune-cell types including T cells, B cells, monocytes,
        dendritic cells, and NK cells. Uses dimensionality reduction for visualization and feature extraction for downstream
        analysis and biomarker discovery, with preprocessing via log transform and standardization.
      </>
    ),
    tags: ["PyTorch", "Keras", "NumPy", "Pandas", "sklearn", "seaborn"], // or [{ label: "PyTorch", icon: "simple-icons:pytorch" }]
    url: null,
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: null,
  },
  {
    repoName: "24project",
    displayName: "EMS Ambient Pipeline",
    renderOrder: 1, 
    image: pp6,
    description: (
      <>
        I applied for a Founding Engineer role at Ambra without any prior domain knowledge in EMS. 
        To bridge that gap, I spent roughly 24 hours reverse engineering their product based entirely on what was publicly available at the time, including their LinkedIn page, website, and job listing.
        The result is an MVP that is approximately 90% complete. 
        To fully realize the vision, the next steps would include implementing an agentic voice interface, upgrading the extraction layer with a RAG-based approach, and incorporating suitable real-world testing material for validation.
        I may continue developing the project further, at which point the demo button below will be fully functional.
        <br />
        <br />
        <strong>Technical Implementation</strong>
        <br />
        1. Stage CLI pipeline: <code>transcribe -&gt; extract -&gt; build-claim</code>
        <br />
        2. Agent flow: <code>agent1</code>..<code>agent4</code> on a shared session context
        <br />
        3. Audio/NLP stack: Whisper/faster-whisper (+ optional pyannote diarization), GLiNER extraction, and
        rule-based context handling
        <br />
        4. Outputs: canonical claim JSON + provenance, with export targets for NEMSIS v3.5, X12 837P structured
        representation, and FHIR R4 bundles
        <br />
        <br />
        Check them out on{" "}
        <a href="https://www.linkedin.com/company/ambra911/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>{" "}
        /{" "}
        <a href="https://www.ambra911.com/" target="_blank" rel="noopener noreferrer">
          Website
        </a>
        .
      </>
    ),
    tags: ["Python", "TypeScript", "MCP", "NLP", "Whisper", "OpenAI"], 
    url: null, // Optional override for GitHub URL
    showOnHomepage: true,
    hasOnnxDemo: false,
    demoUrl: "https://your-demo-url.com", // Optional external demo
  },
];

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
