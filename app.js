// `https://api.github.com/users/${search}`
const form = document.querySelector('.form-github-recherche');
const inpSearch = document.querySelector('.inp-recherche');
const affichage = document.querySelector('.affichage');

async function githubApi(search) {
  try {
    const response = await fetch(`https://api.github.com/users/${search}`);
    if (!response.ok) {
      throw new Error('Utilisateur introuvable ou erreur de requête');
    }
    const data = await response.json();
    console.log(data);
    creatCard(data);
  } catch (e) {
    affichage.innerHTML = `<p class="error">⚠️ ${e.message}</p>`;
    console.log(`message: ${e}`);
  }
}

// Exemple au chargement
githubApi('shadcn');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const values = inpSearch.value.trim();
  if (values) {
    githubApi(values);
    inpSearch.value = ""; // on vide seulement après envoi
  }
}

function creatCard(user) {
  affichage.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("containers");

  // Avatar
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img_container");
  const img = document.createElement("img");
  img.src = user.avatar_url;
  img.alt = `Avatar de ${user.login}`;
  imgContainer.appendChild(img);

  // Nom et username
  const name = document.createElement("h2");
  name.classList.add("nom");
  name.textContent = user.name ?? user.login;

  const username = document.createElement("p");
  username.classList.add("username");
  username.textContent = `@${user.login}`;

  // Bio
  const bio = document.createElement("p");
  bio.classList.add("description");
  bio.textContent = user.bio ?? "Pas de bio disponible";

  // Stats
  const stats = document.createElement("div");
  stats.classList.add("stats");
  stats.innerHTML = `
    <div><strong>${user.followers}</strong> Followers</div>
    <div><strong>${user.following}</strong> Following</div>
    <div><strong>${user.public_repos}</strong> Repos</div>
  `;

  // Localisation
  const location = document.createElement("p");
  location.classList.add("location");
  location.textContent = user.location ?? "Localisation inconnue";

  // Lien vers le profil
  const link = document.createElement("a");
  link.classList.add("link-profile");
  link.href = user.html_url;
  link.target = "_blank";
  link.textContent = "Voir le profil GitHub";

  // Assemblage
  container.appendChild(imgContainer);
  container.appendChild(name);
  container.appendChild(username);
  container.appendChild(bio);
  container.appendChild(stats);
  container.appendChild(location);
  container.appendChild(link);

  affichage.appendChild(container);
}