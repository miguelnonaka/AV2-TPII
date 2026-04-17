import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente";
import CadastroEnderecoTitular from "./cadastroEnderecoTitular";

export default class CadastroClienteTitular extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica
        console.log('Iniciando edição de cliente...')

        let documento = this.entrada.receberTexto('Informe o documento do cliente:')
        let cliente = armazem.Clientes.find(c =>
            c.Documentos.some(doc => doc.Numero === documento)
        )

        if (!cliente) {
            console.log('Cliente não encontrado')
            return
        }else if (cliente.Titular !== undefined){
            console.log('Este Cliente é um dependente')
            return
        }

        console.log(`Cliente encontrado: ${cliente.Nome}`)

        let opcao = this.entrada.receberNumero(
            'O que deseja editar?\n1 - Nome\n2 - Nome Social\n3 - Data de Nascimento\n4 - Endereço\n5 - Documentos\n0 - Sair'
        )
        while (opcao !== 0) {
            switch (opcao) {
                case 1:
                    let nome = this.entrada.receberTexto('Novo nome:')
                    cliente.Nome = nome
                    console.log('Nome atualizado')
                    break

                case 2:
                    let nomeSocial = this.entrada.receberTexto('Novo nome social:')
                    cliente.NomeSocial = nomeSocial
                    console.log('Nome social atualizado')
                    break

                case 3:
                    let dataNascimento = this.entrada.receberData('Nova data de nascimento:')
                    cliente.DataNascimento = dataNascimento
                    console.log('Data de nascimento atualizada')
                    break

                case 4:
                    this.processo = new CadastroEnderecoTitular(cliente)
                    this.processo.processar()
                    break

                case 5:
                    this.processo = new CadastrarDocumentosCliente(cliente)
                    this.processo.processar()
                    break

                default:
                    console.log('Opção inválida')
            }

            opcao = this.entrada.receberNumero(
                'Deseja editar mais algo?\n1 - Nome\n2 - Nome Social\n3 - Data de Nascimento\n4 - Endereço\n5 - Documentos\n0 - Sair'
            )
        }

        console.log('Finalizando edição do cliente...')
    }
}