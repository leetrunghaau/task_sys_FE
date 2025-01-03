"use client";
import { Flex } from "@chakra-ui/react";
import InfoCard from "../../Components/yourProfile/InfoCard/InfoCard";
import Exp from "../../Components/yourProfile/Exp/Exp";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/API/authAPI";
import { useAuthRedirect } from "../../utils/useAuthRedirect";
import ExpDesktop from "../../Components/yourProfile/Exp/ExpDesktop";
export default function YourProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useAuthRedirect();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();

        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile(); // Call the function to fetch profile data
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="hidden md:block">
        <Flex w="100%" h="100vh">
          <InfoCard profile={profile} />
          <ExpDesktop />
        </Flex>
      </div>
      <div className="block md:hidden">
        <Flex flexDir={"column"} align={"start"}>
          <InfoCard profile={profile} />
          <Exp />
        </Flex>
      </div>
    </>
  );
}
