import { TestBed } from '@angular/core/testing';

import { RegistrovaniKorisnikService } from './registrovani-korisnik.service';

describe('RegistrovaniKorisnikService', () => {
  let service: RegistrovaniKorisnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrovaniKorisnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
