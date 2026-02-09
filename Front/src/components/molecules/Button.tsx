import { Button } from "@heroui/button";

type propsBut = {
  text?: React.ReactNode;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  form?: string;
  className?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  onPress?: () => void;
  disabled?: boolean;
  startContent?: React.ReactNode;
};

export default function Buton({
  text,
  children,
  type = "button",
  className = "",
  color,
  variant = "solid",
  onPress,
  isLoading,
  form,
  disabled,
  startContent,
}: propsBut) {
  const baseClasses = "text-white bg-primary";

  return (
    <Button
      className={`${baseClasses} ${className}`}
      color={color}
      disabled={disabled}
      form={form}
      isLoading={isLoading}
      startContent={startContent}
      type={type}
      variant={variant}
      onPress={onPress}
    >
      {text} {children}
    </Button>
  );
}
