"use client";
import ProjectMembers from "../../../../Components/project/ProjectMembers";
import { useParams } from "next/navigation";

export default function MembersPage() {
  const params = useParams();
  const { pid } = params;

  return (
    <>
      <ProjectMembers id={pid} />;
    </>
  );
}
