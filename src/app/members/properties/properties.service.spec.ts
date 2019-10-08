import { TestBed } from '@angular/core/testing';

import { PropertiesService } from './properties.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IonicStorageModule } from '@ionic/storage';

describe('PropertiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
    providers: [PropertiesService, AuthenticationService]
  }));

  it('should be created', () => {
    const service: PropertiesService = TestBed.get(PropertiesService);
    expect(service).toBeTruthy();
  });
});
