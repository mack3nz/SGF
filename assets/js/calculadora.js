// Captura o formulário e o elemento de resultado
const form = document.getElementById('formTMB');
const resultadoDiv = document.getElementById('resultado');

// Adiciona um "ouvinte" para o evento de envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede que a página recarregue ao enviar o formulário

    // 1. Capturar os valores do formulário
    const idade = Number(document.getElementById('idade').value);
    const altura = Number(document.getElementById('altura').value);
    const peso = Number(document.getElementById('peso').value);
    const sexo = document.querySelector('input[name="genero"]:checked').value;
    const atividade = document.getElementById('atividade').value;

    // 2. Realizar os cálculos de TMB (mantendo sua lógica original)
    let tmb;
    if (sexo === "homem") {
        tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
    } else { // mulher
        tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
    }

    let tmbAtiva, tmbRegular, tmbNula;

    if (sexo === "homem") {
        tmbAtiva = tmb + 974.56;
        tmbRegular = tmb + 757.99;
        tmbNula = tmb + 600;
    } else { // mulher
        tmbAtiva = tmb + 721.16;
        tmbRegular = tmb + 540.87;
        tmbNula = tmb + 360.58;
    }

    // 3. Determinar a TMB final e os macros com base na atividade
    let tmbFinal;
    let proteinas;
    let carboidratos;
    let gorduras;

    if (atividade === "ativa") {
        tmbFinal = tmbAtiva;
        proteinas = peso * 2.6;
        carboidratos = peso * 1.5;
        gorduras = peso * 0.98;
    } else if (atividade === "regular") {
        tmbFinal = tmbRegular;
        proteinas = peso * 1.6;
        carboidratos = peso * 0.75;
        gorduras = peso * 0.57;
    } else { // nula
        tmbFinal = tmbNula;
        proteinas = peso * 0.8;
        carboidratos = peso * 0.37;
        gorduras = peso * 0.32;
    }

    // 4. Exibir o resultado na página, incluindo a TMB final e os macros
    resultadoDiv.innerHTML = `
        <h3>Seus Resultados:</h3>
        <p>Sua TMB basal é de <strong>${tmb.toFixed(2)}</strong> Kcal.</p>
        <p>Sua necessidade calórica diária, considerando sua atividade (${atividade}), é de <strong>${tmbFinal.toFixed(2)}</strong> Kcal.</p>
        
        <div class="macros">
            <h4>Macros diários recomendados:</h4>
            <ul>
                <li>Proteína: <strong>${proteinas.toFixed(2)}</strong> g</li>
                <li>Carboidratos: <strong>${carboidratos.toFixed(2)}</strong> g</li>
                <li>Gorduras: <strong>${gorduras.toFixed(2)}</strong> g</li>
            </ul>
        </div>
    `;
});
