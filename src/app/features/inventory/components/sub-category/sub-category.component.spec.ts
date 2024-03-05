import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { SubCategory } from 'src/app/core/models/SubCategory';
import { SubCategoryService } from '../../services/sub-category.service';
import { SubCategoryComponent } from './sub-category.component';


let component: SubCategoryComponent;
let fixture: ComponentFixture<SubCategoryComponent>;
let subCategoryService: SubCategoryService;
let messageService: MessageService;
let confirmationService: ConfirmationService;
let formBuilder: FormBuilder;


beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [SubCategoryComponent],
    imports: [AppModule],
    providers: [SubCategoryService, MessageService, ConfirmationService, FormBuilder],
  }).compileComponents();
  fixture = TestBed.createComponent(SubCategoryComponent);
  component = fixture.componentInstance;
  subCategoryService = TestBed.inject(SubCategoryService);
  messageService = TestBed.inject(MessageService);
  confirmationService = TestBed.inject(ConfirmationService);
  formBuilder = TestBed.inject(FormBuilder);
});



it('should create the component', () => {
  expect(component).toBeTruthy();
});
it('should initialize the form and retrieve all subCategories on ngOnInit', () => {
  const subCategories: SubCategory[] = [
    { id: 1, name: 'SubCategory 1', description: 'Description 1', category:{ id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }},
    { id: 2, name: 'SubCategory 2', description: 'Description 2', category:{ id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }},
    { id: 3, name: 'SubCategory 3', description: 'Description 3', category:{ id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false } },
  ];

  const subCategorySpy = spyOn(subCategoryService, 'getAllSubCategories').and.returnValue(of(subCategories));
  console.log(subCategoryService)
  spyOn(formBuilder, 'group').and.callThrough();

  component.ngOnInit();

  expect(subCategorySpy).toHaveBeenCalled();

  expect(component.subCategories).toEqual(subCategories);
});

it('should add a new subCategory when saveSubCategoryInput is called with an undefined ID', () => {
  const subCategory: SubCategory = {
    id: undefined,
    name: 'New SubCategory',
    description: 'New Description',
    category:{ id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }
  };

  const subCategorySpy = spyOn(subCategoryService, 'addSubCategory').and.returnValue(of(subCategory));
  const getAllSpy = spyOn(component, 'getAllSubCategories');

  // Manually trigger the ngOnInit method
 

  // Wait for any asynchronous tasks to complete
 
    // Access the subCategoryForm property
    const subCategoryForm = component.subCategoryForm;

  subCategoryForm.setValue({
    name: subCategory.name,
    description: subCategory.description,
   category:subCategory.category
  });
  component.saveSubCategoryInput();

  expect(subCategorySpy).toHaveBeenCalledWith(subCategory);
  expect(getAllSpy).toHaveBeenCalled();
  expect(component.subCategoryDialog).toBeFalsy();

});

//-------
it('should edit a subCategory when editSubCategory is called', () => {
  const subCategory: SubCategory = {
    id: 1,
    name: undefined,
    description: undefined,
    category: undefined,
  };

  // Spy on the necessary methods
  const formSPy = spyOn(component, 'fillForm').and.callThrough();
  component.subCategoryInput = null; // Set initial value to null

  // Call the editCategory method
  component.editSubCategory(subCategory);

  // Check if the necessary methods were called with the correct arguments
  expect(formSPy).toHaveBeenCalledWith(subCategory);
  expect(component.subCategoryInput).toEqual(subCategory);
  expect(component.subCategoryDialog).toBeTrue();
});


it('should update a subCategory when saveSubCategoryInput is called with a defined ID', () => {
  const subCategory: SubCategory = {
    id: 1,
    name: 'Updated SubCategory',
    description: 'Updated Description',
   category:{ id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }
  };

  const subCategorySpy = spyOn(subCategoryService, 'updateSubCategory').and.returnValue(of(subCategory));
  const getAllSpy = spyOn(component, 'getAllSubCategories');


    const subCategoryForm = component.subCategoryForm;

    // Fill the form with the updated subCategory data
    subCategoryForm.setValue({
      name: subCategory.name,
      description: subCategory.description,
      category:subCategory.category
    });

    // Set the subCategoryInput with a defined ID
    component.subCategoryInput = {
      id: subCategory.id,
      name: undefined,
      description: undefined,
      category:undefined
    };

    // Call the saveSubCategoryInput method
    component.saveSubCategoryInput();

    // Expect the updateCategory method to be called with the updated subCategory
    expect(subCategorySpy).toHaveBeenCalledWith(subCategory.id, subCategory);

    // Expect the getAllCategories method to be called
    expect(getAllSpy).toHaveBeenCalled();

    // Expect the subCategoryDialog to be closed
    expect(component.subCategoryDialog).toBeFalsy();

});


it('should delete a subCategory when deleteCategory is called', () => {
  const subCategory: SubCategory = {
    id: 1,
    name: 'SubCategory 1',
    description: 'Description 1',
    category:{ id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }
  };


  // Spy on the necessary methods
  const deleteCategorySpy = spyOn(subCategoryService, 'deleteSubCategory').and.returnValue(of({status:200}));
  const getAllCategoriesSpy = spyOn(component, 'getAllSubCategories');

  // Call the deleteCategory method
  component.delete(subCategory);

  // Check if the necessary methods were called with the correct arguments

  expect(deleteCategorySpy).toHaveBeenCalledWith(subCategory);
  expect(getAllCategoriesSpy).toHaveBeenCalled();

});


it('should open new dialog when openNew is called', () => {
  const subCategory: SubCategory = {
    id: undefined,
    name: "",
    description: "",
    category:undefined
  };

  spyOn(component, 'fillForm');
  
  // Call the openNew method
  component.openNew();

  // Expect the subCategoryInput to be initialized correctly
  expect(component.subCategoryInput).toEqual(subCategory);

  // Expect the fillForm method to be called with the subCategoryInput
  expect(component.fillForm).toHaveBeenCalledWith(subCategory);

  // Expect the subCategoryDialog to be set to true
  expect(component.subCategoryDialog).toBe(true);
});

it('should hide dialog when hideDialog is called', () => {
  // Set subCategoryDialog to true
  component.subCategoryDialog = true;

  // Call the hideDialog method
  component.hideDialog();

  // Expect the subCategoryDialog to be set to false
  expect(component.subCategoryDialog).toBe(false);
});

it('should fill subCategory correctly when fillSubCategory is called', () => {
  const subCategoryFormValue= {
    name: "",
    description: "",
    category:  { id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }
  };

  const expectedSubCategory: SubCategory = {
    id: undefined,
    name: subCategoryFormValue.name,
    description: subCategoryFormValue.description,
    category:subCategoryFormValue.category
  };

  // Set subCategoryForm value
  component.subCategoryForm.setValue(subCategoryFormValue);

  // Call the fillCategory method
  component.fillSubCategory();

  // Expect the subCategoryInput to be filled correctly
  expect(component.subCategoryInput).toEqual(expectedSubCategory);
});

it('should fill form correctly when fillForm is called', () => {
  const subCategory: SubCategory = {
    id: 1,
    name: "",
    description: "",
    category: { id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false }
  };

  // Call the fillForm method
  component.fillForm(subCategory);

  // Expect the subCategoryInput to be filled correctly
  expect(component.subCategoryInput).toEqual( {
    id: 1,
    name: undefined,
    description: undefined,
    category: undefined
  });

  // Expect the subCategoryForm to be patched with the subCategory data
  expect(component.subCategoryForm.value).toEqual({
    name: subCategory.name,
    description: subCategory.description,
    category:subCategory.category
  });
});
