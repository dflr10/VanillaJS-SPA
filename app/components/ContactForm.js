export function ContactForm() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("dynamic-styles");
  $form.classList.add("contact-form");

  $styles.innerHTML = `.contact-form {
  --form-ok-color: #387c7e;
  --form-error-color: #fc5776;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.contact-form > * {
  padding: 0.5rem;
  margin: 1rem auto;
  display: block;
  width: 100%;
  border: 0px;
  border-radius: 8px;
}

.contact-form textarea {
  resize: none;
}

.contact-form legend,
.contact-form-response {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

.contact-form input {
  height: 25px;
  padding: 10px;
}

.contact-form input,
.contact-form textarea {
  font-size: 1rem;
  font-family: sans-serif;
}

.contact-form input[type="submit"] {
  font-weight: bold;
  cursor: pointer;
  background-color: #387c7e;
  color: white;
  height: 35px;
}

.contact-form input[type="submit"]:hover {
  transform: translateY(-1.5px) scale(1.05);
  background-color: #5fc8cb;
}

.contact-form *::placeholder {
  color: #131648;
}

.contact-form [required]:valid {
  border: thin solid var(--form-ok-color);
}

.contact-form [required]:invalid {
  border: thin solid var(--form-error-color);
}

.contact-form-error {
  margin-top: -1rem;
  font-size: 80%;
  background-color: var(--form-error-color);
  color: #fff;
  transition: all 800ms ease;
}

.contact-form-error.is-active {
  display: block;
  animation: show-message 1s 1 normal 0s ease-out both;
}

.none {
  display: none;
}

@keyframes show-message {
  0% {
    visibility: hidden;
    opacity: 0;
  }

  100% {
    visibility: visible;
    opacity: 1;
  }
}`;

  $form.innerHTML = ` <legend>Send us your comments.</legend>
    <input type="text" name="name" placeholder="Write your name" title="¡Name only accepts letters and blanks!"
    pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
    <input type="email" name="email" placeholder="Write your email" title="¡Wrong email!"
    pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
    <input type="text" name="subject" placeholder="Comment subject" title="¡The subject is required!" required>
    <textarea name="comments" cols="50" rows="5" placeholder="Write your comments"
    title="¡Your comment must not exceed 255 characters!" data-pattern="^.{1,255}$" required></textarea>
    <input type="submit" value="Send">
    <div class="contact-form-loader none">
    <img src="app/assets/loader.svg" alt="Loading">
    </div>
    <div class="contact-form-response none">
    <p>The data has been sent.</p>
    </div>`;

  function validationsForm() {
    let $form = document.querySelector(".contact-form"),
      $inputs = d.querySelectorAll(".contact-form [required]");

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("contact-form-error", "none");
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;
        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
        if (!pattern) {
          return $input.value == ""
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    d.addEventListener("submit", (e) => {
      e.preventDefault();

      const $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

      $loader.classList.remove("none");

      fetch("https://formsubmit.co/ajax/felipe_lozada04102@elpoli.edu.co", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          //console.log(json);
          $loader.classList.add("none");
          $response.classList.remove("none");
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message = err.statusText || "Ocurrió un ERROR";
          $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })
        .finally(() =>
          setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
          }, 2000)
        );
    });
  }

  setTimeout(() => validationsForm(), 100);

  return $form;
}
