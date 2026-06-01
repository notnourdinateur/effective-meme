import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { formatPrice } from '../../utils/stats'

function DashboardStatsCards({ summary, cartCount }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Total products</CardDescription>
          <CardTitle className="text-3xl">{summary.totalProducts}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Categories</CardDescription>
          <CardTitle className="text-3xl">{summary.categories}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Average price</CardDescription>
          <CardTitle className="text-3xl">{formatPrice(summary.averagePrice)}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Cart items</CardDescription>
          <CardTitle className="text-3xl">{cartCount}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}

export default DashboardStatsCards
