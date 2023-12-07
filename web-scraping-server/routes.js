const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Website = require('./models/website');
const controller = require('./controllers/file.controller');
const url = require('url');
const { LogoScrape } = require('logo-scrape');
const getMetaData = require('metadata-scraper');
const getColors = require('get-image-colors')
const db = "mongodb+srv://amitabhaghosh92:user123@website.xkjvot2.mongodb.net/websitesDB?retryWrites=true&w=majority";
  
mongoose.connect(db, err => {
    if(err) {
        console.error("Error" + err);
    }
    else {
        console.log("connected to mongodb");
    }
})

router.post('/scrapeUrl', async(req,res) => {
   let websiteObj  = {"BrandWebsiteURL":"","BrandWebsiteName":"","BrandWebsiteLogo":"","BrandWebsiteLogoColors":[],"BrandWebsiteDescription":"","BrandWebsiteKeywords":""};
   let colorsArr = [];
   let requestBody = req.body;   
   let address = requestBody.websiteUrl;
   let parsedUrl = url.parse(address, true);
   let brandWebsiteUrl = parsedUrl.href;
   let brandWebsiteName = brandWebsiteUrl.split('.')[1];
   const data = await getMetaData(address);
   const logo = await LogoScrape.getLogo(address);
   const colors = await getColors(logo.url);
   colors.map(color => colorsArr.push(color.hex()));
   websiteObj['BrandWebsiteURL'] = brandWebsiteUrl;
   websiteObj['BrandWebsiteName'] = brandWebsiteName;
   websiteObj['BrandWebsiteLogo'] = logo.url;
   websiteObj['BrandWebsiteLogoColors'] = colorsArr;
   websiteObj['BrandWebsiteDescription'] = data.description;
   websiteObj['BrandWebsiteKeywords'] = data.keywords.toString();
   let scrapedData = new Website(websiteObj);
   scrapedData.save((error,data) => {
      if(error) {
         res.status(500).send({errorMessage:"There was a problem in extracting data"});
      }
      else {
         res.status(200).send({message: "data extracted successfully"});
      }
   })
})

router.post('/upload', controller.upload);

router.get('/file',controller.getListFiles);

router.get('/websiteData',async(req,res) => {
   Website.find((err,response) => {
      if(err) {
         res.status(500).send({errorMessage:"There was a problem in fetching website data"});
       }
       else {
         res.status(200).send(response);
       }
   })
})


module.exports = router;
