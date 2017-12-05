var introjs;
var typingInterval = 1;

var callByValueReady = function() {
	$('.introjs-nextbutton').keydown(function(e) {
		if (e.which == 13) {
			e.preventDefault();
		}
	});

	$('#restartBtn').click(function() {
		location.reload();
	});

	introJsFunction();
}
function typing(typingId, typingContent, typingInterval, cursorColor, typingCallbackFunction) {
	$(typingId).typewriting(typingContent, {
		"typing_interval": typingInterval,
		"cursor_color": cursorColor
	}, function() {
		$(typingId).removeClass('typingCursor');
		if (typeof typingCallbackFunction === "function") {
			typingCallbackFunction();
			introjs._introItems[introjs._currentStep].intro = $(".introjs-tooltiptext").html();
		}
	});
}

function introJsFunction() {
	introjs = introJs();
	introjs.setOptions({
		showStepNumbers: false,
		exitOnOverlayClick: false,
		showBullets: false,
		exitOnEsc: false,
		keyboardNavigation: false,
		steps : [ {
			element : "#preCode",
			intro : "",
		}, {
			element : "#swapDeclareLine",
			intro : "",
		}, {
			element : "#mainMethodBlock",
			intro : "",
		}, {
			element : "#aLine",
			intro : "",
		}, {
			element : "#aBox",
			intro : "",
			tooltipClass: 'hide',
		}, {
			element : "#bLine",
			intro : "",
		}, {
			element : "#bBox",
			intro : "",
			tooltipClass: 'hide',
			
		}, {
			element : "#printBeforeSwapInMain",
			intro : "",
			
		}, {
			element : "#outputBox",
			tooltipClass: "hide",
		}, {
			element : "#swapLine",
			intro : "",
		}, {
			element : "#swapMethodBlock",
			intro : "",
		}, {
			element : "#swapAnimationDiv",
			intro : "",
			tooltipClass: 'hide',
		}, {
			element : "#tDeclareLine",
			intro : "",
		}, {
			element : "#tBox",
			intro : "",
			animateStep : "tBoxAnimate",
			tooltipClass: 'hide',
		}, {
			element : "#tAssignLine",
			intro : "",
		}, {
			element : "#tBox",
			intro : "",
			animateStep : "tBoxValueAnimate",
			tooltipClass: 'hide',
		}, {
			element : "#xLine",
			intro : "",
		}, {
			element : "#xBox",
			intro : "",
			tooltipClass: 'hide'
		}, {
			element : "#yLine",
			intro : "",
		}, {
			element : "#yBox",
			intro : "",
			position : "left",
			tooltipClass: 'hide'
		}, {
			element : "#printAfterSwapInSwap",
			intro : "",
		}, {
			element : "#outputBox",
			tooltipClass: "hide",
		}, {
			element : "#swapMethodCloseBrace",
			intro : "",
		}, {
			element : "#animationDiv",
			tooltipClass: "hide",
		}, {
			element : "#printAfterSwapInMain",
			intro : "",
		}, {
			element : "#outputBox",
			tooltipClass: "hide",
		}, {
			element : "#restartBtn",
			intro : "Click to restart.",
			position : "right"
		} ]});
	
	
	introjs.onbeforechange(function(targetElement) {
		var elementId = targetElement.id;
		switch (elementId) {
			case "aLine":
			case "aBox":
				if (elementId == "aLine") {
					$('#mainMethodBox').removeAttr('style');
				}
				introjs.refresh();
				$('#aBox').addClass('opacity00');
				$('#aValue').text("");
			break;
			case "bLine":
			case "bBox":
				$('#bBox').addClass('opacity00');
				$('#bValue').text("");
			break;
			case "swapMethodBlock":
			case "swapAnimationDiv":
				$('#swapMethodBox').removeAttr('style');
				$('#xBox, #yBox').addClass('opacity00');
				$('#xValue, #yValue').text("");
			break;
			case "tDeclareLine":
				$('#tBox').addClass('opacity00');
			break;
			case "tBox":
				var animateStep = introjs._introItems[introjs._currentStep].animateStep;
				switch (animateStep) {
					case "tBoxAnimate":
						$('#tBox').addClass('opacity00');
					break;
					case "tBoxValueAnimate":
						$('#tValue').text("");
					break;
				}
			break;
			case "tAssignLine":
				$('#tValue').text("");
			break;
			case "xLine":
			case "xBox":
				$('#xValue').text($('#aValue').text());
			break;
			case "yLine":
			case "yBox":
				$('#yValue').text($('#bValue').text());
			break;
		}
	});

	introjs.onafterchange(function(targetElement) {
		$('.introjs-nextbutton, .introjs-prevbutton, .introjs-skipbutton').hide();
		
		if (introjs._introItems[introjs._currentStep]["tooltipClass"] == "hide") {
			introjs._introItems[introjs._currentStep]["animation"] = "repeat";
		}
		
		if (introjs._introItems[introjs._currentStep]["isCompleted"]) {
			if (introjs._currentStep != 0) {
				$('.introjs-prevbutton').show();
			}

			$('.introjs-nextbutton').show();
			return;
		}
		
		if (introjs._introItems[introjs._currentStep]["animation"] != "repeat") {
			introjs._introItems[introjs._currentStep]["isCompleted"] = true;
		}
		var elementId = targetElement.id;
		switch (elementId) {
			case "preCode":
				var typingContent = 'Let us learn <span class="ct-code-b-yellow">call by value</span>.';
				typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
					$('.introjs-nextbutton').show();
				});
			break;
			case "swapDeclareLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'This statement declares a <span class="ct-code-b-yellow">swap()</span> method with two arguments of type '
										+ '<span class="ct-code-b-yellow">int pointers</span>.<br/><br> The <span class="ct-code-b-yellow">void</span> '
										+ 'is a keyword,and is used when a method does not return any value.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "mainMethodBlock":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'This is the <span class="ct-code-b-yellow">main()</span> block,the execution of the program begins.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "aLine":
				introjs.refresh();
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'A variable <span class="ct-code-b-yellow">a</span> of type <span class="ct-code-b-yellow">int</span> is '
										+ 'initialized with value <span class="ct-code-b-yellow">' + $('#valueOfA').text() + '</span>.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "aBox":
				$('.introjs-fixParent').removeClass('introjs-fixParent');
				$('.introjs-helperLayer').one('transitionend', function () {
					TweenMax.to($('#mainMethodBox'), 1, {opacity: 1});
					animationABox(function() {
						$('.introjs-tooltip').removeClass('hide');
						var typingContent = 'As <span class="ct-code-b-yellow">a</span> is of type ' +
											'<span class="ct-code-b-yellow">int</span>, it occupies <span class="ct-code-b-yellow">2 bytes</span> ' +
											'in memory with some address. <br><br>Let us assume the address to be ' +
											'<span class="ct-code-b-yellow">' + $('#aAddress').text() + 
											'</span>.<br> The variable <span class="ct-code-b-yellow">a</span> is initialized with value ' + 
											'<span class="ct-code-b-yellow">' + $('#valueOfA').text() + '</span>.';
						typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
							$('.introjs-nextbutton, .introjs-prevbutton').show();
						});
					});
				});
			break;
			case "bLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'A variable <span class="ct-code-b-yellow">b</span> of type <span class="ct-code-b-yellow">int</span>  is '
										+ 'initialized with value <span class="ct-code-b-yellow">' + $('#valueOfB').text() + '</span>.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "bBox":
				$('.introjs-helperLayer').one('transitionend', function () {
					animationBBox(function() {
						$('.introjs-tooltip').removeClass('hide');
						var typingContent = 'As the variable <span class="ct-code-b-yellow">b</span> is of type ' +
											'<span class="ct-code-b-yellow">int</span>, it occupies <span class="ct-code-b-yellow">2 bytes</span> ' +
											'in memory with some address.<br><br>Let us assume the address to be ' +
											'<span class="ct-code-b-yellow">' + $('#bAddress').text()  + 
											'</span>.<br>The variable <span class="ct-code-b-yellow">b</span> is initialized with  value ' + 
											'<span class="ct-code-b-yellow">' + $('#valueOfB').text() + '</span>.';
						typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
							$('.introjs-nextbutton, .introjs-prevbutton').show();
						});
					});
				});
			break;
			case "printBeforeSwapInMain":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'This statement prints the <span class="ct-code-b-yellow">values</span> of '
										+ '<span class="ct-code-b-yellow">a</span> and <span class="ct-code-b-yellow">b</span> before the function call to the '
										+ '<span class="ct-code-b-yellow">swap()</span> is made.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
					
				});
			break;
			case "outputBox":
				$('.introjs-helperLayer').one('transitionend', function () {
					if (introjs._direction == "forward") {
						var selector = $('.output-console-body > .visibility-hidden').eq(0).addClass("tempClass");
						var typingContent = selector.removeClass('visibility-hidden').html();
						typing(selector, typingContent, 30, 'white', function() {
							setTimeout(function() {
								introjs.nextStep();
							}, 1000);
						});
					} else {
						$('.tempClass:last').removeClass("tempClass").addClass("visibility-hidden");
						introjs.previousStep();
					}
					
				});
				
			break;
			case "swapLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'This is a method call <span class="ct-code-b-yellow">swap()</span> to which we pass two parameters  ' +
										'<span class="ct-code-b-yellow">a</span>, <span class="ct-code-b-yellow">b</span>.<br/> '+
										'Here the values of <span class="ct-code-b-yellow">a</span> and <span class="ct-code-b-yellow">b</span> ' +
										'are passed to the method.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "swapMethodBlock":
				var typingContent = 'The <span class="ct-code-b-yellow">swap()</span> method takes two <span class="ct-code-b-yellow">int</span> ' +
									'variables <span class="ct-code-b-yellow">x</span>, <span class="ct-code-b-yellow">y</span> and they ' +
									'are assigned with the values of a and b.<br><br> Here the values of <span class="ct-code-b-yellow">a</span>'+
									' and <span class="ct-code-b-yellow">b</span> are' +
									'assigned to <span class="ct-code-b-yellow">x</span> and '+
									'<span class="ct-code-b-yellow">y</span>.The values of <span class="ct-code-b-yellow">' + $('#aValue').text() +
									'</span>, <span class="ct-code-b-yellow"> ' + $('#bValue').text() + '</span> .';
				typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
					$('.introjs-nextbutton, .introjs-prevbutton').show();
				});
			break;
			case "swapAnimationDiv":
				$('.introjs-fixParent').removeClass('introjs-fixParent');
				$('.introjs-helperLayer').one('transitionend', function () {
					TweenMax.to($('#swapMethodBox'), 1, {opacity: 1});
					animationSwap(function() {
						$('.introjs-tooltip').removeClass('hide');
						var typingContent = 'The <span class="ct-code-b-yellow">swap(x, y)</span> method takes two parameters of type '
											+ '<span class="ct-code-b-yellow">int</span>  and these variables are assigned with values of '
											+ '<span class="ct-code-b-yellow">a</span> and <span class="ct-code-b-yellow">b</span> respectively. '
											+ '<br><br>As they are of datatype <span class="ct-code-b-yellow">int</span>, each of them occupy ' + 
											'<span class="ct-code-b-yellow">2 bytes</span> in memory with some address.';
						typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
							$('.introjs-nextbutton, .introjs-prevbutton').show();
						});
					});
				});
			break;
			case "tDeclareLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'A temporary variable of type <span class="ct-code-b-yellow">int</span> is declared '
										+ '<span class="ct-code-b-yellow">t</span>.<br><br> It is used to store the temporary value when '
										+ 'the values are swapped.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "tBox":
				$('.introjs-helperLayer').one('transitionend', function () {
					var animateStep = introjs._introItems[introjs._currentStep].animateStep;
					switch (animateStep) {
						case "tBoxAnimate":
							animationTBox(function() {
								$('.introjs-tooltip').removeClass('hide');
								var typingContent = 'Here, the variable <span class="ct-code-b-yellow">t</span> is of type '
													+ '<span class="ct-code-b-yellow">int</span> and it occupies <span class="ct-code-b-yellow">'
													+ '2 bytes</span> in memory.';
								typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
									$('.introjs-nextbutton, .introjs-prevbutton').show();
								});
							});
						break;
						case "tBoxValueAnimate":
							$('.introjs-tooltip').removeClass('hide');
							var typingContent = 'Here the value of <span class="ct-code-b-yellow">t</span> is assigned with the value of '
												+ '<span class="ct-code-b-yellow">x</span>  (i.e. <span class="ct-code-b-yellow">' 
												+ $('#xValue').text() + '</span>).';
							typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
								$('.introjs-tooltipbuttons').append("<a class='introjs-button introjs-duplicate-nextbutton' onclick='animationTBoxValue()'>" + 
																		"Next &#8594;</a>");
							});
						break;
					}
				});
			break;
			case "tAssignLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'The variable <span class="ct-code-b-yellow">t</span> is assigned with the value of '
										+ '<span class="ct-code-b-yellow">x</span>.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "xLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'The variable <span class="ct-code-b-yellow">x</span> is assigned with the value of '
										+ ' <span class="ct-code-b-yellow">y</span>.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "xBox":
				$('.introjs-helperLayer').one('transitionend', function () {
					$('.introjs-tooltip').removeClass('hide');
					var typingContent = 'The value of <span class="ct-code-b-yellow">y</span> is now assigned to <span class="ct-code-b-yellow">' 
										+ 'x</span> (i.e. <span class="ct-code-b-yellow">' + $('#yValue').text() + '</span>).';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-tooltipbuttons').append("<a class='introjs-button introjs-duplicate-nextbutton' onclick='animationXBoxValue()'>" + 
																"Next &#8594;</a>");
					});
				});
			break;
			case "yLine":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'The variable <span class="ct-code-b-yellow">y</span> is assigned with the value of '
										+ ' <span class="ct-code-b-yellow">t</span>.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "yBox":
				$('.introjs-helperLayer').one('transitionend', function () {
					$('.introjs-tooltip').removeClass('hide');
					var typingContent = 'The value of <span class="ct-code-b-yellow">t</span> is now copied to <span class="ct-code-b-yellow">y</span> '
										+ '(i.e. <span class="ct-code-b-yellow">' + $('#tValue').text() + '</span>).';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-tooltipbuttons').append("<a class='introjs-button introjs-duplicate-nextbutton' onclick='animationYBoxValue()'>" + 
																"Next &#8594;</a>");
					});
				});
			break;
			case "printAfterSwapInSwap":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'This statement prints the <span class="ct-code-b-yellow">values</span> of <span class="ct-code-b-yellow">' 
										+ 'x</span>, <span class="ct-code-b-yellow">y</span>.<br/><br> Now, after the method call '
										+ '<span class="ct-code-b-yellow">swap()</span>, the values have been interchanged.'
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "swapMethodCloseBrace":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'On completion of the  <span class="ct-code-b-yellow">swap()</span> method, all the local variables '
										+ '<span class="ct-code-b-yellow">x</span>, <span class="ct-code-b-yellow">y</span> and '
										+ '<span class="ct-code-b-yellow">t</span> are destroyed.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "animationDiv":
				$('.introjs-helperLayer').one('transitionend', function () {
					if (introjs._direction == "forward") {
						TweenMax.to($('#swapMethodBox'), 1, {opacity: 0, onComplete: function() {
							setTimeout(function() {
								introjs.nextStep();
							}, 1000);
						}});
					} else {
						$('#swapMethodBox').removeAttr('style').css('opacity',"1");
						introjs.previousStep();
					}
					
				});
			break;
			case "printAfterSwapInMain":
				$('.introjs-helperLayer').one('transitionend', function () {
					var typingContent = 'This statement prints the <span class="ct-code-b-yellow">values</span> of ' 
										+ '<span class="ct-code-b-yellow">a</span>, <span class="ct-code-b-yellow">b</span> after the ' +
										'<span class="ct-code-b-yellow">swap()</span> method '
										+ 'call.<br/> <br/>Notice that the method call has  not swapped the values of a and b.<br/>This is how '
										+ '<span class="ct-code-b-yellow">call by value</span> method works.<br><br>The method call sends a copy of the values,'
										+'so any change affects the copy but not the orignal variable values.';
					typing('.introjs-tooltiptext', typingContent, typingInterval, 'white', function() {
						$('.introjs-nextbutton, .introjs-prevbutton').show();
					});
				});
			break;
			case "restartBtn":
				$('.introjs-tooltip').css({'min-width' : '120px'});
				$('.introjs-helperLayer').one('transitionend', function () {
					$("#restartBtn").removeClass('visibility-hidden');
				});
			break;
		}
	});
	introjs.start();
}

