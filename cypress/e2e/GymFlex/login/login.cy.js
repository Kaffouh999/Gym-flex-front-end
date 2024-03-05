context('Actions', () => {
    beforeEach(() => {      
            cy.visit('http://localhost:4200/#/web/login')
            Cypress.on('uncaught:exception', (err, runnable) => { return false; })
    })

    it('login',()=>{

        cy.get('#username').type('youssef.mathchess@gmail.com')
    
        cy.get('#password').type('z')
    
        cy.get('.loginBtn').click()
    })
    
})