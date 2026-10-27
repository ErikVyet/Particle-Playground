import { useContext, useState, type MouseEvent } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { IconButton, Popover, Stack, Tooltip } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { ICON_SIZE, PRIMARY_TEXT_COLOR } from "../../constants/style";
import { POPOVER_COMMON_PROPS } from "../../constants/props";
import { CustomSlider } from "../common/CustomInput";
import { BAR_HEIGHT_RANGE } from "../../constants/scene";

export default function BarChartControlPanel() {
    const context = useContext(DashboardContext);
    if (!context) return null;
    const { data, setData } = context;

    const [panelAnchor, setPanelAnchor] = useState<HTMLButtonElement | null>(null);
    
    const handleOpenPanel = (event: MouseEvent<HTMLButtonElement>) => setPanelAnchor(event.currentTarget);
    const handleClosePanel = () => setPanelAnchor(null);
    const handleBarHeightChange = (_event: Event, value: number | number[], _activeThumb: number, id: string) => {
        setData(prev => {
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id === id) {
                    prev[i].height = value as number;
                    break;
                }
            }
            return [...prev];
        });
    };

    return (
        <>
            <Tooltip title={"Control Panel"} placement={"left"}>
                <IconButton className="absolute! top-3 right-3" onClick={handleOpenPanel}>
                    <Tune className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`}/>
                </IconButton>
            </Tooltip>
            <Popover {...POPOVER_COMMON_PROPS(Boolean(panelAnchor), panelAnchor)} onClose={handleClosePanel}>
                <Stack className="size-full" spacing={1.5}>
                    {data.map(bar =>
                        <CustomSlider value={bar.height} range={BAR_HEIGHT_RANGE} step={1} label={`${bar.label} Height`} key={bar.id} onChange={(event, value, activeThumb) => handleBarHeightChange(event, value, activeThumb, bar.id)}/>
                    )}
                </Stack>
            </Popover>
        </>
    );
}