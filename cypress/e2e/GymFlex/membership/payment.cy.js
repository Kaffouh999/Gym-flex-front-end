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

        cy.contains("Membership").click();

        cy.wait(1000);

        cy.contains("Payments").click();

        cy.wait(1000);
    });

    it("Should add new Subscription", () => {
        //Test add Start
        cy.wait(1000);

        cy.get(".pi-plus").click({ force: true });
        cy.wait(3000);

        cy.contains("Open New").click();

        cy.get("#amountPayed").clear();
        cy.get("#amountPayed").type(10);

        cy.get("#paymentDate").type("01/06/2023");

        cy.get("#save").click();

        cy.wait(2000);

        //Test add End
    });

    it("Should update last Subscription", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#paymentDate").clear();
        cy.get("#paymentDate").type("02/06/2023");
        cy.get("#save").click();
        cy.wait(1000);

        //Test Edit End
    });

    it("Should delete last Subscription", () => {
        //Test delete Start

        cy.get(".pi-trash").last().click();
        cy.wait(1000);

        cy.contains("Yes").click();

        //Test delete End
    });
});
