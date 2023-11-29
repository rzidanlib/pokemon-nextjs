import Navbar from "@/components/component/Navbar";
import Hero from "@/components/fragments/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-[110px]">
      <Navbar />

      <Hero />
    </div>
  );
}
