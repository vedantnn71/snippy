import Image from "next/image";
import logo from "./assets/logo.svg";

export interface ILogoProps {
  size?: number;
}

export const Logo = ({ size = 50 }: ILogoProps) => (
  <Image src={logo} alt="Snippy" width={size} height={size} />
);
