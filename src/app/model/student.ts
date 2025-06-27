import { RegistrovaniKorisnik } from "./registrovaniKorisnik";
import { StudentNaGodini } from "./studentNaGodini";

export interface Student extends RegistrovaniKorisnik {
    ime: String,
    jmbg: String,
    studentiNaGodini?: StudentNaGodini[];
}