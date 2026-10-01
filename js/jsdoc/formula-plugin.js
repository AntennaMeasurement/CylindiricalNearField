function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

exports.defineTags = dictionary => {
  dictionary.defineTag("formula", {
    mustHaveValue: true,
    onTagged(doclet, tag) {
      doclet.formula = tag.value;
      const renderedFormula = `<p><strong>Formula:</strong> <code>${escapeHtml(tag.value)}</code></p>`;
      doclet.description = doclet.description
        ? `${doclet.description}\n${renderedFormula}`
        : renderedFormula;
    },
  });
};