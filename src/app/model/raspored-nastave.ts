import { Nastavnik } from "./nastavnik";
import { Predmet } from "./predmet";
import { StudijskiProgram } from "./studijskiProgram";

export interface RasporedNastave {
    id: number,
    vrijemePocetka: string,
    vrijemeKraja: string,
    predmet: Predmet,
    tipNastave: string,
    nastavnik: Nastavnik,
    godina: string,
    studijskiProgram: StudijskiProgram
}