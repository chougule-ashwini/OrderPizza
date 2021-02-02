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
  public orderBeingCustomized: any = {};
  public sizePrice: number = 0;
  public crustPrice: number = 0;
  public extraCheese: boolean = false;

  ngOnInit() {
    this.getPizzas();
    this.getPizzaSizes();
    this.getPizzaCrusts();
    this.getPizzaSauces();
    this.getPizzaToppings();
    this.orderBeingCustomized.pizzas = [];
    this.orderBeingCustomized.bill = 0;
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
    self.pizzaBeingCustomized.price = self.pizzaBeingCustomized.basePizza.basePrice +
      (self.sizePrice ? self.sizePrice : 0) + (self.crustPrice ? self.crustPrice : 0) +
      (self.extraCheese ? 60 : 0) + (self.pizzaBeingCustomized.toppings.length ? self.pizzaBeingCustomized.toppings.length * 20 : 0) +
      (self.pizzaBeingCustomized.sauce == "" ? 0 : 30);
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
      self.pizzaBeingCustomized.price -= 30;
      self.pizzaBeingCustomized.sauce = "";
    }
    else if (self.pizzaBeingCustomized.sauce && self.pizzaBeingCustomized.sauce != sauce)
      self.pizzaBeingCustomized.sauce = sauce;
    else {
      self.pizzaBeingCustomized.sauce = sauce;
      self.pizzaBeingCustomized.price += 30;
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
      self.pizzaBeingCustomized.price -= 20;
    } else {
      self.pizzaBeingCustomized.toppings.push(selectedTopping);
      self.pizzaBeingCustomized.price += 20;
    }
  }

  //Select extra cheese
  public addCheese() {
    let self = this;
    if (self.extraCheese) {
      self.pizzaBeingCustomized.price -= 60;
    } else {
      self.pizzaBeingCustomized.price += 60;
    }
  }

  //Open customize pizza modal
  public openModal(template: TemplateRef<any>, selectedPizza: any) {
    let self = this;
    self.pizzaBeingCustomized.basePizza = selectedPizza;
    self.pizzaBeingCustomized.price = selectedPizza.basePrice;
    self.pizzaBeingCustomized.size = "Small";
    self.pizzaBeingCustomized.toppings = [];
    self.pizzaBeingCustomized.sauce = "";
    self.pizzaBeingCustomized.crust = "Hand Tossed";
    self.modalRef = this.modalService.show(template);
  }

  public AddToCart() {
    let self = this;
    self.orderBeingCustomized.bill = 0;
    self.orderBeingCustomized.pizzas.push(self.pizzaBeingCustomized);
    self.orderBeingCustomized.pizzas.forEach(element => self.orderBeingCustomized.bill = self.orderBeingCustomized.bill + element.price);
    self.pizzaBeingCustomized = {};
    self.extraCheese = false;
    self.sizePrice = 0;
    self.crustPrice = 0;
    self.modalService.hide();
  }
}
