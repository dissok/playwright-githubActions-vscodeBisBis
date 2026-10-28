import { test, expect } from '@playwright/test';

test('connexion standard_user — mot de passe incorrect', async ({ page }) => {
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
await page.getByTestId('password').fill('cafecreme');
await page.getByTestId('login-button').click();

//ASSERT
//Je vérifie que le message de mot de passe incorrect est affiché
await expect(page.getByRole('alert')).toContainText(
  'Epic sadface: Username and password do not match any user in this service'
);
});