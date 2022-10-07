import { ILoadingProps } from "./types";
import Image from "next/image";
import spinner from "../assets/spinner.svg";

export const Loading = ({ size }: ILoadingProps) => (
  <Image src={spinner} height={size} width={size} alt="Loading..." />
);
