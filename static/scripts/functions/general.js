function open_load_fullscreen(link, block) {
    var link_, elem;
    link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    link_.open('GET', link, true);
    link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    link_.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            elem = link_.responseText;
            block.parentElement.style.display = "block";
            block.innerHTML = "";
            block.innerHTML = elem;
            scrolled(link, document.getElementById('create_loader'), 0)
        }
    };
    link_.send();
}

function post_and_load_object_page(form, url_post, url_1, url_2) {
    form_data = new FormData(form);
    pk = document.body.querySelector(".pk_saver").getAttribute("data-pk");
    var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    ajax_link.open('POST', url_post, true);
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            elem_ = document.createElement('span');
            elem_.innerHTML = ajax_link.responseText;
            ajax = elem_.querySelector("#reload_block");
            rtr = document.getElementById('ajax');
            rtr.innerHTML = ajax.innerHTML;
            window.scrollTo(0, 0);
            close_create_window();
            document.title = elem_.querySelector('title').innerHTML;
            uuid = rtr.querySelector(".pk_saver").getAttribute("data-uuid");
            window.history.pushState(null, "vfgffgfgf", url_1 + pk + url_2 + uuid + '/')
        }
    }
    ajax_link.send(form_data)
}

on('body', 'click', '.photo_preview_delete', function() {
  parent = this.parentElement;
  block = parent.parentElement;
  if (block.classList.contains("attach_block")){
    remove_file_attach(), is_full_attach()
  } else if (block.classList.contains("comment_attach_block")){
    remove_file_dropdown(); is_full_dropdown()
  } else if (block.classList.contains("message_attach_block")){
    remove_file_message_attach(); is_full_message_attach()
  }
  parent.remove();
});
on('body', 'click', '.doc_preview_delete', function() {
  parent = this.parentElement;
  block = parent.parentElement;
  if (block.classList.contains("attach_block")){
    remove_file_attach(), is_full_attach()
  } else if (block.classList.contains("comment_attach_block")){
    remove_file_dropdown(); is_full_dropdown()
  } else if (block.classList.contains("message_attach_block")){
    remove_file_message_attach(); is_full_message_attach()
  }
  parent.remove();
  try{ remove_file_dropdown(); is_full_dropdown()} catch { remove_file_attach(), is_full_attach()}
});
on('body', 'click', '.video_preview_delete', function() {
  parent = this.parentElement;
  block = parent.parentElement;
  if (block.classList.contains("attach_block")){
    remove_file_attach(), is_full_attach()
  } else if (block.classList.contains("comment_attach_block")){
    remove_file_dropdown(); is_full_dropdown()
  } else if (block.classList.contains("message_attach_block")){
    remove_file_message_attach(); is_full_message_attach()
  }
  parent.remove();
});
on('body', 'click', '.music_preview_delete', function() {
  parent = this.parentElement;
  block = parent.parentElement;
  if (block.classList.contains("attach_block")){
    remove_file_attach(), is_full_attach()
  } else if (block.classList.contains("comment_attach_block")){
    remove_file_dropdown(); is_full_dropdown()
  } else if (block.classList.contains("message_attach_block")){
    remove_file_message_attach(); is_full_message_attach()
  }
  parent.remove();
});

function on(elSelector,eventName,selector,fn) {var element = document.querySelector(elSelector);element.addEventListener(eventName, function(event) {var possibleTargets = element.querySelectorAll(selector);var target = event.target;for (var i = 0, l = possibleTargets.length; i < l; i++) {var el = target;var p = possibleTargets[i];while(el && el !== element) {if (el === p) {return fn.call(p, event);}el = el.parentNode;}}});};
function elementInViewport(el){var bounds = el.getBoundingClientRect();return ((bounds.top + bounds.height > 0) && (window.innerHeight - bounds.top > 0));}

function create_pagination(block) {
  if (block.querySelector('.chat_container')) {
    scrolled(window.location.href, '.chat_container', target = 0)
  }
  else if (block.querySelector('.is_paginate')) {
    scrolled(window.location.href, '.is_paginate', target = 0)
  }
  else if (block.querySelector('.is_post_paginate')) {
    scrolled(window.location.href, '.is_post_paginate', target = 1)
  }
}
create_pagination(document.getElementById('ajax'));
page = 2;
loaded = false;

