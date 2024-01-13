import { IUnit } from "../entities/unit.interface";

export interface IGetUnitList {
    units: Pick<IUnit, "id" | "name">[];
}
export interface IGetUnitsResponse {
    units: IUnit[];
}
