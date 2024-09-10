/* eslint-disable import/extensions */
import pizzaIcon from './pizza.png';
import sandwichIcon from './sandwich.png';
import ramenIcon from './ramen.png';
import pretzelIcon from './pretzel.png';
import cornIcon from './corn.png';
import burgerIcon from './burger.png';
import chickenIcon from './chicken.png';
import kebabIcon from './kebab.png';
import soupIcon from './soup.png';
import defaultMealIcon from './default_meal_icon.png';

export const dishIcons: { [key: string]: string } = {
  soup: soupIcon,
  bowl: soupIcon,
  steak: defaultMealIcon,
  tacos: defaultMealIcon,
  salad: defaultMealIcon,
  thai: defaultMealIcon,
  pasta: defaultMealIcon,
  wrap: kebabIcon,
  pizza: pizzaIcon,
  sandwich: sandwichIcon,
  ramen: ramenIcon,
  pretzel: pretzelIcon,
  corn: cornIcon,
  burger: burgerIcon,
  chicken: chickenIcon,
  kebab: kebabIcon,
};
