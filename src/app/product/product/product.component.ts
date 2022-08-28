import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductApiService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title = 'Products';
  products: Product[] = [];
  product: Product = {
    id: 0,
    name: '',
    price: ''
    }

  constructor(private productService: ProductApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getAllProducts()
    .subscribe(
      response => {
        this.products = response;
      }
    );
  }
  
  onSubmit() {
    if(this.product.id === 0) {
      this.productService.addProduct(this.product)
      .subscribe(
        response => {
          this.getAllProducts();
        }
        );
        console.log(this.product);
    } else {
      this.updateProduct(this.product);
    }
    }
    
    deleteProduct(id: number) {
      this.productService.deleteProduct(id)
      .subscribe(
        response => {
          this.getAllProducts();
        }
      );
    }

    populateList(product: Product) {
      this.product = product;
    }

    updateProduct(product: Product) {
      this.productService.updateProduct(product)
      .subscribe(
        response => {
          this.getAllProducts();
        }
      );
    }

    getValue() {
      console.log(this.product);
    }

    resetValue(product: Product) {

    }
}
