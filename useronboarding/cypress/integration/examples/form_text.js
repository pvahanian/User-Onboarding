describe('Boarding app', () => {
    beforeEach(() => {
      // arbitrary code you want running
      // before each test
      cy.visit('http://localhost:3000')
    })
    const textInput = () => cy.get('input[name=name]') //Shortcut for
    const emailInput = () => cy.get('input[name=email]') //Shortcut for
    // a test that will get the text input so we can run tests on it
    const passwordInput = () => cy.get(`input[name="password"]`)
    const serviceInput = () => cy.get(`input[name="service"]`)

    const submitBtn = () => cy.get(`button[id="submitBtn"]`)
    // it('This test is going to be for a name text box/email', () =>{
    //     textInput().should('exist') //should exist  
    //     emailInput().should('exist')
    // })

    it('This test is going to be for a name text box', () =>{
        textInput()
        .type('Pablo') //Type is invoked to manually change the value of the text to ("whatever u want")
        .should('have.value', "Pablo") //Should checks to make sure it == the value 
    })

    
    it('Get the `Email` input and type an email address in it', () =>{
        emailInput().
        type('Jabril@gmail.com')
    })
    it('Get the `password` input and type a password in it', () =>{
        passwordInput().
        type('abc123')

    })
     it('Get the `service` input tests', () =>{
        serviceInput()
        .should('exist')
        .should('have.value','false')
        .type('true')
        
    }) 

    it('Fill in and submit', () =>{
        serviceInput().type('true')
        passwordInput().type('abc1233')
        emailInput().type('Jabril@gmail.com')
        textInput().type('Pablo')
        submitBtn().click()
    })

})