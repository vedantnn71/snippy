import { OAuthButton } from "@/components";
import { Logo } from "@snippy/primitives";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const SignIn: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/lists");
    }
  }, [session.status]);

  return (
    <div className="bg-gray-12 flex min-h-screen flex-col items-center justify-center space-y-8 py-12 sm:px-6 lg:space-y-12 lg:px-8">
      <Link href="/">
        <div className="flex flex-row items-center gap-4">
          <Logo />
          <h1 className="text-gray-1 text-4xl font-bold">Snippy</h1>
        </div>
      </Link>

      <div className="shadow-primary rounded-2xl px-12 pt-8 pb-12">
        <div className="animate-fade-in flex flex-col justify-center text-center">
          <span className="text-gray-9 mb-6 text-sm font-medium">
            Sign in with
          </span>

          <div className="grid gap-5 sm:grid-rows-4 md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2">
            <OAuthButton provider="google" />
            <OAuthButton provider="github" />
            <OAuthButton provider="twitter" />
            <OAuthButton provider="facebook" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
