import Image from "next/image";
import Navbar from "@/components/LandingNavbar";
import { GiDiamonds } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center">
      <Navbar />
      <div className="w-[min(90vw,1400px)] min-h-[100vh] flex flex-col items-center py-16">
        <div className="px-3 py-2.5 flex justify-center items-center gap-3 bg-secondary border border-primary rounded-lg text-sm">
          <div className="flex justify-center items-center">
            <GiDiamonds className="text-primary mr-1 h-3 w-3" />
            Free
          </div>
          <div className="flex justify-center items-center">
            <GiDiamonds className="text-primary mr-1 h-3 w-3" />
            Secure
          </div>
          <div className="flex justify-center items-center">
            <GiDiamonds className="text-primary mr-1 h-3 w-3" />
            Fast Process
          </div>
          <div className="flex justify-center items-center">
            <GiDiamonds className="text-primary mr-1 h-3 w-3" />
            Time Saving
          </div>
          <div className="flex justify-center items-center">
            <GiDiamonds className="text-primary mr-1 h-3 w-3" />
            Cloud
          </div>
        </div>
        <div className="mt-12 w-[70%] flex justify-center items-center text-7xl leading-[80px] font-[550]">
          <span className=" relative text-center">
            Unlock wisdom, streamline  <br />
            {/* <span className="relative borv"> */}
            learning, together with AI
            <Image src='/images/strikeThrough.png' alt='dfvgb' width={300} height={0} className="absolute left-2 bottom-[-20px]" />
            {/* </span> */}
          </span>
        </div>
        <h2 className="mt-12 w-[40%] text-center text-muted-foreground"><span className="text-primary">Vidchat AI</span> Your secure, AI-powered space for enhanced learning and controlled data management.</h2>
        <Link href={'/auth/sign-in'}><Button className="mt-12 text-md px-14 py-7 rounded-xl">Get Started</Button></Link>
      </div>
    </div>
  );
}
