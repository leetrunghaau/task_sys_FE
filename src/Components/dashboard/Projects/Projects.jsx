import ProjectsDesktop from "./ProjectsDesktop";
import ProjectsMobile from "./ProjectsMobile";

export default function Projects({ projects }) {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block  w-full">
        <ProjectsDesktop projects={projects} />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden  w-full">
        <ProjectsMobile />
      </div>
    </>
  );
}
