"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const ClientLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const hideNavbarPaths = ["/login", "/signup","/"]; // Add paths where the navbar should not be rendered

  return (
    <>
      {!hideNavbarPaths.includes(pathname) && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
