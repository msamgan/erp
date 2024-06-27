<?php

const PAGE_SIZE = 12;
const PAGE_SIZE_LARGE = 40;
const CACHE_TTL = 60 * 60 * 24; // 24 hours

if (! function_exists('editorJsParser')) {
    function editorJsParser($content): string
    {
        $parsedContent = '';

        foreach ($content['blocks'] as $block) {
            if ($block['type'] === 'header') {
                $parsedContent .= "<h{$block['data']['level']}>{$block['data']['text']}</h{$block['data']['level']}>";
            } elseif ($block['type'] === 'paragraph') {
                $parsedContent .= "<p>{$block['data']['text']}</p>";
            } elseif ($block['type'] === 'list') {
                $parsedContent .= '<ul>';
                foreach ($block['data']['items'] as $item) {
                    $parsedContent .= "<li>{$item}</li>";
                }
                $parsedContent .= '</ul>';
            } elseif ($block['type'] === 'delimiter') {
                $parsedContent .= '<hr>';
            } elseif ($block['type'] === 'code') {
                $parsedContent .= "<pre><code>{$block['data']['code']}</code></pre>";
            } elseif ($block['type'] === 'quote') {
                $parsedContent .= "<div><blockquote>{$block['data']['text']}</blockquote>" . ($block['data']['caption'] ? "<cite>{$block['data']['caption']}</cite>" : '') . '</div>';
            } elseif ($block['type'] === 'image') {
                $parsedContent .= "<img src=\"{$block['data']['url']}\" alt=\"{$block['data']['caption']}\" title=\"{$block['data']['caption']}\">";
            } elseif ($block['type'] === 'youtubeEmbed') {

                $videosId = explode('=', $block['data']['url'])[1];
                $embedUrl = 'https://www.youtube.com/embed/' . $videosId;

                $parsedContent .= "<iframe width=\"560\" height=\"315\" src=\"{$embedUrl}\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>";
            }
        }

        return $parsedContent;
    }
}

if (! function_exists('htmlToEditorJsBlockParser')) {
    function htmlToEditorJsBlockParser($html): false|string
    {
        $blocks = [];

        $dom = new DOMDocument();
        $dom->loadHTML($html);

        $elements = $dom->getElementsByTagName('*');

        foreach ($elements as $element) {
            $block = [];

            if ($element->tagName === 'h1' || $element->tagName === 'h2' || $element->tagName === 'h3' || $element->tagName === 'h4' || $element->tagName === 'h5' || $element->tagName === 'h6') {
                $block['type'] = 'header';
                $block['data']['level'] = (int) substr($element->tagName, 1);
                $block['data']['text'] = $element->textContent;
            } elseif ($element->tagName === 'p') {
                $block['type'] = 'paragraph';
                $block['data']['text'] = $element->textContent;
            } elseif ($element->tagName === 'ul') {
                $block['type'] = 'list';
                $block['data']['style'] = 'unordered';
                $block['data']['items'] = [];
                $liElements = $element->getElementsByTagName('li');
                foreach ($liElements as $liElement) {
                    $block['data']['items'][] = $liElement->textContent;
                }
            } elseif ($element->tagName === 'ol') {
                $block['type'] = 'list';
                $block['data']['style'] = 'ordered';
                $block['data']['items'] = [];
                $liElements = $element->getElementsByTagName('li');
                foreach ($liElements as $liElement) {
                    $block['data']['items'][] = $liElement->textContent;
                }
            } elseif ($element->tagName === 'hr') {
                $block['type'] = 'delimiter';
            } elseif ($element->tagName === 'pre') {
                $block['type'] = 'code';
                $block['data']['code'] = $element->textContent;
            } elseif ($element->tagName === 'blockquote') {
                $block['type'] = 'quote';
                $block['data']['text'] = $element->textContent;
                $citeElement = $element->getElementsByTagName('cite');
                if ($citeElement->length) {
                    $block['data']['caption'] = $citeElement->item(0)->textContent;
                }
            } elseif ($element->tagName === 'img') {
                $block['type'] = 'image';
                $block['data']['url'] = $element->getAttribute('src');
                $block['data']['caption'] = $element->getAttribute('alt');
                $block['data']['withBorder'] = false;
                $block['data']['withBackground'] = false;
                $block['data']['stretched'] = true;
            }

            if ($block) {
                $blocks[] = $block;
            }
        }

        return json_encode([
            'time' => time(),
            'blocks' => $blocks,
            'version' => '2.29.1',
        ]);
    }
}

if (! function_exists('removeNbsp')) {
    function removeNbsp($string): array|string
    {
        return str_replace('&nbsp;', '', $string);
    }
}
