using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PizzaAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PizzaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        // GET: api/<PizzaController>
        [HttpGet]
        [Route("BasePizza")]
        public BasePizzaList GetBasePizza()
        {
            var basePizzas = new BasePizzaList();
            using (StreamReader r = new StreamReader("Data/basePizza.json"))
            {
                string json = r.ReadToEnd();
                basePizzas = JsonConvert.DeserializeObject<BasePizzaList>(json);
            }

            return basePizzas;
        }

        [HttpGet]
        [Route("Toppings")]
        public List<string> GetToppings()
        {
            var items = new List<String> { "Tomato", "Cheese", "Onion", "Paneer", "Capsicum", "Mushroom", "Jalapeno", "Corn" };
            return items;
        }

        [HttpGet]
        [Route("Sizes")]
        public List<string> GetSize()
        {
            var items = new List<String> { "Small", "Medium", "Large" };
            return items;
        }

        [HttpGet]
        [Route("Crust")]
        public List<string> GetCrust()
        {
            var items = new List<String> { "Hand Tossed", "Cheese Bust", "Thin Crust" };
            return items;
        }

        [HttpGet]
        [Route("Sauce")]
        public List<string> GetSauce()
        {
            var items = new List<String> { "Musturd", "Mozzerilla", "Tomato" };
            return items;
        }

        // GET api/<PizzaController>/5
        [HttpGet("{id}")]
        public BasePizza Get(int id)
        {
            var basePizzas = new BasePizzaList();
            using (StreamReader r = new StreamReader("Data/basePizza.json"))
            {
                string json = r.ReadToEnd();
                basePizzas = JsonConvert.DeserializeObject<BasePizzaList>(json);
            }
            var selectedPizza = basePizzas.basePizzas.Where(x => x.id == id).FirstOrDefault();

            return selectedPizza;
        }

        // POST api/<PizzaController>
        [HttpPost]
        public void Post([FromBody] Order orderItem)
        {
            var orders = new OrderList();
            using (StreamReader r = new StreamReader("Data/order.json"))
            {
                string json = r.ReadToEnd();
                orders = JsonConvert.DeserializeObject<OrderList>(json);
                orderItem.orderId = orders.order.Count() + 1;
                orders.order.Add(orderItem);
            }           
            var jsonData = JsonConvert.SerializeObject(orders);
            using (StreamWriter w = new StreamWriter("Data/order.json"))
            {
                w.Write(jsonData);
            }

        }
        [HttpGet]
        [Route("Orders")]
        public OrderList GetOrderList()
        {
            var orders = new OrderList();
            using (StreamReader r = new StreamReader("Data/order.json"))
            {
                string json = r.ReadToEnd();
                orders = JsonConvert.DeserializeObject<OrderList>(json);
            }

            return orders;
        }

        // PUT api/<PizzaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PizzaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
