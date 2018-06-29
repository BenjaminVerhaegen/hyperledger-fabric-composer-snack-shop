(function (window, $, undefined) {
	'use strict';

	if ($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		Callout = X4e.Callout || (X4e.Callout = {});


	$.extend(true, Callout, {
		Selectors: {
			callout: '.callout'
		},
		Classes: {
			hidden: 'is-hidden',
			active: 'is-active'
		},
		Options: {
			duration: 5000
		},
		instances: [],
		init: function () {
			this.$callout = $(this.Selectors.callout);
			this.runCallout('<p>blub</p>', 'alert');
		},
		appendText: function (textToAdd) {
			this.$callout.append(textToAdd);
		},
		runCallout: function (message, type) {
			this.appendText(message);
			this.$callout.addClass(type);
			this.$callout.removeClass(this.Classes.hidden);
			this.$callout.delay(this.Options.duration).fadeOut('slow');
		}
	});

	window.X4e = X4e;

})(this, jQuery);

(function (window, $, undefined) {
	'use strict';

	if ($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		MobileNavigation = X4e.MobileNavigation || (X4e.MobileNavigation = {});


	$.extend(true, MobileNavigation, {
		Selectors: {
			openIcon: '.open-mobile-nav',
			closeIcon: '.close-mobile-nav',
			mobileNav: '.mod_mobile-navigation'
		},
		Classes: {
			hidden: 'is-hidden'
		},
		instances: [],
		init: function () {
			this.$openIcon = $(this.Selectors.openIcon);
			this.$closeIcon = $(this.Selectors.closeIcon);
			this.$mobileNav = $(this.Selectors.mobileNav);
			this.$openIcon.on('click', $.proxy(this, 'onOpenIconClick'));
			this.$closeIcon.on('click', $.proxy(this, 'onCloseIconClick'));
		},
		onOpenIconClick: function () {
			this.$mobileNav.toggleClass(this.Classes.hidden);
			this.$openIcon.toggleClass(this.Classes.hidden);
			this.$closeIcon.toggleClass(this.Classes.hidden);
		},
		onCloseIconClick: function () {
			this.$mobileNav.toggleClass(this.Classes.hidden);
			this.$openIcon.toggleClass(this.Classes.hidden);
			this.$closeIcon.toggleClass(this.Classes.hidden);
		}
	});

	window.X4e = X4e;

})(this, jQuery);
(function (window, $, undefined) {
	'use strict';

	if ($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		Select2 = X4e.Select2 || (X4e.Select2 = {});


	$.extend(true, Select2, {
		Selectors: {
			select2: '.select-2_select'
		},
		instances: [],
		init: function () {
			this.$select2 = $(this.Selectors.select2);
			this.$select2.select2();
		}
	});

	window.X4e = X4e;

})(this, jQuery);
(function (window, $, undefined) {
	'use strict';

	if ($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		Set = X4e.Set || (X4e.Set = {});


	$.extend(true, Set, {
		Selectors: {
			openIcon: '.open-set-info',
			closeIcon: '.close-set-info',
			setInfo: '.list_detail',
		},
		Classes: {
			hidden: 'is-hidden'
		},
		instances: [],
		init: function () {
			this.$openIcon = $(this.Selectors.openIcon);
			this.$closeIcon = $(this.Selectors.closeIcon);
			this.$setInfo = $(this.Selectors.setInfo);
			this.$openIcon.on('click', $.proxy(this, 'onOpenIconClick'));
			this.$closeIcon.on('click', $.proxy(this, 'onCloseIconClick'));
		},
		onOpenIconClick: function (ev) {
			var $setID = ev.target.dataset.setDetailId;
			var $setInfoToOpen = $(".mod_list").find("[data-set-id='" + $setID + "']");
			var $allListDetail = $(".mod_list").find('.list_detail');

			$allListDetail.each(function() {
				if (!$(this).hasClass('is-hidden')) {
					$(this).addClass('is-hidden');
				}
			});

			$setInfoToOpen.toggleClass(this.Classes.hidden);
		},
		onCloseIconClick: function (ev) {
			var $setID = ev.target.dataset.setDetailId;
			var $setInfoToClose = $(".mod_list").find("[data-set-id='" + $setID + "']");
			$setInfoToClose.toggleClass(this.Classes.hidden);
		}
	});

	window.X4e = X4e;

})(this, jQuery);
(function (window, $, undefined) {
	'use strict';

	if ($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		ShoopingList = X4e.ShoopingList || (X4e.ShoopingList = {});


	$.extend(true, ShoopingList, {
		Selectors: {
			shopping_list_item: '.mod_table.var_shopping-list td'
		},
		Classes: {
			deactivated: 'is-deactivated'
		},
		instances: [],
		init: function () {
			this.$shopping_list_item = $(this.Selectors.shopping_list_item);
			this.$shopping_list_item.on('click', $.proxy(this, 'onShoppingListItemTouch'));
			this.$shopping_list_item.on('touchstart', $.proxy(this, 'onShoppingListItemTouch'));
			this.$shopping_list_item.on('touchend', $.proxy(this, 'onShoppingListItemTouch'));
			this.$shopping_list_item.on('touchmove', $.proxy(this, 'onShoppingListItemTouch'));
		},
		onShoppingListItemTouch: function (ev) {
			$(ev.target).parent().toggleClass(this.Classes.deactivated);
		}
	});

	window.X4e = X4e;

})(this, jQuery);
(function (window, $, undefined) {
	'use strict';

	if($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {};

	$(function(){
        $(document).foundation();
        X4e.MobileNavigation.init();
        X4e.Set.init();
        X4e.Select2.init();
        X4e.ShoopingList.init();
        X4e.Callout.init();
	});

}) (window, jQuery);