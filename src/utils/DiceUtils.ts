import { Quaternion, type Mesh } from "three";
import { DICE_FACES } from "../constants/scene";

export class DiceUtils {

    public static getDiceResult(mesh: Mesh): number {
        if (!mesh) return 0;

        let maxY = -Infinity;
        let result = 0;

        const worldQuaternion = new Quaternion();
        mesh.getWorldQuaternion(worldQuaternion);
        
        DICE_FACES.forEach(face => {
            const worldDirection = face.direction.clone().applyQuaternion(worldQuaternion);
            if (worldDirection.y > maxY) {
                maxY = worldDirection.y;
                result = face.value;
            }
        });

        return result;
    }

}