import type { CheckboxProps, OutlinedInputProps, PopoverProps, SliderProps } from "@mui/material";
import { FONT_FAMILY, PRIMARY_TEXT_COLOR } from "./style";
import { blue, grey } from "@mui/material/colors";

export const OUTLINED_INPUT_COMMON_PROPS: OutlinedInputProps = {
    size: "small",
    slotProps: {
        input: {
            className: `${FONT_FAMILY} ${PRIMARY_TEXT_COLOR}`
        },
        notchedOutline: {
            className: "border-zinc-500! border-1!"
        }
    },
    fullWidth: true
};

export const POPOVER_COMMON_PROPS: (open: boolean, anchorEl: Element | null) => PopoverProps = (open, anchorEl) => {
    return {
        open, anchorEl,
        anchorOrigin: { horizontal: "center", vertical: "bottom" },
        slotProps: {
            paper: {
                className: "w-sm p-5 bg-zinc-900! outline-2! outline-zinc-700!"
            }
        }
    };
};

export const SLIDER_COMMON_PROPS: SliderProps = {
    size: "small",
    slotProps: {
        thumb: {
            sx: {
                color: blue.A400
            }
        },
        track: {
            sx: {
                color: blue.A200
            }
        },
        rail: {
            sx: {
                color: blue.A200
            }
        }
    }
};

export const CHECKBOX_COMMON_PROPS: CheckboxProps = {
    size: "small",
    sx: {
        color: grey[700],
        '&.Mui-checked': {
            color: blue[700]
        }
    }
};