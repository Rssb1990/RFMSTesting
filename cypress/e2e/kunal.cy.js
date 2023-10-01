describe("template spec", () => {
    it("passes", () => {
      cy.visit(
        "https://iamuat.zims.in:8081//Identity/Account/Login?ReturnUrl=https://rfms-uat.zims.in:13254/&AppName=rfms"
      );
  
      cy.get("#Input_SewadarId").type("BH0011LB6735");
      cy.get("#Input_Password").type("Rssb@12345");
  
      cy.get(".captcha-style").then(() => {
        let sum = Cypress.$(".captcha-style").text();
        sum = eval(sum);
        console.log(sum);
  
        cy.get("#DNT_CaptchaInputText").type(sum);
        cy.get(".btn").click().wait(2000);
      });
  
      cy.get("#app-menu-button").click().wait(1000);
      cy.get('.MuiList-root > [tabindex="0"]').click().wait(1000);
  
      const currentDate = new Date();
  
      // Define an array of month names
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
  
      // Get the day, month, and year components from the Date object
      const day = currentDate.getDate();
      const month = monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear();
  
      // Create the formatted date string
      const formattedDate = `${day} ${month} ${year}`;
  
      cy.get("#formdate").should("have.value", formattedDate);
  
      cy.get(
        ":nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
      )
        .click()
        .type("Miss")
        .type("{downarrow}")
        .type("{enter}");
  
      cy.get("#gender > div").should("have.text", "FEMALE");
  
      cy.get('[name="title"]').should("have.value", "Miss");
  
      cy.get(
        ":nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root"
      ).contains("Father's Name");
      cy.get(
        ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root"
      ).contains("GrandFather Name");
  
      cy.get(
        ":nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
      )
        .click()
        .clear()
        .type("Mr.")
        .type("{downarrow}")
        .type("{enter}");
  
      cy.get("#gender > div").should("have.text", "MALE");
      cy.get('[name="title"]').should("have.value", "Mr.");
  
      cy.get(
        ":nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root"
      ).contains("Father's Name");
      cy.get(
        ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root"
      ).contains("GrandFather Name");
  
      // Mrs. checking
      cy.get(
        ":nth-child(2) > .MuiGrid-spacing-xs-2 > .MuiGrid-spacing-xs-1 > .MuiGrid-grid-xs-auto > .MuiAutocomplete-root > .MuiFormControl-root > .MuiInputBase-root"
      )
        .click()
        .clear()
        .type("Mrs.")
        .type("{downarrow}")
        .type("{enter}");
  
      cy.get("#gender > div").should("have.text", "FEMALE");
      cy.get('[name="title"]').should("have.value", "Mrs.");
  
      cy.get(
        ":nth-child(2) > .MuiGrid-spacing-xs-2 > :nth-child(4) > .MuiFormControl-root > .MuiInputBase-root"
      ).contains("Husband's Name");
      cy.get(
        ":nth-child(5) > .MuiFormControl-root > .MuiInputBase-root"
      ).contains("Father in Law name");
  
      // Name filling
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
  
      cy.get(
        ".css-1fbyq98 > .MuiGrid-grid-xs-true > .MuiFormControl-root > .MuiInputBase-root"
      );
      Cypress._.times(2, (k) => {
        cy.get('[name="master"]')
          .click()
          .type("{downarrow}")
          .type("{enter}")
          .invoke("val")
          .then((selectedValue) => {
            let data = `${selectedValue}`;
            cy.get('[name="master"]').should("have.value", data);
            cy.wait(2000)
  
          });
      });
  
      Cypress._.times(5, (k) => {
        cy.get('[name="placeof initiation"]')
          .click()
          .type("{downarrow}")
          .type("{enter}")
          .invoke("val")
          .then((selectedValue) => {
            let value = `${selectedValue}`;
            cy.get('[name="placeof initiation"]').should("have.value", value);
            cy.wait(2000)
  
          });
      });
  
      cy.get("#initiationyear").click().type("1968");
      cy.get("#initiationmonth").click().type("march");
      cy.get("#initiationdate").click().type("25");
      Cypress._.times(2, (k) => {
        cy.get('[name="initiatedas"]')
          .click()
          .type("{downarrow}")
          .type("{enter}")
          .invoke("val")
          .then((selectedValue) => {
            let value = `${selectedValue}`;
            if (value === "SINGLE") cy.get("#spousename").should("be.disabled");
            else cy.get("#spousename").should("not.be.disabled").type("test");
            cy.wait(2000)
  
          });
      });
      cy.get("#sewadardepartment").type("it");
      cy.get("#sewadarbadge").type("bh0011gc9999");
      cy.get(
        ".css-kh98e3 > :nth-child(2) > .MuiFormControlLabel-root > .MuiButtonBase-root > .PrivateSwitchBase-input"
      ).click();
    });
  });
  