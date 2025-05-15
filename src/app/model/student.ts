import { RegistrovaniKorisnik } from "./registrovaniKorisnik";

export interface Student extends RegistrovaniKorisnik {
    ime: String,
    jmbg: String
}