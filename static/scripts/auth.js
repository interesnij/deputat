function on(elSelector,eventName,selector,fn) {var element = document.querySelector(elSelector);element.addEventListener(eventName, function(event) {var possibleTargets = element.querySelectorAll(selector);var target = event.target;for (var i = 0, l = possibleTargets.length; i < l; i++) {var el = target;var p = possibleTargets[i];while(el && el !== element) {if (el === p) {return fn.call(p, event);}el = el.parentNode;}}});};
function show_hide_password(target){
	var input = target.previousElementSibling;
	if (input.getAttribute('type') == 'password') {
		target.classList.add('view');
		input.setAttribute('type', 'text');
	} else {
		target.classList.remove('view');
		input.setAttribute('type', 'password');
	}
	return false;
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
        window.history.pushState("", document.title, url);
        document.title = elem_.querySelector('title').innerHTML;
        create_pagination(rtr);
        init_music(rtr);
        mobile_menu_close();
				get_document_opacity_1(rtr);
      }
    }
    ajax_link.send();
}

class ToastManager {
  constructor(){
    this.id = 0;
    this.toasts = [];
    this.icons = {
      'SUCCESS': "",
      'ERROR': '',
      'INFO': '',
      'WARNING': '',
    };

    var body = document.querySelector('body');
    this.toastsContainer = document.createElement('div');
    this.toastsContainer.classList.add('toasts', 'border-0');
    body.appendChild(this.toastsContainer);
  }

  showSuccess(message) {
    return this._showToast(message, 'SUCCESS');
  }
  showError(message) {
    return this._showToast(message, 'ERROR');
  }
  showInfo(message) {
    return this._showToast(message, 'INFO');
  }
  showWarning(message) {
    return this._showToast(message, 'WARNING');
  }
  _showToast(message, toastType) {
    var newId = this.id + 1;

    var newToast = document.createElement('div');
    newToast.style.display = 'inline-block';
    newToast.classList.add(toastType.toLowerCase());
    newToast.classList.add('toast');
    newToast.innerHTML = `
      <progress max="100" value="0"></progress>
      <h3> ${message} </h3>`;
    var newToastObject = {
      id: newId,
      message,
      type: toastType,
      timeout: 4000,
      progressElement: newToast.querySelector('progress'),
      counter: 0,
      timer: setInterval(() => {
        newToastObject.counter += 1000 / newToastObject.timeout;
        newToastObject.progressElement.value = newToastObject.counter.toString();
        if(newToastObject.counter >= 100) {
          newToast.style.display = 'none';
          clearInterval(newToastObject.timer);
          this.toasts = this.toasts.filter((toast) => {
            return toast.id === newToastObject.id;
          });
        }
      }, 10)
    }

    newToast.addEventListener('click', () => {
      newToast.style.display = 'none';
      clearInterval(newToastObject.timer);
      this.toasts = this.toasts.filter((toast) => {
        return toast.id === newToastObject.id;
      });
    });

    this.toasts.push(newToastObject);
    this.toastsContainer.appendChild(newToast);
    return this.id++;
  }
}

function toast_error(text){
  var toasts = new ToastManager();
  toasts.showError(text);
}

