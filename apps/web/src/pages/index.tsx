import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "loading") {
      return;
    }

    if (session.status === "authenticated") {
      router.push("/lists");
    }

    if (session.status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session.status]);

  return <></>;
};

export default Home;
