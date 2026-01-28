import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', ()=> {

  test.beforeEach(async ({page}) => {
    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')
  
    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
  })
  
  test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = 'VLO-6E2J20'
  
    // Act  
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
    // Assert
  
    const containerPedido = page.getByRole('paragraph')
      .filter({ hasText: /^Pedido$/ })
      .locator('..') //Sobe para o elemento pai (a div que agrupa ambos)
  
    await expect(containerPedido).toContainText(order, { timeout: 10_000 })
  
    await expect(page.getByText('APROVADO')).toBeVisible()
  
  })
  
  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
  
    const order = generateOrderCode()
  
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order)
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()
  
  
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
  
  })


})

