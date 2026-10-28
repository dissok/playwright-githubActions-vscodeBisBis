import { test, expect } from '@playwright/test';

test('connexion standard_user — cas nominal', async ({ page }) => {
//ARRANGE: infos nécessaires pr préparer la situation
//Je dois me connecter pour buy
//La méthode "go to" permet de naviguer vers une page web
await page.goto('https://www.saucedemo.com/');

//ACT
//username et password vides et message d'erreur au clic sur le bouton login
//Je renseigne les username et password vides, puis je clique sur le bouton login
//La méthode "fill" permet de remplir un champ input
//Comme il y a des attributs data-test sur les éléments, 
// je peux m'en servir pour les sélectionner (leurs valeurs sont uniques et ne changent pas
// contrairement aux classes ou aux id) > On utilisera donc la méthode "getByTestId" pour 
// sélectionner les éléments
await page.getByTestId('username').fill('');
await page.getByTestId('password').fill('');
await page.getByTestId('password').fill('secret_sauce');
await page.getByTestId('login-button').click();

//ASSERT
//Je dois vérifier que je suis bien connecté avec le mauvais message d'erreur
await expect(page.getByText('Products')).toBeVisible();
});