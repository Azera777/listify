import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parse,
  addMonths,
  subMonths,
} from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect as nextRedirect } from "next/navigation";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const CalendarList = async ({
  searchParams,
}: {
  searchParams?: { month?: string };
}) => {
  const { orgId } = await auth();
  if (!orgId) redirect("/select-org");

  const currentMonthDate = searchParams?.month
    ? parse(searchParams.month, "yyyy-MM", new Date())
    : new Date();

  const start = startOfMonth(currentMonthDate);
  const end = endOfMonth(currentMonthDate);
  const daysInMonth = eachDayOfInterval({ start, end });

  const cardsWithDueDates = await db.card.findMany({
    where: {
      dueDate: {
        not: null,
      },
      list: {
        board: {
          orgId: orgId,
        },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
    include: {
      list: {
        include: {
          board: true,
        },
      },
    },
  });

  const prevMonth = format(subMonths(currentMonthDate, 1), "yyyy-MM");
  const nextMonth = format(addMonths(currentMonthDate, 1), "yyyy-MM");

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <a
          href={`?month=${prevMonth}`}
          className="text-sm text-muted-foreground hover:text-primary transition"
        >
          <ChevronLeft className="w-5 h-5 inline" /> Prev
        </a>
        <h2 className="text-xl font-semibold text-center text-primary">
          {format(currentMonthDate, "MMMM yyyy")}
        </h2>
        <a
          href={`?month=${nextMonth}`}
          className="text-sm text-muted-foreground hover:text-primary transition"
        >
          Next <ChevronRight className="w-5 h-5 inline" />
        </a>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          const itemsForDay = cardsWithDueDates.filter((card) =>
            isSameDay(new Date(card.dueDate!), day)
          );

          return (
            <div
              key={day.toISOString()}
              className="border p-2 rounded-md bg-white shadow-sm min-h-[100px] flex flex-col"
            >
              <div className="text-xs font-semibold text-muted-foreground mb-1">
                {format(day, "d")}
              </div>
              <div className="flex flex-col gap-1">
                <TooltipProvider>
                  {itemsForDay.map((card) => (
                    <Tooltip key={card.id}>
                      <TooltipTrigger asChild>
                        <Link href={`/board/${card.list.board.id}`}>
                          <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded flex items-center gap-1 cursor-pointer hover:bg-blue-200 transition-colors">
                            <CalendarIcon className="w-3 h-3" />
                            <span className="truncate">{card.title}</span>
                          </div>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Board: {card.list.board.title}</p>
                        <p className="text-xs text-muted-foreground">
                          List: {card.list.title}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CalendarList.Skeleton = function CalendarListSkeleton() {
  return (
    <div className="mt-6">
      <div className="flex justify-between mb-4">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-32 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 30 }).map((_, idx) => (
          <Skeleton key={idx} className="h-[100px] w-full" />
        ))}
      </div>
    </div>
  );
};
