import type { Metadata } from "next"

import TermsOfService from "@/components/terms"

export const metadata: Metadata = {
  title: "Export Plugin Terms of Service",
  description:
    "Review the terms of service that govern how TheGates Export Plugin hosts and delivers your Godot projects.",
}

export default function TermsOfServicePage() {
  return <TermsOfService />
}
