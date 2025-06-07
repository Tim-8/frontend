import { NaucnaOblast } from "./naucnaOblast";
import { TipZvanja } from "./tipZvanja";

export interface Zvanje {
    id: number,
    datumIzbora: String,
    datumPrestanka: String,
    tipZvanja: TipZvanja,
    naucnaOblast: NaucnaOblast
}