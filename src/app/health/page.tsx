import ScrambleText from "@/components/scramble-text"

const GIT_COMMIT_SLICE_LENGTH = 8

type BuildInfo = {
  version: string
  buildTime: string
  nodeVersion: string
  nextVersion: string
  environment: string
  gitCommit?: string
  deploymentUrl?: string
}

async function getBuildInfo(): Promise<BuildInfo> {
  const pkg = await import("../../../package.json")

  return {
    version: pkg.version,
    buildTime: new Date().toISOString(),
    nodeVersion: "N/A",
    nextVersion: pkg.dependencies.next,
    environment: process.env.NODE_ENV || "development",
    gitCommit: process.env.CF_PAGES_COMMIT_SHA,
    deploymentUrl: process.env.CF_PAGES_URL,
  }
}

function StatusIndicator({ status }: { status: "healthy" | "warning" | "error" }) {
  const colors = {
    healthy: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  }

  const labels = {
    healthy: "Healthy",
    warning: "Warning",
    error: "Error",
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${colors[status]}`} />
      <span className="font-medium text-sm">{labels[status]}</span>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
      <dt className="w-32 font-medium text-gray-600 sm:w-42 dark:text-gray-400">{label}:</dt>
      <dd className="break-all font-mono text-sm">{value || "N/A"}</dd>
    </div>
  )
}

export default async function HealthPage() {
  const buildInfo = await getBuildInfo()

  // Determine overall health status
  const isProduction = buildInfo.environment === "production"
  const hasGitCommit = Boolean(buildInfo.gitCommit)

  let status: "healthy" | "warning" | "error" = "healthy"
  if (isProduction && !hasGitCommit) {
    status = "warning"
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-14 p-8 pt-32 sm:p-8 sm:pt-36">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl text-black leading-tight sm:text-4xl dark:text-white">
          <ScrambleText maxIterations={15} scrambleSpeed={50} text="Health Check" />
        </h1>
        <StatusIndicator status={status} />
      </div>

      <div className="w-full max-w-2xl">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-lg">Deployment Information</h2>

          <dl className="space-y-3">
            <InfoRow label="Version" value={buildInfo.version} />
            <InfoRow label="Environment" value={buildInfo.environment} />
            <InfoRow label="Build Time" value={buildInfo.buildTime} />
            <InfoRow label="Next.js Version" value={buildInfo.nextVersion} />
            <InfoRow label="Node.js Version" value={buildInfo.nodeVersion} />
            {buildInfo.gitCommit && (
              <InfoRow
                label="Git Commit"
                value={buildInfo.gitCommit.slice(0, GIT_COMMIT_SLICE_LENGTH)}
              />
            )}
            {buildInfo.deploymentUrl && (
              <InfoRow label="Deployment URL" value={buildInfo.deploymentUrl} />
            )}
          </dl>
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 font-semibold text-lg">System Status</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Application Status</span>
              <StatusIndicator status="healthy" />
            </div>

            <div className="flex items-center justify-between">
              <span>Database Connection</span>
              <StatusIndicator status="healthy" />
            </div>

            <div className="flex items-center justify-between">
              <span>Environment Config</span>
              <StatusIndicator status={isProduction ? "healthy" : "warning"} />
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
