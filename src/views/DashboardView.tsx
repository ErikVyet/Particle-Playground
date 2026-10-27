import { Box, Stack, Typography } from "@mui/material";
import { FONT_FAMILY, PRIMARY_TEXT_COLOR } from "../constants/style";
import { Canvas } from "@react-three/fiber";
import { DashboardContext } from "../contexts/DashboardContext";
import { OrbitControls } from "@react-three/drei";
import BarChartScene from "../components/dashboard_view/BarChartScene";
import { useState } from "react";
import { bars, maxHeight as maxHeightValue } from "../assets/mocks/dashboard_mocked_data.json";
import type { IDashboardBar } from "../interfaces/IDashboardBar";
import BarChartControlPanel from "../components/dashboard_view/BarChartControlPanel";

export default function DashBoardView() {
    const [maxHeight, setMaxHeight] = useState(maxHeightValue);
    const [data, setData] = useState<IDashboardBar[]>(bars);

    return (
        <DashboardContext.Provider value={{ maxHeight, setMaxHeight, data, setData }}>
            <Stack className="pb-6 justify-center">
                <Typography className={`pb-4 ${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} lg:text-2xl! xl: text-3xl! font-semibold! place-self-center`}>Dashboard</Typography>
                <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} overflow-hidden text-ellipsis`}>{}</Typography>
            </Stack>
            <Box className="relative size-full">
                <Canvas className="size-full! bg-zinc-900! outline-2 outline-zinc-700 rounded-lg!" camera={{ position: [0, 12, 15], fov: 75 }} shadows>
                    <directionalLight position={[0, 5, -10]} lookAt={() => [0, 0, 0]} intensity={4}/>
                    <ambientLight position={[0, 5, 2]} intensity={1}/>
                    {/* <axesHelper args={[4]}/> */}
                    <OrbitControls minDistance={4} maxDistance={20} enablePan={false}/>
                    <BarChartScene/>
                </Canvas>
                <BarChartControlPanel/>
            </Box>
        </DashboardContext.Provider>
    );
}