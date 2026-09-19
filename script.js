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
