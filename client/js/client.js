(function() {

	var $form;

	/**
    * Initialize the search engine
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _init() {
		
		$form = $("#queryForm");
		
		_bindUI();
	
	}

	/**
    * Bind UI elements for the search engine page
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _bindUI() {

		$form.find(".btn-primary").click(function(e) {
			
			var $queryBox, query;

			e.preventDefault();
			
			$queryBox = $("#query_box");
			$errorSpan = $(".error-row span");

			query = $queryBox.val();

			if(!query) {
				$queryBox
					.closest(".form-group")
					.addClass("has-error");
				$errorSpan
					.text("Please enter a topic.");
			} else {
				$queryBox
					.closest(".form-group")
					.removeClass("has-error");
				$errorSpan
					.text("");
				$.when(_getWikiResults(query)).then(function(wikipediaResults) {
					_populateWikipediaResults(wikipediaResults);
				});
			}

		});	
	
	}

	/**
    * Validate the search box for completeness
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _validate() {

	}

	/**
    * Make a REST call to fetch results from the Twitter API
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _getTwitterResults() {
		var promise = $.Deferred();

		$.ajax({
      cache: false,
      type: "GET",
      url: url,
      dataType: "text",
      success: function(json) {
      	promise.resolve($.parseJSON(json))
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
		
		var promise, query;

		promise = $.Deferred();
		query = encodeURIComponent(query);

    $.ajax({
      cache: false,
      crossDomain: true,
      type: "GET",
      url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + query,
      dataType: "jsonp",
      success: function(json) {
      	promise.resolve(json)
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
		
		var $search_container, 
				rowOpen, 
				rowClose, 
				titleOpen, 
				titleClose, 
				snippetOpen, 
				snippetClose, 
				row; 
		
		//cache jQuery reference 		
		$wikipedia_results = $("#wikipedia_results");
		$wikipedia_results.hide();
		$wikipedia_results.empty();
		rowOpen = "<div class='row'>";
		titleOpen = "<div class='col-sm-4 col-xs-12'><strong>";
		titleClose = "</strong></div>";
		snippetOpen = "<div class='col-sm-8 col-xs-12'>";
		snippetClose = "</div>";
		rowClose = "</div>";

		//loop through each search result and append to the tabl
		$.each(json.query.search, function(i, result) {
			row = rowOpen;
			row += titleOpen + result.title + titleClose;
			row += snippetOpen + result.snippet + "..." + snippetClose;
			row += rowClose;
			$wikipedia_results.append(row)
		});

		$wikipedia_results.slideDown("2000");

	}

	return _init();

}());