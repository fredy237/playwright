import {Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { expect } from '@playwright/test';
import { page, pageFirefox } from './world';
import datas from './data.json';
import { OperationCanceledException } from 'typescript';
import { AssertionError } from 'assert';


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
  
  await expect(page).toHaveURL('https://ztrain-web.vercel.app/home').catch(()=>{
    throw new Error("Email ou mot de passe incorrect")
  });
 
})


  //Inscription
  Given('I am on inscription page', async() => {
   await page.goto('https://ztrain-web.vercel.app/auth/login');
   await page.getByRole('link', { name: 'S\'inscrire' }).click();
   expect(page.locator('text= Inscription')).toHaveCount(2) 

   await pageFirefox.goto('https://ztrain-web.vercel.app/auth/login');
   await pageFirefox.getByRole('link', { name: 'S\'inscrire' }).click();
   expect(pageFirefox.locator('text= Inscription')).toHaveCount(2) 
  
});
  
    When('I enter {string} and {string} and {string}', async (email, password, confirmation)=> {
        console.log("free")
        await page.getByPlaceholder('Email').click();
        await page.getByPlaceholder('Email').fill(email);
        await page.locator('#style_container_input_password___0rEz').first().click();
        await page.locator('#password_register').fill(password);
        await page.getByPlaceholder('Confirmer votre mot de passe').click();
        await page.getByPlaceholder('Confirmer votre mot de passe').fill(confirmation);

        await pageFirefox.getByPlaceholder('Email').click();
        await pageFirefox.getByPlaceholder('Email').fill(email);
        await pageFirefox.locator('#style_container_input_password___0rEz').first().click();
        await pageFirefox.locator('#password_register').fill(password);
        await pageFirefox.getByPlaceholder('Confirmer votre mot de passe').click();
        await pageFirefox.getByPlaceholder('Confirmer votre mot de passe').fill(confirmation);
   
    });
  
    Then('I press the button to register', async () =>{
      await page.getByRole('button', { name: 'Inscription' }).click();
      await pageFirefox.getByRole('button', { name: 'Inscription' }).click();
     
     await expect(page).toHaveURL('https://ztrain-web.vercel.app/home').catch(()=>{
      throw new Error("Cet utilisateur existe déjà");
    });
    });
  

    //Search
 Given('I am on homepage', async() => {
  await page.goto('https://ztrain-web.vercel.app/auth/login');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(datas.email);
  await page.getByPlaceholder('Mot de passe').click();
  await page.getByPlaceholder('Mot de passe').fill(datas.password);
  await page.locator('#btn_login').click();
  expect(page.locator('text=Normal d\'être impatient'));

  await pageFirefox.goto('https://ztrain-web.vercel.app/auth/login');
  await pageFirefox.getByPlaceholder('Email').click();
  await pageFirefox.getByPlaceholder('Email').fill(datas.email);
  await pageFirefox.getByPlaceholder('Mot de passe').click();
  await pageFirefox.getByPlaceholder('Mot de passe').fill(datas.password);
  await pageFirefox.locator('#btn_login').click();
  expect(pageFirefox.locator('text=Normal d\'être impatient'))
 
});
  
    When('I enter {string} in searchbar', async (product)=> {
      
       
        await page.getByPlaceholder('Rechecher un produit').click();
        await page.waitForTimeout(5000);
        await page.getByPlaceholder('Rechecher un produit').fill(product);
       
        expect(page.locator(product))
      

        await pageFirefox.getByPlaceholder('Rechecher un produit').click();
        await pageFirefox.waitForTimeout(5000);
        await pageFirefox.getByPlaceholder('Rechecher un produit').fill(product);
       
        expect(pageFirefox.locator(product))
    });
  
    Then('I valid', async () =>{
      if( expect(page.locator('Aucun produit'))){
        throw new Error("Aucun produit trouvé")
      }
     
    });

     
  //Logout  
  
    When('I click on button logout', async ()=> {
      await page.locator('#style_avatar_wrapper__pEGIQ').click();
      await page.getByRole('link', { name: 'Se déconnecter' }).click();

      await pageFirefox.locator('#style_avatar_wrapper__pEGIQ').click();
      await pageFirefox.getByRole('link', { name: 'Se déconnecter' }).click();
   
    });
  
    Then('I deconnect', async () =>{
      await expect(page).toHaveURL('https://ztrain-web.vercel.app/auth/login').catch(()=>{
        throw new Error("Echec de la déconnexion");
      })
    });


    //addproduct
    When('I click on button icon to add a {string} and put a {string}', async (product, quantity)=> {
   
        if(  page.locator(".style_card__gNEqX", {has: page.locator(`text=${product}`)})){
          await page.locator(".style_card__gNEqX", {has: page.locator(`text=${product}`)}).click();
          await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
          await page.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(quantity);
          await page.getByRole('button', { name: 'Ajouter au panier' }).click();
        
        }else{
          throw new Error("le produit n'existe pas")
        }
        
            if( pageFirefox.locator(".style_card__gNEqX", {has: pageFirefox.locator(`text=${product}`)})){
              await pageFirefox.locator(".style_card__gNEqX", {has: pageFirefox.locator(`text=${product}`)}).click();
              await pageFirefox.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').click();
              await pageFirefox.locator('#style_quantity_wrapper__2QMug').getByRole('textbox').fill(quantity);
              await pageFirefox.getByRole('button', { name: 'Ajouter au panier' }).click();
            }else{
              throw new Error("le produit n'existe pas")
            }
    
      
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
      
      await page.waitForTimeout(2000)
      if(page.getByText(product)){
        console.log(product)
        page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: product});
        await page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: product}).locator('div').nth(3).click().catch(()=>{
          throw new Error("Le produit n'est pas présent dans le panier")
        });
        expect(page.locator('#style_card_wrapper__hrc1I div').filter({ hasText: product}));
        expect(page.locator(product))
      }else{
        throw new Error("Le produit n'est pas présent dans le panier")
      }
     // await expect(page.locator('#style_card_wrapper__hrc1I div')).toContainText(product);
     
     // await expect(page.locator('#style_card_wrapper__hrc1I div')).not.toContainText(product);
      
      
    })

