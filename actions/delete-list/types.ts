import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { List } from "@/lib/generated/prisma/client";
import { DeleteList } from "./schema";
export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;
