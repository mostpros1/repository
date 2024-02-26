describe('Testing "Register as specialist"', () => {
    it('type in input', () => {

        const testDataStap1 = [
            ['Loodgieter', 'test@test.com', '2020EB', 'Amsterdam'],
            ['dsamkdmsk', 'dsadasmdk', 'Amsterdam', '2020EB'],
            ['#&Y$ĞÜİŞÇ', '/+/%%&ĞÜŞ2@(%&/.Ğğüş', '32423532532ğüşçşö', 'asdwsadffğĞÜŞ'],
            ['21353424', 'test@test.com', '*^%%ĞÜŞÇÖiş', '/&(&%ÜĞŞLçöi'],
            ['Loodgieter', 'test@test.com', '', ''],
            ['Loodgieter', 'test@tesgfcvt.com', '20233AB', 'Istanbul'],
            ['', '', '', '']
        ];

        cy.janTestBegin()

        const performChecksStap1 = (data) => {
            for (let i = 0; i < data.length; i++) {
                const inputs = cy.get('input[type="text"]');

                for (let j = 0; j < data[i].length; j++) {
                    if (data[i][j] !== '') {
                        cy.get('input[type="text"]').eq(j).should('exist').type(data[i][j]);
                    }
                }

                cy.goForward();
                cy.goBack();
            }
        };

        // Perform the checks with testData
        performChecksStap1(testDataStap1);

        // Empty check
        cy.goForward();

    })
})