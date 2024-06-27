import { EquipemntItem } from "./EquipmentItem";
import { Member } from "./Member";

export interface Reform {
    id: number | undefined;
    decisionDate: Date | undefined;
    comment: string | undefined;
    item: EquipemntItem;
    decider: Member;
}
