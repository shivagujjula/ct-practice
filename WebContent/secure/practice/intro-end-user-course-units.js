/**
 * 
 */
function launchHelp() {
	if ($('.introjs-overlay').is(":visible")) {
		//if already visible...
		return false;
	}
	
	//switch-animate
	$(".switch-animate").eq(0).attr("id", "hasTest");
	$(".switch-animate").eq(1).attr("id", "isEnabled");
	
	introjs = introJs();
	introjs.setOptions({
		steps : [{
			element : "#formAndSearchContainerDiv",
			intro : "<span class='ct-code-b-yellow'>End User Course Units</span>",
			position : "left",
		}, {
			element : "#endUserCourse",
			intro : "",
			position : "right" 
		}, {
			element : "#endUserCourseUnit",
			intro : "",
			position : "right"
		}, {
			element : "#description",
			intro : "",
			position : "right" 
		}, {
			element : "#hasTest",
			intro : "",
			position : "right" 
		}, {
			element : '#s2id_test',
			intro : '',
			position : "right"
		}, {
			element : "#isEnabled",
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
	/*$(".introjs-skipbutton").click(function() {
		introjs.goToStep(introjs._introItems.length - 1);
	});*/
}