import { test, expect } from '@playwright/test';

import * as data from '../logindatas.json';
import * as product from './product.json';

test('inscription', async ({ page }) => {
    await page.goto('https://ztrain-web.vercel.app/auth/login');
    expect(page.locator('text= Inscription')).toHaveCount(1) 
})