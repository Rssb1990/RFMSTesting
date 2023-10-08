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
          cy.get('.btn').click().wait(2000);
      });
      cy.get('#app-menu-button').click();
      cy.get('.MuiList-root > li').contains('New Resitting Form').click();

      cy.fixture('slipGenerationData.json').then((dataFillingFile) =>{

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.Title}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root > #name').type(`${dataFillingFile.Name}`);

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.Father_name}`);

        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > #grandfathername').type(`${dataFillingFile.Grandfather_name}`);

        // -----------------------------------------------------------------
        //Add country Selection option also. Its currently missing.
        // -----------------------------------------------------------------

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.State}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.District}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type(`${dataFillingFile.Post_office}`).type('{downarrow}').type('{enter}');

        cy.get(':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > #address').type(`${dataFillingFile.Address}`);

        cy.get('.css-1fbyq98 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root');

        cy.get('.css-1fbyq98 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root').click().type(`${dataFillingFile.DOB}`);

        cy.get('.MuiGrid-grid-xs-3 > .MuiButtonBase-root').click();

        cy.get('[name="master"]').click().clear().type(`${dataFillingFile.Master_name}`).type("{downarrow}").type("{enter}");

        cy.get('[name="initiationyear"]').click().clear().type(`${dataFillingFile.Initiation_year}`);

        cy.get('[name="placeof initiation"]').click().type(`${dataFillingFile.Place_of_initiation}`).type("{downarrow}").type("{enter}");

        cy.get('[name="initiatedas"]').click().clear().type(`${dataFillingFile.Initiated_as}`).type("{downarrow}").type("{enter}");

        cy.get('.css-kh98e3 > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input').check();

        cy.get('#root > main > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.content-panel.css-bp6iic > footer > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-true.css-1kycp66 > button').click();

        cy.get(':nth-child(1) > .ResittingFormView_left-normal-padding__-uuXl').should('exist')

        // cy.get('h1').should('have.text', 'NAAMDAAN RE-SITTING APPLICATION FORM');


      })

      cy.log("Complete");
      
    })

  })