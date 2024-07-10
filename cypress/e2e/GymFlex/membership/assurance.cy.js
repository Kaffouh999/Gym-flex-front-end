import { faker } from "@faker-js/faker";
//<reference types="cypress" />
context("Actions", () => {
    beforeEach(() => {
        //   it('Visit',()=>{
        cy.visit("http://localhost:4200/#/web/login");
        Cypress.on("uncaught:exception", (err, runnable) => {
            return false;
        });

        cy.get("#username").type("othmanekaffouh2001@gmail.com");

        cy.get("#password").type("K@ffouh_2001");

        cy.get(".loginBtn").click();

        cy.contains("Membership").click();

        cy.wait(1000);

        cy.contains("Assurance").click();

        cy.wait(1000);
    });

    it("Should add new assurance", () => {
        //Test add Start

        cy.get(".pi-plus").click({ force: true });

        cy.get("#assurancAgency").type(faker.person.firstName());

        cy.get("#amountPayed").clear();

        cy.get("#amountPayed").type(100);

        cy.get("#startDate").type("01/06/2023");

        cy.get("#endDate").type("01/08/2023");

        cy.get("#save").click();

        cy.wait(1000);

        //Test add End
    });

    it("Should update last assurance", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#assurancAgency").clear();
        cy.get("#assurancAgency").type(faker.person.firstName());
        cy.get("#amountPayed").clear();

        cy.get("#amountPayed").type(150);
        cy.get("#save").click();
        cy.wait(1000);

        //Test Edit End
    });

    it("Should delete last assurance", () => {
        //Test delete Start

        cy.get(".pi-trash").last().click();
        cy.wait(1000);

        cy.contains("Yes").click();

        //Test delete End
    });
});
