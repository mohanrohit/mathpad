function MathViewModel()
{
    var self = this;
    
    self.formula = ko.observable("")
    self.latex = ko.observable("");

    self.imageUrl = ko.observable("");

    self.makeImageUrl = function()
    {
      // get image from CodeCogs
      return "https://latex.codecogs.com/svg.latex?" + self.latex();
    }

    self.previewFormula = function()
    {
      self.imageUrl(self.makeImageUrl());
    };

    self.insertFormula = function()
    {
      var result = sprintf('<img src="%s" style="margin-top: -3px; vertical-align: middle" onclick="mathViewModel.editFormula()"></img>', self.makeImageUrl());

      tinymce.execCommand("mceInsertContent", false, result);
    };

    self.editFormula = function()
    {
      var selection = tinymce.activeEditor.selection;
      if (!selection || !selection.selectedRange)
      {
        return;
      }

      // an image is one "character" long
      if (selection.selectedRange.endOffset - selection.selectedRange.startOffset > 1)
      {
        return;
      }

      var selectionContent = selection.getContent();

      var tag = tinymce.dom.DomQuery(selectionContent);

      var formulaFound = tag.is("img") && tag.attr("src").indexOf("latex.codecogs.com") != -1;
      if (!formulaFound)
      {
        return;
      }

      // the (LaTeX) formula is the query string, after the "?". if that's not
      // found, return
      var url = tag.attr("src");
      if (url.indexOf("?") == -1) 
      {
        return;
      }

      var formula = url.substr(url.indexOf("?") + 1);

      self.mathField.latex(formula);
    };

    self.init = function()
    {
      var formulaField = document.getElementById("formula");

      var formulaFieldHandlers =
      {
        edit: function()
        {
          self.latex(self.mathField.latex());
        }
      };

      self.mathField = MQ.MathField(formulaField, { handlers: formulaFieldHandlers });
    };

    self.init();
}
