(function () {
  'use strict';

  var months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function val(f, keys) {
    for (var i = 0; i < keys.length; i++) {
      if (f[keys[i]] != null && String(f[keys[i]]).trim() !== '') return esc(f[keys[i]]);
    }
    return '';
  }

  function makeId(rows) {
    var d = new Date();
    var stamp = '' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0');
    var prefix = 'DOC-' + stamp + '-';
    rows = Array.isArray(rows) ? rows : [];
    var n = rows.filter(function (x) { return x && x.id && x.id.indexOf(prefix) === 0; }).length + 1;
    return prefix + String(n).padStart(4, '0');
  }

  function normalize(form) {
    var fd = new FormData(form), f = {};
    fd.forEach(function (v, k) { f[k] = String(v).trim(); });
    if (f.Ass_data) {
      var d = new Date(f.Ass_data + 'T12:00:00');
      if (isNaN(d.getTime())) throw new Error('Informe uma data válida.');
      f.Ass_dia = String(d.getDate()).padStart(2, '0');
      f.Ass_mes = months[d.getMonth()];
      f.Ass_ano = String(d.getFullYear());
    }
    return f;
  }

  function html(f, reg) {
    var numero = val(f, ['Num_incident']) || esc(reg || '');
    var tipo = val(f, ['Equip_tipo']) || 'Notebook';
    var marca = val(f, ['Equip_marca']);
    var modelo = val(f, ['Equip_modelo']);
    var serial = val(f, ['Equip_serial']);
    var estado = val(f, ['Equip_estado']) || 'Novo';
    var demais = val(f, ['Equip_descricao','Equip_hostname','Equip_patrimonio']);
    var acessorios = val(f, ['Equip_acessorios']) || 'FONTE DE ALIMENTAÇÃO';
    var linha = val(f, ['Equip_linha','Num_linha']);
    var nome = val(f, ['Colab_nome']);
    var cargo = val(f, ['Colab_cargo']);
    var area = val(f, ['Colab_area']);
    var custo = val(f, ['Colab_custo']);
    var gestor = val(f, ['Colab_gestor']);
    var local = val(f, ['Colab_local']);
    var usuario = val(f, ['Colab_usuario','Colab_email']);
    var dia = val(f, ['Ass_dia']);
    var mes = val(f, ['Ass_mes']);
    var ano = val(f, ['Ass_ano']);

    return '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">' +
      '<title>TERMO DE RESPONSABILIDADE - ' + nome + '</title>' +
      '<style>' +
      '@page{size:A4;margin:14mm 15mm 20mm 15mm}' +
      '*{box-sizing:border-box}' +
      'html,body{margin:0;padding:0;background:#fff;color:#000}' +
      'body{font-family:Arial,Helvetica,sans-serif;font-size:9.5pt;line-height:1.22}' +
      '.page{width:100%}.header{height:23mm;display:flex;align-items:center;justify-content:center;border-bottom:1px solid #ddd;margin-bottom:5mm}' +
      '.logo{font-weight:bold;font-size:20pt;letter-spacing:-1px;color:#5f6871}.title{text-align:center;font-weight:bold;font-size:10pt;margin:0 0 5mm}.incident{font-weight:bold;color:red}' +
      'p{margin:0 0 3.2mm;text-align:justify}.section{font-weight:bold;margin:3.5mm 0 2mm}' +
      'ul{margin:0 0 3mm 5mm;padding-left:4mm}li{margin:0 0 1.7mm;text-align:justify}' +
      '.equip-title{font-weight:bold;text-align:center;margin:3mm 0 2mm}' +
      '.employee-title{font-weight:bold;text-align:center;margin:3mm 0 2mm}' +
      '.signature-intro{margin-top:6mm}.date-line{text-align:center;margin-top:5mm}' +
      '.sig{margin:13mm auto 0;width:72%;border-top:1px solid #000;text-align:center;padding-top:1.5mm;font-weight:bold}' +
      '.page-no{position:fixed;right:15mm;bottom:3mm;font-size:8pt}' +
      '@media print{.no-print{display:none!important}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}' +
      '</style></head><body>' +
      '<div class="page"><div class="header"><div class="logo">VIVEO</div></div>' +
      '<div class="title">TERMO DE RESPONSABILIDADE DE USO DE EQUIPAMENTOS DE TI</div>' +
      '<div class="title"><h1 class="incident"> Nº ' + numero +'</h1>'+
      '<p>A CM Hospitalar SA, natureza jurídica, inscrita no CNPJ/MF sob o nº 12.420.164/0001-57, situada na AV. Luiz Maggioni, n° 2727, Bairro Distrito Empresarial, CEP:14072-055, no Município de Ribeirão Preto, Estado de SP, doravante denominada <b>EMPRESA</b>, entrega neste ato ao seu <b>FUNCIONÁRIO</b> os equipamentos abaixo descritos sob as seguintes condições:</p>' +
      '<div class="section">Do Compromisso, cuidados e manuseio dos equipamentos:</div>' +
      '<p>O <b>FUNCIONÁRIO</b> deverá:</p><ul>' +
      '<li>Utilizar o equipamento exclusivamente para o fim estritamente profissional, mantendo-o como se seu próprio fosse;</li>' +
      '<li>Utilizar o equipamento corretamente, sendo vedada a sublocação, cessão ou transferência a terceiro sem prévio e expresso consentimento da <b>EMPRESA</b>;</li>' +
      '<li>Não introduzir ou fazer modificações de qualquer natureza no equipamento;</li>' +
      '<li>Defender e fazer valer todos os direitos de propriedade da <b>EMPRESA</b>;</li>' +
      '<li>Responsabilizar-se por quaisquer danos e prejuízos do equipamento por utilização e manuseios inadequados aos equipamentos;</li>' +
      '<li>Reportar imediatamente à empresa em caso de perda, furto, roubo e extravio dos equipamentos, processo no qual a empresa poderá solicitar documentações adicionais de comprovação do evento, como Boletim de Ocorrência e demais justificativas sobre o ocorrido;</li>' +
      '<li>Informar imediatamente à <b>EMPRESA</b> qualquer problema ou dano que os equipamentos venham a apresentar; e</li>' +
      '<li>O <b>FUNCIONÁRIO</b> poderá ser responsabilizado por seus atos ou omissões, e descumprimento de qualquer de suas obrigações previstas neste instrumento;</li></ul>' +
      '<div class="section">Da Devolução dos Equipamentos:</div><ul>' +
      '<li>O equipamento descrito no quadro resumo é de propriedade da <b>EMPRESA</b> e será cedido ao <b>FUNCIONÁRIO</b>, que se compromete a devolvê-lo quando solicitado pela <b>EMPRESA</b>, nas mesmas condições em que os recebeu, salvo os desgastes naturais decorrentes do uso normal do equipamento.</li>' +
      '<li>O <b>FUNCIONÁRIO</b> deverá devolver o equipamento e seus acessórios à <b>EMPRESA</b> em até 72 (setenta e duas) horas, contados da solicitação de devolução.</li>' +
      '<li>O equipamento e seus acessórios serão devolvidos pelo <b>FUNCIONÁRIO</b> à <b>EMPRESA</b> no mesmo local onde foram entregues, momento em que a <b>EMPRESA</b> deverá emitir a competente declaração de devolução, que, assinada pelo <b>FUNCIONÁRIO</b>, consubstancia o final da avença.</li></ul>' +
      '<div class="section">Do Recebimento dos Equipamentos e Disposições Finais:</div><ul>' +
      '<li>O <b>FUNCIONÁRIO</b> declara e concorda que o equipamento foi previamente testado em sua presença e que o recebe em perfeitas condições de funcionamento e conservação;</li>' +
      '<li>O <b>FUNCIONÁRIO</b> é responsável pela guarda, conservação e bom uso dos equipamentos e que seguirá as orientações constantes nos manuais de utilização dos fabricantes;</li>' +
      '<li>Em razão do quanto previsto no artigo 462, §1º da CLT - Consolidação das Leis do Trabalho, a <b>EMPRESA</b> está autorizada a descontar diretamente de seu salário os valores necessários para reparação/indenização dos danos causados no equipamento.</li></ul>' +
      '<div class="page-no">1/2</div></br>'+
      '<div class="equip-title">DESCRIÇÃO DO EQUIPAMENTO</div>' +
      '<div class="line"><span class="field">Tipo de Equipamento:</span> ' + tipo + '</div>' +
      '<div class="line"><span class="field">Marca:</span> ' + marca + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field">Modelo:</span> ' + modelo + '</div>' +
      '<div class="line"><span class="field">Número de Série -</span> ' + serial + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="field">Estado:</span> ' + estado + '</div>' +
      '<div class="line"><span class="field">Demais descrições do equipamento:</span> <b>' + demais + '</b></div>' +
      '<div class="line"><span class="field">Acessórios que acompanham o equipamento:</span> ' + acessorios + '</div>' +
      '<div class="line"><span class="field">Número da linha telefônica:</span> ' + linha + '</div>' +
      '<div class="employee-title">DADOS DO FUNCIONÁRIO</div>' +
      '<div class="line"><span class="field">NOME:</span> ' + nome + '</div>' +
      '<div class="line"><span class="field">CARGO:</span> ' + cargo + '</div>' +
      '<div class="line"><span class="field">ÁREA:</span> ' + area + '</div>' +
      '<div class="line"><span class="field">CENTRO DE CUSTO:</span> ' + custo + '</div>' +
      '<div class="line"><span class="field">GESTOR:</span> ' + gestor + '</div>' +
      '<div class="line"><span class="field">LOCAL E UNIDADES DE TRABALHO:</span> ' + local + '</div>' +
      '<div class="line"><span class="field">USUÁRIO:</span> ' + usuario + '</div>' +
      '<p class="signature-intro">Por ser verdade, assino o presente <b>TERMO DE RESPONSABILIDADE DE USO DE EQUIPAMENTOS</b></p>' +
      '<div class="date-line">São Paulo, ' + dia + ' de ' + mes + ' de ' + ano + '</div>' +
      '<div class="sig">(Assinatura do Funcionário)</div></div>'+
      '<div class="page-no">2/2</div></br></body></html>';
  }

  function openContract(f, reg, autoPrint) {
    var w = window.open('', '_blank');
    if (!w) throw new Error('O navegador bloqueou a nova janela. Permita pop-ups para este arquivo.');
    w.document.open();
    w.document.write(html(f, reg));
    w.document.close();
    if (autoPrint) setTimeout(function () { try { w.focus(); w.print(); } catch (e) {} }, 700);
    return w;
  }

  window.TermContract = { makeId: makeId, normalize: normalize, open: openContract, html: html };
})();
