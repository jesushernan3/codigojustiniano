import { Outlet } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
