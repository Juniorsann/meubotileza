// script.js

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('evaluationForm');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const fieldsets = document.querySelectorAll('fieldset');
    let currentFieldset = 0;

    function showFieldset(index) {
        fieldsets.forEach((fieldset, i) => {
            fieldset.classList.toggle('active', i === index);
        });
    }

    nextBtn.addEventListener('click', () => {
        if (currentFieldset < fieldsets.length - 1) {
            currentFieldset++;
            showFieldset(currentFieldset);
            if (currentFieldset === fieldsets.length - 1) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            }
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const nomeCompleto = data['nomeCompleto'];
        const praca = data['praca'];

        const acolhaScore = [1, 2, 3, 4].reduce((sum, i) => sum + parseInt(data[`acolha${i}`]), 0);
        const personalizeScore = [1, 2, 3, 4].reduce((sum, i) => sum + parseInt(data[`personalize${i}`]), 0);
        const potencializeScore = [1, 2, 3, 4].reduce((sum, i) => sum + parseInt(data[`potencialize${i}`]), 0);
        const encanteScore = [1, 2, 3, 4].reduce((sum, i) => sum + parseInt(data[`encante${i}`]), 0);

        const totalScores = { Acolher: acolhaScore, Personalize: personalizeScore, Potencialize: potencializeScore, Encante: encanteScore };
        const maxScoreProfile = Object.keys(totalScores).reduce((a, b) => totalScores[a] > totalScores[b] ? a : b);

        const summaryResponse = {
            nomeCompleto,
            praca,
            perfil: maxScoreProfile,
            textoPersonalizado: getTextByProfile(maxScoreProfile)
        };

        // Aqui você pode usar o resultado para gerar o PDF ou qualquer outra ação
        console.log(summaryResponse);

        // Redirecionar para a página de resumo com as informações
        localStorage.setItem('summaryResponse', JSON.stringify(summaryResponse));
        window.location.href = 'summary.html';
    });

    function getTextByProfile(profile) {
        const texts = {
            Acolher: "Parabéns! Você demonstrou um grande talento em acolher os clientes, criando conexões significativas e entendendo suas necessidades. Seu sorriso e abordagem amigável fazem toda a diferença na experiência do cliente, e sua habilidade em identificar os motivos da visita e usar o CPF do cliente para personalizar o atendimento é admirável. Continue a usar essas técnicas para fortalecer ainda mais a relação com seus clientes. Você é uma peça fundamental para garantir que cada cliente se sinta bem-vindo e compreendido.",
            Personalize: "Incrível! Sua capacidade de personalizar a experiência do cliente é excepcional. Você demonstra um conhecimento profundo dos produtos e utiliza técnicas de storytelling de forma eficaz, além de sempre consultar o histórico de compras para oferecer opções únicas e personalizadas. Sua abordagem ao convidar os clientes a experimentar os produtos e a conexão que você cria com eles é notável. Continue a aprimorar essas habilidades para proporcionar experiências únicas e memoráveis a cada cliente.",
            Potencialize: "Fantástico! Você tem um talento natural para potencializar as vendas, oferecendo benefícios adicionais e aumentando o valor dos pedidos. Seu conhecimento do histórico de compras do cliente e a apresentação de promoções personalizadas mostram seu compromisso em oferecer o melhor. Sua capacidade de inspirar os clientes a comprarem mais e a maneira detalhada como você explica os benefícios adicionais são impressionantes. Continue a explorar essas habilidades para maximizar as oportunidades de venda e agregar valor para os clientes.",
            Encante: "Maravilhoso! Você sabe como encantar os clientes, garantindo que cada interação termine de maneira memorável. Seu hábito de finalizar o atendimento com gentileza, celebrar a escolha do cliente e incluir toques especiais, como borrifar fragrâncias nas sacolas, faz toda a diferença. Sua menção ao programa de reciclagem Boti Recicla demonstra seu compromisso com a sustentabilidade. Continue a encantar os clientes com essas práticas, criando experiências únicas que farão com que eles voltem sempre."
        };
        return texts[profile] || "Perfil não encontrado";
    }
});



























