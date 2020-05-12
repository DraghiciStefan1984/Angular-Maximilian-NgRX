import { Component } from '@angular/core';
import { ProductsService } from './products.service';

@Component
({
    selector: 'app-products',
    templateUrl: './products.component.html'
})
export class ProductsComponent
{
    isDisabled=true;
    productName='Book';
    products=['Book', 'Tree'];

    constructor(productsService: ProductsService)
    {
        setTimeout(()=>
        {
            this.isDisabled=false;
        }, 3000);
    }

    onAddProduct(form)
    {
        // this.products.push(this.productName);
        console.log(form);
    }

    onRemoveProduct(product: string)
    {
        this.products=this.products.filter(p=>p!==product);
    }
}