function fromEffectWithTweenMax(selector1, selector2, callBackFunction) {
	var l1 = $(selector1).offset();
	var l2 = $(selector2).offset();
	var topLength = l1.top - l2.top;
	var leftLength = l1.left - l2.left;
	TweenMax.from($(selector2), 1, {top: topLength, left: leftLength, onComplete: function() {
		if (typeof callBackFunction === "function") {
			callBackFunction();
		}
	}});
}

function bounceFromEffextWithTimelineMax(selector1, selector2, callBackFunction) {
	var timelineMax = new TimelineMax();
	var l1 = $(selector1).offset();
	var l2 = $(selector2).offset();
	var topLength = l1.top - l2.top;
	var leftLength = l1.left - l2.left;
	$(selector2).parent().append('<span id="temp" style="position: absolute;"></span>');
	$('#temp').offset({top: l2.top, left: l2.left}).text($(selector2).text());
	$(selector2).text($(selector1).text());
	timelineMax.from(selector2, 3, {ease:  Bounce.easeOut, top: topLength, left: leftLength, onComplete: function() {
		if (typeof callBackFunction === "function") {
			callBackFunction();
		}
	}}).to('#temp', 1, { ease: Sine.easeOut, top: "-=100", opacity: 0, onComplete: function() {
		$('#temp').remove();
	}}, "-=2");
}

