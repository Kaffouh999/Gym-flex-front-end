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

       // cy.wait(5);

        cy.get(".pi-id-card").click();

        //cy.wait(1000);
    });

    it("Should add new member", () => {
        //Test add Start
        cy.wait(2000);
        cy.get(".pi-plus").click({ force: true });
        cy.wait(2000);

        //cy.get("#user").click();

        cy.get("#firstName").type(faker.person.firstName());

        cy.get("#lastName").type(faker.person.lastName());

        cy.get("#age").clear();
        cy.get("#age").type(faker.datatype.number(9));

        cy.get("#gender").dblclick();

        cy.get("#cin").type(faker.random.alphaNumeric(6));

        //cy.get('#role').select('option')

        cy.get("#adress").type(faker.lorem.paragraph(1));

        cy.get("#email").type(faker.internet.email({ provider: "gmail.com" }));

        //cy.get('#gymBranch').select('option')

        cy.get("#login").type(faker.internet.email());

        cy.get("#password").type(faker.internet.password({ length: 8 }));

        cy.get("#save").click();

        cy.wait(1000);

        //Test add End
    });

    it("Should update last member", () => {
        //Test Edit Start

        cy.get(".pi-pencil").last().click();

        cy.get("#firstName").clear();

        cy.get("#firstName").type(faker.person.firstName("female"));

        cy.get("#gender").click();

        cy.get("#adress").clear();
        cy.get("#adress").type(faker.lorem.paragraph(1));

        cy.get("#save").click();
        cy.wait(1000);

        //Test Edit End
    });
    it("Should delete last member", () => {
        //Test delete Start
        cy.wait(1000);
        cy.get(".pi-trash").last().click();
        cy.wait(1000);

        cy.contains("Yes").click();

        //Test delete End
    });
});
