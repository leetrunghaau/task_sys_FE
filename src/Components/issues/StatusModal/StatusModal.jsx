import StatusModalDesktop from "./StatusModalDesktop";
import StatusModalMobile from "./StatusModalMobile";

export default function StatusModal({ statuses }) {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <StatusModalDesktop statuses={statuses} />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <StatusModalMobile />
      </div>
    </>
  );
}
