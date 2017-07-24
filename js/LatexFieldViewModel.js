function LatexFieldViewModel()
{
  var self = this;

  self.field = null;

  self.caretIndex = 0;

  self.contents = ko.observable("");

  self.init = function()
  {
    var html = '<input type="text" id="latex-field" data-bind="value: contents, event: {blur: onLostFocus}">';

    tinymce.execCommand("mceInsertContent", false, html);

    self.field = document.getElementById("latex-field");
    self.field.focus();

    ko.applyBindings(self, self.field);
  };

  self.onLostFocus = function()
  {
    tinymce.execCommand("mceInsertContent", false, self.contents());

    self.contents("");

    self.field.parentElement.removeChild(self.field);
    self.field = null;
  };

  self.onKeyDown = function(data, event)
  {
    if (self.field.selectionStart < 0 || self.field.selectionStart > self.field.value.length)
    {
      self.field.blur();
    }

    return true;
  };

  self.init();
}
