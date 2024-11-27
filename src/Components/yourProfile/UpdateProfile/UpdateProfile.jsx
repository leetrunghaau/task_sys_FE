import UpdateProfileDesktop from "./UpdateProfileDesktop";
import UpdateProfileMobile from "./UpdateProfileMobile";
export default function UpdateProfile({ profile }) {
  return (
    <>
      {/* Desktop Layout 
       Show on screens larger than md */}
      <div className="hidden md:block">
        <UpdateProfileDesktop profile={profile} />
      </div>
      {/* Mobile Layout 
       Show on screens smaller than md */}
      <div className="block md:hidden">
        <UpdateProfileMobile profile={profile} />
      </div>
    </>
  );
}
