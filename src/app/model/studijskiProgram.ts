import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";

export interface StudijskiProgram {
    id: number,
    naziv: string,
    fakultet: Fakultet,
    rukovodilac: Nastavnik,
    opis: string
}