/**
 * Define Format
 */
jQuery.sap.declare("sap.ui.demo.myFiori.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat"); // Have used...

sap.ui.demo.myFiori.util.Formatter = { 

//      Define Status State Mapping Array
		_statusStateMap : { 
			"P" : "Success", 
			"N" : "Warning" 
	    },
//      Convert to Status Text N->New,P->In Process
	    statusText : function (value) { 
	    	var bundle = this.getModel("i18n").getResourceBundle(); 
	    	return bundle.getText("StatusText" + value, "?"); 
	    }, 
//	    Status Color
	    statusState : function (value) { 
	    	var map = sap.ui.demo.myFiori.util.Formatter._statusStateMap; 
	    	return (value && map[value]) ? map[value] : "None"; 
	    }, 
//	    Convert Date
	    date : function (value) { 
	    	if (value) { 
	    		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd"}); 
	    		return oDateFormat.format(new Date(value)); } 
	    	else { 
	    		return value; 
	        } 
	    },
//              
	    quantity : function (value){
	        try { 
	        	return (value) ? parseFloat(value).toFixed(0) : value; } 
	        catch (err) 
	        { return "Not-A-Number"; } 
	    }
};