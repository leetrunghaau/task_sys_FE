import CardDesktop from "./CardDesktop";
import CardMobile from "./CardMobile";
export default function Projects() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <CardDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <CardMobile />
      </div>
    </>
  );
}
