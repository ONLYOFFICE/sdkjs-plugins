(function (window, undefined) {
  var apiCurrency = 'http://api.fixer.io/';

  function formatDate(date) {
    var month = '' + (date.getMonth() + 1);
    var day = '' + date.getDate();
    var year = date.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  function loadCurrency(date, base, callback) {
    base = base ? base : 'RUB';
    date = date ? formatDate(date) : 'latest';
    var httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {
        }
      }
    }

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        callback(httpRequest.status === 200 ? httpRequest.responseText : null);
      }
    };
    httpRequest.open('GET', apiCurrency + date + '?base=' + base, true);
    httpRequest.send();
  }

  window.Asc.plugin.init = function () {
    this.button(-1);
  };

  window.Asc.plugin.button = function (id) {
    //if (id == 0) {
      var t = this;
      loadCurrency($('#DP').datepicker('getDate'), null, function (value) {
        var command = '';
        if (value) {
          try {
            var rates = JSON.parse(value).rates;
            var keys = Object.keys(rates);
            console.log(rates);
            command += 'var oDocument = Api.GetDocument();';
            command += 'var oTable = Api.CreateTable(2,' + keys.length + ');';
            command += 'oTable.SetWidth("twips", 4311);';
            command += 'oTable.SetTableLook(true, true, false, false, true, false);'
            command += 'var oRow, oCell, oCellContent, oParagraph;'
            for (var i = 0; i < keys.length; ++i) {
              command += 'oRow = oTable.GetRow(' + i + ');';
              command += 'oCell = oRow.GetCell(0);';
              command += 'oCell.SetWidth("twips", 1637);';
              command += 'oCellContent = oCell.GetContent();';
              command += 'oParagraph = oCellContent.GetElement(0);';
              command += 'oParagraph.SetJc("center");';
              command += 'oRun = oParagraph.AddText("' + keys[i] + '");';
              command += 'oCell = oRow.GetCell(1);';
              command += 'oCell.SetWidth("twips", 1637);';
              command += 'oCellContent = oCell.GetContent();';
              command += 'oParagraph = oCellContent.GetElement(0);';
              command += 'oParagraph.SetJc("center");';
              command += 'oRun = oParagraph.AddText("' + rates[keys[i]] + '");';
            }
            command += 'oDocument.InsertContent([oTable]);';
            window.Asc.plugin.info.recalculate = true;
          } catch (e) {
          }
        }
        t.executeCommand('close', command);
      });
    //} else {
    //  this.executeCommand('close', '');
    //}
  };
})(window, undefined);
