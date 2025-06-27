import { Adresa } from "./adresa";
import { Fakultet } from "./fakultet";
import { Nastavnik } from "./nastavnik";

export interface Univerzitet {
    id: number,
    naziv: String,
    datumOsnivanja: String,
    adresa: Adresa,
    fakulteti?: Fakultet[],
    rektor: Nastavnik,
    opis: String
}