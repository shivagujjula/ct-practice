
Array.prototype.equals = function (array) {
	// if the other array is a falsy value, return
	if (!array)
		return false;
	
	// compare lengths - can save a lot of time 
	if (this.length != array.length)
		return false;
	
	for (var i = 0, l=this.length; i < l; i++) {
		// Check if we have nested arrays
		if (this[i] instanceof Array && array[i] instanceof Array) {
			
			// recurse into the nested arrays
			if (!this[i].equals(array[i]))
				return false;       
		} else if (this[i] != array[i]) {
			// Warning - two different object instances will never be equal: {x:20} != {x:20}
			return false;
		}
	}
	return true;
}
	
	var sliderValue = 2;
	var executeLineIndex;
	
	var threadProgressBarWidth;
	var threadProgressBarSetInterval = [];

	var pauseCalledArr = [];

	var heightOfMainMethodBox;
	
	var id;
	var arrow = [];
	
	var l1 = [];
	var l2 = [];
	var topLength = [];
	var leftLength = [];
	
	var executeButton;
	
	var mainMethodArrowWidth;
	var executeLineWidth;
	
	var introjs;
var threadsWaitNotifyDemoReady = function() {

	
	function getURLParameter(sParam) {
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) {
	            return sParameterName[1];
	        }
	    }
	}
	
	id = getURLParameter('id');
	
	$("#sliderDiv").hide();
	if (id == 1) {
		sliderValue = parseInt(id);
		$("#thread1Label").text("Thread T");
	} else {
		//$(".button-div-css").addClass('col-sm-2');
	}
	
	$(function() {
		$("#slider-range-max").slider({
			range : "max",
			min : 1,
			max : 2,
			value : 2,
			slide : function(event, ui) {
				$("#numOfThreads").val(ui.value);
				sliderValue = parseInt($("#numOfThreads").val());
			}
		});
		var per = 0; 
		for (var i = 1; i <= 2; i++) {
			var el = $('<label>'+ i +'</label>').css('left', per + '%');
		  	per = per + (100 / 1);
		    $( "#slider-range-max" ).append(el);
		  }
		$("#numOfThreads").val($("#slider-range-max").slider("value"));
	});
	
	$_bs("#startMainMethodButton").attr('data-content', 
			(id == 1)? 'Click to start the demo with a single thread.' : 'Click to start the demo with multiple threads.');
	$_bs("#startMainMethodButton").popover('show');
	//$_bs("#resetMainMethodButton").attr('data-content', 'Click to restart the demo.');
	
	$("#startMainMethodButton").click(function() {
		$_bs(this).popover('hide');
		$(this).addClass('hidden');
		$("#resetMainMethodButton, #closeBtn").addClass('hidden');
		$('#numOfObjects').empty();
		for (var next = 1; next <= (sliderValue * 2); next++) {
			if (next < (sliderValue + 1)) {
				if (id == 1) {
					$('#numOfObjects').append("\t\t<span id='line" + next + "'>Counter t = <span id='objectT" + next + "'>new Counter(" + next + ")</span>;</span>\n");
				} else {
					$('#numOfObjects').append("\t\t<span id='line" + next + "'>Counter t" + next + " = <span id='objectT" + next + "'>new Counter(" + next + ")</span>;</span>\n");
				}
			} else {
				if (id == 1) {
					$('#numOfObjects').append("\t\t<span id='line" + next + "'>new Thread(t).start();</span>");
				} else {
					$('#numOfObjects').append("\t\t<span id='line" + next + "'>new Thread(t" + (next- sliderValue) + ").start();</span>");
					if (next != (sliderValue * 2)) {
						$('#numOfObjects').append("\n");
					}
				}
			}
		}
		$('#slider-range-max').slider('disable');
		threadProgressBarWidth = [ 0, 0, 0, 0, 0];
		executeLineIndex = 1;
		heightOfMainMethodBox = (sliderValue == 4) ? 628 : (sliderValue == 3) ? 605 : (sliderValue == 2) ? 606 : 582;
		$("#mainMethodThreadbox").css('height', heightOfMainMethodBox);
		$("#mainMethodThreadbox").removeClass('hidden');
		$('#outputPre').empty();
		introJsFunction();
		
		if (id == 1) {
			$_bs("#for1").attr({'data-original-title': 'Entering into the <b>for</b> loop', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
			$_bs("#ifPauseCalled1").attr({'data-original-title': '<b>pauseCalled</b> is <span class=" code-b-red">false</span>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
			$_bs("#wait1").attr({'data-original-title': '<b>run()</b> method is <b>paused</b>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
			$_bs("#pauseCalled1").attr({'data-original-title': '<b>pauseCalled</b> is changed to <span class="code-b-green">true</span>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
			$_bs("#resumeCalled1").attr({'data-original-title': '<b>pauseCalled</b> is changed to <span class="code-b-red">false</span>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
			$_bs("#notify1").attr({'data-original-title': '<b>notifies</b> lock from <b>wait<b>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
		}
	});
	
	$('body').keydown(function(e) {
		if (e.which == 13) {
			e.preventDefault();
		}
	});
	$("#resetMainMethodButton").click(function() {
		location.reload();
	});
	$('#closeBtn').click(function() {
		window.parent.$(".ui-dialog-titlebar-close").click();
	});
	$("#executeButton").click(function() {
		if ($(this).hasClass('disabled')) {
			return;
		}
		$(this).addClass('disabled').addClass('opacity40');
		if (executeLineIndex == (sliderValue + 1)) {
			$("#outputBox").slideDown(3000);
		}
		$_bs("#executeButton").tooltip('hide');
		if (executeLineIndex < (sliderValue + 1)) {
			$("#line" + executeLineIndex).effect("highlight", {color: '#DCB458'}, 1000);
			$("#threadbox" + executeLineIndex).removeClass('hidden');
			$("#threadbox" + executeLineIndex).css({"opacity": "0"});
			$("#counterT" + executeLineIndex).css({"opacity": "0"});
			$("#threadbox" + executeLineIndex).fadeTo(2000, 1);
			$("#objectT" + executeLineIndex).effect( "transfer", { to: $("#threadbox" + executeLineIndex), className: "ui-effects-transfer" }, 2000, function() {
				$("#counterT" + executeLineIndex).fadeTo(2000, 1);
				$_bs("#counterT" + executeLineIndex).attr('data-content', 'Thread code');
				$_bs("#counterT" + executeLineIndex).popover('show');
				$("#counterClassSpan").effect( "transfer", { to: $("#counterT" + executeLineIndex), className: "ui-effects-transfer" }, 2000, function() {
					$_bs("#counterT" + executeLineIndex).popover('hide');
					executeLineIndex++;
					animatingArrowAndExecuteButton(executeLineIndex);
				});
			});
		} else {
			$( "#line" + executeLineIndex).effect("highlight", {color: '#DCB458'}, 1000);
			$( "#line" + executeLineIndex).effect( "transfer", { to: $( "#thread" + (executeLineIndex - sliderValue) + "Label" ), className: "ui-effects-transfer" }, 1000, function() {
				threadStart(executeLineIndex - sliderValue);
				executeLineIndex++;
				animatingArrowAndExecuteButton(executeLineIndex);
			} );
		}
	});
	
	$(".pauseResumeBtn").click(function() {
		if ($(this).hasClass('disabled')) {
			return;
			}
		$(this).addClass('disabled').addClass('opacity40');
		var threadId = $(this).attr("threadId");
		if ($(this).hasClass('pause')) {
			if (id == 1) {
				$("#thread" + threadId + "Message").text("Thread is paused");
			} else {
				$("#thread" + threadId + "Message").text("Thread " + threadId + " is paused");
			}
			pauseCalledArr[threadId] = true;
		} else {
			if (id == 1) {
				$("#thread" + threadId + "Message").text("Thread is executing");
			} else {
				$("#thread" + threadId + "Message").text("Thread " + threadId + " is executing");
			}
			pauseCalledArr[threadId] = false;
			resumeCalled(threadId);
		}
	});
	
	function introJsFunction() {
		introjs = introJs();
		introjs.setOptions({
			showStepNumbers: false,
			exitOnOverlayClick: false,
			showBullets: false,
			exitOnEsc: false,
			keyboardNavigation: false,
			steps : [ {
				element : "#waitNotifyDemoClass",
				intro : "The <span class='ct-code-b-yellow'>WaitNotifyDemo</span> class demonstrates how to write code to "
						+ "<span class='ct-code-b-yellow'>wait</span> and <span class='ct-code-b-yellow'>notify</span>  a running thread.",
				position : "right"
			},
			{
				element : "#mainMethod",
				intro : "",
				position : "right"
			},
			{
				element : "#counterClassSpan",
				intro : "The <span class='ct-code-b-yellow'>Counter</span> class demonstrates "
						+ "<span class='ct-code-b-yellow'>pause</span> and <span class='ct-code-b-yellow'>resume</span> "
						+ "functionality implementation in the <span class='ct-code-b-yellow'>pause()</span> and "
						+ "<span class='ct-code-b-yellow'>resume()</span>  methods.",
				position : "right"
			},
			{
				element : "#pauseCalledLine",
				intro : "The <span class='ct-code-b-yellow'>pauseCalled</span> flag is used to determine"
						+ " if the user has called <span class='ct-code-b-yellow'>pause()</span> or <span class='ct-code-b-yellow'>resume()</span>"
						+ " on a running thread.<br/><br/>The <span class='ct-code-b-yellow'>pauseCalled</span>"
						+ " flag is initialized to <span class='ct-code-b-yellow'>false</span>.",
				position : "right"
			},
			{
				element : "#pauseMethod",
				intro : "The <span class='ct-code-b-yellow'>pause()</span> method sets the value of "
						+ "<span class='ct-code-b-yellow'>pauseCalled</span> to <span class='ct-code-b-yellow'>true</span>.",
				position : "right"
			},
			{
				element : "#resumeMethod",
				intro : "The <span class='ct-code-b-yellow'>resume()</span> method sets the value of "
						+ "<span class='ct-code-b-yellow'>pauseCalled</span> to <span class='ct-code-b-yellow'>false</span>.<br/><br/>"
						+ "It also calls <span class='ct-code-b-yellow'>lock.notify()</span> so that the thread which is waiting "
						+ " on the <span class='ct-code-b-yellow'>lock</span> object comes out of wait and resumes.",
				position : "right"
			},
			{
				element : "#runMethod",
				intro : "The <span class='ct-code-b-yellow'>run()</span> method performs the below tasks : <ol><li>prints numbers from 1 to 10</li>"
						+ "<li>verifies if <span class='ct-code-b-yellow'>pauseCalled</span> is "
						+ "<span class='ct-code-b-yellow'>true</span> and </li>"
						+ "<li>if <span class='ct-code-b-yellow'>pauseCalled</span> is <span class='ct-code-b-yellow'>true</span>"
						+ " it calls <span class='ct-code-b-yellow'>lock.wait()</span> so that the thread waits till"
						+ " <span class='ct-code-b-yellow'>notify()</span> is called on the <span class='ct-code-b-yellow'>lock</span> object.</li></ol>",
				position : "right"
			},
			{
				element : "#mainMethodThreadbox",
				intro : "",
				position : "right"
			}
			]});
		
		introjs.onafterchange(function(targetElement) {
			var elementId = targetElement.id;
			switch (elementId) {
			case "waitNotifyDemoClass":
				introjs.refresh();
				$('#mainMethod').css('opacity', 0.5);
				$('.introjs-nextbutton, .introjs-prevbutton, .introjs-skipbutton').hide();
				$(' .introjs-skipbutton, .introjs-nextbutton').show();
				break;
			case "mainMethod":
				if (id == 1) {
					introjs._introItems[introjs._currentStep].intro = "A single instance of <span class='ct-code-b-yellow'>Counter</span> class is created and started in a thread.";
				} else {
					introjs._introItems[introjs._currentStep].intro = "Two instances of <span class='ct-code-b-yellow'>Counter</span> class are created and started in two separate threads.";
				}
				introjs.refresh();
				$('#mainMethod').css('opacity', 1);
				$('.mainMethodBoundaries').css('opacity', 0.5);
				$('#numOfObjects').css('opacity', 1);
				$('.introjs-nextbutton, .introjs-prevbutton, .introjs-skipbutton').hide();
				$('.introjs-helperLayer').one('transitionend', function () {
					$(' .introjs-skipbutton, .introjs-prevbutton, .introjs-nextbutton').show();
				});
				break;
			case "counterClassSpan":
			case "pauseCalledLine":
			case "runMethod":
			case "pauseMethod":
			case "resumeMethod":
				if (elementId == 'counterClassSpan'){
					$('#counterClassBoundaries').css('opacity', 0.5);
				} else {
					$('.introjs-fixParent').removeClass('introjs-fixParent');
					$('#counterClassBoundaries').css('opacity', 1);
				}
				introjs.refresh();
				$('#mainMethod').css('opacity', 1);
				$('.mainMethodBoundaries').css('opacity', 1);
				$('.introjs-nextbutton, .introjs-prevbutton, .introjs-skipbutton').hide();
				$('.introjs-helperLayer').one('transitionend', function () {
					$(' .introjs-skipbutton, .introjs-prevbutton, .introjs-nextbutton').show();
				});
				break;
			case "mainMethodThreadbox":
				introjs.refresh();
				$('.introjs-nextbutton, .introjs-prevbutton, .introjs-skipbutton').hide();
				introjs.exit();
				$("#mainMethodArrow").removeClass('hidden');
				$("#mainMethodArrow").show();
				$("#executeButton").removeClass('hidden');
				offsetArrowAndExecuteButton(executeLineIndex);
				$_bs("#executeButton").tooltip('show');
				break;
			}
		});
		
		introjs.start();
		
		$('.introjs-skipbutton').click(function() {
			$('#mainMethod').css('opacity', 1);
			$('.mainMethodBoundaries').css('opacity', 1);
			$('#numOfObjects').css('opacity', 1);
			$('#counterClassBoundaries').css('opacity', 1);
			introjs.goToStep(8);
		});
		
	}
	
	function threadStart(threadIndex) {
		$("#progressBarThread" + threadIndex).css("width", "0%");
		$("#thread" + threadIndex + "Label").removeClass("label-default")
				.addClass("label-primary");
		$("#t" + threadIndex + "Label").removeClass("label-default").addClass(
				"label-primary");
		$("#progressBarThread" + threadIndex).addClass("progress-bar-striped");
		if (id == 1) {
			$("#thread" + threadIndex + "Message").text(
					"Thread is executing").addClass('loading');
		} else {
			$("#thread" + threadIndex + "Message").text(
					"Thread " + threadIndex + " is executing").addClass('loading');
		}
		$("#pauseThread" + threadIndex + "Button").removeClass('disabled')
				.removeClass('opacity40');
		$("#thread" + threadIndex + "Arrow").removeClass('hidden');
		offsetFor(threadIndex);
		threadInterval(threadIndex);
	}
	
	function threadInterval(threadIndex) {
		threadProgressBarWidth[threadIndex] += 10;
		if (id == 1) {
			$('.tooltip').css('opacity', 0.3);
			$_bs("#for1").tooltip('show').next().css('opacity', 1);
		}
		$("#for" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
			l1[threadIndex] = $("#for" + threadIndex).offset();
			l2[threadIndex] = $("#sop" + threadIndex).offset();
			topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
			leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
			TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
				offsetSop(threadIndex);
				$("#progressBarThread" + threadIndex).css("width", threadProgressBarWidth[threadIndex] + "%");
				$('#outputPre').append("t[" + threadIndex + "] : " + ((threadProgressBarWidth[threadIndex]/10)) + "\n");
				$( "#sop" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
					if (!pauseCalledArr[threadIndex]) {	
						l1[threadIndex] = $("#sop" + threadIndex).offset();
						l2[threadIndex] = $("#ifPauseCalled" + threadIndex).offset();
						topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
						leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
						TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
							offsetIf(threadIndex);
							if (id == 1) {
								$('.tooltip').css('opacity', 0.3);
								$_bs("#ifPauseCalled1").attr({'data-original-title': '<b>pauseCalled</b> is <span class=" code-b-red">false</span>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
								$_bs("#ifPauseCalled1").tooltip('show').next().css('opacity', 1);
							}
							$("#ifPauseCalled" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
								TweenMax.fromTo($('#ifPauseCalledElement' + threadIndex + ', #pauseCalledStatus' + threadIndex), 0.5, {ease: Sine.easeInOut, backgroundColor: 'yellow'}, {ease: Sine.easeInOut, backgroundColor: 'inherit', repeat: 1, onComplete: function() {
									l1[threadIndex] = $("#ifPauseCalled" + threadIndex).offset();
									l2[threadIndex] = $("#for" + threadIndex).offset();
									topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
									leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
									TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
										offsetFor(threadIndex);
										if (threadProgressBarWidth[threadIndex] == 100) {
											if (id == 1) {
												$('.tooltip').css('opacity', 0.3);
												$_bs("#for1").attr({'data-original-title': 'Exits from the <b>for</b> loop', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
												$_bs("#for1").tooltip('show').next().css('opacity', 1);
											}
											$("#for" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
												l1[threadIndex] = $("#for" + threadIndex).offset();
												l2[threadIndex] = $("#runMethodEndT" + threadIndex).offset();
												topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
												leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
												TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
													offsetRunMethodEndT(threadIndex);
													$("#runMethodEndT" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
														threadEnd(threadIndex);
														checkAllThreadsEnded();
													});
												}});
											});
										} else {
											threadInterval(threadIndex);
										}
									}});
								}});
							});
						}});
					} else {
						pauseCalled(threadIndex);
					}
				});
			}});
		});
	}
	
	function pauseCalled(threadIndex) {
		$('#pauseThread' + threadIndex + 'Button').effect( "transfer", { to: $("#pauseMethodT" + threadIndex), className: "ui-effects-transfer" }, 1000, function() {
			l1[threadIndex] = $("#sop" + threadIndex).offset();
			l2[threadIndex] = $("#pauseCalled" + threadIndex).offset();
			topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
			leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
			TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
				offsetPauseCalled(threadIndex);
				if (id == 1) {
					$('.tooltip').css('opacity', 0.3);
					$_bs("#pauseCalled1").tooltip('show').next().css('opacity', 1);
				}
				$("#pauseCalled" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
					$('#threadbox' + threadIndex).append('<span id="tempStatus' + threadIndex + '" class="temp-status-css code-b-red">' + $('#pauseCalledStatus' + threadIndex).text() + '</span>');
					$('#tempStatus' + threadIndex).offset({top: $('#pauseCalledStatus' + threadIndex).offset().top, left: $('#pauseCalledStatus' + threadIndex).offset().left});
					l1[threadIndex] = $("#pauseCalledTrue" + threadIndex).offset();
					l2[threadIndex] = $("#pauseCalledStatus" + threadIndex).offset();
					topLength[threadIndex] = l1[threadIndex].top - l2[threadIndex].top;
					leftLength[threadIndex] = l1[threadIndex].left - l2[threadIndex].left;
					$('#pauseCalledStatus' + threadIndex).removeClass('code-b-red').addClass('code-b-green').text($("#pauseCalledTrue" + threadIndex).text());
					TweenLite.from('#pauseCalledStatus' + threadIndex, 3, {ease:  Bounce.easeOut, top: topLength[threadIndex], left: leftLength[threadIndex], onComplete: function() {
						l1[threadIndex] = $("#pauseCalled" + threadIndex).offset();
						l2[threadIndex] = $("#pauseCalledSop" + threadIndex).offset();
						topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
						leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
						TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
							offsetPauseCalledSop(threadIndex);
							$('#outputPre').append("t["  + threadIndex + "] pause called..." + "\n");
							$("#pauseCalledSop" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
								l1[threadIndex] = $("#pauseCalledSop" + threadIndex).offset();
								l2[threadIndex] = $("#ifPauseCalled" + threadIndex).offset();
								topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
								leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
								TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
									offsetIf(threadIndex);
									if (id == 1) {
										$('.tooltip').css('opacity', 0.3);
										$_bs("#ifPauseCalled1").attr({'data-original-title': '<b>pauseCalled</b> is <span class=" code-b-green">true</span>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
										$_bs("#ifPauseCalled1").tooltip('show').next().css('opacity', 1);
									}
									$("#ifPauseCalled" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
										TweenMax.fromTo($('#ifPauseCalledElement' + threadIndex + ', #pauseCalledStatus' + threadIndex), 0.5, {ease: Sine.easeInOut, backgroundColor: 'yellow'}, {ease: Sine.easeInOut, backgroundColor: 'inherit', repeat: 1, onComplete: function() {
											l1[threadIndex] = $("#ifPauseCalled" + threadIndex).offset();
											l2[threadIndex] = $("#wait" + threadIndex).offset();
											topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
											leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
											TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
												offsetWait(threadIndex);
												if (id == 1) {
													$('.tooltip').css('opacity', 0.3);
													$_bs("#wait1").tooltip('show').next().css('opacity', 1);
												}
												$("#wait" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
													$(".resume[threadId=" + threadIndex + "]").removeClass('disabled').removeClass('opacity40');
												});
											}});
										}});
									});
								}});
							});
						}});
					}});
					TweenLite.to('#tempStatus' + threadIndex, 1, { ease: Sine.easeOut, delay: 1, top: "-=100", opacity: 0, onComplete: function() {
						$('#tempStatus' + threadIndex).remove();
					}});
				});
			}});
		});
	}
	
	function resumeCalled(threadIndex) {
		$('#resumeThread' + threadIndex + 'Button').effect( "transfer", { to: $("#resumeMethodT" + threadIndex), className: "ui-effects-transfer" }, 1000, function() {
			l1[threadIndex] = $("#wait" + threadIndex).offset();
			l2[threadIndex] = $("#resumeCalled" + threadIndex).offset();
			topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
			leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
			TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
				offsetResumeCalled(threadIndex);
				if (id == 1) {
					$('.tooltip').css('opacity', 0.3);
					$_bs("#resumeCalled1").tooltip('show').next().css('opacity', 1);
				}
				$("#resumeCalled" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
					$('#threadbox' + threadIndex).append('<span id="tempStatus' + threadIndex + '" class="temp-status-css code-b-green">' + $('#pauseCalledStatus' + threadIndex).text() + '</span>');
					$('#tempStatus' + threadIndex).offset({top: $('#pauseCalledStatus' + threadIndex).offset().top, left: $('#pauseCalledStatus' + threadIndex).offset().left});
					l1[threadIndex] = $("#pauseCalledFalse" + threadIndex).offset();
					l2[threadIndex] = $("#pauseCalledStatus" + threadIndex).offset();
					topLength[threadIndex] = l1[threadIndex].top - l2[threadIndex].top;
					leftLength[threadIndex] = l1[threadIndex].left - l2[threadIndex].left;
					$('#pauseCalledStatus' + threadIndex).removeClass('code-b-green').addClass('code-b-red').text($("#pauseCalledFalse" + threadIndex).text());
					TweenLite.from('#pauseCalledStatus' + threadIndex, 3, {ease:  Bounce.easeOut, top: topLength[threadIndex], left: leftLength[threadIndex], onComplete: function() {
						l1[threadIndex] = $("#resumeCalled" + threadIndex).offset();
						l2[threadIndex] = $("#resumeCalledSop" + threadIndex).offset();
						topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
						leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
						TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
							offsetResumeCalledSop(threadIndex);
							$('#outputPre').append("t["  + threadIndex + "] resume called...\n");
							$("#resumeCalledSop" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
								l1[threadIndex] = $("#resumeCalledSop" + threadIndex).offset();
								l2[threadIndex] = $("#notify" + threadIndex).offset();
								topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
								leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
								TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
									offsetNotify(threadIndex);
									if (id == 1) {
										$('.tooltip').css('opacity', 0.3);
										$_bs("#notify1").tooltip('show').next().css('opacity', 1);
									}
									$("#notify" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
										l1[threadIndex] = $("#notify" + threadIndex).offset();
										l2[threadIndex] = $("#wait" + threadIndex).offset();
										topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
										leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
										TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
											offsetWait(threadIndex);
											if (id == 1) {
												$('.tooltip').css('opacity', 0.3);
												$_bs("#wait1").attr({'data-original-title': '<b>run()</b> method is <b>resumed</b>', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
												$_bs("#wait1").tooltip('show').next().css('opacity', 1);
											}
											$("#wait" + threadIndex).css({'background-color' : 'yellow'});
											TweenMax.fromTo($('#wait' + threadIndex), 0.1, {marginLeft: 2}, {marginLeft: 0, repeat: 5, onComplete: function() {
												$("#wait" + threadIndex).css({'background-color' : 'transparent'});
												l1[threadIndex] = $("#wait" + threadIndex).offset();
												l2[threadIndex] = $("#waitSynchronized" + threadIndex).offset();
												topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
												leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
												TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
													offsetWaitSynchronized(threadIndex);
													$("#waitSynchronized" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
														l1[threadIndex] = $("#waitSynchronized" + threadIndex).offset();
														l2[threadIndex] = $("#for" + threadIndex).offset();
														topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
														leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
														TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
															offsetFor(threadIndex);
															if (threadProgressBarWidth[threadIndex] == 100) {
																if (id == 1) {
																	$('.tooltip').css('opacity', 0.3);
																	$_bs("#for1").attr({'data-original-title': 'Exits from the <b>for</b> loop', 'data-placement': 'right', 'data-trigger': 'manual', 'data-html': 'true'});
																	$_bs("#for1").tooltip('show').next().css('opacity', 1);
																}
																$("#for" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
																	l1[threadIndex] = $("#for" + threadIndex).offset();
																	l2[threadIndex] = $("#runMethodEndT" + threadIndex).offset();
																	topLength[threadIndex] = l2[threadIndex].top - l1[threadIndex].top;
																	leftLength[threadIndex] = l2[threadIndex].left - l1[threadIndex].left;
																	TweenLite.to($("#thread" + threadIndex + "Arrow"), 0.5, {top: "+=" + topLength[threadIndex], left: "+=" + leftLength[threadIndex], onComplete: function() {
																		offsetRunMethodEndT(threadIndex);
																		$("#runMethodEndT" + threadIndex).effect("highlight", {color: '#337ab7'}, 500, function() {
																			threadEnd(threadIndex);
																			checkAllThreadsEnded();
																		});
																	}});
																});
															} else {
																threadInterval(threadIndex);
																$(".pause[threadId=" + threadIndex + "]").removeClass('disabled').removeClass('opacity40');
															}
														}});
													});
												}});
											}});
										}});
									});
								}});
							});
						}});
					}});
					TweenLite.to('#tempStatus' + threadIndex, 1, { ease: Sine.easeOut, delay: 1, top: "-=100", opacity: 0, onComplete: function() {
						$('#tempStatus' + threadIndex).remove();
					}});
				});
			}});
		});
	}
	
	function threadEnd(threadIndex) {
		$("#progressBarThread" + threadIndex).removeClass("progress-bar-striped");
		$("#pauseThread" + threadIndex + "Button").addClass('disabled').addClass(
				'opacity40');
		$("#resumeThread" + threadIndex + "Button").addClass('disabled')
				.addClass('opacity40');
		if (id == 1) {
			$("#thread" + threadIndex + "Message").text(
					"Thread has ended").removeClass('loading');
		} else {
			$("#thread" + threadIndex + "Message").text(
					"Thread " + threadIndex + " has ended").removeClass('loading');
		}
		$("#thread" + threadIndex + "Arrow").addClass('hidden');
	}
	
	function checkAllThreadsEnded() {
		var arr = [0, 0, 0, 0, 0]
		for (var end = 1; end <= sliderValue; end++) {
			arr[end] = 100;
		}
		if (threadProgressBarWidth.equals(arr)) {
			if (id == 1) {
				$_bs("#mainMethodCloseBrace").attr("data-content", 'Main method and child thread have completed execution');
			} else {
				$_bs("#mainMethodCloseBrace").attr("data-content", 'Main method and child threads have completed execution');
			}
			$_bs("#mainMethodCloseBrace").popover('show');
			$_bs("#resetMainMethodButton").popover('show');
			setTimeout(function() {
				$("#resetMainMethodButton, #closeBtn").removeClass('hidden').removeClass("opacity00");
			}, 3000);
		}
	}
	
	function offsetArrowAndExecuteButton(executeLineIndex) {
		if (executeLineIndex == 1) {
			$_bs("#executeButton").attr('data-original-title', 'Click to Execute');
			arrow[0] = $("#line" + executeLineIndex).offset();
			mainMethodArrowWidth = $("#mainMethodArrow").width();
			$("#mainMethodArrow").offset({top: arrow[0].top, left: arrow[0].left - mainMethodArrowWidth});//9
			executeButton = $("#line" + executeLineIndex).offset();
			executeLineWidth = $("#line" + executeLineIndex).width();
			$("#executeButton").offset({top: executeButton.top,left: executeButton.left + executeLineWidth + 4});//9
			$("#executeButton").removeClass('disabled').removeClass('opacity40');
			$_bs("#executeButton").tooltip('show');
		}
		else if (executeLineIndex <= sliderValue) {
			$_bs("#executeButton").attr('data-original-title', 'Click to Execute');
			arrow[0] = $("#line" + executeLineIndex).offset();
			mainMethodArrowWidth = $("#mainMethodArrow").width();
			$("#mainMethodArrow").offset({top: arrow[0].top - 3, left: arrow[0].left - mainMethodArrowWidth});
			executeButton = $("#line" + executeLineIndex).offset();
			executeLineWidth = $("#line" + executeLineIndex).width();
			$("#executeButton").offset({top: executeButton.top,left: executeButton.left + executeLineWidth + 4});
			$("#executeButton").removeClass('disabled').removeClass('opacity40');
			$_bs("#executeButton").tooltip('show');
		} else {
			setTimeout(function() {
				$_bs("#executeButton").attr('data-original-title', 'Click to Start');
				arrow[0] = $("#line" + executeLineIndex).offset();
				mainMethodArrowWidth = $("#mainMethodArrow").width();
				$("#mainMethodArrow").offset({top: arrow[0].top - 3, left: arrow[0].left - mainMethodArrowWidth});
				executeButton = $("#line" + executeLineIndex).offset();
				executeLineWidth = $("#line" + executeLineIndex).width();
				$("#executeButton").offset({top: executeButton.top,left: executeButton.left + executeLineWidth + 4});
				$("#executeButton").removeClass('disabled').removeClass('opacity40');
				$_bs("#executeButton").tooltip('show');
			}, 1000);
		}
	}
	
	function animatingArrowAndExecuteButton(executeLineIndex) {
		if ((executeLineIndex -1) == sliderValue * 2) {
			$_bs("#executeButton").tooltip('hide');
			$("#executeButton").addClass('hidden');
			setTimeout(function() {
				l1[0] = $("#line" + (executeLineIndex - 1)).offset();
				l2[0] = $("#mainMethodCloseBrace").offset();
				topLength[0] = l2[0].top-l1[0].top;
				leftLength[0] = l2[0].left-l1[0].left;
				TweenLite.to($("#mainMethodArrow"), 1, {top: "+=" + topLength[0], left: "+=" + leftLength[0]});
				if (id == 1) {
					$_bs("#mainMethodCloseBrace").attr("data-content", 'Waiting for child thread to complete...');
				} else {
					$_bs("#mainMethodCloseBrace").attr("data-content", 'Waiting for child threads to complete...');
				}
				$_bs("#mainMethodCloseBrace").popover('show');
			}, 3000);
			return;
		}
		l1[0] = $("#line" + (executeLineIndex - 1)).offset();
		l2[0] = $("#line" + executeLineIndex).offset();
		topLength[0] = l2[0].top - l1[0].top;
		var tLite = new TimelineLite({ onComplete: offsetArrowAndExecuteButton, onCompleteParams: [executeLineIndex] } );
		if (executeLineIndex == (sliderValue + 1)) {
			tLite.to($("#mainMethodArrow"), 1, {top: "+=" + topLength[0]}).to($("#executeButton"), 1, {top: "+=" + topLength[0], left: "-=" + (executeLineWidth - $("#line" + executeLineIndex).width())}, "-=1");
		} else {
			tLite.to($("#mainMethodArrow"), 1, {top: "+=" + topLength[0]}).to($("#executeButton"), 1, {top: "+=" + topLength[0]}, "-=1");
		}
	}
	
	function offsetFor(threadIndex) {
		arrow[threadIndex] = $("#for" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetSop(threadIndex) {
		arrow[threadIndex] = $("#sop" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetIf(threadIndex) {
		arrow[threadIndex] = $("#ifPauseCalled" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetPauseCalled(threadIndex) {
		arrow[threadIndex] = $("#pauseCalled" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetPauseCalledSop(threadIndex) {
		arrow[threadIndex] = $("#pauseCalledSop" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetWait(threadIndex) {
		arrow[threadIndex] = $("#wait" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetResumeCalled(threadIndex) {
		arrow[threadIndex] = $("#resumeCalled" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetResumeCalledSop(threadIndex) {
		arrow[threadIndex] = $("#resumeCalledSop" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetNotify(threadIndex) {
		arrow[threadIndex] = $("#notify" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetWaitSynchronized(threadIndex) {
		arrow[threadIndex] = $("#waitSynchronized" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
	
	function offsetRunMethodEndT(threadIndex) {
		arrow[threadIndex] = $("#runMethodEndT" + threadIndex).offset();
		$("#thread" + threadIndex + "Arrow").offset({top: arrow[threadIndex].top-3, left: arrow[threadIndex].left-14});
	}
}