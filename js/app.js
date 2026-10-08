(function(){
'use strict';
var form=document.getElementById('contractForm'),tbody=document.getElementById('history'),status=document.getElementById('status');
function msg(t){status.textContent=t;status.style.display='block'}
function render(){var rows=window.TermStorage.load();tbody.innerHTML='';if(!rows.length){tbody.innerHTML='<tr><td colspan="7">Nenhum registro local.</td></tr>';return}rows.forEach(function(r){var tr=document.createElement('tr');tr.innerHTML='<td>'+r.id+'</td><td>'+r.dataHora+'</td><td>'+r.Num_incident+'</td><td>'+r.Colab_nome+'</td><td>'+r.Equip_hostname+'</td><td>'+r.Equip_patrimonio+'</td><td><button class="smallbtn" data-id="'+r.id+'">Reabrir</button></td>';tbody.appendChild(tr)})}
form.addEventListener('submit',function(ev){ev.preventDefault();try{if(!form.reportValidity())return;var rows=window.TermStorage.load(),f=window.TermContract.normalize(form),reg=window.TermContract.makeId(rows),record=Object.assign({id:reg,dataHora:new Date().toLocaleString('pt-BR')},f);window.TermStorage.add(record);render();window.TermContract.open(f,reg,true);msg(reg+' registrado. Na janela de impressão escolha “Salvar como PDF”.');form.reset()}catch(e){msg('Erro: '+e.message)}});
document.getElementById('exportLog').addEventListener('click',function(){try{window.TermStorage.downloadCsv();msg('Histórico CSV exportado.')}catch(e){msg(e.message)}});
document.getElementById('clearLog').addEventListener('click',function(){if(confirm('Deseja apagar o histórico local?')){window.TermStorage.clear();render();msg('Histórico apagado.')}});
tbody.addEventListener('click',function(ev){if(ev.target.tagName!=='BUTTON')return;var r=window.TermStorage.load().find(function(x){return x.id===ev.target.getAttribute('data-id')});if(r)try{window.TermContract.open(r,r.id,false)}catch(e){msg(e.message)}});
render();
})();
