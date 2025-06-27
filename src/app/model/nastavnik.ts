import { RegistrovaniKorisnik } from "./registrovaniKorisnik";
import { Zvanje } from "./zvanje";

export interface Nastavnik extends RegistrovaniKorisnik {
    ime: String,
    biografija: String,
    jmbg: String,
    zvanje: Zvanje
}