import type { AlertProps, CheckboxProps, OutlinedInputProps, PopoverProps, SliderProps, SnackbarProps } from "@mui/material";
import { FONT_FAMILY, PRIMARY_TEXT_COLOR } from "./style";
import { blue, grey } from "@mui/material/colors";
import type { RigidBodyProps } from "@react-three/rapier";
import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";

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

export const SNACKBAR_COMMON_PROPS: SnackbarProps = {
    autoHideDuration: 3000,
    anchorOrigin: { horizontal: "right", vertical: "bottom" },
    onClick: (event) => { event.stopPropagation(); event.preventDefault(); }
};

export const ALERT_COMMON_PROPS: AlertProps = {
    variant: "filled"
};

/* --------------------------------------------------------------------------------------------- */
export const DICE_RIGID_BODY_COMMON_RPOPS: RigidBodyProps = {
    type: "dynamic",
    colliders: "cuboid",
    activeCollisionTypes: ActiveCollisionTypes.ALL,
    ccd: true
};