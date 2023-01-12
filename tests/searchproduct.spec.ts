import { test, expect } from '@playwright/test';

import * as data from '../logindatas.json';
import * as search from './search.json';


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

  test('search product', async({page})=>{
    await expect(page).toHaveURL('https://ztrain-web.vercel.app/home');
    await page.getByPlaceholder('Rechecher un produit').click();
    await page.getByPlaceholder('Rechecher un produit').fill(search.name);
    await expect( page.locator('#style_popular_product_wrapper__z6J0h div').nth(1))
   
  })