import Hero from "@/components/hero"
import Features from "@/components/features"
import Workflow from "@/components/workflow"
import Preview from "@/components/preview"
import AssetLibrary from "@/components/asset-library"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Workflow />
      <Preview />
      <AssetLibrary />
      <Footer />
    </main>
  )
}
