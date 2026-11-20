import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function WorkCardsStressPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound()
  }

  const { default: StressHarness } = await import("./stress-harness")
  return <StressHarness />
}
