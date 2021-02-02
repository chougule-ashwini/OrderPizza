import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  modalRef: BsModalRef;
  constructor(public modalService: BsModalService) { }
  public pizzas: any[] = [{
    name: "Peppy Paneer",
    image: "peppy-paneer.png",
    ingredients: ['paneer', 'capsicum', 'red paprika'],
    size: [{
      small: [{ name: "Hand Tossed", price: 295 }, { name: "Thin Crust", price: 350 }, { name: "Cheese Burst", price: 400 }],
      medium: [{ name: "Hand Tossed", price: 399 }, { name: "Thin Crust", price: 454 }, { name: "Cheese Burst", price: 500 }],
      large: [{ name: "Hand Tossed", price: 545 }, { name: "Thin Crust", price: 600 }, { name: "Cheese Burst", price: 645 }]
    }]
  },
  {
    name: "Farmhouse",
    image: "farm-house.png",
    ingredients: ['onion', 'capsicum', 'tomato', 'mushroom'],
    size: [{
      small: [{ name: "Hand Tossed", price: 199 }, { name: "Thin Crust", price: 299 }, { name: "Cheese Burst", price: 399 }],
      medium: [{ name: "Hand Tossed", price: 499 }, { name: "Thin Crust", price: 699 }, { name: "Cheese Burst", price: 799 }],
      large: [{ name: "Hand Tossed", price: 899 }, { name: "Thin Crust", price: 999 }, { name: "Cheese Burst", price: 1099 }]
    }]
  },
  {
    name: "Margherita",
    image: "margarita.png",
    ingredients: ['mozzarella cheese'],
    size: [{
      small: [{ crust: "Hand Tossed", price: 99 }, { crust: "Thin Crust", price: 199 }, { crust: "Cheese Burst", price: 299 }],
      medium: [{ crust: "Hand Tossed", price: 399 }, { crust: "Thin Crust", price: 499 }, { crust: "Cheese Burst", price: 599 }],
      large: [{ crust: "Hand Tossed", price: 699 }, { crust: "Thin Crust", price: 799 }, { crust: "Cheese Burst", price: 899 }]
    }]
  }];
  public toppings: any[] = [{ name: 'Tomato', image: 'tomato.jpg' }, { name: 'Onion', image: 'onion.jpg' }, { name: 'Red Papper', image: 'red-papper.jpg' }, { name: 'Mashroom', image: 'mashroom.jpg' }, { name: 'Green Papper', image: 'green-papper.jpg' }];
  public extraCheese: boolean = false;
  public orderedPizza: any;

  public openModal(template: TemplateRef<any>, customizingPizza: any) {
    this.orderedPizza = customizingPizza;
    this.modalRef = this.modalService.show(template);
  }
}
