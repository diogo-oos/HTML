(function(){
    const inputPesquisa = document.getElementById('inputPesquisa');
    const resultadoPesquisa = document.getElementById('resultadoPesquisa');
    const url = 'https://api.github.com/users';
    const client_id = 'Iv1.dad0bdbefa11329f';
    const client_secret = '50eabda6064bb22b58561ca65bd52bad052c87e0';

    async function getUser(user){
        const profileResponse = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);

        const profile = profileResponse.json();

        return profile;
    }

    function showProfile(user) {
        resultadoPesquisa.innerHTML = `<div class="row">
        <div class="col-md-4">
          <div class="card" style="width: 18rem;">
            <img class="card-image-top" src="${user.avatar_url}">
            <ul>
              <li class="list-group-item">Repositórios: <span class="badge" style="color: #000">${user.public_repos}</span></li>
              <li class="list-group-item">Seguidores: <span class="badge" style="color: #000">${user.followers}</span></li>
              <li class="list-group-item">Seguindo: <span class="badge" style="color: #000">${user.following}</span></li>
            </ul>
            <div class="card.body">
              <a href="${user.html_url}" target="_blank" class="btn btn-warning btn-black">Ver perfil</a>
            </div>
          </div>
        </div>
      </div>`;
    }

    inputPesquisa.addEventListener('keyup', (e) =>{
        const user = e.target.value;

        if (user.length > 0){
            getUser(user).then(res => showProfile(res));
        }
    })
})();

