const puppeteer = require('puppeteer');

(async() => {

    console.info("start...");
    console.info("puppeteer", puppeteer);

    const browser = await puppeteer.launch({
        headless: false,    //브라우저 보이게
        args: ['--window-size-800,600'],
        slowMo:10,     //타이핑 속도 (낮을수록 빠름)
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: 800,
        height: 600
    })

    //URL 접속후 대기
    await Promise.all([
        page.goto("https://map.naver.com/v5/directions/-/-/-/car?"),
        page.waitForNavigation()
    ]);

    //input 조작
    let target = "(//input[@id='directionStart0'])[1]";
    await page.waitForXPath(target);
    s = await page.$x(target);
    s = s[0];
    await s.type('프라코 화성\n'); //출발지 입력

    //input 조작
    target = "(//input[@id='directionGoal1'])[1]";
    await page.waitForXPath(target);
    s = await page.$x(target);
    s = s[0];
    await s.type('평촌역\n'); //도착지 입력


    //길찾기 버튼 클릭
    target = "(//button[contains(text(),'길찾기')])[1]";
    await page.waitForXPath(target);
    s = await page.$x(target);
    s = s[0];
    
    await Promise.all([
        await s.click(),
    ]);    
    await page.waitForTimeout(2000);
    
    //첫번째 추천 경로 선택
    target = "(//li[@class='ng-star-inserted'])[1]";
    await page.waitForXPath(target);
    s = await page.$x(target);
    s = s[0];
    await Promise.all([
        await s.click(),
    ]);
    await page.waitForTimeout(2000);

    target = "(//div/directions-layout/directions-result/entry-close-button/button)[1]";
    await page.waitForXPath(target);
    s = await page.$x(target);
    s = s[0];
    await Promise.all([
        await s.click(),
    ]);

    let selector_to_remove= "control-widget";
    await page.evaluate((sel) => {
        var elements = document.querySelectorAll(sel);
        for(var i=0; i< elements.length; i++){
            elements[i].parentNode.removeChild(elements[i]);
        }
    }, selector_to_remove)

    await Promise.all([
        await page.waitForTimeout(1000),
        await page.screenshot({ path : "screenshot.jpg"})
    ])



    /*
    target = "//a[@class='nav shop']"
    await page.waitForXPath(target);
    let s = await page.$x(target);      //해당 돔 객체 반환
    s = s[0];
    
    await Promise.all([
        await s.click(),
        page.waitForNavigation()
    ])
    
    target = "//ul[@id='categoryListPage1']/li/button";
    await page.waitForXPath(target);
    s = await page.$x(target);

    console.log(s)

    for(item of s){
        const value = await item.evaluate(el => el.textContent);    //element 값 가져오기
        console.info('value', value.trim());
    }
    
    await page.waitForTimeout(2000);
    await browser.close();
    */
})();