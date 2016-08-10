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
            $(this).parent('.img').removeClass('border');
        });

        $(this).parent('.img').addClass('border');
        img = document.getElementById('background' + info);
        selectBackground = true;

    });
    $('.select').css('cursor', 'pointer');
    $('.select').on('click', function() {
        let $this = $(this);
        $('.select').each(function() {
            $(this).removeClass('border');
        });
        $this.addClass('border');

        heroProperties.image = document.getElementById(this.id + 'Image');
        selectHero = true;

        $('.selected').removeClass('selected');
        $this.addClass('selected');


    });

    $('.select').hover(function() {
        $('.selected').prev().children().hide();
        $('.selected').next().children().hide();
        $(this).prev().children().show();
        $(this).next().children().show();
    }, function() {

        $(this).prev().children().hide();
        $(this).next().children().hide();
        $('.selected').prev().children().show();
        $('.selected').next().children().show();

    });

    function toggleDarkImg(selector) {
        $(selector).hover(function() {
                $(this).addClass('darken');
            },
            function() {
                $(this).removeClass('darken');
            }
        );
    }

    $('#changeplayerbtn').on('click', function() {
        $('#gameScreen').hide();
        $('#gameOver').hide();
        $('#menu').show();
    });

    $('#playagainbtn').on('click', function() {
        $('#gameScreen').hide();
        $('#gameOver').hide();
        Start();
    });

    $('#playbtn').on('click', function() {
        if (selectBackground && selectHero) {
            Start();
        } else {
            alert('Choose background and hero first!');
        }
    });
