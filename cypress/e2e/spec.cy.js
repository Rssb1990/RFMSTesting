describe('Testing Automation RFMS',()=>{ 
  let sum = undefined;
  it('RFMS',() =>{
      cy.visit('https://iamuat.zims.in:8081//Identity/Account/Login?ReturnUrl=https://rfms-uat.zims.in:13254/&AppName=rfms');

      cy.get('#Input_SewadarId').type('pro-hod');
      cy.get('#Input_Password').type('Rssb@1234');


      cy.get('.captcha-style').then(()=>{
          sum = Cypress.$('.captcha-style').text()
          sum = eval(sum);
          console.log(sum);

          cy.get('#DNT_CaptchaInputText').type(sum);
          cy.get('.btn').click().wait(1000);
      });
      cy.get('#app-menu-button').click();
      cy.get('.MuiList-root > li').contains('New Resitting Form').click();

      cy.fixture('slipGenerationData.json').then((dataFillingFile) =>{

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.Title}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root > #name').type(`${dataFillingFile.Name}`);

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.Father_name}`);

        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > #grandfathername').type(`${dataFillingFile.Grandfather_name}`);

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.State}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.District}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type(`${dataFillingFile.Post_office}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > #address').type(`${dataFillingFile.Address}`);

        cy.get('.MuiGrid-grid-xs-3 > .MuiButtonBase-root').click();

        //-------------------------------2nd Part checking-------------------------------------------------------------------------

        //Title checking
        cy.get('[id=":r1v:"]').should('have.value', 'Mr.');

        //Name checking
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > .css-rk8e6v > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root > input').should('have.value', `${dataFillingFile.Name}`);

        //Father checking
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > :nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > input').should('have.value', `${dataFillingFile.Father_name}`);

        //GrandFather checking
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root > input').should('have.value', `${dataFillingFile.Grandfather_name}`);

        //State
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > :nth-child(6) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > input').should('have.value', `${dataFillingFile.State}`);

        //District
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > :nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > input').should('have.value', `${dataFillingFile.District}`);

        //Postoffice
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > :nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root > input').should('have.value', `${dataFillingFile.Post_office}`);

        //Address
        cy.get(':nth-child(3) > .MuiGrid-spacing-xs-2 > :nth-child(10) > .MuiFormControl-root > .MuiInputBase-root > textarea').should('have.value', `${dataFillingFile.Address}`);


      })


      cy.log("Complete");
      
    })

  })