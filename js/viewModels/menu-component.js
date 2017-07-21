define(['knockout'],
	function (ko) {
		function menuModel(context) {
			var self = this;

			//viewmodel code goes here 
			self.selectedMenuItem = ko.observable("(None selected yet)");

			self.currentSelection = ko.observable();

			self.currentState = ko.observable("not connected");
			
			self.dataItems = ko.observableArray([]);
			
			var menu = [];
			
			context.props.then( function(properties){
				if (properties.menuitems) {
					menu.push({
						items: properties.menuitems
					});
				}
	
				//build menu
				self.dataItems(menu[0].items);
			});

			var event = new CustomEvent('loggedIn', {detail: {deviceName: 'value', nextRoute: 'about'}});
			
			//Listen for event
			document.addEventListener('loggedIn', function(e) {
				let currentRoute = e.detail.nextRoute;
				
				//store the route
				let route = '?root='+currentRoute+'#'+currentRoute;
				
				//call the checkState event
				//pass in a connected parameter
				checkState('connected');
				
				//log 
				console.log('rerouting...');
				
				//open the route in current window
				//call function that checks the state
				//window.location.replace(route);
			}, false);
			
			document.dispatchEvent(event);
			
			////////build the menu/////
			function buildMenu(menuArray) {
				console.log('updating menu..');
				self.dataItems(menuArray);
			}
				
			function checkState(state) {
				console.log('checking state...');
				let newMenu = [];
				
				if (state === 'connected') {
					for (var i = 0; i < menu.length; i++) {
						newMenu.push(menu[0].items);
						newMenu.disable = null;
					}
				}
				
				//console.log(newMenu);
				buildMenu(newMenu);
			}
			
			self.menuItemSelect = function (event, ui) {
				self.selectedMenuItem(ui.item.children('a')[0].getAttribute('href'));

				//stores the selected menu item
				let selectedItem = self.selectedMenuItem;
				//open the current url 
				window.location.replace(selectedItem());
			};
		}
		return menuModel;
	});