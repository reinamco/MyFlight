//Import the required package?
jQuery.sap.declare("sap.ui.demo.myFiori.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.myFiori.Component", {

	metadata : 
	{
		/*name : "sap.ui.demo.myFiori",
        version : "1.0",
        includes : [],
        dependencies : {
            libs : ["sap.m", "sap.ui.layout"],
            components : []
        },
        */
	
	    // Very important!!!
	    // you would just be returning a fresh instantiation, 
	    // then you should avoid using the createContent function, 
	    // and instead, specify the view as shown here, 
        // using the rootView metadata parameter. The component itself will then take care of the instantiation.
	    //rootView : "MyNewSAPUI5.view.App",	

        config : {
        			resourceBundle : "i18n/messageBundle.properties",
	                serviceConfig : 
	                {
	                	name : "UserOData",
	                	serviceUrl : "/sap/opu/odata/sap/ZSABER_FLIGHTINFORMATION/"
	                	//HAM/504 //serviceUrl : "https://ldciham.wdf.sap.corp:44301/sap/opu/odata/sap/ZSABER_FLIGHTINFORMATION/"
	                	//AG3/001 //serviceUrl : "https://ldai1ag3.wdf.sap.corp:44355/sap/opu/odata/sap/ZWJ_USERS_ODATA_SRV/"
	                	//AG3/001 //serviceUrl : "https://ldai1ag3.wdf.sap.corp:44355/sap/opu/odata/sap/ZSABER_FLIGHTINFORMATION/"
	                }
        },
	    
        /*
	    routing: {
	                config : {
	                			viewType : "XML",
	                			viewPath : "MyNewSAPUI5.view",
	                			targetAggregation : "detailPages",
	                			clearTarget : false
				    		},
				
				    routes : [
				              	{
				              		pattern : "",
				              		name : "master",
				              		view : "Master",
				              		targetAggregation : "masterPages",
				              		preservePageInSplitContainer : true,
				              		targetControl : "idAppControl",
				              		subroutes : [
				              		             	{
				              		             		pattern : "Detail/{contextPath}",
				              		             		name : "detail",
				              		             		view : "Detail"
				              		             	}
				              		             ]
				              	},
				             ]
	    		}
	    */
	},	
	
	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "sap.ui.demo.myFiori.view.App",
			type : "JS",
			viewData : { component : this }
		});

		var mConfig = this.getMetadata().getConfig();
		
		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "i18n/messageBundle.properties"
		});
		
		oView.setModel(i18nModel,"i18n");

		// Using a local model for offline development
		//var oModel = new sap.ui.model.json.JSONModel("model/mock.json");
		//oView.setModel(oModel);

        // Create and set domain model to the component
        var sServiceUrl = mConfig.serviceConfig.serviceUrl;
        var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
        this.setModel(oModel);		
		
//		Notice that we do the device determination up front when the application starts (in Component.js) 
//		setting the results of the determination in a one-way bound named data model, 
//      data from which can then be used in property path bindings in the Detail and Master views.
		
		// set device model 
		var deviceModel = new sap.ui.model.json.JSONModel({ 
			isPhone : jQuery.device.is.phone, 
 			isNoPhone : ! jQuery.device.is.phone, 
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster", 
		    listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive" 
		    }); 
		
		deviceModel.setDefaultBindingMode("OneWay"); 
		
		oView.setModel(deviceModel, "device");

		// done
		return oView;
	}
});