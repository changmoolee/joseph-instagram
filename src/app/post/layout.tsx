import { AuthProvider } from "@/context/AuthContext";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
