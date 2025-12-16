console.log('Markdown to HTML Converter');

const markdownInput = document.getElementById('markdown-input');
const htmlOutput = document.getElementById('html-output');
const preview = document.getElementById('preview');

function convertMarkdown() {
  let text = markdownInput.value;

  // Set Title to Html tag
  const regexTitle = /^\s*(#{1,6}) +(.*)\n?$/gm;

  text = text.replace(regexTitle, (match, g1, g2) => {
    return `<h${g1.length}>${g2.trim()}</h${g1.length}>`;
  });

  // Set Paragraph to Html tag
  const regexParagraph =
    /^(?!\s*(<h[1-6]>|\d+\.\s|\* |\+ |- |>\s?|!\[|\[)).+/gm;

  text = text.replace(regexParagraph, (match) => {
    return `<p>${match.trim()}</p>`;
  });

  // Set Bolder or Italic to Html tag

  const regexBold = /(\*|_)(.+)\1/g;
  const regexItalic = /(\*{2}|_{2})(.+)\1/g;
  const regexBoldAndItalic = /(\*{3}|_{3})(.+)\1/g;

  text = text.replace(regexBoldAndItalic, `<strong><em>$2</em></strong>`);
  text = text.replace(regexItalic, `<strong>$2</strong>`);
  text = text.replace(regexBold, `<em>$2</em>`);

  // Set Image to Html Tag
  const regexImage = /!\[(.+?)\]\((.+?)\)/gm;

  text = text.replace(regexImage, `<img alt="$1" src="$2">`);

  // Set Link to Html tag
  const regexLink = /\[(.+?)\]\((.+?)\)/gm;

  text = text.replace(regexLink, `<a href="$2">$1</a>`);

  // Set Quote to Html tag
  const regexQuote = /^ *>\s?(.*)/gm;

  text = text.replace(regexQuote, (match, quoteContent) => {
    return `<blockquote>${quoteContent.trim()}</blockquote>`;
  });

  // Set Unordered List to Html tag <ul>
  const regexUnorderedList = /^([*+-] .+$\n?)+/gm;

  text = text.replace(regexUnorderedList, (match) => {
    return `<ul>
${match}
</ul>
`;
  });

  // Set Ordered List to Html tag <ol>
  const regexOrderedList = /^(\d+\. .+$\n?)+/gm;

  text = text.replace(regexOrderedList, (match) => {
    return `<ol>
${match}
</ol>
`;
  });

  // Set Unordered List Items to Html tag <li>
  const regexUnorderedListItems = /^(\d+\. |[-*+] )(.+)\n?$/gm;

  text = text.replaceAll(regexUnorderedListItems, (match, g1, g2) => {
    return `<li>${g2}</li>`;
  });

  htmlOutput.textContent = text;
  preview.innerHTML = text;
  return text;
}

markdownInput.addEventListener('input', convertMarkdown);
