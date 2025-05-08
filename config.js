// Configurações do site
const configuracoes = {
    nomeBarbearia: "BARBER STUDIO",
    telefone: "+55 (94) 98555-43215",
    email: "contato@barberstudio.com.br",
    endereco: "Av. Paulista, 1000 - São Paulo, SP",
    horarioSemana: "Segunda a Sexta: 9h às 20h",
    horarioSabado: "Sábados: 9h às 18h"
};

// Função para atualizar configurações
function atualizarConfiguracoes(novasConfiguracoes) {
    // Atualiza apenas os campos que foram enviados
    for (let chave in novasConfiguracoes) {
        if (configuracoes.hasOwnProperty(chave)) {
            configuracoes[chave] = novasConfiguracoes[chave];
        }
    }
    
    // Atualiza os elementos na página
    atualizarPagina();
}

// Função para atualizar os elementos da página
function atualizarPagina() {
    // Atualiza elementos com base nas configurações
    document.querySelector('.logo').textContent = configuracoes.nomeBarbearia;
    
    // Atualiza informações de contato
    const elementosTelefone = document.querySelectorAll('.telefone');
    elementosTelefone.forEach(elemento => {
        elemento.textContent = configuracoes.telefone;
    });

    const elementosEmail = document.querySelectorAll('.email');
    elementosEmail.forEach(elemento => {
        elemento.textContent = configuracoes.email;
    });

    const elementosEndereco = document.querySelectorAll('.endereco');
    elementosEndereco.forEach(elemento => {
        elemento.textContent = configuracoes.endereco;
    });

    const elementosHorarioSemana = document.querySelectorAll('.horario-semana');
    elementosHorarioSemana.forEach(elemento => {
        elemento.textContent = configuracoes.horarioSemana;
    });

    const elementosHorarioSabado = document.querySelectorAll('.horario-sabado');
    elementosHorarioSabado.forEach(elemento => {
        elemento.textContent = configuracoes.horarioSabado;
    });
}

// Exporta as funções para uso em outros arquivos
export { configuracoes, atualizarConfiguracoes };