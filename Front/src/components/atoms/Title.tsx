import React from "react";

type Props = {
  children: React.ReactNode;
};

export const Title = ({ children }: Props) => {
  return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
};
