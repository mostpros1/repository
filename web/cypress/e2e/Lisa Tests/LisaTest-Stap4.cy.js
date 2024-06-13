describe('Testing searchbar functionality', () => {
    it('type in input', () => {

        function lisaStap4TestStart() {
            cy.lisaTestBegin();
            cy.get('input[type="text"]').eq(0).type('2020TE');
            cy.get('input[type="text"]').eq(1).type('Amsterdam');
            cy.goForward();
            cy.get('.dateCards_wrapper > :nth-child(4)').click()
            cy.goForward();
            cy.goForward();
        }

        function fillFormAndNavigateForward(text1, text2, email, tel, password1, password2) {
            cy.get('input[type="text"]').eq(0).type(text1);
            cy.get('input[type="text"]').eq(1).type(text2);
            cy.get('input[type="email"]').eq(0).type(email);
            cy.get('input[type="tel"]').eq(0).type(tel);
            cy.get('input[type="password"]').eq(0).type(password1);
            cy.get('input[type="password"]').eq(1).type(password2);
            cy.goForward();
        }

        function clearAllInputs() {
            cy.get('input').each(($input) => {
                cy.wrap($input).clear();
            });
        }

        lisaStap4TestStart();

        // STAP 4

        // Check 1
        fillFormAndNavigateForward('Test', 'Test', 'test@test.nl', '+3109876323', 'qwertyasdfg', 'qwertyasdfg');

        lisaStap4TestStart();

        // Check 2
        cy.goForward();

        // Check 3-4-5-6
        fillFormAndNavigateForward('%&&^5İÜÇ', '%&(%^+İŞÇÖ', '%&$Y^@ğÜŞÇ:.^+%^+^', '+/&/&%&ĞÜİŞÇÇiüi%+', '+%&/()=/&%+', '^^+%&/()/&%+');

        clearAllInputs();

        // Check 7
        fillFormAndNavigateForward('Test', 'Test', 'test@test.nl', '+3109876323', 'qwertyasdfg', 'qwertyasdfgasdfg');

        clearAllInputs();

        // Check 8
        fillFormAndNavigateForward('Test', 'Test', 'test@test.nl', '+3109876323', '1234', '1234');


    })
})