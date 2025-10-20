import React, { useState, useMemo } from "react";

// FoodMenuDemo.jsx
// Single-file demo of a responsive food menu using React + Tailwind CSS + DaisyUI
// Drop this file into a React app (Vite / CRA / Next.js page) that already has Tailwind + DaisyUI configured.

export default function FoodMenuDemo() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const foods = [
    { id: 1, name: "Margherita Pizza", price: 7.99, category: "Pizza", desc: "Classic tomato, mozzarella, basil.", img: "https://source.unsplash.com/collection/1424340/800x600?pizza" },
    { id: 2, name: "Pepperoni Feast", price: 9.49, category: "Pizza", desc: "Loaded with pepperoni and cheese.", img: "https://source.unsplash.com/collection/1424340/800x600?pepperoni" },
    { id: 3, name: "Avocado Salad", price: 6.5, category: "Salad", desc: "Fresh greens, avocado, citrus dressing.", img: "https://source.unsplash.com/collection/483251/800x600?salad" },
    { id: 4, name: "Grilled Chicken", price: 11.0, category: "Main", desc: "Herb-marinated chicken with veggies.", img: "https://source.unsplash.com/collection/483251/800x600?chicken" },
    { id: 5, name: "Chocolate Cake", price: 4.5, category: "Dessert", desc: "Rich and moist chocolate delight.", img: "https://source.unsplash.com/collection/190727/800x600?cake" },
    { id: 6, name: "Pasta Alfredo", price: 8.75, category: "Main", desc: "Creamy alfredo with parmesan.", img: "https://source.unsplash.com/collection/1424340/800x600?pasta" },
    { id: 7, name: "Greek Salad", price: 6.0, category: "Salad", desc: "Cucumber, tomato, olives, feta.", img: "https://source.unsplash.com/collection/483251/800x600?greek-salad" },
  ];

  const categories = useMemo(() => ["All", ...Array.from(new Set(foods.map((f) => f.category)))], []);

  const filtered = useMemo(() => {
    return foods.filter((f) => {
      const matchesCategory = category === "All" || f.category === category;
      const matchesQuery = (f.name + " " + f.desc).toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [foods, category, query]);

  return (
    <div className="p-4 md:p-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-4xl font-extrabold">Food Menu Demo</h1>
        <p className="text-sm opacity-70">React + Tailwind CSS + DaisyUI example</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="input input-bordered w-full max-w-lg"
          />
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`btn btn-sm ${category === c ? "btn-primary" : "btn-ghost"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((food) => (
            <article key={food.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
              <figure className="h-44 overflow-hidden">
                <img src={food.img} alt={food.name} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-lg">{food.name}</h2>
                  <div className="badge badge-outline">{food.category}</div>
                </div>
                <p className="text-sm opacity-75 line-clamp-2">{food.desc}</p>
                <div className="card-actions justify-between items-center mt-3">
                  <div>
                    <span className="text-lg font-semibold">${food.price.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setSelected(food)} className="btn btn-sm btn-outline">Details</button>
                    <button className="btn btn-sm btn-primary">Add</button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 opacity-80">
              <p className="text-lg">No items match your search.</p>
              <p className="text-sm">Try clearing filters or searching something else.</p>
            </div>
          )}
        </div>
      </main>

      {/* Details modal (DaisyUI) */}
      <input type="checkbox" id="food-modal" className="modal-toggle" checked={!!selected} readOnly />
      <div className="modal">
        <div className="modal-box max-w-3xl">
          {selected && (
            <>
              <h3 className="font-bold text-xl">{selected.name} <span className="text-sm opacity-60"> — ${selected.price.toFixed(2)}</span></h3>
              <div className="flex gap-4 mt-4">
                <img src={selected.img} alt={selected.name} className="w-40 h-32 object-cover rounded" />
                <div>
                  <p className="text-sm opacity-80">{selected.desc}</p>
                  <p className="mt-3 text-xs opacity-60">Category: <strong>{selected.category}</strong></p>
                </div>
              </div>
            </>
          )}

          <div className="modal-action">
            <button className="btn" onClick={() => setSelected(null)}>Close</button>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-xs opacity-60">Demo built with React, Tailwind CSS & DaisyUI</footer>
    </div>
  );
}
