const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const websiteSchema = new Schema(
 {
    BrandWebsiteURL: { type: String },
    BrandWebsiteName: { type: String, unique: true },
    BrandWebsiteLogo: { type: String, unique: true },
    BrandWebsiteLogoColors: { type: Array, unique: true },
    BrandWebsiteDescription: { type: String, unique: true },
    BrandWebsiteKeywords: { type: String, unique: true }
 }
);
module.exports = mongoose.model('website',websiteSchema, 'websiteData');