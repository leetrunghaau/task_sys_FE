import UpComingTaskDesktop from "./UpDomingTaskDesktop";
import UpComingTaskMobile from "./UpDomingTaskMobile";

export default function UpComingTask() {
  return (
    <>
      {/* Desktop Layout
       Show on screens larger than md */}
      <div className="hidden md:block">
        <UpComingTaskDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <UpComingTaskMobile />
      </div>
    </>
  );
}
