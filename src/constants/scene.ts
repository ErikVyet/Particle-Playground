import { Vector3 } from "three";
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

/* Dices Scene */
export const DICE_FACES = [
    { value: 3, direction: new Vector3(0, 1, 0) }, // Top
    { value: 4, direction: new Vector3(0, -1, 0) }, // Bottom
    { value: 5, direction: new Vector3(0, 0, 1) }, // Front
    { value: 2, direction: new Vector3(0, 0, -1) }, // Back
    { value: 1, direction: new Vector3(1, 0, 0) }, // Right
    { value: 6, direction: new Vector3(-1, 0, 0) } // Left
];
export const DICE_SIZE: [number, number, number] = [2, 2, 2];
export const DICE_VELOCITY = 20;
export const INITIAL_DICE_GRAVITY_MULTIPLIER = 1;
export const DICE_GRAVITY_MULTIPLIER_RANGE = { min: 0, max: 5 };
export const INITIAL_DICE_MASS = 80;
export const DICE_MASS_RANGE = { min: 50, max: 120 };
export const INITIAL_DICE_BOUNCINESS = 0.2;
export const DICE_BOUNCINESS_RANGE = { min: 0, max: 1 };
export const INITIAL_DICE_FRICTION = 0.9;
export const DICE_FRICTION_RANGE = { min: 0.1, max: 1 };