import InfoCardDesktop from "./InfoCardDesktop";
import InfoCardMobile from "./InfoCardMobile";
export default function InfoCard({ profile }) {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <InfoCardDesktop profile={profile} />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <InfoCardMobile profile={profile} />
      </div>
    </>
  );
}
