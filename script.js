alert("SCRIPT.JS IS RUNNING");
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
  menu.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}

document.querySelectorAll(".nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (nav) {
      nav.classList.remove("open");
    }
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

  if (!container) {
    return;
  }

  container.innerHTML = "<p>Loading products...</p>";

  try {
    const result = await supabase
      .from("products")
      .select("id, name, selling_price, description, image_url")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    const data = result.data;
    const error = result.error;

    if (error) {
      console.error("Supabase error:", error);
      container.innerHTML =
        "<p>Unable to load products. Please try again.</p>";
      return;
    }

    if (!data || data.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

    container.innerHTML = "";

    data.forEach(function (product) {
      const card = document.createElement("article");
      card.className = "product-card";

      if (product.image_url) {
        const image = document.createElement("img");
        image.className = "product-image";
        image.src = product.image_url;
        image.alt = product.name;
        card.appendChild(image);
      }

      const name = document.createElement("h3");
      name.textContent = product.name;
      card.appendChild(name);

      const description = document.createElement("p");
      description.textContent =
        product.description || "Freshly baked at Top Star Pastries.";
      card.appendChild(description);

      const price = document.createElement("strong");

      price.textContent = Number(
        product.selling_price || 0
      ).toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
      });

      card.appendChild(price);

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    container.innerHTML =
      "<p>There was an error loading the products.</p>";
  }
}

loadProducts();
