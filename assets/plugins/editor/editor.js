//@ts-check
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
// @ts-expect-error
import Ejs, { EditorConfig } from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Marker from "@editorjs/marker";
import ImageTool from "@editorjs/image";
import Underline from "@editorjs/underline";
import DragDrop from "editorjs-drag-drop";
import Table from "@editorjs/table";
import "./style.css";
import { ApiRequest } from "/@/api/api";

/**
 * @param { EditorConfig } configuration
 * @param { string } linkToolEndPoint
 *
 * @returns { Ejs }
 */
export const EditorJS = (configuration = {}, linkToolEndPoint) => {
    const editor = new Ejs({
        ...configuration,
        holder: "editorjs",
        onReady: () => {
            new DragDrop(editor);
        },
        tools: {
            header: {
                class: Header,
                inlineToolbar: true,
            },
            table: Table,
            delimiter: Delimiter,
            list: {
                // @ts-expect-error
                class: List,
                inlineToolbar: true,
            },
            embed: {
                class: Embed,
                config: {
                    services: {
                        youtube: true,
                        coub: true,
                    },
                },
            },
            inlineCode: {
                class: InlineCode,
                shortcut: "CMD+SHIFT+M",
            },
            underline: Underline,
            code: CodeTool,
            image: {
                class: ImageTool,
                config: {
                    uploader: {
                        uploadByFile(file) {
                            const formData = new FormData();
                            formData.append("image", file);

                            return ApiRequest(
                                "post",
                                route("admin.random-images.upload").toString(),
                                formData
                            ).then((res) => res.data);
                        },

                        uploadByUrl(url) {
                            return Promise.resolve({
                                success: 1,
                                file: {
                                    url,
                                },
                            });
                        },
                    },
                },
            },
            telegramPost: TelegramPost,
            linkTool: {
                class: LinkTool,
                config: {
                    endpoint: linkToolEndPoint, // Your backend endpoint for url data fetching
                },
            },
            Marker: {
                class: Marker,
                shortcut: "CMD+SHIFT+M",
            },
        },
    });

    return editor;
};

class TelegramPost {
    constructor({ data, api }) {
        this.data = data;
    }

    static get toolbox() {
        return {
            title: "telegram-post",
            icon: '<svg enable-background="new 0 0 24 24" height="17" viewBox="0 0 24 24" width="17" xmlns="http://www.w3.org/2000/svg"><path d="m9.417 15.181-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931l3.622-16.972.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693 12.643-7.911c.595-.394 1.136-.176.691.218z" fill="#039be5"/></svg>',
        };
    }

    parseUrl(input, value, parent) {
        const script = document.createElement("script");

        if (value.trim().length) {
            const url = value.trim();
            try {
                const URI = new URL(url);
                if (URI.host !== "t.me") {
                    if (!parent.contains("error-link")) {
                        parent.add("error-link");
                    }
                } else {
                    const path = URI.pathname.slice(1);
                    input && (input.style.display = "none");

                    script.async = true;
                    script.src =
                        "https://telegram.org/js/telegram-widget.js?14";
                    script.setAttribute("data-telegram-post", path);
                    script.setAttribute("data-width", "100%");
                    script.setAttribute("data-color", "5E72E4");

                    parent.classList.remove("error-link");

                    parent.appendChild(script);

                    return true;
                }
            } catch (_) {
                if (!parent.classList.contains("error-link")) {
                    parent.classList.add("error-link");
                }
            }
        } else {
            if (!parent.classList.contains("error-link")) {
                parent.classList.add("error-link");
            }
        }
        return false;
    }

    render() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("telegram-post");

        const input = document.createElement("input");

        input.type = "text";

        input.classList.add("input-link-post");

        input.placeholder = "Paste telegram post link...";

        input.onpaste = () => {
            window.setTimeout(() => {
                const url = input.value.trim();
                this.parseUrl(input, url, wrapper);
            }, 500);
        };

        // @ts-ignore
        const value = this.data && this.data.url ? this.data.url : "";

        input.value = value;

        wrapper.appendChild(input);

        this.parseUrl(input, value, wrapper);

        return wrapper;
    }

    save(blockContent) {
        const input = blockContent.querySelector("input");
        return {
            url: input.value,
        };
    }

    validate(savedData) {
        if (!savedData.url.trim()) {
            return false;
        }
        try {
            const URI = new URL(savedData.url.trim());
            if (URI.host !== "t.me") return false;
        } catch (_) {
            return false;
        }
        return true;
    }
}
