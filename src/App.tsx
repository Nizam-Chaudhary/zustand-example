import { Button } from '@/components/ui/button'
import { useShallow } from 'zustand/react/shallow'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { PRODUCTS_DATA } from '@/lib/mockData'
import { useStore } from '@/store/store'
import ChangeQtyButtons from './components/ChangeQtyButtons'
import Cart from './components/Cart'
import { useEffect } from 'react'

export default function App() {
  const { addProduct, cartProducts, setTotal } = useStore(
    useShallow((state) => ({
      addProduct: state.addProduct,
      cartProducts: state.products,
      setTotal: state.setTotal,
    }))
  )

  // setTotal when products state changes
  useEffect(() => {
    const unSub = useStore.subscribe(
      (state) => state.products,
      (products) => {
        setTotal(products.reduce((acc, item) => acc + item.price * item.qty, 0))
      },
      { fireImmediately: true }
    )
    return unSub
  }, [setTotal])

  return (
    <main className="space-y-2 dark h-screen bg-background max-w-sm mx-auto mt-2">
      <Cart />
      <h1 className="text-2xl">Products:</h1>
      <div className="space-y-2">
        {PRODUCTS_DATA.map((product) => (
          <Card key={product.id}>
            <CardHeader>{product.title}</CardHeader>
            <CardContent>{product.price}$</CardContent>
            <CardFooter>
              {cartProducts.find((item) => item.id === product.id) ? (
                <ChangeQtyButtons productId={product.id} />
              ) : (
                <Button
                  onClick={() => {
                    addProduct(product)
                  }}
                  variant="default"
                >
                  Add to cart
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
