import { test } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { Navbar } from '../support/components/Navbar'

import { LandingPage } from '../support/pages/LandingPage'
import { OrderLockupPage, OrderDetails } from '../support/pages/OrderLockupPage'

test.describe('Consulta de Pedido', () => {

  let orderLockupPage: OrderLockupPage

  test.beforeEach(async ({ page }) => {
    await new LandingPage(page).goto()
    await new Navbar(page).orderLockupLink()

    orderLockupPage = new OrderLockupPage(page)
    orderLockupPage.validatePageLoaded()
  })

  test('deve consultar um pedido aprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-6E2J20',
      status: 'APROVADO',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Fernando Papito',
        email: 'papito@velo.dev'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-0LNFEA',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Steve Jobs',
        email: 'jobs@apple.com'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ page }) => {
    const order: OrderDetails = {
      number: 'VLO-412O06',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'João da Silva',
        email: 'joao@velo.dev'
      },
      payment: 'À Vista'
    }

    await orderLockupPage.searchOrder(order.number)

    await orderLockupPage.validateOrderDetails(order)
    await orderLockupPage.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {
    const order = generateOrderCode()

    await orderLockupPage.searchOrder(order)
    await orderLockupPage.validateOrderNotFound()
  })

  test('deve exibir mensagem quando o código do pedido está fora do padrão', async ({ page }) => {
    const orderCode = 'XYZ-999-INVALIDO'

    await orderLockupPage.searchOrder(orderCode)
    await orderLockupPage.validateOrderNotFound()
  })
})