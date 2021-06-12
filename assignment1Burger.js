const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    CHICKENSTRIP:Symbol("ChickenStrip"),
    FRENCHFRIES:Symbol("frenchfries"),
    DRINKS:  Symbol("drinks")
});

const Prices = Object.freeze({
    Drink: 1,
    Burger:{
        Small:4,
        Large:8,
    },
    CHICKENSTRIP:6,
    Frenchfries:3.75,
    Topping:2,
    Salad:5
});


module.exports = class burgerOrder extends Order{
    constructor(){
        super();
        this.Price=0;
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sSize = "";
        this.sChickenstrip=false;
        this.sFrenchfries=false;
        this.sDrinks = "";
        this.sItem = "burger";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Burger Joint.");
                aReturn.push("What burger size would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                if (this.sSize=="small")
                {
                    this.Price+=Prices.Burger.Small;
                }
                else 
                {
                    this.Price+=Prices.Burger.Large;
                }    
                aReturn.push("What toppings would you like?");
                console.log(this.Price);
                break;

            case OrderState.TOPPINGS:
                    this.stateCur = OrderState.CHICKENSTRIP
                    this.sToppings = sInput.split(" ");
                    const numberOfToppings=this.sToppings.length;
                    this.Price+=numberOfToppings*Prices.Topping;
                    aReturn.push("Would you like chicken strips with it?");
                    break;    
                
            case OrderState.CHICKENSTRIP:
                this.stateCur = OrderState.FRENCHFRIES
                if (sInput="yes")
                {
                   this.sChickenstrip=true; 
                   this.Price+=Prices.CHICKENSTRIP;
                }
                aReturn.push("Would you like fries with it?");
                break;
               
            case OrderState.FRENCHFRIES:
                this.stateCur = OrderState.DRINKS
                if (sInput="yes")
                {
                   this.sFrenchfries=true; 
                   this.Price+=Prices.Frenchfries;
                }
                aReturn.push("Would you like drink to go with it?");
               
                break;    
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no"){
                    this.sDrinks = sInput;
                    this.Price+=Prices.Drink;
                }
                
                aReturn.push("Thank-you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings.join(', ')} `);
                if(this.sChickenstrip){
                    aReturn.push("Chicken");
                }
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                if(this.sFrenchfries){
                    aReturn.push("and fries");
                }
                aReturn.push(`The total cost is ${this.Price}.`);
                console.log(this.Price);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}