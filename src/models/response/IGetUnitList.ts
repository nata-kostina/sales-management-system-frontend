import { IUnit } from "../unit.interface";

export interface IGetUnitList {
    units: Pick<IUnit, "id" | "name">[];
}
