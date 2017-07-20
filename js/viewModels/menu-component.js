define(['knockout'],
	function (ko) {
		function menuModel(context) {
			var self = this;

			//viewmodel code goes here 
			self.selectedMenuItem = ko.observable("(None selected yet)");

			self.currentSelection = ko.observable();

			self.currentState = ko.observable("not connected");
			
			//uses current data to structure the menu
			var menuItems = [
				{
					element: 'Departments',
					route: '/?',
					disable: 'oj-disabled'
				},
				{
					element: 'Dashboard',
					route: '?root=dashboard#dashboard',
					disable: 'oj-disabled'
				},
				{
					element: 'Incidents',
					route: '?root=incidents#incidents',
					disable: 'oj-disabled'
				},
				{
					element: 'Customers',
					route: '?root=customers#customers',
					disable: 'oj-disabled'
				},
				{
					element: 'About',
					route: '?root=about#about',
					disable: 'oj-disabled'
				}
		 ];

			//Listen for event
			document.addEventListener('loggedIn', function(e) {
				//store the route
				let route = e.detail.route;
				//call the checkState event
				//pass in a connected parameter
				checkState('connected');
				//log 
				console.log('rerouting...');
				//open the route in current window
				window.location.replace(route);
			}, false);
						
			///Check the sate of the app
			////if the user is logged in
			///alters the menu accordingly
			var state = self.currentState();

			function checkState(state) {
				console.log('checking state...');
				
				if (state === 'connected') {
					for (var i = 0; i < menuItems.length; i++) {
						menuItems[i].disable = null;
					}
				}
			}

			//call function that checks the state
			checkState(state);

			////////build the menu/////
			function buildMenu(menuArray) {
				console.log('updating menu..');

				self.dataItems = ko.observableArray(menuItems);
			}

			//call function that builds the menu
			buildMenu(menuItems);

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