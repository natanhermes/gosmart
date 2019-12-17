const precos = [
  {
    preco: 0,
    precosugerido: 0,
    descricaoCertificado: 'Nenhum certificado selecionado',
  },
  {
    preco: 176.0,
    precosugerido: 219.9,
    descricaoCertificado: 'Certificado e-CNPJ A1 - 1 ano',
  },
  {
    preco: 264.0,
    precosugerido: 329.9,
    descricaoCertificado: 'Certificado e-CNPJ A3 - 3 anos',
  },
  {
    preco: 136.0,
    precosugerido: 159.9,
    descricaoCertificado: 'Certificado e-CPF A1 - 1 ano',
  },
  {
    preco: 212.5,
    precosugerido: 249.9,
    descricaoCertificado: 'Certificado e-CPF A3 - 3 anos',
  },
];

$(document).ready(() => {
  $('#seu_preco').keypress(e => {
    if (e.keyCode === 13) {
      $('#button').click();
    }
  });
});

$('#certificado').change(() => {
  const certificado = document.getElementById('certificado');
  const tipoCertificado = certificado.options[certificado.selectedIndex].index;
  const { precosugerido } = precos[tipoCertificado];
  $('#seu_preco').val(formatarValores(precosugerido));
  $('#midias')[0].selectedIndex = 0;
  $('#tableValores').fadeOut();

  AjustarLayout();
});

$('#delivery').change(() => {
  CalcularComissao();
});
$('#midias').change(() => {
  CalcularComissao();
});

function CalcularComissao() {
  if (ValidarMidia()) {
    const certificado = document.getElementById('certificado');
    const tipoCertificado =
      certificado.options[certificado.selectedIndex].index;
    const nossopreco = parseFloat(precos[tipoCertificado].preco);
    let seupreco =
      parseFloat(
        document.getElementById('seu_preco').value.replace(',', '.')
      ) || 0;
    const valorDelivery = parseFloat(
      $('#delivery')
        .children('option:selected')
        .val()
    );
    const valorMidia = parseFloat(
      $('#midias')
        .children('option:selected')
        .val()
    );
    document.getElementById('seu_preco').classList.remove('is-invalid');
    document.getElementById('seu_preco').classList.remove('is-valid');
    document.getElementById('midias').classList.remove('is-invalid');
    if (seupreco < nossopreco) {
      seupreco = nossopreco;
      document.getElementById('seu_preco').classList.add('is-invalid');
      document.getElementById('seu_preco').value = formatarValores(nossopreco);
    } else {
      document.getElementById('seu_preco').classList.add('is-valid');
      document.getElementById('seu_preco').value = formatarValores(seupreco);
    }

    let sua_comissao = seupreco - nossopreco;

    if (sua_comissao < 0) {
      sua_comissao = 0;
    }
    const total = seupreco + valorDelivery + valorMidia;

    ExibirTabelas(nossopreco, valorDelivery, valorMidia, sua_comissao, total);
  } else {
    $('#tableParcelas').fadeOut();
    $('#tableValores').fadeOut();
    $('#linhaMidias').fadeIn();
    document.getElementById('midias').classList.add('is-invalid');
  }
}

function ValidarMidia() {
  const indexCertificado = $('#certificado').prop('selectedIndex');
  const indexMidia = $('#midias').prop('selectedIndex');

  if (indexCertificado === 2 || indexCertificado === 4) {
    return indexMidia > 0;
  }
  return true;
}

function formatarValores(x) {
  x = parseFloat(x);
  return x.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function AjustarLayout() {
  if ($('#certificado').prop('selectedIndex') > 0) {
    if ($('#certificado').prop('selectedIndex') === 2) {
      $('#midiasA3').fadeIn();
      $('#local').fadeIn();
      $('#calcular').fadeIn();
      $('#tableParcelas').fadeOut();
      $('#tableValores').fadeOut();
      $('#linhaMidias').fadeIn();
    } else if ($('#certificado').prop('selectedIndex') === 4) {
      $('#midiasA3').fadeIn();
      $('#local').fadeIn();
      $('#calcular').fadeIn();
      $('#tableParcelas').fadeOut();
      $('#tableValores').fadeOut();
      $('#linhaMidias').fadeIn();
    } else {
      $('#midiasA3').fadeOut();
      $('#local').fadeIn();
      $('#calcular').fadeIn();
      $('#linhaMidias').fadeOut();
      $('#tableParcelas').fadeOut();
      $('#tableValores').fadeOut();
    }
  } else {
    $('#midiasA3').fadeOut();
    $('#local').fadeOut();
    $('#calcular').fadeOut();
    $('#tableParcelas').fadeOut();
    $('#tableValores').fadeOut();
  }
}

function ExibirTabelas(
  nossopreco,
  valorDelivery,
  valorMidia,
  sua_comissao,
  total
) {
  if (total > 0) {
    const fator = [
      1.0239,
      1.055,
      1.11,
      1.1282,
      1.1464,
      1.1646,
      1.1828,
      1.201,
      1.2192,
      1.2374,
      1.2556,
      1.2738,
      1.292,
    ];
    for (let i = 0; i < 13; i++) {
      const valorTotal = total * fator[i];
      let valorParcela = valorTotal / i;
      if (i === 0) {
        valorParcela = valorTotal;
      }
      document.getElementById(`total${i}x`).innerHTML = `R$ ${formatarValores(
        valorTotal
      )}`;
      document.getElementById(`parcela${i}x`).innerHTML = `R$ ${formatarValores(
        valorParcela
      )}`;
    }
    $('#tableParcelas').fadeOut();
    $('#tableValores').fadeOut();
    $('#tableParcelas').fadeIn();
    $('#tableValores').fadeIn();

    document.getElementById('nosso_preco').innerHTML = `R$ ${formatarValores(
      nossopreco
    )}`;
    document.getElementById('valorDelivery').innerHTML = `R$ ${formatarValores(
      valorDelivery
    )}`;
    document.getElementById('valorMidia').innerHTML = `R$ ${formatarValores(
      valorMidia
    )}`;
    document.getElementById('suacomissao').innerHTML = `R$${formatarValores(
      sua_comissao
    )}`;
    document.getElementById('total').innerHTML = `R$${formatarValores(total)}`;
    $('#badgeValorBase').html(
      `Valor base para cálculo: R$ ${formatarValores(total)}`
    );
  } else {
    $('#tableParcelas').fadeOut();
  }
}
