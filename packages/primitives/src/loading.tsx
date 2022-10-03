import Image from "next/image";
import spinner from "./assets/spinner.svg";

export interface ILoadingProps {
  size?: number | string;
}

export const Loading = ({ size }: ILoadingProps) => (
  <Image src={spinner} height={size} width={size} alt="Loading..." />
);
