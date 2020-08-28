import './commands'
import 'cypress-file-upload'


// Para ignorar erros do site que estamos testando:
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})