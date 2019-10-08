import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, async } from '@angular/core/testing';
import { PropertiesService } from './properties.service';
import { IonicStorageModule } from '@ionic/storage';

describe('PropertyService', () => {

  let httpMock: HttpTestingController;
  let propertyService: PropertiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, IonicStorageModule.forRoot()
      ],
      providers: [
        PropertiesService
      ]
    });

    propertyService = TestBed.get(PropertiesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PropertiesService], (service: PropertiesService) => {
    expect(service).toBeTruthy();
  }));

  it('should call http post with correct path when listing properties', () => {
    propertyService.getProperties({}, { limit: 10, offset: 0 })
      .then((resp) => {

        const req = httpMock.expectOne((request) => {
          return request.method === 'POST' &&
            JSON.stringify(request.body) === '{}' &&
            request.url === 'http://localhost:3000/api/properties';
        });
        req.flush([]);
    
      });

    httpMock.verify();
  });
});
