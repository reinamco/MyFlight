sap.ui.controller("sap.ui.demo.myFiori.view.MyLineItem", {

	onInit : function() {
		this.getView().setModel(new sap.ui.model.json.JSONModel(), "updateBooking");
	},	

    onBeforeRendering: function() {
/*    	var oView = this.getView();
    	oView.byId("idCustomerID").mProperties.editable  = true;
    	oView.byId("idAgency").mProperties.editable      = true;
    	oView.byId("idPassenger").mProperties.editable   = true;
    	oView.byId("Booking").mProperties.visible        = true;
    	oView.byId("TemplateUpdate").mProperties.visible = true;
    	oView.byId("TemplateDelete").mProperties.visible = true;
*/
    },	
    
	HandlEvent : function (evt)
	{
		var oView = this.getView();
		var oProperty = oView.getBindingContext().getProperty();
		
		var mData = {};
		mData.Carrid = oProperty.carrid;
		mData.Connid = oProperty.connid;
		mData.Sequence = oProperty.sequence;
		mData.Uname  = oProperty.uname;
		mData.Fldate = oProperty.fldate;
		
		mData.CustomerID = oView.byId("idCustomerID").getValue();
		mData.Agency = oView.byId("idAgency").getValue();
		mData.Passenger = oView.byId("idPassenger").getValue();
		
		var oModel = this.getView().getModel();
		
		if ("MyLineItem--Booking" === evt.mParameters.id)
		{
			//UserBooking + CREATE_ENTITY - Booking
			
			var mNew = 
			{
			    "carrid": mData.Carrid,
				"connid": mData.Connid,
				"sequence": mData.Sequence,
				"uname": mData.Uname,
				"customid": mData.CustomerID,
				"agencynum": mData.Agency,
				"passname": mData.Passenger,
			};			
			
			oModel.create("/UserBookings", mNew, { 
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
		else if("MyLineItem--CancelBooking" === evt.mParameters.id)
		{
			//UserBooking + EXECUTE_ACTION - CancelBooking
		}
		else if("MyLineItem--TemplateUpdate" === evt.mParameters.id)
		{
			//UserBooking + UPDATE_ENTITY
			var mUpdate = 
			{
				"carrid": mData.Carrid,
				"connid": mData.Connid,
				"sequence": mData.Sequence,
				"uname": mData.Uname,
				"customid": mData.CustomerID,
				"agencynum": mData.Agency,
				"passname": mData.Passenger,
			};
			
			oModel.update("/UserBookings(carrid='" + oProperty.carrid 
					+ "',connid='" + oProperty.connid
					+ "',sequence='" + oProperty.sequence
					+ "',uname='" + oProperty.uname + "')", mUpdate, { 
				success: jQuery.proxy(function(mResponse) 
				{ 
					oModel.refresh();
					jQuery.sap.require("sap.m.MessageToast");
					sap.m.MessageToast.show("Successfully Updating Template");
					this.nav.back("Detail");
				}, 
				this), 
				error: jQuery.proxy(function() { 
					alert("Problem when doing template updating, please check your input"); 
				}, 
				this)
			});
		}
		else if("MyLineItem--TemplateDelete" === evt.mParameters.id)
		{
			//UserBooking + DELETE_ENTITY
			oModel.remove("/UserBookings(carrid='" + oProperty.carrid 
					+ "',connid='" + oProperty.connid
					+ "',sequence='" + oProperty.sequence
					+ "',uname='" + oProperty.uname + "')", null, 
					function(){ 
						oModel.refresh();
						jQuery.sap.require("sap.m.MessageToast");
						sap.m.MessageToast.show("Successfully Deleting Template");
				    }, 
				    function()
				    {
				    	alert("Problem when doing template deleting, please try again"); 
				    });
			//Just back without checking the result of deleting
			this.nav.back("Detail");
		}
	},	
	
	onBooking : function (evt) 
	{
		this.HandlEvent(evt);
	},
	
	onTemplateUpdate : function (evt) 
	{ 
		this.HandlEvent(evt);
	},
	
	onTemplateDelete : function (evt) 
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
* @memberOf view.NoteItem
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.NoteItem
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.NoteItem
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.NoteItem
*/
//	onExit: function() {
//
//	}

});