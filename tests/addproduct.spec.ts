import { test, expect } from '@playwright/test';

import * as data from '../logindatas.json';
import * as product from './product.json';


test.beforeEach( async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    expect(page.locator('text= Connexion')).toHaveCount(1) 
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(data.email);
    await page.getByPlaceholder('Mot de passe').click();
    await page.getByPlaceholder('Mot de passe').fill(data.password);
    await page.locator('#btn_login').click();
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.pause
  })

  

  test('add product', async ({ page }) => {
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    await page.locator(product.article).click();
    await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
    await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(product.quantité);
    await page.getByRole('button', { name: 'Ajouter au panier' }).click();
    await page.locator('#style_content_cart_wrapper__mqNbf').click();
    await expect (page.getByText('Votre panier à été mis à jour')).toHaveText('Votre panier à été mis à jour');
    await expect(page.locator('[id="style_card_wrapper__hrc1I"]')).toContainText(product.nom)
  })