on('body', 'click', '#register_ajax', function() {
  form = document.querySelector("#signup");
  if (!form.querySelector("#id_first_name").value){
    form.querySelector("#id_first_name").style.border = "1px #FF0000 solid";
    toast_error("Имя - обязательное поле!"); return
  } else if (!form.querySelector("#id_last_name").value){
    form.querySelector("#id_last_name").style.border = "1px #FF0000 solid";
    toast_error("Фамилия - обязательное поле!"); return
  } else if (!form.querySelector("#password1").value){
    form.querySelector("#password1").style.border = "1px #FF0000 solid";
    toast_error("Пароль - обязательное поле!"); return
  } else if (!form.querySelector("#password2").value){
    form.querySelector("#password2").style.border = "1px #FF0000 solid";
    toast_error("Введите пароль еще раз!"); return
  } else if (!form.querySelector("#select_region").value){
    form.querySelector("#select_region").style.border = "1px #FF0000 solid";
    toast_error("Выберите регион!"); return
  } else if (!form.querySelector("#id_city").value){
		form.querySelector("#id_city").style.border = "1px #FF0000 solid";
    toast_error("Выберите город!"); return
  } else if (!form.querySelector("#date_day").value){
      form.querySelector("#date_day").style.border = "1px #FF0000 solid";
      toast_error("День рождения - обязательное поле!"); return
  } else if (!form.querySelector("#date_month").value){
      form.querySelector("#date_month").style.border = "1px #FF0000 solid";
      toast_error("Месяц рождения - обязательное поле!"); return
  } else if (!form.querySelector("#date_year").value){
      form.querySelector("#date_year").style.border = "1px #FF0000 solid";
      toast_error("Год рождения - обязательное поле!"); return
  } else if (form.querySelector("#password1").value != form.querySelector("#password2").value){
      form.querySelector("#password1").style.border = "1px #FF0000 solid";
			form.querySelector("#password2").style.border = "1px #FF0000 solid";
      toast_error("Пароли не совпадают!"); return
  }
  form_data = new FormData(form);

  if (form.querySelector("#id_first_name").value){form.querySelector("#id_first_name").style.border = "rgba(0, 0, 0, 0.2)";}
  if (form.querySelector("#id_last_name").value){form.querySelector("#id_last_name").style.border = "rgba(0, 0, 0, 0.2)";}
  if (form.querySelector("#password1").value){form.querySelector("#password1").style.border = "rgba(0, 0, 0, 0.2)";}
  if (form.querySelector("#password2").value){form.querySelector("#password2").style.border = "rgba(0, 0, 0, 0.2)";}
  if (form.querySelector("#select_region").value){form.querySelector("#select_region").style.border = "rgba(0, 0, 0, 0.2)";}

  reg_link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  reg_link.open( 'POST', "/rest-auth/registration/", true );
  reg_link.onreadystatechange = function () {
  if ( reg_link.readyState == 4 && reg_link.status == 201 ) {
    window.location.href = "/users/phone_verify/"
  } else {
		if (reg_link.responseText.indexOf("Детям регистрация не разрешена!") !== -1) {
      toast_error("Портал для пользователей 18+");
    }
		else if (reg_link.responseText.indexOf( "Введённый пароль" ) != -1 && !document.body.classList.contains("password")) {
			alert("Пороль должен состоять минимум из 8 символов - из букв, цифр.");
			document.body.classList.add("password");
	} else {
		document.body.classList.remove("password");
	}
	}};
  reg_link.send(form_data);
})


on('body', 'click', '#logg', function() {
  form = document.querySelector("#login_form");
  response = form.querySelector(".api_response")
  if (form.querySelector("#id_username").value){form.querySelector("#id_username").style.border = "1px solid rgba(0, 0, 0, 0.2)";}
  if (form.querySelector("#id_password").value){form.querySelector("#id_password").style.border = "1px solid rgba(0, 0, 0, 0.2)";}

  if (!form.querySelector("#id_username").value){
    form.querySelector("#id_username").style.border = "1px #FF0000 solid";
    response.innerHTML = "Введите телефон!"; response.classList.add("error"); return}
  else if (!form.querySelector("#id_password").value){
    form.querySelector("#id_password").style.border = "1px #FF0000 solid";
    response.innerHTML = "Введите пароль!"; response.classList.add("error"); return}

    form.querySelector("#id_username").style.display = "none";
		user_phone = form.querySelector("#id_username").value;
		_user_phone = user_phone.replace(/[^0-9]/g, '');
		if (_user_phone[0] == "7" || _user_phone[0] == "8") {
			_user_phone = _user_phone.slice(1)
		};
    form.querySelector("#id_username").value = form.querySelector("#id_first_number").value + _user_phone;

  form_data = new FormData(form);
  link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
  link.open( 'POST', "/rest-auth/login/", true );

  link.onreadystatechange = function () {
  if ( link.readyState == 4 && link.status == 200 ) {
    response.classList.replace("error", "success");
    response.innerHTML = "Успешный вход в аккаунт";
    this.disabled = true;
    window.location.href = "/"
  } else{
    this.disabled = false;
    response.style.display = "block";
    response.innerHTML = "Телефон или пароль - неверный!";
    response.classList.add("error");
    form.querySelector("#id_username").style.display = "block";
    form.querySelector("#id_username").value = '';
    form.querySelector("#id_password").value = '';
  }};
  link.send(form_data);
});

function phone_check() {
 if (document.body.querySelector('#phone').value.length > 9)
   document.querySelector(".form_phone_send").removeAttribute('disabled');
 else
   document.querySelector(".form_phone_send").setAttribute("disabled", "true");
 }
 function code_check() {
  if (document.querySelector('#code').value.length === 4)
    document.querySelector(".form_code_send").removeAttribute('disabled');
  else
    document.querySelector(".form_code_send").setAttribute("disabled", "true");
  }

  on('body', 'click', '#code_send', function() {
      form = document.querySelector('.verify_form');
      user_pk = form.getAttribute("data-pk");
      var phone = form.querySelector('#id_first_number').value + form.querySelector('#phone').value;
      var code = document.body.querySelector('.block_verify').querySelector('#code').value;
      var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      request.open('GET', "/users/progs/phone_verify/" + phone + "/" + code + "/", true);
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.onreadystatechange = function() {
          if (request.readyState == 4 && request.status == 200) {
              var div = document.getElementById('jsondata2');
              div.innerHTML = request.responseText;
              console.log(request.responseText);
              if (request.responseText.indexOf("ok") != -1) {
                 window.location.href = "/users/" + user_pk + "/"
              }
          }
      };
      request.send()
  });

