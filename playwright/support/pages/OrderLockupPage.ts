import { Page, expect } from '@playwright/test'

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

export type OrderDetails = {
    number: string
    status: OrderStatus
    color: string
    wheels: string
    customer: { name: string; email: string }
    payment: string
}

export class OrderLockupPage {
    constructor(private page: Page) { }

    async validatePageLoaded() {
        await expect(this.page.getByRole('heading')).toContainText('Consultar Pedido')
    }

    async searchOrder(code: string) {
        await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }

    async validateOrderDetails(order: OrderDetails) {
        const snapshot = `
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `
        await expect(this.page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(snapshot)
    }

    async validateStatusBadge(status: OrderStatus) {
        const statusClasses = {
            APROVADO: {
                background: 'bg-green-100',
                text: 'text-green-700',
                icon: 'lucide-circle-check-big'
            },
            REPROVADO: {
                background: 'bg-red-100',
                text: 'text-red-700',
                icon: 'lucide-circle-x'
            },
            EM_ANALISE: {
                background: 'bg-amber-100',
                text: 'text-amber-700',
                icon: 'lucide-clock'
            }
        } as const

        const classes = statusClasses[status]
        const statusBadge = this.page.getByRole('status').filter({ hasText: status })

        await expect(statusBadge).toHaveClass(new RegExp(classes.background))
        await expect(statusBadge).toHaveClass(new RegExp(classes.text))
        await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(classes.icon))
    }

    async validateOrderNotFound() {
        await expect(this.page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `)
    }
}