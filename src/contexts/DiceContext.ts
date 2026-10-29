import { createContext, type Dispatch, type RefObject, type SetStateAction } from "react";

export const DiceContext = createContext<{
    canvasRef: RefObject<HTMLCanvasElement>,
    gravityMultiplier: number,
    setGravityMultiplier: Dispatch<SetStateAction<number>>,
    mass: number,
    setMass: Dispatch<SetStateAction<number>>,
    bounciness: number,
    setBounciness: Dispatch<SetStateAction<number>>,
    friction: number,
    setFriction: Dispatch<SetStateAction<number>>,
    vrMode: boolean,
    setVrMode: Dispatch<SetStateAction<boolean>>
    isDragging: boolean,
    setIsDragging: Dispatch<SetStateAction<boolean>>,
    lastRollNumber: number | null,
    setLastRollNumber: Dispatch<SetStateAction<number | null>>
} | null>(null);