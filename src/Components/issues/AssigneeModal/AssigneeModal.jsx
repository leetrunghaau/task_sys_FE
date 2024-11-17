import AssigneeModalDesktop from "./AssigneeModalDesktop";
import AssigneeModalMobile from "./AssigneeModalMobile";

export default function AssigneeModal() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <AssigneeModalDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <AssigneeModalMobile />
      </div>
    </>
  );
}
