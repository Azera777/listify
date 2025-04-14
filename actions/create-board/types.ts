import {z} from "zod";
import { Board } from "@/lib/generated/prisma";
import { CreateBoard } from "./schema";
import { ActionState } from "@/lib/create-safe-action";

export type InputType = z.infer<typeof CreateBoard>
export type ReturnType = ActionState<InputType, Board>;