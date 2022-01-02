import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit();

async function exibirDados() {
  let linhaApresentacao = document.getElementById('linhaApresentacao');
  let respostaUser = '';

  let repositorios = document.getElementById('repositorios');

  // Pegar os dados do usuário recebidos da API
  let dadosUser = await octokit.request('GET /users/diogo-oos');

  // Pegar os dados dos repositórios recebidos da API
  let dadosRepos = await octokit.request(`${dadosUser.data.repos_url}`);

  respostaUser = `

  <!--imagem de perfil - início-->
      <div class="col-12 col-sm-12 col-md-3 col-lg-3" >
          <img class="foto-perfil" src="${dadosUser.data.avatar_url}" alt="Diogo Marques Gomes">
      </div>
  <!--imagem de perfil - fim-->

  <!--descrição do perfil e redes sociais - início-->
  <div class="col-12 col-sm-12 col-md-9 col-lg-9" >

      <div class="descricao-perfil" >

          <h4>${dadosUser.data.name}</h4>
          <h5>${dadosUser.data.bio}</h5>
          <p id="descricao-text" ><b>Objetivos:</b> Quando comecei a me preocupar com o que quero ser, comecei a procurar 
          por aquilo com a qual tenho mais afinidade, do que mais gosto. Me interessei pela pela área
          de TI, principalmente por desenvolvimento de software, tive também um grande incentivo de um primo meu.
          Quero um dia poder trabalhar na área e, para alcançar tal objetivo, entrei num curso de graduação em 
          Sistemas de informação.
          </p>
          <h4>Redes Sociais</h4>
          <p class="icon-redes-sociais"><a href="${dadosUser.data.html_url}" target="_blank"><i class="fab fa-github fa-2x"></i></a></p>
          <p class="icon-redes-sociais"><a href="https://www.linkedin.com/in/diogo-m-gomes-12987a1b5" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a></p>
          <p class="icon-redes-sociais"><a href="https://www.instagram.com/invites/contact/?i=1ak9k75jp7ppd&utm_content=3xz5wxp" target="_blank"><i class="fab fa-instagram fa-2x"></i></a></p>
          </div>

      </div>
  <!--descrição do perfil e redes sociais - fim-->

  `;

  // Preencher a section com a resposta e o texto HTML
  linhaApresentacao.innerHTML = respostaUser;

  dadosRepos.data.forEach(x => {
    let data = new Date(x.updated_at);
    // Preencher a section com a resposta e o texto HTML
    repositorios.innerHTML += `
    <!--repositórios - início-->
      <div class="col-12 col-sm-12 col-md-5 col-lg-4">
        <div class="repositorios-github-conteudo">
          <h5><i class="fas fa-folder"></i><a href="${x.html_url}"> ${x.name}</a></h5>
          <p><b>Descrição: </b>${x.description}
          </p>
          <p><b>Atualizado em ${data.toLocaleDateString()}</b></p>
        </div>
      </div>
    <!--repositórios - fim-->  
    `;
  });
}

window.addEventListener('load', exibirDados);

function pesquisa() {
  let input = document.getElementById("inputPesquisa").value;
  let seletor = document.getElementById("seletorPesquisa").value;

  if (!input) {
      alert("Preencha o campo de pesquisa");
  }
  else {
      window.location = `./pesquisa.html?i=${input}&s=${seletor}`;
  }
}

document.getElementById("botaoPesquisa").addEventListener('click', pesquisa);
