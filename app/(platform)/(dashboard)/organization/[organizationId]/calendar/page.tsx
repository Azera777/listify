import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { Info } from "../_components/info";
import { CalendarList } from "./_components/calendar-list";

interface CalendarPageProps {
  searchParams?: {
    month?: string;
  };
}

const CalendarPage = async ({ searchParams }: CalendarPageProps) => {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <Suspense fallback={<CalendarList.Skeleton />}>
        <CalendarList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default CalendarPage;
