(function(){
  'use strict';
  var KEY='viveo_termos_equipamentos_v2';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return []}}
  function save(rows){localStorage.setItem(KEY,JSON.stringify(rows))}
  function add(item){var rows=load();rows.unshift(item);save(rows);return rows}
  function clear(){localStorage.removeItem(KEY)}
  function csvEscape(v){return '"'+String(v==null?'':v).replace(/"/g,'""')+'"'}
  function downloadCsv(){var rows=load();if(!rows.length)throw new Error('Nenhum registro para exportar.');var keys=['id','dataHora','Num_incident','Colab_nome','Colab_email','Equip_marca','Equip_modelo','Equip_serial','Equip_hostname','Equip_patrimonio','Colab_cargo','Colab_area','Colab_local','Colab_custo','Colab_gestor','Ass_data'];var lines=[keys.join(';')];rows.forEach(function(r){lines.push(keys.map(function(k){return csvEscape(r[k])}).join(';'))});var blob=new Blob(['\ufeff'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'});var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='historico_termos.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url)},1000)}
  window.TermStorage={load:load,add:add,clear:clear,downloadCsv:downloadCsv};
})();
