var project;
var mask;
var maskTop;
var diameter;
var screenHeight;
var screenWidth;
var image;
var scale;
var scaleTop;
var scaleAngle;
var activeProj;
var textActiveX;
var textActiveY;
var textX;
var textTopY;
var textBottomY;
var textWidth;

$(document).ready(function() {
	scale = $(".project__scale-overlay");
	// выбираем ширину пользовательского экрана, но не меньше 1200px
	screenWidth = (function() {
		if(window.innerWidth > 1200) {
			return window.innerWidth;
		} else {
			return 1200;
		}
	})();
	// выбираем высоту пользовательского экрана
	screenHeight = window.innerHeight;
	// расчитываем диаметр окружности в зависимости от соотношения высоты и ширины экрана
	diameter = parseInt(Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2))) * 0.9;
	// расчитываем верхнюю точку, что бы изображение было по центру
	maskTop = (parseInt(diameter * 0.95 / 2) - screenHeight / 2) * -1 + "px";
	//выбираем текущее изображение
	image = $(".project__image").children(0).children(0);
	// выбираем маску
	mask = $(".project__image-mask");
	// выбираем весь контейнер
	project = $(".project");
	// при загрузке задаем размеры изображения
	image.css("height", screenHeight * 1.3 + "px").css("width", parseInt($(".project__demonstration").css("width").slice(0, $(".project__demonstration").css("width").indexOf("px"))) * 3 + "px");
	// при загрузке высчитываем размер маски, высота которой рана 90% диаметра и позиционируем, что бы фото было по центру
	mask.css("width", diameter * 0.95 + "px").css("height", diameter * 0.95 + "px").css("top", maskTop);
	// задаем необходимую высоту для главного контейнера;
	project.css("height", window.innerHeight);

	scaleTop = parseInt(diameter / 2  - screenHeight / 2) * -1 + "px";
	scaleAngle = -225;
	scale.css("width", diameter + "px").css("height", diameter + "px").css("top", scaleTop).css("transform", "rotate("+scaleAngle+"deg)");

	$(window).resize(function() {
		screenWidth = (function() {
			if(window.innerWidth > 1200) {
				return window.innerWidth;
			} else {
				return 1200;
			}
		})();
		screenHeight = window.innerHeight;

		diameter = parseInt(Math.sqrt(Math.pow(screenWidth, 2) + Math.pow(screenHeight, 2))) * 0.9;
		maskTop = (parseInt(diameter * 0.95 / 2) - screenHeight / 2) * -1 + "px";
		scaleTop = parseInt(diameter / 2  - screenHeight / 2) * -1 + "px";

		project.css("height", window.innerHeight);
		image.css("height", screenHeight * 1.3 + "px").css("width", parseInt($(".project__demonstration").css("width").slice(0, $(".project__demonstration").css("width").indexOf("px"))) * 3);

		mask.css("width", diameter * 0.95 + "px").css("height", diameter * 0.95 + "px").css("top", maskTop);
		scale.css("width", diameter + "px").css("height", diameter + "px").css("top", scaleTop);
		console.log("working");
	});

	// Функция для добавления обработчика событий
  function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    }
    else if (object.attachEvent) {
      object.attachEvent('on' + event, handler);
    }
    else alert("Обработчик не поддерживается");
  }
  // Добавляем обработчики для разных браузеров
  addHandler(window, 'DOMMouseScroll', wheel);
  addHandler(window, 'mousewheel', wheel);

	activeProj = $(".project__item--active");
	// Расчет координат названий проекта

	textWidth = parseInt(activeProj.css("width").slice(0, activeProj.css("width").indexOf("px")));
	textActiveX = "20px";
	textActiveY = parseInt(screenHeight / 2 - 15) + "px";
	textX = "-10px";
	textTopY = parseInt(screenHeight / 4 - 15) + "px";
	textBottomY = parseInt(screenHeight / 4 * 3 - 15) + "px";

	activeProj.css("top", textActiveY).css("left", textActiveX);
	activeProj.prev().css("top", textTopY).css("left", textX);
	activeProj.next().css("top", textBottomY).css("left", textX);

  // Функция, обрабатывающая событие
  function wheel(event) {
		if(scaleAngle > -225 && scaleAngle < 0) {
			var delta; // Направление колёсика мыши
			event = event || window.event;
			// Opera и IE работают со свойством wheelDelta
			if (event.wheelDelta) { // В Opera и IE
				delta = event.wheelDelta / 120;
				// В Опере значение wheelDelta такое же, но с противоположным знаком
				if (window.opera) delta = -delta; // Дополнительно для Opera
			}
			else if (event.detail) { // Для Gecko
				delta = -event.detail / 3;
			}
			// Запрещаем обработку события браузером по умолчанию
			if (event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if(delta == -1) {
				scaleAngle -= 45;
				activeProj.removeClass("project__item--active").addClass("project__item--top").prev().removeClass("project__item--top").addClass("project__item--hidden-top").next().next().removeClass("project__item--bottom").addClass("project__item--active").next().removeClass("project__item--hidden-bottom").addClass("project__item--bottom");
				activeProj = $(".project__item--active");
				activeProj.css("top", textActiveY).css("left", textActiveX);
				activeProj.prev().css("top", textTopY).css("left", textX).prev().css("top", "-20px").css("left", "-66px");
				activeProj.next().css("top", textBottomY).css("left", textX).next().css("top", screenHeight - 34 + "px").css("left", "-66px");
			} else {
				scaleAngle += 45;
				activeProj.removeClass("project__item--active").addClass("project__item--bottom").next().removeClass("project__item--bottom").addClass("project__item--hidden-bottom").prev().prev().removeClass("project__item--top").addClass("project__item--active").prev().removeClass("project__item--hidden-top").addClass("project__item--top");
				activeProj = $(".project__item--active");
				activeProj.css("top", textActiveY).css("left", textActiveX);
				activeProj.next().css("top", textBottomY).css("left", textX).next().css("top", screenHeight - 34 + "px").css("left", "-66px");
				activeProj.prev().css("top", textTopY).css("left", textX).prev().css("top", "-20px").css("left", "-66px");
			};
			scale.css("transform", "rotate("+scaleAngle+"deg)");
			console.log(delta); // Выводим направление колёсика мыши
		} else if(scaleAngle == -225) {
			var delta; // Направление колёсика мыши
			event = event || window.event;
			// Opera и IE работают со свойством wheelDelta
			if (event.wheelDelta) { // В Opera и IE
				delta = event.wheelDelta / 120;
				// В Опере значение wheelDelta такое же, но с противоположным знаком
				if (window.opera) delta = -delta; // Дополнительно для Opera
			}
			else if (event.detail) { // Для Gecko
				delta = -event.detail / 3;
			}
			// Запрещаем обработку события браузером по умолчанию
			if (event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if(delta == 1) {
				scaleAngle += 45;
				activeProj.removeClass("project__item--active").addClass("project__item--bottom").prev().removeClass("project__item--top").addClass("project__item--active").prev().removeClass("project__item--hidden-top").addClass("project__item--top");
				activeProj = $(".project__item--active");
				activeProj.css("top", textActiveY).css("left", textActiveX);
				activeProj.prev().css("top", textTopY).css("left", textX);
				activeProj.next().css("top", textBottomY).css("left", textX);
			};
			scale.css("transform", "rotate("+scaleAngle+"deg)");
			console.log(delta); // Выводим направление колёсика мыши
		} else if(scaleAngle == 0) {
			var delta; // Направление колёсика мыши
			event = event || window.event;
			// Opera и IE работают со свойством wheelDelta
			if (event.wheelDelta) { // В Opera и IE
				delta = event.wheelDelta / 120;
				// В Опере значение wheelDelta такое же, но с противоположным знаком
				if (window.opera) delta = -delta; // Дополнительно для Opera
			}
			else if (event.detail) { // Для Gecko
				delta = -event.detail / 3;
			}
			// Запрещаем обработку события браузером по умолчанию
			if (event.preventDefault) event.preventDefault();
			event.returnValue = false;
			if(delta == -1) {
				scaleAngle -= 45;
				activeProj.removeClass("project__item--active").addClass("project__item--top").next().removeClass("project__item--bottom").addClass("project__item--active").next().removeClass("project__item--hidden-bottom").addClass("project__item--bottom");
				activeProj = $(".project__item--active");
				activeProj.css("top", textActiveY).css("left", textActiveX);
				activeProj.prev().css("top", textTopY).css("left", textX);
				activeProj.next().css("top", textBottomY).css("left", textX);
			};
			scale.css("transform", "rotate("+scaleAngle+"deg)");
			console.log(delta); // Выводим направление колёсика мыши
		};
  };

	// $(window).addEventListener("") {
		// scaleAngle += 45;
		// mask.css("transform", "rotate("+scaleAngle+")");
	// 	console.log("scrolling");
	// });
});
