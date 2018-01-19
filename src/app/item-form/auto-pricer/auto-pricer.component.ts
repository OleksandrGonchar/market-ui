import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ConfigObject } from './../interfaces/itemConfig.interface';

@Component({
  selector: 'auto-pricer',
  templateUrl: './auto-pricer.component.html',
  styles: []
})
export class AutoPricer {
    @Output() public arrayOfPrices = new EventEmitter<any>();
    public priceForm: FormGroup;
    public showForm: boolean = false;

    constructor() {};

    private _createForm(): void {
        this.priceForm = new FormGroup({
            countOfPosition: new FormControl(),
            stepForPosition: new FormControl(1),
            minPrice: new FormControl(),
            maxPrice: new FormControl()
        });
    }

    private _notifyParent(priceArray): void {
        this.arrayOfPrices.emit(priceArray);
    }

    public toogleComponent(): void {
        this.showForm = !this.showForm;
    }

    public createPriceArray(): void {
        console.log(this.priceForm.value);
        const arr = [];
        const maxPrice: number = +this.priceForm.value.maxPrice;
        const count: number = +this.priceForm.value.countOfPosition;
        const step: number = +this.priceForm.value.stepForPosition;

        let price: number = +this.priceForm.value.minPrice;

        for (; price <= maxPrice ; price += step) {
            arr.push({
                price,
                count
            });
        }
        this._notifyParent(arr);
    }

    ngOnInit() {
        this._createForm();
    };

    ngOnDestroy() {};
}