on('body', 'click', '.phone_send', function() {
  form = this.parentElement.parentElement;
	user_phone = form.querySelector("#phone").value;
	_user_phone = user_phone.replace(/[^0-9]/g, '');
	if (_user_phone[0] == "7" || _user_phone[0] == "8") {
		_user_phone = _user_phone.slice(1)
	};

   var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
   request.open( 'GET', "/users/progs/phone_send/" + form.querySelector("#id_first_number").value + _user_phone + "/", true );
   request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
   request.onreadystatechange = function () {
     if ( request.readyState == 4 && request.status == 200) {
       var div = document.getElementById('jsondata');
       div.innerHTML = request.responseText;
       if (request.responseText.indexOf("уже зарегистрирован") !== -1) {
         div.innerHTML = 'Пользователь с таким номером уже зарегистрирован. Используйте другой номер или напишите в <a class="pointer underline send_support_message">Службу поддержки</a>, если этот номер Вы не использовали ранее.'
         document.querySelector(".phone_send").setAttribute("disabled", "true");
       } else if (request.responseText.indexOf("Мы Вам звоним") !== -1){
         div.innerHTML = request.responseText;
       document.querySelector("#phone").setAttribute("disabled", "true");
       document.querySelector(".phone_send").setAttribute("disabled", "true");
     }}}
   request.send();
  })

  on('body', 'change', '.select_region', function() {
    _this = this, row_variant = false;
    var val = _this.value;
		_this.nextElementSibling ? block = _this.nextElementSibling : (block = _this.parentElement.parentElement.parentElement.nextElementSibling, row_variant = true );
    if (val == '') {
      block.innerHTML = "";
    } else {
      var link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
      link.open( 'GET', "/region/cities/" + val + "/", true );
      link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      link.onreadystatechange = function () {
        if ( link.readyState == 4 ) {
            if ( link.status == 200 ) {
                block.innerHTML = link.responseText;
								if (row_variant){
									block.querySelector(".district_option").remove()
								}
            }
        }
    };
    link.send( null );
    };
  });

	on('body', 'change', '.select_settings_region', function() {
    _this = this;
    val = _this.value;
		block = _this.parentElement.parentElement.parentElement.nextElementSibling;
    if (val == '') {
      block.innerHTML = "";
    } else {
      var link = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
      link.open( 'GET', "/region/settings_cities/" + val + "/", true );
      link.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      link.onreadystatechange = function () {
        if ( link.readyState == 4 ) {
            if ( link.status == 200 ) {
                block.innerHTML = link.responseText;
            }
        }
    };
    link.send( null );
    };
  });

	on('body', 'change', '.left_menu_select_districts', function() {
		_this = this;
		val = _this.value;
		option = _this.nextElementSibling.querySelector('[value=' + '"' + val + '"' + ']')
		slug = option.getAttribute("data-slug");
    if (val == '') {
      return
    } else {
			parent = _this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
			console.log(parent)
			if (parent.classList.contains("municipal_authorities")) {
				url = '/district/elects/'
			}
			else if (parent.classList.contains("organizations")) {
				url = '/district/organizations/'
			}
			else if (parent.classList.contains("communities")) {
				url = '/district/communities/'
			};
      ajax_get_reload(url + slug + "/")
  }});

	on('body', 'change', '.select_federal_authority_list_regions', function() {
    if (this.value == '') {
      return
    } else {
      ajax_get_reload("/list/authority_region/" + this.getAttribute("data-slug") + "/" + this.value + "/")
  }});

	on('body', 'change', '.select_federal_authority_list_okrug', function() {
    if (this.value == '') {
      return
    } else {
      ajax_get_reload("/okrug/elects/" + this.value + "/")
  }});

	on('body', 'click', '.left_menu_select', function() {
		if (this.value) {
			this.value = "";
		} else {
			return
		}
	});

	on('body', 'change', '#left_menu_regions_2', function() {
		_this = this;
		val = _this.value;
		option = _this.nextElementSibling.querySelector('[value=' + '"' + val + '"' + ']')
		slug = option.getAttribute("data-slug");

		if (val == '') {
			return
		} else {ajax_get_reload("/region/" + slug + "/")}
	});

	on('body', 'click', '.recovery_phone_send', function() {
	  block = this.parentElement.parentElement;

		user_phone = block.querySelector("#phone").value;
		_user_phone = user_phone.replace(/[^0-9]/g, '');
		if (_user_phone[0] == "7" || _user_phone[0] == "8") {
		  _user_phone = _user_phone.slice(1)
		};
		phone = block.querySelector("#id_first_number").value + _user_phone;
	 var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
	 request.open( 'GET', "/users/progs/recovery_phone_send/" + phone + "/", true );
	 request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	 request.onreadystatechange = function () {
	   if ( request.readyState == 4 && request.status == 200) {
	     var div = document.getElementById('jsondata');
	     div.innerHTML = request.responseText;
	     if (request.responseText.indexOf("user_does_not_exists") !== -1) {
	       div.innerHTML = 'Пользователь с таким номером не найден. Используйте другой номер.'
	       document.querySelector(".recovery_phone_send").setAttribute("disabled", "true");
	     } else {
	       div.innerHTML = request.responseText;
	     document.querySelector("#phone").setAttribute("disabled", "true");
	     document.querySelector(".recovery_phone_send").setAttribute("disabled", "true");
	   }}}
	 request.send();
	});

	on('body', 'click', '#recover_secret_key', function() {
	    form = this.parentElement.parentElement;
			form_data = new FormData(form);

	    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	    request.open('POST', "/users/progs/secret_key_verify/" + form.getAttribute("data-pk") + "/", true);
	    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    request.onreadystatechange = function() {
	        if (request.readyState == 4 && request.status == 200) {
						if (request.responseText.indexOf("Неверное") !== -1) {form.parentElement.nextElementSibling.innerHTML = request.responseText}
						else {window.location.href = "/users/" + form.getAttribute("data-pk") + "/"}
	        }
	    };
	    request.send(form_data)
	});

	on('body', 'click', '#recover_code_send', function() {
			_this = this;
	    block = _this.parentElement.parentElement;
			user_phone = block.previousElementSibling.querySelector('#phone').value;
			_user_phone = user_phone.replace(/[^0-9]/g, '');
			if (_user_phone[0] == "7" || _user_phone[0] == "8") {
			  _user_phone = _user_phone.slice(1)
			};
			phone = block.previousElementSibling.querySelector('#id_first_number').value + _user_phone;

	    var code = block.querySelector('.block_verify').querySelector('#code').value;
	    var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	    request.open('GET', "/users/progs/recovery_phone_verify/" + phone + "/" + code + "/", true);
			request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    request.onreadystatechange = function() {
	        if (request.readyState == 4 && request.status == 200) {
						if (request.responseText.indexOf("Код подтверждения неверный") !== -1) {block.nextElementSibling.innerHTML = request.responseText}
						else {window.location.href = "/"}
	        }
	    };
	    request.send()
	});

	on('body', 'click', '.elect_search_btn', function() {
		_this = this;
	  field = _this.previousElementSibling;
	   var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
	   request.open( 'GET', "/search/elect_filter/?name=" + field.value, true );
	   request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	   request.onreadystatechange = function () {
	     if ( request.readyState == 4 && request.status == 200) {
	       response = request.responseText;
	       block = document.body.querySelector(".toggle_fixed_block");
				 block.innerHTML = "";
				 block.innerHTML = response;
				 _this.nextElementSibling.style.display = "unset";
				 mobile_menu_close();
				 create_pagination(block);
	     }}
	   request.send();
	 });

	 on('body', 'click', '.search_elect_for_add_elect_new', function() {
 		_this = this;
 	  field = _this.parentElement.previousElementSibling;
		field.style.border = "border: 1px solid #D8D6DE;"
		if (field.value.length > 4) {
 	   var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
 	   request.open( 'GET', "/search/elect_add_elect_new_filter/?name=" + field.value, true );
 	   request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	   request.onreadystatechange = function () {
 	     if ( request.readyState == 4 && request.status == 200) {
 	       response = request.responseText;
 	       block = _this.parentElement.parentElement.nextElementSibling;
 				 block.innerHTML = "";
 				 block.innerHTML = response;
				 scrolled(block)
 	     }}
 	   request.send();
	 } else {toast_info("Поиск работает от пяти символов")}
 	 });

	 on('body', 'click', '.search_elect_for_add_blog', function() {
 		_this = this;
 	  field = _this.parentElement.previousElementSibling;
		field.style.border = "border: 1px solid #D8D6DE;"
		if (field.value.length > 4) {
 	   var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject( 'Microsoft.XMLHTTP' );
 	   request.open( 'GET', "/search/elect_add_blog_filter/?name=" + field.value, true );
 	   request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 	   request.onreadystatechange = function () {
 	     if ( request.readyState == 4 && request.status == 200) {
 	       response = request.responseText;
 	       block = _this.parentElement.parentElement.nextElementSibling;
 				 block.innerHTML = "";
 				 block.innerHTML = response;
				 scrolled(block)
 	     }}
 	   request.send();
	 } else {toast_info("Поиск работает от пяти символов")}
 	 });

function clear_left_search() {
	return
}

	 on('body', 'click', '.search_page_reload', function() {
		 clear_left_search()
		 ajax_get_reload(window.location.href);
		});
