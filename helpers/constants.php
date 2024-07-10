<?php

const PAGE_SIZE = 12;
const PAGE_SIZE_LARGE = 40;
const CACHE_TTL = 60 * 60 * 24; // 24 hours

if (! function_exists('removeNbsp')) {
    function removeNbsp($string): array|string
    {
        return str_replace('&nbsp;', ' ', $string);
    }
}
