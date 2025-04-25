import AuthHeader from "@/components/authHeader";
import Footer from "@/components/footer";
import { WrapperContent } from "@/containers/WrapperContent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHeader />
      <WrapperContent>{children}</WrapperContent>
      <Footer />
    </>
  );
}
