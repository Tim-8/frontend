import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";

export interface StudijskiProgram {
    id: number,
    naziv: String,
    fakultet: Fakultet,
    rukovodilac: Nastavnik,
    opis: String
}