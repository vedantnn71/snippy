export type ISelectIconProps = {
  value: string;
  setValue: (value: string) => void;
  showIconOnly?: boolean;
  onValueChange?: (value: string) => void;
};