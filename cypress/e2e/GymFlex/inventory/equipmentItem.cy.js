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

        cy.contains("inventory").click();

        cy.wait(1000);

        cy.contains("Equipment Item").click();

        cy.wait(1000);
    });

    it("Should add new Equipment Item", () => {
        //Test add Start
        cy.wait(1000);

        cy.get(".pi-plus").click({ force: true });

        cy.get("#equipment").click();

        cy.get("#equipment").type("equi");

        cy.get("#gymBranch").click();

        cy.get("#gymBranch").type("abt");

        cy.get("#firstUseDate").type("01/06/2023");

        cy.get("#amortization").clear();

        cy.get("#amortization").type(10);

        cy.get("#safeMinValue").clear();

        cy.get("#safeMinValue").type(20);

        cy.get("#price").clear();

        cy.get("#price").type(200);

        cy.wait(1000);
        cy.get("#save").click();

        cy.wait(1000);

        //Test add End
    });

    it("Should update last Equipment Item", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#safeMinValue").clear();

        cy.get("#safeMinValue").type(15);

        cy.get("#save").click();
        cy.wait(1000);

        //Test Edit End
    });

    it("Should delete last Equipment Item", () => {
        //Test delete Start

        cy.get(".pi-trash").last().click();
        cy.wait(1000);

        cy.contains("Yes").click();

        //Test delete End
    });
});
