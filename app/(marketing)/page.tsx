import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No. 1 Task Management
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800">
          Listify helps your team organized.
        </h1>
        <div
          className="mt-4 text-2xl md:text-5xl text-white px-3 py-1.5 rounded-md pb-1 w-fit"
          style={{
            backgroundImage: "linear-gradient(to right, #802BB1, #D05EFF)",
          }}
        >
          Work forward.
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity. From high
        rises to the home office, the way your team works is unique - accomplish
        it all with Listify.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Listify for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
