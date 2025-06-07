import { RegistrovaniKorisnik } from "./registrovaniKorisnik";

export interface Nastavnik extends RegistrovaniKorisnik {
    ime: String,
    biografija: String,
    jmbg: String,
    zvanjeId: number,
    naucnaOblastId: number,
    brojCasova: number
}