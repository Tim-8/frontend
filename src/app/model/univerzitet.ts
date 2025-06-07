import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";

export interface Univerzitet {
    id: number,
    naziv: String,
    datumOsnivanja: String,
    rektor: Nastavnik,
    opis: String
}