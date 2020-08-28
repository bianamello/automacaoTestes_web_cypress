/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

Given(/^que acesso o site$/, () => {
	cy.server();
    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewTable');
    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postUserTable');
    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewTable');
    //abrindo uma URL
    cy.visit('Register.html');
});

When(/^informar meus dados$/, () => {
	cy.get('input[ng-model=FirstName]').type(chance.first());
    cy.get('input[ng-model=LastName]').type(chance.last());
    cy.get('input[ng-model=EmailAdress]').type(chance.email());
    cy.get('input[ng-model=Phone]').type(chance.phone({formatted: false}));
    // check é usado para radio's e checkbox
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');
    // select é usado para selects e combos
    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Australia', {force: true});
    cy.get('select#yearbox').select('1987');
    cy.get('select[ng-model=monthbox]').select('February');
    cy.get('select#daybox').select('8');
    cy.get('input#firstpassword').type('Agilizei@2020');
    cy.get('input#secondpassword').type('Agilizei@2020');
    //fazendo upload de imagem
    cy.get('input#imagesrc').attachFile('foto.png');
});

When(/^salvar$/, () => {
	cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewTable').then((respostaNewTable) => {
        //com esse comando ele gera log no console
        console.log(respostaNewTable.status)
        //com esse comando ele gera log na telinha do cypress
        cy.log(respostaNewTable.status)
        //esse comando verifica a resposta
        expect(respostaNewTable.status).to.eq(200)
    });

    //verificando a URL atual
    cy.url().should('contain', 'WebTable');
});