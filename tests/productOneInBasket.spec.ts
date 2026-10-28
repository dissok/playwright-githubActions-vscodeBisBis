import { test, expect } from '@playwright/test';

test('connexion standard_user — cas nominal', async ({ page }) => {
    //ARRANGE: infos nécessaires pr préparer la situation
    //Je dois me positionner sur la page de connexion pour pouvoir me connecter et acheter un produit
    //Je dois me connecter pour buy
    //Je dois ajouter un produit dans le panier pour pouvoir aller sur la page du panier
    //Je dois me rendre sur la page du panier vérifier que le produit est bien présent dans le panier

    //ACT
    //Je me positionne sur la page de connexion pour pouvoir me connecter et acheter un produit
    await page.goto('https://www.saucedemo.com/');

    //ACT
    //Je renseigne les username et password puis je clique sur le bouton login
    //La méthode "fill" permet de remplir un champ input
    //Comme il y a des attributs data-test sur les éléments, 
    // je peux m'en servir pour les sélectionner (leurs valeurs sont uniques et ne changent pas
    // contrairement aux classes ou aux id) > On utilisera donc la méthode "getByTestId" pour 
    // sélectionner les éléments
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    //Je dois vérifier que je suis bien connecté
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //J'ajoute un produit dans le panier en cliquant sur le bouton "Add to cart" du produit "Sauce Labs Backpack"
    await page.getByTestId('add-to-cart-sauce-labs-bike-light').click(); 
    await expect(page.getByTestId('remove-sauce-labs-bike-light')).toContainText('Remove');
    await expect(page.getByTestId('shopping-cart-badge')).toContainText('1');

    //ASSERT
    //Je dois vérifier que le lien du panier est bien présent dans l'URL de la page
});