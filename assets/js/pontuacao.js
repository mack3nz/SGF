document.addEventListener('DOMContentLoaded', async () => {
    const pontosTotalSpan = document.getElementById('pontosTotal');
    const historicoGanhosList = document.getElementById('historicoGanhos');

    try {
        // Busca e exibe o total de pontos
        const pontosDoDB = await db.pontos.get(1);
        if (pontosDoDB && pontosDoDB.valor !== undefined) {
            pontosTotalSpan.textContent = pontosDoDB.valor;
        } else {
            pontosTotalSpan.textContent = 0;
        }

        // Busca e exibe o histórico de ganhos
        const historico = await db.historicoPontos.reverse().toArray();
        if (historico.length > 0) {
            historico.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>+${item.pontos} pontos</strong>
                    <br>
                    <small>${item.data} - Treino de ${item.tipoTreino}</small>
                `;
                historicoGanhosList.appendChild(li);
            });
        } else {
            historicoGanhosList.innerHTML = '<li>Nenhum ponto registrado ainda.</li>';
        }
    } catch (error) {
        console.error("Erro ao carregar os dados: ", error);
        pontosTotalSpan.textContent = 'Erro';
    }
});