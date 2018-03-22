# ppp
Photo Per Person

scp -P 9922 -r build/ .nuxt/ static/ package.json brooklyn@121.40.209.81:/home/brooklyn/webwork/ppp

netstat -tunlp

NODE_ENV=production forever start build/main.js

Have to use the a link with href to refresh the page when navigating 
due to WeChat pushState issue:

[https://github.com/Tencent/weui/issues/125](https://github.com/Tencent/weui/issues/125)

[https://github.com/vuejs/vue-router/issues/481](https://github.com/vuejs/vue-router/issues/481)
