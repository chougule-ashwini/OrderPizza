import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private appService: AppService) { }
  public orderBeingCustomized: any = {}
  ngOnInit(): void {
    let self = this;
    self.orderBeingCustomized.bill = 0;
    self.orderBeingCustomized.pizzas = [];
    self.appService.subscriber$.subscribe(data => {
      self.orderBeingCustomized.bill = 0;
      self.orderBeingCustomized.pizzas.push(data);
      self.orderBeingCustomized.pizzas.forEach(element => self.orderBeingCustomized.bill = self.orderBeingCustomized.bill + element.price);
    });
  }

}
