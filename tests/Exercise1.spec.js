import { test, expect } from '@playwright/test';

test('Checkers Game', async ({ page }) => {
  // Navigate to the Checkers game
  await page.goto('https://www.gamesforthebrain.com/game/checkers/');

  // Confirm that the site is up
  const siteIsUp = await page.title();
  expect(siteIsUp).toBe('Checkers - Games for the Brain');

  test.slow();
  // move 1
  await page.locator('xpath=//*[@id="board"]/div[6]/img[6]').click();
  await page.locator('xpath=//*[@id="board"]/div[5]/img[5]').click();

  // move 2
  await page.locator('xpath=//*[@id="board"]/div[5]/img[5]').click();
  await page.locator('xpath=//*[@id="board"]/div[4]/img[6]').click();

  // move 3
  const img = await page.locator('xpath=/html/body/div[1]/div[2]/div[1]/div[1]/div/div/div[5]/img[7]');
  if(img.isVisible){
  await page.locator('xpath=//*[@id="board"]/div[6]/img[8]').click();
  await page.locator('xpath=//*[@id="board"]/div[4]/img[6]').click();
  }else{
    console.log("no image")
  }

  // move 4
  await page.locator('xpath=//*[@id="board"]/div[4]/img[6]').click();
  await page.locator('xpath=//*[@id="board"]/div[3]/img[7]').click();
  // move 5
  await page.locator('xpath=//*[@id="board"]/div[7]/img[7]').click();
  await page.locator('xpath=//*[@id="board"]/div[6]/img[6]').click();

  let restartbut = await page.locator('xpath=/html/body/div[1]/div[2]/div[1]/div[1]/p[2]/a[1]').click;
  expect(restartbut).toBeTruthy();
 

});