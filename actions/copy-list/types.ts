import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
import { List } from "@/lib/generated/prisma/client";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;
