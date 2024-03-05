import { Equipemnt } from "./Equipment";
import { GymBranch } from "./GymBranch";

export interface EquipemntItem {
    id: number | undefined;
    firstUseDate: Date | undefined;
    price: number;
    amortization: number;
    bareCode: string;
    safeMinValue: number;
    equipment: Equipemnt | undefined;
    gymBranch: GymBranch | undefined;
}
