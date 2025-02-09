"use client"; // Ensure this is treated as a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 13 routing
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check if the router is ready and user data is available
      if (!user) {
        // Redirect to login if user is not authenticated and trying to access protected pages
        if (protectedPages.includes(pathname)) {
          router.push("/login");
        }
      } else {
        // Redirect to dashboard if already logged in and accessing public pages
        if (publicPages.includes(pathname)) {
          router.push("/dashboard");
        }
      }

      setLoading(false); // Mark loading as complete
    }, [router, pathname, user, publicPages, protectedPages]);

    // Show loading state until routing logic is processed
    if (loading) {
      return <div>Loading...</div>;
    }

    // Only render wrapped component if user is allowed to access the page
    if (user || !protectedPages.includes(pathname)) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return ProtectedComponent;
};

export default withProtectedRoute;
