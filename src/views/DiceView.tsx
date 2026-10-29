import { Alert, Box, Snackbar, Stack, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { FONT_FAMILY, PRIMARY_TEXT_COLOR } from "../constants/style";
import DiceScene from "../components/dices_view/DiceScene";
import { useEffect, useRef, useState } from "react";
import { INITIAL_DICE_BOUNCINESS, INITIAL_DICE_FRICTION, INITIAL_DICE_GRAVITY_MULTIPLIER, INITIAL_DICE_MASS } from "../constants/scene";
import { DiceContext } from "../contexts/DiceContext";
import { OrbitControls } from "@react-three/drei";
import DiceControlPanel from "../components/dices_view/DiceControlPanel";
import { createXRStore, XR } from "@react-three/xr";
import { ALERT_COMMON_PROPS, SNACKBAR_COMMON_PROPS } from "../constants/props";
import { DICE_INTRODUCTION } from "../constants/paragraphs";

const store = createXRStore({});

export default function DiceView() {
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const [gravityMultiplier, setGravityMultiplier] = useState(INITIAL_DICE_GRAVITY_MULTIPLIER);
    const [mass, setMass] = useState(INITIAL_DICE_MASS);
    const [bounciness, setBounciness] = useState(INITIAL_DICE_BOUNCINESS);
    const [friction, setFriction] = useState(INITIAL_DICE_FRICTION);
    const [vrMode, setVrMode] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [lastRollNumber, setLastRollNumber] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        if (vrMode) {
            store.enterVR().catch(() => {
                handleOpenAlert("Unable to enter VR mode");
                setVrMode(false);
            });
        }
        else {
            store.getState().session?.end().catch(() => {
                handleOpenAlert("An error has occured while exiting VR mode");
            });
        }
    }, [vrMode]);

    const handleOpenAlert = (message: string) => {
        setMessage(message);
        setOpenAlert(true);
    };
    const handleCloseAlert = () => setOpenAlert(false);

    return (
        <>
            <DiceContext.Provider value={{ canvasRef, gravityMultiplier, setGravityMultiplier, mass, setMass, bounciness, setBounciness, friction, setFriction, vrMode, setVrMode, isDragging, setIsDragging, lastRollNumber, setLastRollNumber }}>
                <Stack className="pb-6 justify-center">
                    <Typography className={`pb-4 ${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} lg:text-2xl! xl: text-3xl! font-semibold! place-self-center`}>Dice</Typography>
                    <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} overflow-hidden text-ellipsis`}>{DICE_INTRODUCTION}</Typography>
                </Stack>
                <Box className="relative size-full">
                    <Canvas className="size-full! bg-zinc-200! outline-2 outline-zinc-700 rounded-lg!" ref={canvasRef} camera={{ position: [0, 12, 15], fov: 75 }} shadows>
                        <XR store={store}>
                            <directionalLight position={[0, 5, -10]} lookAt={() => [0, 0, 0]} intensity={4}/>
                            <ambientLight position={[0, 5, 2]} intensity={1}/>
                            {/* <axesHelper args={[4]}/> */}
                            <OrbitControls minDistance={4} maxDistance={30} enabled={!isDragging}/>
                            <DiceScene />
                        </XR>
                    </Canvas>
                    <DiceControlPanel/>
                </Box>
            </DiceContext.Provider>
            <Snackbar open={openAlert} {...SNACKBAR_COMMON_PROPS} onClose={handleCloseAlert}>
                <Alert severity={"error"} {...ALERT_COMMON_PROPS} onClose={handleCloseAlert}>{message}</Alert>
            </Snackbar>
        </>
    );
}