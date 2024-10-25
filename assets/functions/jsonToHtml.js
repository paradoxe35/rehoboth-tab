// @ts-check
import { loadScript, loadStylesheet } from "./loadedScripts";

export const jsonToHtml = {
    makeParagraph(obj) {
        return `<p class="blog_post_text"> ${obj.data.text}</p>`;
    },

    makeCode(data) {
        const id = `code-${Math.random()}`;
        loadStylesheet(
            "https://unpkg.com/@highlightjs/cdn-assets@10.4.0/styles/atom-one-dark.min.css"
        );
        loadScript(
            "https://unpkg.com/@highlightjs/cdn-assets@10.4.0/highlight.min.js",
            () => {
                // @ts-ignore
                const hljs = window.hljs;
                window.setTimeout(() => {
                    const el = document.getElementById(id);
                    el && hljs.highlightBlock(el);
                }, 500);
            }
        );
        return `<pre id=${id} class="prettyprint"><code>${data.code}</code></pre>`;
    },

    makeImage(obj) {
        let url = obj.data.url;

        if (obj.data.file && "url" in obj.data.file) {
            url = obj.data.file.url;
        }

        const caption = obj.data.caption
            ? `<div class="blog_caption">
                                <p class="text-sm">${obj.data.caption}</p>
                            </div>`
            : "";

        if (obj.data.withBackground) {
            return `<div class="cdx-simple-image__picture cdx-simple-image__picture--with-background">
                    <img src="${url}" class="img-cover-full" alt="${obj.data.caption}" />
                </div>
                <small>
                    <em>${caption}</em>
                </small>`;
        }

        return `<div class="d-flex justify-content-center">
                <article style="max-height: 550px;max-width:80%">
                    <img src="${url}" class="img-cover-full" alt="${obj.data.caption}" />
                    <small><em>${caption}</em></small>
                </article>
            </div>`;
    },

    makeEmbed(obj) {
        const caption = obj.data.caption
            ? `<div class="blog_caption">
                <p class="text-sm">${obj.data.caption}</p>
            </div>`
            : "";

        return `
            <div class="my-4">
                <div class="ratio">
                    <iframe width="560" height="315" src="${obj.data.embed}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <small><em>${caption}</em></small>
            </div>`;
    },

    makeHeader(obj) {
        return `<h${obj.data.level} class="blog_post_h${obj.data.level}">${obj.data.text}</h${obj.data.level}>`;
    },

    makeList(obj) {
        if (obj.data.style === "unordered") {
            const list = obj.data.items.map((item) => {
                return `<li>${item}</li>`;
            });
            return `<ul class="blog_post_ul my-2">
                            ${list.join("")}
                        </ul>`;
        } else {
            const list = obj.data.items.map((item) => {
                return `<li>${item}</li>`;
            });
            return `<ul class="blog_post_ul my-2">
                            ${list.join("")}
                        </ul>`;
        }
    },

    makeDelimiter(obj) {
        return `<div class="text-center"><div class="ce-delimiter cdx-block my-3"></div></div>\n`;
    },

    makeTelegramPost(obj) {
        const URI = new URL(obj.data.url);
        const path = URI.pathname.slice(1);
        return `<div class="my-3">
                <script async src="https://telegram.org/js/telegram-widget.js?14" data-telegram-post="${path}" data-width="100%" data-color="5E72E4"></script>
            </div>`;
    },

    makeLinkTool(obj) {
        const meta = obj.data.meta;
        return `
            <div class="card my-4 shadow-none border border-darken-1">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                        <div>
                            <a href="${obj.data.link}" target="_blank">
                                <h5 class="card-title">${meta.title}</h5>
                            </a>
                            <div class="card-text link-tool__description">${
                                meta.description
                            }</div>
                        </div>
                        ${
                            meta.image.url.constructor === String &&
                            meta.image.url.length
                                ? `
                            <a href="${obj.data.link}" target="_blank">
                                <div style="height: 65px;width: 65px;">
                                    <img src="${meta.image.url}" class="img-cover-full" alt="${meta.title}" />
                                </div>
                            </a>
                        `
                                : ""
                        }
                    </div>
                    <div class="mt-2 mb-2">
                        <div class="card-subtitle">
                            <a href="${
                                obj.data.link
                            }" target="_blank" class="card-link text-sm text-muted">
                                ${new URL(obj.data.link).origin}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    makeTable(config) {
        // Default configuration with Bootstrap 5 options
        const defaultConfig = {
            withHeadings: false,
            striped: false, // Enable striped rows
            hover: false, // Enable hover effect
            bordered: true, // Add borders
            borderless: false, // Remove borders
            small: false, // Compact table
            responsive: true, // Make table responsive
            captionTop: false, // Caption position
            caption: "", // Table caption
            dark: false, // Dark theme
            ...config,
        };

        // Validate required properties
        if (!defaultConfig.content || !Array.isArray(defaultConfig.content)) {
            console.error("Content array is required");
            return "";
        }

        // Store the content rows we'll use for the body
        let bodyContent = [...defaultConfig.content];

        // Build table classes
        let tableClasses = ["table"];
        if (defaultConfig.striped) tableClasses.push("table-striped");
        if (defaultConfig.hover) tableClasses.push("table-hover");
        if (defaultConfig.bordered) tableClasses.push("table-bordered");
        if (defaultConfig.borderless) tableClasses.push("table-borderless");
        if (defaultConfig.small) tableClasses.push("table-sm");
        if (defaultConfig.dark) tableClasses.push("table-dark");

        // Start building the table with responsive wrapper if needed
        let html = "";
        if (defaultConfig.responsive) {
            html += '<div class="table-responsive">\n';
        }

        html += `<table class="${tableClasses.join(" ")}">\n`;

        // Add caption if provided
        if (defaultConfig.caption) {
            const captionClass = defaultConfig.captionTop ? "caption-top" : "";
            html += `  <caption class="${captionClass}">${defaultConfig.caption}</caption>\n`;
        }

        // Generate thead
        html += '  <thead class="table-light">\n';

        if (defaultConfig.withHeadings && defaultConfig.content.length > 0) {
            html += "    <tr>\n";
            // Use first row as headers
            const headers = defaultConfig.content[0];
            headers.forEach((header, index) => {
                html += `      <th scope="col" class="text-nowrap">${header}</th>\n`;
            });
            // Remove the header row from bodyContent
            bodyContent = bodyContent.slice(1);

            html += "    </tr>\n";
        }

        html += "</thead>\n";

        // Generate tbody
        html += "  <tbody>\n";

        bodyContent.forEach((row, rowIndex) => {
            html += "    <tr>\n";
            row.forEach((cell, cellIndex) => {
                // Use th for first column, td for others
                const cellTag = cellIndex === 0 ? "td" : "td";
                const scope = cellIndex === 0 ? ' scope="row"' : "";
                const classes = [];

                // Add text alignment classes if needed
                if (typeof cell === "number") {
                    classes.push("text-end"); // Right align numbers
                }

                const classAttr = classes.length
                    ? ` class="${classes.join(" ")}"`
                    : "";

                html += `      <${cellTag}${scope}${classAttr}>${cell}</${cellTag}>\n`;
            });
            html += "    </tr>\n";
        });

        html += "  </tbody>\n</table>\n";

        // Close responsive wrapper if needed
        if (defaultConfig.responsive) {
            html += "</div>";
        }

        return html;
    },
};

/**
 * @param { Array } blocks
 */
export const convertToHtml = (blocks) => {
    const jh = jsonToHtml;

    console.log("convertToHtml.blocks: ", blocks);

    return blocks
        .map((o) => {
            let output_HTML = "";
            switch (o.type) {
                case "delimiter":
                    output_HTML += jh.makeDelimiter(o);
                    break;
                case "image":
                    output_HTML += jh.makeImage(o);
                    break;
                case "list":
                    output_HTML += jh.makeList(o);
                    break;
                case "header":
                    output_HTML += jh.makeHeader(o);
                    break;
                case "table":
                    output_HTML += jh.makeTable(o.data);
                    break;
                case "paragraph":
                    output_HTML += jh.makeParagraph(o);
                    break;
                case "embed":
                    output_HTML += jh.makeEmbed(o);
                    break;
                case "linkTool":
                    output_HTML += jh.makeLinkTool(o);
                    break;
                case "code":
                    output_HTML += jh.makeCode(o.data);
                    break;
                case "telegramPost":
                    output_HTML += jh.makeTelegramPost(o);
                    break;
                default:
                    return "";
            }
            return output_HTML;
        })
        .join("\n");
};
