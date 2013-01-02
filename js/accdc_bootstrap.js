/*!
AccDC Bootstrap R1.0
Copyright 2010-2013 Bryan Garaventa (WhatSock.com)
Part of AccDC, a Cross-Browser JavaScript accessibility API, distributed under the terms of the Open Source Initiative OSI - MIT License
*/

(function(){
	$A.bootstrap = function(context){
		var context = context && context.nodeType === 1 ? context : document;

// Accessible Calendar Pickers
// Parse all A and button tags that include the class 'accCalendar'
// An Input tag with type=text is specified as the return recipient by matching the data-name attribute of the A/Button with the Input tag's Name attribute.
// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setCalendar)
			$A.query('a.accCalendar, button.accCalendar', context, function(i, o){
				var targ = $A.query('input[name="' + $A.getAttr(o, 'data-name') + '"]', context)[0];
				$A.setCalendar(o.id || $A.genId(), o, targ, false, function(ev, dc){
					targ.value = dc.range.wDays[dc.range.current.wDay].lng + ' ' + dc.range[dc.range.current.month].name + ' '
						+ dc.range.current.mDay + ', ' + dc.range.current.year;
					dc.close();
				});
			});

		// Accessible Modals
		// Parse all A and Button tags that include the class 'accModal'
		// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setModal)
			$A.query('a.accModal, button.accModal', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), cid = $A.getEl($A.getAttr(o, 'data-internal'));

				if (cid || p)
					$A.setModal(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									role: $A.getAttr(o, 'data-role') || 'Modal',
									source: cid && cid.nodeType === 1 ? cid.parentNode.removeChild(cid) : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									trigger: o,
									runAfter: function(dc){
										// Run script every time after the content completes rendering

										// Configure specific controls when detected
										$A.getScript('js/config/modals.js');
									}
									});
			});

		// Accessible Popups
		// Parse all A and Button tags that include the class 'accPopup'
		// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setPopup)
			$A.query('a.accPopup, button.accPopup', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), cid = $A.getEl($A.getAttr(o, 'data-internal')),
					autoPosition = parseInt($A.getAttr(o, 'data-autoposition')),
					offsetLeft = parseInt($A.getAttr(o, 'data-offsetleft')), offsetTop = parseInt($A.getAttr(o, 'data-offsettop'));

				if (cid || p)
					$A.setPopup(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									role: $A.getAttr(o, 'data-role') || 'Popup',
									source: cid && cid.nodeType === 1 ? cid.parentNode.removeChild(cid) : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									trigger: o,
									autoPosition: isNaN(autoPosition) ? 3 : autoPosition,
									offsetLeft: isNaN(offsetLeft) ? 10 : offsetLeft,
									offsetTop: isNaN(offsetTop) ? -20 : offsetTop
									});
			});

		// Accessible Tooltips
		// Parse all A and Button tags that include the class 'accTooltip'
		// A and Button tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setTooltip)
			$A.query('a.accTooltip, button.accTooltip', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), cid = $A.getEl($A.getAttr(o, 'data-internal')),
					autoPosition = parseInt($A.getAttr(o, 'data-autoposition')),
					offsetLeft = parseInt($A.getAttr(o, 'data-offsetleft')), offsetTop = parseInt($A.getAttr(o, 'data-offsettop'));

				if (cid || p)
					$A.setTooltip(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									role: $A.getAttr(o, 'data-role') || 'Tooltip',
									source: cid && cid.nodeType === 1 ? cid.parentNode.removeChild(cid) : p.replace('#', ' #'),
									mode: cid && cid.nodeType === 1 ? 0 : null,
									trigger: o,
									autoPosition: isNaN(autoPosition) ? 3 : autoPosition,
									offsetLeft: isNaN(offsetLeft) ? 10 : offsetLeft,
									offsetTop: isNaN(offsetTop) ? 0 : offsetTop
									});
			});

		// Accessible Banners
		// Parse all Div tags that include the class 'accBanner'
		if ($A.setBanner)
			$A.query('div.accBanner', context, function(i, o){
				var p = $A.getAttr(o, 'data-src');

				if (p)
					$A.setBanner(
									{
									// Set the ID of the AccDC Object to match the ID of the triggering element.
									id: o.id,
									role: $A.getAttr(o, 'data-role') || 'Banner',
									source: p.replace('#', ' #'),
									// Insert the banner content within the div
									isStatic: o,
									// Clear inline styling and prevent auto positioning, to use a style sheet instead
									cssObj: {},
									autoFix: 0,
									// Configure a mouse event handler for the AccDC Object
									mouseOut: function(ev, dc){
										// Remove this if you don't want to close the banner onMouseOut
										dc.close();
									}
									});
			});

		// Accessible Accordions
		// Parse all Div tags that include the class 'accAccordion'
		if ($A.generateAccordion)
			$A.query('div.accAccordion', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), d = $A.getAttr(o, 'data-defaultopen');

				if (p)
					$A.generateAccordion(o, p, d === '' ? '' : parseInt(d),
									{
									role: $A.getAttr(o, 'data-role') || 'Accordion',
									tabRole: $A.getAttr(o, 'data-tabrole') || 'Accordion',
									tabState: $A.getAttr(o, 'data-tabstate') || 'Open'
									});
			});

		// Accessible Carousels/Slideshows
		// Parse all Div tags that include the class 'accCarousel'
		if ($A.setCarousel)
			$A.query('div.accCarousel', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), d = $A.getAttr(o, 'data-defaultopen');

				if (p)
					$A.setCarousel(o, p, d,
									{
									complete: function(dc){
									// Placeholder, triggers after a slide completes loading.
									},
									btnPrev: function(ev, dc){
									// Placeholder, triggers whenever a Previous button is activated.
									},
									btnNext: function(ev, dc){
									// Placeholder, triggers whenever a Next button is activated.
									},
									btnPrevG: function(ev, dc){
									// Placeholder, triggers whenever a Previous Group button is activated.
									},
									btnNextG: function(ev, dc){
									// Placeholder, triggers whenever a Next Group button is activated.
									}
									});
			});

		// Accessible Trees
		// Parse all Div tags that include the class 'accTree'
		if ($A.setTree)
			$A.query('div.accTree', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), t = $A.getAttr(o, 'data-type');

				if (p){

					// Configure custom functionality based on the value of data-type
					if (t == 'google-map')
						// Add supporting components
						$A.getScript('js/config/google.js');

					$A.setTree(
									{
									id: o.id,
									path: p,
									title: $A.getAttr(o, 'data-label') || 'TreeView',
									container: o,
									/* More optional overrides
									treeTag: 'ul',
									treeClass: 'branch',
									treeItemTag: 'li',
									treeItemClass: 'leaf',
									topClass: 'TreeView',
									*/
									bind: 'focus',
									callback: function(ev, dc){
										// Triggers whenever the above 'bind' event is fired on each focusable tree node.

										// Configure custom functionality based on the value of data-type
										if (t == 'google-map'){
											if (dc.tmp)
												clearTimeout(dc.tmp);
											var i = $A.inArray(this, dc.tree.childNodes), lat = dc.xmlNodes[i].attributes.getNamedItem('lat').nodeValue,
												lng = dc.xmlNodes[i].attributes.getNamedItem('lng').nodeValue,
												zoom = dc.xmlNodes[i].attributes.getNamedItem('zoom').nodeValue;
											// Use setTimeout to prevent process stacking when using the arrow keys to navigate
											dc.tmp = setTimeout(function(){
												// Call the 'set' method in the Google Map AccDC Object using its "id" property (in google.js)
												$A.reg.map.google.set(lat, lng, zoom);
											}, 1000);
										}
									}
									});
				}
			});

		// Accessible Menus
		// Parse all A and Button tags that include the class 'accMenu'
		// Button and A tags were chosen because they are always active elements, to ensure keyboard accessibility.
		if ($A.setMenu)
			$A.query('button.accMenu, a.accMenu', context, function(i, o){
				var p = $A.getAttr(o, 'data-src'), cid = $A.getAttr(o, 'data-internal');

				if (cid || p)
					$A.setMenu(o, cid || p.substring(0, p.indexOf('#')), cid ? p : p.substring(p.indexOf('#') + 1),
						function(ev, domNode){
						// Do something with the DOM node when it is activated
						// E.G
						// top.location.href = $A.getAttr(this, 'data-href');
						alert(domNode.id);
					}, cid ? true : false, context);
			});

		// Accessible Tabs
		// Parse all tags that include the class 'accTab' (Recommended A, DIV, SPAN, or LI tags)
		if ($A.setTabs){
			var track = {};
			$A.query('.accTab', context, function(i, o){
				var g = $A.getAttr(o, 'data-group');

				if (g){
					if (!track[g])
						track[g] = [];
					track[g].push(o);
				}
			});

			for (n in track){
				$A.setTabs(track[n],
								{
								preload: true,
								preloadImages: true,
								toggleClass: 'active',
								ariaLevel: 2
								}, true, context, function(dc){
				// Optionally perform an action after each tab finishes rendering.
				// dc.containerDiv is the DOM node that contains the newly loaded content,
				// and dc.triggerObj is the triggering element.
				// dc is an AccDC Object, and all AccDC API properties and methods apply.
				// E.G dc.close() will close the tab.
				});
			}
		}
	};

	$A.bind(window, 'load', $A.bootstrap);
})();