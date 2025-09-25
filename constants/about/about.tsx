import { Award, Droplets, Heart, Leaf } from "lucide-react";

export const features = [
  {
    title: "Hemp Products",
    icon: <Leaf className="text-white" size={20} />,
    description:
      "Sustainably grown hemp fiber and seeds, cultivated with traditional methods passed down through generations.",
    tags: ["Eco-friendly", "High protein", "Durable fiber"],
    image: "/assets/images/products.jpg",
  },
  {
    title: "Felt Crafts",
    icon: <Heart className="text-white" size={20} />,
    description:
      "Handmade felt items created by skilled artisans using pure wool and time-honored techniques.",
    tags: ["Handcrafted", "Natural wool", "Unique designs"],
    image: "/assets/images/crafts.jpg",
  },
  {
    title: "Wild Honey",
    icon: <Droplets className="text-white" size={20} />,
    description:
      "Pure, raw honey harvested from wild beehives in pristine mountain regions, unprocessed and natural.",
    tags: ["Raw & unfiltered", "Mountain source", "Rich nutrients"],
    image: "/assets/images/wildhoney.jpg",
  },
  {
    title: "Silajit",
    icon: <Award className="text-white" size={20} />,
    description:
      "Authentic Himalayan silajit, a rare mineral rich resin formed over centuries in mountain rocks.",
    tags: ["Himalayan source", "Mineral rich", "Traditional use"],
    image: "/assets/images/silajit.jpg",
  },
];
