 //$(".add-location-form").on("submit", function (event) {
//    event.preventDefault();
//
//    var geoAddress, formData;
//    var url = "http://catalog.api.2gis.ru/geo/search?q=" + e.latlng.lng + ',' + e.latlng.lat + "&version=1.3&key=" + apiKey;
//
//    $.getJSON(url, function (data) {
//        var geoAddress = [data.result[0].attributes.street, data.result[0].attributes.number];
//
//        formData = {
//            'coordinates': e.latlng.lat + ', ' + e.latlng.lng,
//            'address': geoAddress.join(', '),
//            'type': $('select[name=type]').val(),
//            'name': $('input[name=name]').val(),
//            'time': $('input[name=time]').val(),
//            'specification': $('input[name=specification]').val(),
//            'rating': $('input[name=rating]').val(),
//            'description': $('textarea[name=description]').val(),
//            'city': currentCity
//        };
//
//        $.ajax({
//            type: 'POST',
//            url: 'http://api.lara.dev/locations/post',
//            data: formData,
//            dataType: 'json',
//            encode: true
//        }).done(function () {
//            $("<h3 class='form--submitted'>Ваша форма отправлена</h1>").replaceAll($('.add-location-form'));
//            DG.marker([e.latlng.lat, e.latlng.lng], {
//                icon: veganIcon
//            }).addTo(map);
//        });
//    });
//});