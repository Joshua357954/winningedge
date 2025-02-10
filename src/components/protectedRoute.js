"use client"; // Ensure this is treated as a client-side component

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ routing
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/userStore";

const withProtectedRoute = (
  WrappedComponent,
  protectedPages = [],
  publicPages = []
) => {
  const ProtectedComponent = (props) => {
    const { user } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!user && protectedPages.includes(pathname)) {
        router.replace("/login");
      } else if (user && publicPages.includes(pathname)) {
        router.replace("/dashboard");
      }
    }, [user, pathname, router, protectedPages, publicPages]);

    if (!user && protectedPages.includes(pathname)) {
      return null; // Prevent rendering anything before redirection
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withProtectedRoute;
