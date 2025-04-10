#!/bin/zsh
#adb shell settings put global http_proxy :0
adb root
adb remount
adb push ./hosts /system/etc/hosts
adb reboot
