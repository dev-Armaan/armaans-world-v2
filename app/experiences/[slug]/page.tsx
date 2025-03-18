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

type ContentBlock = TextBlock | ImageBlock

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
  "e-commerce": {
    title: "E-commerce Platform",
    subtitle: "A full-stack e-commerce solution",
    year: "2023",
    type: "Web Application",
    image: "/placeholder.svg?height=800&width=1200",
    repoUrl: "https://github.com/yourusername/e-commerce",
    demoUrl: "https://e-commerce-demo.example.com",
    contents: [
      "User Authentication",
      "Product Management",
      "Shopping Cart",
      "Payment Processing",
      "Order Management",
      "Analytics Dashboard",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "This e-commerce platform is a comprehensive solution for online retail businesses. It features a modern, responsive design with a focus on user experience and performance.",
      },
      {
        type: "text",
        content:
          "The platform connects customers with products through an intuitive interface, while providing merchants with powerful tools to manage their inventory, process orders, and analyze sales data.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=800&width=1200",
        alt: "E-commerce dashboard interface",
        width: 1200,
        height: 800,
        fullWidth: true,
      },
      {
        type: "text",
        content:
          "Built with scalability in mind, the architecture can handle high traffic volumes and integrates seamlessly with various payment processors and shipping providers.",
      },
    ],
  },
  "ai-generator": {
    title: "AI Content Generator",
    subtitle: "Web application for AI-powered content creation",
    year: "2022",
    type: "SaaS Product",
    image: "/placeholder.svg?height=800&width=1200",
    repoUrl: "https://github.com/yourusername/ai-generator",
    contents: [
      "Text Generation",
      "Image Creation",
      "Content Templates",
      "Export Options",
      "User Management",
      "API Integration",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "The AI Content Generator is a powerful tool that leverages artificial intelligence to create high-quality content for marketing, social media, and other digital platforms.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=800&width=1200",
        alt: "AI Generator interface",
        width: 1200,
        height: 800,
        fullWidth: true,
      },
      {
        type: "text",
        content:
          "Users can generate blog posts, social media captions, product descriptions, and more with just a few clicks. The application also includes image generation capabilities, allowing users to create custom visuals to accompany their text.",
      },
      {
        type: "text",
        content:
          "The platform includes a robust API that allows businesses to integrate content generation into their existing workflows and applications.",
      },
    ],
  },
  dashboard: {
    title: "gurmukhK",
    subtitle: "Interactive data visualization platform",
    year: "2022",
    type: "Enterprise Software",
    image: "/placeholder.svg?height=800&width=1200",
    repoUrl: "https://github.com/yourusername/dashboard",
    demoUrl: "https://dashboard-demo.example.com",
    contents: [
      "Real-time Data",
      "Custom Charts",
      "Financial Reporting",
      "Data Export",
      "User Permissions",
      "Alerts & Notifications",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "The Financial Dashboard is a sophisticated data visualization platform designed for financial analysts and business executives. It transforms complex financial data into intuitive, interactive visualizations that make it easy to identify trends and make informed decisions.",
      },
      {
        type: "text",
        content:
          "The dashboard features real-time data updates, customizable charts and graphs, and comprehensive reporting tools. Users can drill down into specific metrics, compare performance across different time periods, and export data for further analysis.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=800&width=1200",
        alt: "Dashboard interface",
        width: 1200,
        height: 800,
        fullWidth: true,
      },
      {
        type: "text",
        content:
          "Security and user permissions are built into the core of the application, ensuring that sensitive financial information is only accessible to authorized personnel.",
      },
    ],
  },
  govcanada: {
    title: "Software Dev @ Government of Canada",
    subtitle: "summer 2025 internship",
    year: "2025",
    type: "internship",
    image: "/gov2.png",
    contents: ["TBD"],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "I will be working as a software developer at the government of canada (eccc division) starting in may 2025",
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
      "Dataset Tuning",
      "Data Visualization",
      "Supervised Learning",
      "Hyperparameter Tuning",
      "Model Evaluation",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "more than 75,000,000 people worldwide have been diagnosed with autism spectrum disorder (asd). however, a recent study by the journal of the american medical association found that medical teams could only accurately diagnose asd in children 60-89% of the time. given the sheer scale of the condition, this means millions of people are misdiagnosed every year, leading to delayed interventions and inadequate support. this is where my model comes in.",
      },
      {
        type: "image",
        src: "/kdata.png",
        alt: "ASD prediction model correlation heatmap",
        width: 600,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "the dataset used for training and testing comes from a kaggle community prediction competition. before building the model, i refined the dataset by removing irrelevant or incomplete columns and normalizing the data to ensure consistency. data visualization techniques, including correlation heatmaps, were used to uncover relationships between different features, helping identify the most influential parameters for prediction.",
      },

      {
        type: "image",
        src: "/asd.png",
        alt: "ASD prediction model correlation heatmap",
        width: 600,
        height: 600,
        fullWidth: false,
      },
      {
        type: "text",
        content:
          "this project leverages supervised learning models, specifically the decision tree classifier and random forest classifier, to predict asd likelihood based on approximately 20 related parameters. to enhance model performance, i fine-tuned hyperparameters using grid search and implemented smote (synthetic minority over-sampling technique) to handle class imbalance, ensuring the model didn’t favor the majority class.",
      },

      {
        type: "text",
        content:
        "to evaluate the model's effectiveness, i used cross-validation, measuring its accuracy across different subsets of the data. the final model achieved a 93% cross-validation accuracy, surpassing the reported medical diagnosis accuracy range."
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
        content: "by carefully tuning the dataset, applying advanced machine learning techniques, and optimizing hyperparameters, this model aims to improve the early and reliable detection of autism, potentially reducing misdiagnosis rates and aiding in timely support and intervention."
      }
    ],
  },
  "fitness-app": {
    title: "Mobile Fitness App",
    subtitle: "Cross-platform health and fitness tracker",
    year: "2021",
    type: "Mobile Application",
    image: "/placeholder.svg?height=800&width=1200",
    repoUrl: "https://github.com/yourusername/fitness-app",
    demoUrl: "https://fitness-app-demo.example.com",
    contents: [
      "Workout Tracking",
      "Nutrition Logging",
      "Progress Analytics",
      "Social Features",
      "Personalized Plans",
      "Health Integrations",
    ],
    descriptionBlocks: [
      {
        type: "text",
        content:
          "The Mobile Fitness App is a comprehensive health and fitness tracking solution available on iOS and Android. It helps users track their workouts, monitor nutrition, and analyze their progress over time.",
      },
      {
        type: "image",
        src: "/placeholder.svg?height=800&width=1200",
        alt: "Fitness app interface",
        width: 1200,
        height: 800,
        fullWidth: true,
      },
      {
        type: "text",
        content:
          "The app includes a library of exercises with video demonstrations, customizable workout plans, and a nutrition database for easy meal logging. Users can set goals, track their progress, and share their achievements with friends.",
      },
      {
        type: "text",
        content:
          "Integration with health platforms like Apple Health and Google Fit allows for a holistic view of the user's health data, including steps, heart rate, and sleep patterns.",
      },
    ],
  },
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const projectSlug = Array.isArray(slug) ? slug[0] : slug

  const project = projectsData[projectSlug as keyof typeof projectsData]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-16">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16">
        <div className="space-y-8">
          <Link href="/experiences" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Back to experiences</span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            <p className="text-white/70">{project.subtitle}</p>
          </div>

          {/* Repo link */}
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
              <h2 className="text-white text-sm uppercase tracking-wider">PROJECT INFO</h2>
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
                      <span>Live Demo</span>
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
        <h2 className="text-2xl md:text-3xl font-bold uppercase">
          {project.title.split(" ")[0]} {project.title.split(" ")[1] || ""}
        </h2>

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
            }
            return null
          })}
        </div>
      </div>
    </motion.div>
  )
}

