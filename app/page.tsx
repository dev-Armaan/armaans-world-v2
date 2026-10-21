import HomeContent from "@/components/home-content"
import { getFeaturedProjects } from "@/lib/projects"

export default function Home() {
  const featured = getFeaturedProjects().map(({ slug, title, shortTitle, summary, year, type, image, cardImage, imageFit }) => ({
    slug,
    title: shortTitle ?? title,
    summary,
    year,
    type,
    image: cardImage ?? image,
    imageFit: imageFit ?? "cover",
  }))

  return <HomeContent featured={featured} />
}
