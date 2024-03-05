import { faker } from "@faker-js/faker";
//<reference types="cypress" />
context("Actions", () => {
    beforeEach(() => {
        //   it('Visit',()=>{
        cy.visit("http://localhost:4200/#/web/login");
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        });

        cy.get("#username").type("youssef.mathchess@gmail.com");

        cy.get("#password").type("z");

        cy.get(".loginBtn").click();

        cy.get(".pi-bars").click();

        cy.contains("inventory").click();

        cy.wait(1000);

        cy.contains("sub-category").click();

        cy.wait(1000);
    });

    it("Should add new sub-category", () => {
        //Test add Start
        cy.wait(1000);

        cy.get(".pi-plus").click({ force: true });

        cy.get("#name").type(faker.person.firstName("male"));

        cy.get("#description").type(faker.lorem.paragraph(1));

        cy.get("#category").click();

        cy.get("#category").type("han");
        cy.wait(1000);
        cy.get("#save").click();

        cy.wait(1000);

        //Test add End
    });

    it("Should update last sub-category", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#description").clear();
        cy.get("#description").type(faker.lorem.paragraph(1));

        cy.get("#save").click();
        cy.wait(1000);

        //Test Edit End
    });

    it("Should delete last sub-category", () => {
        //Test delete Start

        cy.get(".pi-trash").last().click();
        cy.wait(1000);

        cy.contains("Yes").click();

        //Test delete End
    });
});
