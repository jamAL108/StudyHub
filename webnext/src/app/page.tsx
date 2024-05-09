import Image from "next/image";
import Navbar from "@/components/navbar";
export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center">
      <Navbar/>
       <div className="w-[min(90vw,1400px)]  min-h-[100vh] flex flex-col items-center">
       </div>
    </div>
  );
}
