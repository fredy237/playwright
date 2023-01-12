import { AfterAll, BeforeAll } from "@cucumber/cucumber";
import { After, Before, setDefaultTimeout, Status } from "@cucumber/cucumber";
import { Browser, chromium, firefox, Page } from "@playwright/test";
import console from "console";
const fsExtra = require('fs-extra');

let fs = require('fs');
let page:Page;
let pageFirefox:Page;
let browser:Browser;
let browse:Browser;

setDefaultTimeout(60000)

BeforeAll(()=>{
  
  fsExtra.emptyDirSync("reports/allure-results");
  });


Before(async()=>{
    try{
  
        browser = await chromium.launch({headless:false});

        
        
        const context = await browser.newContext({
            recordVideo: {
              dir: "videos_records/",
              size: { width: 800, height: 600 },
            },
          });

        
        page= await context.newPage();
   
        
        console.log(`The title is ${await page.title()}`)
    }
    catch (error){
    console.log(`La navigation a échoué à cause de ${error}`);
    throw new Error(`La navigation a échoué à cause de ${error}`)
    }   
    return page;
   
});

Before(async()=>{
  try{
      browse = await  firefox.launch({headless:false});

        const contex = await browse.newContext({ 
            recordVideo: {
              dir: "videos_records/",
              size: { width: 800, height: 600 },
            },
         });
      
      pageFirefox = await contex.newPage();
      
      console.log(`The title is ${await pageFirefox.title()}`)
  }
  catch (error){
  console.log(`La navigation a échoué à cause de ${error}`);
  throw new Error(`La navigation a échoué à cause de ${error}`)
  }   
  return pageFirefox;
 
});



After(async function( Scenario) {

 

  if(Scenario.result!.status===Status.FAILED){
    console.log("error")
   
    await this.attach(await page.screenshot({path : `./Screenshot/${Scenario.pickle.name}.png`, fullPage:true}), "image/png")
    browser.close();
    browse.close();
  //  const je= await page.video().saveAs(`videos_records/${Scenario.pickle.name}.webm`);
    //const readStream= await fs.createReadStream(`videos_records/${Scenario.pickle.name}.webm`);
     //await this.attach(readStream, "video/webm");
  }
});








export {page, browser,pageFirefox}