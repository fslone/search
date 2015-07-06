describe("Wiki/Tweet Search Engine", function(){
  describe("buildRow", function(){
    it("should return a valid results row", function(){
    	var validRow,
    			cell1,
    			cell2;
    	
    	cell1 = "value1";
    	cell2 = "value2";
    	
    	validRow = "<div class='row'><div class='col-sm-4 col-xs-12'><strong>" + cell1 + "</strong></div>";
			validRow += "<div class='col-sm-8 col-xs-12'>" + cell2 + "</div></div>";

      chai.assert.equal(searchEngine.buildRow(cell1, cell2), validRow);

    });
	  it("should return an invalid results row", function(){
	  	var invalidRow;

	  	invalidRow = "";

	    chai.assert.notEqual(searchEngine.buildRow(), invalidRow);

	  });
  });
  describe("buildErrorRow", function() {
  	it("should return a valid error row", function(){
     	var validErrorRow,
     			message,
    			service;
    	
    	service = "Wikipedia";
    	message = "We're sorry, but the " + service + " API appears to be down."
    	
    	validErrorRow = "<div class='row'><div class='col-xs-12 alert alert-danger'><strong>" + message + "</strong></div></div>";

      chai.assert.equal(searchEngine.buildErrorRow(service), validErrorRow)
  	});
  	it("should return an invalid results row", function(){
	  	var invalidRow;

	  	invalidRow = "";

	    chai.assert.notEqual(searchEngine.buildErrorRow(), invalidRow);

	  });
  });
  describe("validate", function() {
  	it("should return true if query is present", function(){
     	var query;
    	
    	query = "Einstein";

      chai.assert.equal(searchEngine.validate(query), true)
  	});
  	it("should return false if query is not present", function(){
      chai.assert.equal(searchEngine.validate(), false)
  	});
  });
  describe("getTwitterResults", function() {
  	it("should return a promise object", function(){
      chai.assert.equal(typeof(searchEngine.getTwitterResults()), "object")
  	});
  });
  describe("getWikiResults", function() {
  	it("should return a promise object", function(){
      chai.assert.equal(typeof(searchEngine.getTwitterResults()), "object")
  	});
  });
});