import { faker } from '@faker-js/faker';

describe('template spec', () => {
  beforeEach(() => {
    // reset the database prior to every test
    cy.task('db_reset', null);
  });

  it('[Navegação]: navegar para novo contato', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Novo Contato').click();

    cy.url({ timeout: 3000 }).should('include', 'new');
  });

  it('[Criação]: criar contato e ver novo contato na listagem', () => {
    cy.visit('http://localhost:3000/new');

    const name = faker.person.firstName();
    cy.get('input[placeholder="Nome *"]').type(name);

    cy.get('button[type=submit]').click();
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
    const name = faker.person.firstName();
    cy.get('input[placeholder="Nome *"]').type(name);
    cy.get('button[type=submit]').click();

    const name2 = faker.person.firstName();
    cy.get('input[placeholder="Nome *"]').type(name2);
    cy.get('button[type=submit]').click();

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
    const name = faker.person.firstName();
    cy.get('input[placeholder="Nome *"]').type(name);
    cy.get('button[type=submit]').click();

    const name2 = faker.person.firstName();
    cy.get('input[placeholder="Nome *"]').type(name2);
    cy.get('button[type=submit]').click();

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

  it('[Ordenação]: criar contatos e ordenar corretamente (asc)', () => {});
  it('[Ordenação]: criar contatos e ordenar corretamente (desc)', () => {});
  it('[Busca]: criar contatos e buscar corretamente', () => {});
});
