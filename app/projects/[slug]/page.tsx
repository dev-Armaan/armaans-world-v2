"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

const projectsData = {
  "e-commerce": {
    title: "E-commerce Platform",
    subtitle: "A full-stack e-commerce solution",
    year: "2023",
    type: "Web Application",
    image: "/placeholder.svg?height=800&width=1200",
    contents: [
      "User Authentication",
      "Product Management",
      "Shopping Cart",
      "Payment Processing",
      "Order Management",
      "Analytics Dashboard",
    ],
    description: `
      This e-commerce platform is a comprehensive solution for online retail businesses. 
      It features a modern, responsive design with a focus on user experience and performance.
      
      The platform connects customers with products through an intuitive interface, while providing
      merchants with powerful tools to manage their inventory, process orders, and analyze sales data.
      
      Built with scalability in mind, the architecture can handle high traffic volumes and integrates
      seamlessly with various payment processors and shipping providers.
    `,
  },
  "ai-generator": {
    title: "AI Content Generator",
    subtitle: "Web application for AI-powered content creation",
    year: "2022",
    type: "SaaS Product",
    image: "/placeholder.svg?height=800&width=1200",
    contents: [
      "Text Generation",
      "Image Creation",
      "Content Templates",
      "Export Options",
      "User Management",
      "API Integration",
    ],
    description: `
      The AI Content Generator is a powerful tool that leverages artificial intelligence to create
      high-quality content for marketing, social media, and other digital platforms.
      
      Users can generate blog posts, social media captions, product descriptions, and more with
      just a few clicks. The application also includes image generation capabilities, allowing
      users to create custom visuals to accompany their text.
      
      The platform includes a robust API that allows businesses to integrate content generation
      into their existing workflows and applications.
    `,
  },
  "dashboard": {
    title: "gurmukhK ",
    subtitle: "Interactive data visualization platform",
    year: "2022",
    type: "Enterprise Software",
    image: "/placeholder.svg?height=800&width=1200",
    contents: [
      "Real-time Data",
      "Custom Charts",
      "Financial Reporting",
      "Data Export",
      "User Permissions",
      "Alerts & Notifications",
    ],
    description: `
      The Financial Dashboard is a sophisticated data visualization platform designed for financial
      analysts and business executives. It transforms complex financial data into intuitive,
      interactive visualizations that make it easy to identify trends and make informed decisions.
      
      The dashboard features real-time data updates, customizable charts and graphs, and
      comprehensive reporting tools. Users can drill down into specific metrics, compare performance
      across different time periods, and export data for further analysis.
      
      Security and user permissions are built into the core of the application, ensuring that
      sensitive financial information is only accessible to authorized personnel.
    `,
  },
  "govcanada": {
    title: "Software Dev @ Government of Canada",
    subtitle: "summer 2025 internship",
    year: "2025",
    type: "internship",
    image: "/gov2.png",
    contents: [
      "TBD",
    ],
    description: `
      i will be working as a software developer at the government of canada (eccc division) starting in may 2025
    `,
  },
  "asd": {
    title: "ASD Prediction Model",
    subtitle: "machine learning prediction model",
    year: "2025",
    type: "project",
    image: "/asd.png",
    contents: [
      "TBD",
    ],
    description: `
      i will be working as a software developer at the government of canada (eccc division) starting in may 2025
    `,
  },
  "fitness-app": {
    title: "Mobile Fitness App",
    subtitle: "Cross-platform health and fitness tracker",
    year: "2021",
    type: "Mobile Application",
    image: "/placeholder.svg?height=800&width=1200",
    contents: [
      "Workout Tracking",
      "Nutrition Logging",
      "Progress Analytics",
      "Social Features",
      "Personalized Plans",
      "Health Integrations",
    ],
    description: `
      The Mobile Fitness App is a comprehensive health and fitness tracking solution available
      on iOS and Android. It helps users track their workouts, monitor nutrition, and analyze
      their progress over time.
      
      The app includes a library of exercises with video demonstrations, customizable workout
      plans, and a nutrition database for easy meal logging. Users can set goals, track their
      progress, and share their achievements with friends.
      
      Integration with health platforms like Apple Health and Google Fit allows for a holistic
      view of the user's health data, including steps, heart rate, and sleep patterns.
    `,
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
          <Link href="/projects" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm uppercase tracking-wider">Back to experiences</span>
          </Link>

          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            <p className="text-white/70">{project.subtitle}</p>
          </div>

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

        <div className="text-white/80 space-y-4 leading-relaxed">
          {project.description.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph.trim()}</p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

