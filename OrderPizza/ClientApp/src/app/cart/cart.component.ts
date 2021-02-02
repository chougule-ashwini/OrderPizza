import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private appService: AppService, private http: HttpClient) { }
  public orderBeingPlaced: any = {}
  ngOnInit(): void {
    let self = this;
    self.orderBeingPlaced.bill = 0;
    self.orderBeingPlaced.pizzas = [];
    self.appService.subscriber$.subscribe(data => {
      self.orderBeingPlaced.bill = 0;
      self.orderBeingPlaced.pizzas.push(data);
      self.orderBeingPlaced.pizzas.forEach(element => self.orderBeingPlaced.bill = self.orderBeingPlaced.bill + element.price);
    });
  }
  removeOrderItem(itemToBeRemoved: any) {
    this.orderBeingPlaced.pizzas = this.orderBeingPlaced.pizzas.filter(function (value, index, arr) {
      return JSON.stringify(itemToBeRemoved) !== JSON.stringify(arr[index]);
    });
  }
  saveOrder() {
    let self = this;
    const apiUrl = 'https://localhost:44355/api/pizza';
    self.http.post(apiUrl, {
      "orderItem": self.orderBeingPlaced
    })
      .subscribe(
        (res: Response) => {          
          console.log("Sauces", res);
        }
      );
  }
}