function scrolled(link, block_id, target) {
    // работа с прокруткой:
    // 1. Ссылка на страницу с пагинацией
    // 2. id блока, куда нужно грузить следующие страницы
    // 3. Указатель на нужность работы просмотров элементов в ленте. Например, target=1 - просмотры постов в ленте
    onscroll = function() {
        try {
          //console.log(document.body.querySelector(block_id))
            if (document.body.querySelector(".chat_container")){
              block_ = document.body.querySelector(block_id);
              box_ = block_.querySelector('.first');
              if (box_ && box_.classList.contains("first")) {
                inViewport = elementInViewport(box_);
                if (inViewport) {box_.classList.remove("first");top_paginate(link, block_id)}}
            } else {_block = document.body.querySelector(block_id);
                  box = _block.querySelector('.last');
                  if (box && box.classList.contains("last")) {
                    inViewport = elementInViewport(box);
                    if (inViewport) {
                      box.classList.remove("last");
                      paginate(link, block_id);
                    }
                  };
                  if (target == 1) {get_post_view()}}
        } catch {return}
    }
};

function paginate(link, block_id) {
  // общая подгрузка списков в конец указанного блока
    block = document.body.querySelector(block_id);
    if (block.getElementsByClassName('pag').length === (page - 1) * 15) {
        if (loaded) {
            return
        };
        var link_3 = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        link_3.open('GET', link + '?page=' + page++, true);
        link_3.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        link_3.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var elem = document.createElement('span');
                elem.innerHTML = link_3.responseText;
                if (elem.getElementsByClassName('pag').length < 15) {
                    loaded = true
                };
                if (elem.querySelector(block_id)) {
                    xxx = document.createElement("span");
                    xxx.innerHTML = elem.querySelector(block_id).innerHTML;
                    block.insertAdjacentHTML('beforeend', xxx.innerHTML)
                } else {
                    block.insertAdjacentHTML('beforeend', elem.innerHTML)
                }
            }
        }
        link_3.send();
    }
}

function get_select() {
  on('body', 'hover', '#russia_map path', function() {
    svg_list = this.parentElement.querySelectorAll("path");
    for (var i = 0; i < svg_list.length; i++) {
      if (svg_list[i].style.fill != "#897FF1"){
      svg_list[i].style.fill = "rgba(0,0,0,0.2)";
    }
    }
    if (this.style.fill != "#897FF1"){
    this.style.fill = "#FFFFFF";
  }

  },

  function(){
    svg_list = this.parentElement.querySelectorAll("path");
    for (var i = 0; i < svg_list.length; i++) {
      if (svg_list[i].style.fill != "#897FF1"){
      svg_list[i].style.fill = "rgba(0,0,0,0.15)";
    }
    }
  });
}; get_select();

function send_form_and_toast(url, form, toast) {
    form_data = new FormData(form);
    ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    ajax_link.open('POST', url, true);
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            toast_info(toast);
        }
    }
    ajax_link.send(form_data);
}

function get_image_priview(ggg, img) {
    entrou = false;
    img.click();
    img.onchange = function() {
        if (!entrou) {
            imgPath = img.value;
            extn = imgPath.substring(imgPath.lastIndexOf(".") + 1).toLowerCase();
            if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
                if (typeof FileReader != "undefined") {
                    if (ggg) {}
                    ggg.innerHTML = "";
                    reader = new FileReader();
                    reader.onload = function(e) {
                        $img = document.createElement("img");
                        $img.src = e.target.result;
                        $img.class = "thumb-image";
                        $img.style.height = "100px";
                        //ggg.innerHTML = '<a href="#" style="right:15px;top: 0;" class="delete_thumb">Удалить</a>'
                        ggg.append($img)
                    };
                    reader.readAsDataURL(img.files[0])
                }
            } else {
                this.value = null
            }
        }
        entrou = true;
        setTimeout(function() {
            entrou = false
        }, 1000)
    }
};

function toast_success(text){
  var toasts = new ToastManager();
  toasts.showSuccess(text);
}
function toast_error(text){
  var toasts = new ToastManager();
  toasts.showError(text);
}
function toast_info(text){
  var toasts = new ToastManager();
  toasts.showInfo(text);
}
function toast_warning(text){
  var toasts = new ToastManager();
  toasts.showWarning(text);
}
function send_comment(form, block, link){
  if (!form.querySelector(".text-comment").value){
    form.querySelector(".text-comment").style.border = "1px #FF0000 solid";
    toast_error("Напишите что-нибудь");
    return
  }

  form_comment = new FormData(form);
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'POST', link, true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    form.querySelector(".text-comment").value="";
    elem = link_.responseText;
    new_post = document.createElement("span");
    new_post.innerHTML = elem;
    block.append(new_post);
  }};

  link_.send(form_comment);
}

