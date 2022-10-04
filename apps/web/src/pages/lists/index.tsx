import { Sidebar } from "@/components";
import { Lists } from "@/components";

export default function() {
  return (
    <div className="bg-slate-12 min-w-screen flex min-h-screen flex-row">
      <Sidebar />
      <Lists />
    </div>
  );
};
