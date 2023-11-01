import React from 'react';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../assets/styles/themes/default';
import Button from '../../components/Button';

describe('button component', () => {
  it('mounts', () => {
    cy.mount(
      <ThemeProvider theme={defaultTheme}>
        <Button>Click me!</Button>
      </ThemeProvider>,
    );
    cy.get('button').should('exist');
  });
  it('render two button with unique labels', () => {
    cy.mount(
      <ThemeProvider theme={defaultTheme}>
        <Button>Aperte aqui!</Button>
        <Button>Click me Two!</Button>
        <Button>Click me One!</Button>
        <Button>Click me Three!</Button>
        <Button>Click me Four!</Button>
      </ThemeProvider>,
    );
    cy.contains('Click me Three!').should('contains.text', 'Click me Three!');
  });
  it('render text', () => {
    cy.mount(
      <ThemeProvider theme={defaultTheme}>
        <Button>Click me!</Button>
      </ThemeProvider>,
    );
    cy.get('[data-cy = generic-button]').should('contains.text', 'Click me!');
  });
});

