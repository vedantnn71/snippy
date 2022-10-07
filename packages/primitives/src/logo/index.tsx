import { ILogoProps } from "./types";
import Image from "next/image";
import logo from "../assets/logo.svg";

export const Logo = ({ size = 50 }: ILogoProps) => (
  <Image src={logo} alt="Snippy" width={size} height={size} />
);

