import { Icon, Logo } from "@snippy/primitives"
import { useSession } from "next-auth/react"
import { ReactNode, useEffect, useState } from "react"
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

export const Sidebar = () => {
  const { data } = useSession();
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    if (data?.user?.image) {
      setProfile(data?.user?.image)
    }
  }, [data?.user]);

  return (
    <div className="flex flex-col align-center justify-between h-screen px-6 py-10 border-r-[1px] border-r-slate-border">
      <div>
        <Logo size={32} />
      </div>

      <div className="flex flex-col align-center justify-center gap-4">
        <Link href="/lists">
          <SidebarButton>
            <Icon type="regular" name="list-ul" size={28} color="rgba(255, 255, 255, 0.9)" />
          </SidebarButton>
        </Link>

        <Link href="/collections">
          <SidebarButton>
            <Icon type="regular" name="folder" size={28} color="rgba(255, 255, 255, 0.9)" />
          </SidebarButton>
        </Link>
      </div>

      <div>
        <DropdownMenuPrimitive.Root>
          <DropdownMenuPrimitive.Trigger className="border-white rounded-full outline-none cursor-pointer">
            <img src={profile!} className="max-h-fit max-w-[32px] rounded-full" />
          </DropdownMenuPrimitive.Trigger>

          <DropdownMenuPrimitive.Content className="bg-slate-border px-8 py-3 text-cyan-8 m-2 rounded-xl">
            <DropdownMenuPrimitive.Item onClick={() => signOut()} className="outline-none w-full cursor-pointer flex align-center gap-2">
              <Icon size={16} type="regular" name="log-out" className="my-auto" />
              Logout
            </DropdownMenuPrimitive.Item>
          </DropdownMenuPrimitive.Content>

        </DropdownMenuPrimitive.Root>
      </div>
    </div>
  )
}


interface ISidebarButtonProps {
  children: ReactNode;
}
const SidebarButton = ({ children }: ISidebarButtonProps) => (
  <button className="active:scale-95 outline-none transition-all duration-300">
    {children}
  </button>
)