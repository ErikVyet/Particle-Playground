import { useContext, useMemo, useRef } from "react";
import { Color, Euler, MathUtils, Points } from "three";
import { ArchimedeanSpiralContext } from "../../contexts/ArchimedeanSpiralContext";
import { useFrame } from "@react-three/fiber";
import { SPIRAL_ROTATE_SPEED } from "../../constants/scene";

export default function ArchimedeanSpiralScene() {
    const context = useContext(ArchimedeanSpiralContext);
    if (!context) return null;
    const { points, size, curves, curveSpread, spreadX, spreadZ, rotate } = context;

    const pointsRef = useRef<Points>(null!);
    const pointsRotation = useRef<Euler>(new Euler(0, 0, 0));

    const positions = useMemo(() => {
        const result = new Float32Array(points * 3);
        const thetaStep = (curves * 2 * Math.PI) / points;
        for (let i = 0, theta = 0; i < points; i++, theta += thetaStep) {
            const radius = curveSpread * theta;
            result[i * 3] = radius * Math.cos(theta) + MathUtils.randFloatSpread(spreadX); // x
            result[i * 3 + 1] = Math.sin(Math.random()); // y
            result[i * 3 + 2] = radius * Math.sin(theta) + MathUtils.randFloatSpread(spreadZ); // z
        }
        return result;
    }, [points, curves, curveSpread, spreadX, spreadZ]);

    useFrame(() => {
        const points = pointsRef.current;
        if (points && rotate) {
            pointsRotation.current.set(0, pointsRotation.current.y + 0.0005 * SPIRAL_ROTATE_SPEED, 0);
            points.setRotationFromEuler(pointsRotation.current);
        }
    });

    return (
        <group>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.3, 32, 32]}/>
                <meshStandardMaterial emissive={Color.NAMES.white} emissiveIntensity={2.5} />
            </mesh>
            <points ref={pointsRef} position={[0, -0.4, 0]}>
                <bufferGeometry>
                    <bufferAttribute attach={"attributes-position"} args={[positions, 3]}/>
                </bufferGeometry>
                <pointsMaterial color={Color.NAMES.white} size={size}/>
            </points>
        </group>
    );
}