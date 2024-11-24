import { useStore } from '@/store/store'
import { Button } from './ui/button'
import { useShallow } from 'zustand/react/shallow'
import { Minus, Plus } from 'lucide-react'

type Props = { productId: string }

export default function ChangeQtyButtons({ productId }: Props) {
  const { incQty, decQty, getProductById } = useStore(
    useShallow((state) => ({
      incQty: state.incQty,
      decQty: state.decQty,
      getProductById: state.getProductById,
    }))
  )

  const product = getProductById(productId)

  return (
    <>
      {product && (
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => {
              decQty(product.id)
            }}
            size="icon"
          >
            <Minus />
          </Button>
          <p>{product.qty}</p>
          <Button
            onClick={() => {
              incQty(product.id)
            }}
            size="icon"
          >
            <Plus />
          </Button>
        </div>
      )}
    </>
  )
}
