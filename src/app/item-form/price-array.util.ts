import { FormGroup, FormControl, FormArray } from '@angular/forms'

export function PriceArrayItem(
    price: string = '0', count: string = '0'
): FormGroup {
    return new FormGroup({
        price: new FormControl(`${parseInt(price, 10)}`),
        count: new FormControl(`${parseInt(count, 10)}`),
    })
};