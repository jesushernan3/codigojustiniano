import { Outlet } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ScrollToMainContent from "../../utils/ScrollToMainContent";

export default function RootLayout() {
  return (
    <>
      <Header />
      <ScrollToMainContent />
      <main className="min-h-screen bg-gray-50 py-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
