"use client"; // Ensure this is treated as a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // This is the new Next.js 13 way of using the router
import { usePathname } from "next/navigation";

const withProtectedRoute = (
  WrappedComponent,
  protectedPages = [],
  publicPages = []
) => {
  const ProtectedComponent = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true); // To prevent rendering before router is ready

    // Get user status from localStorage or cookies
    const user = JSON.parse(localStorage.getItem("user")) || null;

    useEffect(() => {
      // Make sure useRouter is ready before trying to access router methods
      setLoading(false);

      // Redirect logged-in users away from login/register
      if (user && publicPages.includes(pathname)) {
        router.push("/dashboard"); // Redirect to dashboard if user is already logged in
      }

      // Redirect non-logged-in users to login page for protected routes
      if (!user && protectedPages.includes(pathname)) {
        router.push("/login"); // Redirect to login page if not logged in
      }
    }, [router, pathname, user, publicPages, protectedPages]);

    if (loading) {
      return <div>Loading...</div>; // Optionally show a loading indicator while determining the user's status
    }

    // Allow access to protected pages only if the user is logged in
    return user || !protectedPages.includes(pathname) ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return ProtectedComponent;
};

export default withProtectedRoute;
