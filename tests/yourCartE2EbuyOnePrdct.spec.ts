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
    //J'ouvre le panier
    await page.getByTestId('shopping-cart-badge').click();
    //Une fois dans le panier, j'achète le produit
    await page.getByTestId('checkout').click();
    //await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    //Je renseigne les informations nécessaires pour l'achat du produit
    await page.getByTestId('firstName').fill('John');
    await page.getByTestId('lastName').fill('Doe');
    await page.getByTestId('postalCode').fill('12345');
    await page.getByTestId('continue').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.getByTestId('finish')).toBeVisible();
    await expect(page.getByTestId('cancel')).toBeVisible();
    await expect(page.getByTestId('cart-quantity-label')).toBeVisible();
    await expect(page.getByTestId('cart-desc-label')).toBeVisible();
    await expect(page.getByTestId('item-quantity')).toBeVisible();
    await expect(page.getByTestId('inventory-item-price')).toBeVisible();
    await expect(page.getByTestId('payment-info-label')).toBeVisible();
    await expect(page.getByTestId('shipping-info-label')).toBeVisible();
    await expect(page.getByTestId('total-info-label')).toBeVisible();
    await expect(page.getByTestId('total-label')).toBeVisible();
    await page.getByTestId('finish').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.getByTestId('back-to-products')).toBeVisible();
    await expect(page.getByTestId('generate-pdf-order')).toBeVisible();
    await expect(page.getByTestId('title')).toBeVisible();
    //Prévoir et obtenir le pdf généré par le bouton "Generate PDF Order" et vérifier qu'il est bien généré
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('generate-pdf-order').click();
    const download = await downloadPromise;
    await expect(download.suggestedFilename()).toMatch(/.*\.pdf$/);

    //ASSERT
    //Je dois vérifier que le lien du panier est bien présent dans l'URL de la page
});