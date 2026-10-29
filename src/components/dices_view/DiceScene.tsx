import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { ActiveCollisionTypes } from "@dimforge/rapier3d-compat";
import { grey } from "@mui/material/colors";
import { DICE_SIZE, DICE_VELOCITY } from "../../constants/scene";
import { useContext, useEffect, useRef, useState } from "react";
import { DiceContext } from "../../contexts/DiceContext";
import { Mesh } from "three";
import { DICE_RIGID_BODY_COMMON_RPOPS } from "../../constants/props";
import useDragControls from "../../hooks/useDragControls";
import { DICE_TEXTURE_PATHS } from "../../constants/paths";
import { extend, useFrame } from "@react-three/fiber";
import { RoundedBoxGeometry } from "three-stdlib";
import { DiceUtils } from "../../utils/DiceUtils";

extend({ RoundedBoxGeometry });

declare module '@react-three/fiber' {
    interface ThreeElements {
        roundedBoxGeometry: any
    }
};

export function Dice() {
    const context = useContext(DiceContext);
    if (!context) return null;
    const { mass, bounciness, friction, setIsDragging, canvasRef, setLastRollNumber } = context;

    const [one, two, three, four, five, six] = useTexture(DICE_TEXTURE_PATHS);

    const diceMeshRef = useRef<Mesh>(null!);
    const diceBodyRef = useRef<RapierRigidBody>(null!);

    const [isSleeping, setIsSleeping] = useState(true);

    const { isDragging, handlers: { handlePointerUp, handlePointerDown } } = useDragControls(diceMeshRef, diceBodyRef, DICE_VELOCITY, {}, true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.onpointerup = handlePointerUp;
        }
    }, [canvasRef.current]);

    useEffect(() => {
        setIsDragging(isDragging);
        if (isDragging) {
            document.body.style.cursor = "grabbing";
        }
        else {
            document.body.style.cursor = "auto";
        }
    }, [isDragging]);

    useEffect(() => {
        const diceMesh = diceMeshRef.current;
        const diceBody = diceBodyRef.current;
        if (!diceMesh || !diceBody || !isSleeping) return;
        
        const result = DiceUtils.getDiceResult(diceMesh);
        setLastRollNumber(prev => prev !== result ? result : prev);
    }, [isSleeping]);

    useFrame(() => {
        const diceBody = diceBodyRef.current;
        if (!diceBody) return;

        setIsSleeping(diceBody.isSleeping());
    });

    const handlePointerOver = () => {
        if (!isDragging) {
            document.body.style.cursor = "pointer";
        }
    };
    const handlePointerOut = () => {
        if (!isDragging) {
            document.body.style.cursor = "auto";
        }
    };

    return (
        <RigidBody ref={diceBodyRef} density={mass} friction={friction} restitution={bounciness} key={`${mass}-${bounciness}-${friction}`} {...DICE_RIGID_BODY_COMMON_RPOPS}>
            <mesh ref={diceMeshRef} position={[0, 2, 0]} castShadow receiveShadow onPointerDown={handlePointerDown} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
                <roundedBoxGeometry args={[...DICE_SIZE, 4, 0.1]}/>
                <meshStandardMaterial attach={"material-0"} map={one} />
                <meshStandardMaterial attach={"material-1"} map={six} />
                <meshStandardMaterial attach={"material-2"} map={three} />
                <meshStandardMaterial attach={"material-3"} map={four} />
                <meshStandardMaterial attach={"material-4"} map={five} />
                <meshStandardMaterial attach={"material-5"} map={two} />
            </mesh>
            {/* <RoundedBox ref={diceMeshRef} args={[...DICE_SIZE]} position={[0, 2, 0]} radius={0.1} smoothness={4} castShadow receiveShadow onPointerDown={handlePointerDown} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut}>
                <meshStandardMaterial color={grey[100]}/>
            </RoundedBox> */}
        </RigidBody>
    );
}

export default function DiceScene() {
    const context = useContext(DiceContext);
    if (!context) return null;
    const { gravityMultiplier, bounciness } = context;

    return (
        <Physics gravity={[0, -9.81 * gravityMultiplier, 0]}>
            <RigidBody type={"fixed"} colliders={"hull"} restitution={bounciness} activeCollisionTypes={ActiveCollisionTypes.ALL} key={bounciness} ccd>
                <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <planeGeometry args={[1000, 1000, 64, 64]} />
                    <MeshReflectorMaterial color={grey[300]} resolution={2048} mixStrength={1.5} metalness={2} roughness={0.85} />
                </mesh>
            </RigidBody>
            <Dice />
        </Physics>
    );
}