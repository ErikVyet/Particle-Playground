import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import SpiralGalaxyScene from "../components/spiral_galaxy_view/ArchimedeanSpiralScene";
import { useMemo, useState } from "react";
import { INITIAL_AXES_SIZE, INITIAL_GRID_SIZE, INITIAL_POINTS, INITIAL_POINT_SIZE, INITIAL_POINT_SPREAD_X, INITIAL_POINT_SPREAD_Z, INITIAL_CURVES, INITIAL_CURVE_SPREAD } from "../constants/scene";
import { ArchimedeanSpiralContext } from "../contexts/ArchimedeanSpiralContext";
import { LineBasicMaterial } from "three";
import { grey } from "@mui/material/colors";
import { Box, Stack, Typography } from "@mui/material";
import SpiralGalaxyControlPanel from "../components/spiral_galaxy_view/ArchimedeanSpiralControlPanel";
import CustomAxesHelper from "../components/common/CustomAxesHelper";
import { FONT_FAMILY, PRIMARY_TEXT_COLOR } from "../constants/style";
import { ARCHIMEDEAN_SPIRAL_INTRODUCTION } from "../constants/paragraphs";

export default function ArchimedeanSpiralView() {
    const [axesHelper, setAxesHelper] = useState(false);
    const [axesSize, setAxesSize] = useState(INITIAL_AXES_SIZE);
    const [gridHelper, setGridHelper] = useState(false);
    const [gridSize, setGridSize] = useState(INITIAL_GRID_SIZE);
    const [points, setPoints] = useState(INITIAL_POINTS);
    const [size, setSize] = useState(INITIAL_POINT_SIZE);
    const [curves, setCurves] = useState(INITIAL_CURVES);
    const [curveSpread, setCurveSpread] = useState(INITIAL_CURVE_SPREAD);
    const [spreadX, setSpreadX] = useState(INITIAL_POINT_SPREAD_X);
    const [spreadZ, setSpreadZ] = useState(INITIAL_POINT_SPREAD_Z);
    const [rotate, setRotate] = useState(true);

    const gridMaterial = useMemo(() => new LineBasicMaterial({ color: grey[700] }), []);

    return (
        <ArchimedeanSpiralContext.Provider value={{ axesHelper, setAxesHelper, axesSize, setAxesSize, gridHelper, setGridHelper, gridSize, setGridSize, points, setPoints, size, setSize, curves, setCurves, curveSpread, setCurveSpread, spreadX, setSpreadX, spreadZ, setSpreadZ, rotate, setRotate }}>
            <Stack className="pb-6 justify-center">
                <Typography className={`pb-4 ${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} lg:text-2xl! xl:text-3xl! font-semibold! place-self-center`}>Archimedean Spiral</Typography>
                <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} overflow-hidden text-ellipsis xl:text-xl!`}>{ARCHIMEDEAN_SPIRAL_INTRODUCTION}</Typography>
                
            </Stack>
            <Box className="relative size-full">
                <Canvas className="size-full! bg-zinc-950! outline-2 outline-zinc-700 rounded-lg!" camera={{ position: [0, 4, 4], fov: 75 }}>
                    <ambientLight intensity={2}/>
                    {axesHelper && (<CustomAxesHelper size={axesSize}/>)}
                    {gridHelper && (<gridHelper args={[gridSize, gridSize]} material={gridMaterial}/>)}
                    <OrbitControls minDistance={4} maxDistance={10} enablePan={false}/>
                    <EffectComposer>
                        <Bloom luminanceSmoothing={4} luminanceThreshold={2} intensity={2} mipmapBlur/>
                    </EffectComposer>
                    <SpiralGalaxyScene/>
                </Canvas>
                <SpiralGalaxyControlPanel/>
            </Box>
        </ArchimedeanSpiralContext.Provider>
    );
}