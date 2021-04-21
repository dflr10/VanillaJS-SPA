export function Menu() {
  const $menu = document.createElement("nav");
  $menu.classList.add("menu");
  $menu.innerHTML = `
  <a href="#/">Home</a>
  <a href="#/search">Search</a>
  <a href="#/contact">Contact</a>
  `;

  return $menu;
}
