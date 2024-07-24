$(document).ready(function () {

  var acertoCount = 0;

  function showNextFolha() {
    acertoCount++;
    switch (acertoCount) {
      case 1:
        adicionarRemoverTexto(2000);
        setTimeout(function () {
          $('.folhas-quatro').removeClass('d-none').addClass('animated').one('animationend', function () {
            $(this).removeClass('animated');
          });
        }, 1000);
        break;
      case 2:
        adicionarRemoverTexto(2000);
        setTimeout(function () {
          $('.folhas-dois').removeClass('d-none').addClass('animated').one('animationend', function () {
            $(this).removeClass('animated');
          });
        }, 1000);
        break;
      case 3:

        adicionarRemoverTexto(2000);
        setTimeout(function () {
          $('.folhas-um').removeClass('d-none').addClass('animated').one('animationend', function () {
            $(this).removeClass('animated');
          });
        }, 1000);
        break;
      case 4:

        adicionarRemoverTexto(2000);
        setTimeout(function () {
          $('.folhas-tres').removeClass('d-none').addClass('animated').one('animationend', function () {
            $(this).removeClass('animated');
          });
        }, 1000);
        break;
      case 5:
        adicionarRemoverTexto(2000);
        setTimeout(function () {
          $('.frutos').removeClass('d-none').addClass('animated').one('animationend', function () {
            $(this).removeClass('animated');
          });
        }, 1000);
        break;
    }
  }


  function adicionarRemoverTexto(tempo) {

    $('.texto-body').fadeOut('slow', function () {

      setTimeout(function () {
        $('.texto-body').fadeIn('slow');
      }, tempo);
    });
  }


  $(document).on("dragstart", ".drag-item", function (event) {
    $(this).addClass('dragging');
    event.originalEvent.dataTransfer.setData("text/plain", $(this).data('resp') + '-' + $(this).text());
  });


  $(document).on("dragend", ".drag-item", function () {
    $('.dragging').removeClass('dragging');
  });


  $(document).on("dragover", ".espaco-item", function (event) {
    event.preventDefault();
  });


  $(document).on("drop", ".espaco-item", function (event) {
    event.preventDefault();
    var draggedElement = $('.dragging');
    var dropTarget = $(event.target).closest('.espaco-item');
    var dataTransfer = event.originalEvent.dataTransfer.getData("text/plain").split('-');
    var dragItemResponse = dataTransfer[0].trim();

    if (dropTarget.length) {
      if (dragItemResponse === dropTarget.data('resp').trim()) {
        dropTarget.append(draggedElement).removeClass('bg-danger');
        $("#audio-acerto")[0].play();
        showNextFolha();
      } else {
        dropTarget.addClass('bg-danger');

        $("#audio-errado")[0].play();
      }
      setTimeout(function () {
        dropTarget.removeClass('bg-danger');
      }, 1000);
      draggedElement.removeClass('dragging');
    }


    var completed = true;
    $('.espaco-item').each(function () {
      if (!$(this).find('.drag-item').length) {
        completed = false;
        return false;
      }
    });

    if (completed) {

      openPositiveFeedbackModal();
    }
  });


  function openPositiveFeedbackModal() {
    $('.info').addClass('d-none');
    $('#modalFeedbackPositivo').modal('show');
  }

  function escalaProporcao(largura, altura) {
    var larguraScreen = $(window).width();
    var alturaScreen = $(window).height();
    var proporcaoAltura = (alturaScreen * 100) / altura;
    var proporcaoLargura = (larguraScreen * 100) / largura;
    var proporcao, larguraAltura, larguraAlturaAuto;

    if (proporcaoAltura < proporcaoLargura) {
      larguraAltura = "height";
      larguraAlturaAuto = "width";
      proporcao = proporcaoAltura / 100;
    } else {
      larguraAltura = "width";
      larguraAlturaAuto = "height";
      proporcao = proporcaoLargura / 100;
    }

    console.log(proporcao, proporcaoAltura, proporcaoLargura)
    return [proporcao, larguraAltura, larguraAlturaAuto];
  }

  resizeBodyConteudo();

  function resizeBodyConteudo() {
    var proporcao1920 = escalaProporcao(1920, 1080)[0];

    $(".conteudo").css({
      "transform": "scale(" + proporcao1920 + ")",
      "transform-origin": "center center"
    });

    var proporcao900;

    if ($(window).width() < 992) {
      proporcao900 = escalaProporcao(900, 576)[0];
    } else {
      proporcao900 = 1;
    }
  }

  $(window).resize(function () {
    resizeBodyConteudo()
  })



});