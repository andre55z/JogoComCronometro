

class Botoes{
    constructor()
    {
        this.time = null;
        this.timemil =  null;
        this.nomeDaVez = [];
        this.soma = 0;
        this.somas = 0;
        this.somasec = [];
        this.somamil = [];
        this.counting = 0;
        this.flagCnt = 0;
        this.nameNow;
    }
    bckGreenbt ()
    {
        document.getElementById('btiniciar').style.backgroundColor = 'lime';
        document.getElementById('btparar').style.backgroundColor = '#ebb92b';
    }

    startCount(){

        if (this.flagCnt===0){
            this.time = setInterval(() => {
                var cronometro = document.getElementById('numeros').innerHTML;
                this.soma = parseInt(cronometro) + 1;
                document.getElementById('numeros').innerHTML = this.soma;
                this.flagCnt = 1;
            }, 1000);
        }
        if (this.flagCnt===0){
            this.timemil = setInterval(() => {
                var cronom = document.getElementById('Milis').innerHTML;
                this.somas = parseInt(cronom) + 1;
                if (this.somas === 100)
                {
                    this.somas = 0;
                }
                document.getElementById('Milis').innerHTML = this.somas;
                this.flagCnt = 1;
            }, 100);
        }
    }



    bckRedbt ()
    {
        document.getElementById('btparar').style.backgroundColor = 'red';
        document.getElementById('btiniciar').style.backgroundColor = '#ebb92b';
    }

    stopCount()
    {
        var  flag4List=0
        clearInterval(this.time);
        this.time = null;
        clearInterval(this.timemil);
        this.timemil = null;
        if (document.getElementById('slcPart').value !== ''){
            this.somasec[this.counting] = this.soma;
            this.somamil[this.counting] = this.somas;
            this.nameNow =  this.somasec[this.counting] + '.' + this.somamil[this.counting] + ' - ' + document.getElementById('slcPart').value;
            for (let o=0; o<this.nomeDaVez.length; o++)
                {
                    if (this.nomeDaVez[o]===this.nameNow)
                        {
                            flag4List = 1;
                        }
                }
            if (flag4List==0){

                this.nomeDaVez[this.counting] = this.nameNow;
                this.nomeDaVez.sort(function(a, b) {
                    const tempoA = parseFloat(a.split(' - ')[0]);
                    const tempoB = parseFloat(b.split(' - ')[0]);
                    return tempoA - tempoB;
                });
                const listaComMedalhas = this.nomeDaVez.map((item, index) => {
                    if (index === 0) return `<p class="lista-item">${item} 🥇</p>`;
                    if (index === 1) return `<p class="lista-item">${item} 🥈</p>`;
                    if (index === 2) return `<p class="lista-item">${item} 🥉</p>`;
                    return `<p class="lista-item">${item}</p>`;
                });
                document.getElementById('lista').innerHTML = listaComMedalhas.join('');
                this.counting++;
            }
        }
    }


    resetCount()
    {
        this.soma = 0;
        this.somas = 0;
        document.getElementById('Milis').innerHTML = this.somas;
        document.getElementById('numeros').innerHTML = this.soma;
        this.flagCnt = 0;
    }
    reinicializaLista()
    {
        if (this.counting === 0)
            {
                alert('Lista Vazia!');
            }
        else
        {
            location.reload();
        }
    }
}

class Lista{
    constructor()
    {
        this.cont = 0;
        this.nomesUsuados = [];
        this.cnt = 0;
    }
    listName()
    {
        var nomeEmTese = document.getElementById('inpt').value;
        for(var i =0; i<this.nomesUsuados.length; i++)
            {
                if(nomeEmTese === this.nomesUsuados[i])
                    {
                        alert('Nome já adicionado!');
                        this.cnt = 1;
                    }
            }
        if (this.cnt!==1){    
            if (this.cont===0)
                {

                    const select = document.getElementById('slcPart');
                    const option = document.createElement('option');
                    option.value = nomeEmTese;
                    option.textContent = nomeEmTese;
                    select.appendChild(option);
                    this.nomesUsuados[this.cont] = nomeEmTese;
                    this.cont++;
                }
            else
            {

            const select = document.getElementById('slcPart');
            const option = document.createElement('option');
            option.value = nomeEmTese;
            option.textContent = nomeEmTese;
            select.appendChild(option);
            this.nomesUsuados[this.cont] = nomeEmTese;
            this.cont++;
            }
        }
        this.cnt = 0;
    }

}

const botao = new Botoes();


const listaDeNomes = new Lista();

document.getElementById('btiniciar').addEventListener('mouseover', ()=>{
    botao.bckGreenbt();
});

document.getElementById('btiniciar').addEventListener('click', ()=>{
    botao.startCount();
});

document.getElementById('btparar').addEventListener('mouseover', ()=>{
    botao.bckRedbt();
});

document.getElementById('btparar').addEventListener('click', ()=>{
    botao.stopCount();
});

document.getElementById('btreset').addEventListener('click', ()=>{
    botao.resetCount();
})
document.getElementById('btreinicializarLista').addEventListener('click', ()=>{
    botao.reinicializaLista();
})
let flagCnt4Chk=0;
let Names = [];
let counting4Check = 0;
document.getElementById('inpt').addEventListener('blur', ()=> {
            counting4Check = 0
            for (let v=0; v<Names.length; v++)
            {
                if (Names[v] === document.getElementById('inpt').value)
                {
                    alert('Nome já presente na lista!');
                    flagCnt4Chk = 1;
                    break;
                }
            }
            if(flagCnt4Chk===0)
                {
                    Names[counting4Check] = document.getElementById('inpt').value;
                    listaDeNomes.listName();
                    counting4Check++;
                }
    }
);

