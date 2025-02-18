import UserProfile from "../components/profile/UserProfile";
import Password from "../components/profile/Password";
import { useUserStore } from "../lib/slice/user";

export default function Profile() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  return (
    <div className="flex flex-col px-4 py-10 gap-5 max-w-5xl mx-auto">
      <UserProfile user={user} />
      <Password user={user} />
    </div>
  );
}
