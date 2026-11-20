import { type Project, projects } from "@/data/projects"
import WorkThumbnail from "./work-thumbnail"

function destinationName(href: string) {
  try {
    const { hostname } = new URL(href)
    return hostname || "Untitled project"
  } catch {
    return "Untitled project"
  }
}

export default function ProjectShowcase({ items = projects }: { items?: readonly Project[] }) {
  if (items.length === 0) {
    return <p className="work-empty">No projects to show yet.</p>
  }

  return (
    <div className="project-grid">
      {items.map((project) => (
        <article className="work-card" key={project.id}>
          <a
            className="work-card-link"
            href={project.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <WorkThumbnail src={project.thumbnail} />
            <div className="work-card-copy">
              <h3>{project.title.trim() || destinationName(project.href)}</h3>
              {project.category.trim() ? (
                <p className="work-card-meta">{project.category}</p>
              ) : null}
            </div>
            <span className="sr-only">Opens in a new tab</span>
          </a>
        </article>
      ))}
    </div>
  )
}
