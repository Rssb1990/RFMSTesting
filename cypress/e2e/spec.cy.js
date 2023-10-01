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
      cy.get('.MuiList-root > li').contains('New Resitting Form').click();
      
      cy.fixture('initiationYear2.json').then((master_file) =>{
        
        for(let loop_var2=0; loop_var2<master_file.master_names.length; loop_var2++){

          let master_name = master_file.master_names[loop_var2];
          let years_of_presence = master_file.years_of_initiation[loop_var2]

          cy.get('[name="master"]').click().clear().type(`${master_name}`).type("{downarrow}").type("{enter}");
          cy.log(master_name);
          cy.log(years_of_presence);
        }
      
      })
      
    })

  })