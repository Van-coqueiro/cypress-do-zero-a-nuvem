describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Vanessa')
    cy.get('#lastName').type('Coqueiro')
    cy.get('#email').type('vns.fsilva@gmail.com')
    cy.get('#open-text-area').type('fazendo meu primeiro teste de preenchimento de campos e envio de formulario', { delay: 0 })
    cy.contains('button', 'Enviar').click()

    //Resultado esperado
    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Vanessa')
    cy.get('#lastName').type('Coqueiro')
    cy.get('#email').type('vns.fsilva@gmail,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
  cy.get('#phone')
    .type('van')
    .should('have.value', '')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Vanessa')
    cy.get('#lastName').type('Coqueiro')
    cy.get('#email').type('vns.fsilva@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Vanessa')
      .should('have.value', 'Vanessa')
      .clear()
    cy.get('#lastName')
      .type('Coqueiro')
      .should('have.value', 'Coqueiro')
      .clear()
    cy.get('#email')
      .type('vns.fsilva@gmail.com')
      .should('have.value', 'vns.fsilva@gmail.com')
      .clear()
    cy.get('#phone')
      .type('988245562')
      .should('have.value', '988245562')
      .clear()
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
})