function animationABox(callBackFunction) {
	$('#aBox').addClass('animated zoomIn').removeClass('opacity00').one('animationend', function() {
		$('#aBox').removeClass('animated zoomIn');
		$('#valueOfA').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
			$('#valueOfA').removeClass('circle-css');
			$('#aValue').text($('#valueOfA').text());
			fromEffectWithTweenMax('#valueOfA', '#aValue', function() {
				callBackFunction();
			});
		});
	});
}

function animationBBox(callBackFunction) {
	$('#bBox').addClass('animated zoomIn').removeClass('opacity00').one('animationend', function() {
		$('#bBox').removeClass('animated zoomIn');
		$('#valueOfB').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
			$('#valueOfB').removeClass('circle-css');
			$('#bValue').text($('#valueOfB').text());
			fromEffectWithTweenMax('#valueOfB', '#bValue', function() {
				callBackFunction();
			});
		});
	});
}

function animationSwap(callBackFunction) {
	$('.introjs-duplicate-nextbutton').remove();
	animationXBox();
	animationYBox(function() {
		callBackFunction();
	});
}

function animationXBox() {
	$('#xBox').addClass('animated zoomIn').removeClass('opacity00').one('animationend', function() {
		$('#xBox').removeClass('animated zoomIn');
		$('#aValue').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
			$('#aValue').removeClass('circle-css');
			$('#xValue').text($('#aValue').text());
			fromEffectWithTweenMax('#aValue', '#xValue');
		});
	});
}

