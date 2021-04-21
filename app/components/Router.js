import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp-api.js";
import { ContactForm } from "./ContactForm.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  const d = document,
    w = window,
    $main = d.getElementById("main");

  let { hash } = location;
  console.log(hash);

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        //console.log(posts);
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      document.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        console.log(search);
        let html = "";
        if (search.length === 0) {
          html = `
          <p class="error">Not search results for: <mark>${query}</mark></p>
          `;
        } else {
          search.forEach((post) => {
            html += SearchCard(post);
          });
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contact") {
    $main.appendChild(ContactForm());
  } else {
    //console.log(`${api.POST}/${localStorage.getItem("wpPostId")}`);
    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        console.log(post);
        $main.innerHTML = Post(post);
      },
    });
  }

  d.querySelector(".loader").style.display = "none";
}
