import { useContext, useState, type MouseEvent } from "react";
import { DiceContext } from "../../contexts/DiceContext";
import { Alert, Box, IconButton, Popover, Snackbar, Stack, Tooltip, Typography } from "@mui/material";
import { Tune, ViewInArOutlined } from "@mui/icons-material";
import { FONT_FAMILY, ICON_SIZE, PRIMARY_TEXT_COLOR } from "../../constants/style";
import { ALERT_COMMON_PROPS, POPOVER_COMMON_PROPS, SNACKBAR_COMMON_PROPS } from "../../constants/props";
import { CustomSlider } from "../common/CustomInput";
import { DICE_BOUNCINESS_RANGE, DICE_FRICTION_RANGE, DICE_GRAVITY_MULTIPLIER_RANGE, DICE_MASS_RANGE } from "../../constants/scene";

export default function DiceControlPanel() {
    const context = useContext(DiceContext);
    if (!context) return null;
    const { gravityMultiplier, setGravityMultiplier, mass, setMass, bounciness, setBounciness, friction, setFriction, setVrMode, lastRollNumber } = context;

    const [panelAnchor, setPanelAnchor] = useState<HTMLButtonElement | null>(null);
    const [message, setMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    const handleOpenPanel = (event: MouseEvent<HTMLButtonElement>) => setPanelAnchor(event.currentTarget);
    const handleClosePanel = () => setPanelAnchor(null);
    const handleGravityMultiplierChange = (_event: Event, value: number | number[], _activeThumb: number) => setGravityMultiplier(value as number);
    const handleMassChange = (_event: Event, value: number | number[], _activeThumb: number) => setMass(value as number);
    const handleBouncinessChange = (_event: Event, value: number | number[], _activeThumb: number) => setBounciness(value as number);
    const handleFrictionChange = (_event: Event, value: number | number[], _activeThumb: number) => setFriction(value as number);
    const handleEnterVrMode = () => {
        navigator.xr?.isSessionSupported("immersive-vr").then((value) => {
            if (!value) {
                handleOpenAlert("Your device is not supported for this feature")
            }
            setVrMode(value);
        }).catch(() => {
            handleOpenAlert("Unable to verify if the device is supported");
        });
    };
    const handleOpenAlert = (message: string) => {
        setMessage(message);
        setOpenAlert(true);
    };
    const handleCloseAlert = () => setOpenAlert(false);

    return (
        <>
            <Stack className="absolute! top-0 left-0 w-full p-3 justify-between items-center" direction={"row"}>
                <Box className="px-3 py-2 bg-zinc-800! rounded-sm!">
                    <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} text-sm! line-clamp-1 select-none`}>Last rolled number: {lastRollNumber ?? "None"}</Typography>
                </Box>
                <Stack className="justify-center items-center" direction={"row"} spacing={1.5}>
                    <Tooltip title={"VR Mode"} placement={"top"}>
                        <IconButton className="bg-zinc-800! rounded-sm!" onClick={handleEnterVrMode}>
                            <ViewInArOutlined className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Control Panel"} placement={"top"}>
                        <IconButton className="bg-zinc-800! rounded-sm!" onClick={handleOpenPanel}>
                            <Tune className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`}/>
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            <Popover {...POPOVER_COMMON_PROPS(Boolean(panelAnchor), panelAnchor)} onClose={handleClosePanel}>
                <Stack className="size-full" spacing={1.5}>
                    <CustomSlider value={gravityMultiplier} range={DICE_GRAVITY_MULTIPLIER_RANGE} label={"Gravity Multiplier"} step={1} onChange={handleGravityMultiplierChange}/>
                    <CustomSlider value={mass} range={DICE_MASS_RANGE} label={"Mass"} step={10} onChange={handleMassChange}/>
                    <CustomSlider value={bounciness} range={DICE_BOUNCINESS_RANGE} label={"Bounciness"} step={0.1} onChange={handleBouncinessChange}/>
                    <CustomSlider value={friction} range={DICE_FRICTION_RANGE} label={"Friction"} step={0.1} onChange={handleFrictionChange}/>
                </Stack>
            </Popover>
            <Snackbar open={openAlert} {...SNACKBAR_COMMON_PROPS} onClose={handleCloseAlert}>
                <Alert severity={"error"} {...ALERT_COMMON_PROPS} onClose={handleCloseAlert}>{message}</Alert>
            </Snackbar>
        </>
    );
}