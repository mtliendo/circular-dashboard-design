import { ProjectDetailPage } from "@/components/project-detail-page"

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetailPage projectId={Number.parseInt(params.id)} />
}
