describe('Testing Automation RFMS',()=>{ 
    let sum = undefined;
    it('RFMS',() =>{
        cy.visit('https://iamuat.zims.in:8081//Identity/Account/Login?ReturnUrl=https://rfms-uat.zims.in:13254/&AppName=rfms');

        cy.get('#Input_SewadarId').type('BH0011LB6735');
        cy.get('#Input_Password').type('Rssb@12345');


        cy.get('.captcha-style').then(()=>{
            sum = Cypress.$('.captcha-style').text()
            sum = eval(sum);
            console.log(sum);

            cy.get('#DNT_CaptchaInputText').type(sum);
            cy.get('.btn').click().wait(2000);
        });




        cy.get('#app-menu-button').click();
        cy.get('.MuiList-root > [tabindex="0"]').click();

        cy.get(
            ":nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
          )
            .click()
            .clear()
            .type("Mr.")
            .type("{downarrow}")
            .type("{enter}");
      
          cy.get(
            ":nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root > #name"
          ).type("Kunal");
      
          cy.get(
            ":nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root"
          ).type("Pawan");
      
          cy.get(
            ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > #grandfathername"
          ).type("Bodhraj");
      
          cy.get(
            ":nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
          )
            
            .type("DELHI")
            .type("{downarrow}")
            .type("{enter}");
            cy.wait(2000)
      
          cy.get(
            ":nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
          )
            .type("DELHI")
            .type("{downarrow}")
            .type("{enter}");
            cy.wait(2000)
      
      
          cy.get(
            ":nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
          ) 
            .type("DELHI")
            .type("{downarrow}")
            .type("{enter}");
            cy.wait(2000)
      
          cy.get(
            ":nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > #address"
          ).type("Abcd");

          cy.get('[name="title"]').invoke('val').then((second_box_val) =>{
            let data1 = `${second_box_val}`;
            cy.get("#:r2:").invoke('val').then((first_box_val) =>{
                let data2 = `${first_box_val}`;
                expect(data1).equal(data2);
            })
          })
    })

})
