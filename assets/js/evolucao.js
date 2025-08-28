// Cria a instância do banco de dados

document.addEventListener('DOMContentLoaded', () => {
    const formPeso = document.getElementById('formPeso');
    const pesoInput = document.getElementById('pesoInput');
    const historicoList = document.getElementById('historicoPeso');

    // Função para renderizar o histórico na página
    const renderizarHistorico = async () => {
        historicoList.innerHTML = '';
        const historicoPeso = await db.pesos.reverse().toArray();

        if (historicoPeso.length === 0) {
            historicoList.innerHTML = '<li>Nenhum registro de peso ainda.</li>';
        } else {
            historicoPeso.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.data} - ${item.peso} kg`;
                historicoList.appendChild(li);
            });
        }
    };

    // Salvar novo peso quando o formulário for enviado
    formPeso.addEventListener('submit', async (e) => {
        e.preventDefault();
        const novoPeso = Number(pesoInput.value);
        if (novoPeso > 0) {
            const dataAtual = new Date().toLocaleDateString('pt-BR');
            await db.pesos.add({
                peso: novoPeso,
                data: dataAtual
            });
            pesoInput.value = ''; // Limpa o campo de input
            renderizarHistorico(); // Atualiza a lista na tela
        }
    });

    // Renderizar o histórico inicial
    renderizarHistorico();
});