import { Checkbox, Slider, Stack, Typography } from "@mui/material";
import { CHECKBOX_COMMON_PROPS, SLIDER_COMMON_PROPS } from "../../constants/props";
import { FONT_FAMILY, PRIMARY_TEXT_COLOR } from "../../constants/style";
import type { ChangeEvent } from "react";

type CustomInputProps = {
    label?: string,
    disabled?: boolean
}

/* ------------------------------------------------------------------------------------------------------------------------------- */

type CustomSliderProps = {
    value: number,
    range: { min: number, max: number },
    step?: number,
    onChange?: (event: Event, value: number | number[], activeThumb: number) => void
}

export function CustomSlider({ label, value, range, step = 1, disabled = false, onChange }: CustomSliderProps & CustomInputProps) {
    return (
        <Stack className={`w-full justify-between items-center ${disabled && 'opacity-50'}`} direction={"row"} spacing={2}>
            <Stack className="w-full justify-center items-center" direction={"row"} spacing={2}>
                {label && (
                    <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} lg:text-sm! xl:text-md! whitespace-nowrap`}>{label}</Typography>
                )}
                <Slider value={value} min={range?.min ?? 0} max={range?.max} step={step} shiftStep={step} disabled={disabled} {...SLIDER_COMMON_PROPS} onChange={onChange}/>  
            </Stack>
            <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} lg:text-sm! xl:text-md!`}>{value}</Typography>
        </Stack>
    );
}

/* ------------------------------------------------------------------------------------------------------------------------------- */

type CustomCheckboxProps = {
    checked: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void
}

export function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps & CustomInputProps) {

    return (
        <Stack className="w-full items-center" direction={"row"} spacing={1}>
            {label && (
                <Typography className={`${FONT_FAMILY} ${PRIMARY_TEXT_COLOR} lg:text-sm! xl:text-md! whitespace-nowrap`}>{label}</Typography>
            )}
            <Checkbox checked={checked} {...CHECKBOX_COMMON_PROPS} onChange={onChange}/>
        </Stack>
    );
}

/* ------------------------------------------------------------------------------------------------------------------------------- */
