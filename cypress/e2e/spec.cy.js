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
      
      cy.fixture('initiationYear2.json').then((master_file) =>{
        
        for(let loop_var2=0; loop_var2<master_file.master_names.length; loop_var2++){

          let master_name = master_file.master_names[loop_var2];
          let years_of_presence = master_file.years_of_initiation[loop_var2]

          let current_master = true;

          let test1 = years_of_presence[0] -1;
          let test2 = 0;
          let test3 = 0;

          if(years_of_presence.length==2) current_master = false;

          if(current_master){
            const currentDate = new Date();
            
            test3 = test1; //To be deleted. Chnaged with-> currentDate.getFullYear()+1

            cy.log(`test 3 in loop_var ${loop_var2} is ${test3}`);

            test2 = Math.floor((currentDate.getFullYear() + years_of_presence[0])/2)

            cy.log(`test 2 in loop_var ${loop_var2} is ${test2}`);
          } else {
            test3 = years_of_presence[1] +1;

            cy.log(`test 3 in loop_var ${loop_var2} is ${test3}`);

            test2 = Math.floor((years_of_presence[1]+years_of_presence[0])/2)

            cy.log(`test 2 in loop_var ${loop_var2} is ${test2}`);
          }

          cy.get('[name="master"]').click().clear().type(`${master_name}`).type("{downarrow}").type("{enter}");
          cy.get('#initiationmonth').click();
          cy.get('[name="initiationyear"]').click().clear().type(`${test1}`);
          cy.get('#initiationmonth').click();
          cy.get('[style="font-weight: bold; color: red;"]').should('have.text','Please enter valid year');


          cy.get('[name="initiationyear"]').click().clear().type(`${test2}`);
          cy.get('#initiationmonth').click();
          cy.get('[style="font-weight: bold; color: red;"]').should('not.exist');

          cy.get('[name="initiationyear"]').click().clear().type(`${test3}`);
          cy.get('#initiationmonth').click();
          cy.get('[style="font-weight: bold; color: red;"]').should('have.text','Please enter valid year');


        }
      
      })
      
    })

  })