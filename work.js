function importSchools() {
    var url = "https://www.get-information-schools.service.gov.uk/Establishments/Search?tok=8UcHPCo7";
    var response = UrlFetchApp.fetch(url);
    var content = response.getContentText();
    var $ = Cheerio.load(content);
    
    var schools = [];
    $("tr[data-automation-id='search-result-row']").each(function() {
      var school = {
        name: $(this).find("td[data-automation-id='school-name'] a").text(),
        type: $(this).find("td[data-automation-id='school-type']").text(),
        phase: $(this).find("td[data-automation-id='school-phase']").text(),
        local_authority: $(this).find("td[data-automation-id='school-local-authority']").text(),
        region: $(this).find("td[data-automation-id='school-region']").text()
      };
      schools.push(school);
    });
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clearContents();
    sheet.getRange(1, 1, schools.length, Object.keys(schools[0]).length).setValues(schools);
  }