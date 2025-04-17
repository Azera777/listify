"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DueDateProps {
  data: CardWithList;
}

export const DueDate = ({ data }: DueDateProps) => {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["card", data.id] });
      queryClient.invalidateQueries({ queryKey: ["card-logs", data.id] });

      toast.success(`Due date updated for "${data.title}"`);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const dueDate = formData.get("dueDate") as string;
    const boardId = params.boardId as string;

    execute({
      id: data.id,
      dueDate,
      boardId,
    });
  };

  return (
    <div className="flex items-start gap-x-3 w-full mt-6">
      <CalendarDays className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Due Date</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className="space-y-2">
            <input
              type="date"
              name="dueDate"
              ref={inputRef}
              defaultValue={
                data.dueDate
                  ? new Date(data.dueDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm"
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            className="min-h-[44px] bg-neutral-200 text-sm font-medium py-2 px-3.5 rounded-md cursor-pointer"
            role="button"
            onClick={enableEditing}
          >
            {data.dueDate ? (
              <span>Due on {new Date(data.dueDate).toLocaleDateString()}</span>
            ) : (
              "Add a due date..."
            )}
          </div>
        )}
      </div>
    </div>
  );
};

DueDate.Skeleton = function DueDateSkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full mt-6">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-[44px] bg-neutral-200" />
      </div>
    </div>
  );
};
