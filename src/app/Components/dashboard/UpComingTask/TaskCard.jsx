import TaskCardDesktop from "./TaskCardDesktop";
import TaskCardMobile from "./TaskCardMobile";

export default function TaskCard() {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <TaskCardDesktop />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <TaskCardMobile />
      </div>
    </>
  );
}
