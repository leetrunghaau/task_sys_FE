"use client";
import { Flex } from "@chakra-ui/react";
import InfoCard from "../../Components/yourProfile/InfoCard/InfoCard";
import Exp from "../../Components/yourProfile/Exp/Exp";
import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/API/authAPI";

export default function YourProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Flex px={{ base: 2, md: 6 }} gap="10">
      <InfoCard profile={profile} />
      <Exp />
    </Flex>
  );
}
