import RecentTaskDesktop from "./RecentTaskDesktop";
import RecentTaskMobile from "./RecentTaskMobile";

export default function RecentTask() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <RecentTaskDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <RecentTaskMobile />
      </div>
    </>
  );
}
