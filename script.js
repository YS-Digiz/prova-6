let carte = [];
        let prima = -1;
        let tentativi = 0;
        let trovate = 0;
        let bloccato = false;
        
        const parole = ['CANE','GATTO','LEONE','TIGRE','ORSO','LUPO','VOLPE','CONIGLIO','MELA','PERA','UVA','BANANA','KIWI','ARANCIA','LIMONE','FRAGOLA','CILIEGIA','ANANAS'];

        function mescola(array) {
            let mix = [];
            let temp = array.slice();
            while (temp.length > 0) {
                let pos = Math.floor(Math.random() * temp.length);
                mix.push(temp[pos]);
                temp.splice(pos, 1);
            }
            return mix;
        }

        function start() {
            let n = parseInt(document.getElementById('diff').value);
            let tot = (n * n) / 2;
            
            carte = [];
            for (let i = 0; i < tot; i++) {
                carte.push(parole[i]);
                carte.push(parole[i]);
            }
            carte = mescola(carte);
            
            tentativi = 0;
            trovate = 0;
            prima = -1;
            bloccato = false;
            document.getElementById('tentativi').textContent = tentativi;
            document.getElementById('contatore').style.display = 'block';
            
            let griglia = document.getElementById('griglia');
            if (n === 2) griglia.className = 'facile';
            if (n === 4) griglia.className = 'medio';
            if (n === 6) griglia.className = 'difficile';
            griglia.innerHTML = '';
            
            for (let i = 0; i < carte.length; i++) {
                let btn = document.createElement('button');
                btn.className = 'carta';
                btn.id = 'b' + i;
                btn.textContent = '?';
                btn.onclick = function() { gira(i); };
                griglia.appendChild(btn);
            }
        }

        function gira(i) {
            if (bloccato) return;
            let btn = document.getElementById('b' + i);
            if (btn.disabled) return;
            if (i === prima) return;
            
            btn.textContent = carte[i];
            
            if (prima === -1) {
                prima = i;
            } else {
                bloccato = true;
                tentativi++;
                document.getElementById('tentativi').textContent = tentativi;
                
                let b0 = document.getElementById('b' + prima);
                let b1 = document.getElementById('b' + i);
                
                if (carte[prima] === carte[i]) {
                    b0.disabled = true;
                    b1.disabled = true;
                    trovate = trovate + 2;
                    prima = -1;
                    bloccato = false;
                    
                    if (trovate === carte.length) {
                        alert('Hai vinto con ' + tentativi + ' tentativi!');
                        document.getElementById('btnStart').disabled = false;
                    }
                } else {
                    setTimeout(function() {
                        b0.textContent = '?';
                        b1.textContent = '?';
                        prima = -1;
                        bloccato = false;
                    }, 800);
                }
            }
        }