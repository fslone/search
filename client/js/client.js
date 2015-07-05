(function() {

	var $form;

	/**
    * Initialize the Wikipedia/Twitter search page
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _init() {
		
		$form = $("#queryForm");
		
		_bindUI();

		_bindRefresh();
	
	}

	/**
    * Bind UI elements for the search engine page
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _bindUI() {

		//bind the search button
		$form
			.find(".btn-primary")
			.click(function(e) {
			
				e.preventDefault();
				
				if(_validate()) _showSearchResults();

			});

		//bind the return key
		$form
			.find("#query_box")
			.on("keypress", function(e) {
				if(e.which===13) {
					if(_validate()) _showSearchResults();
				}
			});
	
	}

	/**
    * Display the Wikipedia/Twitter search results on the page
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _showSearchResults() {

		var query;

		query = $form.serialize();

		$.when(
			_getWikiResults(query), 
			_getTwitterResults(query)
		).then(function(wikipediaResults, twitterResults) {
			_populateWikipediaResults(wikipediaResults);
			_populateTwitterResults(twitterResults)
		});

	}

	/**
    * Re-populate the search box, radius checkbox and search results 
    * if the page is refreshed.
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _bindRefresh() {

		var $queryBox, $radius;

		$queryBox = $form.find("#query_box");
		$radius = $form.find("#radius");

		$(window)
			.unload(function(){

				var time, queryVal, radiusVal, formState;

				time = new Date().getTime();
				queryVal = $queryBox.val();
				radiusVal = $radius.is(":checked");
				formState = {
					query: queryVal,
					radius: radiusVal,
					unloadTime: time
				};

				localStorage.setItem("formState", JSON.stringify(formState));

			})
			.load(function() {

				var curTime, formState, unloadTime;
				
				curTime = new Date().getTime();
				formState = localStorage.getItem("formState");
				
				if(formState) {

					formState = $.parseJSON(localStorage.getItem("formState"));
					unloadTime = formState.unloadTime;

					if((curTime - unloadTime) < 3000) {
						$queryBox.val(formState.query);
						$radius.attr("checked", formState.radius);
						_showSearchResults();
					}

				}

			});

	}

	/**
    * Validate the search box for completeness
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _validate() {

		var $queryBox, $errorSpan, query;


		$queryBox = $form.find("#query_box");
		$errorSpan = $form.find(".error-row span");
		query = $queryBox.val();

		if(!query) {

			$queryBox
				.closest(".form-group")
				.addClass("has-error");
			$errorSpan
				.text("Please enter a topic.");

			return false;

		} else {

			$queryBox
				.closest(".form-group")
				.removeClass("has-error");
			$errorSpan
				.text("");

			return true;

		}

	}

	/**
    * Make a REST call to fetch results from the Twitter API
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _getTwitterResults(query) {

		var promise, url;

		promise = $.Deferred();
		url = "/restapi/GetTweets";

		$.ajax({
      cache: false,
      crossDomain: true,
      type: "GET",
      url: url + "?" + query,
      dataType: "text",
      success: function(json) {
      	promise.resolve($.parseJSON($.parseJSON(json)));
      }
    });

    return promise;
	}

	/**
    * Make a REST call to fetch results from the Wikipedia API
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _getWikiResults(query) {
		
		var promise, url;

		promise = $.Deferred();
		url = "/restapi/GetWikis";

    $.ajax({
      cache: false,
      crossDomain: true,
      type: "GET",
      url: url + "?" + query,
      dataType: "text",
      success: function(json) {
      	promise.resolve($.parseJSON($.parseJSON(json).body));
      }
    });

    return promise;
	}

	/**
    * Populate the search engine page with Wikipedia search results
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _populateWikipediaResults(json) {
		
		var $search_container, $wikipedia_results, row;
				
		
		//cache jQuery reference 		
		$wikipedia_results = $("#wikipedia_results");
		$wikipedia_results.hide();
		$wikipedia_results.empty();
		

		//loop through each search result and append to the tabl
		$.each(json.query.search, function(i, result) {
			
			row = _buildRow(result.title, result.snippet);
			$wikipedia_results.append(row)

		});

		$wikipedia_results.slideDown("2000");

	}

	/**
    * Populate the search engine page with Twitter search results
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _populateTwitterResults(json) {

		var row, $search_container, $twitter_results;
				
		//cache jQuery reference 		
		$twitter_results = $("#twitter_results");
		$twitter_results.hide();
		$twitter_results.empty();

		$.each(json.statuses, function(i, result) {
			row = _buildRow("@" + result.user.screen_name, result.text);
			$twitter_results.append(row)
		});

		$twitter_results.slideDown("2000");

	}

	function _buildRow(cell1, cell2) {
		
		var	rowOpen, 
				rowClose, 
				cell1Open, 
				cell1Close, 
				cell2Open, 
				cell2Close, 
				row; 

		rowOpen = "<div class='row'>";
		cell1Open = "<div class='col-sm-4 col-xs-12'><strong>";
		cell1Close = "</strong></div>";
		cell2Open = "<div class='col-sm-8 col-xs-12'>";
		cell2Close = "</div>";
		rowClose = "</div>";

		row = rowOpen;
		row += cell1Open + cell1 + cell1Close;
		row += cell2Open + cell2 + cell2Close;
		row += rowClose;

		return row;

	}

	return _init();

}());