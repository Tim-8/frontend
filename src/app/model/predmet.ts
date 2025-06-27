import { GodinaStudija } from "./godinaStudija";

export interface Predmet {
    id: number;
    naziv: string;
    espb: number;
    obavezan: boolean;
    brojPredavanja: number;
    brojVezbi: number;
    godinaStudija: GodinaStudija
}