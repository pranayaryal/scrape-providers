const puppeteer = require('puppeteer')

const config = {
  headless: false,
  devtool: false
}

const getPage = async (div) => {
  const [page2] = await page.$x(`//*[@id="module-filter-results-container"]/div[2]/div/section/div[${div}]/div[4]/div/div[2]/ol/li[2]/a`);
  let value = await page.evaluate(elem => elem.textContent, page2)
  console.log(`Value from getPage is ${value}`)
  return page2;
}

const scrape = (async () => {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  await page.goto('https://finder.humana.com/finder/medical/results?providerType=&distance=15&zipCode=40241&network=Bank%20One%20KPPA&searchCategory=0&searchTerm=All&searchEntityId=0&customerId=1&pfpKey=170&ipaSearchTerm=&coverageIsCurrentYear=true');

  // const finalResponse = await page.waitForResponse(response =>
  // response.url().endsWith('get-provider-filter-stats') && response.status() === 200
  // );
  // console.log(finalResponse.json())

  page.on('response', async response => {
    if (response.url().endsWith('get-provider-filter-stats')){
      console.log("response code: ", await response.json());
    }
  })

  // const inputZip = 'input[name="zipCode"]';
  // await page.waitForSelector(inputZip);
  const providerName = 'a[class="provider-name"]'
  await page.waitForSelector(providerName);
  let providers = await page.$$(providerName)

  providers.map(async el => {
     let value = await page.evaluate(elem => elem.textContent, el)
     console.log(value)

  })

  // await page.$eval((inputZip), el => el.value = '45434');
  // await page.focus(inputZip);
  // await page.keyboard.type('40241')
  // await new Promise(r => setTimeout(r, 1000));

  // const [button] = await page.$x("//*[@id='show-hide-search-trigger']/form/div[2]/div[1]/div/div[1]/div/button");
  // if (button) {
      // await button.click();
  // }

  // await page.waitForSelector('#nucleus-radio-button-59')
  // await page.click('#nucleus-radio-button-59')

  const [page2] = await page.$x('//*[@id="module-filter-results-container"]/div[2]/div/section/div[1]/div[4]/div/div[2]/ol/li[2]/a');
  let value = await page.evaluate(elem => elem.textContent, page2)
  console.log(`Value is ${value}`)
  await new Promise(r => setTimeout(r, 1000));
  if (page2) {
    await page2.click();
  }

  await new Promise(r => setTimeout(r, 2000));
  let providers2 = await page.$$(providerName)

  providers2.map(async el => {
     const value = await page.evaluate(elem => elem.textContent, el)
     console.log(value)

  })

  // await page.click('button[type="submit"]');

  // await page.waitForSelector('h1[id="jobsInLocation"]');

  // const h1 = page.find('#jobsInLocation')
  // console.log(h1.innerHTML);
  await new Promise(r => setTimeout(r, 20000));


  

  await browser.close()
})

scrape()
