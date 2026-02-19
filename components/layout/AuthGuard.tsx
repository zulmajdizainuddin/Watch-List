"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import Spinner from "@components/ui/Spinner";

export default function AuthGuard({
  children
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}

