import { Adresa } from "./adresa";
import { Nastavnik } from "./nastavnik";
import { StudijskiProgram } from "./studijskiProgram";
import { Univerzitet } from "./univerzitet";

export interface Fakultet {
    id: number,
    naziv: string,
    adresa: Adresa, 
    univerzitet: Univerzitet,
    studijskiProgrami?: StudijskiProgram[]
    dekan: Nastavnik,
    opis: string
}