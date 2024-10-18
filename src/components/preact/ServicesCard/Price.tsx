import { type ReactElement } from "react"

interface PriceProps {
    showSavings?: boolean;
    price: number;
    full?: number;
    monthly?: boolean;
}

export default function Price({ price, full, monthly, showSavings = true }: PriceProps): ReactElement {
    return <div>
        <span class="text-lg mr-2">€</span>
        <span class="text-4xl mr-2 font-semibold font-sans text-black/80">
            {full !== undefined ? <><s class='text-xl text-gray-500 font-normal'>{full}</s> {price}</> : price}
        </span>
        {monthly && <span>/month</span>}
        {full !== undefined && showSavings && <div class="text-sm text-gray-500 mt-5">You save {full - price}€ by buying in packs</div>}
    </div>
}
