/*
ENDPOINT: GET https://api.github.com/users/{username}
The username is part of URL, rather than a query parameter like 
./users?username=deepak45.
*/

const searchBtn = document.querySelector("#search-btn");
const user = document.querySelector("#username");

const imageEl = document.querySelector("#avatar");
const nameEl = document.querySelector("#name");
const loginEl = document.querySelector("#login");
const bioEl = document.querySelector("#bio");
const followersEl = document.querySelector("#followers");
const followingEl = document.querySelector("#following");
const reposEl = document.querySelector("#repos");
const locationEl = document.querySelector("#location");
const profileLinkEl = document.querySelector("#profile-link");

const errorEl = document.querySelector("#error");

const searchUser = function () {
  const username = user.value.trim();
  if (!username) {
    alert("Enter a username");
    return;
  }
  getUser(username);
  user.value = "";
};

const getUser = async function (username) {
  searchBtn.innerText = "Searching...";
  searchBtn.disabled = true;
  user.disable = true;

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok)
      throw new Error(`No GitHub user named "${username}" found.`);

    const data = await response.json();
    displayUser(data);
  } catch (error) {
    errorEl.textContent = `${error.message}`;
    clearProfile();
  } finally {
    searchBtn.innerText = "Search";
    searchBtn.disabled = false;
    user.disable = false;
    user.focus();
  }
};

const displayUser = function (data) {
  const {
    avatar_url,
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
    location,
    html_url,
  } = data;

  // clearing the previous error message (if any)
  errorEl.textContent = "";

  imageEl.src = avatar_url;
  nameEl.textContent = name || "Name not available";
  loginEl.textContent = `@${login}`;
  bioEl.textContent = bio || "Bio not available";
  followersEl.textContent = followers;
  followingEl.textContent = following;
  reposEl.textContent = public_repos;
  locationEl.textContent = location || "Location not available";
  profileLinkEl.href = html_url;
};

const clearProfile = function () {
  imageEl.src = "";
  nameEl.textContent = "Name";
  loginEl.textContent = "@username";
  bioEl.textContent = "User bio will appear here.";
  followersEl.textContent = "0";
  followingEl.textContent = "0";
  reposEl.textContent = "0";
  locationEl.textContent = "Location";
  profileLinkEl.href = "";
};

// Listening for search button press and enter key while typing input
searchBtn.addEventListener("click", searchUser);
user.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchUser();
  }
});
