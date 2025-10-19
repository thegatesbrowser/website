"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          <span className="font-bold text-xl text-foreground">TheGates Export</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#workflow" className="text-foreground/70 hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#asset-library" className="text-foreground/70 hover:text-foreground transition-colors">
            Asset Library
          </a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Plugin</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-foreground/70 hover:text-foreground">
              Features
            </a>
            <a href="#workflow" className="block text-foreground/70 hover:text-foreground">
              How It Works
            </a>
            <a href="#asset-library" className="block text-foreground/70 hover:text-foreground">
              Asset Library
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Plugin</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
