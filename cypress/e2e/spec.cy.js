import { faker } from '@faker-js/faker';

function createContact(params) {
  const name = faker.person.firstName();
  cy.get('input[placeholder="Nome *"]').type(name);
  if (params) {
    const email = params.email;
    cy.get('input[placeholder="Email"]').type(email);
  }
  cy.get('button[type=submit]').click();
  return name;
}

describe('template spec', () => {
  beforeEach(() => {
    // reset the database prior to every test
    cy.task('db_reset', null);
  });

  it('[Navegação]: navegar para novo contato', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Novo Contato').click();

    cy.url({ timeout: 3000 }).should('include', 'new');

    cy.contains('Cadastrar').should('exist');
  });

  it('[Criação]: criar contato e ver novo contato na listagem', () => {
    cy.visit('http://localhost:3000/new');

    const name = createContact();

    cy.get('a[href="/"]').click();

    cy.contains(name);

    // refresh
    cy.reload();

    // assert
    cy.contains(name);
  });

  it('[Edição]: criar contatos e editar contato recém criado', () => {
    // create 2 contacts
    cy.visit('http://localhost:3000/new');
    const name = createContact();
    createContact();

    // back to home
    cy.get('a[href="/"]').click();

    // edit
    cy.get(`div[data-testid=${name}]`).within(() => {
      cy.get('a[href*="/edit"]').click();
    });

    // limpar input Nome
    cy.get('input[placeholder="Nome *"]').clear();

    // escrever novo Nome
    cy.get('input[placeholder="Nome *"]').type(name + '(edited)');

    // submit
    cy.get('button[type=submit]').click();

    // voltar pra home
    cy.get('a[href="/"]').click();

    // assert
    cy.contains(name + '(edited)');

    // refresh
    cy.reload();

    // assert
    cy.contains(name + '(edited)');
  });

  it('[Delete]: criar contatos e deletar um contato', () => {
    // create 2 contacts
    cy.visit('http://localhost:3000/new');
    const name = createContact();
    const name2 = createContact();

    // back to home
    cy.get('a[href="/"]').click();

    // deletar
    cy.get(`div[data-testid=${name}]`).within(() => {
      cy.get('button[id*="remove"]').click();
    });

    cy.get(`button`).contains('Deletar').click();

    // assert
    cy.contains(name).should('not.exist');
    cy.contains(name2).should('exist');

    // refresh
    cy.reload();

    // assert
    cy.contains(name).should('not.exist');
    cy.contains(name2).should('exist');
  });

  it('[Busca]: criar contatos e buscar corretamente', () => {
    // create 2 contacts
    cy.visit('http://localhost:3000/new');

    const name1 = createContact();
    const name2 = createContact();

    // back to home
    cy.get('a[href="/"]').click();

    // escrever nome no campo de busca
    cy.get('input[placeholder="Pesquisa pelo nome..."]').type(name1);

    cy.contains(name1).should('exist');
    cy.contains(name2).should('not.exist');
  });
  it('[Toast]: sucesso ao criar contato', () => {
    // create contact
    cy.visit('http://localhost:3000/new');

    createContact();

    // assert success Toast
    cy.contains('Contato cadastrado com sucesso').should('exist');
  });
  it.only('[Toast]: erro ao criar contato com mesmo email', () => {
    // create 2 contacts with same email
    cy.visit('http://localhost:3000/new');

    createContact({ email: 'test@mail.com' });

    // dimiss success toast
    cy.contains('Contato cadastrado com sucesso').click();

    createContact({ email: 'test@mail.com' });

    // assert success Toast
    cy.contains('Ocorreu um erro ao cadastrar o contato!').should('exist');
    cy.contains('Contato cadastrado com sucesso').should('not.exist');
  });

  it('[Ordenação]: criar contatos e ordenar corretamente (asc)', () => {});
  it('[Ordenação]: criar contatos e ordenar corretamente (desc)', () => {});
});
