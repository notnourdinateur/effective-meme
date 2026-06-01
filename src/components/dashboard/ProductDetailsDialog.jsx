import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { formatPrice } from '../../utils/stats'

function ProductDetailsDialog({ selectedProduct, onOpenChange, onDeleteProduct }) {
  return (
    <AlertDialog open={!!selectedProduct} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-2xl">
        {selectedProduct && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl">{selectedProduct.title}</AlertDialogTitle>
              <AlertDialogDescription className="flex gap-2 pt-2">
                <Badge variant="secondary">{selectedProduct.category}</Badge>
                <Badge>{selectedProduct.rating?.rate ?? 'N/A'} ⭐</Badge>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-4">
              <div className="flex justify-center rounded-lg bg-white/5 p-8">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-48 w-48 object-contain"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-base leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl font-semibold">{formatPrice(selectedProduct.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating Count</p>
                  <p className="text-lg font-medium">{selectedProduct.rating?.count ?? 'N/A'} reviews</p>
                </div>
              </div>
            </div>

            <AlertDialogFooter className="mt-6">
              <AlertDialogCancel>Close</AlertDialogCancel>
              <Button variant="destructive" onClick={() => onDeleteProduct(selectedProduct.id)}>
                Delete product
              </Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProductDetailsDialog
