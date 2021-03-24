var projects = [
    {
        title: 'Nexus League',
        description: 'Fantasy Game do Campeonato Brasileiro de League of Legends, desenvolvido usando NuxtJS',
        href: 'https://nexusleague.com.br/',
        url: './assets/nexus.png'
    },
    {
        title: 'App Vida',
        description: 'Aplicativo para ajudar o usuário a ter um maior controle emocional, desenvolvido usando Ionic e Laravel',
        href: 'https://play.google.com/store/apps/details?id=com.ejcm.vida',
        url: './assets/vida.png'
    },
    {
        title: 'Uniperiferias',
        description: 'Rede social de formação e produção de conhecimentos em territórios periféricos, desenvolvida usando Angular e Laravel.',
        href: 'https://uniperiferias.org/',
        url: './assets/uniperiferias.png'
    },
    {
        title: 'Snake Game',
        description: 'O clássico jogo da cobrinha desenvolvido usando PhaserJS.',
        href: 'snake_game/',
        url: './snake_game/assets/imgs/snake-game.png'
    },
    {
        title: 'Compressor de Imagens',
        description: 'Aplicação de compressão de matrizes com SVD em Python.',
        href: 'https://colab.research.google.com/drive/1DEJ1F_v4IW3CQnkYZsCviiEdQxBIELi6',
        url: './assets/compression.png'
    },
    {
        title: 'To do List',
        description: 'Lista de tarefas usando HTML, CSS e JS.',
        href: 'to-do-list/',
        url: './to-do-list/assets/imgs/to_do_list.png'
    },
    {
        title: 'Landing Page',
        description: 'Parte inicial de uma landing page usando HTML e CSS.',
        href: 'landing_page/',
        url: './landing_page/assets/landing_page.png'
    }
]

function renderProjects() {
    projectsTag = document.getElementsByClassName('projects')[0]
    titles = document.getElementsByClassName('title')
    for(project of this.projects) {
        projectsTag.insertAdjacentHTML('beforeend', `
        <a href="${project.href}" target="_blank">
            <div class="card-parent">
                <div class="text">
                    <p class="title">${project.title}</p>
                    <span class="subtitle">${project.description}</span>
                </div>
                <div class="card-background" style="background-image: url(${project.url});"></div>
            </div>
        </a>
        `)
    }
    console.log(titles);
}

renderProjects();
