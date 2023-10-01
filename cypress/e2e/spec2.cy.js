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
            cy.get('.btn').click().wait(4000);
        });




        cy.get('#app-menu-button').click().wait(5000);
        cy.get('.MuiList-root > [tabindex="0"]').click().wait(5000);




        const currentDate = new Date();

        // Define an array of month names
        const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Get the day, month, and year components from the Date object
        const day = currentDate.getDate();
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();

        // Create the formatted date string
        const formattedDate = `${day} ${month} ${year}`;

        cy.get('#formdate').should('have.value', formattedDate);




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




        // Name filling
        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().clear().type('Mr.').type('{downarrow}').type('{enter}');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root > #name').type('Kunal');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root').type('Pawan');

        cy.get(':nth-child(5) > .MuiFormControl-root > .MuiInputBase-root > #grandfathername').type('Bodhraj');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(7) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type('DELHI').type('{downarrow}').type('{enter}');

        cy.get(':nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(8) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').click().type('DELHI').type('{downarrow}').type('{enter}');

        cy.get(':nth-child(9) > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root').type('DELHI').type('{downarrow}').type('{enter}');

        cy.get(':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > #address').type('Abcd');

        cy.get('.css-1fbyq98 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root');

        cy.get('.css-1fbyq98 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root').click().type('12122000');
        cy.get('#age').should('have.value','22');


    })
})



