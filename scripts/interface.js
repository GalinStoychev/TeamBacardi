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

        $this.css({ 'border': '5px solid #00ff12' });
        img = document.getElementById('background' + info);
        selectBackground = true;

        if (selectBackground && selectHero) {
            Start();
        }
    });
    $('.select').css('cursor', 'pointer');
    $('.select').on('click', function() {
        let $this = $(this);
        $('.select').each(function() {
            $(this).css({ 'border': '' });
        });
        $this.css({ 'border': '5px solid #00ff12' });

        heroProperties.image = document.getElementById(this.id + 'Image');
        selectHero = true;
        if (selectBackground && selectHero) {
            Start();
        }
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



});