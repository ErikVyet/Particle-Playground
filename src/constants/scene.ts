import { maxHeight } from "../assets/mocks/dashboard_mocked_data.json";

export const INITIAL_AXES_SIZE = 3;
export const AXES_SIZE_RANGE = { min: 2, max: 5 };
export const INITIAL_GRID_SIZE = 10;
export const GRID_SIZE_RANGE = { min: 4, max: 12 };

/* Archimedean Spiral Scene */
export const INITIAL_POINTS = 2000;
export const POINTS_RANGE = { min: 1000, max: 5000 };
export const INITIAL_POINT_SIZE = 0.02;
export const POINT_SIZE_RANGE = { min: 0.01, max: 0.05 };
export const INITIAL_CURVES = 6;
export const CURVES_RANGE = { min: 4, max: 8 };
export const INITIAL_CURVE_SPREAD = 0.2;
export const CURVE_SPREAD_RANGE = { min: 0.1, max: 0.5 };
export const INITIAL_POINT_SPREAD_X = 0.5;
export const INITIAL_POINT_SPREAD_Z = 0.5;
export const POINT_SPREAD_RANGE = { min: 0.1, max: 0.9 };
export const SPIRAL_ROTATE_SPEED = 1;

/* Dashboard Scene */
export const BAR_HEIGHT_RANGE = { min: 0, max: maxHeight };
export const BAR_LAMBDA = 12;