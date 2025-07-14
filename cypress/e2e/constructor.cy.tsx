/// <reference types="cypress" />

describe('Тесты для страницы конструктора бургера', function () {
  const testUrl = 'http://localhost:4000';
  const selectors = {
    bunIngredients: '[data-cy=bun-ingredients]',
    mainsIngredients: '[data-cy=mains-ingredients]',
    saucesIngredients: '[data-cy=sauces-ingredients]',
    constructorBunTop: '[data-cy=constructor-bun-top]',
    constructorBunBottom: '[data-cy=constructor-bun-bottom]',
    constructorIngredients: '[data-cy=constructor-ingredients]',
    ingredientDetails: '[data-cy=ingredient_details]',
    orderSummButton: '[data-cy=place-an-order] button',
    orderNumber: '[data-cy=order-number]',
    modalCloseButton: '[data-cy=modal_close_button]',
    burgerConstructor: '[data-cy=burger-constructor]'
  };

  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit(testUrl);
  });

  afterEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  const addIngredient = (ingredientType) => {
    cy.get(selectors[ingredientType]).contains('Добавить').click();
  };

  it('Добавление булок и начинки из списка в конструктор', function () {
    addIngredient('bunIngredients');
    cy.get(selectors.constructorBunTop)
      .contains('Ингредиент 1')
      .should('exist');
    cy.get(selectors.constructorBunBottom)
      .contains('Ингредиент 1')
      .should('exist');

    addIngredient('mainsIngredients');
    addIngredient('saucesIngredients');
    cy.get(selectors.constructorIngredients)
      .contains('Ингредиент 3')
      .should('exist');
    cy.get(selectors.constructorIngredients)
      .contains('Ингредиент 7')
      .should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', function () {
    cy.get(selectors.mainsIngredients).contains('Ингредиент 3').click();
    cy.get(selectors.ingredientDetails).should('be.visible');
    cy.get(selectors.modalCloseButton).click();
    cy.get(selectors.ingredientDetails).should('not.exist');
  });

  it('Создание и оформление заказа', function () {
    addIngredient('bunIngredients');
    addIngredient('mainsIngredients');
    addIngredient('saucesIngredients');
    cy.get(selectors.orderSummButton).click();

    cy.get(selectors.orderNumber).contains('83746').should('exist');

    cy.get(selectors.modalCloseButton).click();
    cy.get(selectors.orderNumber).should('not.exist');

    cy.get(selectors.burgerConstructor)
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get(selectors.burgerConstructor)
      .contains('Ингредиент 3')
      .should('not.exist');
    cy.get(selectors.burgerConstructor)
      .contains('Ингредиент 7')
      .should('not.exist');
  });
});
