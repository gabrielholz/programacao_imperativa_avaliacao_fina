const fs = require('fs');

const alunosDados = fs.readFileSync('./alunos.csv', 'utf8');


function AlunoConstruct(nome, qtd_faltas, notas) {
  return {
    nome: nome,
    qtd_faltas: qtd_faltas,
    notas: notas,
    calcularMedia() {
      let somaNotas = 0;
      for (i in this.notas) {
        somaNotas += this.notas[i]
      }
      return (somaNotas / this.notas.length).toFixed(2);

    },
    faltas() {
      this.qtd_faltas++
      return this.qtd_faltas;
    }

  };
}


let listaAlunos = []

let linhas = alunosDados.split("\r\n");
for (let i = 1; i < linhas.length; i++) {
  const linha = linhas[i];
  let dados = linha.split(";");
  let notasString = dados[2].replace('[', '').replace(']', '').split(",");
  let notasNumber = []
  for (j in notasString) {
    notasNumber.push(parseFloat(notasString[j]))
  }
  const aluno = dados[0];
  const qtd_faltas = dados[1];

  let novoAluno = new AlunoConstruct(aluno, qtd_faltas, notasNumber)
  listaAlunos.push(novoAluno);


}

let curso = {

  nomeDoCurso: 'Certified Tech Developer',
  notaDeAprovacao: 7.5,//+10% = 8.25
  faltasMaximas: 3,
  listaDeEstudantes: listaAlunos,

  cadastrarAluno(aluno, qtd_faltas, notas) {
    let novoAluno = new AlunoConstruct(aluno, qtd_faltas, notas)
    this.listaDeEstudantes.push(novoAluno);
  },

  verificarAprovacao(aluno) {
    for (let i in this.listaDeEstudantes) {
      const estudante = this.listaDeEstudantes[i];
      if (estudante.nome === aluno) {

        const notaMediaAluno = estudante.calcularMedia()

        if (notaMediaAluno >= this.notaDeAprovacao) {
          if (estudante.qtd_faltas < this.faltasMaximas) {
            return true;
          } else if (estudante.qtd_faltas == this.faltasMaximas) {
            if (notaMediaAluno >= (this.notaDeAprovacao * 1.1)) return true;
            else return false;
          }
        }
        else return false;
      }
    }

  },

  verificarAprovacaoEmMassa() {
    for (i in this.listaDeEstudantes) {
      const estudante = this.listaDeEstudantes[i]
      const notaMedia = this.listaDeEstudantes[i].calcularMedia()
      if (this.verificarAprovacao(estudante.nome)) console.log(`
    
      | Estudante: ${estudante.nome}
      | Notas: ${notaMedia} 
      | Faltas: ${estudante.qtd_faltas} 
      | Situação: Aprovado
      _____________________________________`);
      else console.log(`
      | Estudante: ${estudante.nome} 
      | Notas: ${notaMedia}  
      | Faltas: ${estudante.qtd_faltas}  
      | Situação: Reprovado
      -------------------------------------`);
    }
  }


}



console.log(listaAlunos[0])
console.log(`Adicionando falta... Faltas aluno ${listaAlunos[0].nome}:  ${listaAlunos[0].faltas()}`)
console.log(`Calculando media... Media aluno ${listaAlunos[0].nome}: ${listaAlunos[0].calcularMedia()}`)
curso.cadastrarAluno('Gabriela', 1, [8, 10, 8.5, 9, 7])
curso.verificarAprovacaoEmMassa()



