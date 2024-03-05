import { EquipemntItem } from "./EquipmentItem";
import { Member } from "./Member";

export interface Reform {
    id: number | undefined;
    decisionDate: Date | undefined;
    comment: String | undefined;
    item: EquipemntItem;
    decider: Member;
}
