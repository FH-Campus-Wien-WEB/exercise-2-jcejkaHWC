window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        const bodyElement = document.querySelector("body");
        const article = document.createElement("article");
        article.id = movie.imdbID;

        // HTML-Aufbau aus Ex 1
        article.innerHTML = `
          <h2>${movie.Title}</h2>
          <img src="${movie.Poster}" alt="${movie.Title}">
          <p><strong>Rating:</strong> ${movie.imdbRating} | <strong>Dauer:</strong> ${movie.Runtime} min</p>
          <p><strong>Erschienen:</strong> ${movie.Released}</p>
          <p>${movie.Plot}</p>
        `;
        // Genres hinzufügen 
        const genrePara = document.createElement("p");
        movie.Genres.forEach(genre => {
          const span = document.createElement("span");
          span.classList.add("genre");
          span.textContent = genre;
          genrePara.appendChild(span);
        });
        article.appendChild(genrePara);

        // Task 2.2: Der Edit-Button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
          location.href = "edit.html?imdbID=" + movie.imdbID;
        };

        article.appendChild(editBtn);
        bodyElement.appendChild(article);
      }
    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
        xhr.status +
        " - " +
        xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
