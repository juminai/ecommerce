const camposForm = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]')
const campoCidade = document.querySelector('#cidade')
const campoBairro = document.querySelector('#bairro')
const campoEndereco = document.querySelector('#endereco')

camposForm.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    cep: {
        valueMissing: "O campo de cep não pode estar vazio.",
        patternMismatch: "Por favor, preencha um cep válido.",
        tooShort: "Por favor, preencha um cep válido."
    },
    endereco: {
        valueMissing: "O campo de endereco não pode estar vazio.",
        patternMismatch: "Por favor, preencha um endereco válido.",
        tooShort: "Por favor, preencha um endereco válido."
    },
    cidade: {
        valueMissing: "O campo de cidade não pode estar vazio.",
        patternMismatch: "Por favor, preencha um cidade válido.",
        tooShort: "Por favor, preencha um cidade válido."
    },
    bairro: {
        valueMissing: "O campo de bairro não pode estar vazio.",
        patternMismatch: "Por favor, preencha um bairro válido.",
        tooShort: "Por favor, preencha um bairro válido."
    }
}

function verificaCampo(campo) {
    let mensagem = ''

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')
    const validarInput = campo.checkValidity()

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
        }
    })

    if (!validarInput) {
        mensagemErro.textContent = mensagem
    } else {
        mensagemErro.textContent = ""

        if (campo.name == 'cep') {
            campo.addEventListener('focusout', async () => {
                const cepInformado = campo.value

                if (cepInformado.includes('-')) {
                    cepInformado.replace('-', '')
                }

                const response = await fetch(`https://viacep.com.br/ws/${campo.value}/json/`)
                const responseJson = await response.json()
                
                campoCidade.value = responseJson.localidade
                campoBairro.value = responseJson.bairro
                campoEndereco.value = responseJson.logradouro
                
            }) 
        }
    }
}