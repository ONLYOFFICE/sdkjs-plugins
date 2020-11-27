## Overview

This plugin is an example of an input assistant/non-standard keyboard. It has its own window that appears and disappears when you type the text. Its location is tied to the cursor.

It isn't installed by default in cloud, [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop version](https://github.com/ONLYOFFICE/DesktopEditors) of ONLYOFFICE editors. 

## How to use

1. Start typing any word. If plugin find some words in dictionary, then you will see input helper window with found words.
2. Select an option and press the "Enter" button to complete the word.

This is system plugin (in config has flag "isSystem": true,) and you don't need stat it. It starts automatically.

If you need more information about how to use or write your own plugin, please see this https://api.onlyoffice.com/plugin/basic