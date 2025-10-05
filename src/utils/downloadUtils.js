// 마크다운 다운로드

export const downloadMarkdown = (hypotheses) => {
  let markdown = "# A list of generated hypotheses\n\n";

  hypotheses.forEach((hypo, index) => {
    markdown += `## ${index + 1}. ${hypo.title}\n\n`;
    markdown += `### Statement\n${hypo.statement}\n\n`;
    markdown += `### Evidence\n${hypo.evidence}\n\n`;
    markdown += `### References\n`;
    hypo.references.forEach((ref) => {
      markdown += `- [${ref.title}](${ref.url})\n`;
    });
    markdown += "\n---\n\n";
  });

  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hypotheses${String(hypotheses.length).padStart(2, "0")}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// PDF 다운로드
export const downloadPDF = (hypotheses) => {
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Hypotheses</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; }
        h1 { color: #333; border-bottom: 3px solid #333; padding-bottom: 10px; }
        h2 { color: #555; margin-top: 30px; }
        h3 { color: #777; margin-top: 20px; }
        p { line-height: 1.6; }
        .hypothesis { page-break-after: always; margin-bottom: 50px; }
        a { color: #0066cc; text-decoration: none; }
      </style>
    </head>
    <body>
      <h1>A list of generated hypotheses</h1>
  `;

  hypotheses.forEach((hypo, index) => {
    htmlContent += `
      <div class="hypothesis">
        <h2>${index + 1}. ${hypo.title}</h2>
        <h3>Statement</h3>
        <p>${hypo.statement}</p>
        <h3>Evidence</h3>
        <p>${hypo.evidence}</p>
        <h3>References</h3>
        <ul>
    `;
    hypo.references.forEach((ref) => {
      htmlContent += `<li><a href="${ref.url}">${ref.title}</a></li>`;
    });
    htmlContent += `</ul></div>`;
  });

  htmlContent += `</body></html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hypotheses${String(hypotheses.length).padStart(2, "0")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
