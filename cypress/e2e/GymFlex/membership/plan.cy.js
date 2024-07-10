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

        cy.contains("Plan").click();

        cy.wait(1000);
    });

    it("Should add new plan", () => {
        //Test add Start
        cy.wait(1000);

        cy.get(".pi-plus").click({ force: true });

        cy.get("#name").type(faker.person.firstName());

        cy.get("#description").type(faker.lorem.paragraph(1));

        cy.get("#duration").clear();
        cy.get("#duration").type(faker.datatype.number({ min: 60, max: 90 }));

        cy.get("#price").clear();
        cy.get("#price").type(150);

        cy.get("#save").click();

        cy.wait(5000);

        //Test add End
    });

    it("Should update last plan", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#name").clear();
        cy.get("#name").type(faker.person.firstName());
        cy.get("#description").clear();
        cy.get("#description").type(faker.lorem.paragraph(1));
        cy.get("#duration").clear();
        cy.get("#duration").type(faker.datatype.number({ min: 60, max: 90 }));

        cy.get("#save").click();
        cy.wait(5000);

        //Test Edit End
    });

    it("Should delete last plan", () => {
        //Test delete Start

        cy.get(".pi-trash").last().click();
        cy.wait(1000);

        cy.contains("Yes").click();

        //Test delete End
    });
});
