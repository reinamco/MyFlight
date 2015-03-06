jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.controller("sap.ui.demo.myFiori.view.LineItem", {

	onInit : function() {
		this.getView().setModel(new sap.ui.model.json.JSONModel(), "newBooking");
	},

	HandlEvent : function (evt)
	{
		var oView = this.getView();
		var oProperty = oView.getBindingContext().getProperty();
		
		var mData = {};
		mData.Carrid = oProperty.carrid;
		mData.Connid = oProperty.connid;
		//Format 2015-06-24T00:00:00 can be used, Notice the date format must be YYYY-MM-DDTHH:MM:SS – where the –, T and : characters are fixed separators.
		mData.Fldate = oProperty.fldate; // No need to convert, just use it

		mData.CustomerID = oView.byId("idCustomerID").getValue();
		mData.Agency = oView.byId("idAgency").getValue();
		mData.Passenger = oView.byId("idPassenger").getValue();

		var mNew = 
		{
			"carrid": mData.Carrid,
			"connid": mData.Connid,
			"fldate": mData.Fldate,
			"customid": mData.CustomerID,
			"agencynum": mData.Agency,
			"passname": mData.Passenger,
		};
		
		var oModel = this.getView().getModel();
		
		if ("LineItem--Booking" === evt.mParameters.id)
		{
            //Booking + CREATE_ENTITY
			oModel.create("/Bookings", mNew, { 
				success: jQuery.proxy(function(mResponse) 
				{ 
					oModel.refresh();
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("Successfully Booking,BookID is " + mResponse.bookid);
					this.nav.back("Detail");
				}, 
				this), 
				error: jQuery.proxy(function() { 
					alert("Problem when doing new booking, please check your input"); 
				}, 
				this)
			});			
		}
		else if("LineItem--TemplateCreate" === evt.mParameters.id)
		{
            //UserBooking + CREATE_ENTITY
			oModel.create("/UserBookings", mNew, { 
				success: jQuery.proxy(function(mResponse) 
				{ 
					oModel.refresh();
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("Successfully Saving Template");
					this.nav.back("Detail");
				}, 
				this), 
				error: jQuery.proxy(function() { 
					alert("Problem when doing template saving, please check your input"); 
				}, 
				this)
			});	
		}
	},	
	
	onBooking : function (evt) 
	{
		this.HandlEvent(evt);
	},

	onTemplateCreate : function (evt) 
	{ 
		this.HandlEvent(evt);
	},
	
	onCancel : function (evt) 
	{ 
		this.nav.back("Detail"); 
	}
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.LineItem
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.LineItem
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.LineItem
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.LineItem
*/
//	onExit: function() {
//
//	}
});