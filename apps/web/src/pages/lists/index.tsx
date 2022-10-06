import { Sidebar, Snippet, Snippets } from "@/components";
import { Lists } from "@/components";

export default function() {
  return (
    <div className="bg-slate-12 flex min-h-screen min-w-screen flex-row">
      <Sidebar />
      <Lists />
      <Snippets />
      <Snippet />
    </div>
  );
};

