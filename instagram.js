const pup = require('puppeteer');
let id= //your pass
let pass = //your pass
let data = require("./comments");

let obj = {
    0 : "Beyond Expectaions",
    1 : "Nice Man!",
    2 : "going great",
    3 : "Keep it up",
    4 : "On fire",
    5 : "You are the coolest",
    6 : "Blessing my insta feed once again",
    7 : "Keep shining",
    8 : "Dashing look",
    9 : "Your Smile is Just Wow",
    10 : "Are you MacD, cze am lovin it",
    11 : "Finally, something worth millions",
    12 : "Master teach me how to take selfies like you",
    13 : "Wonderfull!",
    14 : "Amazing",
    
};
let cmds = process.argv.slice(2);
let insta_id = cmds[0];
let tab;
async function main(){
    let browser = await pup.launch({
        headless : false,
        defaultViewport : false,
        args : ["--start-maximized"],
        
    });

    let pages = await browser.pages();
    tab= pages[0];
    await tab.goto("https://www.instagram.com/accounts/login/?next=%2Flogin%2F&source=desktop_nav");

    await tab.waitForSelector("._2hvTZ.pexuQ.zyHYP", {visible : true});
    let inputbox = await tab.$$("._2hvTZ.pexuQ.zyHYP");

    await tab.keyboard.press("Tab");    
    for(let c of id){
        await tab.keyboard.press(c);
    }

    await tab.keyboard.press("Tab");
    for(let c of pass){
        await tab.keyboard.press(c);
    }
    await tab.keyboard.press("Enter");
    await tab.waitForSelector("._6RZXI.coreSpriteSearchIcon", {visible : true});
    await tab.click("._6RZXI.coreSpriteSearchIcon")
    for(let c of insta_id){
        await tab.keyboard.press(c);
    }
    
    await tab.waitForSelector(".-qQT3 ", {visible : true});
    await tab.click(".-qQT3");

    await tab.waitForSelector(".v1Nh3.kIKUG._bz0w a");
    await tab.click(".v1Nh3.kIKUG._bz0w")
    
    for(let i =0; i<10; i++){
        await like_comment("._65Bje.coreSpriteRightPaginationArrow");
    }
    await browser.close();

}
async function like_comment(url){
    
    await tab.waitForSelector("svg[aria-label='Like']")
    await tab.click("svg[aria-label='Like']");

    await tab.waitForSelector("svg[aria-label='Comment']")
    await tab.click("svg[aria-label='Comment']");
    let n = await Math.random();
    n = await n * 15;
    n = await parseInt(n, 10);
    let str = await obj[n];

    for(let c of str){
        await tab.keyboard.press(c);
    }
    await tab.keyboard.press("Enter");

    await tab.waitForSelector(url, {visible :true});
    await tab.click(url);

}

main();
