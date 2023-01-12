import {Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import { page, pageFirefox } from './world';
import datas from './data.json';



//Connexion
Given('I am on login page', async() => {
  await page.goto('https://ztrain-web.vercel.app/auth/login'); 
  expect(page.locator('text= Connexion')).toHaveCount(3) ;

  await pageFirefox.goto('https://ztrain-web.vercel.app/auth/login'); 
  expect(pageFirefox.locator('text= Connexion')).toHaveCount(3) 
});

When('I enter {string} and {string}', async(email,password)=>{

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill(password);

  await pageFirefox.getByPlaceholder('Email').click();
  await pageFirefox.getByPlaceholder('Email').fill(email);
  await pageFirefox.getByPlaceholder('Mot de passe').click();
  await pageFirefox.getByPlaceholder('Mot de passe').fill(password);
})

Then('I press the button to connect', async()=>{
  await page.locator('#btn_login').click();
 

  await pageFirefox.locator('#btn_login').click();
  await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
  await expect(pageFirefox).toHaveURL('https://ztrain-web.vercel.app/home')
})


  //Inscription
  Given('I am on inscription page', async() => {
   await page.goto('https://ztrain-web.vercel.app/auth/login');
   await page.getByRole('link', { name: 'S\'inscrire' }).click();
   expect(page.locator('text= Inscription')).toHaveCount(2) 
  
});
  
    When('I enter {string} and {string} and {string}', async (email, password, confirmation)=> {
        console.log("free")
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(email);
        await page.locator('#style_container_input_password___0rEz').first().click();
        await page.locator('#password_register').fill(password);
        await page.getByPlaceholder('Confirmer votre mot de passe').click();
  await page.getByPlaceholder('Confirmer votre mot de passe').fill(confirmation);
   
    });
  
    Then('I press the button to register', async () =>{
      await page.getByRole('button', { name: 'Inscription' }).click();
      await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    });
  

    //Search
 Given('I am on homepage', async() => {
  await page.goto('https://ztrain-web.vercel.app/auth/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(datas.email);
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill(datas.password);
  await page.locator('#btn_login').click();
  expect(page.locator('text=Normal d\'être impatient'))
 
});
  
    When('I enter {string} in searchbar', async (product)=> {
        console.log("free")
       
        await page.getByPlaceholder('Rechecher un produit').click();
        await page.waitForTimeout(5000);
        await page.getByPlaceholder('Rechecher un produit').fill(product);
        
        
    });
  
    Then('I valid', async () =>{
      //await expect( page.locator('#style_popular_product_wrapper__z6J0h div').nth(1))
      
      await expect(page).toHaveURL('https://ztrain-web.vercel.app/home')
    });

     
  //Logout  
  
    When('I click on button logout', async ()=> {
      await page.locator('#style_avatar_wrapper__pEGIQ').click();
      await page.getByRole('link', { name: 'Se déconnecter' }).click();
   
    });
  
    Then('I deconnect', async () =>{
      await expect(page).toHaveURL('https://ztrain-web.vercel.app/auth/login')
    });


    //addproduct
    When('I click on button icon to add a {string} and put a {string}', async (product, quantity)=> {
   
    
      await page.locator(".style_card__gNEqX", {has: page.locator(`text=${product}`)}).click();
      await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
      await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(quantity);
      await page.getByRole('button', { name: 'Ajouter au panier' }).click();
    });

    Then('The product is added to cart', async()=>{
      expect(page.locator('Votre panier a été mis à jour'))
    })


    //removeproduct
    Given('I connect with {string} and {string}', async(email, password) => {
      await page.goto('https://ztrain-web.vercel.app/auth/login');
      await page.getByPlaceholder('Email').click();
      await page.getByPlaceholder('Email').fill(email);
      await page.getByPlaceholder('Mot de passe').click();
      await page.getByPlaceholder('Mot de passe').fill(password);
      await page.locator('#btn_login').click();
    
      
    }); 

    When('I click on button icon to delete a product', async ()=> {

      await page.locator('#style_content_cart_wrapper__mqNbf').click();
     
      
    });

    Then('The {string} is deleted', async(product)=>{
      console.log(product)
      await page.waitForTimeout(2000)
      await expect(page.locator('#style_card_wrapper__hrc1I div')).toContainText(product);
      await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: product}).locator('div').nth(3).click();
      expect(page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: product}));
      await expect(page.locator('#style_card_wrapper__hrc1I div')).not.toContainText(product);
      
      
    })
