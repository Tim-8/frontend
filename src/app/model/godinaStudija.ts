import { Fakultet } from "./fakultet";
import { Predmet } from "./predmet";

export interface GodinaStudija {
    id: number,
    predmeti?: Predmet,
    fakultet: Fakultet
}