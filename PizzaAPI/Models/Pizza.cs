using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzaAPI.Models
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse); 
    public class BasePizza
    {
        public int id { get; set; }
        public string name { get; set; }
        public List<string> ingredients { get; set; }
        public int basePrice { get; set; }
    }

    public class BasePizzaList
    {
        public List<BasePizza> basePizzas { get; set; }
    }

    public class Pizza
    {
        public BasePizza basePizza { get; set; }
        public List<string> toppings { get; set; }
        public string sauce { get; set; }
        public string size { get; set; }
        public string crust { get; set; }
        public bool extraCheese { get; set; }
        public int quantity { get; set; }
        public int price { get; set; }
    }

    public class Order
    {
        public List<Pizza> pizzas { get; set; }
        public int orderId { get; set; }
        public int bill { get; set; }
    }

    public class OrderList
    {
        public List<Order> order { get; set; }
    }
}
