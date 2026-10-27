import { blue, blueGrey, green, grey, purple, red, yellow,  } from "@mui/material/colors";
import { Center, Edges, MeshReflectorMaterial, Text3D } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useContext, useMemo, useRef } from "react";
import { DashboardContext } from "../../contexts/DashboardContext";
import { MathUtils, type Mesh } from "three";
import { BAR_LAMBDA } from "../../constants/scene";

type BarMeshProps = {
    index?: number,
    label?: string,
    baseHeight: number,
    height: number
}

function BarMesh({ index = 0, label, baseHeight, height }: BarMeshProps) {
    const barRef = useRef<Mesh>(null!);
    const textRef = useRef<Mesh>(null!);

    const columnColor = useMemo(() => {
        switch (index) {
            case (0): return red[700];
            case (1): return green[700];
            case (2): return blue[700];
            case (3): return yellow[700];
            default: return purple[700];
        }
    }, [index]);

    const edgeColor = useMemo(() => {
        switch (index) {
            case (0): return red.A200;
            case (1): return green.A200;
            case (2): return blue.A200;
            case (3): return yellow.A200;
            default: return purple.A200;
        }
    }, [index]);

    const textColor = useMemo(() => {
        switch (index) {
            case (0): return red.A700;
            case (1): return green.A700;
            case (2): return blue.A100;
            case (3): return yellow.A700;
            default: return purple.A400;
        }
    }, [index]);

    useFrame((_, delta) => {
        const bar = barRef.current;
        const text = textRef.current;
        if (!bar || !text) return;

        bar.scale.y = MathUtils.damp(bar.scale.y, (height === 0 ? 0.05 : height) / baseHeight, BAR_LAMBDA, delta);
        bar.position.y = MathUtils.damp(bar.position.y, height / 2, BAR_LAMBDA, delta);

        text.position.y = MathUtils.damp(text.position.y, height + 0.4, BAR_LAMBDA, delta);
    });

    return (
        <group position={[3 * (index - 2), 0, 0]}>
            <mesh ref={barRef} castShadow receiveShadow>
                <boxGeometry args={[1, baseHeight, 1]} />
                <meshPhysicalMaterial color={columnColor} transmission={0.5} opacity={0.2} transparent/>
                <Edges color={edgeColor} lineWidth={0.4} />
            </mesh>
            <Center disableY>
                <Text3D ref={textRef} font={"/fonts/SourceCodePro-Regular.json"} position={[0, baseHeight + 0.4, 0]} height={0.05} size={0.3} castShadow>
                    {height}
                    <meshStandardMaterial color={textColor} metalness={2} />
                </Text3D>
            </Center>
            {label && (
                <Center key={label} disableZ>
                    <Text3D font={"/fonts/SourceCodePro-Regular.json"} position={[0, 0, 1]} rotation={[-Math.PI / 2, 0, 0]} height={0.05} size={0.3}>
                        {label}
                        <meshStandardMaterial color={textColor} metalness={2} />
                    </Text3D>
                </Center>
            )}
        </group>
    );
}

export default function BarChartScene() {
    const context = useContext(DashboardContext);
    if (!context) return null;
    const { data } = context;

    return (
        <group>
            <mesh position={[0, -0.5, 0]} rotation={[0, Math.PI / 4, 0]} receiveShadow castShadow>
                <boxGeometry args={[12, 1, 12]}/>
                <gridHelper args={[12, 6, grey[900], grey[900]]} position={[0, 0.51, 0]}/>
                <MeshReflectorMaterial color={blueGrey[400]} mirror={0.5} resolution={2048} mixStrength={1.5} metalness={2} roughness={0.85}/>
            </mesh>
            <mesh position={[0, -1, 0]} rotation={[0, Math.PI / 4, 0]} receiveShadow castShadow>
                <boxGeometry args={[13, 1, 13]}/>
                <gridHelper args={[13, 6.5, grey[900], grey[900]]} position={[0, 0.51, 0]}/>
                <MeshReflectorMaterial color={blueGrey[400]} mirror={0.5} resolution={2048} mixStrength={1.5} metalness={2} roughness={0.85}/>
            </mesh>
            <mesh position={[0, -1.5, 0]} rotation={[0, Math.PI / 4, 0]} receiveShadow castShadow>
                <boxGeometry args={[16, 1, 16]}/>
                <gridHelper args={[16, 8, grey[900], grey[900]]} position={[0, 0.51, 0]}/>
                <MeshReflectorMaterial color={blueGrey[400]} mirror={0.5} resolution={2048} mixStrength={1.5} metalness={2} roughness={0.85}/>
            </mesh>
            <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[1000, 1000, 64, 64]}/>
                <MeshReflectorMaterial color={blueGrey[100]} mirror={0.9} resolution={2048} mixStrength={1.5} metalness={2} roughness={0.85}/>
            </mesh>
            {data.map((column, index) =>
                <BarMesh height={column.height} baseHeight={column.baseHeight} label={column.label} index={index} key={column.id}/>
            )}
        </group>
    );
}