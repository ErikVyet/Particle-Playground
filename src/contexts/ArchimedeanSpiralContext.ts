import { createContext, type Dispatch, type SetStateAction } from "react";

export const ArchimedeanSpiralContext = createContext<{
    axesHelper: boolean,
    setAxesHelper: Dispatch<SetStateAction<boolean>>,
    axesSize: number,
    setAxesSize: Dispatch<SetStateAction<number>>,
    gridHelper: boolean,
    setGridHelper: Dispatch<SetStateAction<boolean>>,
    gridSize: number,
    setGridSize: Dispatch<SetStateAction<number>>,
    points: number,
    setPoints: Dispatch<SetStateAction<number>>,
    size: number,
    setSize: Dispatch<SetStateAction<number>>,
    curves: number,
    setCurves: Dispatch<SetStateAction<number>>,
    curveSpread: number,
    setCurveSpread: Dispatch<SetStateAction<number>>,
    spreadX: number,
    setSpreadX: Dispatch<SetStateAction<number>>,
    spreadZ: number,
    setSpreadZ: Dispatch<SetStateAction<number>>,
    rotate: boolean,
    setRotate: Dispatch<SetStateAction<boolean>>
} | null>(null);