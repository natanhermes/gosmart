const precos = [
    {
        preco: 0,
        precosugerido: 0,
        descricaoCertificado: "Nenhum certificado selecionado"
    },
    {
        preco: 176.0,
        precosugerido: 219.9,
        descricaoCertificado: "Certificado e-CNPJ A1 - 1 ano"
    },
    {
        preco: 264.0,
        precosugerido: 329.9,
        descricaoCertificado: "Certificado e-CNPJ A3 - 3 anos"
    },
    {
        preco: 136.0,
        precosugerido: 159.9,
        descricaoCertificado: "Certificado e-CPF A1 - 1 ano"
    },
    {
        preco: 212.5,
        precosugerido: 249.9,
        descricaoCertificado: "Certificado e-CPF A3 - 3 anos"
    }
]    

$(document).ready(function () {
    $('#seu_preco').keypress(function (e) {
        if (e.keyCode == 13)
            $('#button').click();
    });
    
});

$('#certificado').change(function() {
    var certificado = document.getElementById("certificado");
    var tipoCertificado = certificado.options[certificado.selectedIndex].index;
    var precosugerido = precos[tipoCertificado].precosugerido;

    $('#seu_preco').val(formatarValores(precosugerido));

    AjustarLayout();
});
//$('#seu_preco').keyup(function() {
//    CalcularComissao();
//});
$('#delivery').change(function() {
    CalcularComissao();
});

function CalcularComissao() {
    var certificado = document.getElementById("certificado");
    var tipoCertificado = certificado.options[certificado.selectedIndex].index;
    var nossopreco = parseFloat(precos[tipoCertificado].preco);
    var seupreco = parseFloat((document.getElementById("seu_preco").value).replace(',','.')) || 0;
    var valorDelivery = parseFloat($('#delivery').children("option:selected").val());
    
    document.getElementById("seu_preco").classList.remove("is-invalid");
    document.getElementById("seu_preco").classList.remove("is-valid");

    if (seupreco < nossopreco)
    {
        seupreco = nossopreco;   
        document.getElementById("seu_preco").classList.add("is-invalid");
        document.getElementById("seu_preco").value = formatarValores(nossopreco);
    } else {
        document.getElementById("seu_preco").classList.add("is-valid");
        document.getElementById("seu_preco").value = formatarValores(seupreco);
    }
    
    var sua_comissao = seupreco - nossopreco;
    
    if (sua_comissao < 0) {
        sua_comissao = 0
    }

    var total = seupreco + valorDelivery;

    ExibirTabelas(nossopreco, valorDelivery, sua_comissao, total);
}

function formatarValores(x) {
    x = parseFloat(x);
    return x.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function AjustarLayout () {
    if($('#certificado').prop('selectedIndex') > 0){
        $('#local').fadeIn();
        $('#calcular').fadeIn();
        $('#button').fadeIn();
    } else {
        $('#local').fadeOut();
        $('#calcular').fadeOut();
        $('#button').fadeOut();
        $('#tableParcelas').fadeOut();
        $('#tableValores').fadeOut();
    }
}

function ExibirTabelas(nossopreco,valorDelivery,sua_comissao,total){
    if (total > 0) {
        var fator = [1.0239, 1.0550, 1.1100, 1.1282, 1.1464, 1.1646, 1.1828, 1.2010, 1.2192, 1.2374, 1.2556, 1.2738, 1.2920]
        for (var i = 0; i < 13; i++) {
            var valorTotal = total * fator[i];
            var valorParcela = valorTotal / i;
            if (i == 0) { valorParcela = valorTotal }
            document.getElementById("total" + i + "x").innerHTML = 'R$ ' + formatarValores(valorTotal);
            document.getElementById("parcela" + i + "x").innerHTML = 'R$ ' + formatarValores(valorParcela);
        }
        $("#tableParcelas").fadeOut();
        $("#tableValores").fadeOut();
        $("#tableParcelas").fadeIn();
        $("#tableValores").fadeIn();

        document.getElementById("nosso_preco").innerHTML = 'R$ ' + formatarValores(nossopreco);
        document.getElementById("valorDelivery").innerHTML = 'R$ ' + formatarValores(valorDelivery);
        document.getElementById("suacomissao").innerHTML = 'R$' + formatarValores(sua_comissao);
        document.getElementById("total").innerHTML = 'R$' + formatarValores(total);
        $("#badgeValorBase").html("Valor base para cálculo: R$ " + formatarValores(total));
    } else {
        $("#tableParcelas").fadeOut();
    }
}