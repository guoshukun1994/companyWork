(function() {
  function resize() {
    var baseFontSize = 100; //设计稿100px相当于1rem，750px -->7.5rem---->各种屏幕的100%的宽度。如 1000px
    var designWidth = 375; //设计稿的宽度
    var width = window.innerWidth; //屏幕宽度

    var currentFontSize = (width / designWidth) * baseFontSize;
    document.querySelector("html").style.fontSize = currentFontSize + "px";
  }

  window.onresize = function() {
    resize();
  };

  document.addEventListener("DOMContentLoaded", resize); // DOMContentLoaded 用于监听dom加载是否完成的事件，
  //  如果所属位置于css引入样式表的后面，则会被阻塞，即样式表加载完成之后才会被监听到
})();
