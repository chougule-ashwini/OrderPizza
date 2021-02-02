import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(public modalService: BsModalService, private http: HttpClient, private appService: AppService) { }

  public basePizza: any;
  public sizes: any;
  public crusts: any;
  public sauces: any;
  public toppings: any;
  public pizzaBeingCustomized: any = {};
  public sizePrice: number = 0;
  public crustPrice: number = 0;
  public extraCheese: boolean = false;
  public extraCheesePrice: number = 60;
  public perToppingPrice: number = 20;
  public saucePrice: number = 30;

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
    const apiUrl = 'https://localhost:44355/api/pizza/basePizza';
    self.http.get(apiUrl)
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
    const apiUrl = 'https://localhost:44355/api/pizza/Sizes';
    self.http.get(apiUrl)
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
    const apiUrl = 'https://localhost:44355/api/pizza/Crust';
    self.http.get(apiUrl)
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
    const apiUrl = 'https://localhost:44355/api/pizza/Sauce';
    self.http.get(apiUrl)
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
    const apiUrl = 'https://localhost:44355/api/pizza/Toppings';
    self.http.get(apiUrl)
      .subscribe(
        (res: Response) => {
          self.toppings = res;
          console.log("Toppings", self.toppings);
        }
      );
  }

  public calculatePrice() {
    let self = this;
    self.pizzaBeingCustomized.price = self.pizzaBeingCustomized.basePizza.basePrice +
      (self.sizePrice ? self.sizePrice : 0) + (self.crustPrice ? self.crustPrice : 0) +
      (self.extraCheese ? self.extraCheesePrice : 0) + (self.pizzaBeingCustomized.toppings.length ? self.pizzaBeingCustomized.toppings.length * self.perToppingPrice : 0) +
      (self.pizzaBeingCustomized.sauce == "" ? 0 : self.saucePrice);
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

  public changeSauce(sauce: string) {
    let self = this;
    if (self.pizzaBeingCustomized.sauce && self.pizzaBeingCustomized.sauce == sauce) {
      self.pizzaBeingCustomized.price -= self.saucePrice;
      self.pizzaBeingCustomized.sauce = "";
    }
    else if (self.pizzaBeingCustomized.sauce && self.pizzaBeingCustomized.sauce != sauce)
      self.pizzaBeingCustomized.sauce = sauce;
    else {
      self.pizzaBeingCustomized.sauce = sauce;
      self.pizzaBeingCustomized.price += self.saucePrice;
    }
  }

  public changeCrust(selectedCrust: string) {
    let self = this;
    self.pizzaBeingCustomized.crust = selectedCrust;
    if (selectedCrust == "Hand Tossed") {
      self.crustPrice = 0;
    }
    if (selectedCrust == "Thin Crust") {
      self.crustPrice = 65;
    }
    if (selectedCrust == "Cheese Bust") {
      self.crustPrice = 100;
    }
    self.calculatePrice();
  }

  public chooseToppings(selectedTopping: string) {
    let self = this;
    if (self.pizzaBeingCustomized.toppings.length && self.pizzaBeingCustomized.toppings.indexOf(selectedTopping) != -1) {
      self.pizzaBeingCustomized.toppings.splice(self.pizzaBeingCustomized.toppings.indexOf(selectedTopping), 1);
      self.pizzaBeingCustomized.price -= self.perToppingPrice;
    } else {
      self.pizzaBeingCustomized.toppings.push(selectedTopping);
      self.pizzaBeingCustomized.price += self.perToppingPrice;
    }
  }

  //Select extra cheese
  public addCheese() {
    let self = this;
    if (self.extraCheese) {
      self.pizzaBeingCustomized.extraCheese = false;
      self.pizzaBeingCustomized.price -= self.extraCheesePrice;
    } else {
      self.pizzaBeingCustomized.extraCheese = true;
      self.pizzaBeingCustomized.price += self.extraCheesePrice;
    }
  }

  //Open customize pizza modal
  public openModal(template: TemplateRef<any>, selectedPizza: any) {
    let self = this;
    self.createDefaultSelectedPizza(selectedPizza);
    self.modalRef = this.modalService.show(template);
  }

  public AddToCart() {
    let self = this;
    self.appService.emitOrder(self.pizzaBeingCustomized);
    self.clearSelectedPizza()
    self.modalService.hide();
  }
  public AddDefaultToCart(selectedPizza: any) {
    let self = this;
    self.createDefaultSelectedPizza(selectedPizza);
    self.appService.emitOrder(self.pizzaBeingCustomized);
    self.clearSelectedPizza()
  }

  public createDefaultSelectedPizza(selectedDefaulPizza: any) {
    let self = this;
    self.pizzaBeingCustomized.basePizza = selectedDefaulPizza;
    self.pizzaBeingCustomized.price = selectedDefaulPizza.basePrice;
    self.pizzaBeingCustomized.size = "Small";
    self.pizzaBeingCustomized.toppings = [];
    self.pizzaBeingCustomized.sauce = "";
    self.pizzaBeingCustomized.crust = "Hand Tossed";
    self.pizzaBeingCustomized.extraCheese = self.extraCheese;
  }
  public clearSelectedPizza() {
    let self = this;
    self.pizzaBeingCustomized = {};
    self.extraCheese = false;
    self.sizePrice = 0;
    self.crustPrice = 0;
  }
}
