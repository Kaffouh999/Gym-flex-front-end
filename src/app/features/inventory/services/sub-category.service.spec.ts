import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SubCategory } from 'src/app/core/models/SubCategory';

import { SubCategoryService } from './sub-category.service';

describe('SubCategoryService', () => {
  let service: SubCategoryService;

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [SubCategoryService]
    });
    service = TestBed.inject(SubCategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all subcategories', () => {
    const subcategories = [
      { id: 1, name: 'Subcategory 1', description: 'Description 1' },
      { id: 2, name: 'Subcategory 2', description: 'Description 2' },
      { id: 3, name: 'Subcategory 3', description: 'Description 3' }
    ];

    service.getAllSubCategories().subscribe(data => {
      expect(data).toEqual(subcategories);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/sub-categories');
    expect(req.request.method).toBe('GET');
    req.flush(subcategories);
  });

  it('should add a new subcategory', () => {
    const subcategory:SubCategory = {
      id: 1, name: 'New Subcategory', description: 'New Description',
      category: undefined
    };

    service.addSubCategory(subcategory).subscribe(data => {
      expect(data).toEqual(subcategory);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/sub-categories');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(subcategory);
    req.flush(subcategory);
  });

  it('should delete a subcategory', () => {
    const subcategory =  {
      id: 1, name: 'New Subcategory', description: 'New Description',
      category: undefined
    };

    service.deleteSubCategory(subcategory).subscribe(data => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/sub-categories/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update a subcategory', () => {
    const id = 1;
    const updatedSubcategory =  {
      id: 1, name: 'updated Subcategory', description: 'New Description',
      category: undefined
    };;

    service.updateSubCategory(id, updatedSubcategory).subscribe(data => {
      expect(data).toEqual(updatedSubcategory);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/sub-categories/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedSubcategory);
    req.flush(updatedSubcategory);
  });
});
