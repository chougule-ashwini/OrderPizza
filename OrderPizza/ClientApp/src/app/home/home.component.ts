import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(public modalService: BsModalService, private http: HttpClient) { }

  public basePizza: any;
  public sizes: any;
  public crusts: any;
  public sauces: any;
  public toppings: any;
  public pizzaBeingCustomized: any = {};
  public priceBeingUpdated: number = 0;
  public orderBeingCustomized: any;
  public sizePrice: number = 0;
  public crustPrice: number = 0;
  public saucePrice: number = 0;
  public toppingsPrice: number = 0;
  public extraCheese: boolean = false;

  ngOnInit() {
    this.getPizzas();
    this.getPizzaSizes();
    this.getPizzaCrusts();
    this.getPizzaSauces();
    this.getPizzaToppings();
  }

  //Get all base pizzas
  public getPizzas() {
    let self = this;
    const urlofApi = 'https://localhost:44355/api/pizza/basePizza';
    self.http.get(urlofApi)
      .subscribe(
        (res: Response) => {
          self.basePizza = res["basePizzas"];
          console.log("Pizzas", self.basePizza);
        }
      );
  }

  //Get all base pizza sizes
  public getPizzaSizes() {
    let self = this;
    const urlofApi = 'https://localhost:44355/api/pizza/Sizes';
    self.http.get(urlofApi)
      .subscribe(
        (res: Response) => {
          self.sizes = res;
          console.log("Sizes", self.sizes);
        }
      );
  }

  //Get all base pizza crusts
  public getPizzaCrusts() {
    let self = this;
    const urlofApi = 'https://localhost:44355/api/pizza/Crust';
    self.http.get(urlofApi)
      .subscribe(
        (res: Response) => {
          self.crusts = res;
          console.log("Crusts", self.crusts);
        }
      );
  }

  //Get all base pizza sauces
  public getPizzaSauces() {
    let self = this;
    const urlofApi = 'https://localhost:44355/api/pizza/Sauce';
    self.http.get(urlofApi)
      .subscribe(
        (res: Response) => {
          self.sauces = res;
          console.log("Sauces", self.sauces);
        }
      );
  }

  //Get all base pizza toppings
  public getPizzaToppings() {
    let self = this;
    const urlofApi = 'https://localhost:44355/api/pizza/Toppings';
    self.http.get(urlofApi)
      .subscribe(
        (res: Response) => {
          self.toppings = res;
          console.log("Toppings", self.toppings);
        }
      );
  }
  public calculatePrice() {
    let self = this;
    self.priceBeingUpdated = self.pizzaBeingCustomized.basePizza.basePrice + (self.sizePrice ? self.sizePrice : 0) + (self.crustPrice ? self.crustPrice : 0)
    self.pizzaBeingCustomized.price = self.priceBeingUpdated;
  }

  public changeSize(size: string) {
    let self = this;
    self.pizzaBeingCustomized.size = size;
    if (size == "Small") {
      self.sizePrice = 0;
    }
    if (size == "Medium") {
      self.sizePrice = 50;
    }
    if (size == "Large") {
      self.sizePrice = 100;
    }
    self.calculatePrice();
  }

  public changeCrust(crust: string) {
    let self = this;
    self.pizzaBeingCustomized.crust = crust;
    if (crust == "Hand Tossed") {
      self.crustPrice = 0;
    }
    if (crust == "Thin Crust") {
      self.crustPrice = 65;
    }
    if (crust == "Cheese Bust") {
      self.crustPrice = 100;
    }
    self.calculatePrice();
  }

  //Open customize pizza modal
  public openModal(template: TemplateRef<any>, selectedPizza: any) {
    let self = this;
    self.pizzaBeingCustomized.basePizza = selectedPizza;
    self.pizzaBeingCustomized.price = selectedPizza.basePrice;
    self.modalRef = this.modalService.show(template);
  }
}
