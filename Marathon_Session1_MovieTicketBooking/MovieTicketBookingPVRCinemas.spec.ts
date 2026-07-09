import { test, expect } from '@playwright/test';
test.setTimeout(180000);
test('Movie ticket booking in PVR Cinemas', async ({ page }) => {

    await page.goto('https://www.pvrcinemas.com');
    page.setDefaultTimeout(120000);
    page.setDefaultNavigationTimeout(120000);

    //select city
    await page.locator('(//span[@class="cities-placed"])[2]').click();
    await page.getByPlaceholder('Search for city').fill('Vellore');
    await page.locator('//ul[@id="city_list"]').click();

    //click on the cinema option
    await page.locator('//span[@class="cinemas-inactive"]').click();

    //print all the available movies
    const listOfAllMovies = page.locator(`(//div[@class="now-movie"])[1]//div[@class="now-movies"]//div[@class="p-card-title"]`);
    const countOfMovies = await listOfAllMovies.count();

    console.log("Movie List" +": "+ "\n");
    for (let i=0; i<countOfMovies ;i++)
    {
        const movieList = await listOfAllMovies.nth(i).innerText();
        console.log(movieList);
    }

    //select Cinema
    await page.locator('(//span[@class="p-dropdown-label p-inputtext p-placeholder"])[2]').click();
    await page.locator('(//ul[@class="p-dropdown-items"]//li)[2]').click();

    //select date from the list
    await page.locator('//ul[@class="p-dropdown-items"]//li[2]').click();

    //select available cinema from the list
    await page.locator('//ul[@class="p-dropdown-items"]//li[3]').click();

    //select timing
    await page.locator('//ul[@class="p-dropdown-items"]//li[2]').click();

    //click on booking
    await page.locator('//button[@aria-label="Submit"]').click();

    //clcik on pop up screen
    await page.locator('//button[contains(text(),"Accept")]').click();

    //check for the booked seats dsiabled
    const seat = page.locator('//tr[@class="seats-row"][1]//td[8]//span');
    await expect(seat).toHaveClass(/seat-disable/);

    //book a new seat
    await page.locator('//tr[@class="seats-row"][4]//td[10]').click();


    //get the movie details
    const bookedMovieDetails = await page.locator('//div[@class="summary-movies-content"]').innerText();
    console.log("\n");
    console.log("Movie Ticket Booked" + " : " + bookedMovieDetails);

    //seat number
    const seatNumber = await page.locator('//div[@class="seat-number"]').innerText();
    console.log("Seat Number : " + seatNumber);

    //total price of the movie
    //await page.locator('//div[@class="grand-total"]').isVisible();
    const grandtotal = await page.locator('//div[@class="grand-total"]').innerText();
    const grandprice = await page.locator('//div[@class="grand-prices"]').innerText();

    //verify the price
    let expectedPrice= 286.10;
    expect(parseFloat(grandprice)).toBe(expectedPrice);
    console.log(grandtotal + " : " + grandprice);

    //get the page title
     const pageTitle: string = await page.title();
     console.log(`The page title is : ${pageTitle}`);

    //click on proceed button
    await page.locator('//button[text()="Proceed"]').click();

    
});
