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
            stepForPosition: new FormControl(),
            minPrice: new FormControl(),
            maxPrice: new FormControl()
        });
    }

    public toogleComponent(): void {
        this.showForm = !this.showForm;
    }

    public createPriceArray(): void {
        console.log(this.priceForm.value);
        const arr = [];
        for (let i =0; i < this.priceForm.value.countOfPosition; i++) {
            console.log(i);
            arr.push({
                price: 0,
                count: 0
            })
        }
    }

    ngOnInit() {
        this._createForm();
    };

    ngOnDestroy() {};
}
