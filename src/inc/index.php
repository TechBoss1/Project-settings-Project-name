<?php
/**
 * Plugin Name: Dynamic Testimonials Block
 * Description: A modern Gutenberg block for managing testimonials with ease
 * Version: 1.0.0
 * Author: Benjamin Airabor
 * Author URI: https://github.com/TechBoss1
 * License: MIT
 * Text Domain: dynamic-testimonials
 */

if (!defined('ABSPATH')) {
    exit;
}

class DynamicTestimonialsBlock {
    public function __construct() {
        add_action('init', [$this, 'register_block']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
    }

    public function register_block() {
        register_block_type(__DIR__ . '/build');
    }

    public function enqueue_editor_assets() {
        wp_enqueue_script(
            'dynamic-testimonials-editor',
            plugins_url('build/index.js', __FILE__),
            ['wp-blocks', 'wp-element', 'wp-editor']
        );
    }
}

new DynamicTestimonialsBlock();
