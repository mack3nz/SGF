// Este arquivo define a base de dados e suas tabelas
const db = new Dexie('FitnessDB');

db.version(1).stores({
    pesos: '++id, peso, data',    // Tabela para o módulo de Evolução
    notas: '++id, titulo, conteudo, data', 
    pontos: 'id, valor',
    historicoPontos: '++id, data, pontos, tipoTreino' 
});

