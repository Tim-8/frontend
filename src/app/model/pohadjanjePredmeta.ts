import { Predmet } from "./predmet";
import { Polaganje } from "./polaganje";

export interface PohadjanjePredmeta {
  id: number;
  konacnaOcena: number;
  predmet: Predmet;
  polaganja: Polaganje[];
}
