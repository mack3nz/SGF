document.addEventListener('DOMContentLoaded', () => {
    const formNotas = document.getElementById('formNotas');
    const tituloInput = document.getElementById('tituloNota');
    const conteudoInput = document.getElementById('conteudoNota');
    const listaNotas = document.getElementById('listaNotas');
    const mensagemNotaDiv = document.getElementById('mensagemNota');

    // Função para exibir as notas na lista
    const exibirNotas = async () => {
        const todasAsNotas = await db.notas.reverse().toArray();
        listaNotas.innerHTML = ''; // Limpa a lista antes de adicionar as notas

        if (todasAsNotas.length === 0) {
            listaNotas.innerHTML = '<li>Nenhuma anotação ainda.</li>';
        } else {
            todasAsNotas.forEach(nota => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${nota.titulo}</strong>
                    <br>
                    <small>${nota.data}</small>
                    <p>${nota.conteudo}</p>
                `;
                listaNotas.appendChild(li);
            });
        }
    };

    // Salvar uma nova nota
    formNotas.addEventListener('submit', async (e) => {
        e.preventDefault();

        const titulo = tituloInput.value;
        const conteudo = conteudoInput.value;
        const data = new Date().toLocaleDateString('pt-BR');

        await db.notas.add({
            titulo: titulo,
            conteudo: conteudo,
            data: data
        });

        // Limpa os campos do formulário
        tituloInput.value = '';
        conteudoInput.value = '';

        // Exibe a mensagem de sucesso e atualiza a lista de notas
        mensagemNotaDiv.textContent = 'Anotação salva com sucesso!';
        mensagemNotaDiv.style.display = 'block';

        exibirNotas();

        setTimeout(() => {
            mensagemNotaDiv.style.display = 'none';
        }, 3000);
    });

    // Chama a função para exibir as notas quando a página carregar
    exibirNotas();
});