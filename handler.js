const chromium = require('chrome-aws-lambda')
require('dotenv').config()

module.exports.resume = async event => {
  const puppeteerOptions = {
    args: chromium.args,
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
  }

  const browser = await chromium.puppeteer.launch(puppeteerOptions)
  const page = await browser.newPage()
  await page.setViewport({ width: 960, height: 946, deviceScaleFactor: 0.8 })
  await page.goto(process.env.RESUME_URL)
  const pdf = await page.pdf()

  return {
    statusCode: 200,
    body: pdf.toString('base64'),
    headers: {
      'Content-type': 'application/pdf',
      'Content-disposition': 'attachment; filename=resume.pdf',
      'Access-Control-Allow-Origin' : '*',
    },
    isBase64Encoded: true
  };
};
