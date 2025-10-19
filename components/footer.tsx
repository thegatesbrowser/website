import { Mail, Github } from "lucide-react"

const footerLinks = {
  Resources: ["Documentation", "GitHub", "TheGates Docs", "Godot Engine"],
  Community: ["Discord", "Forum", "Issues", "Discussions"],
}

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Mail, href: "#", label: "Email" },
]

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-foreground/60 text-sm">TheGates Export Plugin for Godot Engine</p>
      </div>
    </footer>
  )
}
