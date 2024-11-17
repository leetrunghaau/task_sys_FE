import ProjectsDesktop from "./ProjectsDesktop";
import ProjectsMobile from "./ProjectsMobile";

export default function Projects() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <ProjectsDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <ProjectsMobile />
      </div>
    </>
  );
}
