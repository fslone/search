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
		
		_initValidation();
	
	}

	/**
    * Bind UI elements for the search engine page
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _bindUI() {

		$form.find(".btn-primary").click(function(e) {
			var query = $("#query_box").val();
			e.preventDefault();
			$.when(_getWikiResults(query)).then(function(wikipediaResults) {
				_populateWikipediaResults(wikipediaResults);
			});
		});	
	
	}

	/**
    * Initialize validation for the search engine page form
    *
    * @author Fleming Slone [fslone@gmail.com]
   */
	function _initValidation() {
		
		var rules, messages;

		rules = {
			query: {
				required: true
			}
		};

		messages = {
			query: {
				required: "Please enter a topic..."
			}
		};

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
			row += snippetOpen + result.snippet + snippetClose;
			row += rowClose;
			$wikipedia_results.append(row)
		});

		$wikipedia_results.slideDown();

	}

	return _init();

}());