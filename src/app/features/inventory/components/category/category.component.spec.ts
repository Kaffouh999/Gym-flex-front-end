import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Confirmation, ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Category } from 'src/app/core/models/Category';
import { CategoryService } from '../../services/category.service';

import { CategoryComponent } from './category.component';

let component: CategoryComponent;
let fixture: ComponentFixture<CategoryComponent>;
let categoryService: CategoryService;
let messageService: MessageService;
let confirmationService: ConfirmationService;
let formBuilder: FormBuilder;


beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [CategoryComponent],
    imports: [AppModule],
    providers: [CategoryService, MessageService, ConfirmationService, FormBuilder],
  }).compileComponents();
  fixture = TestBed.createComponent(CategoryComponent);
  component = fixture.componentInstance;
  categoryService = TestBed.inject(CategoryService);
  messageService = TestBed.inject(MessageService);
  confirmationService = TestBed.inject(ConfirmationService);
  formBuilder = TestBed.inject(FormBuilder);
});



it('should create the component', () => {
  expect(component).toBeTruthy();
});
it('should initialize the form and retrieve all categories on ngOnInit', () => {
  const categories: Category[] = [
    { id: 1, name: 'Category 1', description: 'Description 1', isForClient: false, isForInventory: false },
    { id: 2, name: 'Category 2', description: 'Description 2', isForClient: true, isForInventory: false },
    { id: 3, name: 'Category 3', description: 'Description 3', isForClient: false, isForInventory: true },
  ];

  const categoryServiceSpy = spyOn(categoryService, 'getAllCategories').and.returnValue(of(categories));
  console.log(categoryService)
  spyOn(formBuilder, 'group').and.callThrough();

  component.ngOnInit();

  expect(categoryServiceSpy).toHaveBeenCalled();

  expect(component.categories).toEqual(categories);
});

it('should add a new category when addCategory is called with an undefined ID', () => {
  const category: Category = {
    id: undefined,
    name: 'New Category',
    description: 'New Description',
    isForClient: true,
    isForInventory: false,
  };

  const categoryServiceSpy = spyOn(categoryService, 'addCategory').and.returnValue(of(category));
  const getAllSpy = spyOn(component, 'getAllCategories');

  // Manually trigger the ngOnInit method
 

  // Wait for any asynchronous tasks to complete
 
    // Access the categoryForm property
    const categoryForm = component.categoryForm;

  categoryForm.setValue({
    name: category.name,
    description: category.description,
    isForClient: category.isForClient,
    isForInventory: category.isForInventory,
  });
  component.addCategory();

  expect(categoryServiceSpy).toHaveBeenCalledWith(category);
  expect(getAllSpy).toHaveBeenCalled();
  expect(component.addDialog).toBeFalsy();

});

//-------
it('should edit a category when editCategory is called', () => {
  const category: Category = {
    id: 1,
    name: 'Category 1',
    description: 'Description 1',
    isForClient: false,
    isForInventory: false,
  };

  // Spy on the necessary methods
  spyOn(component, 'fillForm').and.callThrough();
  component.categoryInserted = null; // Set initial value to null

  // Call the editCategory method
  component.editCategory(category);

  // Check if the necessary methods were called with the correct arguments
  expect(component.fillForm).toHaveBeenCalledWith(category);
  expect(component.categoryInserted).toEqual(category);
  expect(component.addDialog).toBeTrue();
});


it('should update a category when addCategory is called with a defined ID', () => {
  const category: Category = {
    id: 1,
    name: 'Updated Category',
    description: 'Updated Description',
    isForClient: true,
    isForInventory: false,
  };

  const categoryServiceSpy = spyOn(categoryService, 'updateCategory').and.returnValue(of(category));
  const getAllSpy = spyOn(component, 'getAllCategories');


    const categoryForm = component.categoryForm;

    // Fill the form with the updated category data
    categoryForm.setValue({
      name: category.name,
      description: category.description,
      isForClient: category.isForClient,
      isForInventory: category.isForInventory,
    });

    // Set the categoryInserted with a defined ID
    component.categoryInserted = {
      id: category.id,
      name: undefined,
      description: undefined,
      isForClient: false,
      isForInventory: false,
    };

    // Call the addCategory method
    component.addCategory();

    // Expect the updateCategory method to be called with the updated category
    expect(categoryServiceSpy).toHaveBeenCalledWith(category.id, category);

    // Expect the getAllCategories method to be called
    expect(getAllSpy).toHaveBeenCalled();

    // Expect the addDialog to be closed
    expect(component.addDialog).toBeFalsy();

});


it('should delete a category when deleteCategory is called', () => {
  const category: Category = {
    id: 1,
    name: 'Category 1',
    description: 'Description 1',
    isForClient: false,
    isForInventory: false,
  };


  // Spy on the necessary methods
  const deleteCategorySpy = spyOn(categoryService, 'deleteCategory').and.returnValue(of({status:200}));
  const getAllCategoriesSpy = spyOn(component, 'getAllCategories');

  // Call the deleteCategory method
  component.delete(category);

  // Check if the necessary methods were called with the correct arguments

  expect(deleteCategorySpy).toHaveBeenCalledWith(category);
  expect(getAllCategoriesSpy).toHaveBeenCalled();

});


it('should open new dialog when openNew is called', () => {
  const category: Category = {
    id: undefined,
    name: undefined,
    description: undefined,
    isForClient: false,
    isForInventory: false,
  };

  spyOn(component, 'fillForm');
  
  // Call the openNew method
  component.openNew();

  // Expect the categoryInserted to be initialized correctly
  expect(component.categoryInserted).toEqual(category);

  // Expect the fillForm method to be called with the categoryInserted
  expect(component.fillForm).toHaveBeenCalledWith(category);

  // Expect the addDialog to be set to true
  expect(component.addDialog).toBe(true);
});

it('should hide dialog when hideDialog is called', () => {
  // Set addDialog to true
  component.addDialog = true;

  // Call the hideDialog method
  component.hideDialog();

  // Expect the addDialog to be set to false
  expect(component.addDialog).toBe(false);
});

it('should fill category correctly when fillCategory is called', () => {
  const categoryFormValue = {
    name: 'Test Category',
    description: 'Test Description',
    isForClient: true,
    isForInventory: false,
  };

  const expectedCategory: Category = {
    id: undefined,
    name: categoryFormValue.name,
    description: categoryFormValue.description,
    isForClient: categoryFormValue.isForClient,
    isForInventory: categoryFormValue.isForInventory,
  };

  // Set categoryForm value
  component.categoryForm.setValue(categoryFormValue);

  // Call the fillCategory method
  component.fillCategory();

  // Expect the categoryInserted to be filled correctly
  expect(component.categoryInserted).toEqual(expectedCategory);
});

it('should fill form correctly when fillForm is called', () => {
  const category: Category = {
    id: 1,
    name: 'Test Category',
    description: 'Test Description',
    isForClient: true,
    isForInventory: false,
  };

  // Call the fillForm method
  component.fillForm(category);

  // Expect the categoryInserted to be filled correctly
  expect(component.categoryInserted).toEqual({
    id: category.id,
    name: undefined,
    description: undefined,
    isForClient: false,
    isForInventory: false,
  });

  // Expect the categoryForm to be patched with the category data
  expect(component.categoryForm.value).toEqual({
    name: category.name,
    description: category.description,
    isForClient: category.isForClient,
    isForInventory: category.isForInventory,
  });
});
