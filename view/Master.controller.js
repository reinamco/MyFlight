jQuery.sap.require("sap.ui.demo.myFiori.util.Formatter");
jQuery.sap.require("sap.ui.demo.myFiori.util.Grouper");

sap.ui.controller("sap.ui.demo.myFiori.view.Master", {

//  Add Item Press Handler
	handleListItemPress : function (evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	}, // "," -> Important
	
//  Add Search Handler	
    handleSearch : function (evt) { 
    	// create model filter 
    	var filters = []; 
    	var query = evt.getParameter("query"); 
    	if (query && query.length > 0) { 
    		var filter = new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, query);
            filters.push(filter); 
        } 
    	
    	// update list binding 
    	var list = this.getView().byId("List"); 
    	var binding = list.getBinding("items"); 
    	binding.filter(filters); 
    },

//  Add List Select Handler
    handleListSelect : function (evt) { 
    	var context = evt.getParameter("listItem").getBindingContext(); 
    	this.nav.to("Detail", context); 
    },

//  Add Group Handler
    handleGroup : function (evt) { 
    	// compute sorters 
    	var sorters = []; 
    	var item = evt.getParameter("selectedItem"); 
    	var key = (item) ? item.getKey() : null; 
    	if ("distance" === key) { 
    	sap.ui.demo.myFiori.util.Grouper.bundle = this.getView().getModel("i18n").getResourceBundle(); 
    	var grouper = sap.ui.demo.myFiori.util.Grouper[key]; 
    	sorters.push(new sap.ui.model.Sorter(key, true, grouper)); 
    	} 
    	// update binding 
    	var list = this.getView().byId("List"); 
    	var oBinding = list.getBinding("items"); 
    	oBinding.sort(sorters);
    }
});