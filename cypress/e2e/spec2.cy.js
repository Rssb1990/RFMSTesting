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
  
        cy.fixture('slipGenerationData2.json').then((dataFillingFile) =>{
          cy.log("inside fixture");
          let sizeOfJSONFile = dataFillingFile.length;
          cy.log(dataFillingFile.one)
          for(let loop_var = 0; loop_var < sizeOfJSONFile; loop_var++){
            cy.log("inside looop");
            let gender = dataFillingFile[loop_var][0];
            cy.log(gender);
          }
        })
  
        cy.log("Complete");
        
      })
  
    })