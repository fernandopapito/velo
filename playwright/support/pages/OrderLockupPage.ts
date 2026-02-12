import { Page, expect } from '@playwright/test'

type OrderStatus = 'APROVADO' | 'REPROVADO' | 'EM_ANALISE'

export class OrderLockupPage {
    private readonly statusClasses = {
        APROVADO: ['bg-green-100', 'text-green-700', 'lucide-circle-check-big'],
        REPROVADO: ['bg-red-100', 'text-red-700', 'lucide-circle-x'],
        EM_ANALISE: ['bg-amber-100', 'text-amber-700', 'lucide-clock']
    } as const

    constructor(private page: Page) { }

    async searchOrder(code: string) {
        await this.page.getByRole('textbox', { name: 'Número do Pedido' }).fill(code)
        await this.page.getByRole('button', { name: 'Buscar Pedido' }).click()
    }

    async validateStatusBadge(status: OrderStatus) {
        const [bgClass, textClass, iconClass] = this.statusClasses[status]
        const statusBadge = this.page.getByRole('status').filter({ hasText: status })

        await expect(statusBadge).toHaveClass(new RegExp(bgClass))
        await expect(statusBadge).toHaveClass(new RegExp(textClass))
        await expect(statusBadge.locator('svg')).toHaveClass(new RegExp(iconClass))
    }
}