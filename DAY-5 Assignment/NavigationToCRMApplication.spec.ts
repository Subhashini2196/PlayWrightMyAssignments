import { test } from '@playwright/test';

test("To create a lead in the CRM/SFA Application", async({page}) =>{


await page.goto("http://leaftaps.com/opentaps/control/main");

await page.locator('[id="username"]').fill("Demosalesmanager");

await page.locator('[name="PASSWORD"]').fill("crmsfa");

await page.locator('//input[@type="submit"]').click();

await page.waitForTimeout(3000); 

await page.locator('//div[@id="button"]').click(); //To click on the CRM/SFA icon

await page.locator('//img[@alt="opentaps CRM"]').isVisible();// to verify the landing page

await page.locator('(//ul[@class="sectionTabBar"]//li[@class="sectionTabButtonUnselected"])[1]//a').click();// click on lead

await page.locator('//a[contains(text(),"Create Lead")]').click(); // click on create lead

//fill in the details
await page.locator('//input[@id="createLeadForm_companyName"]').fill("Acme Technologies Pvt. Ltd."); 
await page.locator('//input[@id="createLeadForm_firstName"]').fill("John");
await page.locator('//input[@id="createLeadForm_lastName"]').fill("Smith");
await page.locator('//input[@id="createLeadForm_personalTitle"]').fill("Mr.");
await page.locator('//input[@name="generalProfTitle"]').fill("Senior Software Engineer");
await page.locator('//input[@name="annualRevenue"]').fill("20,00,000");
await page.locator('//input[@name="departmentName"]').fill("Information Technology");
await page.locator('//input[@id="createLeadForm_primaryPhoneNumber"]').fill("+91 1234567890");

//click on create button
await page.locator('//input[@name="submitButton"]').click();

//get the page title
const pageTitle = await page.title();
console.log(pageTitle);

})