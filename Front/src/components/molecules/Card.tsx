import React from "react";
import { Card, CardBody } from "@heroui/react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Card1({ children, className }: Props) {
  return (
    <Card
      className={`border-collapse flex dark:bg-gray-700 dark:text-white ${className}`}
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
}

export default Card1;
