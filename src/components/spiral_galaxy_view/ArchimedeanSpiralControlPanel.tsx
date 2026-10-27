import { Tune } from "@mui/icons-material";
import { IconButton, Popover, Stack, Tooltip } from "@mui/material";
import { ICON_SIZE, PRIMARY_TEXT_COLOR } from "../../constants/style";
import { useContext, useState, type ChangeEvent, type MouseEvent } from "react";
import { POPOVER_COMMON_PROPS } from "../../constants/props";
import { CustomCheckbox, CustomSlider } from "../common/CustomInput";
import { ArchimedeanSpiralContext } from "../../contexts/ArchimedeanSpiralContext";
import { AXES_SIZE_RANGE, CURVE_SPREAD_RANGE, CURVES_RANGE, GRID_SIZE_RANGE, POINT_SIZE_RANGE, POINT_SPREAD_RANGE, POINTS_RANGE } from "../../constants/scene";

export default function ArchimedeanSpiralControlPanel() {
    const context = useContext(ArchimedeanSpiralContext);
    if (!context) return null;
    const { points, setPoints, size, setSize, curves, setCurves, curveSpread, setCurveSpread, spreadX, setSpreadX, spreadZ, setSpreadZ, axesHelper, setAxesHelper, gridHelper, setGridHelper, rotate, setRotate, axesSize, setAxesSize, gridSize, setGridSize } = context;

    const [panelAnchor, setPanelAnchor] = useState<HTMLButtonElement | null>(null);

    const handleOpenPanel = (event: MouseEvent<HTMLButtonElement>) => setPanelAnchor(event.currentTarget);
    const handleClosePanel = () => setPanelAnchor(null);
    const handlePointsChange = (_event: Event, value: number | number[], _activeThumb: number) => setPoints(value as number);
    const handleSizeChange = (_event: Event, value: number | number[], _activeThumb: number) => setSize(value as number);
    const handleCurvesChange = (_event: Event, value: number | number[], _activeThumb: number) => setCurves(value as number);
    const handleCurveSpreadChange = (_event: Event, value: number | number[], _activeThumb: number) => setCurveSpread(value as number);
    const handlePointSpreadXChange = (_event: Event, value: number | number[], _activeThumb: number) => setSpreadX(value as number);
    const handlePointSpreadZChange = (_event: Event, value: number | number[], _activeThumb: number) => setSpreadZ(value as number);
    const handleAxesHelperChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => setAxesHelper(checked);
    const handleGridHelperChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => setGridHelper(checked);
    const handleRotateChange = (_event: ChangeEvent<HTMLInputElement>, checked: boolean) => setRotate(checked);
    const handleAxesSizeChange = (_event: Event, value: number | number[], _activeThumb: number) => setAxesSize(value as number);
    const handleGridSizeChange = (_event: Event, value: number | number[], _activeThumb: number) => setGridSize(value as number);

    return (
        <>
            <Tooltip title={"Control Panel"} placement={"left"}>
                <IconButton className="absolute! top-3 right-3" onClick={handleOpenPanel}>
                    <Tune className={`${ICON_SIZE} ${PRIMARY_TEXT_COLOR}`}/>
                </IconButton>
            </Tooltip>
            <Popover {...POPOVER_COMMON_PROPS(Boolean(panelAnchor), panelAnchor)} onClose={handleClosePanel}>
                <Stack className="size-full" spacing={1.5}>
                    <CustomSlider value={points} range={POINTS_RANGE} step={250} label={"Points"} onChange={handlePointsChange}/>
                    <CustomSlider value={size} range={POINT_SIZE_RANGE} step={0.01} label={"Size"} onChange={handleSizeChange}/>
                    <CustomSlider value={curves} range={CURVES_RANGE} step={1} label={"Curves"} onChange={handleCurvesChange}/>
                    <CustomSlider value={curveSpread} range={CURVE_SPREAD_RANGE} step={0.1} label={"Curve Spread"} onChange={handleCurveSpreadChange}/>
                    <CustomSlider value={spreadX} range={POINT_SPREAD_RANGE} step={0.1} label={"Point Spread X"} onChange={handlePointSpreadXChange}/>
                    <CustomSlider value={spreadZ} range={POINT_SPREAD_RANGE} step={0.1} label={"Point Spread Z"} onChange={handlePointSpreadZChange}/>
                    <Stack className="justify-between items-center" direction={"row"}>
                        <CustomCheckbox checked={axesHelper} label={"Axes"} onChange={handleAxesHelperChange}/>
                        <CustomCheckbox checked={gridHelper} label={"Grid"} onChange={handleGridHelperChange}/>
                        <CustomCheckbox checked={rotate} label={"Rotate"} onChange={handleRotateChange}/>
                    </Stack>
                    <CustomSlider value={axesSize} range={AXES_SIZE_RANGE} step={1} label={"Axes Size"} disabled={!axesHelper} onChange={handleAxesSizeChange}/>
                    <CustomSlider value={gridSize} range={GRID_SIZE_RANGE} step={1} label={"Grid Size"} disabled={!gridHelper} onChange={handleGridSizeChange}/>

                </Stack>
            </Popover>
        </>
    );
}