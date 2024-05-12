import { Suspense } from "react";

const UpdateLayout = ({ children }: UpdateLayoutChildren) => {
  return <Suspense>{children}</Suspense>;
};

type UpdateLayoutChildren = {
  children: React.ReactNode;
};

export default UpdateLayout;
