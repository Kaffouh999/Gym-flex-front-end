context('Actions', () => {
    beforeEach(() => {      
            cy.visit('http://localhost:4200/#/web/login')
            Cypress.on('uncaught:exception', (err, runnable) => { return false; })
    })

    it('login',()=>{

        cy.get('#username').type('othmanekaffouh2001@gmail.com')
    
        cy.get('#password').type('K@ffouh_2001')
    
        cy.get('.loginBtn').click()
    })
    
})