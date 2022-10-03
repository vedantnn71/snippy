import { Icon } from "@snippy/primitives";
import { Button } from "@snippy/primitives";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface IOAuthButton {
  provider: "github" | "google" | "twitter" | "facebook";
}

export const OAuthButton = ({ provider }: IOAuthButton) => {
  const [loading, setLoading] = useState(false);

  const handleOAuth = async () => {
    setLoading(true);
    await signIn(provider);
    setLoading(false);
  };

  return (
    <Button
      size="md"
      color="secondary"
      disabled={loading}
      loading={loading}
      onClick={handleOAuth}
    >
      <Icon name={provider} size={24} type="logos" color="#fff" />
      <span className="text-sm">{`Sign in with ${provider}`}</span>
    </Button>
  );
};
