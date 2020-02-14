## Overview

In this folder, you will find the simplest plugins to be used as an examples while creating your own ones.

## List of available examples

### Inserting content 

* [helloworld](./examples/helloworld) shows how to insert text into the document.
* [templates](./examples/templates) - shows how to insert content generated using DocBuilder script into your doc.
* [CBR](./examples/cbr) shows how to get data from third party service and insert it into your spreadsheet. 
* [example_autocomplete](./examples/example_autocomplete) - an example of an input assistant/non-standard keyboard. It has its own window that appears and disappears when you type the text. Its location is tied to the cursor.

### Search and replace

* [example_search_replace](./examples/example_autocomplete) - an example of search & replace feature with settings. 
* [searchAndReplaceOnStart](./examples/searchAndReplaceOnStart) shows how to automatically replace content when you start the editor. In this case, text “ONLYOFFICE” will be replaced with the text "ONLYOFFICE is cool". 

### Work with comments

* [example_add_comment](./examples/example_add_comment) shows how to add comments to your doc using plugins.
* [example_add_comment_in_cell](./examples/example_add_comment_in_cell) shows how to add comment to the active cell of your spreadsheet.

### Work with content controls

* [example_work_with_content_controls](./examples/example_work_with_content_controls) shows how to add, edit, and delete content controls using plugins. 
* [example_work_with_content_controls_content](./examples/example_work_with_content_controls_content) shows how to get the list of content controls, selects content with id determined in the plugin and creates a variable with the selected content which later can be inserted anywhere you want. 
* [example_work_with_content_controls_navigation](./examples/example_work_with_content_controls_navigation) shows how to get the list of content controls, selects content, move cursor to the beginning of the specific content control. 

### Third-party services integration

* [chrome_extension_example](./examples/chrome_extension_example) shows how to turn your plugin into a Chrome extension to add its functionality to the cloud version of ONLYOFFICE.
* [glavred](./examples/glavred) -  an example of integration with a 3rd party service Glavred that is used to find cliches, poor syntax, etc in text written in Russian. The plugin opens a new window where possible flaws are underlined in your text. 
* [externallistener](./examples/externallistener) shows how to manipulate the editor from an external panel of a 3rd party service. 

### Other 

* [settings](./examples/settings) shows how to protect a document using a watermark.
* [chess](./examples/chess) shows how to work with OLE-objects and save data to your document.

## Documentation

ONLYOFFICE API - https://api.onlyoffice.com/plugin/basic

## User feedback and support

If you have any problems or question about ONLYOFFICE plugins, use the issues section here, in this repository. 


