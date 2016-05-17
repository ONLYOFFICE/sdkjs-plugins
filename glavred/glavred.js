(function(window, undefined){

    window.hints = [];
    window.Asc.plugin = {};

    window.Asc.plugin.guid = "{B631E142-E40B-4B4C-90B9-2D00222A286E}";

    window.Asc.plugin.init = function(text)
    {
        document.getElementById("id_text").innerHTML = text;

        if (text == "")
        {
            document.getElementById("id_text").innerHTML = "please select text before run plugin!";
            return;
        }

        glvrd.proofread(text, function(result)
        {
            if (result.status == 'ok')
            {
                document.getElementById("id_score").innerHTML =
                    "<span style='font-size: 30px;'>" + result.score + "<span>" +
                    "<span style='font-size: 12px;'> балла из 10 по шкале Главреда";

                var len = result.fragments.length;
                var output = "";
                var last = 0;
                for (var i = 0; i < len; i++)
                {
                    var fragment = result.fragments[i];
                    window.hints.push("<h1>" + fragment.hint.name + "</h1><br/>" + fragment.hint.description);

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
                        document.getElementById("id_hint").innerHTML = window.hints[hintIndex];
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
        window.Asc.plugin_sendMessage("close", "");
    };

})(window, undefined);