function comment_delete(_this, _link, _class){
  data = _this.parentElement.parentElement;
  comment_pk = data.getAttribute("data-pk");
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + comment_pk + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    comment = data.parentElement.parentElement.parentElement.parentElement;
    comment.style.display = "none";
    div = document.createElement("div");
    div.classList.add("media", "comment");

    div.innerHTML = "<p class='" + _class + "'style='cursor:pointer;text-decoration:underline;padding:15px' data-pk='" + comment_pk + "'>Комментарий удален. Восстановить</p>";
    comment.parentElement.insertBefore(div, comment);
    comment.style.display = "none";
  }};
  link.send( );
}
function comment_abort_delete(_this, _link){
  comment = _this.parentElement.nextElementSibling;
  comment.style.display = "flex";
  pk = _this.getAttribute("data-pk");
  block = _this.parentElement;
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'GET', _link + pk + "/", true );
  link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    block.remove();
  }};
  link.send();
}

function load_chart() {
    try {
        var ctx = document.querySelector('#canvas');
        var dates = ctx.getAttribute('dates').split(",");
        var data_1 = ctx.getAttribute('data_views').split(",");
        var data_2 = ctx.getAttribute('data_member_views').split(",");
        var data_3 = ctx.getAttribute('data_likes').split(",");
        var data_4 = ctx.getAttribute('data_dislikes').split(",");
        var label_1 = ctx.getAttribute('label_views');
        var label_2 = ctx.getAttribute('label_member_views');
        var label_3 = ctx.getAttribute('label_likes');
        var label_4 = ctx.getAttribute('label_dislikes');
        var config = {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: label_1,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: data_1,
                    fill: false,
                }, {
                    label: label_2,
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    data: data_2,
                }, {
                    label: label_3,
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    data: data_3,
                }, {
                    label: label_4,
                    fill: false,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    data: data_4,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: ''
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }]
                }
            }
        };
        ctx.getContext('2d');
        window.myLine = new Chart(ctx, config)
    } catch {return}
}; load_chart();

function open_fullscreen(link, block) {
  var link_, elem;
  link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link_.open( 'GET', link, true );
  link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  link_.onreadystatechange = function () {
  if ( this.readyState == 4 && this.status == 200 ) {
    elem = link_.responseText;
    block.parentElement.style.display = "block";
    block.innerHTML = elem
  }};
  link_.send();
}

function ajax_get_reload(url) {
  var ajax_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
    ajax_link.open( 'GET', url, true );
    ajax_link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    ajax_link.onreadystatechange = function () {
      if ( this.readyState == 4 && this.status == 200 ) {
        elem_ = document.createElement('span');
        elem_.innerHTML = ajax_link.responseText;
        ajax = elem_.querySelector("#reload_block");
        rtr = document.getElementById('ajax');
        rtr.innerHTML = ajax.innerHTML;
        window.scrollTo(0,0);
        document.title = elem_.querySelector('title').innerHTML;
        window.history.pushState({route: url}, "network", url);
        get_select();
        page = 2;
        loaded = false;
        create_pagination(rtr)
      }
    }
    ajax_link.send();
}

function send_comment(form, block, link, prepend) {
    form_comment = new FormData(form);
    link_ = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    link_.open('POST', link, true);
    link_.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    (form.querySelector(".text-comment").value || form.querySelector(".comment_attach_block").firstChild) ? null: toast_error("Напишите или прикрепите что-нибудь");
    link_.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            form.querySelector(".text-comment").value = "";
            elem = link_.responseText;
            new_post = document.createElement("span");
            new_post.innerHTML = elem;
            prepend == "prepend" ? block.insertAdjacentHTML('afterBegin', new_post.innerHTML) : block.append(new_post);
            toast_success(" Комментарий опубликован");
            form.querySelector(".comment_attach_block").innerHTML = "";
            try {
                form_dropdown = form.querySelector(".current_file_dropdown");
                form_dropdown.classList.remove("current_file_dropdown");
                form_dropdown.parentElement.parentElement.classList.remove("files_one", "files_two");
                form_dropdown.parentElement.parentElement.classList.add("files_null")
            } catch {
                null
            }
        }
    };
    link_.send(form_comment)
}
