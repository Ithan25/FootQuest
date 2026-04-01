import { redirect } from "next/navigation";
import { getProfile } from "./actions";
import { ProfileClient } from "./profile-client";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) redirect("/login");

  return <ProfileClient initialProfile={profile} />;
}
