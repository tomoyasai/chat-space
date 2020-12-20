$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = //メッセージに画像が含まれる場合のHTMLを作る
        `<div class="message__box" data-message-id=${message.id}>
          <div class="message__box__part">
            <div class="message__box__part__name">
              ${message.user_name}
            </div>
            <div class="message__box__part__time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__box__word">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = //メッセージに画像が含まれない場合のHTMLを作る
      `<div class="message__box" data-message-id=${message.id}>
        <div class="message__box__part">
          <div class="message__box__part__name">
            ${message.user_name}
          </div>
          <div class="message__box__part__time">
            ${message.created_at}
          </div>
        </div>
        <div class="message__box__word">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message-list').append(html);      
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
    });
  });
});
