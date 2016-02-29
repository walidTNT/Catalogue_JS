function cart( email ) {
	this.totalItems 	= 0;
	this.totalPrice	= 0.00;
	this.items 		= new Array();
	this.userEmail = email;
	this.ItemColumns = ['Image','Name','Price','Description','Weight','Code'];
	
	/*	Initialization  */
	this.initialize = function () {

		this.totalItems = data[0]*1;
		this.totalPrice = data[1]*1;
		for(x = 2; x < (data.length); x++) {
			newItem = new item();
			itemData = data[x].split(",");
			i = 0;

			for(i = 0; i < itemData.length; i++) {
				pair = itemData[i].split('=');
				newItem.addValue(pair[0],pair[1]);
			}
			this.items[x-2] = newItem;
		}
		return;
	};

	this.checkOutEvent = function() {
		simpleCart.checkOut();
		return false;
	};
	
	this.emptyEvent = function() {
		simpleCart.empty();
		return false;
	};

	this.setUpEvents = function() {
			var x = 0, element, elements = getElementsByClassName('simpleCart_total');

			x = 0;
			elements = getElementsByClassName('simpleCart_checkout');
			for( x = 0 ;x < elements.length; x++) {
				element = elements[x];
				if( element.addEventListener ) {
					element.addEventListener("click", this.checkOutEvent, false );
				} else if( element.attachEvent ) {
				  	element.attachEvent( "onclick", this.checkOutEvent );
				}
			}
			x = 0;
			elements = getElementsByClassName('simpleCart_empty');
			for( x = 0; x < elements.length; x++) {
				element = elements[x];
				if( element.addEventListener ) {
					element.addEventListener("click", this.emptyEvent, false );
				} else if( element.attachEvent ) {
				  	element.attachEvent( "onclick", this.emptyEvent );
				}
			}
			return;
	};

	this.add = function() {
		newItem = new item();
		var x = 0;

		for(x = 0; x < arguments.length; x++){
			temp = arguments[x];
			data = temp.split('=');
			newItem.addValue(data[0],data[1]);
		}
		isnew = true;
		if(!newItem.getValue('quantity')) {
			newItem.addValue('quantity',1);
		}
		this.totalItems = this.totalItems + newItem.getValue('quantity');
		x = 0;
		for( x = 0; x < this.items.length; x++ ) {
			tempItem = this.items[x];
			if( tempItem.equalTo(newItem) ) {
				tempItem.addValue( 'quantity' , (parseInt(tempItem.getValue('quantity')) + parseInt(newItem.getValue('quantity')) ) );
				this.totalPrice = this.totalPrice + parseFloat( tempItem.getValue('price') );
				isnew = false;
			}
		}
		if( isnew ) {
			this.items[this.items.length] = newItem;
			this.totalPrice = this.totalPrice + parseFloat(newItem.getValue('price'));
		}
		return;
	};
	
	this.addItem = function(newItem) {
		var x = 0;

		for(x = 0; x < this.items.length; x++) {
			var tempItem = this.items[x];

			if( tempItem.equalTo(newItem) ){
				tempItem.addValue('quantity', parseInt(newItem.getValue('quantity')) + parseInt(tempItem.getValue('quantity')) );
				this.totalItems = this.totalItems + parseInt(newItem.getValue('quantity'));
				this.totalPrice = this.totalPrice + parseInt(newItem.getValue('quantity')) * parseFloat(newItem.getValue('price'));
				return;
			}
		}
		this.items[this.items.length] = newItem;
		this.totalItems = this.totalItems + parseInt(newItem.getValue('quantity'));
		this.totalPrice = this.totalPrice + parseInt(newItem.getValue('quantity')) * parseFloat(newItem.getValue('price'));
		return;
	};

	this.empty = function () {
		this.items = new Array();
		this.totalItems = 0;
		this.totalPrice = 0.00;
		return false;
	};

	this.deleteItem = function( item ) {  
		found = false;
		var temp = new Array();
		for(x=0; x < this.items.length;x++ ) {
			tempItem = this.items[x];		
			if( tempItem.equalTo(item) ) {
				found = true;
				this.totalItems = this.totalItems - parseFloat(tempItem.getValue('quantity'));
				this.totalPrice = this.totalPrice - parseFloat(tempItem.getValue('price'));
			}
			if( found ) {
				if( x < ( this.items.length - 1 ) ) {
					temp[x] = this.items[x+1];
				} 
			} else {
				temp[x] = this.items[x];
			}
		}
		this.items = temp;
		return false;
	};

}

function item () {
	this.names	= new Array();
	this.values	= new Array();

	this.addValue = function(name,value) {
		found = false;
		var a = 0;

		for(a = 0; a < this.names.length; a++) {
			if( this.names[a] == name ) {
				this.values[a] = value;
				return;
			}
		}
		if( !found ) {
			this.names[this.names.length]	= name;
			this.values[this.values.length]	= value;
		}
		return;
	};

	this.getValue = function(name) {
		var g = 0;

		for(g = 0; g < this.names.length; g++) {
			if(name == this.names[g]) {
				return this.values[g];
			}
		}
		return null;
	};
}


function createCart(){
	simpleCart.initialize();
	return;
}

window.onload = createCart;