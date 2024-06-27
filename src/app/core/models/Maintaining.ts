import { EquipemntItem } from "./EquipmentItem";
import { Member } from "./Member";

export interface Maintaining {
    id: number | undefined;
    item: EquipemntItem | undefined;
    maintainerResponsible: Member | undefined;
    startDate: Date | undefined;
    endDate: Date | undefined;
    cost: number;
}
