$(document).ready(function() {
    $('#gameScreen').hide();
    var selectBackground = false;
    var selectHero = false;
    $('#backgrounds img').css('cursor', 'pointer');
    toggleDarkImg('#backgrounds img');
    toggleDarkImg('.select');


    $('#backgrounds').on('click', 'img', function() {
        let $this = $(this),
            info = $this.data('info');

        $('#backgrounds img').each(function() {
            $(this).css({ 'border': '' });
        });

        $this.css({ 'border': '5px solid #01928b' });
        img = document.getElementById('background' + info);
        selectBackground = true;


    });
    $('.select').css('cursor', 'pointer');
    $('.select').on('click', function() {
        let $this = $(this);
        $('.select').each(function() {
            $(this).css({ 'border': '' });
        });
        $this.css({ 'border': '5px solid #01928b' });

        heroProperties.image = document.getElementById(this.id + 'Image');
        selectHero = true;


    });

    $('.select').on('mouseenter', function() {
        $(this).prev().children().show();
        $(this).next().children().show();
    });
    $('.select').on('mouseleave', function() {
        $(this).prev().children().hide();
        $(this).next().children().hide();
    });

    function toggleDarkImg(selector) {
        $(selector).hover(function() {
                $(this).css('-webkit-filter', 'brightness(85%)');
            },
            function() {
                $(this).css('-webkit-filter', '');
            }
        );
    }

    $('#playagainbtn').on('click', function() {
        $('#gameOver').hide();
        $('#menu').show();
        $('#playbtn').show();
        $('h1').show();

    });

    $('#playbtn').on('click', function() {
        if (selectBackground && selectHero) {
            Start();
        } else {
            alert('Choose background and hero first!');
        }
    });



});