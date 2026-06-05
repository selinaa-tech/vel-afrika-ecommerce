import basket from "@/assets/product-basket.jpg";
import jewelry from "@/assets/product-jewelry.jpg";
import textile from "@/assets/product-textile.jpg";
import tea from "@/assets/product-tea.jpg";
import producer1 from "@/assets/producer-1.jpg";
import producer2 from "@/assets/producer-2.jpg";
import producer3 from "@/assets/producer-3.jpg";

export type Producer = {
  id: string;
  name: string;
  country: string;
  avatar: string;
  craft: string;
  story: string;
  followers: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  producerId: string;
  country: string;
  rating: number;
  reviews: number;
  category: string;
  shipping: string;
  tag?: string;
};

export const producers: Producer[] = [
  {
    id: "p1",
    name: "Amara Okafor",
    country: "Ghana",
    avatar: producer1,
    craft: "Master Weaver",
    story: "Third-generation weaver from Bolgatanga, crafting elephant grass baskets with patterns passed down through her family.",
    followers: 2840,
  },
  {
    id: "p2",
    name: "Kwame Asante",
    country: "Kenya",
    avatar: producer2,
    craft: "Leather Artisan",
    story: "Hand-stitched leather goods made from sustainably sourced hides, working from a small Nairobi atelier.",
    followers: 1620,
  },
  {
    id: "p3",
    name: "Zola Mbeki",
    country: "Mali",
    avatar: producer3,
    craft: "Textile Designer",
    story: "Reviving traditional mudcloth techniques with contemporary palettes for a global audience.",
    followers: 4310,
  },
];

export const products: Product[] = [
  { id: "1", name: "Bolga Woven Basket", price: 68, image: basket, producerId: "p1", country: "Ghana", rating: 4.9, reviews: 214, category: "Home", shipping: "7–10 days", tag: "Trending" },
  { id: "2", name: "Heritage Bead Necklace", price: 42, image: jewelry, producerId: "p3", country: "Mali", rating: 4.8, reviews: 156, category: "Jewelry", shipping: "5–8 days", tag: "New" },
  { id: "3", name: "Hand-dyed Mudcloth Throw", price: 124, image: textile, producerId: "p3", country: "Mali", rating: 5.0, reviews: 89, category: "Home", shipping: "8–12 days", tag: "Limited" },
  { id: "4", name: "Clay Tea Ceremony Set", price: 96, image: tea, producerId: "p2", country: "Kenya", rating: 4.7, reviews: 132, category: "Home", shipping: "7–10 days" },
  { id: "5", name: "Geometric Storage Basket", price: 54, image: basket, producerId: "p1", country: "Ghana", rating: 4.9, reviews: 78, category: "Home", shipping: "7–10 days" },
  { id: "6", name: "Earth Tones Scarf", price: 38, image: textile, producerId: "p3", country: "Mali", rating: 4.6, reviews: 64, category: "Fashion", shipping: "5–8 days" },
];

export const bundles = [
  {
    id: "b1",
    name: "African Tea Ritual",
    items: ["Clay tea set", "Hand-woven coaster", "Loose-leaf rooibos"],
    image: tea,
    price: 128,
    savings: 22,
  },
  {
    id: "b2",
    name: "Bolga Home Collection",
    items: ["Woven basket", "Mudcloth throw", "Bead garland"],
    image: basket,
    price: 198,
    savings: 36,
  },
];

export const friendActivity = [
  { id: "a1", name: "Sarah", city: "London", action: "purchased", item: "Bolga Woven Basket", time: "2h" },
  { id: "a2", name: "Mei", city: "Singapore", action: "saved", item: "Heritage Bead Necklace", time: "5h" },
  { id: "a3", name: "Diego", city: "Madrid", action: "is now following", item: "Zola Mbeki", time: "1d" },
  { id: "a4", name: "Priya", city: "Mumbai", action: "reviewed", item: "Clay Tea Ceremony Set", time: "2d" },
];
