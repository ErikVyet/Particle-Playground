import { createContext, type Dispatch, type SetStateAction } from "react";
import type { IDashboardBar } from "../interfaces/IDashboardBar";

export const DashboardContext = createContext<{
    maxHeight: number,
    setMaxHeight: Dispatch<SetStateAction<number>>,
    data: IDashboardBar[],
    setData: Dispatch<SetStateAction<IDashboardBar[]>>
} | null>(null);