type SectionSkeletonProps = {
  titleWidth?: string
  titleHeight?: string
  itemCount?: number
  itemHeight?: string
}

// Loading component for each section
export function SectionSkeleton({
  titleWidth = "w-24",
  titleHeight = "h-8",
  itemCount = 3,
  itemHeight = "h-6",
}: SectionSkeletonProps) {
  const skeletonItems = Array.from({ length: itemCount }, (_, i) => `skeleton-${i + 1}`)

  return (
    <section className="flex flex-col gap-4">
      <div
        className={`${titleHeight} ${titleWidth} animate-pulse rounded bg-gray-400 dark:bg-gray-400`}
      />
      <ol className="flex flex-col gap-1 sm:text-lg">
        {skeletonItems.map((item) => (
          <li key={item}>
            <div className={`${itemHeight} animate-pulse rounded bg-gray-400 dark:bg-gray-400`} />
          </li>
        ))}
      </ol>
    </section>
  )
}

export default SectionSkeleton
