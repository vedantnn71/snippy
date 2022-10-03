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
          <h1 className="text-4xl text-gray-1 font-bold">Snippy</h1>
        </div>
      </Link>

      <div className="pt-8 pb-12 px-12 shadow-primary rounded-2xl">
        <div className="flex animate-fade-in flex-col justify-center text-center">
          <span className="text-sm font-medium text-gray-9 mb-6">Sign in with</span>

          <div className="grid lg:grid-cols-2 sm:grid-rows-4 lg:grid-rows-2 md:grid-cols-1 gap-5">
            <OAuthButton provider="google" />
            <OAuthButton provider="github" />
            <OAuthButton provider="twitter" />
            <OAuthButton provider="facebook" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn