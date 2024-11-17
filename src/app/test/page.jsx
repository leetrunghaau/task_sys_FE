"use client";
import { useState } from "react";
import { getUserProfile } from "../../services/API/authAPI";

export default function TestConnection() {
  const [result, setResult] = useState(null);

  const handleGetUserProfile = async () => {
    try {
      const data = await getUserProfile();
      setResult(data);
    } catch (error) {
      setResult("Failed to connect. See console for details.");
    }
  };

  return (
    <div>
      <button onClick={handleGetUserProfile}>Get Profile</button>
      {result && (
        <div>
          <h3>Connection Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
