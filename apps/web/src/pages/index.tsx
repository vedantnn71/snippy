import { trpc } from "@/utils/trpc";
import { Checkbox } from "@snippy/primitives";

const Home = () => {
  const todoQuery = trpc.todo.all.useQuery();

  return (
    <div className="flex align-center">
      <Checkbox>hey suP?</Checkbox>
    </div>
  );
};

export default Home;
