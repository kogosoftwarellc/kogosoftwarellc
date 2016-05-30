$(document).ready(function() {
  $('.menu-button').click(function(event) {
    $('.navigation').toggleClass('opened');
    $('.overlay').toggleClass('active');
    event.stopPropagation();
  });

  $('html').click(function() {
    $('.navigation').removeClass('opened');
    $('.overlay').removeClass('active').addClass('inactive');
  });

  $.ajax({
    url: 'https://api.github.com/orgs/kogosoftwarellc/repos',
    complete: function(response) {
      var results = [];
      response.responseJSON.forEach(function(result) {
        if (!result.fork) {
          results.push(result);
        }
      });

      $('.github-counter').text(results.length);

      var carouselBase = $('.github-carousel');

      results.forEach(function(result) {
        carouselBase.append($('<div>').html(
          '<div class="carousel-item-container">' +
          '  <div class="carousel-item">' +
          '    <p class="carousel-item__title">' + result.name + '</p>' +
          '    <p class="carousel-item__description">' + result.description + '</p>' +
          '    <a class="carousel-item__link" href="' + result.html_url  + '">View on Github</a>' +
          '  </div>' +
          '</div>'
        ));
      });

      $('.github-carousel').slick({
        accessibility: false,
        prevArrow:'<div class="a-left control-c prev slick-prev"></div>',
        nextArrow:'<div class="a-right control-c next slick-next"></div>',
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  });
});
