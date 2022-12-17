// SPDX-FileCopyrightText: 2022 Sönke Holz <sholz8530@gmail.com>
//
// SPDX-License-Identifier: MIT

function changeResponseHeader(details) {
    const responseHeaders = details.responseHeaders;
    const contentTypeHdr = responseHeaders.find(hdr => hdr.name.toLowerCase() == "content-type");

    if (contentTypeHdr != undefined && contentTypeHdr.value == "application/pdf") {
        const contentDispositionHdr = responseHeaders.find(hdr => hdr.name.toLowerCase() == "content-disposition");
        if (contentDispositionHdr != undefined) {
            contentDispositionHdr.value = contentDispositionHdr.value.replace(/^\s*attachment/, "inline");
        }
    }

    return { responseHeaders: responseHeaders };
}

browser.webRequest.onHeadersReceived.addListener(
    changeResponseHeader,
    {
        "urls": ["<all_urls>"],
        // "types": ["main_frame"], // only change main document content disposition
    },
    ["blocking", "responseHeaders"], // blocking is needed in order to change response headers
);
