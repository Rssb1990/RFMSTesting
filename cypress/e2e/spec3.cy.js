describe('RFMS Testing Automation', () => {
    beforeEach(() => {
        let sum = undefined;
        cy.visit('https://iamuat.zims.in:8081//Identity/Account/Login?ReturnUrl=https://rfms-uat.zims.in:13254/&AppName=rfms');

        // cy.get('#Input_SewadarId').type('BH0011LB6735');
        // cy.get('#Input_Password').type('Rssb@12345');

        cy.get('#Input_SewadarId').type('pro-hod');
        cy.get('#Input_Password').type('Rssb@1234');


        cy.get('.captcha-style').then(()=>{
            sum = Cypress.$('.captcha-style').text()
            sum = eval(sum);
            console.log(sum);

            cy.get('#DNT_CaptchaInputText').type(sum);
            cy.get('.btn').click().wait(2000);
        });

        cy.get('#app-menu-button').click().wait(2000);
        cy.get('.MuiList-root > li').contains('New Resitting Form').click();
    });

    it('Checks if current date is visible',() =>{

        const currentDate = new Date();

        // Define an array of month names
        const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Get the day, month, and year components from the Date object

        let day = currentDate.getDate();

        if(day<10) day = '0' + day;

        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        // Create the formatted date string
        const formattedDate = `${day} ${month} ${year}`;

        cy.get('#formdate').should('have.value', formattedDate);

    });

    it('Checks if genders are in synchronization', ()=>{

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type('Miss').type('{downarrow}').type('{enter}');

        cy.get('#gender > div').should('have.text', 'FEMALE');

        cy.get('[name="title"]').should('have.value', 'Miss');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').contains('Father\'s Name');
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').contains('GrandFather Name');
        




        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().clear().type('Mr.').type('{downarrow}').type('{enter}');

        cy.get('#gender > div').should('have.text', 'MALE')
        cy.get('[name="title"]').should('have.value', 'Mr.');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').contains('Father\'s Name');
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').contains('GrandFather Name');




        // Mrs. checking
        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().clear().type('Mrs.').type('{downarrow}').type('{enter}');

        cy.get('#gender > div').should('have.text', 'FEMALE')
        cy.get('[name="title"]').should('have.value', 'Mrs.');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').contains('Husband\'s Name');
        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root').contains('Father in Law name');

    });

    it('Checks if age is coming right', () =>{
        
        const currentDate = new Date();
        let age = 0;
        cy.get('.css-1fbyq98 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root').click().type('02022000');

        const day = currentDate.getDate(); 
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        age = year - 2000;
        if( (month-2<0) || (day-2<0) ) age -=1;

        cy.get('#age').should('have.value',`${age}`);

    });

    it('Checks for all master initiaon years',() =>{

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

    // it('Initiation year testing(Maharaj Sawan Singh ji)', () =>{
    //     cy.get('[name="master"]').click().type('MAHARAJ SAWAN SINGH JI').type("{downarrow}").type("{enter}");

    //     cy.get('[name="initiationyear"]').click().type('1900');

    //     cy.get('#initiationmonth').click();
  
    //     cy.get('[style="font-weight: bold; color: red;"]').should('have.text','Please enter valid year');
  
    //     cy.get('[name="initiationyear"]').click().clear().type('1920');
        
    //     cy.get('#initiationmonth').click();
  
    //     cy.get('[style="font-weight: bold; color: red;"]').should('not.exist');
  
    //     cy.get('[name="initiationyear"]').click().clear().type('1950');
  
    //     cy.get('#initiationmonth').click();
  
    //     cy.get('[style="font-weight: bold; color: red;"]').should('have.text','Please enter valid year');

    // });
  
    
  })