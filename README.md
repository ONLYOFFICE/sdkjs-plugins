[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://opensource.org/licenses/MIT)    ![Release](https://img.shields.io/badge/Release-v4.1.2-blue.svg?style=flat)

## sdkjs-plugins

The add-ons for [ONLYOFFICE Document Server][2] and [ONLYOFFICE Desktop Editors][3]. Used for the developers to add specific functions to the editors which are not directly related to the OOXML format.

## Available Plugins

Currently the following plugins are available:

* [cbr][4] - inserts currency value into your spreadsheet using the exchange rates from [fixer.io][17] API
* [chess][5] - allows to play chess right in your document
* [clipart][6] - adds beautiful ClipArt objects to your documents
* [glavred][7] - checks and enhances text using glvrd.ru service API (for the Russian language only)
* [helloworld][8] - an example of a simple plugin which inserts the "Hello World!" phrase into the document
* [num2word][9] - converts numbers into words designating these numbers (for the Russian language only)
* [ocr][10] - recognizes text from the pictures and screenshots
* [speech][11] - converts selected text into speech using Yandex translation API
* [templates][12] - creates documents based on the provided templates with a single button click
* [translate][13] - translates the text into the selected language using Yandex translation API
* [yandextranslaterus][14] - translates the text into the Russian language using Yandex translation API
* [youtube][15] - allows to add videos inserting them into your documents and presentations
* [chrome_extension_example][16] - example of integration of plugins into Chrome web browser as an extension (using the [chess][5] plugin as example)

## Project Information

Official website: [http://www.onlyoffice.org](http://onlyoffice.org "http://www.onlyoffice.org")

Code repository: [https://github.com/ONLYOFFICE/web-apps](https://github.com/ONLYOFFICE/web-apps "https://github.com/ONLYOFFICE/web-apps")

SaaS version: [http://www.onlyoffice.com](http://www.onlyoffice.com "http://www.onlyoffice.com")

## Documentation

To learn more about the plugin structure and find out how to integrate plugins with the editors, please refer to the [ONLYOFFICE Document Server Plugins](https://api.onlyoffice.com/plugin/basic "https://api.onlyoffice.com/plugin/basic") documentation.

For the detailed information about the plugin code, you can refer to the [ONLYOFFICE Document Builder](https://helpcenter.onlyoffice.com/developers/document-builder/index.aspx "https://helpcenter.onlyoffice.com/developers/document-builder/index.aspx") section.

## User Feedback and Support

If you have any problems with or questions about [ONLYOFFICE Document Server][2], please visit our official forum to find answers to your questions: [dev.onlyoffice.org][1].

  [1]: http://dev.onlyoffice.org
  [2]: https://github.com/ONLYOFFICE/DocumentServer
  [3]: https://github.com/ONLYOFFICE/DesktopEditors
  [4]: examples/cbr
  [5]: examples/chess
  [6]: clipart
  [7]: examples/glavred
  [8]: examples/helloworld
  [9]: examples/num2word
  [10]: ocr
  [11]: speech
  [12]: examples/templates
  [13]: translate
  [14]: examples/yandextranslaterus
  [15]: youtube
  [16]: examples/chrome_extension_example
  [17]: https://github.com/hakanensari/fixer-io
  
## License

sdkjs-plugins are released under an [MIT license](https://opensource.org/licenses/MIT). See the LICENSE file for more information.
