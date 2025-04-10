import { AuthProvider } from "@/context/AuthContext";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
