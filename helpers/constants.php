<?php

if (! function_exists('editorJsParser')) {
    function editorJsParser($content)
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
            }
        }

        return $parsedContent;
    }
}

if (! function_exists('removeNbsp')) {
    function removeNbsp($string)
    {
        return str_replace('&nbsp;', '', $string);
    }
}
