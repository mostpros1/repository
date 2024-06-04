import faker from 'faker';

describe('Testing "Register as Home owner"', () => {
  const dutchZipCode = `${faker.datatype.number({ min: 1000, max: 9999 })}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}${String.fromCharCode(faker.datatype.number({ min: 65, max: 90 }))}`;
  const dutchCity = faker.address.city();

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const todayDate = new Date(currentYear, currentMonth - 1, currentDay);
  const todayDateFormatted = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, '0')}-${String(todayDate.getDate()).padStart(2, '0')}`;
    

  context('Postcode en Plaatsnaam Testen', () => {
    beforeEach(() => {
      cy.lisaTestBegin();
      faker.locale = 'nl';
    });
    for (let i = 1; i <= 3; i++) {
      it(`type in input - postcode test ${i}`, () => {
        cy.get('input').eq(0).type(dutchZipCode);
        cy.get('input[type="text"]').eq(1).type(dutchCity);
        cy.goForward();
      });
    }
  });

  context('Datum Test', () => {
    beforeEach(() => {
      cy.lisaTestBegin();
      faker.locale = 'nl';
      cy.get('input').eq(0).type(dutchZipCode);
      cy.get('input[type="text"]').eq(1).type(dutchCity);
      cy.goForward();
    })

    it('Test 1: Geen keuze', () => {
      cy.goForward()
      cy.get('[data-testid="date-card-0"]')
    })

    for (let i = 0; i < 5; i++) {
      it(`Test 2: Calender card test-${i}`, () => {
        cy.get('.dateCards').eq(i).click();
        cy.goForward();
        cy.get('[class="form-btn back"]').click();
      });
    }

    it('Test 2: Kies een oudere datum', () => {
      // Interact with the 6th date card
      cy.get('[data-testid="more-dates"]').click();

      const pastDate = new Date(currentYear, currentMonth - 1, currentDay - 4);
      const pastDateFormatted = `${pastDate.getFullYear()}-${String(pastDate.getMonth() + 1).padStart(2, '0')}-${String(pastDate.getDate()).padStart(2, '0')}`;

      cy.get(`[data-testid="${pastDateFormatted}"]`).click()
      cy.goForward()
      cy.get('[class="form-btn"]').should('not.be.visible')
      cy.get(`[data-testid="${todayDateFormatted}"]`)
    })

    it('Test 3: Kies een toekomstige datum', () => {
      cy.get('[data-testid="more-dates"]').click();

      const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 4);
      const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

      cy.get(`[data-testid="${futureDateFormatted}"]`).click()
      cy.goForward()
      cy.get('[class="form-btn"]').should('not.be.visible')
      cy.get(`[data-testid="${todayDateFormatted}"]`)
    })

    it('Test 4: Kies een toekomstige datum met een tijd', () => {
      cy.get('[data-testid="more-dates"]').click();

      const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 4);
      const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

      cy.get(`[data-testid="${futureDateFormatted}"]`).click()
      cy.goForward()
      cy.get(`[data-testid="${todayDateFormatted}"]`)
      cy.get(`[data-testid="time-slot-10:00"]`).click()
      cy.goForward()
      cy.get('[class="form-btn"]').should('not.be.visible')
    })

    it('Test 5: Kies een toekomstige datum met een 2de tijden strijp', () => {
      cy.get('[data-testid="more-dates"]').click();

      const futureDate = new Date(currentYear, currentMonth - 1, currentDay + 4);
      const futureDateFormatted = `${futureDate.getFullYear()}-${String(futureDate.getMonth() + 1).padStart(2, '0')}-${String(futureDate.getDate()).padStart(2, '0')}`;

      cy.get(`[data-testid="${futureDateFormatted}"]`).click()
      cy.goForward()
      cy.get(`[data-testid="${todayDateFormatted}"]`)
      cy.get(`[data-testid="time-slot-10:00"]`).click()
      cy.get(`[data-testid="time-slot-15:30"]`).click()
      cy.goForward()
      cy.get('[class="form-btn"]').should('not.be.visible')
    })

    
  });

  context('BIO Testen', () => {
    beforeEach(() => {
      cy.lisaTestBegin();
      faker.locale = 'nl';
      cy.get('input').eq(0).type(dutchZipCode);
      cy.get('input[type="text"]').eq(1).type(dutchCity);
      cy.goForward();
      cy.get('.dateCards').eq(1).click();
      cy.goForward();
      cy.get('[class="form-btn back"]').click();
      cy.goForward();
    })
    it('bio information test', () => {
      cy.get('textarea').eq(0).type('Hier is een voorbeeld van BIO tekst.');
      cy.goForward();
    });
  });

  context('Registratie en Selectie Testen', () => {
    beforeEach(() => {
      cy.lisaTestBegin();
      faker.locale = 'nl';
      cy.get('input').eq(0).type(dutchZipCode);
      cy.get('input[type="text"]').eq(1).type(dutchCity);
      cy.goForward();
      cy.get('.dateCards').eq(1).click();
      cy.goForward();
      cy.get('[class="form-btn back"]').click();
      cy.goForward();
      cy.get('textarea').eq(0).type('Hier is een voorbeeld van BIO tekst.');
      cy.goForward();
    })
    it('registration and selection test', () => {
      const password = faker.internet.password();
      cy.get('input[type="text"]').eq(0).type(faker.name.firstName()).should('not.have.value', '');
      cy.get('input[type="text"]').eq(1).type(faker.name.lastName()).should('not.have.value', '');
      cy.get('input[type="email"]').clear().type(faker.internet.email());
      cy.get('input[type="tel"]').clear().type("+3109876323").should('not.have.value', '');
      cy.get('input[type="password"]').eq(0).type(password).should('not.have.value', '');
      cy.get('input[type="password"]').eq(1).type(password).should('not.have.value', '');
      //e-mail-phone value's structuuren
      cy.get('input[type="email"]').invoke('val').then(emailValue => {
        expect(emailValue).to.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format.');
      });
      cy.get('input[type="tel"]').invoke('val').then(phoneValue => {
        expect(phoneValue).to.match(/^\+31/, 'Phone number must start with +31.');
       });
       cy.get('[class="form-btn back"]').click();

      cy.goForward();
      cy.get('[class="form-btn"]').should('not.be.visible')
    });
  });

});
