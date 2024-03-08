window.onload = function () {
    // セッションから緯度と経度を取得
    var lat = parseFloat(document.getElementById('pac-lat').value);
    var lng = parseFloat(document.getElementById('pac-lng').value);
    var center = new google.maps.LatLng(lat, lng);

    // Google Places APIサービスを使用
    var service = new google.maps.places.PlacesService(document.createElement('div'));

    // 検索クエリの設定
    var request = {
        location: center,
        radius: '5000', // 5kmの半径
        type: ['restaurant'], // 飲食店のみを検索
        minRating: 4.0 // 評価が4.0以上のものを検索
    };

    // 検索を実行
    service.nearbySearch(request, callback);

    // 検索結果を処理するコールバック関数
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // 検索結果を表示する要素を取得
            var container = document.getElementById('restaurant-info');

            // 検索結果の数だけ繰り返し処理
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                // 各飲食店の情報を取得
                var name = place.name;
                var rating = place.rating;
                var photo = place.photos ? place.photos[0].getUrl() : ''; // 画像があればURLを取得し、サイズを調整

                // 検索結果を表示するHTMLを生成
                var html = '<div class="recommend__item">' +
                    '<h3 class="recommend__item__header">' + name + '</h3>' +
                    '<p>Rating: ' + rating + '</p>' +
                    '<article class="recommend__item__image">' +
                    '<img src="' + photo + '" alt="Restaurant Photo">' +
                    '</article>' +
                    '</div>';

                // HTMLを要素に追加
                container.innerHTML += html;
            }
        } else {
            // エラーが発生した場合はメッセージを表示
            console.error('Places service request failed. Status: ' + status);
        }
    }
};
