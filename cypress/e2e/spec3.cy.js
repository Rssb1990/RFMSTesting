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

    it('Place and form type check', () =>{
      cy.get('#place > div').should('have.text','DELHI (DLH)');

      cy.get('#formtype > div').should('have.text','INDIAN');
      
    })

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

    it('Checks if Initiated as is in sync with Spouse name', () =>{

        cy.get('[name="initiatedas"]').click().clear().type('SINGLE').type("{downarrow}").type("{enter}");

        cy.get('[name="spousename"]').should('be.disabled');
  
        cy.get('[name="initiatedas"]').click().clear().type('COUPLE').type("{downarrow}").type("{enter}");
  
        cy.get('[name="spousename"]').should('be.enabled');
    })

    it('Checks if copy button in working or not', () =>{
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
    })

    it('Checks for all master initiation years',() =>{

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

    //------------------------------------------------------------------------------------------------------------------

              //KEPT FOR TESTING SCRIPT (ROUGH)

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

    //--------------------------------------------------------------------------------------------------------------------

    it('Submission of form and Form number generation', () =>{

      //------------------------------------------------------------------------------------------------------------------------
      // Improvements required are that Test data JSON file need to be improved and new way of filling data will be introduced.
      //-------------------------------------------------------------------------------------------------------------------------


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

        cy.get(':nth-child(2) > h2').should('exist');

      })
    })

    it('Submit forms and checks data', () =>{
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

        cy.get('#root > main > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.content-panel.css-bp6iic > footer > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-true.css-1kycp66 > button').click().wait(1000);

        cy.get(':nth-child(2) > h2').should('exist');

        //-------------------------------------Very Sensitive to changes in frontend-------------------------------------------------

        //Title
        cy.get(':nth-child(2) > ul > .ResittingFormView_twin-attributes__e6CBs > :nth-child(1) > :nth-child(2)').should('have.text', `${dataFillingFile.Title}`); 

        //Name
        cy.get(':nth-child(2) > ul > .ResittingFormView_twin-attributes__e6CBs > :nth-child(2) > :nth-child(2)').should('have.text', `${dataFillingFile.Name}`);

        //Father name
        cy.get(':nth-child(2) > ul > :nth-child(3) > :nth-child(2)').should('have.text', `${dataFillingFile.Father_name}`);

        //Grand Father name
        cy.get(':nth-child(2) > ul > :nth-child(4) > :nth-child(2)').should('have.text', `${dataFillingFile.Grandfather_name}`);

        //Gender
        cy.get(':nth-child(2) > ul > :nth-child(2) > :nth-child(2)').should('have.text', `${dataFillingFile.Gender}`);

        // Address
        cy.get(':nth-child(8) > [colspan="3"]').should('have.text', `${dataFillingFile.Address}`);

        //Post Office
        cy.get(':nth-child(2) > ul > :nth-child(8) > :nth-child(2)').should('have.text', `${dataFillingFile.Post_office}`);

        //State
        cy.get(':nth-child(2) > ul > :nth-child(6) > :nth-child(2)').should('have.text', `${dataFillingFile.State}`);

        //District
        cy.get(':nth-child(2) > ul > :nth-child(7) > :nth-child(2)').should('have.text', `${dataFillingFile.District}`);

        /*=============================================2nd Part testing==========================================================*/ 

        //Mr. 
        cy.get(':nth-child(3) > ul > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', `${dataFillingFile.Title}`);

        //Name
        cy.get(':nth-child(3) > ul > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', `${dataFillingFile.Name}`);

        //Father
        cy.get(':nth-child(3) > ul > :nth-child(3) > :nth-child(2)').should('have.text', `${dataFillingFile.Father_name}`);

        //Grand Father
        cy.get(':nth-child(3) > ul > :nth-child(4) > :nth-child(2)').should('have.text', `${dataFillingFile.Grandfather_name}`);

        //State
        cy.get(':nth-child(3) > ul > :nth-child(6) > :nth-child(2)').should('have.text', `${dataFillingFile.State}`);

        //District
        cy.get(':nth-child(3) > ul > :nth-child(7) > :nth-child(2)').should('have.text', `${dataFillingFile.District}`);

        //Address
        cy.get(':nth-child(3) > ul > :nth-child(10) > :nth-child(2)').should('have.text', `${dataFillingFile.Address}`);

        /*===========================================Initiation Details======================================================= */

        //Master name
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(1) > :nth-child(2)').should('have.text', `${dataFillingFile.Master_name}`);
        
        //Place of Initiation
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(3) > :nth-child(2)').should('have.text', `${dataFillingFile.Place_of_initiation}`);

        //Initiation Year
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(4) > :nth-child(2)').should('have.text', `${dataFillingFile.Initiation_year}`);

        //Initiated as
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(6) > :nth-child(2)').should('have.text', `${dataFillingFile.Initiated_as}`);

      })
    })

    it('Submit forms and checks data', () =>{
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

        cy.get('#root > main > div.MuiGrid-root.MuiGrid-container.MuiGrid-direction-xs-column.content-panel.css-bp6iic > footer > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-true.css-1kycp66 > button').click().wait(1000);

        cy.get(':nth-child(2) > h2').should('exist');

        //-------------------------------------Very Sensitive to changes in frontend-------------------------------------------------

        //Title
        cy.get(':nth-child(2) > ul > .ResittingFormView_twin-attributes__e6CBs > :nth-child(1) > :nth-child(2)').should('have.text', `${dataFillingFile.Title}`); 

        //Name
        cy.get(':nth-child(2) > ul > .ResittingFormView_twin-attributes__e6CBs > :nth-child(2) > :nth-child(2)').should('have.text', `${dataFillingFile.Name}`);

        //Father name
        cy.get(':nth-child(2) > ul > :nth-child(3) > :nth-child(2)').should('have.text', `${dataFillingFile.Father_name}`);

        //Grand Father name
        cy.get(':nth-child(2) > ul > :nth-child(4) > :nth-child(2)').should('have.text', `${dataFillingFile.Grandfather_name}`);

        //Gender
        cy.get(':nth-child(2) > ul > :nth-child(2) > :nth-child(2)').should('have.text', `${dataFillingFile.Gender}`);

        // Address
        cy.get(':nth-child(8) > [colspan="3"]').should('have.text', `${dataFillingFile.Address}`);

        //Post Office
        cy.get(':nth-child(2) > ul > :nth-child(8) > :nth-child(2)').should('have.text', `${dataFillingFile.Post_office}`);

        //State
        cy.get(':nth-child(2) > ul > :nth-child(6) > :nth-child(2)').should('have.text', `${dataFillingFile.State}`);

        //District
        cy.get(':nth-child(2) > ul > :nth-child(7) > :nth-child(2)').should('have.text', `${dataFillingFile.District}`);

        /*=============================================2nd Part testing==========================================================*/ 

        //Mr. 
        cy.get(':nth-child(3) > ul > :nth-child(1) > :nth-child(1) > :nth-child(2)').should('have.text', `${dataFillingFile.Title}`);

        //Name
        cy.get(':nth-child(3) > ul > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('have.text', `${dataFillingFile.Name}`);

        //Father
        cy.get(':nth-child(3) > ul > :nth-child(3) > :nth-child(2)').should('have.text', `${dataFillingFile.Father_name}`);

        //Grand Father
        cy.get(':nth-child(3) > ul > :nth-child(4) > :nth-child(2)').should('have.text', `${dataFillingFile.Grandfather_name}`);

        //State
        cy.get(':nth-child(3) > ul > :nth-child(6) > :nth-child(2)').should('have.text', `${dataFillingFile.State}`);

        //District
        cy.get(':nth-child(3) > ul > :nth-child(7) > :nth-child(2)').should('have.text', `${dataFillingFile.District}`);

        //Address
        cy.get(':nth-child(3) > ul > :nth-child(10) > :nth-child(2)').should('have.text', `${dataFillingFile.Address}`);

        /*===========================================Initiation Details======================================================= */

        //Master name
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(1) > :nth-child(2)').should('have.text', `${dataFillingFile.Master_name}`);
        
        //Place of Initiation
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(3) > :nth-child(2)').should('have.text', `${dataFillingFile.Place_of_initiation}`);

        //Initiation Year
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(4) > :nth-child(2)').should('have.text', `${dataFillingFile.Initiation_year}`);

        //Initiated as
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(6) > :nth-child(2)').should('have.text', `${dataFillingFile.Initiated_as}`);

      })
    })
  
    
  })