function animationYBox(callBackFunction) {
	$('#yBox').addClass('animated zoomIn').removeClass('opacity00').one('animationend', function() {
		$('#yBox').removeClass('animated zoomIn');
		$('#bValue').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
			$('#bValue').removeClass('circle-css');
			$('#yValue').text($('#bValue').text());
			fromEffectWithTweenMax('#bValue', '#yValue', function() {
				callBackFunction();
			});
		});
	});
}

function animationTBox(callBackFunction) {
	$('#tBox').addClass('animated zoomIn').removeClass('opacity00').one('animationend', function() {
		$('#tBox').removeClass('animated zoomIn');
		callBackFunction();
	});
}

function animationTBoxValue() {
	$('.introjs-duplicate-nextbutton').remove();
	$('#xValue').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
		$('#xValue').removeClass('circle-css');
		$('#tValue').text($('#xValue').text());
		fromEffectWithTweenMax('#xValue', '#tValue', function() {
			$('.introjs-nextbutton, .introjs-prevbutton').show();
		});
	});
}

function animationXBoxValue() {
	$('.introjs-duplicate-nextbutton').remove();
	$('#yValue').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
		$('#yValue').removeClass('circle-css');
		bounceFromEffextWithTimelineMax('#yValue', '#xValue', function() {
			$('.introjs-nextbutton, .introjs-prevbutton').show();
		});
	});
}

function animationYBoxValue() {
	$('.introjs-duplicate-nextbutton').remove();
	$('#tValue').addClass('circle-css').effect("highlight", {color: '#FFFFFF'}, 1000, function() {
		$('#tValue').removeClass('circle-css');
		bounceFromEffextWithTimelineMax('#tValue', '#yValue', function() {
			$('.introjs-nextbutton, .introjs-prevbutton').show();
		});
	});
}