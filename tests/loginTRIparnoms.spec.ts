import { test, expect } from '@playwright/test';

test('connexion standard_user — cas nominal', async ({ page }) => {
    //ARRANGE: infos nécessaires pr préparer la situation
    //Je dois me connecter pour buy
    //La méthode "go to" permet de naviguer vers une page web
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
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Trier les produits par noms et ordre alphabétique décroissant
    await page.getByTestId('product-sort-container').click();
    await expect(page.getByTestId('active-option')).toHaveText('Name (A to Z)');
    await page.getByTestId('product-sort-container').selectOption('za');

    //ASSERT
    //Je dois vérifier que le tri se fait maintenant de Z à A
    await expect(page.getByTestId('active-option')).toHaveText('Name (Z to A)');
});