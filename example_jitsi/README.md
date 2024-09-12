## Overview

This plugin shows how to integrate Jitsi service in editor.

The plugin uses [Jitsi] is a collection of Open Source projects which provide state-of-the-art video conferencing capabilities that are secure, easy to use and easy to self-host. (https://meet.jit.si/)

It is called Jitsi in the interface and isn't installed by default in cloud, [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop version](https://github.com/ONLYOFFICE/DesktopEditors) of ONLYOFFICE editors. 

## How to use

1. Open the Plugins tab and press Jitsi.
2. Fill in the fields at the bottom of the left sidebar before you start a call:
* Domain - enter the domain name if you want to connect your domain.
* Room name - enter the name of the meeting room. This field is mandatory and you cannot start a call if you leave it out.
3. Press the "Start" button (for creating jitsi iframe).
4. Type your nickname and allow the browser to use the camera and microphone.
5. If you need to destroy jitsi iframe press the "Stop" button.
6. Click the "Join the meeting" button to start a call with audio or click the arrow to join without audio.

## Known issues

* The plugin doesn't work with http (it works only with https).

If you need more information about how to use or write your own plugin, please see this https://api.onlyoffice.com/plugin/basic