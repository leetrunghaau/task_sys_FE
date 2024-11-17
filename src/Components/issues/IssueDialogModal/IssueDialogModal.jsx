import IssueDialogModalDesktop from "./IssueDialogModalDesktop";
import IssueDialogModalMobile from "./IssueDialogModalMobile";

export default function IssueDialogModal({ name }) {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <IssueDialogModalDesktop name={name} />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <IssueDialogModalMobile />
      </div>
    </>
  );
}
