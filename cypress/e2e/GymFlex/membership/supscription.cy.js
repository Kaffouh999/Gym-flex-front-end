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

        cy.contains("Subscriptions").click();

        cy.wait(1000);
    });

    it("Should add new Subscription", () => {
        //Test add Start
        cy.wait(1000);

        cy.get(".pi-plus").click({ force: true });

        cy.get("#startDate").type("01/06/2023");

        cy.get("#discountPercentage").clear();
        cy.get("#discountPercentage").type(5);
        cy.get("#save").click();

        cy.wait(1000);

        //Test add End
    });

    it("Should update last Subscription", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#discountPercentage").clear();
        cy.get("#discountPercentage").type(10);
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
