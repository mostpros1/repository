describe('Testing "Register as specialist"', () => {
    it('test1', () => {
        cy.testreg();
        // Check 1 //Normaal check met geldig gegevens
        cy.performInputChecktestreg('JanTest', 'Mostpros','test@test.com','+31688864797','22554477','22554477' );
    
        cy.testreg();
    })
    it('test 2', () => { 
        cy.testreg();
        // Check 2 //Rendom voornaam, achternaam letters , email alleen letters , telefoonnummer alleen letters , wachtwoord nummers en letters.
        cy.performInputChecktestreg('hfghnljnglhn', 'dfgdfgbkjdfb','dhshgoihgodfhg','fsgsdfgsd','22554477Ds','22554477Ds' );
    })

    it('test 3', () => { 
        cy.testreg();
        // Check 3 // Speciaal random karakters voornaam, achternaam //random karakters in met een goed email structuur //telefoonnummer speciaal random karakters // wachtwoord speciaal random karakters
        cy.performInputChecktestreg('KOÇTAŞ', 'ÉÉÉÔÔÔ$$$&&#*','dlfngldfngl12@test.com','465456446^&%*','22554477Ds&!!','22554477Ds&!!');
    })

    it('test 4', () => { 
        cy.testreg();
        // Check 4 //Alles alleen nummers of +
        cy.performInputChecktestreg('3216516165', '126+541651',' 126+541651',' 126+541651',' 126+541651','126+541651 ' );
    })


    it('test 5', () => { 
        cy.testreg();
        // Check 5 // Alles zij leeg
        cy.performInputChecktestreg(' ', ' ',' ',' ',' ',' ' );
    })

})