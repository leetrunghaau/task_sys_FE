import UpComingTaskDesktop from "./UpcomingTaskDesktop";
import UpComingTaskMobile from "./UpComingTaskMobile";

export default function UpcomingTask() {
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
