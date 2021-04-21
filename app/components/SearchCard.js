export function SearchCard(props) {
  let { id, title, _embedded } = props,
    slug = _embedded.self[0].slug,
    dateFormat = new Date(_embedded.self[0].date).toLocaleString();

  return `
    <article class="post-card">
    <h2>${title}</h2>
    <p>
    <time datetime="${_embedded.self[0].date}">${dateFormat}</time>
    <a href="#/${slug}" data-id="${id}">See Post</a>
    </p>
    </article>
    `;
}
