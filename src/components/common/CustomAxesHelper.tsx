import { amber, blue, green } from "@mui/material/colors";
import { Billboard, Text } from "@react-three/drei";

type CustomAxesHelperProps = {
    size?: number
}

export default function CustomAxesHelper({ size = 4 }: CustomAxesHelperProps) {

    return (
        <>
            <axesHelper args={[size]}/>
            <Billboard position={[size + 0.15, 0.04, 0]} >
                <Text fontSize={0.3} anchorY={"middle"} anchorX={"center"} color={amber[500]}>x</Text>
            </Billboard>
            <Billboard position={[0, size + 0.3, 0]} >
                <Text fontSize={0.3} anchorY={"middle"} anchorX={"center"} color={green[400]}>y</Text>
            </Billboard>
            <Billboard position={[0, 0.04, size + 0.15]} >
                <Text fontSize={0.3} anchorY={"middle"} anchorX={"center"} color={blue[200]}>z</Text>
            </Billboard>
        </>
    );
}