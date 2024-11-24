import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { enviroment } from 'src/app/enviroments/enviroment';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    // private categoryService: CategoryService,
    // private router: Router,
    // private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // lay productId tu URL
    // const idParam this.activateRoute.snapshot.paramMap.get('id');

    // clear gio hang
    debugger
    // this.cartService.clearCart();

    const idParam = 5 // fake tam 1 gia tri productId --> xem chi tiết san pham
    if (idParam !== null) {
      this.productId = +idParam; // kieu noi chuoi
    }
    if (!isNaN(this.productId)) { //isNaN: is Notnumber
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          debugger
          // lay danh sach san pham va thay doi URL
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              product_image.image_url = `${enviroment.apiBaseUrl}/products/images/${product_image.image_url}`;
            });
          }
          debugger
          this.product = response
          // bắt đầu với ảnh đàu tiên
          this.showImage(0)
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {
          debugger
          console.error('Error fetching detail: ', error);
        }
      });
    } else {
      console.error('Invalid productId: ', idParam);
    }
  }

  showImage(index: number): void {
    debugger
    if(this.product && this.product.product_images && this.product.product_images. length > 0) {
    //  dam bao index trong khoang hop le
    if(index < 0) {
      index = 0;
      // ! là chắc chắn có giá trị 
    } else if(index >= this.product.product_images.length) {
      index = this.product.product_images.length - 1;
    }
    // index = index <= 0 ? 0 : this.product.product_images.length -1;
    // gán index hiện tại và cập nhật ảnh hiển thị
    this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    // goi khi 1 thumbnail duoc click
    debugger
    this.currentImageIndex = index; //cap nhat lai currentImageIndex
  }

  nextImage(): void {
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void {
    debugger
    if(this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    } else {
      // xu lys khi product null
      console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
    }
  }

  increaseQuantity(): void {
    this.quantity ++;
  }

  decreaseQuantity(): void {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow(): void {
    // thuc hiwn xu ly khi nguoi dung muon mua ngay
  }
}
