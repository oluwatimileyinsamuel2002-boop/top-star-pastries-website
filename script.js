document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("products-container");
  if (container) {
    container.innerHTML = "<h3>JavaScript is working</h3>";
  }
});
const SUPABASE_URL = "https://gzofquharmjvvxebbynf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_nGeiGwevP7gP6FvvjHpOzg_sjdYRNDU";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

// Mobile menu
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
  });
});

// Current year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}
// Load products from Supabase
async function loadProducts() {
  const container = document.getElementById("products-container");

  if (!container) return;
container.innerHTML = "<p>Loading products...</p>";
  const { data, error } = await supabase
    .from("products")
    .select("id, name, selling_price, description, image_url")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error);
    container.innerHTML = "<p>Unable to load products.</p>";
    return;
  }

  container.innerHTML = "";

  data.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = product.image_url
      ? `<img class="product-image" src="${product.image_url}" alt="${product.name}">`
      : "";

    const description = product.description || "Freshly baked at Top Star Pastries.";

    const price = Number(product.selling_price || 0).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0
    });

    card.innerHTML = `
      ${image}
      <h3>${product.name}</h3>
      <p>${description}</p>
      <strong>${price}</strong>
    `;

    container.appendChild(card);
  });
}

loadProducts();
