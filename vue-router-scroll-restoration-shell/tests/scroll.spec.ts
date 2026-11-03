import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

const main = (page: Page) => page.locator('main')
const top = (page: Page) => main(page).evaluate(el => el.scrollTop)
const settle = (page: Page) => page.waitForTimeout(300)

test('Back restores <main>', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('List')
  await settle(page)
  await main(page).evaluate(el => el.scrollTop = 2000)
  await page.getByText('Item 45', { exact: true }).click()
  await expect(page.locator('h1')).toHaveText('Item 45')
  await page.goBack()
  await expect(page.locator('h1')).toHaveText('List')
  await settle(page)
  expect(await top(page)).toBe(2000)
})

test('reload restores <main>', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('List')
  await settle(page)
  await main(page).evaluate(el => el.scrollTop = 2000)
  await page.reload()
  await expect(page.locator('h1')).toHaveText('List')
  await settle(page)
  expect(await top(page)).toBe(2000)
})
