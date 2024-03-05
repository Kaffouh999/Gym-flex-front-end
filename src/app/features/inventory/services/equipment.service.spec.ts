import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Equipemnt } from 'src/app/core/models/Equipment';

import { EquipmentService } from './equipment.service';

describe('EquipmentService', () => {
  let service: EquipmentService;


  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [EquipmentService]
    });
    service = TestBed.inject(EquipmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all equipment', () => {
    const equipment = [
      { id: 1, name: 'Equipment 1', description: 'Description 1' },
      { id: 2, name: 'Equipment 2', description: 'Description 2' },
      { id: 3, name: 'Equipment 3', description: 'Description 3' }
    ];

    service.getAllEquipment().subscribe(data => {
      expect(data).toEqual(equipment);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/equipment');
    expect(req.request.method).toBe('GET');
    req.flush(equipment);
  });

  it('should add a new equipment', () => {
    const equipment:Equipemnt = {
      id: 1, name: 'New Equipment', description: 'New Description',
      imageUrl: 'aaaaaaaaaaaaaaaa.jpg',
      subCategory: undefined
    };

    service.addEquipment(equipment).subscribe(data => {
      expect(data).toEqual(equipment);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/equipment');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(equipment);
    req.flush(equipment);
  });

  it('should delete an equipment', () => {
    const equipment:Equipemnt = {
      id: 1, name: 'Equipment 1', description: 'Description 1',
      imageUrl: 'bbbbbbbbbb.jpg',
      subCategory: undefined
    };

    service.deleteEquipment(equipment).subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/equipment/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update an equipment', () => {
    const id = 1;
    const updatedEquipment:Equipemnt  = {
      id: 1, name: 'Updated Equipment', description: 'Updated Description',
      imageUrl: 'updated.jpg',
      subCategory: undefined
    };

    service.updateEquipment(id, updatedEquipment).subscribe(data => {
      expect(data).toEqual(updatedEquipment);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/equipment/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEquipment);
    req.flush(updatedEquipment);
  });

  it('should upload an image', () => {
    const name = 'Equipment Image';
    const formData = new FormData();

    service.uploadImage(name, formData).subscribe(data => {
      expect(data).toBeTruthy(); // Adjust the expectation based on your API response
    });

    const req = httpMock.expectOne('http://localhost:8080/api/equipment/upload/' + name);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(formData);
    req.flush({}); // Adjust the response data if needed
  });

  
});
