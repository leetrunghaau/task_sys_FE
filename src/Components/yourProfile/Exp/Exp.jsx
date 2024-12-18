import ExpDesktop from "./ExpDesktop";
import ExpMobile from "./ExpMobile";
export default function Projects() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block w-full">
        <ExpDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <ExpMobile />
      </div>
    </>
  );
}
