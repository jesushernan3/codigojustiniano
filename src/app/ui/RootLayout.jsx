import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-72">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
