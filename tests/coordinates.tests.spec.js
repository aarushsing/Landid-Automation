const { test, expect, chromium } = require('@playwright/test');
require('dotenv').config(); // Load environment variables from .env

// Parse the coordinates from the .env file
const coordinates = JSON.parse(process.env.COORDINATES);

test.describe('Parcel Data Tests', () => {
    test.setTimeout(120000);
    
    test('should fetch parcel data for multiple coordinates', async () => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        // Step 1: Launch Chromium browser
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        // Step 2: Go to the login page
        await page.goto('https://id.land/users/sign_in', { waitUntil: 'domcontentloaded' });

        // Step 3: Fill in login credentials
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.click('button[type="submit"]');

        // Step 4: Wait for the `profile.json` response
        const profileResponse = await page.waitForResponse(response =>
            response.url() === 'https://api.id.land/profile.json' && response.status() === 200
        );

        // Step 5: Extract the token and email from the response
        const profileData = await profileResponse.json();
        const authToken = profileData.authentication_token;

        
        console.log('Email:', profileData.email);

        // Step 6: Fetch parcel data for each coordinate
        for (const { id, lat, lng } of coordinates) {
            console.log(`Fetching parcel data for ID: ${id}, Lat: ${lat}, Lng: ${lng}`);

            const parcelResponse = await page.request.get(
                `https://parcels.id.land/parcels/v2/by_location.json?lng=${lng}&lat=${lat}`,
                {
                    headers: {
                        'X-Auth-Token': authToken,
                        'X-Auth-Email': profileData.email,
                    }
                }
            );

            if (parcelResponse.ok()) {
                const parcelData = await parcelResponse.json();
                console.log(`Parcel Data for ID ${id}:`, parcelData);
            } else {
                console.error(`Failed to fetch data for ID ${id}`);
            }
        }

        // Step 7: Close the browser
        await browser.close();
    });
});
