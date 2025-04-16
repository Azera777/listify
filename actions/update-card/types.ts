import {z} from "zod"
import { ActionState } from "@/lib/create-safe-action"
import { UpdateCard } from "./schema"
import { Card } from "@/lib/generated/prisma/client";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>;