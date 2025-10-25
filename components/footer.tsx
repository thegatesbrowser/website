"use client"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 py-8">
        <div className="relative flex w-full flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-end sm:text-right">
          <a
            href="https://thegates.io/export-plugin/terms"
            className="text-sm text-foreground/50 transition-colors hover:text-foreground/65 sm:text-left sm:absolute sm:left-0"
            rel="noopener noreferrer"
            target="_blank"
          >
            Terms of Service
          </a>
          <p className="text-foreground/60 text-sm sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:text-center sm:transform">TheGates Export Plugin for Godot Engine</p>
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/50 sm:ml-auto sm:justify-end">
            <a
              href="https://thegates.io/"
              className="transition-colors hover:text-foreground/65"
              rel="noopener noreferrer"
              target="_blank"
            >
              TheGates Website
            </a>
            <span className="text-foreground/30">•</span>
            <a
              href="https://docs.thegates.io"
              className="transition-colors hover:text-foreground/65"
              rel="noopener noreferrer"
              target="_blank"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
