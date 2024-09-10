import { Meal, Rating } from '../context/MenuAndVendorsContext';

function calcVendorRating(meals: Meal[], ratings: Rating[], vendorId: number) {
  const matchingMeals = meals
    .filter((meal: Meal) => meal.vendorId === vendorId)
    .map((meal: Meal) => meal.id);
  const filteredRatings = ratings.filter((rating: Rating) => matchingMeals.includes(rating.mealId));
  const ratingsSum = filteredRatings.reduce((sum, rating) => sum + rating.rating.rating, 0);
  const averageRating = (ratingsSum / filteredRatings.length).toFixed(1);
  const numRatings = filteredRatings.length;
  return { avgRating: Number(averageRating), ratingsCount: numRatings };
}
export default calcVendorRating;
