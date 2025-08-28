document.addEventListener('DOMContentLoaded', async () => {
    const formFrequencia = document.getElementById('formFrequencia');
    const mensagemDiv = document.getElementById('mensagem');
    const diasFrequenciaInput = document.getElementById('diasFrequencia');
    const tipoTreinoSelect = document.getElementById('tipoTreino');

    // Inicializa os pontos no banco de dados se eles não existirem
    try {
        let pontosExistentes = await db.pontos.get(1);
        if (!pontosExistentes) {
            await db.pontos.put({ id: 1, valor: 0 });
        }
    } catch (error) {
        mensagemDiv.textContent = 'Erro ao inicializar os pontos. Tente recarregar a página.';
        mensagemDiv.style.display = 'block';
    }

    formFrequencia.addEventListener('submit', async (e) => {
        e.preventDefault();

        const frequencia = Number(diasFrequenciaInput.value);
        const tipoTreino = tipoTreinoSelect.value;
        const dataAtual = new Date().toLocaleDateString('pt-BR');

        let pontosPorDia = 0;
        switch (tipoTreino) {
            case 'braços': pontosPorDia = 10; break;
            case 'pernas': pontosPorDia = 15; break;
            case 'cardio': pontosPorDia = 5; break;
            case 'fullbody': pontosPorDia = 20; break;
            default: pontosPorDia = 10;
        }

        if (frequencia < 1 || frequencia > 31) {
            mensagemDiv.textContent = 'Esse número é inválido! Digite um número entre 1-31.';
            mensagemDiv.style.display = 'block';
        } else {
            try {
                const pontosGanhos = frequencia * pontosPorDia;

                // 1. Salva o evento no histórico de pontos
                await db.historicoPontos.add({
                    data: dataAtual,
                    pontos: pontosGanhos,
                    tipoTreino: tipoTreino
                });

                // 2. Atualiza o saldo total de pontos
                let pontosAtuais = await db.pontos.get(1);
                const novosPontos = pontosAtuais.valor + pontosGanhos;
                await db.pontos.put({ id: 1, valor: novosPontos });

                mensagemDiv.textContent = `Você foi à academia ${frequencia} dias (${tipoTreino}). Você acumulou ${pontosGanhos} pontos e seu saldo total é de ${novosPontos} pontos!`;
                mensagemDiv.style.display = 'block';
            } catch (error) {
                console.error("Erro ao salvar os pontos: ", error);
                mensagemDiv.textContent = 'Erro ao salvar os pontos. Verifique o console do navegador.';
                mensagemDiv.style.display = 'block';
            }
        }
    });
});