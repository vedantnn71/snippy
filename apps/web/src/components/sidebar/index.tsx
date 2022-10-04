import { Icon, Logo } from "@snippy/primitives";
import { SidebarButton } from "./button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const Sidebar = () => {
  const { data } = useSession();
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    if (data?.user?.image) {
      setProfile(data?.user?.image);
    }
  }, [data?.user]);

  return (
    <div className="align-center border-r-slate-border flex h-screen flex-col justify-between border-r-[1px] px-6 py-10">
      <div>
        <Logo size={32} />
      </div>

      <div className="align-center flex flex-col justify-center gap-4">
        <Link href="/lists">
          <SidebarButton>
            <Icon
              type="regular"
              name="list-ul"
              size={28}
              color="rgba(255, 255, 255, 0.9)"
            />
          </SidebarButton>
        </Link>

        <Link href="/collections">
          <SidebarButton>
            <Icon
              type="regular"
              name="folder"
              size={28}
              color="rgba(255, 255, 255, 0.9)"
            />
          </SidebarButton>
        </Link>
      </div>

      <div>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger className="cursor-pointer rounded-full border-white outline-none">
            <img
              src={profile!}
              className="max-h-fit max-w-[32px] rounded-full"
            />
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Content className="bg-slate-border text-cyan-8 m-2 rounded-xl px-8 py-3">
            <DropdownMenuPrimitive.Item
              onClick={() => signOut()}
              className="align-center flex w-full cursor-pointer gap-2 outline-none"
            >
              <Icon
                size={16}
                type="regular"
                name="log-out"
                className="my-auto"
              />
              Logout
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Root>
      </div>
    </div>
  );
};
