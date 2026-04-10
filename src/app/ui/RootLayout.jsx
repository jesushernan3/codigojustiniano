import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <Header />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-2 md:px-6 py-5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
