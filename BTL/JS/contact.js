$(document).ready(function() {
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        var formData = {
            'name': $('#name').val(),
            'email': $('#email').val(),
            'message': $('#message').val()
        };
        $.ajax({
                type: 'POST',
                url: 'process_contact.php',
                data: formData,
                dataType: 'json',
                encode: true
            })
            .done(function(data) {
                if (data.success) {
                    $('#contact-success').removeClass('d-none').fadeIn();
                    $('#contact-error').addClass('d-none');
                    $('#contact-form').trigger('reset');
                } else {
                    $('#contact-error').removeClass('d-none').fadeIn();
                    $('#contact-success').addClass('d-none');
                }
            })
            .fail(function() {
                $('#contact-error').removeClass('d-none').fadeIn();
                $('#contact-success').addClass('d-none');
            });
    });
});