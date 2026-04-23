import { Page } from "@playwright/test";

export function createHeroActions(page: Page) {
    return {
        async open() {
            await page.goto('/')
            await page.getByRole('link', { name: /Configure Agora/i }).click()
        }
    }
}