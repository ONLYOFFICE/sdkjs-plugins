(function(window, undefined){

    var hints = [];

    window.Asc.plugin.init = function(text)
    {
        text = text.split("\n").join("<br>");

        document.getElementById("id_text").innerHTML = text;

        if (text == "")
        {
            document.body.innerHTML = ("<div style=\"font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#848484;font-size:20px;" +
                    "background:#F4F4F4;display:table;width:100%;height:100%;text-align:center;\">" +
                    "<span style=\"display:table-cell;vertical-align: middle;\">please select text before run plugin!</span></div>");
            return;
        }

        glvrd.proofread(text, function(result)
        {
            if (result.status == 'ok')
            {
                document.getElementById("id_score").innerHTML =
                    "<span style='font-size: 30px;position:absolute;bottom:0;left:20px;width:100%;'>" + result.score +
                    "<span style='font-size: 12px;'> балла из 10 по шкале Главреда" + "</span></span>";

                var len = result.fragments.length;
                var output = "";
                var last = 0;
                for (var i = 0; i < len; i++)
                {
                    var fragment = result.fragments[i];
                    hints.push("<h1>" + fragment.hint.name + "</h1><br/>" + fragment.hint.description);

                    if (last != fragment.start)
                        output += text.substr(last, fragment.start - last);

                    output += ("<em id='data" + i + "'>" + text.substr(fragment.start, fragment.end - fragment.start) + "</em>");
                    last = fragment.end;
                }
                if (last != (text.length - 1))
                {
                    output += text.substr(last);
                }
                document.getElementById("id_text").innerHTML = output;

                var _elements = document.getElementsByTagName("em");
                for (var j = 0; j < _elements.length; j++)
                {
                    _elements[j].onclick = function(e)
                    {
                        var _ems = document.getElementsByTagName("em");
                        for (var k = 0; k < _ems.length; k++)
                            _ems[k].className = "";

                        this.className = "active current";
                        var hintIndex = parseInt(this.getAttribute("id").substr("4"));
                        document.getElementById("id_hint").innerHTML = hints[hintIndex];
                    };
                }
            }
            else
            {
                document.getElementById("id_score").innerHTML = "ERROR";
            }
        });
    };

    window.Asc.plugin.button = function(id)
    {
        this.executeCommand("close", "");
    };

})(window, undefined);
