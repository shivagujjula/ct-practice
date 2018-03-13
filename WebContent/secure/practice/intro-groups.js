/**
 * 
 */
function launchHelp() {
	if ($('.introjs-overlay').is(":visible")) {
		//if already visible...
		return false;
	}
	
	//switch-animate
	$(".switch-animate").eq(0).attr("id", "signupGroup");
	$(".switch-animate").eq(1).attr("id", "isEnabled");
	
	introjs = introJs();
	introjs.setOptions({
		steps : [{
			element : "#formAndSearchContainerDiv",
			intro : "Here we can create a <span class='ct-code-b-yellow'>Group</span>.",
			position : "left",
		}, {
			element : "#startYear",
			intro : "",
			position : "right" 
		}, {
			element : "#endYear",
			intro : "",
			position : "right" 
		}, {
			element : '#department',
			intro : '',
			position : "right"
		}, {
			element : '#section',
			intro : '',
			position : "right"
		}, {
			element : '#suffix',
			intro : '',
			position : "right"
		}, {
			element : '#groupName',
			intro : '',
			position : "right"
		}, {
			element : '#description',
			intro : '',
			position : "right"
		}, {
			element : '#productCategory',
			intro : '',
			position : "right"
		}, {
			element : '#signupGroup',
			intro : '',
			position : "right"
		}, {
			element : '#isEnabled',
			intro : "Click <span class='ct-code-b-yellow'>Yes</span> to enable the status.",
			position : "right"
		}, {
			element : "#addBtn",
			intro : "Click on <span class='ct-code-b-yellow'>add</span> button " +
			"will add your details.",
			position : "left" 
		}, {
			element : "#resetBtn",
			intro : "Click on <span class='ct-code-b-yellow'>reset</span> button will reset your details.",
			position : "right" 
		}, {
			element : "#menuBarHelp",
			intro : "",
			tooltipClass : "hide"
		}]
	});//description
	
	introjs.onafterchange(function(targetElement) {
		introjs.refresh();
		$('.introjs-nextbutton').show();
		$('.introjs-prevbutton').show();
		
		var elementId = targetElement.id;
		switch (elementId) {
		case "formAndSearchContainerDiv":
			$('.introjs-prevbutton').hide();
			break;			
			
		case "menuBarHelp":
			$(".introjs-helperLayer").one("transitionend", function() {
				setTimeout(function() {
					introjs.exit();
				}, 1000);
			});
			break;
		}
	});

	introjs.setOption('showStepNumbers', false);
	introjs.setOption('exitOnOverlayClick', false);
	introjs.setOption('exitOnEsc', false);
	introjs.setOption('keyboardNavigation', false);	
	introjs.start();	
	
	$(".introjs-skipbutton").addClass("pull-left");
	$('.introjs-bullets').hide();
}