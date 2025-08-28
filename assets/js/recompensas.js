document.addEventListener('DOMContentLoaded', async () => {
    const pontosTotalSpan = document.getElementById('pontosTotal');
    const listaRecompensasDiv = document.getElementById('listaRecompensas');
    const mensagemResgateDiv = document.getElementById('mensagemResgate');

    let pontosAcumulados = 0;
    const pontosDoDB = await db.pontos.get(1);
    if (pontosDoDB) {
        pontosAcumulados = pontosDoDB.valor;
    }
    pontosTotalSpan.textContent = pontosAcumulados;

    // A lista de prêmios agora inclui o caminho para a imagem
    const premios = [
        { nome: 'Whey 1kg', custo: 300, imagem: './assets/img/whey.png' },
        { nome: 'Creatina 500g', custo: 300, imagem: './assets/img/creatina500.png' },
        { nome: 'Whey 900g', custo: 260, imagem: './assets/img/whey900.png' },
        { nome: 'Creatina 300g', custo: 235, imagem: './assets/img/creatina300.png' },
        { nome: 'Camiseta Exclusiva', custo: 211, imagem: './assets/img/camiseta.png' },
        { nome: 'Creatina 150g', custo: 198, imagem: './assets/img/creatina150.png' },
        { nome: 'Munhequeira', custo: 150, imagem: './assets/img/munhequeira.png' },
        { nome: 'Strap', custo: 100, imagem: './assets/img/strap.png' }
    ];

    function exibirPremios() {
        listaRecompensasDiv.innerHTML = '';
        premios.forEach((premio) => {
            const item = document.createElement('div');
            item.classList.add('recompensa-item');
            item.innerHTML = `
                <img src="${premio.imagem}" alt="${premio.nome}" class="recompensa-imagem">
                <h3>${premio.nome}</h3>
                <p>Custo: ${premio.custo} Pontos</p>
                <button data-custo="${premio.custo}" data-nome="${premio.nome}" class="btn-resgatar" ${pontosAcumulados < premio.custo ? 'disabled' : ''}>Resgatar</button>
            `;
            listaRecompensasDiv.appendChild(item);
        });
    }

    listaRecompensasDiv.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-resgatar')) {
            const custo = Number(e.target.dataset.custo);
            const nomePremio = e.target.dataset.nome;
            
            if (pontosAcumulados >= custo) {
                pontosAcumulados -= custo;
                await db.pontos.put({ id: 1, valor: pontosAcumulados });
                pontosTotalSpan.textContent = pontosAcumulados;
                
                mensagemResgateDiv.textContent = `Parabéns! Você resgatou ${nomePremio}!`;
                mensagemResgateDiv.style.display = 'block';
                mensagemResgateDiv.style.backgroundColor = '#d4edda';
                mensagemResgateDiv.style.borderColor = '#c3e6cb';

                exibirPremios();
            } else {
                mensagemResgateDiv.textContent = 'Você não tem pontos suficientes para resgatar este prêmio.';
                mensagemResgateDiv.style.display = 'block';
                mensagemResgateDiv.style.backgroundColor = '#f8d7da';
                mensagemResgateDiv.style.borderColor = '#f5c6cb';
            }
        }
    });

    exibirPremios();
});