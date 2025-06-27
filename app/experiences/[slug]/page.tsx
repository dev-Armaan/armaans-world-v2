"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Github, ExternalLink } from "lucide-react"
import { useParams } from "next/navigation"

type TextBlock = {
  type: "text"
  content: string
}

type ImageBlock = {
  type: "image"
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  fullWidth?: boolean
}

type YouTubeBlock = {
  type: "youtube"
  videoId: string
  title: string
  caption?: string
}

type ContentBlock = TextBlock | ImageBlock | YouTubeBlock

const getYouTubeVideoId = (url: string): string => {
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : url
}

// Add the missing YouTubeEmbed component
const YouTubeEmbed = ({ videoId, title, caption }: YouTubeBlock) => {
  // Extract the video ID if a full URL was provided
  const id = getYouTubeVideoId(videoId)

  return (
    <div className="my-12">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-0"
        />
      </div>
      {caption && <p className="text-sm text-white/60 text-center mt-2">{caption}</p>}
    </div>
  )
}

type Project = {
  title: string
  subtitle: string
  year: string
  type: string
  image: string
  contents: string[]
  descriptionBlocks: ContentBlock[]
  repoUrl?: string
  demoUrl?: string
}

const projectsData: Record<string, Project> = {
  traffic: {
    title: "real time traffic analysis",
    subtitle: "cnn model for real-time traffic analysis",
    year: "2025",
    type: "project",
    image: "/vtracker.png",
    repoUrl: "https://github.com/dev-Armaan/vehicle-tracker",
    demoUrl: "https://youtu.be/S-3mQ_zNbvw",
    contents: [
      "object detection & tracking",
      "speed estimation",
      "vehicle classification",
      "cutomizable configuration",
      "video processing & analytics",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "this model estimates vehicle speed by leveraging object detection, tracking, and perspective transformation. it begins by using yolov8 to detect vehicles in each frame of a video. yolo provides bounding boxes around detected objects, along with confidence scores and class labels, allowing the model to differentiate between cars and trucks. vehicles classified as cars are displayed with peach-colored annotations, while trucks and semis are shown in green. once a vehicle is detected, the model assigns it a unique tracker id using bytetrack, ensuring consistent identification even as the vehicle moves across multiple frames.",
      },

      {
        type: "image",
        src: "/vtracker.png",
        alt: "E-commerce dashboard interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "to calculate speed, the model records the vertical position of each tracked vehicle over time. since cameras often capture footage from an elevated or angled perspective, the raw pixel displacement of a vehicle may not directly correlate to real-world movement. to address this, the model applies a perspective transformation using a predefined mapping between a source polygon (representing the detected region in the original frame) and a target rectangle (representing a standardized measurement plane). this transformation ensures that movements in the frame correspond proportionally to real-world distances, allowing the model to calculate speed accurately regardless of the camera angle.",
      },
      {
        type: "text",
        content:
          "the model maintains a history of tracked positions for each vehicle, storing them in a time-sequenced queue. when a vehicle has been tracked for long enough, the system calculates its displacement over a known time interval by comparing its initial and final transformed positions. since the frame rate of the video is known, the time elapsed between position updates can be precisely determined. the model then applies a simple kinematic formula, converting the displacement and time into speed, expressed in kilometers per hour.",
      },

      {
        type: "youtube",
        videoId: "S-3mQ_zNbvw",
        title: "Raw vs Processed Footage",
      },

      {
        type: "text",
        content:
          "this approach allows the system to work across different camera angles because the transformation matrix is adjustable. by defining a new source-target mapping specific to each camera setup, the model can adapt to various perspectives while maintaining accurate speed estimation. additionally, because vehicle classification is handled by yolo’s object detection network, it remains robust to changes in lighting, background, and road conditions, ensuring reliable classification of different vehicle types in diverse environments.",
      },
    ],
  },
  govcanada: {
    title: "Software Dev @ environment Canada",
    subtitle: "summer 2025 internship",
    year: "2025",
    type: "internship",
    image: "/gov2.png",
    contents: ["tbd"],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "i have started working as a software developer in the numerical terestrial environment prediction section of eccc this may. this section will be updated upon completion of the internship.",
      },
    ],
  },
  asd: {
    title: "ASD Prediction Model",
    subtitle: "machine learning prediction model",
    year: "2025",
    type: "project",
    image: "/asd.png",
    repoUrl: "https://github.com/dev-Armaan/autism-prediction",
    contents: [
      "dataset tuning",
      "data visualization",
      "supervised learning",
      "hyperparameter tuning",
      "model evaluation",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "more than 75,000,000 people worldwide have been diagnosed with autism spectrum disorder (asd), yet accurate diagnosis remains a challenge. a recent study by the journal of the american medical association found that medical teams could correctly diagnose asd in children only 60-89% of the time. given the scale of the condition, this means millions of individuals may be misdiagnosed or remain undiagnosed, leading to delayed interventions and inadequate support. this is where my model comes in—leveraging machine learning to enhance diagnostic accuracy and provide a data-driven approach to autism prediction.",
      },
      {
        type: "image",
        src: "/kdata.png",
        alt: "ASD prediction model correlation heatmap",
        width: 700,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the dataset used for training and testing originates from a kaggle community prediction competition. before building the model, i refined the dataset by removing irrelevant or incomplete columns, ensuring the data was clean, consistent, and optimized for machine learning. data visualization techniques, such as correlation heatmaps, were applied to identify relationships between different features, highlighting the most influential parameters contributing to asd prediction.",
      },

      {
        type: "image",
        src: "/asd.png",
        alt: "ASD prediction model correlation heatmap",
        width: 700,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "this project employs supervised learning algorithms, specifically the decision tree classifier and random forest classifier, to predict the likelihood of asd based on approximately 20 related parameters. decision trees are well-suited for this task as they can capture complex, nonlinear relationships in the data, while random forests, being an ensemble of multiple decision trees, enhance generalization and reduce the risk of overfitting.",
      },

      {
        type: "text",
        content:
          "to further improve model performance, i conducted hyperparameter tuning using grid search, systematically testing different parameter combinations to optimize accuracy. additionally, smote (synthetic minority over-sampling technique) was applied to address class imbalance, preventing the model from disproportionately favoring the majority class. class imbalance is a critical issue in medical datasets, where cases of a condition are often far fewer than non-cases, leading to biased predictions. smote generates synthetic examples for the minority class, ensuring a more balanced and fair learning process.",
      },

      {
        type: "image",
        src: "/asd-hyper.png",
        alt: "ASD prediction model correlation heatmap",
        width: 600,
        height: 600,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "to rigorously evaluate the model’s effectiveness, i implemented cross-validation, splitting the dataset into multiple subsets to assess performance across different test scenarios. the final model achieved a 93% cross-validation accuracy, surpassing the reported medical diagnosis accuracy range. this indicates that the model has strong potential for assisting healthcare professionals by offering an additional layer of decision support in asd diagnosis.",
      },

      {
        type: "text",
        content:
          "by carefully curating the dataset, applying advanced machine learning techniques, and optimizing hyperparameters, this model provides a reliable, efficient, and scalable approach to asd prediction. improving early detection can lead to timely interventions, personalized support, and better long-term outcomes for individuals with autism.",
      },
    ],
  },
  preppal: {
    title: "PrepPal",
    subtitle: "ai-powered interview prep bot",
    year: "2025",
    type: "project",
    image: "/preppal.png",
    repoUrl: "https://github.com/dev-Armaan/ai-interviewer",
    demoUrl: "https://preppal.work",
    contents: [
      "genai questions",
      "eye tracking",
      "progress dashboard",
      "24/7 accessibility",
      "genai feedback & analytics",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "preppal is an ai-powered interview preparation assistant designed to help users excel in various interview scenarios, whether technical, behavioral, or industry-specific. the platform simulates realistic mock interview sessions, providing personalized and interactive experiences tailored to each user’s needs. with preppal, candidates can practice anytime, anywhere, gaining valuable insights to improve their responses and boost confidence before the big day.",
      },
      {
        type: "image",
        src: "/pfeedback.png",
        alt: "Fitness app interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the core of preppal lies in its dynamic question-and-answer sessions. it offers users the ability to choose between different question sets, such as technical, behavioral, or domain-specific, ensuring a well-rounded preparation. after each session, the ai provides detailed feedback, highlighting strengths and areas for improvement, helping users to focus their efforts on what matters most. this feedback, combined with the system’s advanced analytics, enables users to track their progress over time, making continuous improvements in their interview skills.",
      },
      {
        type: "text",
        content:
          "an added feature includes a progress dashboard, which gives users an overview of their performance across different sessions, showing trends and offering suggestions for further practice. the system also integrates eye tracking using opencv to analyze and provide feedback on non-verbal cues during interviews, offering a comprehensive approach to interview preparation.",
      },
      {
        type: "text",
        content:
          "later, preppal integrated the gcp speech-to-text api, which allows users to practice their responses aloud and get instant transcriptions. this feature has significantly boosted user readiness by 40%, as users can review their spoken answers, refine their communication skills, and gain valuable insights into their verbal performance. this integration has been particularly popular, contributing to preppal gaining 100+ active users within just two weeks.",
      },

      {
        type: "youtube",
        videoId: "0uulnpFgpyc",
        title: "preppal demo",
      },

      {
        type: "text",
        content:
          "built with a robust tech stack, preppal combines frontend technologies like react.js and tailwind css with a flask-powered backend, integrating apis from openai and cohere for intelligent question generation and feedback. mysql and mongodb handle the data storage needs, while opencv and recharts provide additional functionality and data visualizations for the user interface.",
      },

      {
        type: "text",
        content:
          "preppal is available 24/7, offering flexibility to users who can practice at their own pace, whenever it suits them. whether you're preparing for a job interview or just sharpening your skills, preppal is here to help take your interview preparation to the next level.",
      },
    ],
  },
  v2world: {
    title: "Armaan's World [v2]",
    subtitle: "second iteration of my personal website",
    year: "2025",
    type: "project",
    repoUrl: "https://github.com/dev-Armaan/armaans-world-v2",
    image: "/aworld.png",
    contents: [
      "modern & responsive ui",
      "optimized performance",
      "integrated email functionality",
      "cross-device compatibility",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "you're on it right now! this is the second iteration of my personal portfolio website, designed with a sleek, modern, and fully responsive user interface. built using typescript, react, next.js, and tailwind css, the site provides a seamless experience across all devices while maintaining optimized performance. it serves as a central hub to showcase my skills, past experiences, projects, and more, offering an interactive and intuitive browsing experience.",
      },
      {
        type: "text",
        content:
          "leveraging next.js for server-side rendering and vite for fast builds, the website is designed for speed and efficiency. integrated email functionality via emailjs allows visitors to contact me directly, ensuring seamless communication. deployed on vercel, the site benefits from automatic optimizations and a globally distributed network for minimal load times.",
      },

      {
        type: "image",
        src: "/aworld3.png",
        alt: "Armaan's world v2 screenshot",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "beyond aesthetics, this portfolio emphasizes functionality and accessibility, ensuring a smooth experience whether viewed on a desktop, tablet, or mobile device. with a focus on performance, responsiveness, and a refined ui, this iteration of my portfolio represents a polished, professional, and interactive showcase of my work.",
      },
    ],
  },
  landingx: {
    title: "Founder @ LandingX",
    subtitle: "created a web dev company for business and personal purposes",
    year: "2024",
    type: "job",
    image: "/landingx.png",
    contents: [
      "app development",
      "client & team communication",
      "performance optimization",
      "cross-device compatability",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "as the ceo and founder of landingx, i focused on building modern, responsive web applications that met client needs through tailored, cutting-edge solutions. for each project, i first took the time to understand the specific requirements and objectives of the client, gathering insights into their target audience and business goals. using technologies like react.js and node.js, i created dynamic user interfaces and scalable backends to ensure the applications were not only functional but also aesthetically appealing.",
      },
      {
        type: "text",
        content:
          "i used three.js for interactive 3d visuals when the project demanded a more immersive user experience. leveraging tailwind css, i was able to quickly implement customizable styles while ensuring a consistent look and feel across devices, achieving seamless cross-device compatibility. to further ensure quality, i continuously tested applications on various screen sizes and browsers.",
      },

      {
        type: "image",
        src: "/lxinsta.png",
        alt: "Fitness app interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "on the deployment side, i utilized vercel and aws to host applications, optimizing performance through content delivery networks (cdns) and fine-tuning load times by up to 30%. in doing so, i ensured a smooth and fast user experience, even with high traffic.",
      },

      {
        type: "text",
        content:
          "my role also involved direct communication with clients, where i translated their needs into technical solutions, ensuring alignment between business objectives and the development process. i worked closely with team members, iterating on designs and implementing features based on feedback. my focus on client satisfaction led to a 95% client retention rate.",
      },

      {
        type: "image",
        src: "/lxdemo.png",
        alt: "Fitness app interface",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "by managing the full-stack development workflow using vite, npm, and git, i ensured seamless collaboration, version control, and deployment pipelines, which made the development process more efficient and streamlined. this allowed me to scale the business and deliver high-quality web applications to clients.",
      },
    ],
  },
  codeninjas: {
    title: "sensai & camp leader @ code ninjas",
    subtitle: "developed cirriculum & taught students",
    year: "2024",
    type: "job",
    image: "/cninjas2.png",
    contents: [
      "curriculum development",
      "game development",
      "code reviews",
      "collaboration with cross-functional teams",
      "edtech integration",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "during my time at code ninjas, i was responsible for developing an engaging programming curriculum for both beginners and intermediate learners. i focused on integrating lua, game development concepts, and computational thinking into the lessons to help students build a strong foundation in coding while keeping them engaged through interactive tutorials and games.",
      },
      {
        type: "text",
        content:
          "i designed and optimized educational games using lua and roblox studio, ensuring that students could apply what they learned in real-time through hands-on projects. by leveraging scripting apis, i enhanced game mechanics and interactivity, which increased student engagement and retention by 30%.",
      },

      {
        type: "image",
        src: "/cninjas3.png",
        alt: "code ninjas class",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "working closely with a cross-functional team, including designers and educators, i ensured the curriculum met industry standards and aligned with the latest trends in educational technology (edtech). i also conducted code reviews, providing feedback to learners to improve their coding skills and problem-solving abilities. this experience gave me a strong foundation in edtech integration, game development, and fostering a collaborative environment for effective learning.",
      },
    ],
  },
  v1world: {
    title: "Armaan's World [v1]",
    subtitle: "first iteration of my personal website",
    year: "2024",
    type: "project",
    image: "/v1aworld2.png",
    repoUrl: "https://github.com/dev-Armaan/armaans-world",
    contents: ["interactive 3d models", "modern ui", "vite tool", "email functionality", "aws amplify deployment"],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "this project is a personal portfolio website built with a clean and modern ui, featuring interactive 3d models that enhance the user experience. leveraging technologies like javascript, html/css, react, node.js, tailwind css, three.js, emailjs, and vite, i created a visually engaging site that showcases my skills, past experiences, and projects. the website includes links to my socials, resume, and a tech stack display, all presented with an intuitive layout.",
      },
      {
        type: "text",
        content:
          "one of the standout features of the site is the interactive 3d models, such as a customizable pc setup, floating tech stack balls, and a rotating globe, providing a dynamic and engaging browsing experience. the project is deployed using aws amplify, ensuring fast load times and reliable performance across devices.",
      },

      {
        type: "image",
        src: "/v1aworld.png",
        alt: "code ninjas class",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "email functionality was integrated using emailjs, allowing visitors to contact me directly through the website. the use of vite as a build tool ensures fast load times and an efficient development process. this portfolio demonstrates both my front-end development skills and my ability to integrate creative and interactive elements into web design.",
      },
    ],
  },
  tks: {
    title: "AI INNOVATOR @ TKS",
    subtitle: "9-month human accelerator program",
    year: "2024",
    type: "program",
    image: "/tks.png",
    repoUrl: "https://tks.life/profile/armaan.gupta#portfolio",
    contents: [
      "deep learning research",
      "cnn development & optimization",
      "technical competitions",
      "cibc & mastercard consulting",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "during my time at tks, i had the opportunity to work on some exciting, cutting-edge ai projects with a focus on leveraging machine learning to address real-world business challenges. one of the key projects i led was a comprehensive 8-year strategy for cibc to attract and retain genz customers. this strategy involved extensive research into customer behavior and preferences, and i used this data to design a mobile app prototype that integrated react, node.js, and aws for a scalable, efficient backend. the app included automation features to streamline the user experience and enhance personalization for genz users. this work required me to balance technical considerations with business needs, ensuring the solution aligned with cibc’s long-term goals.",
      },

      {
        type: "image",
        src: "/mnist.png",
        alt: "code ninjas class",
        width: 400,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "in addition to my work with cibc, i dedicated significant time to advancing my knowledge of deep learning, particularly in the areas of natural language processing (nlp) and computer vision (cv). my r&d work focused on optimizing cnn architectures, which led to breakthroughs like improving a text recognition model to 99.5% accuracy, while also enhancing its speed by 27%. i also applied these improvements to other classification tasks, boosting their performance by 15%. these results were a direct outcome of my experimentation with new techniques, such as incorporating attention mechanisms into the cnn, as well as my implementation of advanced data augmentation methods to address overfitting.",
      },

      {
        type: "image",
        src: "/tksmc.png",
        alt: "code ninjas class",
        width: 800,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "my efforts were recognized when i won separate technical competitions hosted by the mastercard foundation and cibc, which further cemented my understanding of how emerging technologies can be integrated into business operations. these wins opened doors for me to consult directly with executives at both organizations, where i provided insights into the future integration of ai and machine learning into their systems. through these consultations, i gained invaluable experience working with senior leaders to translate technical ideas into actionable business strategies, ensuring the seamless adoption of new technologies that drive innovation and competitive advantage.",
      },
    ],
  },
  hippocampus: {
    title: "cirriculum dev @ hippocampus",
    subtitle: "developed programming cirriculum",
    year: "2022",
    type: "job",
    image: "/hcampus2.jpg",
    contents: ["interactive learning", "consumer-focused modules", "cross-team collaboration", "code reviews"],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "at hippocampus learning, i played a key role in developing engaging, educational programming curriculums for beginner and intermediate students. collaborating closely with a cross-functional team, i helped create summer camp modules that balanced learning outcomes with fun, interactive content. using block-based programming platforms and robotics applications, i designed lesson plans that were both accessible and challenging, ensuring students developed key computational thinking skills while staying engaged.",
      },

      {
        type: "image",
        src: "/hcampus5.jpg",
        alt: "hippocampus class",
        width: 600,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "through regular communication with my superiors and team members, i ensured that each module aligned with the needs of the learners, while also pushing their boundaries in terms of programming concepts and problem-solving. one of my main responsibilities was to assess the educational materials and adapt them as needed to make sure they resonated with the students.",
      },

      {
        type: "image",
        src: "/hcampus4.jpg",
        alt: "hippocampus student",
        width: 600,
        height: 800,
        fullWidth: false,
      },

      {
        type: "text",
        content:
          "i also participated in code reviews, providing constructive feedback to young programmers on how they could improve their code, learn new techniques, and deepen their understanding of programming concepts. this experience helped me foster an environment of continuous learning, where students felt motivated to improve and were encouraged to take risks in their coding journey. overall, my work at hippocampus learning was a fulfilling opportunity to contribute to the next generation of coders while refining my skills in curriculum development, interactive learning, and teamwork.",
      },
    ],
  },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const projectSlug = Array.isArray(slug) ? slug[0] : slug

  const project = projectsData[projectSlug as keyof typeof projectsData]

  if (!project) {
    return <div>error: haven't built it yet, maybe sometime soon</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
        <div className="space-y-8">
          <Link
            href="/experiences"
            className="inline-flex items-center text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Back to experiences</span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            <p className="text-white/70">{project.subtitle}</p>
          </div>

          {/* repo link */}
          {project.repoUrl && (
            <motion.a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 space-x-2 bg-transparent border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 rounded-md button-animation"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 15px rgba(var(--accent), 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-5 w-5" />
              <span className="font-medium">view repo</span>
            </motion.a>
          )}

          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-white text-sm uppercase tracking-wider">experience info</h2>
              <br />
              <div className="space-y-4">
                <div>
                  <h3 className="text-white/60 text-sm uppercase">TYPE</h3>
                  <p>{project.type}</p>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm uppercase">YEAR</h3>
                  <p>{project.year}</p>
                </div>

                {/* Demo Link */}
                {project.demoUrl && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-white/60 text-sm uppercase">DEMO</h3>
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white/70 hover:text-gold transition-colors group"
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>view link</span>
                    </motion.a>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-white/60 text-sm uppercase tracking-wider">Contents</h2>
              <ul className="space-y-2">
                {project.contents.map((item, index) => (
                  <li key={index} className="text-white/80">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl text-center md:text-3xl font-bold uppercase">description</h2>

        <div className="text-white/80 space-y-8 leading-relaxed">
          {project.descriptionBlocks.map((block, index) => {
            if (block.type === "text") {
              return <p key={index}>{block.content}</p>
            } else if (block.type === "image") {
              return (
                <div key={index} className="my-12 flex justify-center">
                  <div className={block.fullWidth ? "w-full" : ""}>
                    <Image
                      src={block.src || "/placeholder.svg"}
                      alt={block.alt}
                      width={block.width}
                      height={block.height}
                      className="rounded-lg object-contain"
                    />
                    {block.caption && <p className="text-sm text-white/60 text-center mt-2">{block.caption}</p>}
                  </div>
                </div>
              )
            } else if (block.type === "youtube") {
              return <YouTubeEmbed key={index} {...block} />
            }
            return null
          })}
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
      <footer className="w-full py-4 text-center text-sm text-white/70 border-t border-white/10 mt-16">
        © {new Date().getFullYear()} armaan gupta. all rights reserved.
      </footer>
    </motion.div>
  )
}