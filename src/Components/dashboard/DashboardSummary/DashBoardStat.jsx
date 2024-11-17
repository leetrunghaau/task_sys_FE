import DashBoardStatDesktop from "./DashBoardStatDesktop";
import DashBoardStatMobile from "./DashBoardStatMobile";
export default function DashBoardStat() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <DashBoardStatDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <DashBoardStatMobile />
      </div>
    </>
  );
}
