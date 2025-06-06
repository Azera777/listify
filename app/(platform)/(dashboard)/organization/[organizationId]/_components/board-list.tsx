import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvailableCount } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const BoardList = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const availableCount = await getAvailableCount();

  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Your board
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2"
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side="right">
          <div
            role="button"
            className="aspect-video relative w-full h-full bg-muted rounedd-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
            <p className="text-xs">Create new board</p>
            <span className="text-xs">{`${
              MAX_FREE_BOARDS - availableCount
            } remaining`}</span>
            <Hint
              sideOffset={40}
              description="Free Workspaces can have up to 5 open boards. For unlimited boards, upgrade to a paid plan.">
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
      <Skeleton className="aspect-video h-full w-full mr-2" />
    </div>
  );
};