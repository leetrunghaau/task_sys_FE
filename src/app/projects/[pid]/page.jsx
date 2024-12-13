"use client";
import { useParams } from "next/navigation";
import ProjectInfo from "../../../Components/project/ProjectInfo"

export default function ProjectPage() {
  const params = useParams();
  const { pid } = params;
  
  return (
    <ProjectInfo pId={pid}/>
  );
}
