import { useFrame, type ThreeEvent } from "@react-three/fiber"
import type { RapierRigidBody } from "@react-three/rapier"
import { useRef, useState, type RefObject } from "react"
import { Plane, Vector3, type Mesh } from "three"

export default function useDragControls(
    meshRef: RefObject<Mesh>, 
    bodyRef: RefObject<RapierRigidBody>,
    multiplier?: number,
    offsets?: { x?: number, y?: number, z?: number },
    throwable?: boolean
) {
    const dragPlaneRef = useRef<Plane>(new Plane());
    const normalRef = useRef<Vector3>(new Vector3());
    const targetRef = useRef<Vector3>(new Vector3());
    
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        event.stopPropagation();

        const mesh = meshRef.current;
        const body = bodyRef.current;
        if (!mesh || !body) return;

        setIsDragging(true);
        
        body.wakeUp();

        const normal = event.camera.getWorldDirection(normalRef.current).negate();
        dragPlaneRef.current.setFromNormalAndCoplanarPoint(normal, mesh.position);
    };
    const handlePointerUp = () => {
        setIsDragging(false);
        const body = bodyRef.current;
        if (body && !throwable) {
            body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        }
    };
    
    useFrame(({ camera, pointer, raycaster }) => {
        const body = bodyRef.current;
        const mesh = meshRef.current;
        if (!mesh || !body) return;

        raycaster.setFromCamera(pointer, camera);
        const intersection = raycaster.ray.intersectPlane(dragPlaneRef.current, targetRef.current);

        if (intersection && isDragging) {
            const current = body.translation();

            const velocityX = (intersection.x - current.x - (offsets?.x ?? 0)) * (multiplier ?? 10);
            const velocityY = (intersection.y - current.y - (offsets?.y ?? 0)) * (multiplier ?? 10);
            const velocityZ = (intersection.z - current.z - (offsets?.z ?? 0)) * (multiplier ?? 10);

            body.setLinvel({ x: velocityX, y: velocityY, z: velocityZ }, true);
        }
    });

    return { 
        isDragging, 
        handlers: { 
            handlePointerUp, handlePointerDown 
        } 
    };
}