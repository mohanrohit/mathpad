function LatexFieldViewModel()
{
  var self = this;

  self.fieldParent = document.getElementById("latex-field-parent");
  self.field = document.getElementById("latex-field");

  self.caretIndex = 0;

  self.contents = ko.observable("f(x)");

  /*
  self.init = function()
  {
    var html = '<input type="text" id="latex-field" data-bind="value: contents, event: {keypress: onKeyPress, keydown: onKeyDown, blur: onLostFocus}">';

    tinymce.activeEditor.undoManager.ignore(function() {
      tinymce.execCommand("mceInsertContent", false, html);
    });

    self.field = document.getElementById("latex-field");
    self.field.focus();

    ko.applyBindings(self, self.field);
  };
  */

  /*
  self.onLostFocus = function()
  {
    var mathSpan = document.createElement("span");
    mathSpan.setAttribute("contenteditable", "false");
    mathSpan.innerText = "\\(" + self.contents() + "\\)";

    tinymce.activeEditor.undoManager.ignore(function() {
      tinymce.execCommand("mceInsertContent", false, mathSpan.outerHTML);
    });

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "editor-content"]);

    self.contents("");

    self.field.parentElement.removeChild(self.field);
    self.field = null;
  };
  */

  /*
  self.onLostFocus = function()
  {
    self.field.setAttribute("contenteditable", "false");
    self.field.innerText = "\\(" + self.contents() + "\\)";

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "editor-content"]);

    //self.contents("");
    
    tinymce.activeEditor.off("click", self.onLostFocus);
  };
  */

  self.onLostFocus = function()
  {
    self.fieldParent.appendChild(self.field);

    var span = document.getElementById("x");
    span.removeAttribute("id");
    span.setAttribute("contenteditable", false);
    span.innerText = "\\(" + self.contents() + "\\)";

    /*
    self.field.parentElement.setAttribute("contenteditable", "false");
    self.field.parentElement.innerText = "\\(" + self.contents() + "\\)";
    */

    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "editor-content"]);

    self.contents("");
    
    tinymce.activeEditor.off("click", self.onLostFocus);
  };

  /*
  self.init = function()
  {
    var html = '<span id="latex-field" contenteditable="true" data-bind="text: contents, event: {keypress: onKeyPress, keydown: onKeyDown, blur: onLostFocus}" style="border: 1px solid green; width: 40px">';

    tinymce.activeEditor.undoManager.ignore(function() {
      tinymce.execCommand("mceInsertContent", false, html);
    });

    self.field = document.getElementById("latex-field");
    self.field.click();

    ko.applyBindings(self, self.field);

    tinymce.editingMath = true;

    tinymce.activeEditor.on("click", self.onLostFocus);
  };
  */

  self.init = function()
  {
    var html = '<span id="x" contenteditable="true" data-bind="text: contents" style="border: 1px solid green; width: 40px">';

    tinymce.activeEditor.undoManager.ignore(function() {
      tinymce.execCommand("mceInsertContent", false, html);

      self.field = document.getElementById("latex-field");
      self.field.focus();

      var span = document.getElementById("x");
      span.appendChild(self.field);
    });

    self.field = document.getElementById("latex-field");
    self.field.focus();

    ko.applyBindings(self, self.field);

    tinymce.editingMath = true;

    tinymce.activeEditor.on("click", self.onLostFocus);
  };

  self.onKeyPress = function(data, e)
  {
    if (e.keyCode == 13)
    {
      console.log("keypress:13");
      tinymce.activeEditor.focus();

      //e.preventDefault();
      return false;
    }

    return true;
  };

  self.onKeyDown = function(data, e)
  {
    if (e.keyCode == 13)
    {
      console.log("keydown:13");

      e.preventDefault();

      return false;
    }

    /*
    if (self.field.selectionStart < 0 || self.field.selectionStart > self.field.value.length)
    {
      self.field.blur();
    }
    */

    return true;
  };

  self.init();
}
